package net.gvsun.teacherinformationcenter.config;

import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.teacherinformationcenter.util.Md5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class SpitterUserService implements UserDetailsService {
    private final RestTemplate restTemplate;
    @Value("${oauth2Host}")
    private String oauth2Host;

    @Value("${uia.secretKey:}")
    private String secretKey;

    // 是否使用统一身份认证
    @Value("${uia.isUia:}")
    private String uiaEnble;

    @Autowired
    public SpitterUserService(@Qualifier("datasourceRestTemplate") RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            System.out.println("===================>" + ClientDatabaseContextHolder.getClientDatabase());
//            Map<String, String> user = restTemplate.getForObject(oauth2Host + "/user/" + username, Map.class);
            List<GrantedAuthority> authorityList = new ArrayList<>();
            //加密后的字符串
            String md5str = username;
            if ("true".equals(uiaEnble)) {
                //MD5加密
                String str = username + secretKey;
                //加密后的字符串
                md5str = Md5.createMD5(str);
            }
            return new User(username, md5str, authorityList);
        } catch (Exception e) {
            System.out.println("为查询到用户" + username + "数据源："+ ClientDatabaseContextHolder.getClientDatabase());
            throw new UsernameNotFoundException("user " + username + "not found");
        }
    }
}