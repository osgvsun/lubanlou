package net.gvsun.controller;

import com.aliyuncs.exceptions.ClientException;
import com.google.code.kaptcha.Producer;
import net.gvsun.config.PropertiesConfigure;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.datasource.dto.GvsunDataSourceDto;
import net.gvsun.datasource.dto.SiteDto;
import net.gvsun.oauth2.internal.ResultDataDto;
import net.gvsun.entity.Audit;
import net.gvsun.entity.OperationLog;
import net.gvsun.entity.User;
import net.gvsun.repository.AuditRepository;
import net.gvsun.repository.OperationLogRepository;
import net.gvsun.repository.UserRepository;
import net.gvsun.service.AuditService;
import net.gvsun.service.CheckService;
import net.gvsun.service.RegisterService;
import net.gvsun.service.UserDetailService;
import net.gvsun.service.datasource.InvalidCacheService;
import net.gvsun.service.redis.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 用户注册
 *
 * @author 陈敬
 * @since 1.3.0-SNAPSHOT
 */
@Controller
public class RegisterController {
    private final Producer captchaProducer;
    private final UserDetailService userDetailService;
    private final RedisService redisService;
    private final PropertiesConfigure propertiesConfigure;
    private final OperationLogRepository operationLogRepository;
    private final RegisterService registerService;
    @Value("${resourceContainerHost}")
    public String resourceContainerHost;
    @Value("${apiGateWayHost}")
    public String apiGateWayHost;
    @Value("${apiSuccessfulJump}")
    public String apiSuccessfulJump;
    private UserRepository userRepository;
    private AuditRepository auditRepository;
    private CheckService checkService;
    private final InvalidCacheService cacheService;
    private final AuditService auditService;

    @Autowired
    public RegisterController(UserRepository userRepository,
                              AuditRepository auditRepository,
                              CheckService checkService,
                              Producer captchaProducer,
                              UserDetailService userDetailService,
                              RedisService redisService,
                              PropertiesConfigure propertiesConfigure,
                              OperationLogRepository operationLogRepository, RegisterService registerService, InvalidCacheService cacheService, AuditService auditService) {

        this.userRepository = userRepository;
        this.auditRepository = auditRepository;
        this.checkService = checkService;
        this.captchaProducer = captchaProducer;
        this.userDetailService = userDetailService;
        this.redisService = redisService;
        this.propertiesConfigure = propertiesConfigure;
        this.operationLogRepository = operationLogRepository;
        this.registerService = registerService;
        this.cacheService = cacheService;
        this.auditService = auditService;
    }

