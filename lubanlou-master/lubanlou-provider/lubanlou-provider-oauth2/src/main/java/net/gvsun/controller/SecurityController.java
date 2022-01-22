package net.gvsun.controller;

import lombok.extern.slf4j.Slf4j;
import net.gvsun.config.PropertiesConfigure;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.datasource.dto.GvsunDataSourceDto;
import net.gvsun.feign.UsercenterFeign;
import net.gvsun.oauth2.internal.KafkaMessage;
import net.gvsun.oauth2.internal.ResultDataDto;
import net.gvsun.entity.User;
import net.gvsun.entity.UserForDataSource;
import net.gvsun.oauth2.dto.CustomGrantedAuthority;
import net.gvsun.oauth2.dto.UserCenterUserDetails;
import net.gvsun.repository.UserRepository;
import net.gvsun.service.RegisterService;
import net.gvsun.service.UserDetailService;
import net.gvsun.service.datasource.DatasourceService;
import net.gvsun.service.datasource.InvalidCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Slf4j
@Controller
@CrossOrigin
@RequestMapping("/security")
public class SecurityController {
    private final JdbcOperations jdbcOperations;
    private final PropertiesConfigure propertiesConfigure;
    private final InvalidCacheService invalidCacheService;
    private final UserDetailService userDetailService;
    @Value("${resourceContainerHost}")
    public String resourceContainerHost;
    @Value("${apiSuccessfulJump}")
    public String apiSuccessfulJump;
    private RedisTemplate<String, User> userRedisTemplate;
    private UserRepository userRepository;
    private RegisterService registerService;
    private DatasourceService datasourceService;
    private final UsercenterFeign userCenterFeignClient;
    private final NamedParameterJdbcOperations namedParameterJdbcOperations;

    @Autowired
    public SecurityController(JdbcOperations jdbcOperations,
                              RedisTemplate<String, User> userRedisTemplate,
                              PropertiesConfigure propertiesConfigure,
                              UserRepository userRepository,
                              RegisterService registerService,
                              DatasourceService datasourceService, InvalidCacheService invalidCacheService, UserDetailService userDetailService, UsercenterFeign userCenterFeignClient, NamedParameterJdbcOperations namedParameterJdbcOperations) {
        this.jdbcOperations = jdbcOperations;
        this.userRedisTemplate = userRedisTemplate;
        this.propertiesConfigure = propertiesConfigure;
        this.userRepository = userRepository;
        this.registerService = registerService;
        this.datasourceService = datasourceService;

        this.invalidCacheService = invalidCacheService;
        this.userDetailService = userDetailService;
        this.userCenterFeignClient = userCenterFeignClient;
        this.namedParameterJdbcOperations = namedParameterJdbcOperations;
    }

    /**
     * 修改密码
     *
     * @param username    用户名
     * @param oldPassword 旧密码
     * @param newPassword 新密码
     */
    @ResponseBody
    @PostMapping("/modifyPassword")
    public ResultDataDto<String> modifyPassword(@RequestParam String username,
                                                @RequestParam String oldPassword,
                                                @RequestParam String newPassword) {
        ResultDataDto<String> res = new ResultDataDto<>(0, "success");
        if (!StringUtils.isEmpty(username) && !StringUtils.isEmpty(newPassword)) {
            if (!StringUtils.isEmpty(oldPassword)) {
                User user = userRepository.findByUsernameAndPassword(username, oldPassword);
                if (user == null) {
                    res.setCode(1);
                    res.setMsg("旧密码错误");
                    return res;
                }
            }
            List<GvsunDataSourceDto> l = datasourceService.getUserDataSourcesByUsernameAndPassword(username, oldPassword);
            if (l.size() > 0) {
                for (GvsunDataSourceDto d : l) {
                    ClientDatabaseContextHolder.set(d.getSchoolName());
                    String UPDATE_SQL = "update users set password = ? where username = ? and password = ?";
                    jdbcOperations.update(UPDATE_SQL, newPassword, username, oldPassword);
                    ClientDatabaseContextHolder.clear();
                }
            }
        }
        return res;
    }

