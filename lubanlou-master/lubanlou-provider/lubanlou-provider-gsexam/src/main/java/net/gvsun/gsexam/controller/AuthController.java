package net.gvsun.gsexam.controller;

import net.gvsun.gsexam.dto.common.AuthorityVo;
import net.gvsun.gsexam.service.common.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

/****************************************************************************
 * Description: web层-排课管理系统-后台管理{后台管理}
 *
 * @author:魏诚
 * @date :时间 2016-09-12
 ****************************************************************************/
@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private ShareService shareService;

    /**
     * 课程下所有权限
     * @param cid 课程id
     * @param username 当前登录用户名
     * @return
     */
    @RequestMapping(value = "/switchPermissionsApi")
    public List<AuthorityVo> switchPermissionsApi(@RequestParam Integer cid, @RequestParam String username) {
        //打分
        return shareService.getAllAuthInSite(cid.toString(),username);
    }

    /**
     * 切换权限
     * @param authId 权限id
     * @param cid 课程id
     * @param username 当前登录用户名
     * @param request
     */
    @RequestMapping("/changeUserRole")
    public void changeUserRole(@RequestParam Integer authId,@RequestParam Integer cid,@RequestParam String username,HttpServletRequest request) {
        //修改登录角色
        AuthorityVo authorityVo = shareService.findAuthVoByAuthId(authId);
        changeRole(authorityVo.getAuthorityName());
        shareService.changeSiteRole(authId,cid,username);
        request.getSession().setAttribute("AUTHORITYNAME", authorityVo.getAuthorityName());
        request.getSession().setAttribute("AUTHORITYCNAME", authorityVo.getCname());
    }
    /***********************************************************************************************
     * Description ：更换权限
     *
     * @作者：罗璇
     * @日期：2017年10月27日
     ***********************************************************************************************/
    public void changeRole(final String authorityName) {

        final SecurityContext context = SecurityContextHolder.getContext();
        final Object credentials = context.getAuthentication().getCredentials();
        final Object details = context.getAuthentication().getDetails();
        final Object principal = context.getAuthentication().getPrincipal();
        final String name = context.getAuthentication().getName();

        Authentication authentication = new Authentication() {
            private static final long serialVersionUID = 1L;

            @Override
            public String getName() {
                return name;
            }

            @Override
            public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
            }

            @Override
            public boolean isAuthenticated() {
                return true;
            }

            @Override
            public Object getPrincipal() {
                return principal;
            }

            @Override
            public Object getDetails() {
                return details;
            }

            @Override
            public Object getCredentials() {
                return credentials;
            }

            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                List<GrantedAuthority> authorities = new LinkedList<GrantedAuthority>();
                authorities.add(new SimpleGrantedAuthority("ROLE_" + authorityName));
                return authorities;
            }
        };
        context.setAuthentication(authentication);
    }
}