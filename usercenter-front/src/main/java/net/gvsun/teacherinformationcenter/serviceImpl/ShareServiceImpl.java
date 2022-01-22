package net.gvsun.teacherinformationcenter.serviceImpl;

import com.fasterxml.jackson.core.type.TypeReference;
import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.datasource.dto.GvsunDataSourceDto;
import net.gvsun.oauth2.service.CustomUserDetailsService;
import net.gvsun.session.UnifySessionFilter;
import net.gvsun.session.dto.Authority;
import net.gvsun.session.repository.Session;
import net.gvsun.teacherinformationcenter.service.ShareService;
import net.gvsun.teacherinformationcenter.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.Principal;
import java.util.*;

@Service
public class ShareServiceImpl implements ShareService {
    @Value("${apiGateWayHost}")
    protected String apiGateWayHost;
    @Value("${authorization.siteEnName}")
    private String siteEnName;
    @Value("${authorization.siteSecret}")
    private String siteSecret;
    @Value("${oauth2Host}")
    private String oauth2Host;
    private CustomUserDetailsService customUserDetailsService;
    private final ClientDatabaseContext clientDatabaseContext;
    private final RestTemplate restTemplate;

    @Autowired
    public ShareServiceImpl(CustomUserDetailsService customUserDetailsService,
                            ClientDatabaseContext clientDatabaseContext,
                            @Qualifier("datasourceRestTemplate") RestTemplate restTemplate) {
        this.customUserDetailsService = customUserDetailsService;
        this.clientDatabaseContext = clientDatabaseContext;
        this.restTemplate = restTemplate;
    }


    /*public User getCurrentUser(HttpServletRequest request) throws IOException {
        org.springframework.security.core.Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Object principal = authentication.getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            username = userDetails.getUsername();
        } else if (principal instanceof Principal) {
            Principal p = (Principal) principal;
            username = p.getName();
        } else {
            username = principal.toString();
        }
        User user = new User();
        user.setUsername(username);
        return user;
    }*/


    public net.gvsun.session.dto.User getCurrentUserFromUnifySession(HttpServletRequest request) {
        //共享session获取登录人信息
        try {
            UnifySessionFilter<Session>.UnifyRequestWrapper.HttpSessionWrapper session = (UnifySessionFilter<Session>.UnifyRequestWrapper.HttpSessionWrapper) request.getSession();
            net.gvsun.session.dto.User user = null;
            /*net.gvsun.session.dto.User user = session.getShareAttribute(
                    "oauth2",   //该数据由oauth2管理
                    "user",     //属性名
                    new TypeReference<net.gvsun.session.dto.User>() {
                    }
            );*/
            if (user == null) {
                org.springframework.security.core.Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
                Object principal = authentication.getPrincipal();
                String username;
                if (principal instanceof UserDetails) {
                    UserDetails userDetails = (UserDetails) principal;
                    username = userDetails.getUsername();
                } else if (principal instanceof Principal) {
                    Principal p = (Principal) principal;
                    username = p.getName();
                } else {
                    username = principal.toString();
                }
                if (!StringUtils.isEmpty(username)) {
                    System.out.println("===================>" + ClientDatabaseContextHolder.getClientDatabase());
                    user = restTemplate.getForObject(oauth2Host + "/session/user?username=" + username, net.gvsun.session.dto.User.class);
                }
            }
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public GvsunDataSourceDto getCurrDbSource() {
        return clientDatabaseContext.getCurrentDataSourceDto();
    }
}