    /**
     * 重置密码
     *
     * @param username    用户名
     * @param newPassword 新密码
     */
    @ResponseBody
    @PostMapping("/resetPassword2")
    public ResultDataDto<String> resetPassword(@RequestParam String username,
                                               @RequestParam String newPassword) {
        ResultDataDto<String> res = new ResultDataDto<>(0, "success");
        User user = userRepository.findByUsername(username);
        if (user != null) {
            String phone = user.getPhone();
            if (StringUtils.isEmpty(phone)) {
                invalidCacheService.getUserDataSourcesByUsernameAndPassword(username, user.getPassword());
                List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesByUsernameAndPassword(username, user.getPassword());
                for (GvsunDataSourceDto d : ds) {
                    ClientDatabaseContextHolder.set(d.getSchoolName());
                    String UPDATE_SQL = "update users set password = ? where username = ? and password = ?";
                    jdbcOperations.update(UPDATE_SQL, newPassword, username, user.getPassword());
                    ClientDatabaseContextHolder.clear();
                }
            } else {
                invalidCacheService.getUserDataSourcesByPhone(phone);
                List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesByPhone(phone);
                for (GvsunDataSourceDto d : ds) {
                    ClientDatabaseContextHolder.set(d.getSchoolName());
                    String UPDATE_SQL = "update users set password = ? where username = ? and phone = ?";
                    jdbcOperations.update(UPDATE_SQL, newPassword, username, phone);
                    ClientDatabaseContextHolder.clear();
                }
            }
        }
        return res;
    }

    /**
     * 批量添加用户
     *
     * @param userList 用户列表
     */
    @ResponseBody
    @PostMapping("/addUser")
    public void addUser(@RequestBody List<UserCenterUserDetails> userList) throws CloneNotSupportedException {
        Map<String, List<UserForDataSource>> map = new HashMap<>();
        for (UserCenterUserDetails u : userList) {
            String username = u.getUsername();
            String password = u.getPassword();
            String cname = u.getCname();
            String collegeId = u.getCollegeId();
            String phone = u.getPhone();
            Collection<CustomGrantedAuthority> authorities = u.getAuthorities();
            String clientIds = u.getClientIds();//逗号分隔
            if (!StringUtils.isEmpty(username) && !StringUtils.isEmpty(password)) {
                jdbcOperations.update("insert ignore into users (username, password, cname, enabled, phone,first_login) values (?,?,?,1,?,0)", username, password, cname, phone);
                UserForDataSource userForDataSource = new UserForDataSource();
                User user = userRepository.findByUsername(username);
                if (user == null)
                    return;
                userForDataSource.setUsername(username);
                userForDataSource.setPassword(user.getPassword());
                userForDataSource.setCname(user.getCname());
                userForDataSource.setPhone(user.getPhone());
                userForDataSource.setEnabled(true);
                userForDataSource.setCollegeId(collegeId);
                String schoolName = ClientDatabaseContextHolder.getClientDatabase();
                if (schoolName == null) {
                    schoolName = datasourceService.getDefaultDataSource().getSchoolName();
                }
                userForDataSource.setSchoolName(schoolName);
                //把用户写入redis
                userRedisTemplate.opsForHash().put(DatasourceService.FULL_AMOUNT_OF_USER,
                        userForDataSource.getSchoolName() + "-" + userForDataSource.getUsername(),
                        user);


                if (!StringUtils.isEmpty(clientIds)) {
                    String[] cids = clientIds.split(",");
                    for (String cid : cids) {
                        List<CustomGrantedAuthority> as = new ArrayList<>();
                        UserForDataSource userForDataSource1 = userForDataSource.clone();
                        userForDataSource1.setAuthorities(as);
                        for (CustomGrantedAuthority a : authorities) {
                            Boolean exist = jdbcOperations.queryForObject("select exists(select 1 from authorities where client_id = ? and authority_cname = ?)",
                                    Boolean.class, cid, a.getAuthorityCname());
                            if (exist != null && exist) {
                                Map<String, Object> map1 = jdbcOperations.queryForObject("select client_authority_id, authority_ename from authorities where client_id = ? and authority_cname = ?",
                                        (rs, num) -> {
                                            Integer client_authority_id = rs.getInt("client_authority_id");
                                            String authority_ename = rs.getString("authority_ename");
                                            Map<String, Object> map2 = new HashMap<>();
                                            map2.put("client_authority_id", client_authority_id);
                                            map2.put("authority_ename", authority_ename);
                                            return map2;
                                        },
                                        cid, a.getAuthorityCname());
                                Integer client_authority_id = Integer.valueOf(map1.get("client_authority_id").toString());
                                String authority_ename = map1.get("authority_ename").toString();
                                CustomGrantedAuthority a2 = new CustomGrantedAuthority();
                                a2.setId(client_authority_id);
                                a2.setAuthority(authority_ename);
                                a2.setAuthorityCname(a.getAuthorityCname());
                                as.add(a2);
                                userDetailService.setUserAuthority(username, cid, a.getAuthorityCname());
                            }
                        }
                        if (map.containsKey(cid)) {
                            map.get(cid).add(userForDataSource1);
                        } else {
                            List<UserForDataSource> userForDataSourceList = new ArrayList<>();
                            userForDataSourceList.add(userForDataSource1);
                            map.put(cid, userForDataSourceList);
                        }

                    }
                }

                invalidCacheService.getUserDataSourcesByPhone(phone);
                invalidCacheService.userExist(username);
            }
        }

        Set<String> ks = map.keySet();
        for (String k : ks) {
            KafkaMessage kafkaMessage = new KafkaMessage();
            kafkaMessage.setMessageType(KafkaMessage.MESSAGE_TYPE.BATCH_IMPORT_USER);
            kafkaMessage.setData(map.get(k));
            registerService.sendDataToTopic(propertiesConfigure.getUserInfoTopic(k), kafkaMessage);
        }
    }

