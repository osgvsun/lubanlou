package net.gvsun.gsexam.exammain.exam.login;

import net.gvsun.gsexam.dto.common.AuthorityVo;
import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.service.common.ShareService;
import net.gvsun.gsexam.service.exam.ExamListService;
import net.gvsun.gsexam.service.login.MainService;
import net.gvsun.gsexam.vo.exam.TCourseSiteVo;
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
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

/****************************************************************************
 * Description: web层-排课管理系统-后台管理{后台管理}
 *
 * @author:魏诚
 * @date :时间 2016-09-12
 ****************************************************************************/
@Controller
@CrossOrigin("*")
@RequestMapping("exam/login")
public class MainController {
    @Value("${logout.url:}")
    private String logoutUrl;
    @Value("${projectName}")
    private String projectName;
    @Autowired(required = false)
    private ShareService shareService;
    @Autowired(required = false)
    private ExamListService examListService;
    @Autowired(required = false)
    private MainService mainService;
    @Value("${serverHost}/gvsunQuestionPool/questionPool/mainPage")
    private String questionPoolHost;

    // 自定义退出后返回地址
    @Value("${app.outUrl:}")
    private String outUrl;
    // 是否使用统一身份认证
    @Value("${uia.isUia:}")
    private String uiaEnble;

    /****************************************************************************
     * Description: web层-排课管理系统-后台主页面{后台主页面}
     *
     * @author:魏诚
     * @date :时间 2016-09-12
     ****************************************************************************/
    @RequestMapping("/")
    public String index(Model model) {
        UserVo userVo = shareService.getUser();
        model.addAttribute("users", userVo);
        return "exam/login/main";
    }

    /****************************************************************************
     * Description: web层-排课管理系统-后台登录入口{后台登录入口}
     *
     * @author:魏诚
     * @date :时间 2016-09-12
     ****************************************************************************/
    @RequestMapping("/login")
    public String login(Map<String, Object> map, HttpServletRequest request, Integer tCourseSiteId, Integer folderType, Integer assignmentId, Integer moduleType) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication(); // 获取登录用户信息

