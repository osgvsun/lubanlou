package net.gvsun.gswork.service.common;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfWriter;
import net.gvsun.common.KafkaDTO;
import net.gvsun.common.LayTableVO;
import net.gvsun.common.Result;
import net.gvsun.gswork.domain.*;
import net.gvsun.gswork.jpa.*;
import net.gvsun.gswork.util.DateFormatUtil;
import net.gvsun.gswork.util.EmptyUtil;
import net.gvsun.gswork.vo.ExperimentSkillVO;
import net.gvsun.gswork.vo.WkChapterVO;
import net.gvsun.gswork.vo.WkLessonVO;
import net.gvsun.gswork.vo.common.AuthorityVo;
import net.gvsun.gswork.vo.common.CourseInfoVO;
import net.gvsun.gswork.vo.common.TCourseSiteVo;
import net.gvsun.gswork.vo.common.UserVo;
import net.gvsun.gswork.vo.courseInfo.CourseTableTopDateInfoVO;
import net.gvsun.gswork.vo.courseInfo.DoubleClassCourseInfoVO;
import net.gvsun.kafka.producer.KafkaSender;
import net.gvsun.resource.dto.ResourceFileDto;
import net.gvsun.resource.service.ResourceContainerService;
import org.csource.fastdfs.ProtoCommon;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service("shareService")
public class ShareServiceImpl implements ShareService {

    @Value("${apiGateWayHost}")
    private String apiGateWayHost;

    @Autowired
    @Qualifier("datasourceRestTemplate")
    private RestTemplate restTemplate;
    @Autowired
    private UserJPA userJPA;
    @Autowired
    private AuthorityJPA authorityJPA;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private WkUploadJPA wkUploadJPA;
    @Autowired
    private TCourseSiteUserJPA tCourseSiteUserJPA;
    @Autowired
    private TCourseSiteJPA tCourseSiteJPA;
    @Autowired
    private WkChapterJPA wkChapterJPA;
    @Autowired
    private WkLessonJPA wkLessonJPA;
    @Autowired
    private ResourceContainerService resourceContainerService;
    @Autowired
    private TExperimentSkillJPA tExperimentSkillJPA;
    @Autowired
    private SchoolWeekJPA schoolWeekJPA;
    @Autowired
    private SystemTimeJPA systemTimeJPA;
    @Autowired
    private SystemCampusJPA systemCampusJPA;
    @Autowired
    private SchoolTermJPA schoolTermJPA;
    @Autowired
    private KafkaSender kafkaSender;

    /**************************************************************************
     * Description 通用模块-获取登录用户信息
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
    @Override
    public UserVo getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && (!AnonymousAuthenticationToken.class.isAssignableFrom(auth.getClass()))) {
//            UserDetails userDetails = (UserDetails) auth;
            String username = (auth.getName());
            User user = userJPA.getOne(username);
            UserVo userVo = new UserVo();
            BeanUtils.copyProperties(user, userVo);
            return userVo;
        } else {
            return null;
        }
    }

    /**************************************************************************
     * Description 通用模块-根据username获取用户信息
     *
     * @author 魏诚
     * @date 2017-08-16
     **************************************************************************/
    @Override
    @Transactional
    public UserVo getUserByUsername(String username) {
        User user = userJPA.getOne(username);
        UserVo userVo = new UserVo();
        Set<AuthorityVo> authorityVos = new HashSet<>();
        userVo.setCname(user.getCname());
        userVo.setUsername(user.getUsername());
        userVo.setPassword(user.getPassword());
        userVo.setEmail(user.getEmail());
        if (Objects.isNull(user.getSchoolAcademy())) {
            userVo.setAcademy(null);
        } else {
            userVo.setAcademy(user.getSchoolAcademy().getAcademyNumber());
        }
        for (Authority authority : user.getAuthorities()) {
            AuthorityVo authorityVo = new AuthorityVo();
            authorityVo.setAuthorityName(authority.getAuthorityName());
            authorityVo.setCname(authority.getCname());
            authorityVo.setId(authority.getId());
            authorityVos.add(authorityVo);
        }
        userVo.setAuthorities(authorityVos);
        return userVo;
    }