    /**
     * 删除用户
     *
     * @param username 用户名
     */
    @ResponseBody
    @RequestMapping(value = "/deleteUser/{username}", method = {RequestMethod.GET, RequestMethod.DELETE})
    public void deleteUser(@PathVariable String username) {
        jdbcOperations.update("delete from audit where username = ?", username);
        jdbcOperations.update("delete from user_client_authority where username = ?", username);
        jdbcOperations.update("delete from users where username = ?", username);
    }

    /**
     * 禁用用户
     *
     * @param username 用户名
     */
    @ResponseBody
    @PostMapping("/forbidden/{username}")
    public void forbidden(@PathVariable String username, @RequestParam(defaultValue = "false") Boolean enabled) {
        jdbcOperations.update("update users set enabled = ? where username = ?", enabled, username);
        registerService.sendUserInfoToTopic(null, username, enabled ? KafkaMessage.MESSAGE_TYPE.USER_ENABLE : KafkaMessage.MESSAGE_TYPE.USER_FORBIDDEN);
        if (enabled) {
            userCenterFeignClient.enableUser(username);
        }
    }

    @ResponseBody
    @PostMapping("/batchForbidden")
    public void forbidden(@RequestParam List<String> usernames, @RequestParam Boolean enabled) {
        Map<String, Object> params = new HashMap<>();
        params.put("usernames", usernames);
        params.put("enabled", enabled ? 1 : 0);
        namedParameterJdbcOperations.update("UPDATE users set enabled = :enabled where username in (:usernames)", params);
    }

    /**
     * 删除用户在指定站点下的权限
     *
     * @param username            用户
     * @param clientId            站点
     * @param client_authority_id 角色
     */
    @ResponseBody
    @DeleteMapping("/deleteAuthority/{username}/{clientId}/{client_authority_id}")
    public void deleteAuthority(@PathVariable String username, @PathVariable String clientId, @PathVariable String client_authority_id) {
        jdbcOperations.update("delete from user_client_authority where username = ? and client_id = ? and client_authority_id = ?",
                username, clientId, client_authority_id);
        registerService.sendUserInfoToTopic(clientId, username, KafkaMessage.MESSAGE_TYPE.AUTHORITY_CHANGED);
    }

    /**
     * 删除用户在所有站点下的权限
     *
     * @param username 用户
     */
    @ResponseBody
    @DeleteMapping("/deleteAuthority/{username}")
    public void deleteAuthority(@PathVariable String username) {
        jdbcOperations.update("delete from user_client_authority where username = ?", username);
    }

    /**
     * 删除用户在指定站点下的所有权限
     *
     * @param clientId 客户端id
     * @param username 用户
     */
    @ResponseBody
    @DeleteMapping("/deleteAuthority/{clientId}/{username}")
    public void deleteAuthority(@PathVariable String clientId, @PathVariable String username) {
        jdbcOperations.update("delete from user_client_authority where username = ? and client_id = ?", username, clientId);
    }

    /**
     * 添加用户在指定站点下的权限
     *
     * @param username            用户
     * @param clientId            站点
     * @param client_authority_id 角色
     */
    @ResponseBody
    @PostMapping("/addAuthority/{username}/{clientId}/{client_authority_id}")
    public void addAuthority(@PathVariable String username, @PathVariable String clientId, @PathVariable String client_authority_id) {
        jdbcOperations.update("insert ignore into user_client_authority(username, client_id, client_authority_id) values (?,?,?)",
                username, clientId, client_authority_id);

        registerService.sendUserInfoToTopic(clientId, username, KafkaMessage.MESSAGE_TYPE.AUTHORITY_CHANGED);
    }

    /**
     * 添加指定系统的基础权限
     */
    @ResponseBody
    @PostMapping("/addClientAuthority")
    public void addClientAuthority(@RequestParam String clientId,
                                   @RequestParam String clientAuthorityId,
                                   @RequestParam String authorityName,
                                   @RequestParam String authorityCname) {
        jdbcOperations.update("insert ignore into authorities(client_id,client_authority_id,authority_ename,authority_cname) values(?,?,?,?)",
                clientId, clientAuthorityId, authorityName, authorityCname);
    }

