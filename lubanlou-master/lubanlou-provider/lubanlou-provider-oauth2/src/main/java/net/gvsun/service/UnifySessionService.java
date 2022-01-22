package net.gvsun.service;

import net.gvsun.common.Result;
import net.gvsun.config.PropertiesConfigure;
import net.gvsun.datasource.dto.GvsunDataSourceDto;
import net.gvsun.entity.User;
import net.gvsun.feign.DataShareFeign;
import net.gvsun.repository.UserRepository;
import net.gvsun.service.datasource.DatasourceService;
import net.gvsun.session.UnifySessionFilter;
import net.gvsun.session.dto.Authority;
import net.gvsun.session.repository.Session;
import net.gvsun.datashare.external.shareddata.SchoolAcademyDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UnifySessionService {
    private final DataShareFeign dataShareFeign;
    private final UserRepository userRepository;
    private final JdbcOperations jdbcOperations;
    private final DatasourceService datasourceService;
    private final PropertiesConfigure propertiesConfigure;

    @Autowired
    public UnifySessionService(DataShareFeign dataShareFeign,
                               UserRepository userRepository,
                               JdbcOperations jdbcOperations, DatasourceService datasourceService, PropertiesConfigure propertiesConfigure) {
        this.dataShareFeign = dataShareFeign;
        this.userRepository = userRepository;
        this.jdbcOperations = jdbcOperations;
        this.datasourceService = datasourceService;
        this.propertiesConfigure = propertiesConfigure;
    }

    /**
     * @description 将登录用户放入session中
     * @param
     * @updater  Smark Lee
     * @date  2021/12/11 补充注释
     * @return
     **/
    public net.gvsun.session.dto.User addUser2Session(String username, User user, HttpServletRequest request) {
        // 用户名不为null，用户为null则重新获取user对象
        if (!StringUtils.isEmpty(username) && user == null) {
            user = userRepository.findByUsername(username);
        }
        if (user != null) {
            UnifySessionFilter<Session>.UnifyRequestWrapper.HttpSessionWrapper session = (UnifySessionFilter<Session>.UnifyRequestWrapper.HttpSessionWrapper) request.getSession();
            net.gvsun.session.dto.User u = new net.gvsun.session.dto.User(
                    user.getUsername(),
                    user.getPassword(),
                    user.getCname(),
                    user.getGender(),
                    user.getPhone(),
                    user.getEmail()
            );
            u.setGender(user.getGender());
            List<GvsunDataSourceDto> datasources;
            if (propertiesConfigure.getEnableLoginByPhone()) {
                datasources = datasourceService.getUserDataSourcesByPhone(user.getPhone());
            } else {
                datasources = datasourceService.getUserDataSourcesByUsernameAndPassword(username, user.getPassword());
            }
            List<String> ds = new ArrayList<>();
            for (GvsunDataSourceDto dataSourceDto : datasources) {
                ds.add(dataSourceDto.getSchoolName());
            }
            u.setDatasources(ds);
            try {
                Result<SchoolAcademyDTO> res = dataShareFeign.getSchoolAcademyInfoByUserName(user.getUsername());
                if (res.getCode() == 0) {
                    u.setSchoolAcademy(res.getData());
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            Map<String, List<Authority>> authorityMap = new HashMap<>();
            //获取用户权限
            jdbcOperations.query("call proc_authority(?)", rs -> {
                String client_id = rs.getString("client_id");
                String client_name = rs.getString("client_name");
                String client_authority_id = rs.getString("client_authority_id");
                String authority_cname = rs.getString("authority_cname");
                String authority_ename = rs.getString("authority_ename");
                boolean checked = rs.getBoolean("checked");
                Integer roleUid = rs.getInt("role_uid");

                if (!authorityMap.containsKey(client_id)) {
                    authorityMap.put(client_id, new ArrayList<>());
                }
                List<Authority> authorities = authorityMap.get(client_id);
                if (checked) {
                    Authority authority = new Authority(client_authority_id, authority_ename, authority_cname);
                    authority.setRoleUid(roleUid);
                    authorities.add(authority);
                }
            }, user.getUsername());
            u.setAuthorityMap(authorityMap);
            u.setPassword(null);
            session.setShareAttribute("user", u);
            return u;
        }
        return null;
    }

    public net.gvsun.session.dto.User getUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            net.gvsun.session.dto.User u = new net.gvsun.session.dto.User(
                    user.getUsername(),
                    user.getPassword(),
                    user.getCname(),
                    user.getGender(),
                    user.getPhone(),
                    user.getEmail()
            );
            u.setGender(user.getGender());
            List<GvsunDataSourceDto> datasources;
            if (propertiesConfigure.getEnableLoginByPhone()) {
                datasources = datasourceService.getUserDataSourcesByPhone(user.getPhone());
            } else {
                datasources = datasourceService.getUserDataSourcesByUsernameAndPassword(username, user.getPassword());
            }
            List<String> ds = new ArrayList<>();
            for (GvsunDataSourceDto dataSourceDto : datasources) {
                ds.add(dataSourceDto.getSchoolName());
            }
            u.setDatasources(ds);
            try {
                Result<SchoolAcademyDTO> res = dataShareFeign.getSchoolAcademyInfoByUserName(user.getUsername());
                if (res.getCode() == 0) {
                    u.setSchoolAcademy(res.getData());
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            Map<String, List<Authority>> authorityMap = new HashMap<>();
            //获取用户权限
            jdbcOperations.query("call proc_authority(?)", rs -> {
                String client_id = rs.getString("client_id");
                String client_name = rs.getString("client_name");
                String client_authority_id = rs.getString("client_authority_id");
                String authority_cname = rs.getString("authority_cname");
                String authority_ename = rs.getString("authority_ename");
                boolean checked = rs.getBoolean("checked");
                Integer roleUid = rs.getInt("role_uid");

                if (!authorityMap.containsKey(client_id)) {
                    authorityMap.put(client_id, new ArrayList<>());
                }
                List<Authority> authorities = authorityMap.get(client_id);
                if (checked) {
                    Authority authority = new Authority(client_authority_id, authority_ename, authority_cname);
                    authority.setRoleUid(roleUid);
                    authorities.add(authority);
                }
            }, user.getUsername());
            u.setAuthorityMap(authorityMap);
            u.setPassword(null);
            return u;
        }
        return null;
    }
}