    /**************************************************************************
     * Description 通用模块-根据authorityName获取權限信息
     *
     * @author 魏诚
     * @date 2017-08-16
     **************************************************************************/
    @Override
    public AuthorityVo getAuthorityByName(String authorityName) {
        Authority authority = authorityJPA.getAuthorityByAuthorityName(authorityName);
        AuthorityVo authorityVo = new AuthorityVo();
        authorityVo.setCname(authority.getCname());
        authorityVo.setId(authority.getId());
        authorityVo.setAuthorityName(authority.getAuthorityName());
        return authorityVo;
    }

    /***********************************************************************************************
     * Description ：通用模塊service層定義-修改登录的角色
     *
     * @作者：魏诚
     * @日期：2016-11-17
     ***********************************************************************************************/
    @Override
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

    /**************************************************************************
     * Description 根据用户名获取用户权限信息
     *
     * @author 罗璇
     * @date 2017年10月26日
     **************************************************************************/
    @Override
    @Transactional
    public List<AuthorityVo> findAuthByUsername(String username) {
        Set<Authority> authorityList = userJPA.getOne(username).getAuthorities();
        List<AuthorityVo> rs = new ArrayList<>();
        for (Authority authority : authorityList) {
            AuthorityVo authorityVo = new AuthorityVo();
            authorityVo.setId(authority.getId());
            authorityVo.setAuthorityName(authority.getAuthorityName());
            authorityVo.setCname(authority.getCname());
            rs.add(authorityVo);
        }
        return rs;
    }

    /**************************************************************************
     * Description 根据权限名获取权限信息
     *
     * @author 罗璇
     * @date 2017年10月26日
     **************************************************************************/
    @Override
    public AuthorityVo findAuthVoByAuthId(Integer authId) {
        Authority authority = authorityJPA.getOne(authId);
        AuthorityVo rs = new AuthorityVo();
        rs.setId(authority.getId());
        rs.setAuthorityName(authority.getAuthorityName());
        rs.setCname(authority.getCname());
        return rs;
    }


    public boolean ifNumber(String str) {
        char num[] = str.toCharArray();//把字符串转换为字符数组
        StringBuffer title = new StringBuffer();//使用StringBuffer类，把非数字放到title中
        StringBuffer hire = new StringBuffer();//把数字放到hire中
        return Character.isDigit(num[0]);


    }


    /**************************************************************************
     * Description 获取所有教师
     *
     * @author 杨礼杰
     * @date 2018年3月7日
     **************************************************************************/
    @Override
    public List<UserVo> findUserByRole() {
        List<UserVo> userVOList = new ArrayList<>();
        //使用原生方法来查询用户
        String sql = "select u.username,u.cname from user u where u.user_role='1'";
        List<Object[]> resultList = entityManager.createNativeQuery(sql).getResultList();
        for (Object[] obj : resultList) {
            UserVo userVo = new UserVo();
            userVo.setUsername(obj[0].toString());
            userVo.setCname(obj[1].toString());
            userVOList.add(userVo);
        }
        return userVOList;
    }

