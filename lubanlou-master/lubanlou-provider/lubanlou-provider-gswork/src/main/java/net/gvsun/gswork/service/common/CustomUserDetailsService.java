package net.gvsun.gswork.service.common;

import net.gvsun.common.Md5Util;
import net.gvsun.gswork.vo.common.AuthorityVo;
import net.gvsun.gswork.vo.common.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

/****************************************************************************
 * Description: 系统框架定义-排课管理系统-登录用户信息的权限管理{登录用户信息的权限管理}
 *
 * @author:魏诚
 * @date :时间 2016-09-26
 ****************************************************************************/
@Service("UserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private ShareService shareService;

    private static final Logger LOGGER = Logger.getLogger(CustomUserDetailsService.class.getName());

    @Value("${projectName}")
    private String projectName;
    @Value("${uia.isUia}")
    private Boolean uiaEnable;
    @Value("${uia.secretKey}")
    private String secretKey;

    /****************************************************************************
     * Description: 系统框架定义-排课管理系统-登录用户信息的权限管理-获取登录用户的详细信息{获取登录用户的详细信息}
     *
     * @author:魏诚
     * @date :时间 2016-09-26
     ****************************************************************************/
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LOGGER.info("用户名(" + username + ")尝试登录");
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = ((ServletRequestAttributes) ra).getRequest();
        UserVo user = shareService.getUserByUsername(username);
        if (user == null) {
            LOGGER.severe(username + " not found");
            throw new UsernameNotFoundException(username + " not found");
        }
        if (user.getAcademy() == null) {
            LOGGER.severe(username + " not found academy");
            throw new UsernameNotFoundException(username + " not found academy");
        }
        //对该用户下的所有权限进行身份记录
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        // 用户权限数
        int roleNum = 0;
        for (AuthorityVo authority : user.getAuthorities()) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + authority.getAuthorityName()));
            request.getSession().setAttribute("AUTHORITYNAME", authority.getAuthorityName());
            request.getSession().setAttribute("AUTHORITYREALNAME", authority.getCname());
            request.getSession().setAttribute("REALNAME", user.getCname());
            request.getSession().setAttribute("AUTHORITYCNAME", authority.getCname());
            roleNum++;
            request.getSession().setAttribute("ROLENUM", roleNum);
        }
        //查找当前用户所有权限
        List<AuthorityVo> authorityVoList = shareService.findAuthByUsername(user.getUsername());
        //取其中一个权限并加入spring的上下文
        AuthorityVo currAuth = new AuthorityVo();
        //将拥有的权限id放入数组，并且进行排序，优先选择id大的权限
        int[] arr = new int[authorityVoList.size()];
        for (int i = 0; i < authorityVoList.size(); i++) {
            if (authorityVoList.get(i).getId() != 0) {
                arr[i] = authorityVoList.get(i).getId();
            }
        }
        //将int数组
        List<Integer> list = Arrays.stream(arr).boxed().collect(Collectors.toList());
        boolean flag = list.contains(2);
        if (flag) {
            currAuth = shareService.findAuthVoByAuthId(2);
        } else {
            //选择最小的id
            int minAuthorityId = Arrays.stream(arr).min().getAsInt();
            for (AuthorityVo authorityVo : authorityVoList) {
                if (authorityVo.getId() == minAuthorityId) {
                    currAuth = authorityVo;
                    break;
                }
            }
        }

        request.getSession().setAttribute("AUTHORITYNAME", currAuth.getAuthorityName());
        request.getSession().setAttribute("AUTHORITYID", currAuth.getId());
        request.getSession().setAttribute("REALNAME", user.getCname());
        request.getSession().setAttribute("USERNAME", user.getUsername());
        request.getSession().setAttribute("USERCNAME", user.getCname());
        request.getSession().setAttribute("PASSWORD", user.getPassword());
        request.getSession().setAttribute("USER", user);
        request.getSession().setAttribute("ROLENUM", authorityVoList.size());
        request.getSession().setAttribute("AUTHORITYCNAME", currAuth.getCname());
        request.getSession().setAttribute("USER", user);

        // oauth认证后 security只验证账号
        if (uiaEnable) {
            String usernameMD5 = Md5Util.createMD5(user.getUsername() + secretKey);
            return new org.springframework.security.core.userdetails.User(user.getUsername(), usernameMD5, authorities);
        } else {
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getUsername(), authorities);
        }

    }
}