    /**
     * 注册用户
     *
     * @param username     工号
     * @param password     密码
     * @param cname        中文名
     * @param phone        手机号
     * @param schoolName   要注册到的学校
     * @param securityCode 验证码
     */
    @PostMapping("/userRegister")
    public String userRegister(@RequestParam String username,
                               @RequestParam String password,
                               @RequestParam String email,
                               @RequestParam String cname,
                               @RequestParam String phone,
                               @RequestParam(defaultValue = "") String testerPhone,
                               @RequestParam String schoolName,
                               @RequestParam String securityCode,
                               HttpServletRequest request,
                               Map<String, Object> module) {
        if (phone.endsWith(",")) {
            phone = phone.substring(0, phone.length() - 1);
        }
        module.put("web_title", "注册结果");
        module.put("original_uri", "/index");
        CheckService.USER_REGISTER_ERROR user_register_error = checkService.checkRegister(request, true);
        if (user_register_error == null) {
            String[] schoolNames = schoolName.split(",");
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            user.setCname(cname);
            user.setPhone(phone);
            user.setEnabled(false);
            user.setFirstLogin(false);
            user.setEnterprise(false);
            user.setEmail(email);
            for (String sn : schoolNames) {
                ClientDatabaseContextHolder.set(sn);
                userRepository.saveAndFlush(user);
                Audit audit = new Audit();
                audit.setUsername(username);
                audit.setType("register");
                audit.setStatus(0);
                audit.setAudited(false);
                auditRepository.save(audit);

                OperationLog log = new OperationLog();
                log.setUsername(username);
                log.setDatetime(new Date());
                log.setResult("注册成功");
                log.setType("注册");
                operationLogRepository.save(log);
                if (!propertiesConfigure.getWithoutAudit())
                    registerService.sendAudit(username);
                else
                    auditService.audit(username, true, "", propertiesConfigure.getCollegeId());
            }
            module.put("success", true);
            if (!propertiesConfigure.getWithoutAudit())
                module.put("msg", String.format("注册成功！你的手机号为%s（注册后等待管理员审核）", phone));
            else
                module.put("msg", String.format("注册成功！你的手机号为%s", phone));
            module.put("resourceContainerHost", resourceContainerHost);
            module.put("apiSuccessfulJump", apiSuccessfulJump);
            cacheService.getUserDataSourcesByUsernameAndPassword(username, user.getPassword());
            cacheService.getUserDataSourcesByPhone(user.getPhone());
            return "result";
        } else {
            module.put("success", false);
            module.put("msg", user_register_error.toString());
            // 注册失败,值传入页面
            module.put("username", username);
            module.put("password", password);
            module.put("email", email);
            module.put("cname", cname);
            module.put("phone", phone);
            module.put("testerPhone", testerPhone);
            module.put("schoolName", schoolName);
            module.put("securityCode", securityCode);
            module.put("enableTesterPhone", propertiesConfigure.getEnableTesterPhone());
            SiteDto siteDto = redisService.getSiteDtoFromRedis();
            List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
            module.put("dataSourceDtos", dataSourceDtos);

            OperationLog log = new OperationLog();
            log.setUsername(username);
            log.setDatetime(new Date());
            log.setResult("注册失败：" + user_register_error.toString());
            log.setType("注册");
            operationLogRepository.save(log);
            module.put("resourceContainerHost", resourceContainerHost);
            return "user_register";
        }
    }


