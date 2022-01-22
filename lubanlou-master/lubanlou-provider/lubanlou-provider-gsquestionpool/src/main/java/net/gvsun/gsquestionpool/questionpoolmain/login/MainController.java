package net.gvsun.gsquestionpool.questionpoolmain.login;

import net.gvsun.gsquestionpool.dto.AuthorityVo;
import net.gvsun.gsquestionpool.dto.UserVo;
import net.gvsun.gsquestionpool.service.common.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/****************************************************************************
 * Description: web层-排课管理系统-后台管理{后台管理}
 * 
 * @author:魏诚
 * @date :时间 2016-09-12
 ****************************************************************************/
@Controller
@RequestMapping("/questionPool")
public class MainController {
	@Value("${logout.url:}")
	private String logoutUrl;
	@Autowired(required = false)
	private ShareService shareService;

	// 自定义退出后返回地址
	@Value("${app.outUrl:}")
	private String outUrl;
	// 是否使用统一身份认证
	@Value("${uia.isUia:}")
	private String uiaEnble;
	@Value("${gsTeachHost}")
	private String gsTeachHost;

	/****************************************************************************
	 * Description: web层-排课管理系统-后台主页面{后台主页面}
	 * 
	 * @author:魏诚
	 * @date :时间 2016-09-12
	 ****************************************************************************/
	@RequestMapping("/login")
	public String index(Map<String, Object> map, HttpServletRequest request, String questionPoolHost, Integer siteId) {
		try {
			Authentication auth = SecurityContextHolder.getContext().getAuthentication(); // 获取登录用户信息

			if (auth instanceof AnonymousAuthenticationToken) { //判断其左边对象是否为其右边类的实例，返回boolean类型的数据     匿名身份验证
				if("true".equals(uiaEnble)){
					return "redirect:/webapp/login";
				}else {
					return "questionPool/login/login";
				}
			} else {
				// 获取用户登录权限详细
				UserVo userVo = new UserVo();
				if(auth!=null&&auth.getPrincipal()!=null){
					String un;
					if(auth.getPrincipal() instanceof User){
						un = ((User)auth.getPrincipal()).getUsername().toString();
					}else{
						un = auth.getPrincipal().toString();
					}
					userVo = shareService.getUserByUsername(un);

					//查找当前用户所有权限
					List<AuthorityVo> authorityVoList = shareService.findAuthByUsername(userVo.getUsername());
					//取其中一个权限并加入spring的上下文
					AuthorityVo currAuth = authorityVoList.get(0);
					changeRole(currAuth.getAuthorityName());

					request.getSession().setAttribute("AUTHORITYNAME",currAuth.getAuthorityName());
					request.getSession().setAttribute("AUTHORITYCNAME",currAuth.getCname());
					request.getSession().setAttribute("REALNAME", userVo.getCname());
					request.getSession().setAttribute("USERNAME",userVo.getUsername());
					request.getSession().setAttribute("ROLENUM",authorityVoList.size());
					if (siteId!=null){
						//这个链接是从教学平台跳转过来的
						String referer = request.getHeader("referer");
						referer = gsTeachHost+"/teach/mainPage";
						request.getSession().setAttribute("teachUrl",referer);
						request.getSession().setAttribute("cid", siteId);
						System.out.println("referer是："+referer);
					}else {
						request.getSession().setAttribute("cid", 0);
						String link = gsTeachHost+"/system/myCourseList";
						request.getSession().setAttribute("teachUrl",link);
						System.out.println("link是："+link);
					}
				}

				map.put("users",userVo );

				// 登录成功跳到主页
				return "redirect:/questionPool/mainPage?typ="+0;
			}
		} catch (Exception e) {
			e.printStackTrace();
			if("true".equals(uiaEnble)){
				return "redirect:/webapp/login";
			}else {
				return "questionPool/login/login";
			}
		}
	}

	/****************************************************************************
	 * Description: web层-排课管理系统-后台登录-切换角色{切换角色}
	 *
	 * @author:魏诚
	 * @date :时间 2016-12-17
	 ****************************************************************************/
	@RequestMapping("/selectAuthority")
	public String selectAuthority(Map<String, Object> map,HttpServletRequest request) {
		//获取当前登录用户
		UserVo userVo = getCurrUser();
		map.put("authorities", userVo.getAuthorities());
		return "login/selectAuthority";
	}

	/****************************************************************************
	 * Description: web层-排课管理系统-后台登录-切换角色{切换角色}
	 *
	 * @author:魏诚
	 * @date :时间 2016-12-17
	 ****************************************************************************/
	@ResponseBody
	@RequestMapping("/changeUserRole")
	public void changeUserRole(@RequestParam("authId") Integer authId, HttpServletRequest request) throws Exception {
		//修改登录角色
		AuthorityVo authorityVo = shareService.findAuthVoByAuthId(authId);
		changeRole(authorityVo.getAuthorityName());
		request.getSession().setAttribute("AUTHORITYNAME", authorityVo.getAuthorityName());
		request.getSession().setAttribute("AUTHORITYCNAME", authorityVo.getCname());

	}

	/**
	 * 登出，跳转到登出页面然后跳转到同意认证服务器做登出
	 * @param modelMap
	 * @return
	 */
	@RequestMapping("/tosignout")
	public String logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
		if("true".equals(uiaEnble)){
			return "redirect:/webapp/logout";
		}else {
			//清除session
			request.getSession().invalidate();
			/**
			 * @应对一个系统多域名的情况
			 * @1.判断是否http开头
			 * @2.是：直接使用
			 * @3.否：获取当前系统域名，拼接使用
			 */
			boolean isHttp = outUrl.startsWith("http");
			String outUrlStr = "";
			if (!isHttp) {
				outUrlStr = "http://"+ request.getServerName() + outUrl;
			}else {
				outUrlStr = outUrl;
			}
			response.sendRedirect(outUrlStr);
			return null;
		}
	}

	/**************************************************************************
	 * Description 工具方法-获取当前登陆用户
	 *
	 * @author 罗璇
	 * @date 2017年9月7日
	 **************************************************************************/
	public UserVo getCurrUser(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		UserVo userVo = null;
		if(auth!=null&&auth.getPrincipal()!=null){
			String un;
			if(auth.getPrincipal() instanceof User){
				un = ((User)auth.getPrincipal()).getUsername().toString();
			}else{
				un = auth.getPrincipal().toString();
			}
			userVo = shareService.getUserByUsername(un);
		}
		return userVo;
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
				authorities.add(new SimpleGrantedAuthority("ROLE_"+authorityName));
				return authorities;
			}
		};
		context.setAuthentication(authentication);
	}
}