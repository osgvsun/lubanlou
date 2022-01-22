package net.gvsun.service;

import com.easycache.annotation.Cache;
import net.gvsun.config.PropertiesConfigure;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.datasource.dto.GvsunDataSourceDto;
import net.gvsun.entity.User;
import net.gvsun.repository.UserRepository;
import net.gvsun.service.datasource.DatasourceService;
import net.gvsun.util.AesUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedList;
import java.util.List;

/**
 * 用户登陆检查
 *
 * @author 陈敬
 * @since 1.3.0-SNAPSHOT
 */
@Service
public class LoginService {
    private final PropertiesConfigure propertiesConfigure;
    private final DatasourceService datasourceService;
    private final UserRepository userRepository;
    private final LoginStatisticService loginStatisticService;
    private User user = null;
    private ERROR errorType = null;
    private String targetSchoolName = null;

    @Autowired
    public LoginService(PropertiesConfigure propertiesConfigure,
                        DatasourceService datasourceService,
                        UserRepository userRepository, LoginStatisticService loginStatisticService) {
        this.propertiesConfigure = propertiesConfigure;
        this.datasourceService = datasourceService;
        this.userRepository = userRepository;
        this.loginStatisticService = loginStatisticService;
    }

    public LoginService checkForLogin(HttpServletRequest request) throws Exception {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        if (propertiesConfigure.getPasswordEncode())
            password = aesDecrypt(password);
        User user = null;
        ERROR errorType = null;
        RegisterService.INPUT_TYPE inputType = RegisterService.INPUT_TYPE.USERNAME;
        if (propertiesConfigure.getEnableLoginByPhone()) {
            inputType = RegisterService.INPUT_TYPE.PHONE;
        }
        String tem = ClientDatabaseContextHolder.getClientDatabase();
        boolean userDisabled = false;
        switch (inputType) {
            case PHONE:
                if (tem != null) {
                    ClientDatabaseContextHolder.set(targetSchoolName = tem);
                    user = userRepository.findByPhoneAndPassword(username, password);
                }
                if (user == null || !user.getEnabled()) {
                    if (user != null)
                        userDisabled = true;
                    List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesByPhone(username);
                    LinkedList<GvsunDataSourceDto> lds = new LinkedList<>();
                    for (GvsunDataSourceDto d : ds) {
                        if (d.isDefaultDataSource()) {
                            System.out.println("找到默认数据源:" + d.getSchoolName());
                            lds.add(d);
                            break;
                        }
                    }
                    for (GvsunDataSourceDto d : ds) {
                        if (!d.isDefaultDataSource()) {
                            lds.add(d);
                        }
                    }
                    for (GvsunDataSourceDto d : lds) {
                        System.out.println(d.getSchoolName());
                        if (user != null) {
                            if (user.getEnabled()) {
                                userDisabled = false;
                                loginStatisticService.stat(DatasourceService.LoginType.PHONE, username);
                                break;
                            } else {
                                userDisabled = true;
                            }
                        }
                        ClientDatabaseContextHolder.set(targetSchoolName = d.getSchoolName());
                        System.out.println("1targetSchoolName=" + targetSchoolName);
                        user = userRepository.findByPhoneAndPassword(username, password);
                    }
                }
                if (user != null) {
                    if (userDisabled) {
                        errorType = ERROR.USER_DISABLED;
                    }
                    if (user.getFirstLogin()) {
                        errorType = ERROR.FIRST_LOGGING;
                    }
                } else {
                    errorType = ERROR.USER_PHONE_NOT_EXIST;
                }
                break;
            case USERNAME:
                if (tem != null) {
                    ClientDatabaseContextHolder.set(targetSchoolName = tem);
                    user = userRepository.findByUsernameAndPassword(username, password);
                }
                if (user == null || !user.getEnabled()) {
                    List<GvsunDataSourceDto> ds = datasourceService.getUserDataSourcesByUsernameAndPassword(username, password);
                    LinkedList<GvsunDataSourceDto> lds = new LinkedList<>(ds);
                    lds.sort((o1, o2) -> {
                        if (o1.isDefaultDataSource())
                            return -1;
                        else if (o2.isDefaultDataSource())
                            return 1;
                        else
                            return 0;
                    });
                    for (GvsunDataSourceDto d : lds) {
                        if (user != null) {
                            if (user.getEnabled()) {
                                userDisabled = false;
                                loginStatisticService.stat(DatasourceService.LoginType.PHONE, username);
                                break;
                            } else {
                                userDisabled = true;
                            }
                        }
                        ClientDatabaseContextHolder.set(targetSchoolName = d.getSchoolName());
                        user = userRepository.findByUsernameAndPassword(username, password);
                    }
                }
                if (user != null) {
                    if (userDisabled) {
                        errorType = ERROR.USER_DISABLED;
                    }
                    if (user.getFirstLogin()) {
                        errorType = ERROR.FIRST_LOGGING;
                    }
                } else {
                    errorType = ERROR.USERNAME_NOT_EXIST;
                }
                break;
            default:
                break;
        }

        // 验证码校验
        String your_captcha = request.getParameter("captcha");
        String my_captcha = (String) request.getSession().getAttribute("captcha");
        if (propertiesConfigure.getEnableTestCaptcha()) {
            if (your_captcha.equals("AF46"))
                your_captcha = my_captcha;
        }

        if (StringUtils.isEmpty(my_captcha) || !my_captcha.equals(your_captcha)) {
            errorType = ERROR.CAPTCHA_INCORRECT;
        }

        this.errorType = errorType;
        this.user = user;
        return this;
    }

    public User getUser() {
        return user;
    }

    public ERROR getErrorType() {
        return errorType;
    }

    public String getTargetSchoolName() {
        return targetSchoolName;
    }

    @Cache(key = "'AES'", hkey = "#args[0]")
    public String aesDecrypt(String encode) throws Exception {
        return AesUtil.decrypt(encode);
    }

    public enum ERROR {
        USERNAME_NOT_EXIST("用户名不存在"),
        USER_PHONE_NOT_EXIST("用户手机号不存在"),
        CAPTCHA_INCORRECT("验证码错误"),
        FIRST_LOGGING("首次登陆，请修改密码"),
        USER_DISABLED("用户被禁用");

        private String desc;

        ERROR(String desc) {
            this.desc = desc;
        }

        @Override
        public String toString() {
            return desc;
        }
    }
}
