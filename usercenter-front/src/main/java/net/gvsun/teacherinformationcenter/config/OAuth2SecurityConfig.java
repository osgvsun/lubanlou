//package net.gvsun.teacherinformationcenter.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.web.authentication.logout.LogoutHandler;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@Configuration
//@EnableOAuth2Sso
//public class OAuth2SecurityConfig extends WebSecurityConfigurerAdapter {
//    @Value("${security.oauth2.client.logoutOAuth2Uri}")
//    private String logoutOAuth2Uri;
//    @Value("${security.oauth2.client.logoutCallback}")
//    private String logoutCallback;
//
//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        web.ignoring().antMatchers("/css/**", "/images/**", "/font/**", "/fonts/**", "/js/**", "/layui/**", "/plugins/**", "/jsImg/**"
//                , "/lib/**", "/modules/**", "/modules/configcenter/**", "/dtyle/**", "/tpl/**", "/lib/**", "/**/*.js", "/**/*.css", "/**/*.ico", "/**/*.jpg", "/**/*.gif");
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.authorizeRequests()
//                .antMatchers("/webapp/**", "/register", "/enterprise_register", "/GSI_register", "/rtc/index2").permitAll()
//                // 其他地址的访问均需验证权限
//                .anyRequest().authenticated().and()
//                // 登陆入口
//                .formLogin().loginPage("/login").failureUrl("/webapp/fail").permitAll()
//                .and()
//                .csrf().disable()
//                .logout().logoutUrl("/logout").addLogoutHandler(new LogoutHandler() {
//                    @Override
//                    public void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) {
//                        try {
//                            httpServletResponse.sendRedirect(logoutOAuth2Uri + "?url=" + logoutCallback);
//                        } catch (IOException e) {
//                            e.printStackTrace();
//                        }
//                    }
//                });
//        http.headers().frameOptions().sameOrigin();
//    }
//}
//