            if (auth instanceof AnonymousAuthenticationToken) { //判断其左边对象是否为其右边类的实例，返回boolean类型的数据     匿名身份验证
                if ("true".equals(uiaEnble)) {
                    return "redirect:/webapp/login";
                } else {
                    return "exam/login/login";
                }
            } else {
                // 获取用户登录权限详细
                UserVo userVo = new UserVo();
                if (auth != null && auth.getPrincipal() != null) {
                    String un;
                    if (auth.getPrincipal() instanceof User) {
                        un = ((User) auth.getPrincipal()).getUsername().toString();
                    } else {
                        un = auth.getPrincipal().toString();
                    }
                    userVo = shareService.getUserByUsername(un);

                    //查找当前用户所有权限
                    List<AuthorityVo> authorityVoList = shareService.findAuthByUsername(userVo.getUsername());
                    //取其中一个权限并加入spring的上下文
                    AuthorityVo currAuth = authorityVoList.get(0);
                    changeRole(currAuth.getAuthorityName());

                    request.getSession().setAttribute("AUTHORITYNAME", currAuth.getAuthorityName());
                    request.getSession().setAttribute("AUTHORITYCNAME", currAuth.getCname());
                    request.getSession().setAttribute("REALNAME", userVo.getCname());
                    request.getSession().setAttribute("USERNAME", userVo.getUsername());
                    request.getSession().setAttribute("ROLENUM", authorityVoList.size());
                    request.getSession().setAttribute("cid", tCourseSiteId);
                    request.getSession().setAttribute("questionUrl", questionPoolHost);

                }
                map.put("users", userVo);

                if (tCourseSiteId != null) {
                    //这个链接是从教学平台跳转过来的
                    String referer = request.getHeader("referer");
                    request.getSession().setAttribute("teachUrl", referer);
                }

                // 登录成功跳到主页
                if (tCourseSiteId != null && folderType == 6) {
                    //若tCourseSiteId不为空，考试文件夹type为6，进入考试列表
                    return "redirect:/exam/startExam?simulation=0&examId=" + assignmentId + "&fromTeach=" + 1;
                }
                if (tCourseSiteId != null && folderType == 5) {
                    //若tCourseSiteId不为空，考试文件夹type为5，进入测试列表
                    return "redirect:/exam/beginTest?testId=" + assignmentId + "&fromTeach=" + 1;
                }
                if (tCourseSiteId != null && folderType == 50) {
                    //若tCourseSiteId不为空，folderType为50，进入新建考试
                    return "redirect:/exam/editExam?cid=" + tCourseSiteId + "&fromTeach=" + 1 + "&moduleType=" + moduleType;
                }
                if (tCourseSiteId != null && folderType == 60) {
                    //若tCourseSiteId不为空，folderType为60，进入新建测试
                    return "redirect:/exam/newTest?cid=" + tCourseSiteId + "&fromTeach=" + 1 + "&moduleType=" + moduleType;
                }
                return "redirect:/exam/exam";
            }
        } catch (Exception e) {
            e.printStackTrace();
            if ("true".equals(uiaEnble)) {
                return "redirect:/webapp/login";
            } else {
                return "exam/login/login";
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
    public String selectAuthority(Map<String, Object> map) {
        //获取当前登录用户
        UserVo userVo = getCurrUser();
        Set<AuthorityVo> originalAuthorities = userVo.getAuthorities();
        Set<AuthorityVo> newAuthorities = new HashSet<AuthorityVo>();
        //盐城需求，权限细分，只有超管、中心主任和安全科管理员有考试管理员的权限，可以发布考试。
        if (projectName.equals("ycteach")) {
            AuthorityVo superAuth = new AuthorityVo();
            superAuth.setId(11);
            superAuth.setAuthorityName("SUPERADMIN");
            superAuth.setCname("超级管理员");
            AuthorityVo examManger = new AuthorityVo();
            examManger.setId(2);
            examManger.setAuthorityName("TEACHER");
            examManger.setCname("考试管理员");
            AuthorityVo ordinaryUser = new AuthorityVo();
            ordinaryUser.setId(1);
            ordinaryUser.setAuthorityName("STUDENT");
            ordinaryUser.setCname("普通用户");
            for (AuthorityVo a : originalAuthorities) {
                Boolean flag = false;//判断是否有考试管理员权限
//                if ("SUPERADMIN".equals(a.getAuthorityName()) || "OPEARTIONSECURITYMANAGEMENT".equals(a.getAuthorityName()) || "EXCENTERDIRECTOR".equals(a.getAuthorityName()))
                if ("TEACHER".equals(a.getAuthorityName())) {
                    newAuthorities.add(examManger);
                }
                if ("SUPERADMIN".equals(a.getAuthorityName())) {
                    newAuthorities.add(superAuth);
                }
                newAuthorities.add(ordinaryUser);//登陆者都有普通用户权限。无需数据库一个个配置
            }
        } else if (projectName.equals("xaut")) {
            AuthorityVo examManger = new AuthorityVo();
            examManger.setId(2);
            examManger.setAuthorityName("TEACHER");
            examManger.setCname("考试管理员");
            AuthorityVo ordinaryUser = new AuthorityVo();
            ordinaryUser.setId(1);
            ordinaryUser.setAuthorityName("STUDENT");
            ordinaryUser.setCname("普通用户");
            for (AuthorityVo a : originalAuthorities) {
                Boolean flag = false;//判断是否有考试管理员权限
                if ("SUPERADMIN".equals(a.getAuthorityName()) || "OPEARTIONSECURITYMANAGEMENT".equals(a.getAuthorityName()) || "EXCENTERDIRECTOR".equals(a.getAuthorityName())) {
                    flag = true;
                }
                if (flag) {
                    newAuthorities.add(examManger);
                }
                newAuthorities.add(ordinaryUser);//登陆者都有普通用户权限。无需数据库一个个配置
            }
        } else {
            for (AuthorityVo a : originalAuthorities) {
                if ("STUDENT".equals(a.getAuthorityName())) {
                    newAuthorities.add(a);
                }
                if ("TEACHER".equals(a.getAuthorityName())) {
                    newAuthorities.add(a);
                }
            }
        }
        map.put("authorities", newAuthorities);
        return "exam/login/selectAuthority";
    }

    /****************************************************************************
     * Description: web层-排课管理系统-后台登录-切换角色{切换角色}
     *
     * @author:魏诚
     * @date :时间 2016-12-17
     ****************************************************************************/
    @RequestMapping("/changeUserRole")
    public void changeUserRole(@RequestParam Integer authId,@RequestParam Integer cid) {
        //修改登录角色
        AuthorityVo authorityVo = shareService.findAuthVoByAuthId(authId);
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(cid);
        changeRole(authorityVo.getAuthorityName());
        if (!tCourseSiteVo.getTitle().equals("全校考试")) {
            shareService.changeSiteRole(authId,cid,getCurrUser().getUsername());
        }
    }

    /**
     * 登出，跳转到登出页面然后跳转到同意认证服务器做登出
     *
     * @param modelMap
     * @return
     */
    @RequestMapping("/tosignout")
    public String logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if ("true".equals(uiaEnble)) {
            return "redirect:/webapp/logout";
        } else {
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


    /****************************************************************************
     * Description: web层-判断是是否session过期
     *
     * @author:魏诚
     * @date :2017-5-11
     ****************************************************************************/
    @ResponseBody
    @RequestMapping("/isSESSIONInvalid")
    public Map<String, String> saveActualAttendance(HttpServletRequest request) {
        String retrunStr = "OK";
        String flag = request.getSession().getAttribute("AUTHORITYNAME").toString();
        if (flag == null) {
            retrunStr = "INVALID";
        }
        Map<String, String> map = new HashMap<String, String>();
        map.put("data", retrunStr);
        return map;
    }

    /**************************************************************************
     * Description 工具方法-获取当前登陆用户
     *
     * @author 罗璇
     * @date 2017年9月7日
     **************************************************************************/
    public UserVo getCurrUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserVo userVo = null;
        if (auth != null && auth.getPrincipal() != null) {
            String un;
            if (auth.getPrincipal() instanceof User) {
                un = ((User) auth.getPrincipal()).getUsername().toString();
            } else {
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
                authorities.add(new SimpleGrantedAuthority("ROLE_" + authorityName));
                return authorities;
            }
        };
        context.setAuthentication(authentication);
    }

    /****************************************************************************
     * Description: web层-排课管理系统-后台登录-切换角色{切换角色}新版
     *
     * @author:魏诚
     * @date :时间 2016-12-17
     ****************************************************************************/
    @RequestMapping("/switchPermissions")
    public String switchPermissions(Map<String, Object> map, HttpServletRequest request) {
        String pathType = request.getSession().getAttribute("pathType").toString();
        map.put("pathType",pathType);
        Object cid0 = request.getSession().getAttribute("cid");
        Integer cid = Integer.valueOf(cid0.toString());
        map.put("cid",cid);
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(cid);
        //获取当前登录用户
        UserVo userVo = getCurrUser();
        Set<AuthorityVo> originalAuthorities = userVo.getAuthorities();
        Set<AuthorityVo> newAuthorities = new HashSet<AuthorityVo>();
        //盐城需求，权限细分，只有超管、中心主任和安全科管理员有考试管理员的权限，可以发布考试。
        if (tCourseSiteVo.getTitle().equals("全校考试")) {
            AuthorityVo superAuth = new AuthorityVo();
            superAuth.setId(11);
            superAuth.setAuthorityName("SUPERADMIN");
            superAuth.setCname("超级管理员");
            AuthorityVo examManger = new AuthorityVo();
            examManger.setId(2);
            examManger.setAuthorityName("TEACHER");
            examManger.setCname("考试管理员");
            AuthorityVo ordinaryUser = new AuthorityVo();
            ordinaryUser.setId(1);
            ordinaryUser.setAuthorityName("STUDENT");
            ordinaryUser.setCname("普通用户");
            for (AuthorityVo a : originalAuthorities) {
                Boolean flag = false;//判断是否有考试管理员权限
//                if ("SUPERADMIN".equals(a.getAuthorityName()) || "OPEARTIONSECURITYMANAGEMENT".equals(a.getAuthorityName()) || "EXCENTERDIRECTOR".equals(a.getAuthorityName()))
                if ("TEACHER".equals(a.getAuthorityName())) {
                    newAuthorities.add(examManger);
                }
                if ("SUPERADMIN".equals(a.getAuthorityName())) {
                    newAuthorities.add(superAuth);
                }
                newAuthorities.add(ordinaryUser);//登陆者都有普通用户权限。无需数据库一个个配置
            }
        } else if (projectName.equals("xaut")) {
            AuthorityVo examManger = new AuthorityVo();
            examManger.setId(2);
            examManger.setAuthorityName("TEACHER");
            examManger.setCname("考试管理员");
            AuthorityVo ordinaryUser = new AuthorityVo();
            ordinaryUser.setId(1);
            ordinaryUser.setAuthorityName("STUDENT");
            ordinaryUser.setCname("普通用户");
            for (AuthorityVo a : originalAuthorities) {
                Boolean flag = false;//判断是否有考试管理员权限
                if ("SUPERADMIN".equals(a.getAuthorityName()) || "OPEARTIONSECURITYMANAGEMENT".equals(a.getAuthorityName()) || "EXCENTERDIRECTOR".equals(a.getAuthorityName())) {
                    flag = true;
                }
                if (flag) {
                    newAuthorities.add(examManger);
                }
                newAuthorities.add(ordinaryUser);//登陆者都有普通用户权限。无需数据库一个个配置
            }
        } else {
            List<AuthorityVo> siteAuthList = shareService.getAllAuthInSite(cid.toString(),userVo.getUsername());
            for (AuthorityVo a : siteAuthList) {
                if ("STUDENT".equals(a.getAuthorityName())) {
                    newAuthorities.add(a);
                }
                if ("TEACHER".equals(a.getAuthorityName())) {
                    newAuthorities.add(a);
                }
                if ("SUPERADMIN".equals(a.getAuthorityName())) {
                    newAuthorities.add(a);
                }
            }
        }
        map.put("authorities", newAuthorities);
        return "views/switchPermissions";
    }
    /****************************************************************************
     * Description: 切换权限-获取用户权限列表
     *
     * @author:fubowen
     * @date :2021-8-11
     ****************************************************************************/
    @RequestMapping("/getAuthorityInSite")
    @ResponseBody
    public Set<AuthorityVo> getAuthorityInSite(@RequestParam Integer cid,@RequestParam String username){
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(cid);
        //获取当前登录用户
        UserVo userVo = shareService.getUserByUsername(username);
        Set<AuthorityVo> originalAuthorities = userVo.getAuthorities();
        Set<AuthorityVo> newAuthorities = new HashSet<>();
        //盐城需求，权限细分，只有超管、中心主任和安全科管理员有考试管理员的权限，可以发布考试。
        if (tCourseSiteVo.getTitle().equals("全校考试")) {
            AuthorityVo superAuth = new AuthorityVo();
            superAuth.setId(11);
            superAuth.setAuthorityName("SUPERADMIN");
            superAuth.setCname("超级管理员");
            AuthorityVo examManger = new AuthorityVo();
            examManger.setId(2);
            examManger.setAuthorityName("TEACHER");
            examManger.setCname("考试管理员");
            AuthorityVo ordinaryUser = new AuthorityVo();
            ordinaryUser.setId(1);
            ordinaryUser.setAuthorityName("STUDENT");
            ordinaryUser.setCname("普通用户");
            for (AuthorityVo a : originalAuthorities) {
                if ("TEACHER".equals(a.getAuthorityName())) {
                    newAuthorities.add(examManger);
                }
                if ("SUPERADMIN".equals(a.getAuthorityName())) {
                    newAuthorities.add(superAuth);
                }
                newAuthorities.add(ordinaryUser);//登陆者都有普通用户权限。无需数据库一个个配置
            }
        } else if (projectName.equals("xaut")) {
            AuthorityVo examManger = new AuthorityVo();
            examManger.setId(2);
            examManger.setAuthorityName("TEACHER");
            examManger.setCname("考试管理员");
            AuthorityVo ordinaryUser = new AuthorityVo();
            ordinaryUser.setId(1);
            ordinaryUser.setAuthorityName("STUDENT");
            ordinaryUser.setCname("普通用户");
            for (AuthorityVo a : originalAuthorities) {
                Boolean flag = false;//判断是否有考试管理员权限
                if ("SUPERADMIN".equals(a.getAuthorityName()) || "OPEARTIONSECURITYMANAGEMENT".equals(a.getAuthorityName()) || "EXCENTERDIRECTOR".equals(a.getAuthorityName())) {
                    flag = true;
                }
                if (flag) {
                    newAuthorities.add(examManger);
                }
                newAuthorities.add(ordinaryUser);//登陆者都有普通用户权限。无需数据库一个个配置
            }
        } else {
            List<AuthorityVo> siteAuthList = shareService.getAllAuthInSite(cid.toString(),userVo.getUsername());
            for (AuthorityVo a : siteAuthList) {
                if ("STUDENT".equals(a.getAuthorityName())) {
                    newAuthorities.add(a);
                }
                if ("TEACHER".equals(a.getAuthorityName())) {
                    newAuthorities.add(a);
                }
                if ("SUPERADMIN".equals(a.getAuthorityName())) {
                    newAuthorities.add(a);
                }
            }
        }
        return newAuthorities;
    }
}