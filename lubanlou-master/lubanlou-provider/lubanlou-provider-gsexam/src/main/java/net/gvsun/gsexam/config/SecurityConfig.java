package net.gvsun.gsexam.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
/****************************************************************************
 * Description: 系统框架定义-排课管理系统-系统security安全管理{系统security安全管理}
 *
 * @author:魏诚
 * @date :时间 2016-09-26
 ****************************************************************************/
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/**");
    }
}