package net.gvsun.service;

import net.gvsun.config.PropertiesConfigure;
import net.gvsun.oauth2.internal.KafkaMessage;
import net.gvsun.entity.Audit;
import net.gvsun.entity.User;
import net.gvsun.repository.AuditRepository;
import net.gvsun.repository.UserRepository;
import net.gvsun.service.datasource.InvalidCacheService;
import net.gvsun.oauth2.internal.Quick;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class AuditService {
    private final AuditRepository auditRepository;
    private final UserRepository userRepository;
    private final JdbcOperations jdbcOperations;
    private final RegisterService registerService;
    private final InvalidCacheService cacheService;
    private final PropertiesConfigure propertiesConfigure;

    @Autowired
    public AuditService(AuditRepository auditRepository,
                        UserRepository userRepository,
                        JdbcOperations jdbcOperations,
                        RegisterService registerService, InvalidCacheService cacheService, PropertiesConfigure propertiesConfigure) {
        this.auditRepository = auditRepository;
        this.userRepository = userRepository;
        this.jdbcOperations = jdbcOperations;
        this.registerService = registerService;
        this.cacheService = cacheService;
        this.propertiesConfigure = propertiesConfigure;
    }

    /**
     * 获取未审核用户列表
     *
     * @param userType 用户类型：0普通用户，1企事业用户
     * @return 返回未审核用户
     */
    public List<User> getUnauditedUsers(int userType,@Nullable String search) {
        List<Audit> audits = Objects.isNull(search)?auditRepository.findByAuditedOrderByCreatedTimeAsc(true):auditRepository.findAudit(true,search);
        List<User> users_0 = new ArrayList<>();
        List<User> users_1 = new ArrayList<>();
        for (Audit a : audits) {
            User user = userRepository.findByUsername(a.getUsername());
            if (user.getEnterprise()) {
                users_1.add(user);
            } else {
                users_0.add(user);
            }
        }
        return userType == 0 ? users_0 : users_1;
    }

    /**
     * 获取已审核用户
     *
     * @param userType 用户类型：0普通用户，1企事业用户
     */
    public List<Map<String, Object>> getAuditedUsers(int userType,@Nullable String search) throws IllegalAccessException {
        List<Audit> audits = Objects.isNull(search)?auditRepository.findByAuditedOrderByCreatedTimeAsc(true):auditRepository.findAudit(true,search);
        List<Map<String, Object>> users_0 = new ArrayList<>();
        List<Map<String, Object>> users_1 = new ArrayList<>();
        for (Audit a : audits) {
            User user = userRepository.findByUsername(a.getUsername());
            if (user.getEnterprise()) {
                Map<String, Object> map = Quick.entity2Map(user);
                map.put("comment", a.getComment());
                users_1.add(map);
            } else {
                Map<String, Object> map = Quick.entity2Map(user);
                map.put("comment", a.getComment());
                users_0.add(map);
            }
        }
        return userType == 0 ? users_0 : users_1;
    }

    public void audit(String username, boolean pass, String comment, String collegeId) {
        if (pass) {
            jdbcOperations.update("update audit set audited = true, status = 1, comment = ? where username = ? and type = 'register'", comment, username);
            jdbcOperations.update("update users set enabled = true where username = ?", username);
            registerService.sendUserInfoToTopic(null, username, KafkaMessage.MESSAGE_TYPE.USER_REGISTER, collegeId);
        } else {
            jdbcOperations.update("update audit set audited = true, comment = ? where username = ? and type = 'register'", comment, username);
            jdbcOperations.update("update users set enabled = false where username = ?", username);
        }
        if (!propertiesConfigure.getWithoutAudit())
            registerService.sendVerified(username, pass);
        User user = userRepository.findByUsername(username);
        if (user != null) {//清除缓存
            cacheService.getUserDataSourcesByUsernameAndPassword(username, user.getPassword());
            cacheService.getUserDataSourcesByPhone(user.getPhone());
        }
    }
}