    /**
     * 获取用户注册页面
     */
    @GetMapping("/userRegister")
    public String userRegister2(Map<String, Object> module, String d, String type) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        module.put("dataSourceDtos", dataSourceDtos);
        module.put("enableTesterPhone", propertiesConfigure.getEnableTesterPhone());
        module.put("resourceContainerHost", resourceContainerHost);
        module.put("defaultSource", d);
        module.put("type", type);
        module.put("apiGateWayHost", apiGateWayHost);
        module.put("apiSuccessfulJump", apiSuccessfulJump);
        return "user_register";
    }

    /**
     * 返回服务条款页面
     */
    @GetMapping("/tos")
    public String tos() {
        return "tos";
    }


    /**
     * 企事业用户注册
     *
     * @param username   用户名
     * @param password   密码
     * @param email      邮箱
     * @param cname      企业名
     * @param phone      手机号
     * @param schoolName 注册到的数据源
     */
    @PostMapping("/enterpriseUserRegister")
    @ResponseBody
    public ResultDataDto<String> enterpriseUserRegister(@RequestParam String username,
                                                        @RequestParam String password,
                                                        @RequestParam String email,
                                                        @RequestParam String cname,
                                                        @RequestParam String phone,
                                                        @RequestParam String schoolName,
                                                        HttpServletRequest request) {
        ResultDataDto<String> res = new ResultDataDto<>(0, "success");
        if (phone.endsWith(",")) {
            phone = phone.substring(0, phone.length() - 1);
        }

        CheckService.USER_REGISTER_ERROR user_register_error = checkService.checkRegister(request, false);
        if (user_register_error == null) {
            String[] schoolNames = schoolName.split(",");
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            user.setCname(cname);
            user.setPhone(phone);
            user.setEmail(email);
            user.setEnabled(false);
            user.setFirstLogin(false);
            user.setEnterprise(true);
            for (String sn : schoolNames) {
                ClientDatabaseContextHolder.set(sn);
                userRepository.saveAndFlush(user);
                Audit audit = new Audit();
                audit.setUsername(username);
                audit.setType("register");
                audit.setStatus(0);
                audit.setAudited(false);
                auditRepository.saveAndFlush(audit);

                userDetailService.setUserAuthority(username, "GvsunUserCenter", 4);
                userDetailService.setUserAuthority(username, "GvsunUserCenter", 3);

                OperationLog log = new OperationLog();
                log.setUsername(username);
                log.setDatetime(new Date());
                log.setResult("注册成功");
                log.setType("注册");
                operationLogRepository.save(log);
                ClientDatabaseContextHolder.clear();
            }
        } else {
            res.setCode(1);
            res.setMsg(user_register_error.toString());
            OperationLog log = new OperationLog();
            log.setUsername(username);
            log.setDatetime(new Date());
            log.setResult("注册失败：" + user_register_error.toString());
            log.setType("注册");
            operationLogRepository.save(log);
        }
        return res;
    }

    @GetMapping("/getSecurityCode")
    @ResponseBody
    public ResultDataDto<String> getSecurityCode(HttpServletRequest request,
                                                 @RequestParam String phone,
                                                 @RequestParam(defaultValue = "") String testerPhone,
                                                 @RequestParam(defaultValue = "false") boolean isResetPassword,
                                                 @RequestParam String schoolName) throws ClientException {
        String[] schoolNames = schoolName.split(",");
        ResultDataDto<String> result = new ResultDataDto<>(0, "success");
        //boolean exist = userDetailService.phoneExist(phone);
        boolean exist = false;
        String clientDatabase = ClientDatabaseContextHolder.getClientDatabase();
        for (String s : schoolNames) {
            ClientDatabaseContextHolder.set(s);
            User user = userRepository.findByPhone(phone);
            if (user != null) {
                exist = true;
                break;
            }
            ClientDatabaseContextHolder.clear();
        }
        ClientDatabaseContextHolder.set(clientDatabase);
        if (exist && !isResetPassword) {
            result.setCode(1);
            result.setMsg(schoolName + ":手机号已被他人绑定");
        } else {
            request.getSession().setAttribute("securityCodeStartTime", System.currentTimeMillis() / 1000);
            String code = captchaProducer.createText();
            request.getSession().setAttribute("securityCode", code);
            RegisterService.sendSms(code, phone);
            if (propertiesConfigure.getEnableTesterPhone() && !StringUtils.isEmpty(testerPhone)) {
                RegisterService.sendSms(phone + "x" + code, testerPhone);
            }
        }
        return result;
    }

    @GetMapping("/checkSecurityCode")
    @ResponseBody
    public ResultDataDto<String> checkSecurityCode(@RequestParam String securityCode, HttpServletRequest req) {
        ResultDataDto<String> result = new ResultDataDto<>(0, "success");
        String code = (String) req.getSession().getAttribute("securityCode");
        Object securityCodeStartTime = req.getSession().getAttribute("securityCodeStartTime");
        Long start = null;
        if (securityCodeStartTime != null) {
            start = Long.valueOf(securityCodeStartTime.toString());
        }
        if (StringUtils.isEmpty(securityCode) || !securityCode.equals(code)) {
            result.setCode(1);
            result.setMsg("验证码不正确");
        } else if (start == null) {
            result.setCode(1);
            result.setMsg("{{{(>_<)}}}");
        } else if (System.currentTimeMillis() / 1000 - start > propertiesConfigure.getSecurityCodeExpirationTime()) {
            result.setCode(1);
            result.setMsg("验证码过期了");
        }
        return result;
    }

    @GetMapping("/checkUserExist")
    @ResponseBody
    public ResultDataDto<Boolean> checkUserExist(@RequestParam String username, @RequestParam String schoolName) {
        ClientDatabaseContextHolder.set(schoolName);
        ResultDataDto<Boolean> result = new ResultDataDto<>(0, "success");
        User user = userRepository.findByUsername(username);
        if (user == null) {
            result.setData(false);
        } else {
            result.setData(true);
        }
        return result;
    }
}