    /**************************************************************************
     * Description 获取权限（老师还是学生）
     *
     * @author 马帅
     * @date 2017年3月6日
     **************************************************************************/
    @Override
    public Integer getFlagByUserAndSite(UserVo userVO, CourseInfoVO courseInfoVO) {
        //角色判断：如果具有老师权限且为该课程的创建者或者助教则默认为老师，如果没有教师权限则默认为学生
        Integer flag = -1;
        if (userVO != null && userVO.getAuthorities().toString().contains("TEACHER")) {
            if (courseInfoVO.getUserByCreatedBy().getUsername().equals(userVO.getUsername())) {
                //如果当前登陆人是本人开的课程，则是老师身份
                flag = 1;
            } else if (this.isSTeacherBySiteIdAndUser(courseInfoVO.getSiteId(), userVO.getUsername())) {
                //如果当前登陆人是本课程的助教，则是老师身份
                flag = 1;
            } else {
                //如果当前登陆人不是本人开的课程，则是学生身份
                flag = 0;
            }
            //学生权限
        } else if (userVO != null && userVO.getAuthorities().toString().contains("STUDENT")) {
            if (this.isSTeacherBySiteIdAndUser(courseInfoVO.getSiteId(), userVO.getUsername())) {
                //如果当前登陆人是本课程的助教，则是老师身份
                flag = 1;
            } else {
                //学生身份
                flag = 0;
            }
        }
        //超级管理员权限
        if (userVO != null && userVO.getAuthorities().toString().contains("SUPERADMIN")) {
            flag = 2;
        }
        return flag;
    }

    /**************************************************************************
     * Description 通用模块-获取当前權限信息，如果当前未有权限信息，则默认当前第一个权限
     *
     * @author 魏诚
     * @date 2017-08-16
     **************************************************************************/
    @Override
    public AuthorityVo getCurrAuthorityByName(Object authorityName) {
        AuthorityVo authorityVo = new AuthorityVo();

        //如果没有session信息
        if (authorityName != null) {
            authorityVo.setAuthorityName(authorityName.toString());
            authorityVo.setCname(this.getUser().getCname());
        } else {
            List<AuthorityVo> authorityVoList = this.findAuthByUsername(this.getUser().getUsername());
            authorityVo.setAuthorityName(authorityVoList.get(0).getAuthorityName());
            authorityVo.setCname(this.getUser().getCname());
        }
        return authorityVo;
    }

