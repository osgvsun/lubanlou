package net.gvsun.controller;

import net.gvsun.entity.User;
import net.gvsun.repository.UserRepository;
import net.gvsun.service.AuditService;
import net.gvsun.service.RegisterService;
import net.gvsun.service.datasource.InvalidCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 审核
 */
@RestController
@CrossOrigin
@RequestMapping("/audit")
public class AuditController {
    private final InvalidCacheService cacheService;
    private final UserRepository userRepository;
    private AuditService auditService;
    private JdbcOperations jdbcOperations;
    private RegisterService registerService;

    @Autowired
    public AuditController(AuditService auditService,
                           JdbcOperations jdbcOperations,
                           RegisterService registerService,
                           InvalidCacheService cacheService,
                           UserRepository userRepository) {
        this.auditService = auditService;
        this.jdbcOperations = jdbcOperations;
        this.registerService = registerService;
        this.cacheService = cacheService;
        this.userRepository = userRepository;
    }



    /**
     * 注册审核--审核用户
     *
     * @param username 用户名
     * @param pass     通过还是不通过
     * @param comment  备注
     */
    @PostMapping("/register/audit")
    public void registerAudit(@RequestParam String username, @RequestParam Boolean pass,
                              @RequestParam(defaultValue = "") String comment,
                              @RequestParam(required = false) String collegeId) {
        auditService.audit(username, pass, comment, collegeId);
    }

    /**
     * 注册审核--获取未审核用户
     *
     * @param userType 用户类型：0普通用户，1企事业用户
     */
    @GetMapping("/register/unaudited")
    public List<User> userUnaudited(@RequestParam int userType,@RequestParam(required = false)String search) {
        return auditService.getUnauditedUsers(userType,search);
    }

    /**
     * 获取已审核用户
     *
     * @param userType 用户类型：0普通用户，1企事业用户
     */
    @GetMapping(value = {"/register/audited"})
    public List<Map<String, Object>> audited(@RequestParam int userType,@RequestParam(required = false) String search) throws IllegalAccessException {
        return auditService.getAuditedUsers(userType,search);
    }
}