    /**
     * 获取用户在各个站点下的权限
     *
     * @param username 用户名
     * @return
     */
    @ResponseBody
    @GetMapping("/getAuthorities/{username}")
    public List<Map<String, Object>> getAuthorities(@PathVariable String username) {
        List<Map<String, Object>> mapList = new ArrayList<>();
        jdbcOperations.query("call proc_authority(?)", rs -> {
            String site_id = rs.getString("client_id");
            String site_c_name = rs.getString("client_name");
            Integer role_id = rs.getInt("client_authority_id");
            String authority_cname = rs.getString("authority_cname");
            String authority_ename = rs.getString("authority_ename");
            boolean checked = rs.getBoolean("checked");
            Integer roleUid = rs.getInt("role_uid");
            Map<String, Object> map = new HashMap<>();
            map.put("site_id", site_id);
            map.put("site_c_name", site_c_name);
            map.put("role_id", role_id);
            map.put("authority_cname", authority_cname);
            map.put("authority_ename", authority_ename);
            map.put("checked", checked);
            map.put("roleUid",roleUid);
            mapList.add(map);
        }, username);
        return mapList;
    }

    /**
     * 跳转重置密码页面
     */
    @GetMapping("/resetPassword")
    public String resetPassword(Map<String, String> module, @RequestParam(required = false) String errorMsg) {
        if (!StringUtils.isEmpty(errorMsg)) {
            module.put("error", errorMsg);
        }
        module.put("resourceContainerHost", resourceContainerHost);
        return "reset_password";
    }

    /**
     * 重置密码
     */
    @PostMapping("/resetPassword")
    public String resetPassword(@RequestParam String phone,
                                @RequestParam String password,
                                @RequestParam String securityCode,
                                HttpServletRequest request,
                                Map<String, Object> module) {
        String mySecurityCode = (String) request.getSession().getAttribute("securityCode");
        module.put("original_uri", "/index");
        if (securityCode.equals(mySecurityCode)) {
            List<GvsunDataSourceDto> l = datasourceService.getUserDataSourcesByPhone(phone);
            if (l.size() == 0) {
                module.put("success", false);
                module.put("msg", "重置失败：手机号不存在");
            } else {
                for (GvsunDataSourceDto d : l) {
                    ClientDatabaseContextHolder.set(d.getSchoolName());
                    jdbcOperations.update("update users set password = ?, first_login = false where phone = ?", password, phone);
                    ClientDatabaseContextHolder.clear();
                }
                module.put("success", true);
                module.put("msg", "重置成功");
            }
        } else {
            module.put("success", false);
            module.put("msg", "重置失败：验证码不正确");
        }
        module.put("resourceContainerHost", resourceContainerHost);
        module.put("apiSuccessfulJump", apiSuccessfulJump);
        return "result";
    }

    /**
     * 设置手机号
     */
    @ResponseBody
    @PostMapping("/setPhone")
    public void setPhone(@RequestParam String username, @RequestParam String phone) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            invalidCacheService.getUserDataSourcesByPhone(user.getPhone());
            invalidCacheService.userExist(username);
            jdbcOperations.update("update users set phone = ? where username = ?", phone, username);
            invalidCacheService.getUserDataSourcesByPhone(phone);
        }
    }

    @ResponseBody
    @GetMapping("/{clientId}/{clientAuthorityId}/users")
    public net.gvsun.usercenter.internal.ResultDataDto<List<Map<String, String>>> users(@PathVariable String clientId, @PathVariable String clientAuthorityId, @RequestParam(required = false) String keyword) {
        net.gvsun.usercenter.internal.ResultDataDto<List<Map<String, String>>> res = new net.gvsun.usercenter.internal.ResultDataDto<>(0, "success");
        String sql = "SELECT u.username, u.cname FROM users as u INNER JOIN user_client_authority a ON u.username = a.username WHERE a.client_id = ? AND a.client_authority_id = ? ";
        if (!StringUtils.isEmpty(keyword)) {
            sql += String.format(" AND u.cname LIKE '%%%s%%'", keyword);
        }
        sql += " order by u.username asc";

        final List<Map<String, String>> list = jdbcOperations.query(sql, new RowMapper<Map<String, String>>() {
            @Override
            public Map<String, String> mapRow(ResultSet rs, int rowNum) throws SQLException {
                Map<String, String> map = new HashMap<>();
                map.put("id", rs.getString("username"));
                map.put("text", String.format("%s(%s)", rs.getString("cname"), rs.getString("username")));
                return map;
            }
        }, clientId, clientAuthorityId);
        res.setData(list);
        res.setCount((long) list.size());
        return res;
    }
}
