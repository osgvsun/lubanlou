package net.gvsun.controller.datasource;

import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.datasource.dto.GvsunDataSourceDto;
import net.gvsun.datasource.dto.SiteDto;
import net.gvsun.oauth2.internal.ResultDataDto;
import net.gvsun.entity.User;
import net.gvsun.repository.UserRepository;
import net.gvsun.service.UserDetailService;
import net.gvsun.service.datasource.DatasourceService;
import net.gvsun.service.datasource.InvalidCacheService;
import net.gvsun.service.redis.RedisService;
import net.gvsun.oauth2.internal.Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * 多数据源接口
 *
 * @author 陈敬
 * @since 1.2.0-SNAPSHOT
 */
@RestController
@RequestMapping("/datasource")
public class DataSourceController {
    private final DatasourceService datasourceService;
    private final RedisService redisService;
    private final ClientDatabaseContext clientDatabaseContext;
    private final XService xService;
    private UserRepository userRepository;
    private RedisTemplate<String, User> userRedisTemplate;
    private UserDetailService userDetailService;
    private final InvalidCacheService invalidCacheService;

    @Autowired
    public DataSourceController(UserRepository userRepository,
                                RedisTemplate<String, User> userRedisTemplate,
                                DatasourceService datasourceService,
                                RedisService redisService, UserDetailService userDetailService,
                                ClientDatabaseContext clientDatabaseContext, XService xService, InvalidCacheService invalidCacheService) {
        this.userRepository = userRepository;
        this.userRedisTemplate = userRedisTemplate;
        this.datasourceService = datasourceService;
        this.redisService = redisService;
        this.userDetailService = userDetailService;
        this.clientDatabaseContext = clientDatabaseContext;
        this.xService = xService;
        this.invalidCacheService = invalidCacheService;
    }

    /**
     * 获取用户所属的数据源（即学校）
     *
     * @param username 用户名
     */
    @GetMapping("/getUserSchools")
    public List<Map<String, Object>> getUserSchools(@RequestParam(required = false) String username,
                                                    @CookieValue(name = "datasource.ppp", required = false) String encodedPassword,
                                                    @CookieValue(name = "datasource.wechat", required = false) String wechat,
                                                    @CookieValue(name = "datasource.gitlab", required = false) String gitlab,
                                                    @CookieValue(name = "datasource.qq", required = false) String qq,
                                                    @CookieValue(name = "datasource.phone", required = false) String phone,
                                                    @CookieValue(name = "datasource.HDU_user_no", required = false) String HDU_user_no,
                                                    @CookieValue(name = "datasource.SJTU_user_no", required = false) String SJTU_user_no,
                                                    @CookieValue(name = "datasource.SUFE_user_no", required = false) String SUFE_user_no,
                                                    @CookieValue(name = "datasource.SKD_user_no", required = false) String skd_user_no,
                                                    @CookieValue(name = "datasource.CD_user_no", required = false) String cd_user_no,
                                                    @CookieValue(name = "datasource.ZISU_user_no", required = false) String zisu_user_no) {
        Collection<GvsunDataSourceDto> l = new HashSet<>();
        if (!StringUtils.isEmpty(phone)) {
            l = datasourceService.getUserDataSourcesByPhone(phone);
        } else if (!StringUtils.isEmpty(wechat)) {
            l = datasourceService.getUserDataSourcesByWechat(wechat);
        } else if (!StringUtils.isEmpty(gitlab)) {
            l = datasourceService.getUserDataSourcesByGitlab(gitlab);
        } else if (!StringUtils.isEmpty(qq)) {
            l = datasourceService.getUserDataSourcesByQQ(qq);
        } else if (!StringUtils.isEmpty(username) && !StringUtils.isEmpty(encodedPassword)) {
            String password = Encoder.decodeFromBase64(encodedPassword);
            l = datasourceService.getUserDataSourcesByUsernameAndPassword(username, password);
        } else if (!StringUtils.isEmpty(HDU_user_no)) {
            l = datasourceService.getUserDataSourcesByHDUUserNo(HDU_user_no);
        } else if (!StringUtils.isEmpty(SJTU_user_no)) {
            l = datasourceService.getUserDataSourcesBySJTUUserNo(SJTU_user_no);
        } else if (!StringUtils.isEmpty(SUFE_user_no)) {
            l = datasourceService.getUserDataSourcesBySUFEUserNo(SUFE_user_no);
        } else if (!StringUtils.isEmpty(zisu_user_no)) {
            l = datasourceService.getUserDataSourcesByZISUUserNo(zisu_user_no);
        } else if (!StringUtils.isEmpty(cd_user_no)) {
            l = datasourceService.getUserDataSourcesByCDUserNo(cd_user_no);
        } else if (!StringUtils.isEmpty(skd_user_no)) {
            l = datasourceService.getUserDataSourcesBySKDUserNo(skd_user_no);
        }

        List<Map<String, Object>> list = new ArrayList<>();
        for (GvsunDataSourceDto g : l) {
            Map<String, Object> map = new HashMap<>();
            String schoolName = g.getSchoolName();
            String schoolCname = g.getSchoolCname();
            List<Map<String, Object>> projects = datasourceService.getProjectsFromSchool(schoolName);
            map.put("schoolName", schoolName);
            map.put("schoolCname", schoolCname);
            map.put("projects", projects);
            list.add(map);
        }
        return list;
    }

