package net.gvsun.gsexam.service.common;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import net.gvsun.gsexam.domain.*;
import net.gvsun.gsexam.dto.common.AuthorityVo;
import net.gvsun.gsexam.dto.common.DataResourceVO;
import net.gvsun.gsexam.dto.common.PageModel;
import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.jpa.*;
import net.gvsun.gsexam.utils.EmptyUtil;
import net.gvsun.gsexam.vo.exam.TCourseSiteVo;
import net.gvsun.gsexam.vo.layui.LayuiDataVo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service("shareService")
public class ShareServiceImpl implements ShareService {
    private String showDeviceURL;
    @PersistenceContext
    private EntityManager entityManager;
    /*
     * 将UserJPA引入，并重命名为userJPA;
     */
    @Autowired
    private UserJPA userJPA;
    @Autowired
    private AuthorityJPA authorityJPA;
    @Autowired
    private SchoolClassesJPA schoolClassesJPA;
    @Autowired
    private TCourseSiteUserJPA tCourseSiteUserJPA;
    @Autowired
    private FanDataSourceJAP fanDataSourceJAP;
    @Autowired
    private TCourseSiteJPA tCourseSiteJPA;
    @Autowired
    private TAssignmentClassJPA tAssignmentClassJPA;

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
            UserDetails userDetails = (UserDetails) auth;
            User user = userJPA.findOne(userDetails.getUsername());
            UserVo userVo = new UserVo();
            BeanUtils.copyProperties(userVo, user);
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
    public UserVo getUserByUsername(String username) {
        User user = userJPA.findOne(username);
        UserVo userVo = new UserVo();
        userVo.setRole(user.getUserRole());
        userVo.setCname(user.getCname());
        userVo.setUsername(user.getUsername());
        userVo.setPassword(user.getPassword());
        if (user.getSchoolAcademy() != null) {
            userVo.setAcademyNumber(user.getSchoolAcademy().getAcademyNumber());
        }
        if (user.getSchoolClass() != null) {
            userVo.setClassNumber(user.getSchoolClass().getClassNumber());
        }
        Set<AuthorityVo> authorityVos = new HashSet<AuthorityVo>();
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
     * Description 通用模块-分页展示信息
     *
     * @author lixueteng
     * @date 2017-09-21
     **************************************************************************/
    @Override
    public Map<String, Integer> getPage(int currpage, int pageSize, int totalRecords) {
        Map<String, Integer> map = new HashMap<String, Integer>();
        PageModel pageModel = new PageModel();
        pageModel.setTotalRecords(totalRecords);
        pageModel.setPageSize(pageSize);
        pageModel.setCurrpage(currpage);
        map.put("totalPage", pageModel.getTotalPage());
        map.put("nextPage", pageModel.getNextPage());
        map.put("previousPage", pageModel.getPreiviousPage());
        map.put("firstPage", pageModel.getFisrtPage());
        map.put("lastPage", pageModel.getLastPage());
        map.put("currpage", pageModel.getCurrpage());
        map.put("totalRecords", totalRecords);
        map.put("pageSize", pageSize);
        return map;
    }

    /**************************************************************************
     * Description 根据用户名获取用户权限信息
     *
     * @author 罗璇
     * @date 2017年10月26日
     **************************************************************************/
    @Override
    public List<AuthorityVo> findAuthByUsername(String username) {
        Set<Authority> authorityList = userJPA.findOne(username).getAuthorities();
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
        Authority authority = authorityJPA.findOne(authId);
        AuthorityVo rs = new AuthorityVo();
        rs.setId(authority.getId());
        rs.setAuthorityName(authority.getAuthorityName());
        rs.setCname(authority.getCname());
        return rs;
    }

    /**************************************************************************
     * Description:作业-生成pdf
     *
     * @author：裴继超
     * @date ：2017-3-20
     **************************************************************************/
    @Override
    public File Pdf(ArrayList<String> imageUrllist, String mOutputPdfFileName) {
        String TAG = "PdfManager";
        Document doc = new Document(PageSize.A4, 20, 20, 20, 20);
        try {
            PdfWriter
                    .getInstance(doc, new FileOutputStream(mOutputPdfFileName));
            doc.open();
            for (int i = 0; i < imageUrllist.size(); i++) {
                doc.newPage();
//                doc.add(new Paragraph("简单使用iText"));
                Image png1 = Image.getInstance(imageUrllist.get(i));
                float heigth = png1.getHeight();
                float width = png1.getWidth();
                int percent = getPercent2(heigth, width);
                png1.setAlignment(Image.MIDDLE);
                png1.scalePercent(percent);// 表示是原来图像的比例;
                doc.add(png1);
            }
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
     * Description:获得文件夹内文件的个数。
     *
     * @author：黄浩
     * @date ：2018年12月27日
     **************************************************************************/
    @Override
    public long getFileSize(File f) {
        long size = 0;
        File flist[] = f.listFiles();
        for (int i = 0; i < flist.length; i++) {
            if (flist[i].isDirectory()) {
                size = size + getFileSize(flist[i]);
            } else {
                size = size + flist[i].length();
            }
        }
        return size;
    }

    /**************************************************************************
     * Description 根据课程siteId和username判断改用户是否存在于课程中
     *
     * @author 曹焕
     * @date 2018年12月05日
     * @param siteId
     **************************************************************************/
    @Override
    public boolean findTCourseSitesBySiteIdAndUsername(Integer siteId, String username) {
        List<TCourseSiteUser> tCourseSiteUsers = tCourseSiteUserJPA.getTCourseSiteUserBySiteIdAndUsername(username, siteId);
        if (tCourseSiteUsers.size() > 0) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Boolean changeDataResource(String dataSource) {
        Boolean flag = true;
        try {
            FanDataSource fanDataSource = fanDataSourceJAP.findFanDataSourceByName(dataSource);
            System.out.println(fanDataSource.getcName());
        } catch (Exception e) {
            e.printStackTrace();
            flag = false;
        }
        return flag;
    }

    @Override
    public List<DataResourceVO> findAllDataResource() {
        List<FanDataSource> fanDataSources = fanDataSourceJAP.findAll();
        List<DataResourceVO> list = new ArrayList<>();
        for (FanDataSource fanDataSource : fanDataSources) {
            DataResourceVO dataResourceVO = new DataResourceVO();
            dataResourceVO.setId(fanDataSource.getId());
            dataResourceVO.setName(fanDataSource.getName());
            dataResourceVO.setCname(fanDataSource.getcName());
            list.add(dataResourceVO);
        }
        return list;
    }

    /**************************************************************************
     * @Description 浙江外国语统一身份认证通过身份证号码查找用户
     * @author 张德冰
     * @date 2019-05-14
     **************************************************************************/
    @Override
    public UserVo getUserByMasterMajor(String username) {
        List<User> users = userJPA.findUserByMasterMajor(username);
        UserVo userVo = new UserVo();
        if (users.size() > 0) {
            userVo.setUsername(users.get(0).getUsername());
            userVo.setPassword(users.get(0).getPassword());
        }
        return userVo;
    }

    /***********************************************************************************************
     * @功能：通用模塊service層定義-处理中文乱码
     * @作者：彭文玉
     * @日期：2014-07-27
     ***********************************************************************************************/
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

    /***********************************************************************************************
     * @功能：查找班级成员
     * @作者：刘博越
     * @日期：2019-05-30
     ***********************************************************************************************/
    @Override
    public List<UserVo> findStudentByClassNumber(String classNumber) {
        List<User> users = userJPA.findStudentByClassNumber(classNumber);
        String className = schoolClassesJPA.getSchoolClassByClassNumber(classNumber).getClassName();
        List<UserVo> userVos = new ArrayList<>();
        for (User u : users) {
            UserVo userVo = new UserVo();
            userVo.setUsername(u.getUsername());
            userVo.setCname(u.getCname());
            userVo.setClassName(className);
            userVos.add(userVo);
        }
        return userVos;
    }
    @Override
    public String findStageMangeByType(){
        String sql="select image_url from stage_manage where type=2 order by id desc";
        List<String> list=entityManager.createNativeQuery(sql).getResultList();
        if(list.size()>0){
            return list.get(0);
        }else{
            return null;
        }
    }

    @Override
    public AuthorityVo initializeRole(Integer cid, String username){
        AuthorityVo authorityVo = new AuthorityVo();
        //判断是全校课程（盐城）还是普通课程
        TCourseSite tCourseSite = tCourseSiteJPA.findOne(cid);
        if (!tCourseSite.getTitle().equals("全校考试")){
            //获取当前是否为非学生的课程权限
            Authority nowAuthority = authorityJPA.getNowAuthority(cid,username);
            if (nowAuthority!=null){
                //助教，授课教师为老师权限
                if (nowAuthority.getAuthorityName().equals("TEACHING")||nowAuthority.getAuthorityName().equals("ASSISTANT")){
                    authorityVo.setAuthorityName("TEACHER");
                    authorityVo.setCname("专职教师");
                }else if (nowAuthority.getAuthorityName().equals("TEAMLEADER")){//组长为学生权限
                    authorityVo.setAuthorityName("STUDENT");
                    authorityVo.setCname("在册学生");
                }
            }else {
                //判断是否为课程学生权限
                //如果该用户在课程里，并且role字段为0，则为学生权限
                if (tCourseSiteUserJPA.isStudent(cid, username)>0){
                    authorityVo.setAuthorityName("STUDENT");
                    authorityVo.setCname("在册学生");
                }
            }

        }else {
            Authority ycNowAuthority = authorityJPA.getYCNowAuthority(username);
            if (ycNowAuthority!=null){
                if (ycNowAuthority.getAuthorityName().equals("EXCENTTERDIRECTOR") || ycNowAuthority.getAuthorityName().equals("LABMANAGER")){
                    authorityVo.setAuthorityName("SUPERADMIN");
                    authorityVo.setCname("超级管理员");
                }else if (ycNowAuthority.getAuthorityName().equals("TEACHER")){
                    authorityVo.setAuthorityName("TEACHER");
                    authorityVo.setCname("专职教师");
                }else if (ycNowAuthority.getAuthorityName().equals("STUDENT")){
                    authorityVo.setAuthorityName("STUDENT");
                    authorityVo.setCname("在册学生");
                }
            }
        }
        return authorityVo;
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
    /************************************************************************
     *@Description:获取全校考试这门课程的Id
     *@Author:黄浩
     *@Date:2020年10月27日
     ************************************************************************/
    @Override
    public Integer specialSite() {
        return  tCourseSiteJPA.specialSiteId();
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
        Authority authorityStudent = authorityJPA.getAuthorityByAuthorityName("STUDENT");
        Authority authorityTeacher = authorityJPA.getAuthorityByAuthorityName("TEACHER");
        if (count>0){
            AuthorityVo authorityVo = new AuthorityVo();
            authorityVo.setId(authorityStudent.getId());
            authorityVo.setAuthorityName(authorityStudent.getAuthorityName());
            authorityVo.setCname(authorityStudent.getCname());
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
                Authority authority = authorityJPA.findOne(Integer.valueOf(visitCount[0].toString()));
                if (authority.getAuthorityName().equals("TEAMLEADER")){
                    boolean exitStudent = authorityVoList.stream().filter(m->m.getAuthorityName().equals("STUDENT")).findAny().isPresent();
                    if (!exitStudent){
                        AuthorityVo authorityVo = new AuthorityVo();
                        authorityVo.setId(authorityStudent.getId());
                        authorityVo.setAuthorityName(authorityStudent.getAuthorityName());
                        authorityVo.setCname(authorityStudent.getCname());
                        authorityVoList.add(authorityVo);
                    }
                }else if (authority.getAuthorityName().equals("TEACHING")||authority.getAuthorityName().equals("ASSISTANT")){
                    AuthorityVo authorityVo = new AuthorityVo();
                    authorityVo.setId(authorityTeacher.getId());
                    authorityVo.setAuthorityName(authorityTeacher.getAuthorityName());
                    authorityVo.setCname(authorityTeacher.getCname());
                    authorityVoList.add(authorityVo);
                }
            }
        }
        authorityVoList = authorityVoList.stream().distinct().collect(Collectors.toList());
        return authorityVoList;
    }
    /************************************************************************
     *@Description:通过课程id查找课程
     *@Author:fubowen
     *@Date:2020-12-21
     ************************************************************************/
    @Override
    public TCourseSiteVo findTCourseSiteBySiteId(Integer siteId){
        TCourseSite tCourseSite = tCourseSiteJPA.findOne(siteId);
        TCourseSiteVo vo = new TCourseSiteVo();
        vo.setId(tCourseSite.getId());
        vo.setTitle(tCourseSite.getTitle());
        return vo;
    }
    /**************************************************************************
     * Description 获取课程用户
     *
     * @author 黄浩
     * @date 2021年1月18日
     * @param siteId
     **************************************************************************/
    @Override
    public List<LayuiDataVo> findNotPassStudents(Integer siteId, Integer page, Integer limit, String search,Integer assignmentId) {
        List<LayuiDataVo> results = new ArrayList<>();
        String sql = "SELECT DISTINCT\n" +
                "\tu.username \n" +
                "FROM\n" +
                "\tt_course_site_user tcsu\n" +
                "\tJOIN `user` u ON tcsu.username = u.username \n" +
                "WHERE\n" +
                "\ttcsu.site_id =:siteId \n" +
                "\tAND tcsu.username NOT IN ( SELECT student FROM t_assignment_grading WHERE assignment_id =:assignmentId AND final_score >= ( SELECT passing_score FROM t_assignment_answer_assign WHERE assignment_id =:assignmentId ) \n" ;
        if(!EmptyUtil.isEmpty(search)){
            sql += "\tAND (u.username LIKE CONCAT( '%',:search, '%' ) \n" +
                    "\tOR u.cname LIKE CONCAT(\n" +
                    "\t'%',:search,\n" +
                    "\t'%'))\n" ;
        }
        sql += "\t) " +
                " limit :start,:pageSize";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("siteId",siteId);
        query.setParameter("assignmentId",assignmentId);
        if (!EmptyUtil.isEmpty(search)) {
            query.setParameter("search",search);
        }
        query.setParameter("start",(page-1)*limit);
        query.setParameter("pageSize",limit);
        List<String> list = query.getResultList();
        list.forEach(s -> {
            LayuiDataVo layuiDataVo = new LayuiDataVo();
            layuiDataVo.setUsername(s);
            layuiDataVo.setCname(userJPA.getOne(s).getCname());
            results.add(layuiDataVo);
        });
        return results;
    }

    @Override
    public Integer countNotPassStudents(Integer siteId, String search, Integer assignmentId) {
        String sql = "SELECT count(DISTINCT\n" +
                "\tu.username )\n" +
                "FROM\n" +
                "\tt_course_site_user tcsu\n" +
                "\tJOIN `user` u ON tcsu.username = u.username \n" +
                "WHERE\n" +
                "\ttcsu.site_id =:siteId \n" +
                "\tAND tcsu.username NOT IN ( SELECT student FROM t_assignment_grading WHERE assignment_id =:assignmentId AND final_score >= ( SELECT passing_score FROM t_assignment_answer_assign WHERE assignment_id =:assignmentId ) \n" ;
        if(!EmptyUtil.isEmpty(search)){
            sql += "\tAND (u.username LIKE CONCAT( '%',:search, '%' ) \n" +
                    "\tOR u.cname LIKE CONCAT(\n" +
                    "\t'%',:search,\n" +
                    "\t'%'))\n" ;
        }
        sql += "\t) " ;
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("siteId",siteId);
        query.setParameter("assignmentId",assignmentId);
        if (!EmptyUtil.isEmpty(search)) {
            query.setParameter("search",search);
        }
        return Integer.parseInt(query.getSingleResult().toString());
    }

    /**************************************************************************
     * Description 获取全校课程的课程用户（根据t_assignment_class表）
     *
     * @author fubowen
     * @date 2021-3-22
     **************************************************************************/
    @Override
    public List<LayuiDataVo> findSiteStudentAllSchool(Integer page, Integer limit, String search, Integer examId) {
        List<LayuiDataVo> results = new ArrayList<>();
        //保存返回给前端的用户列表
        String sql = "select u from User u where 1=1 ";
        if (!EmptyUtil.isEmpty(search)){
            sql += "and (u.username like :search or u.cname like :search) ";
        }
        List<TAssignmentClass> tacList = tAssignmentClassJPA.findAssignmentClassById(examId);
        //查询班级下的用户，先以中间表里的班级为准，班级为空再按照学院查
        if(tacList!=null && tacList.size()>0){
            sql += "and u.schoolClass.classNumber in :classArr";
        }else{
            String sql1 = "select school_academy from t_assignment where id =:id";
            Query nativeQuery = entityManager.createNativeQuery(sql1);
            nativeQuery.setParameter("id",examId);
            String academy = (String) nativeQuery.getSingleResult();
            if(academy.indexOf("*000")>-1){//选择的学院中包含全校
                sql += "and u.schoolClass.classNumber is not null";
            }else{
                sql += "and u.schoolAcademy.academyNumber in :academy";
            }
        }
        System.out.println(sql);
        Query query = entityManager.createQuery(sql);
        if (!EmptyUtil.isEmpty(search)){
            query.setParameter("search","%" + search + "%");
        }
        if(tacList!=null && tacList.size()>0){
            List<String> list000 = new ArrayList<>();
            for (int i=0;i<tacList.size();i++){
                list000.add(tacList.get(i).getSchoolClass().getClassNumber());
            }
            query.setParameter("classArr",list000);
        }else{
            String sql1 = "select school_academy from t_assignment where id =:id";
            Query nativeQuery = entityManager.createNativeQuery(sql1);
            nativeQuery.setParameter("id",examId);
            String academy = (String) nativeQuery.getSingleResult();
            if(academy.indexOf("*000")>-1){//选择的学院中包含全校

            }else{
                query.setParameter("academy",'('+academy+')');
            }
        }
        query.setFirstResult((page-1)*limit);
        query.setMaxResults(limit);
        List<User> userList = query.getResultList();
        for (User user : userList) {
            LayuiDataVo layuiDataVo = new LayuiDataVo();
            layuiDataVo.setUsername(user.getUsername());
            layuiDataVo.setCname(user.getCname());
            results.add(layuiDataVo);
        }

        return results;
    }

    /**************************************************************************
     * Description 获取课程用户数量
     *
     * @author 黄浩
     * @date 2021年1月18日
     * @param siteId
     **************************************************************************/
    @Override
    public int countSiteStudent(Integer siteId, String search) {
        List<LayuiDataVo> results = new ArrayList<>();
        String sql = "select count(u.id) from TCourseSiteUser u where u.TCourseSite.id = :siteId";
        if (!EmptyUtil.isEmpty(search)) {
            sql += " and (u.user.username like :search or u.user.cname like :search)";
        }
        Query query = entityManager.createQuery(sql);
        query.setParameter("siteId",siteId);
        if (!EmptyUtil.isEmpty(search)) {
            query.setParameter("search","%" + search + "%");
        }
        int count = Integer.valueOf(query.getSingleResult().toString());
        return count;
    }
}