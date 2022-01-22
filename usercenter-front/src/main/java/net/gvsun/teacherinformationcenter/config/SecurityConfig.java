package net.gvsun.teacherinformationcenter.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final SpitterUserService spitterRepository;

    @Autowired
    public SecurityConfig(SpitterUserService spitterRepository) {
        this.spitterRepository = spitterRepository;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(spitterRepository).passwordEncoder(NoOpPasswordEncoder.getInstance());
    }

    /****************************************************************************
     * Description: 系统框架定义--系统security安全管理-权限分配管理{忽略的静态资源}
     *
     * @author:魏诚
     * @date :时间 2016-09-26
     ****************************************************************************/
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/css/**", "/images/**", "/font/**", "/fonts/**", "/js/**", "/layui/**", "/plugins/**", "/jsImg/**"
                , "/lib/**", "/modules/**", "/modules/configcenter/**", "/modules/projectManagement/**", "/dtyle/**", "/tpl/**", "/lib/**", "/**/*.js", "/**/*.css", "/**/*.ico", "/**/*.jpg", "/**/*.gif");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/webapp/**", "/register", "/enterprise_register", "/GSI_register", "/rtc/index2",
                        "/labBranch/labCenter", "/labBranch/labAnnex", "/configcenter/organization/organizationalSystemPortal").permitAll()
                // 其他地址的访问均需验证权限
                .anyRequest().authenticated().and()
                // 登錄成功入口
                .formLogin().loginPage("/login").failureUrl("/webapp/fail").permitAll()
                .and()
                .csrf().disable();
        http.csrf().disable()
                .logout().logoutUrl("/logout").permitAll()
                .logoutSuccessUrl("/webapp/logout");
        http.headers().frameOptions().sameOrigin();
    }
}
