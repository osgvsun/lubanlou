package net.gvsun.teacherinformationcenter.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import net.gvsun.session.ShareAttribute;
import net.gvsun.session.UnifySessionFilter;
import net.gvsun.session.repository.Session;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Collection;

@RestController
@RequestMapping("/test")
public class Test {

    @GetMapping("/1")
    public Object test(HttpServletRequest request) throws IOException {
        @SuppressWarnings("unchecked")
        UnifySessionFilter<Session>.UnifyRequestWrapper.HttpSessionWrapper httpSessionWrapper = (UnifySessionFilter<Session>.UnifyRequestWrapper.HttpSessionWrapper) request.getSession();
        ShareObject shareAttribute = httpSessionWrapper.getShareAttribute("oauth2", "shareObject", new TypeReference<ShareObject>() {
        });
        return shareAttribute;
    }

    @GetMapping("/2")
    public Object test2(HttpServletRequest request) throws IOException {
        org.springframework.security.core.Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Object principal = authentication.getPrincipal();
        return authentication;
    }
}
