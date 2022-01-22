package net.gvsun.teacherinformationcenter.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class SecurityController {
    // 是否使用统一身份认证
    @Value("${uia.isUia:}")
    private String uiaEnble;

    @GetMapping("/login")
    public String login() {
        if ("true".equals(uiaEnble)) {
            return "redirect:/webapp/login";
        } else {
            return "/login";
        }
    }
}