    /**
     * 所有数据源的用户数据保存到Redis
     */
    @GetMapping("/writeAllUsersToRedis")
    public ResultDataDto<String> writeAllUsersToRedis() {
        SiteDto site = redisService.getSiteDtoFromRedis();
        for (GvsunDataSourceDto d : site.getDataSourceDtos()) {
            ClientDatabaseContextHolder.set(d.getSchoolName());
            List<User> all = userRepository.findAll();
            for (User u : all) {
                userRedisTemplate.opsForHash().put(DatasourceService.FULL_AMOUNT_OF_USER,
                        d.getSchoolName() + "-" + u.getUsername(),
                        u);
            }
            ClientDatabaseContextHolder.clear();
        }
        return new ResultDataDto<>(0, "success");
    }

    @GetMapping("/getUserAuthority")
    public ResultDataDto<Object> getUserAuthority(@RequestParam String username, @RequestParam String schoolName) {
        ResultDataDto<Object> res = new ResultDataDto<>(0, "success");
        SiteDto siteDto = clientDatabaseContext.getSiteDto();
        assert siteDto != null;
        boolean exist = false;
        for (GvsunDataSourceDto s : siteDto.getDataSourceDtos()) {
            if (s.getSchoolName().equals(schoolName)) {
                exist = true;
                break;
            }
        }
        if (exist) {
            ClientDatabaseContextHolder.set(schoolName);
            //获取用户在指定源的所有系统的权限
            List<Map<String, Object>> projects = datasourceService.getProjectsFromSchool(schoolName);
            net.gvsun.controller.datasource.User user = xService.getUser(username);
            if (user == null) {
                res.setCode(1);
                res.setMsg(String.format("指定的用户[%s]不存在", username));
                return res;
            }
            for (Map<String, Object> p : projects) {
                List<Authority> as = new ArrayList<>();
                for (Authority a : user.getAuthorities()) {
                    if (p.get("projectName").equals(a.getClientId())) {
                        as.add(a);
                    }
                }
                p.put("authorities", as);
            }
            res.setData(projects);
            return res;
        } else {
            res.setCode(1);
            res.setMsg(String.format("指定的数据源[%s]不存在", schoolName));
            return res;
        }
    }

    @GetMapping("/invalidCache")
    @Deprecated
    public ResultDataDto<String> invalidCache() {
        return new ResultDataDto<String>(0, "success");
    }


    @GetMapping("/refresh")
    public String refresh() {
        clientDatabaseContext.refresh();
        invalidCacheService.all();
        return "success";
    }
}