    /*
     * 处理中文乱码 作者：彭文玉
     */
    /* (non-Javadoc)
     * @see net.gvsuntms.service.ShareService#htmlEncode(java.lang.String)
     */
    /* (non-Javadoc)
     * @see net.gvsuntms.service.common.ShareService#htmlEncode(java.lang.String)
     */
    @Override
    public String htmlEncode(String str) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < str.length(); i++) {
            int c = (int) str.charAt(i);
            if (c > 127 && c != 160) {
                sb.append("&#").append(c).append(";");
            } else {
                sb.append((char) c);
            }
        }
        return sb.toString();
    }

    /**************************************************************************
     * Description 根据用户名获取用户系统权限权限信息
     *
     * @author 黄浩
     * @date 2018年8月2日
     **************************************************************************/
    @Override
    @Transactional
    public List<AuthorityVo> findSystemAuthByUsername(String username) {
        Set<Authority> authorityList = userJPA.getOne(username).getAuthorities();
        List<AuthorityVo> rs = new ArrayList<>();
        for (Authority authority : authorityList) {
            if (authority.getManageTable() == null) {
                AuthorityVo authorityVo = new AuthorityVo();
                authorityVo.setId(authority.getId());
                authorityVo.setAuthorityName(authority.getAuthorityName());
                authorityVo.setCname(authority.getCname());
                rs.add(authorityVo);
            }
        }
        return rs;
    }

    /**************************************************************************
     * Description 根据用户名获取用户站点权限权限信息
     *
     * @author 黄浩
     * @date 2018年8月2日
     **************************************************************************/
    @Override
    public List<AuthorityVo> findSiteAuthByUsername(String username) {
        Set<Authority> authorityList = userJPA.getOne(username).getAuthorities();
        List<AuthorityVo> rs = new ArrayList<>();
        for (Authority authority : authorityList) {
            if (authority.getManageTable().equals("t_course_site")) {
                AuthorityVo authorityVo = new AuthorityVo();
                authorityVo.setId(authority.getId());
                authorityVo.setAuthorityName(authority.getAuthorityName());
                authorityVo.setCname(authority.getCname());
                rs.add(authorityVo);
            }
        }
        return rs;
    }


    /**************************************************************************
     * Description 文件下载次数+1
     *
     * @author 黄浩
     * @date 2018年10月31日
     **************************************************************************/
    @Override
    public void fileDownloadTimes(Integer id) {
        WkUpload wkUpload = wkUploadJPA.getOne(id);
        Integer downloadTimes = 0;
        if (wkUpload.getDownloadTimes() != null) {
            downloadTimes = wkUpload.getDownloadTimes();
        }
        wkUpload.setDownloadTimes(downloadTimes + 1);
        wkUploadJPA.saveAndFlush(wkUpload);
    }

    /**************************************************************************
     * Description:作业-生成pdf
     *
     * @author：裴继超
     * @date ：2017-3-20
     **************************************************************************/
    @Override
    public File Pdf(ArrayList<String> imageUrllist, String mOutputPdfFileName, TAssignmentGrading tAssignmentGrading) {
        String TAG = "PdfManager";
        Document doc = new Document(PageSize.A4, 20, 20, 20, 20);
        try {
            BaseFont bfChinese = BaseFont.createFont("STSongStd-Light", "UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
            Font font = new Font(bfChinese, 12, Font.NORMAL);
            PdfWriter
                    .getInstance(doc, new FileOutputStream(mOutputPdfFileName));
            doc.open();
            for (int i = 0; i < imageUrllist.size(); i++) {
                doc.newPage();
//                doc.add(new Paragraph("简单使用iText",font));
                Image png1 = Image.getInstance(imageUrllist.get(i));
                float heigth = png1.getHeight();
                float width = png1.getWidth();
                int percent = getPercent2(heigth, width);
                png1.setAlignment(Image.MIDDLE);
                png1.scalePercent(percent);// 表示是原来图像的比例;
                doc.add(png1);
            }
            doc.newPage();
            String str = "学生学号：" + tAssignmentGrading.getUserByStudent().getUsername();
            str += "\n学生姓名：" + tAssignmentGrading.getUserByStudent().getCname();
            str += "\n分数：" + tAssignmentGrading.getFinalScore();
            str += "\n评语：" + tAssignmentGrading.getComments();
            doc.add(new Paragraph(str, font));
            doc.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (DocumentException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        File mOutputPdfFile = new File(mOutputPdfFileName);
        if (!mOutputPdfFile.exists()) {
            mOutputPdfFile.deleteOnExit();
            return null;
        }
        return mOutputPdfFile;
    }

    /**************************************************************************
     * Description:作业-pdf按照宽度压缩图片
     *
     * @author：裴继超
     * @date ：2017-3-20
     **************************************************************************/
    public static int getPercent2(float h, float w) {
        int p = 0;
        float p2 = 0.0f;
        p2 = 530 / w * 100;
        p = Math.round(p2);
        return p;
    }

    /**************************************************************************
     * 删除有文件的目录
     *
     * @author：黄浩
     * @date: 2018年12月13日
     **************************************************************************/
    @Override
    public boolean deleteDir(File dir) {
        if (dir.exists() && dir.isDirectory()) {
            String[] children = dir.list();
            // 递归删除目录中的子目录下
            for (int i = 0; i < children.length; i++) {
                boolean success = deleteDir(new File(dir, children[i]));
                if (!success) {
                    return false;
                }
            }
        }
        // 目录此时为空，可以删除
        return dir.delete();
    }

    /**************************************************************************
     * 过滤特殊字符
     *
     * @author：黄浩
     * @date: 2018年12月26日
     **************************************************************************/
    @Override
    public String StringFilter(String str) throws PatternSyntaxException {
        // 只允许字母和数字 // String regEx = "[^a-zA-Z0-9]";
        // 清除掉所有特殊字符
        if (!EmptyUtil.isEmpty(str)) {
            String regEx = "[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";
            Pattern p = Pattern.compile(regEx);
            Matcher m = p.matcher(str);
            return m.replaceAll("").trim();
        } else {
            return null;
        }
    }


    /**************************************************************************
     * Description 解析文件
     *
     * @author 洪春莹
     * @date 2019年5月10日
     **************************************************************************/
    @Override
    public String getMiniToken(@RequestParam String url, int ts, String key) throws Exception {

        return ProtoCommon.getToken(url, ts, key);
    }

    /**************************************************************************
     * Description 工具方法-获取当前登陆用户
     *
     * @author 罗璇
     * @date 2017年9月7日
     **************************************************************************/
    @Override
    public UserVo getCurrUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserVo userVo = null;
        if (auth != null && auth.getPrincipal() != null) {
            String un;
            if (auth.getPrincipal() instanceof UserDetails) {
                un = ((UserDetails) auth.getPrincipal()).getUsername();
            } else {
                un = auth.getPrincipal().toString();
            }
            userVo = this.getUserByUsername(un);
        }
        return userVo;
    }

    /**
     * 添加至redis和cookie
     *
     * @param response
     * @param token
     */
    @Override
    public void addCookie(HttpServletResponse response, String token) {
//        redisTemplate.opsForValue().set("courseNumber:sesson", token, 366, TimeUnit.DAYS);//放入缓存
        Cookie cookie1 = new Cookie("courseNumber", token);
        cookie1.setMaxAge(3600 * 24 * 366);   //和Redis缓存失效时间一致
        cookie1.setPath("/");
        response.addCookie(cookie1);

        Cookie cookie2 = new Cookie("path", "gvsunTms");
        cookie2.setMaxAge(3600 * 24 * 366);   //和Redis缓存失效时间一致
        cookie2.setPath("/");
        response.addCookie(cookie2);
    }
    /**************************************************************************
     * Description 根据站点和用户判断是否是助教
     *
     * @author 耿新泉
     * @date 2018-1-10
     **************************************************************************/
    public boolean isSTeacherBySiteIdAndUser(Integer siteId, String userName) {
        List<TCourseSiteUser> tCourseSiteUsers = tCourseSiteUserJPA.findAllSTeacherBySiteIdAndUser(siteId, userName);
        boolean isSTeacher = false;
        if (tCourseSiteUsers.size() != 0) {
            isSTeacher = true;
        }
        return isSTeacher;

    }
    /**************************************************************************
     * Description 站点动态获取
     *
     * @author 李雪腾
     * @date 2017-10-18
     * @return 站点集合
     **************************************************************************/
    @Override
    public LayTableVO<List<TCourseSiteVo>> findAllTCourseSite(Integer page, Integer limit, String search) {
        if (Objects.isNull(search)){
            search = "";
        }
        List<TCourseSiteVo> tCourseSiteVoList = new ArrayList<>();
        List<TCourseSite> tCourseSiteList = tCourseSiteJPA.findAllTCourseSiteByStatusPage("%"+search+"%",(page-1)*limit,limit);
        for (TCourseSite tCourseSite : tCourseSiteList) {
            TCourseSiteVo tCourseSiteVo = new TCourseSiteVo();
            tCourseSiteVo.setId(tCourseSite.getId()).setTitle(tCourseSite.getTitle());
            tCourseSiteVoList.add(tCourseSiteVo);
        }
        Integer total = tCourseSiteJPA.findAllTCourseSiteByStatus("%"+search+"%").size();
        return LayTableVO.ok(tCourseSiteVoList,Long.valueOf(total));
    }
    /**************************************************************************
     * Description 课程章节数据
     *
     * @author 黄浩
     * @date 2021年3月2日
     **************************************************************************/
    @Override
    public List<WkChapterVO> chapterList(Integer cid, Integer moduleType){
        List<WkChapterVO> wkChapterVOList = new ArrayList<>();
        List<WkChapter> chapterList = wkChapterJPA.findWkChapterBySiteId(cid,moduleType);
        for (WkChapter wkChapter:chapterList){
            WkChapterVO wkChapterVO = new WkChapterVO();
            wkChapterVO.setId(wkChapter.getId());
            wkChapterVO.setName(wkChapter.getName());
            wkChapterVOList.add(wkChapterVO);
        }
        return wkChapterVOList;
    }
    /**************************************************************************
     * Description 小节数据
     *
     * @author 黄浩
     * @date 2021年3月2日
     **************************************************************************/
    @Override
    public List<WkLessonVO> lessonList(Integer chapterId){
        List<WkLessonVO> wkLessonVOList = new ArrayList<>();
        List<WkLesson> lessonList = wkLessonJPA.findWklessonByChapterId(chapterId);
        for (WkLesson wkLesson:lessonList){
            WkLessonVO wkLessonVO = new WkLessonVO();
            wkLessonVO.setId(wkLesson.getId());
            wkLessonVO.setTitle(wkLesson.getTitle());
            wkLessonVOList.add(wkLessonVO);
        }
        return wkLessonVOList;
    }
    /************************************************************************
     *@Description:获取某用户在课程当前的角色
     *@Author:黄浩
     *@Date:2018/8/1
     ************************************************************************/
    @Override
    public List<Integer> getCurrentAuthInSite(String manageId, String username) {
        String sql = "select ua.authority_id from user_authority as ua where ua.manage_id = :manageId and ua.user_id = :username and ua.now_authority = 1";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("manageId", manageId);
        query.setParameter("username", username);
        return query.getResultList();
    }
    /************************************************************************
     *@Description:获取用户课程中所有角色
     *@Author:黄浩
     *@Date:2018/8/1
     ************************************************************************/
    @Override
    public List<AuthorityVo> getAllAuthInSite(String manageId, String username) {
        List<AuthorityVo> authorityVoList = new ArrayList<>();
        boolean isStudent = true;
        //如果该用户在课程里，并且role字段为0，则为学生权限
        String studentSql = "select count(t.id) from TCourseSiteUser t where t.TCourseSite.id=:manageId and t.user.username=:username and t.role = 0";
        Query query = entityManager.createQuery(studentSql);

        String[] strings = manageId.split(",");
        List<Integer> integerList = new ArrayList<>(strings.length);
        for (String string : strings) {
            integerList.add(Integer.valueOf(string));
        }

        query.setParameter("manageId", integerList);
        query.setParameter("username", username);
        Integer count = ((Long) query.getSingleResult()).intValue();
        if (count > 0) {
            AuthorityVo authorityVo = new AuthorityVo();
            Authority authority = authorityJPA.getOne(103);
            authorityVo.setId(authority.getId());
            authorityVo.setAuthorityName(authority.getAuthorityName());
            authorityVo.setCname(authority.getCname());
            authorityVoList.add(authorityVo);
        }
        //获取除学生权限外的其他权限
        String sql = "select ua.authority_id,ua.now_authority from user_authority as ua where ua.manage_id =:manageId and ua.user_id =:username";
        Query queryList = entityManager.createNativeQuery(sql);
        queryList.setParameter("manageId", manageId);
        queryList.setParameter("username", username);
        List<Object[]> lists = new ArrayList<Object[]>(queryList.getResultList());
        for (Object[] visitCount : lists) {
            if (visitCount[0] != null) {
                Authority authority = authorityJPA.getOne(Integer.valueOf(visitCount[0].toString()));
                AuthorityVo authorityVo = new AuthorityVo();
                authorityVo.setId(authority.getId());
                authorityVo.setAuthorityName(authority.getAuthorityName());
                authorityVo.setCname(authority.getCname());
                if (visitCount[1] != null) {
                    authorityVo.setNowAuthority(Integer.valueOf(visitCount[1].toString()));
                    isStudent = false;
                } else {
                    authorityVo.setNowAuthority(0);
                }
                authorityVoList.add(authorityVo);
            }
        }
        if (authorityVoList.size() > 0) {
            if (authorityVoList.get(0).getId() == 103) {
                if (isStudent) {
                    authorityVoList.get(0).setNowAuthority(1);
                } else {
                    authorityVoList.get(0).setNowAuthority(0);
                }
            }
        }
        return authorityVoList;
    }
    /************************************************************************
     *@Description:切换用户课程中角色
     *@Author:黄浩
     *@Date:2018/8/1
     ************************************************************************/
    @Transactional
    @Override
    public void changeSiteRole(Integer authId, Integer siteId, String username) {
        //先把所有权限的当前权限标志位初始化
        String firstSql = "update user_authority set now_authority = null where user_id = :username and manage_id = :siteId ";

        Query query = entityManager.createNativeQuery(firstSql);
        query.setParameter("username", username);
        query.setParameter("siteId", siteId);
        query.executeUpdate();
        //再将切换的权限标志位置1
        String secondSql = "update user_authority set now_authority = 1 where user_id = :username and manage_id = :siteId and authority_id = :authId ";

        query = entityManager.createNativeQuery(secondSql);
        query.setParameter("username", username);
        query.setParameter("siteId", siteId);
        query.setParameter("authId", authId);
        query.executeUpdate();
    }


    /**
     * @param list  需要分隔的 集合
     * @param input 指定分隔size
     * @return
     */
    @Override
    public  List<List<String>> subStringList(List<String> list, int input) {

        int limit = (list.size() + input - 1) / input;
        List<List<String>> splitList;
        splitList = Stream.iterate(0, n -> n + 1).limit(limit).
                map(a -> list.stream().skip(a * input).limit(input).collect(Collectors.toList())).
                collect(Collectors.toList());
        //当输入数量小于分隔数量需反转
        if (input<limit){

            splitList = Stream.iterate(0, n -> n + 1).limit(input).
                    map(a -> list.stream().skip(a * limit).limit(limit).collect(Collectors.toList())).
                    collect(Collectors.toList());
        }


        return splitList;
    }
    /**
     * 获取文件列表
     */
    @Override
    public List<ResourceFileDto> getFilesByIds(Long[] ids) {
        List<ResourceFileDto> resourceFileDtoList = resourceContainerService.getFilesByIds(ids);
        return resourceFileDtoList;
    }

    @Override
    public List<ExperimentSkillVO> getAllExpProjectInSite(Integer siteId) {
        List<TExperimentSkill> list = tExperimentSkillJPA.findExperimentSkillListBySiteId(siteId);
        List<ExperimentSkillVO> resultList = new ArrayList<>();
        for (TExperimentSkill tExperimentSkill : list) {
            ExperimentSkillVO vo = new ExperimentSkillVO();
            BeanUtils.copyProperties(tExperimentSkill,vo);
            resultList.add(vo);
        }
        return resultList;
    }

    @Override
    public ExperimentSkillVO getExpProjectByChapterId(Integer chapterId) {
        TExperimentSkill expSkill = tExperimentSkillJPA.findExpSkillByChapterId(chapterId);
        if(expSkill==null){
            return null;
        }else{
            ExperimentSkillVO vo = new ExperimentSkillVO();
            BeanUtils.copyProperties(expSkill,vo);
            return vo;
        }
    }

    @Override
    public Integer getCurrWeek(Integer cid) {
        TCourseSite one = tCourseSiteJPA.getOne(cid);
        SchoolTerm schoolTerm = one.getSchoolTerm();
        Date date = new Date();
        List<SchoolWeek> weeks = schoolWeekJPA.findSchoolWeek(new Date(), schoolTerm.getId());
        if (weeks.size() > 0) {
            return weeks.get(0).getWeek();
        } else {//如果是暑假和寒假期间则显示第一周的数据
            return 1;
        }
    }

    @Override
    public List<Integer> getWeekList(Integer cid) {
        TCourseSite one = tCourseSiteJPA.getOne(cid);
        SchoolTerm schoolTerm = one.getSchoolTerm();
        Date date = new Date();
        List<SchoolWeek> weeks = schoolWeekJPA.findWeekList(schoolTerm.getId());
        List<Integer> weekList = new ArrayList<>();
        for (SchoolWeek week : weeks) {
            weekList.add(week.getWeek());
        }
        Set<Integer> setWeekList = new HashSet<Integer>(weekList);
        weekList.clear();
        weekList.addAll(setWeekList);
        return weekList;
    }

    @Override
    public List<CourseTableTopDateInfoVO> getCourseTableTopInfo(Integer cid, Integer weekId) {
        Integer schoolTermId = 0;
        if (cid != null) {
            //获取当前学期
            TCourseSite courseSite = tCourseSiteJPA.getOne(cid);
            //获取当前学期
            schoolTermId = courseSite.getSchoolTerm().getId();
        } else {
            schoolTermId = schoolTermJPA.getNowTerm();
        }
        List<CourseTableTopDateInfoVO> returnList = new ArrayList<>();
        List<SchoolWeek> all = schoolWeekJPA.findSchoolWeekByTermId(schoolTermId, weekId);
        for (SchoolWeek schoolWeek : all) {
            CourseTableTopDateInfoVO vo = new CourseTableTopDateInfoVO();
            vo.setTopDate(DateFormatUtil.dateToString2(schoolWeek.getDate()));
            String weekDayStr = "";
            switch (schoolWeek.getWeekday()) {
                case 1:
                    weekDayStr = "星期一";
                    break;
                case 2:
                    weekDayStr = "星期二";
                    break;
                case 3:
                    weekDayStr = "星期三";
                    break;
                case 4:
                    weekDayStr = "星期四";
                    break;
                case 5:
                    weekDayStr = "星期五";
                    break;
                case 6:
                    weekDayStr = "星期六";
                    break;
                case 7:
                    weekDayStr = "星期日";
                    break;
                default:
                    weekDayStr = "星期一";
            }
            vo.setWeekDay(weekDayStr);
            returnList.add(vo);
        }
        return returnList;
    }

    @Override
    public List<DoubleClassCourseInfoVO> getCourseInfoNew(Integer cid, Integer weekId) {

        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        //获取systemtime信息
//        Pageable pageable = PageRequest.of(0, 8);
        //获取默认校区编号
        String campusNumber = systemCampusJPA.getDefultCampus().getCampusNumber();
        List<SystemTime> sysTimeInfo = systemTimeJPA.findByCampusNumber(campusNumber);
        List<DoubleClassCourseInfoVO> doubleClassCourseInfoVOS = new ArrayList<>();
        //先查出来前八个
        int i = 0;
        //开始时间
        //开始数字
        int startClass = 0;
        //开始几次
        for (SystemTime systemTime : sysTimeInfo) {
            //现在是i=1
            startClass = systemTime.getSection();

            DoubleClassCourseInfoVO vo1 = new DoubleClassCourseInfoVO();
            vo1.setStatus(1);
            vo1.setStartClassInt(startClass);
            vo1.setEndClassInt(startClass);
            if (systemTime.getStartDate() != null) {
                vo1.setClassStartTime(sdf.format(systemTime.getStartDate()));
            }
            if (systemTime.getEndDate() != null) {
                vo1.setClassEndTime(sdf.format(systemTime.getEndDate()));
            }
            doubleClassCourseInfoVOS.add(vo1);
        }

        return doubleClassCourseInfoVOS;
    }
    @Override
    public void sendMessageNew(KafkaDTO kafkaDTO) {
        try {
            Result<String> stringResult = kafkaSender.sendMessage(kafkaDTO);
            if(stringResult.getCode()==-1){
                System.out.println("消息发送失败====" + stringResult.getMsg());
            }else if(stringResult.getCode()==0){
                System.out.println("消息发送成功===" + stringResult.getMsg());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}