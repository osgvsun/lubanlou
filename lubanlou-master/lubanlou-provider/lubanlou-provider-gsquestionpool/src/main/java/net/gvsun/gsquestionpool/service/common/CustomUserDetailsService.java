package net.gvsun.gsquestionpool.service.common;

import net.gvsun.common.Md5Util;
import net.gvsun.gsquestionpool.dto.AuthorityVo;
import net.gvsun.gsquestionpool.dto.UserVo;
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
import java.util.List;

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
		// TUser对应数据库中的用户表，是最终存储用户和密码的表，可自定义
		// 本例使用TUser中的useraname作为用户名:
		UserVo user = shareService.getUserByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException(username + " not found");
		}
		//对该用户下的所有权限进行身份记录
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		// 用户权限数
		int roleNum = 0;
		for(AuthorityVo authority:user.getAuthorities()){
			authorities.add(new SimpleGrantedAuthority("ROLE_"+authority.getAuthorityName()));
			System.err.println("username is " + username + ", " + authority.getAuthorityName());
			RequestAttributes ra = RequestContextHolder.getRequestAttributes();
			HttpServletRequest request = ((ServletRequestAttributes)ra).getRequest();
			request.getSession().setAttribute("AUTHORITYNAME", authority.getAuthorityName());
			request.getSession().setAttribute("AUTHORITYREALNAME", authority.getCname());
			request.getSession().setAttribute("REALNAME", user.getCname());
			request.getSession().setAttribute("AUTHORITYCNAME", authority.getCname());
			roleNum++;
			request.getSession().setAttribute("ROLENUM", roleNum);
		}

		// oauth认证后 security只验证账号
		if (uiaEnable) {
			String usernameMD5 = Md5Util.createMD5(user.getUsername() + secretKey);
			return new org.springframework.security.core.userdetails.User(user.getUsername(), usernameMD5, authorities);
		} else {
			return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getUsername(), authorities);
		}
		
	}

}
