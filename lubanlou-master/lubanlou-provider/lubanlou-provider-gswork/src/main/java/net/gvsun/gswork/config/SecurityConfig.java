package net.gvsun.gswork.config;

import net.gvsun.gswork.service.common.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;

@Configuration
@EnableWebSecurity
/****************************************************************************
 * Description: 系统框架定义-排课管理系统-系统security安全管理{系统security安全管理}
 *
 * @author:魏诚
 * @date :时间 2016-09-26
 ****************************************************************************/
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    /****************************************************************************
     * Description: 系统框架定义-排课管理系统-系统security安全管理-获取登录用户的详细信息{获取登录用户的详细信息}
     *
     * @author:魏诚
     * @date :时间 2016-09-26
     ****************************************************************************/
    @Override
    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }

    /****************************************************************************
     * Description: 系统框架定义-排课管理系统-系统security安全管理-自定义验证{自定义验证}
     *
     * @author:魏诚
     * @date :时间 2016-09-26
     ****************************************************************************/
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService());
    }

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    /**
     * 自定义httpFirewallBean
     */
    @Bean
    public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
        DefaultHttpFirewall firewall = new DefaultHttpFirewall();
        // 设置url中允许出现双斜杠
        firewall.setAllowUrlEncodedSlash(true);
        return firewall;
    }

    /****************************************************************************
     * Description: 系统框架定义-排课管理系统-系统security安全管理-权限分配管理{忽略的静态资源}
     *
     * @author:魏诚
     * @date :时间 2016-09-26
     ****************************************************************************/
    @Override
    public void configure(WebSecurity web) {
        // 使用自定义防火墙
        web.httpFirewall(allowUrlEncodedSlashHttpFirewall());
        web.ignoring().antMatchers("/bootstrap/**", "/css/**", "/fonts/**", "/images/**", "/js/**", "/lab_video/**", "/layui/**", "/video/**");
    }

    // 暂时取消加密机制
    @Bean
    public static NoOpPasswordEncoder passwordEncoder() {
        return (NoOpPasswordEncoder) NoOpPasswordEncoder.getInstance();
    }

    /****************************************************************************
     * Description: 系统框架定义-排课管理系统-系统security安全管理-权限分配管理{权限分配管理}
     *
     * @author:魏诚
     * @date :时间 2016-09-26
     ****************************************************************************/
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.headers().frameOptions().sameOrigin();
        http.authorizeRequests().antMatchers( "/api/**", "/webapp/**","/auth/**")
                .permitAll().anyRequest().authenticated();
        http.formLogin().loginPage("/webapp/login").failureUrl("/webapp/fail").permitAll().defaultSuccessUrl("/views/mainindex");
        http.logout().logoutSuccessUrl("/webapp/logout");

    }

}