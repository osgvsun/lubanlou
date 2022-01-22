package net.gvsun.service;

import net.gvsun.config.PropertiesConfigure;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.entity.User;
import net.gvsun.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class CheckService {
    private final PropertiesConfigure propertiesConfigure;
    private final UserRepository userRepository;

    @Autowired
    public CheckService(PropertiesConfigure propertiesConfigure,
                        UserRepository userRepository) {
        this.propertiesConfigure = propertiesConfigure;
        this.userRepository = userRepository;
    }

    /**
     * 手机号注册检查
     *
     * @param checkSecurityCode 是否检查验证码
     */
    public USER_REGISTER_ERROR checkRegister(HttpServletRequest request, boolean checkSecurityCode) {
        String username = request.getParameter("username");
        String phone = request.getParameter("phone");
        if (phone.endsWith(",")) {
            phone = phone.substring(0, phone.length() - 1);
        }
        String schoolName = request.getParameter("schoolName");
        String[] schoolNames = schoolName.split(",");

        if (checkSecurityCode) {
            if (request.getSession().getAttribute("securityCodeStartTime") != null) {
                Long securityCodeStartTime = Long.valueOf(request.getSession().getAttribute("securityCodeStartTime").toString());
                if (System.currentTimeMillis() / 1000 - securityCodeStartTime > propertiesConfigure.getSecurityCodeExpirationTime())
                    return USER_REGISTER_ERROR.CAPTCHA_EXPIRE;
            }
            String securityCode = (String) request.getSession().getAttribute("securityCode");
            String yourSecurityCode = request.getParameter("securityCode");
            if (RegisterService.isPhone(phone) == RegisterService.INPUT_TYPE.PHONE) {
                if (!yourSecurityCode.equals(securityCode)) {
                    return USER_REGISTER_ERROR.CAPTCHA_INCORRECT;
                }
            }
        }
        for (String sc : schoolNames) {
            ClientDatabaseContextHolder.set(sc);
            User byUsername = userRepository.findByUsername(username);
            if (byUsername != null) {
                return USER_REGISTER_ERROR.USER_EXISTED;
            } else {
                User byPhone = userRepository.findByPhone(phone);
                if (byPhone != null) {
                    return USER_REGISTER_ERROR.PHONE_EXISTED;
                }
            }
            ClientDatabaseContextHolder.clear();
        }
        return null;
    }

    public enum USER_REGISTER_ERROR {
        USER_EXISTED("用户名已存在"),                        //用户已存在
        PHONE_EXISTED("手机号已被绑定"),                     //手机号已被绑定
        CAPTCHA_EXPIRE("验证码过期"),                        //验证码过期
        CAPTCHA_INCORRECT("验证码错误");                     //验证码错误

        private String desc;

        USER_REGISTER_ERROR(String desc) {
            this.desc = desc;
        }

        @Override
        public String toString() {
            return desc;
        }
    }
}
