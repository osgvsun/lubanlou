package net.gvsun.gsexam.exammain.views;

import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.datasource.dto.GvsunDataSourceDto;
import net.gvsun.gsexam.domain.SchoolClass;
import net.gvsun.gsexam.domain.TCourseSite;
import net.gvsun.gsexam.dto.common.*;
import net.gvsun.gsexam.dto.exam.CopyExamDTO;
import net.gvsun.gsexam.dto.exam.SubmitItemDTO;
import net.gvsun.gsexam.dto.exam.WkChapterDto;
import net.gvsun.gsexam.exammain.api.CommonResult;
import net.gvsun.gsexam.jpa.SchoolClassesJPA;
import net.gvsun.gsexam.jpa.TCourseSiteJPA;
import net.gvsun.gsexam.service.common.ShareService;
import net.gvsun.gsexam.service.exam.*;
import net.gvsun.gsexam.service.pool.TAssignmentExamQuestionpoolService;
import net.gvsun.gsexam.service.pool.TAssignmentQuestionPoolService;
import net.gvsun.gsexam.service.test.TestInfoService;
import net.gvsun.gsexam.utils.EmptyUtil;
import net.gvsun.gsexam.utils.Util;
import net.gvsun.gsexam.utils.WordHandler;
import net.gvsun.gsexam.vo.admit.AdmissionVo;
import net.gvsun.gsexam.vo.exam.*;
import net.gvsun.gsexam.vo.layui.LayuiDataVo;
import net.gvsun.gsexam.vo.test.TestDetailVo;
import net.gvsun.gsexam.vo.test.TestInfoVO;
import net.gvsun.gsexam.vo.test.TestSectionVO;
import net.gvsun.web.util.Authorization;
import net.gvsun.web.util.AuthorizationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.*;
import java.util.stream.Collectors;

@Controller
@CrossOrigin("*")
@RequestMapping("/views")
public class ViewsExamController {
    @Value("${serverHost}/gvsunResource/fileUpload/uploadFile")
    private String uploadFileHost;
    @Value("${projectName}")
    private String projectName;
    @Value("${pdfDirector}")
    private String pdfDirector;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHost;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHostForUpload;
    @Value("${projectTitle}")
    private String projectTitle;
    @Value("${apiGateWayHost}")
    private String apiGateWayHost;
    @Value("${oauth2Host}")
    private String oauth2Host;
    @Value("${serverHost}/gvsunQuestionPool/questionPool/login/?siteId=")
    private String questionPoolHost;
    @Value("${serverHost}/gvsunTms/teach/mainPage?cid=")
    private String teachHost;
    @Autowired
    private ExamListService examListService;
    @Autowired
    private ShareService shareService;
    @Autowired
    private ExamDetailService examDetailService;
    @Autowired
    private ExamGradingService examGradingService;
    @Autowired
    private TAssignmentService tAssignmentService;
    @Autowired
    private WkChapterService wkChapterService;
    @Autowired
    private TAssignmentQuestionPoolService tAssignmentQuestionPoolService;
    @Autowired
    private ExamSubScribeService examSubScribeService;
    @Autowired
    private TAssignmentExamQuestionpoolService tAssignmentExamQuestionpoolService;
    @Autowired
    private TestInfoService testInfoService;
    @Autowired
    private GradeBookService gradeBookService;
    @Autowired
    private ClientDatabaseContext clientDatabaseContext;
    @Autowired
    private TCourseSiteJPA tCourseSiteJPA;
    @Autowired
    private SchoolClassesJPA schoolClassesJPA;

    /**************************************************************************
     * Description 个人中心
     *
     * @author 洪春莹
     * @date 2019年3月11日
     **************************************************************************/
    @RequestMapping("/personalInfo")
    public String listMyInfo(HttpServletRequest request, Map<String, Object> map) {
        //获取个人信息
        UserVo userInfoVO = examListService.findUserByUserName(this.getCurrUser().getUsername());
        map.put("userInfo", userInfoVO);
        map.put("userName", userInfoVO.getUsername());
        //获取当前登录人的权限
        //String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        String authorityName = "";
        if (request.getSession().getAttribute("AUTHORITYNAME") != null) {
            authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        } else {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            List<AuthorityVo> authorityVoList = shareService.findAuthByUsername(auth.getPrincipal().toString());
            authorityName = authorityVoList.get(0).getAuthorityName();
        }
        request.getSession().setAttribute("AUTHORITYNAME", authorityName);
        map.put("authorityName", authorityName);
        map.put("uploadFileHost", uploadFileHost);
        return "views/personalInfo";
    }

    /**************************************************************************
     * Description 编辑个人信息
     *
     * @author 洪春莹
     * @date 2019年3月12日
     **************************************************************************/
    @RequestMapping("/editpersonalinfo")
    public String editMyInfo(HttpServletRequest request, Map<String, Object> map, Integer flag) {
        //获取个人信息
        UserVo userVo = examListService.findUserByUserName(getCurrUser().getUsername());
        map.put("userVo", userVo);
        map.put("userName", userVo.getUsername());
        //获取学院
        List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllAcademys();
        map.put("schoolAcademyVoList", schoolAcademyVoList);
        map.put("uploadFileHost", uploadFileHost);
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        map.put("flag", flag);
        return "views/editpersonalinfo";
    }

    /**************************************************************************
     * Description 保存个人信息
     *
     * @author 洪春莹
     * @date 2019年3月12日
     **************************************************************************/
    @RequestMapping("/saveMyInfo")
    public String saveMyInfo(@ModelAttribute UserVo userVo) {
        examListService.saveUserInfo(userVo);
        return "true";
    }

    /**************************************************************************
     * Description 个人信息--保存个人图片
     *
     * @author 黄浩
     * @date 2018年3月27日
     **************************************************************************/
    @RequestMapping("/saveMyInfoPhoto")
    public String saveMyInfoPhoto(String fileid) {
        //获取个人信息
        UserVo userVo = examListService.findUserByUserName(getCurrUser().getUsername());
        examListService.saveMyInfoPhoto(userVo, fileid);
        return "true";
    }

    /**************************************************************************
     * Description 考试模块-考试入口
     *
     * @author 黄浩
     * @date 2020年7月30日
     **************************************************************************/
    @RequestMapping("/mainindex")
    public String mainindex(HttpServletRequest request, Map<String, Object> map, Integer cid, String pathType, String d) throws Exception {

        //获取当前用户
        UserVo userVo = this.getCurrUser();
        map.put("userName", userVo.getUsername());
        if (EmptyUtil.isEmpty(pathType)) {
            Object pathTypeO = request.getSession().getAttribute("pathType");
            if (pathTypeO == null) {
                cid = shareService.specialSite();
            }
        }
        if (cid == null) {
            Object cid0 = request.getSession().getAttribute("cid");
            cid = Integer.valueOf(cid0.toString());
        }
        String image = shareService.findStageMangeByType();
        //获取当前登录人的权限
        Object o = request.getSession().getAttribute("cid");
        if (o == null) {
            AuthorityVo authorityVo = shareService.initializeRole(cid, userVo.getUsername());
            request.getSession().setAttribute("AUTHORITYNAME", authorityVo.getAuthorityName());
            request.getSession().setAttribute("AUTHORITYCNAME", authorityVo.getCname());
            map.put("authorityName", authorityVo.getAuthorityName());
        } else {
            map.put("authorityName", request.getSession().getAttribute("AUTHORITYNAME"));
//            pathType = request.getSession().getAttribute("pathType").toString();
        }
        request.getSession().setAttribute("cid", cid);
        request.getSession().setAttribute("oauth2Host", oauth2Host);
        request.getSession().setAttribute("image", image);
        request.getSession().setAttribute("currentUsername", userVo.getUsername());
        request.getSession().setAttribute("currentUserCname", userVo.getCname());
        request.getSession().setAttribute("resourceContainerHost", resourceContainerHost);
        request.getSession().setAttribute("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("questionUrl", questionPoolHost + cid);
        request.getSession().setAttribute("datasource", d);
        GvsunDataSourceDto gvsunDataSourceDto = clientDatabaseContext.getCurrentDataSourceDto();
        map.put("schoolName", gvsunDataSourceDto.getSchoolName());
        map.put("apiGateWayHost", apiGateWayHost);
        map.put("cid", cid);
        map.put("cname",tCourseSiteJPA.findById(cid).get().getTitle());
        map.put("pathType", pathType);
        map.put("teachHost", teachHost);
        return "views/mainindex";
    }

    /**************************************************************************
     * Description 考试模块-考试列表入口
     *
     * @author 黄浩
     * @date 2020年7月30日
     **************************************************************************/
    @RequestMapping("/examList")
    public String examList(HttpServletRequest request, Map<String, Object> map, Integer cid) {
        System.out.println("开始时间:" + System.currentTimeMillis());
        if (cid == null) {
            Object cid0 = request.getSession().getAttribute("cid");
            cid = Integer.valueOf(cid0.toString());
        } else {
            request.getSession().setAttribute("cid", cid);
        }
        map.put("siteId", cid);
        List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite("");
        request.getSession().setAttribute("siteList", allTCourseSite);
        map.put("allTCourseSite", allTCourseSite);
        map.put("oauth2Host", oauth2Host);
        UserVo userVo = this.getCurrUser();
        String a = request.getSession().getAttribute("AUTHORITYNAME").toString();
        request.getSession().setAttribute("currentUsername", userVo.getUsername());
        request.getSession().setAttribute("currentUserCname", userVo.getCname());
        request.getSession().setAttribute("resourceContainerHostresourceContainerHost", resourceContainerHost);
        request.getSession().setAttribute("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("questionUrl", questionPoolHost);
        request.getSession().setAttribute("pathType", "exam");
        boolean fla = shareService.findTCourseSitesBySiteIdAndUsername(cid, getCurrUser().getUsername());
        map.put("fla", fla);
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(cid);
        map.put("cTitle", tCourseSiteVo.getTitle());
        map.put("teachHost", teachHost);
        return "views/examList";
    }

    /**
     * 判断学生是否在课程中
     * @param cid
     * @param username
     * @return
     */
    @RequestMapping("/isStudentInSite")
    @ResponseBody
    public Boolean isStudentInSite(@RequestParam Integer cid,@RequestParam String username){
        return shareService.findTCourseSitesBySiteIdAndUsername(cid, username);
    }

    /**************************************************************************
     * Description 考试模块-考试列表api
     *
     * @author 黄浩
     * @date 2020年7月30日
     **************************************************************************/
    @RequestMapping(value = "/examListApi", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<List<ExamListVo>> examListApi(HttpServletRequest request, Integer id, Integer page, Integer limit, Integer dateType, Integer dictionary, @RequestParam String student,String authorityName) {
        //dictionary：1 参数id为课程id;2 参数id为章节id;3 参数id为小节id
        UserVo userVo = shareService.getUserByUsername(student);
        dictionary = (dictionary == null ? 1 : dictionary);
        if (dictionary == 1) {
            request.getSession().setAttribute("cid", id);
        }
        dateType = (dateType == null ? 0 : dateType);
        Date date = new Date();
        List<ExamListVo> examListDtos = examListService.findExamList(id, userVo, authorityName, "exam", dictionary);
        //未开始：1，进行中：2，已结束：3
        switch (dateType) {
            case 1:
                examListDtos = examListDtos.stream().filter(d -> d.getStartTime().getTime() > date.getTime()).collect(Collectors.toList());
                break;
            case 2:
                examListDtos = examListDtos.stream().filter(d -> d.getStartTime().getTime() < date.getTime() && d.getDueTime().getTime() > date.getTime()).collect(Collectors.toList());
                break;
            case 3:
                examListDtos = examListDtos.stream().filter(d -> d.getDueTime().getTime() < date.getTime()).collect(Collectors.toList());
                break;
            default:
                examListDtos = examListDtos;
        }
        Integer totalRecords = examListDtos.size();
        //分页
        if (page * limit <= totalRecords) {
            examListDtos = examListDtos.subList(limit * (page - 1), limit * page);
        } else {
            examListDtos = examListDtos.subList(limit * (page - 1), totalRecords);
        }
        System.out.println("结束时间:" + System.currentTimeMillis());
        return CommonResult.success(examListDtos, totalRecords);
    }

    /**************************************************************************
     * Description 考试模块-新增考试
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping("/newExam")
    public String newExam(HttpServletRequest request, Map<String, Object> map, Integer cid, Integer moduleType) throws Exception {
        //获取登录用户信息
        UserVo user = getCurrUser();
        map.put("user", user);
        if (cid != null) {
            map.put("cid", cid);
            //如果有传入tCourseSiteId则用传入id
            request.getSession().setAttribute("cid", cid.intValue());
            List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite("");
            request.getSession().setAttribute("siteList", allTCourseSite);
            map.put("allTCourseSite", allTCourseSite);
        }
        //新建页面参数保存VO对象
        EditTestVo editTestVo = new EditTestVo();
        map.put("editTestVo", editTestVo);
        map.put("projectTitle", projectTitle);
        //获取课程网站信息
        //获取站点
        Object cidO = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cidO.toString());
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(tCourseSiteId);
        map.put("tCourseSiteId", tCourseSiteId);
        map.put("tCourseSiteVo", tCourseSiteVo);
        map.put("today", new Date());
        map.put("projectName", projectName);
        if (projectName.equals("proteach")) {
            //获取wkChapters
            List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTCourseSiteIdAndModuleType(tCourseSiteId, moduleType);
            map.put("wkChapters", wkChapterDtoList);
        }
        //获取学院（只显示有可以考试的班级的学院）
//        List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllAcademys();
        List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllExamAcademys();
        map.put("schoolAcademyVoList", schoolAcademyVoList);
        //获取可以补考的考试（所有已发布并过时的）
        List<ExamListVo> makeUpExamList = examListService.findMakeUpExamList(tCourseSiteId);
        map.put("makeUpExamList", makeUpExamList);
        //设置知识技能体验
//      Integer moduleType = 1;//暂时写死
        map.put("moduleType", moduleType);
        //selectId
        map.put("selectId", -1);
        //获取以发布的预约考试
        List<ExamSubScribeVo> subScribeExamList = examSubScribeService.getSubScribeExamList(user);
        map.put("subScribeExamList", subScribeExamList);
//        //存放题库的信息
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        //获取所有试卷库分类
        List<QuestionpoolCategoryVo> questionpoolCategoryVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpoolCategory();
        map.put("questionpoolCategory", questionpoolCategoryVoList);
        //获取所有试卷库
        List<ExamQuestionpoolVo> examQuestionpoolVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpool();
        map.put("examQuestionpool", examQuestionpoolVoList);
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        return "views/newExam";
    }

    /**************************************************************************
     * @Description: 知识技能体验-ajax根据type获取章节
     * @Author: 罗璇
     * @Date: 2017/10/10 17:39
     **************************************************************************/
    @RequestMapping("/editExam/findChapterMap")
    @ResponseBody
    public Map<Integer, String> findChapterMap(Integer moduleType, HttpServletRequest request) {
        Map<Integer, String> map = new HashMap<Integer, String>();
        Object cid = request.getSession().getAttribute("cid");
        Integer siteId = Integer.parseInt(cid.toString());
        map = wkChapterService.findChapterMapByModuleTypeAndSiteId(siteId, moduleType);
        return map;
    }

    /**************************************************************************
     * @Description: 知识技能体验-ajax根据type获取章节
     * @Author: 罗璇
     * @Date: 2017/10/10 17:51
     **************************************************************************/
    @RequestMapping("/editExam/findLessonMap")
    @ResponseBody
    public Map<Integer, String> findLessonMap(@RequestParam Integer chapterId, Integer tCourseSiteId) {
        Map<Integer, String> map = new HashMap<Integer, String>();
        map = wkChapterService.findLessonMapByChapterId(chapterId);
        return map;
    }

    /**************************************************************************
     * Description 考试模块-新增编辑考试-根据学院动态获取班级
     *
     * @author 洪春莹
     * @date 2018-12-05
     **************************************************************************/
    @RequestMapping("/findAllClasses")
    @ResponseBody
    public List<SchoolClassesVo> findAllClasses(HttpServletRequest request, Map<String, Object> map, String schoolAcademy) throws Exception {
        map.put("projectTitle", projectTitle);
        //根据学院获取班级
        List<SchoolClassesVo> schoolClassesVoList = wkChapterService.findAllClassesByAcademyNumber(schoolAcademy);
        return schoolClassesVoList;
    }

    /**************************************************************************
     * Description 考试模块-新增编辑考试-新增题目
     *
     * @author 黄浩
     * @date 2020年8月3日
     **************************************************************************/
    @RequestMapping("/addExamQuestionBank")
    public String addExamQuestionBank(HttpServletRequest request, Map<String, Object> map) {
        Object cid = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cid.toString());
        TCourseSiteVo tCourseSiteVo = shareService.findTCourseSiteBySiteId(tCourseSiteId);
        map.put("coursename", tCourseSiteVo.getTitle());
        //存放题库的信息
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        //存放题库分类信息
        List<QuestionpoolCategoryVo> qcvoList = tAssignmentQuestionPoolService.getAllQuestionPoolCategory();
        map.put("questionpoolCategory", qcvoList);
        return "views/addExamQuestionBank";
    }

    /**************************************************************************
     * Description 新增题库-监听下拉框调的接口
     *
     * @author fubowen
     * @date 2020-12-17
     **************************************************************************/
    @RequestMapping("/updateQuestionPool")
    @ResponseBody
    public List<TAssignmentQuestpoolVo> updateQuestionPool(Integer cid,Integer selectType, Integer categoryId, Integer questionType) {
        //存放题库的信息
        Integer type = -1;
        if (selectType != null) {
            type = selectType;
        }
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.updateQuestionPool(cid, type, 0, categoryId, questionType);
        return tAssignmentQuestionpool;
    }

    /**************************************************************************
     * @Description: 检查指定类型题目数量是否超出题库该类型题目数量
     * @Author: 罗璇
     * @Date: 2017/10/9 22:59
     **************************************************************************/
    @ResponseBody
    @RequestMapping("/question/checkTestItemCount")
    public String checkTestItemCount(Integer questionpoolId, Integer quantity, String type, Integer gapsNumber) {
        return tAssignmentQuestionPoolService.checkTestItemCount(questionpoolId, quantity, Integer.parseInt(type), gapsNumber);
    }

    /**************************************************************************
     * @Description: 保存考试
     * @Author: 罗璇
     * @Date: 2017/10/5 14:19
     **************************************************************************/
    @RequestMapping("/saveExam")
    @ResponseBody
    public String saveExam(HttpServletRequest request, Map<String, Object> map,Integer siteId, String currUsername) {
        //以下获取表单发送的参数
        //考试ID
        Integer tAssignmentId = Util.isEmpty(request.getParameter("testId")) ? null : Integer.valueOf(request.getParameter("testId"));
        //考试名称
        String tAssignmentTitle = request.getParameter("testTitle");
        //分类
        Integer testChapterType = Util.isEmpty(request.getParameter("testChapterType")) ? null : Integer.valueOf(request.getParameter("testChapterType"));
        //章节ID
        Integer testWkChapterId = Util.isEmpty(request.getParameter("testWkChapterId")) ? null : Integer.valueOf(request.getParameter("testWkChapterId"));
        //课时ID
        Integer testWkLessonId = Util.isEmpty(request.getParameter("testWkLessonId")) ? null : Integer.valueOf(request.getParameter("testWkLessonId"));
        //学院
        String schoolAcademy = Util.isEmpty(request.getParameter("schoolAcademy")) ? null : request.getParameter("schoolAcademy");
        //班级
//        String classes = Util.isEmpty(request.getParameter("schoolClass")) ? tAssignmentService.findAllClassByAcademyIdStr(request.getParameter("schoolAcademy")) : request.getParameter("schoolClass");
//        String[] schoolClasses = classes.split(",");
        String[] schoolClasses = Util.isEmpty(request.getParameter("schoolClass")) ? tAssignmentService.findAllClassByAcademyId(request.getParameter("schoolAcademy")) : request.getParameterValues("schoolClass");
        //是否为补考
        String isMakeUpExam = Util.isEmpty(request.getParameter("isMakeUpExam")) ? null : request.getParameter("isMakeUpExam");
        //补考原考试id
        Integer oldAssignmentId = Util.isEmpty(request.getParameter("oldAssignmentId")) ? null : Integer.valueOf(request.getParameter("oldAssignmentId"));
        //开始时间
        String date = request.getParameter("duedateTest");

        Date startdateTest = Util.isEmpty(request.getParameter("startdateTest")) ? null : Util.parseToDate(request.getParameter("startdateTest"));
        //结束时间
        Date duedateTest = Util.isEmpty(request.getParameter("duedateTest")) ? null : Util.parseToDate(request.getParameter("duedateTest"));
        String username = currUsername;
        //考试分值
        Double testScoreTest = Util.isEmpty(request.getParameter("testScoreTest")) ? null : Double.valueOf(request.getParameter("testScoreTest"));
        //及格分值
        Double passingScore = Util.isEmpty(request.getParameter("passingScore")) ? null : Double.valueOf(request.getParameter("passingScore"));
        //考试时间
        Integer mins = Util.isEmpty(request.getParameter("mins")) ? null : Integer.valueOf(request.getParameter("mins"));
        //提交次数(编辑时保存次数)
        Integer timelimitOneTest = request.getParameter("customTime").equals("自定义") ? Integer.valueOf(request.getParameter("customTime1")) : 1;
        //合格有效天数(编辑时保存次数)
        Integer effectiveDays = request.getParameter("effectiveDays").equals("设置") ? Integer.valueOf(request.getParameter("effectiveDays1")) : 0;
        //将考试添加到成绩簿
        String toGradebook = request.getParameter("checknameTest");
        //将成绩公布给学生
        String gradeToStudent = request.getParameter("checkname1Test");
        //将成绩计入总成绩
        String gradeToTotalGrade = request.getParameter("checkname2Test");
        //是否显示答题详情
        String answerToStudent = request.getParameter("checkname3Test");
        //题目来源
        String testFrom = request.getParameter("testFrom");
        //是否做答
        Integer needSubmit = Util.isEmpty(request.getParameter("testNeedSubmit")) ? null : Integer.valueOf(request.getParameter("testNeedSubmit"));
        //考试描述
        String content = request.getParameter("contentTest");
        String evaluation = request.getParameter("evaluation");
        String keyword = request.getParameter("keyword");
        String conclusion = request.getParameter("conclusion");
        //考试类型
        String type = request.getParameter("type");
        //考试状态
        Integer status = Util.isEmpty(request.getParameter("status")) ? null : Integer.valueOf(request.getParameter("status"));
        //考试创建时间
        Date createdTime = new Date();
        //考试创建人
        String createdBy = currUsername;
        //folderId
        Integer folderId = Util.isEmpty(request.getParameter("testWkFolderId")) ? null : Integer.valueOf(request.getParameter("testWkFolderId"));
        //TAssignmentControlId
        Integer tAssignmentControlId = Util.isEmpty(request.getParameter("testControlId")) ? null : Integer.valueOf(request.getParameter("testControlId"));
        //TAssignmentAnswerAssignId
        Integer tAssignmentAnswerAssignId = Util.isEmpty(request.getParameter("testAnswerAssignId")) ? null : Integer.valueOf(request.getParameter("testAnswerAssignId"));
        //sectionName 题目来源于题库
        String[] sectionNames = request.getParameterValues("sectionName");
        //questionIdTest 题目来源于题库
        String[] questionIds = request.getParameterValues("questionIdTest");
        //itemTypeTest 题目来源于题库
        String[] itemTypes = request.getParameterValues("itemTypeTest");
        //itemQuantityTest 题目来源于题库
        String[] itemQuantitys = request.getParameterValues("itemQuantityTest");
        //itemScoreTest 题目来源于题库
        String[] itemScores = request.getParameterValues("itemScoreTest");
        //examQuestionpool 题目来源于试卷库
        String examQuestionpool = request.getParameter("examQuestionpool");
        //先判断是否是来自预约的考试
        String testNeedSubScribe = request.getParameter("testNeedSubScribe");
        // 如果有填空题，则得到填空题的个数
        String[] gapsNumbers = request.getParameterValues("gapsNumbers");
        Integer subScribeExamId = -1;
        //set参数到Vo对象
        EditTestVo editTestVo = new EditTestVo();
        editTestVo.settAssignmentId(tAssignmentId);
        editTestVo.settAssignmentTitle(tAssignmentTitle);
        editTestVo.setTestChapterType(testChapterType);
        editTestVo.setTestWkChapterId(testWkChapterId);
        editTestVo.setTestWkLessonId(testWkLessonId);
        editTestVo.setStartdateTest(startdateTest);
        editTestVo.setDuedateTest(duedateTest);
        editTestVo.setUsername(username);
        editTestVo.setTestScoreTest(testScoreTest);
        editTestVo.setPassingScore(passingScore);
        editTestVo.setMins(mins);
        editTestVo.setTimelimitOneTest(timelimitOneTest);
        editTestVo.setToGradebook(toGradebook);
        editTestVo.setGradeToStudent(gradeToStudent);
        editTestVo.setGradeToTotalGrade(gradeToTotalGrade);
        editTestVo.setAnswerToStudent(answerToStudent);
        editTestVo.setTestFrom(testFrom);
        editTestVo.setNeedSubmit(needSubmit);
        editTestVo.setContent(content);
        editTestVo.setType(type);
        editTestVo.setSchoolAcademy(schoolAcademy);
        editTestVo.setOldAssignmentId(oldAssignmentId);
        editTestVo.setIsMakeUpExam(isMakeUpExam);
        editTestVo.setSiteId(siteId);
        editTestVo.setStatus(status);
        editTestVo.setCreatedTime(createdTime);
        editTestVo.setCreatedBy(createdBy);
        editTestVo.setFolderId(folderId);
        editTestVo.settAssignmentControlId(tAssignmentControlId);
        editTestVo.settAssignmentAnswerAssignId(tAssignmentAnswerAssignId);
        editTestVo.setSectionNames(sectionNames);
        editTestVo.setQuestionIds(questionIds);
        editTestVo.setItemTypes(itemTypes);
        editTestVo.setItemQuantitys(itemQuantitys);
        editTestVo.setItemScores(itemScores);
        editTestVo.setExamQuestionpoolId(Util.isEmpty(examQuestionpool) ? null : Integer.valueOf(examQuestionpool));
        editTestVo.setSubScribeExamId(subScribeExamId);
        editTestVo.setGapsNumbers(gapsNumbers);
        editTestVo.setEffectiveDays(effectiveDays);
        editTestVo.setEvaluation(evaluation);
        editTestVo.setKeyword(keyword);
        editTestVo.setConclusion(conclusion);
        //保存考试方法
        Integer newTAssignmentId = tAssignmentService.saveTest(editTestVo, currUsername, siteId, projectName);
        //保存数据到考试班级关系表
        if ("0".equals(isMakeUpExam) && schoolAcademy!=null && !schoolAcademy.contains("*000")) {
            if(schoolAcademy.contains(",")){
                List<SchoolClass> classList = new ArrayList<>();
                String[] split = schoolAcademy.split(",");
                for (String s : split) {
                    classList.addAll(schoolClassesJPA.findAllClassesByAcademyNumber(s));
                }
                String[] classIds = new String[classList.size()];
                for (int i=0;i<classList.size();i++){
                    classIds[i] = classList.get(i).getClassNumber();
                }
                tAssignmentService.saveTAssignmentClass(newTAssignmentId, classIds);
            }else{
                tAssignmentService.saveTAssignmentClass(newTAssignmentId, schoolClasses);
            }
        }
        //        根据考试创建成绩册
        tAssignmentService.createGradebook(siteId, newTAssignmentId, testChapterType, testWkChapterId);
        map.put("status", editTestVo.getStatus());
        map.put("projectTitle", projectTitle);
        map.put("projectName", projectName);
        return "true";
    }

    /**************************************************************************
     * Description 考试模块-编辑考试
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping("/editExam")
    public String editExam(HttpServletRequest request, Map<String, Object> map, Integer cid, Integer moduleType, Integer assignmentId) throws Exception {
        //获取登录用户信息
        UserVo user = getCurrUser();
        map.put("user", user);
        if (cid != null) {
            map.put("cid", cid);
            //如果有传入tCourseSiteId则用传入id
            request.getSession().setAttribute("cid", cid.intValue());
            List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite("");
            request.getSession().setAttribute("siteList", allTCourseSite);
            map.put("allTCourseSite", allTCourseSite);
        }
        List<EditExamTAssignmentComponentVo> editExamTAssignmentComponentVoList = tAssignmentService.findTAssCompVoList(assignmentId);
        map.put("tAssignment", editExamTAssignmentComponentVoList);
        //获取当前考试

        EditTestVo editTestVo = tAssignmentService.findEditTestVoById(assignmentId, projectName);
        ;
        map.put("editTestVo", editTestVo);
        map.put("projectTitle", projectTitle);
        //获取课程网站信息
        //获取站点
        Object cidO = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cidO.toString());
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(tCourseSiteId);
        map.put("tCourseSiteId", tCourseSiteId);
        map.put("tCourseSiteVo", tCourseSiteVo);
        map.put("today", new Date());
        map.put("projectName", projectName);
        if (projectName.equals("proteach")) {
            //获取wkChapters
            List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTCourseSiteIdAndModuleType(tCourseSiteId, editTestVo.getTestChapterType());
            map.put("wkChapters", wkChapterDtoList);
        }
        //获取学院（只显示有可以考试的班级的学院）
//        List<SchoolAcademyVo> schoolAcademyVoList1 = wkChapterService.findAllAcademys();
        List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllExamAcademys();
        map.put("schoolAcademyVoList", schoolAcademyVoList);
        //获取可以补考的考试（所有已发布并过时的）
        List<ExamListVo> makeUpExamList = examListService.findMakeUpExamList(tCourseSiteId);
        map.put("makeUpExamList", makeUpExamList);
        //设置知识技能体验
//      Integer moduleType = 1;//暂时写死
        map.put("moduleType", moduleType);
        //selectId
        map.put("selectId", -1);
        //获取以发布的预约考试
        List<ExamSubScribeVo> subScribeExamList = examSubScribeService.getSubScribeExamList(user);
        map.put("subScribeExamList", subScribeExamList);
//        //存放题库的信息
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        //获取所有试卷库分类
        List<QuestionpoolCategoryVo> questionpoolCategoryVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpoolCategory();
        map.put("questionpoolCategory", questionpoolCategoryVoList);
        //获取所有试卷库
        List<ExamQuestionpoolVo> examQuestionpoolVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpool();
        map.put("examQuestionpool", examQuestionpoolVoList);
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        //根据学院获取班级
        List<SchoolClassesVo> schoolClassesVoList = wkChapterService.findAllClassesByAcademyNumber(editTestVo.getSchoolAcademy());
        map.put("schoolClasses", schoolClassesVoList);
        map.put("assignmentId", assignmentId);
        return "views/editExam";
    }

    /**************************************************************************
     * Description 考试模块-获取某一考试测试
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping("/getOneTAssignmentApi")
    @ResponseBody
    public EditTestVo getOneTAssignmentApi(Integer assignmentId) {
        return tAssignmentService.findEditTestVoById(assignmentId, projectName);
    }

    /**************************************************************************
     * Description 考试模块-修改编辑考试，根据试卷库分类查找试卷库
     *
     * @author 张佳鸣
     * @date 2018-01-09
     **************************************************************************/
    @RequestMapping("/findExamQuestionpool")
    public @ResponseBody
    Map<Integer, String> findExamQuestionpool(@RequestParam Integer category) {
        Map map = new HashMap();
        List<ExamQuestionpoolVo> examQuestionpoolVoList = tAssignmentExamQuestionpoolService.findExamQuestpoolWithcategory(category);
        //循环遍历查找到的试卷库并给map赋值
        for (ExamQuestionpoolVo examQuestionpoolVo : examQuestionpoolVoList) {
            int examQuestionpoolId = examQuestionpoolVo.getExamQuestionpoolId();
            String examQuestionpoolTitle = examQuestionpoolVo.getTitle();
            Double Score = examQuestionpoolVo.getScore();
            map.put(examQuestionpoolId, examQuestionpoolTitle + "(试卷总分:" + Score + ")");
        }
        return map;
    }

    /**************************************************************************
     * Description 考试模块-查看考试
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping("/examDetail")
    public String examDetail(Map<String, Object> map, Integer assignmentId) {
        map.put("assignmentId", assignmentId);
        return "views/examDetail";
    }

    /**************************************************************************
     * Description 考试模块-获取某一考试测试选中的题库信息
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping("/findTAssCompVoListApi")
    @ResponseBody
    public List<EditExamTAssignmentComponentVo> findTAssCompVoListApi(Integer assignmentId) {
        List<EditExamTAssignmentComponentVo> editExamTAssignmentComponentVoList = tAssignmentService.findTAssCompVoList(assignmentId);
        return editExamTAssignmentComponentVoList;
    }

    /**************************************************************************
     * Description 考试模块-查看考试成绩
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping("/examScore")
    public String examScore(HttpServletRequest request, Map<String, Object> map, Integer assignmentId, String title) {
        List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite("");
        request.getSession().setAttribute("siteList", allTCourseSite);
        map.put("allTCourseSite", allTCourseSite);
        map.put("assignmentId", assignmentId);
        map.put("title", title);
        map.put("uploadFileHost", uploadFileHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        EditTestVo editTestVo = tAssignmentService.findEditTestVoById(assignmentId, projectName);
        map.put("editTestVo", editTestVo);
        return "views/examScore";
    }

    /**************************************************************************
     * Description 考试模块-查看考试成绩api
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping(value = "/examScoreApi", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<List<LayuiDataVo>> examScore(Integer assignmentId, Integer page, Integer limit, String search,String authorityName,Integer siteId,String username) {
        //学生成绩集合
        List<LayuiDataVo> examGradingList = examGradingService.findExamGradingList(assignmentId, authorityName, page, limit, projectName, search,username);
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(siteId);
        if (!tCourseSiteVo.getTitle().equals("全校考试")) {
            Iterator<LayuiDataVo> it = examGradingList.iterator();
            while (it.hasNext()) {
                LayuiDataVo x = it.next();
                boolean fla = shareService.findTCourseSitesBySiteIdAndUsername(siteId, x.getUsername());
                if (!fla) {
                    it.remove();
                }
            }
        }
        return CommonResult.success(examGradingList, examGradingService.countExamGradingList(assignmentId, username, authorityName, search));
    }

    /**************************************************************************
     * Description 考试模块-查看未参加考试人员
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping("/noExamScore")
    public String noExamScore(HttpServletRequest request, Map<String, Object> map, Integer assignmentId) {
        List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite("");
        request.getSession().setAttribute("siteList", allTCourseSite);
        map.put("allTCourseSite", allTCourseSite);
        map.put("assignmentId", assignmentId);
        return "views/noExamScore";
    }

    /**************************************************************************
     * Description 考试模块-查看未参加考试人员api
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping("/noExamScoreApi")
    @ResponseBody
    public CommonResult<List<LayuiDataVo>> noExamScoreApi(Integer assignmentId, Integer page, Integer limit, String search, Integer cid) {
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(cid);
        if (tCourseSiteVo.getTitle().equals("全校考试")) {
            return CommonResult.success(examGradingService.findNotTakeExamListAllSchool(assignmentId, page, limit, search), examGradingService.countNotTakeExamListAllSchool(assignmentId, search));
        }else{
            return CommonResult.success(examGradingService.findNotTakeExamList(assignmentId, page, limit, search,cid), examGradingService.countNotTakeExamList(assignmentId, search,cid));
        }
    }

    /**************************************************************************
     * Description 导出成绩单
     *
     * @author 洪春莹
     * @date 2018年12月19日
     **************************************************************************/
    @ResponseBody
    @RequestMapping("/exportGradeList")
    public void exportGradeList(HttpServletRequest request, Map<String, Object> map, HttpServletResponse response, Integer examId) throws IOException {
        //根据考试id获取考试名称
        String examTitle = tAssignmentService.findTAssignmentById(examId);
        //获取题库标题
        String title = examTitle + "成绩单.xls";
        title = title.replaceAll("\\/", "_");
        response.setContentType("multipart/form-data;charset=UTF-8");// 设置response内容的类型
        response.setHeader("Content-disposition", "attachment;filename=" + URLEncoder.encode(title, "UTF-8"));// 设置头部信息
        byte[] bytes = examGradingService.exportGradeList(examId);
        ServletOutputStream outputStream = response.getOutputStream();
        outputStream.write(bytes);
        outputStream.close();
    }

    /**************************************************************************
     * Description 考试模块-删除考试
     *
     * @author 张佳鸣
     * @date 2017年12月15日
     **************************************************************************/
    @RequestMapping("/deleteExamApi")
    @ResponseBody
    public String deleteExam(@RequestParam Integer tAssignmentId) {
        //删除考试文件夹wkFolder及相关的考试tAssignment数据
        tAssignmentService.deleteExam(tAssignmentId);
        return "true";
    }

    /**************************************************************************
     * Description 考试模块-查看答题详情
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping("/examScoreDetail")
    public String examScoreDetail(HttpServletRequest request, Map<String, Object> map, Integer assignmentId, String username, Integer gradingId, String cname) {
        TAssignmentsVO tAssignmentsVO = examDetailService.findExamById(assignmentId, username, gradingId);
        map.put("tAssignmentsVO", tAssignmentsVO);
        map.put("assignmentId", assignmentId);
        map.put("username", username);
        map.put("cname", cname);
        map.put("gradingId", gradingId);
        return "views/examScoreDetail";
    }

    /**************************************************************************
     * Description 考试模块-查看答题详情-获取原考试信息
     *
     * @author fubowen
     * @date 2021-8-5
     **************************************************************************/
    @RequestMapping("/findTAssignmentDetail")
    @ResponseBody
    public TAssignmentsVO findTAssignmentDetail(@RequestParam Integer assignmentId,@RequestParam String username,@RequestParam Integer gradingId) {
        return examDetailService.findExamById(assignmentId, username, gradingId);
    }

    /**************************************************************************
     * Description 考试模块-查看答题详情api
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping("/findTestDetailApi")
    @ResponseBody
    public CommonResult<List<ExamDetailsVO>> findTestDetailApi(Integer assignmentId, String username, Integer gradingId, Integer page, Integer limit, Integer dictionary, String search) {
        //dictionary：1客观题，2主观题,0整合不区分主客观
        List<ExamDetailsVO> examDetailsVOList = examDetailService.findTestDetail(assignmentId, username, gradingId, page, limit, dictionary, search);
        return CommonResult.success(examDetailsVOList, examDetailService.countTestamDetail(assignmentId, gradingId, username, dictionary, search));
    }

    /**************************************************************************
     * Description 考试模块-查看答题详情api
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping("/findTestDetailMappingApi")
    @ResponseBody
    public List<Map> findTestDetailMappingApi(Integer assignmentId, String username) {
        List<Map> tAssignmentItemMapping = examDetailService.findTestDetailMapping(assignmentId, username);
        return tAssignmentItemMapping;
    }

    /**************************************************************************
     * Description:生成考试/测试二维码（小程序用）
     *
     * @author：洪春莹
     * @date ：2019年5月21日
     **************************************************************************/
    @RequestMapping("/examQRCode")
    @ResponseBody
    public String examQRCode(String examId) {
        //通过考试/测试id生成二维码
        String result = tAssignmentService.encodeByExamId(examId);
        tAssignmentService.saveExamQRcode(examId, result);
        return result;
    }

    /**************************************************************************
     * Description 考试模块-考试须知
     *
     * @author lixueteng
     * @date 2017年8月27日
     **************************************************************************/
    @RequestMapping("/startExamRoute")
    public String startExam(HttpServletRequest request, Map<String, Object> map, Integer assignmentId) {
        EditTestVo editTestVo = tAssignmentService.findEditTestVoById(assignmentId, projectName);
        map.put("editTestVo", editTestVo);
        return "views/startExam";
    }

    /**************************************************************************
     * Description 考试模块-开始考试
     *
     * @author lixueteng
     * @date 2017年8月27日
     **************************************************************************/
    @RequestMapping("/startExam")
    public String startExam(HttpServletRequest request, @RequestParam int examId, Integer simulation,
                            Map<String, Object> map, String fromTeach) {
        UserVo user = this.getCurrUser();
        //创建考卷
        Integer examPaperId = examDetailService.createExamPaper(examId, user.getUsername());
        // 将下面方法放到上面方法会导致报错，目前怀疑dubbo的问题，没有查出具体原因
        examPaperId = examDetailService.createRandomExam(examPaperId, examId, user.getUsername());
        return "redirect:/views/beginExam?examId=" + examPaperId + "&simulation=" + simulation + "&page=1&fromTeach=" + fromTeach;
    }

    /**************************************************************************
     * Description 考试模块-开始考试(创建考试副本)
     *
     * @author fubowen
     * @date 2021-8-5
     **************************************************************************/
    @RequestMapping("/newExamPaper")
    @ResponseBody
    public Integer startExam(@RequestParam Integer examId,@RequestParam String username) {
        //创建考卷
        Integer examPaperId = examDetailService.createExamPaper(examId, username);
        // 将下面方法放到上面方法会导致报错，目前怀疑dubbo的问题，没有查出具体原因
        examPaperId = examDetailService.createRandomExam(examPaperId, examId, username);
        return examPaperId;
    }

    /**************************************************************************
     * Description 考试模块-判断当前登录人的考试还有多少剩余次数
     *
     * @author 李雪腾
     * @date 2017年11月2日
     **************************************************************************/
    @RequestMapping("/isExamCanAnswer")
    @ResponseBody
    public boolean isExamCanAnswer(@RequestParam Integer examId,@RequestParam String username) {
        return examDetailService.getExamIsCanAnswer(examId, username);
    }

    /**************************************************************************
     * Description 考试模块-开始考试
     *
     * @author lixueteng
     * @date 2017年8月27日
     **************************************************************************/
    @RequestMapping("/beginExam")
    public String beginExam(HttpServletRequest request, @RequestParam int examId, Integer simulation,
                            Integer page, Map<String, Object> map, String fromTeach) {
        UserVo user = this.getCurrUser();
        ExamDetailVo examDetailVo = examDetailService.getExamDetail(examId, user.getUsername(), page, 5);
        //判断当前是否提交过
        if (examDetailVo.getStatus() == 1) {
            return "redirect:/exam/exam";
        }
        map.put("currPage", page);
        map.put("examId", examId);
        map.put("simulation", simulation);
        map.put("examDetailVo", examDetailVo);

        Map<String, Integer> pageModel = examDetailVo.getPageModel();
        //获取总的题目的数量
        map.put("totalRecords", pageModel.get("totalRecords"));
        //获取学生答题记录
        Integer parentExamId = examDetailService.findParentExamByExamId(examId);
        List<Map> tAssignmentItemMapping = examGradingService.getTAssignmentItemMapping(parentExamId, user);
        map.put("recordMap", tAssignmentItemMapping.get(0));
        map.put("itemTextMap", tAssignmentItemMapping.get(1));
        //展示所有题目的下标
        //获取一共多少页
        int totalRecords = pageModel.get("totalRecords");
        int totalPage = pageModel.get("totalPage");
        int pageSize = pageModel.get("pageSize");
        List<List<Integer>> itemIndexList = new ArrayList<>();
        List<Integer> itemIds = examDetailVo.getItemIds();
        int index = 0;
        for (int i = 0; i < totalPage; i++) {
            Integer endIndex = index + pageSize;
            if (endIndex > itemIds.size()) {
                endIndex = itemIds.size();
            }
            itemIndexList.add(itemIds.subList(index, endIndex));
            index += pageSize;
        }
        map.put("itemIndexList", itemIndexList);
        // 后台分页select框
        int[] pageArray = new int[pageModel.get("totalPage")];//n为长度
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        map.put("pageArray", pageArray);
        map.put("pageSize", pageSize);
        map.put("fromTeach", fromTeach);
        map.put("projectTitle", projectTitle);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("currentUsername", this.getCurrUser().getUsername());
        map.put("currentUserCname", this.getCurrUser().getCname());
        return "views/beginExam";
    }

    @ResponseBody
    @RequestMapping("/saveTAssignmentItemMappingRedis")
    public String saveTAssignmentItemMappingRedis(HttpServletRequest request, String username, Integer cid, Integer assignmentId, Integer submitTime, Integer simulation) {
        UserVo userVo = shareService.getUserByUsername(username);
        // 获取考试成绩
        Map<String, String[]> answerMap = new HashMap<>();
        List<Integer> itemIds = examDetailService.findTAssignmentItemIds(assignmentId);
        for (Integer id : itemIds) {
            String[] answers = request.getParameterValues("answers" + id);//学生答案
            String[] answertexts = request.getParameterValues("answertexts" + id);//问题题干
            answerMap.put("answers" + id, answers);
            answerMap.put("answertexts" + id, answertexts);
        }
        long time1 = System.currentTimeMillis();
        Integer grading = examDetailService.insertTAssignmentGrading(assignmentId, submitTime, userVo);
        long time2 = System.currentTimeMillis();
        BigDecimal totalScore = examDetailService.saveTAssignmentItemMappingRedis(answerMap, assignmentId, submitTime, userVo, grading);
        long time3 = System.currentTimeMillis();
        String transcriptResult = examDetailService.saveExamRedis(totalScore, assignmentId, submitTime, simulation, cid, userVo, grading);
        long time4 = System.currentTimeMillis();

        System.out.println("examDetailService.insertTAssignmentGrading------>" + (time2 - time1));
        System.out.println("examDetailService.saveTAssignmentItemMappingRedis------>" + (time3 - time2));
        System.out.println("examDetailService.saveExamRedis------>" + (time4 - time3));

        return this.showExamResult(assignmentId, userVo,transcriptResult);
    }

    /**************************************************************************
     * Description 考试模块-保存考试记录
     *
     * @author lixueteng
     * @date 2017-09-18
     **************************************************************************/
    @ResponseBody
    @RequestMapping("/saveTAssignmentItemMapping")
    public String saveTAssignmentItemMapping(HttpServletRequest request) {
        UserVo userVo = this.getCurrUser();
        Integer cid = Integer.parseInt(request.getSession().getAttribute("cid").toString());
        Integer assignmentId = Integer.valueOf(request.getParameter("assignmentId"));
        Integer submitTime = Integer.valueOf(request.getParameter("submitTime"));
        Integer simulation = Integer.valueOf(request.getParameter("simulation"));
        //获取考试成绩
        Map<String, String[]> answerMap = new HashMap<>();
        List<Integer> itemIds = examDetailService.findTAssignmentItemIds(assignmentId);
        for (Integer id : itemIds) {
            String[] answers = request.getParameterValues("answers" + id);
            String[] answertexts = request.getParameterValues("answertexts" + id);
            answerMap.put("answers" + id, answers);
            answerMap.put("answertexts" + id, answertexts);
        }
        long time1 = System.currentTimeMillis();
        Integer grading = examDetailService.insertTAssignmentGrading(assignmentId, submitTime, userVo);
        long time2 = System.currentTimeMillis();
        BigDecimal totalScore = examDetailService.saveTAssignmentItemMapping(answerMap, assignmentId, submitTime, userVo, grading);
        long time3 = System.currentTimeMillis();
        Authorization authorization = AuthorizationUtil.getAuthorization(getCurrUser().getUsername());
        String transcriptResult = examDetailService.saveExam(totalScore, assignmentId, submitTime, simulation, cid, userVo, grading);
        long time4 = System.currentTimeMillis();

        System.out.println("examDetailService.insertTAssignmentGrading------>" + (time2 - time1));
        System.out.println("examDetailService.saveTAssignmentItemMapping------>" + (time3 - time2));
        System.out.println("examDetailService.saveExam------>" + (time4 - time3));

        return this.showExamResult(assignmentId, userVo,transcriptResult);
    }

    private String showExamResult(Integer assignmentId, UserVo userVo, String transcriptResult) {
        Integer parentExamId = examDetailService.findParentExamByExamId(assignmentId);
        ExamResultVo examResult;
        if (parentExamId != null) {
            examResult = examDetailService.getExamResult(parentExamId, userVo);
        } else {
            examResult = examDetailService.getExamResult(assignmentId, userVo);
        }
        if (examResult.getTotalSubmitTime() == 0) {
            return "此次考试：" + examResult.getTitle() + "\n您所得分：" + examResult.getScore() + "分\n此考试不限制提交次数\n"+transcriptResult+"分";
        } else {
            return "此次考试：" + examResult.getTitle() + "\n您所得分：" + examResult.getScore() + "分\n还剩" + examResult.getRemainSubmitTime() + "次机会\n"+transcriptResult+"分";
        }
    }

    /**************************************************************************
     * Description 考试模块-查看补考名单
     *
     * @author 洪春莹
     * @date 2018-12-14
     **************************************************************************/
    @RequestMapping("/makeupExamList")
    public String makeupExamStudentList(HttpServletRequest request, Map<String, Object> map, Integer assignmentId) {
        map.put("assignmentId", assignmentId);
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        return "views/makeupExamList";
    }

    /**************************************************************************
     * Description 考试模块-查看补考名单
     *
     * @author 洪春莹
     * @date 2018-12-14
     **************************************************************************/
    @RequestMapping("/makeupExamListApi")
    @ResponseBody
    public CommonResult<List<TAssignmentGradingVO>> makeupExamListApi(Integer assignmentId, Integer page, Integer limit,Integer siteId) {
        //获取补考名单
        List<TAssignmentGradingVO> tAssignmentGradingVOList = examListService.makeupExamStudentList(assignmentId,siteId);
        Integer totalRecords = tAssignmentGradingVOList.size();
        //分页
        if (page * limit <= totalRecords) {
            tAssignmentGradingVOList = tAssignmentGradingVOList.subList(limit * (page - 1), limit * page);
        } else {
            tAssignmentGradingVOList = tAssignmentGradingVOList.subList(limit * (page - 1), totalRecords);
        }
        return CommonResult.success(tAssignmentGradingVOList, totalRecords);
    }

    /**************************************************************************
     * Description 考试模块-测试列表api
     *
     * @author 黄浩
     * @date 2020年7月30日
     **************************************************************************/
    @RequestMapping(value = "/testListApi",method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<List<TestInfoVO>> testListApi(HttpServletRequest request, Integer id, String search, Integer page, Integer limit, Integer dateType, Integer dictionary,String curruser) throws Exception {
        dateType = (dateType == null ? 0 : dateType);
        //dictionary：1 参数id为课程id;2 参数id为章节id;3 参数id为小节id
        dictionary = (dictionary == null ? 1 : dictionary);
        if (dictionary == 1) {
            request.getSession().setAttribute("cid", id);
        }
        //获取当前登录人的权限
        Object authority = request.getSession().getAttribute("AUTHORITYNAME");
        String authorityName = "TEACHER";
        if (authority != null) {
            authorityName = authority.toString();
        }
        Date date = new Date();
        List<TestInfoVO> allTest = testInfoService.findAllTest(shareService.getUserByUsername(curruser), authorityName, id, dictionary);
        //未开始：1，进行中：2，已结束：3
        switch (dateType) {
            case 1:
                allTest = allTest.stream().filter(d -> d.getStartDate().getTime() > date.getTime()).collect(Collectors.toList());
                break;
            case 2:
                allTest = allTest.stream().filter(d -> d.getStartDate().getTime() < date.getTime() && d.getEndTime().getTime() > date.getTime()).collect(Collectors.toList());
                break;
            case 3:
                allTest = allTest.stream().filter(d -> d.getEndTime().getTime() < date.getTime()).collect(Collectors.toList());
                break;
            default:
                allTest = allTest;
        }
        Integer totalRecords = allTest.size();
        //分页
        if (page * limit <= totalRecords) {
            allTest = allTest.subList(limit * (page - 1), limit * page);
        } else {
            allTest = allTest.subList(limit * (page - 1), totalRecords);
        }
        return CommonResult.success(allTest, totalRecords);
    }

    /**************************************************************************
     * Description 考试模块-考试题目api
     *
     * @author 黄浩
     * @date 2020年7月30日
     **************************************************************************/
    @RequestMapping("/examItemsApi")
    @ResponseBody
    public ExamDetailVo examItemsApi(Integer assignmentId, String username, Integer page, Integer limit) {
        //创建考卷
        Integer examPaperId = examDetailService.createExamPaper(assignmentId, username);
        // 将下面方法放到上面方法会导致报错，目前怀疑dubbo的问题，没有查出具体原因
        examPaperId = examDetailService.createRandomExam(examPaperId, assignmentId, username);
        ExamDetailVo examDetailVo = examDetailService.getExamDetail(examPaperId, username, page, limit);
        return examDetailVo;
    }

    /**************************************************************************
     * Description 考试模块-测试题目api
     *
     * @author 黄浩
     * @date 2020年7月30日
     **************************************************************************/
    @RequestMapping("/testItemsApi")
    @ResponseBody
    public TestDetailVo testItemsApi(Integer assignmentId, String username, Integer page, Integer limit) {
        //获取测验的相关信息
        TestDetailVo examDetail = testInfoService.getExamDetail(assignmentId, username, page, limit);
        return examDetail;
    }

    /**************************************************************************
     * Description 考试模块-查看手动打分简答题详情
     *
     * @author 黄浩
     * @date 2020年9月25日
     **************************************************************************/
    @RequestMapping("/examGradeDetail")
    public String examGradeDetail(HttpServletRequest request, Map<String, Object> map, Integer assignmentId, String username, Integer gradingId, String type) {
        TAssignmentsVO tAssignmentsVO = examDetailService.findExamById(assignmentId, username, gradingId);
        map.put("tAssignmentsVO", tAssignmentsVO);
        map.put("assignmentId", assignmentId);
        map.put("username", username);
        map.put("gradingId", gradingId);
        map.put("type", type);
        return "views/examGradeDetail";
    }

    /**************************************************************************
     * Description 考试模块-查看答题详情api
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping("/examGradeDetailApi")
    @ResponseBody
    public CommonResult<List<ExamDetailsVO>> examGradeDetailApi(Integer assignmentId, String username, Integer page, Integer limit) {
        List<ExamDetailsVO> examDetailsVOList = examDetailService.findExamGradeItems(assignmentId, username, page, limit);
        return CommonResult.success(examDetailsVOList, examDetailService.countExamGradeItems(assignmentId, username));
    }

    /**************************************************************************
     * Description 考试模块-简答题手动打分
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping(value = "/gradeExam", method = RequestMethod.POST)
    @ResponseBody
    public boolean gradeExam(@RequestParam(required = true) Integer itemId, @RequestParam(required = true) Integer gradingId, @RequestParam(required = true) Double score) {
        return examDetailService.gradeItem(itemId, gradingId, score);
    }

    /**************************************************************************
     * Description 考试模块-更新成绩册
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping(value = "/updateTranscript", method = RequestMethod.POST)
    @ResponseBody
    public boolean updateTranscript(@RequestParam Integer gradingId) {
        return gradeBookService.updateTranscript(gradingId);
    }

    /**************************************************************************
     * Description 证书设置
     *
     * @author 洪春莹
     * @date 2019年3月14日
     **************************************************************************/
    @RequestMapping("/certificateDetail")
    public String certificateDetail(HttpServletRequest request, Map<String, Object> map) {
        map.put("projectName", projectName);
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        //获取证书信息
        SchoolVo schoolVo = examListService.findSchoolByProjectName(projectName);
        map.put("schoolVo", schoolVo);
        map.put("uploadFileHost", uploadFileHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "views/setCertificate";
    }

    /**************************************************************************
     * Description 编辑证书信息
     *
     * @author 洪春莹
     * @date 2019年3月14日
     **************************************************************************/
    @RequestMapping("/editSetCertificate")
    public String editCertificate(HttpServletRequest request, Map<String, Object> map, String projectName) {
        //获取证书信息
        UserVo userVo = examListService.findUserByUserName(getCurrUser().getUsername());
        map.put("userName", userVo.getUsername());
        SchoolVo schoolVo = examListService.findSchoolByProjectName(projectName);
        map.put("schoolVo", schoolVo);
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        map.put("uploadFileHost", uploadFileHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "views/editSetCertificate";
    }

    /**************************************************************************
     * Description 证书设置--保存学校公章图片
     *
     * @author 洪春莹
     * @date 2019年3月18日
     **************************************************************************/
    @RequestMapping("/saveSchoolPhoto")
    @ResponseBody
    public boolean saveSchoolPhoto(String fileid) {
        //获取证书信息
        SchoolVo schoolVo = examListService.findSchoolByProjectName(projectName);
        examListService.saveSchoolPhoto(schoolVo, fileid);
        return true;
    }

    /**************************************************************************
     * Description 保存证书信息
     *
     * @author 洪春莹
     * @date 2019年3月14日
     **************************************************************************/
    @RequestMapping("/saveCertificate")
    @ResponseBody
    public boolean saveCertificate(@ModelAttribute SchoolVo schoolVo) {
        examListService.saveCertificate(schoolVo, projectName);
        return true;
    }

    /**************************************************************************
     *Description 证书设置-图片删除
     * @author 洪春莹
     * @date 2019年3月19日
     * **************************************************************************/
    @RequestMapping("/deleteSchoolPhoto")
    @ResponseBody
    public boolean deleteSchoolPhoto(String projectName) {
        examListService.deleteSchoolImg(projectName);
        return true;
    }

    /**************************************************************************
     * Description 根据题库动态获取填空题空的个数以及对应的题数
     *
     * @author 李涵
     * @date 2019年01月24日
     **************************************************************************/
    @RequestMapping("/findGapsNumberByQuestionpool")
    @ResponseBody
    public List<GapsNumberVo> findGapsNumberByQuestionpool(Integer questionpoolId) {
        return wkChapterService.findGapsNumberByQuestionpool(questionpoolId);
    }

    /**************************************************************************
     * Description 查看学生答题详情json
     *
     * @author 黄浩
     * @date 2018年12月28日
     **************************************************************************/
    @RequestMapping("/apiStudentTestDetails")
    @ResponseBody
    public String apiStudentTestDetails(Integer examId, String username) {
//        List<Map> tAssignmentItemMapping = examDetailService.findTestDetailMapping(examId, username);
        String tAssignmentItemMapping = examDetailService.findTestDetailMappingJson(examId, username);
        return tAssignmentItemMapping;
    }

    /**************************************************************************
     * Description 查看考试题目json
     *
     * @author 黄浩
     * @date 2018年12月28日
     **************************************************************************/
    @RequestMapping(value = "/apiTestDetails", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public List<ExamDetailsVO> apiTestDetails(Integer examId, String username, Integer currpage) {
        Integer pageSize = 10;
        //当前页
        if (currpage == null) {
            currpage = 1;
        }
        //由于目前不使用写死成0
        List<ExamDetailsVO> examDetailsVOList = examDetailService.findTestDetail(examId, username, 0, currpage, pageSize, 1, null);
        return examDetailsVOList;
    }

    /**************************************************************************
     * Description:作业-保存成绩图片
     * @throws IOException
     *
     * @author：裴继超
     * @date ：2017-3-20
     **************************************************************************/
    @RequestMapping("/saveMarkingImage")
    @ResponseBody
    public String saveMarkingImage(@RequestParam String imageString, Integer gradingId,
                                   Integer page, HttpServletRequest request) {
        String result = examDetailService.saveMarkingImage(pdfDirector, gradingId, page, imageString);

        return result;
    }

    /**************************************************************************
     * Description 获取课程复制课程
     *
     * @author 黄浩
     * @date 2020年10月21日
     **************************************************************************/
    @RequestMapping("/sameSite")
    public String sameSite(HttpServletRequest request, Map<String, Object> map, Integer assignmentId, String type) {
        Object cid0 = request.getSession().getAttribute("cid");
        Integer cid = Integer.valueOf(cid0.toString());
        List<TCourseSiteVo> list = testInfoService.findCopySite(cid, assignmentId);
        map.put("siteList", list);
        map.put("count", list.size());
        map.put("assignmentId", assignmentId);
        map.put("type", type);
        return "views/sameSite";
    }

    /**************************************************************************
     * Description 考试模块-复制考试题目
     *
     * @author 黄浩
     * @date 2020年10月22日
     **************************************************************************/
    @RequestMapping("/copyExamApi")
    @ResponseBody
    public boolean copyExamApi(Integer sourceExamId, Integer targetSiteId) {
        CopyExamDTO copyExamDTO = tAssignmentService.getExamDetail(sourceExamId);
        return tAssignmentService.copyExam(sourceExamId, targetSiteId, copyExamDTO);
    }

    /**************************************************************************
     * Description 准考证数据
     *
     * @author 黄浩
     * @date 2020年10月22日
     **************************************************************************/
    @RequestMapping(value = "/admissionData", method = RequestMethod.GET)
    @ResponseBody
    public AdmissionVo admissionData(String username, String datasource, Integer cid) {
        AdmissionVo admissionVo = examListService.admission(username, cid, apiGateWayHost, datasource);
        return admissionVo;
    }

    /**************************************************************************
     * Description 准考证数据列表
     *
     * @author 黄浩
     * @date 2020年10月22日
     **************************************************************************/
    @RequestMapping(value = "/admissionList", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult<List<AdmissionVo>> admissionList(HttpServletRequest request, Integer cid, String authorityName, Integer page, Integer limit, String search, String datasource,String username) {
        String student = null;
        if (authorityName.equals("STUDENT")) {
            student = username;
        }
        request.getSession().setAttribute("cid", cid);
        List<AdmissionVo> list = examListService.admissionList(cid, search, apiGateWayHost, student, datasource);
        Integer totalRecords = list.size();
        //分页
        if (page != null && limit != null) {
            if (page * limit <= totalRecords) {
                list = list.subList(limit * (page - 1), limit * page);
            } else {
                list = list.subList(limit * (page - 1), totalRecords);
            }
        }
        return CommonResult.success(list, totalRecords);
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
            if (!un.equals("anonymousUser")) {
                userVo = shareService.getUserByUsername(un);
            }
        }
        return userVo;
    }

    /**************************************************************************
     * Description 考试准入
     *
     * @author 丁豪然
     * @date 2020年11月3日
     **************************************************************************/
    @RequestMapping("/examAccess")
    public String getExamAccess(HttpServletRequest request, Map<String, Object> map, Integer cid) {
        //外部公众号直接进入判断数据源
        Object d = request.getSession().getAttribute("datasource");
        if (d != null) {
            map.put("datasource", d);
        } else {
            map.put("datasource", "");
        }
        //站点id
        if (cid == null) {
            Object cid0 = request.getSession().getAttribute("cid");
            cid = Integer.valueOf(cid0.toString());
        } else {
            request.getSession().setAttribute("cid", cid);
        }
        map.put("siteId", cid);
        List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite("");
        request.getSession().setAttribute("siteList", allTCourseSite);
        map.put("allTCourseSite", allTCourseSite);
        map.put("oauth2Host", oauth2Host);
        UserVo userVo = this.getCurrUser();
        request.getSession().setAttribute("currentUsername", userVo.getUsername());
        request.getSession().setAttribute("currentUserCname", userVo.getCname());
        request.getSession().setAttribute("resourceContainerHostresourceContainerHost", resourceContainerHost);
        request.getSession().setAttribute("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("questionUrl", questionPoolHost);
        boolean fla = shareService.findTCourseSitesBySiteIdAndUsername(cid, getCurrUser().getUsername());
        map.put("fla", fla);
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(cid);
        map.put("cTitle", tCourseSiteVo.getTitle());
        map.put("projectName", projectName);
        //获取当前登录人的权限
        try {
            String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
            map.put("authorityName", authorityName);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("authorityName", null);
        }
        map.put("teachHost", teachHost);
        return "views/examAccess";
    }

    /**************************************************************************
     * Description 考试模块-考试列表api
     *
     * @author 黄浩
     * @date 2020年7月30日
     **************************************************************************/
    @RequestMapping(value = "/totalListApi", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<List<ExamListVo>> totalListApi(String type, String username, String search, Integer page, Integer limit,Integer siteId) throws Exception {
        List<ExamListVo> examListDtos = examListService.studentExams(username, type, search, page, limit,siteId);
        Integer totalRecords = examListService.countStudentExams(username, type, search);
        return CommonResult.success(examListDtos, totalRecords);
    }

    @ResponseBody
    @RequestMapping("/saveTAssignmentItemMappingRedisApi")
    public String saveTAssignmentItemMappingRedis(@RequestBody SubmitItemDTO submitItemDTO) {
        UserVo userVo = new UserVo();
        userVo.setUsername(submitItemDTO.getUsername());
        userVo.setCname(submitItemDTO.getCname());
        Integer cid = submitItemDTO.getCid();
        Integer assignmentId = submitItemDTO.getAssignmentId();
        Integer submitTime = submitItemDTO.getSubmitTime();
        Integer simulation = submitItemDTO.getSimulation();

        long time1 = System.currentTimeMillis();
        Integer grading = examDetailService.insertTAssignmentGrading(assignmentId, submitTime, userVo);
        long time2 = System.currentTimeMillis();
        BigDecimal totalScore = examDetailService.saveTAssignmentItemMappingRedis(submitItemDTO.getItems(), assignmentId, submitTime, userVo, grading);
        long time3 = System.currentTimeMillis();
        String transcriptResult = examDetailService.saveExamRedis(totalScore, assignmentId, submitTime, simulation, cid, userVo, grading);
        long time4 = System.currentTimeMillis();

        System.out.println("examDetailService.insertTAssignmentGrading------>" + (time2 - time1));
        System.out.println("examDetailService.saveTAssignmentItemMappingRedis------>" + (time3 - time2));
        System.out.println("examDetailService.saveExamRedis------>" + (time4 - time3));

        return this.showExamResult(assignmentId, userVo,transcriptResult);
    }

    @ResponseBody
    @RequestMapping(value = "/isPassApi", method = RequestMethod.POST)
    public boolean isPassApi(String username) {
        return examGradingService.isPass(username);
    }

    /**************************************************************************
     * Description 保存机构报告上传(type:401)、专家报告上传接口(type:402)
     *
     * @author 黄浩
     * @date 2020年12月28日
     **************************************************************************/
    @RequestMapping("/saveReportsApi")
    @ResponseBody
    public boolean saveReportsApi(Integer gradingId, String fileName, Long fileId, Integer type,String username) {
        return examGradingService.saveReport(gradingId, fileName, fileId.toString(), type, username);
    }

    /**************************************************************************
     * Description 获取保存机构报告资源容器id(type:401)、专家报告资源容器id(type:402)
     *
     * @author 黄浩
     * @date 2020年12月28日
     **************************************************************************/
    @RequestMapping("/getReportIdApi")
    @ResponseBody
    public Long getReportIdApi(Integer gradingId, Integer type) {
        return examGradingService.getReportId(gradingId, type);
    }

    /**************************************************************************
     * Description 以word格式导出标准报告
     *
     * @author 黄浩
     * @date 2021年1月5日
     **************************************************************************/
    @RequestMapping(value = "/exportExamReportAsWord",method = RequestMethod.POST)
    public void exportTeachOutlineAsWord(HttpServletRequest request, HttpServletResponse response, String imageString, Integer assignmentId, Integer gradingId,String username) throws Exception {
        UserVo userVo = getCurrUser();
        TAssignmentsVO tAssignmentsVO = examDetailService.findExamById(assignmentId, username, gradingId);
        Map<String, Object> data = new HashMap<>();
        String[] evaArr = {};
        if(tAssignmentsVO.getEvaluation()!=null){
            evaArr = tAssignmentsVO.getEvaluation().split("\r");
        }
        String evaluation = "";
        String[] conArr = {};
        if(tAssignmentsVO.getConclusion()!=null){
            conArr = tAssignmentsVO.getConclusion().split("\r");
        }
        String conclusion = "";
        for (String eva : evaArr) {
            evaluation += eva + "<w:br/>";
        }
        evaluation = evaluation.replaceAll("\n", "    ");
        for (String con : conArr) {
            conclusion += con + "<w:br/>";
        }
        conclusion = conclusion.replaceAll("\n", "");
        //获取题目
        List<TestSectionVO> examDetailsVOList = examDetailService.findTestDetail(assignmentId, username, gradingId);
        List<ExamDetailsVO> examDetailsVOS = new ArrayList<>();
        Integer correctCount = 0;
        for (TestSectionVO testSectionVO : examDetailsVOList) {
            examDetailsVOS.addAll(testSectionVO.getItems());
            correctCount += testSectionVO.getCorrectCount();
        }
        //成绩序号
        int sort = examGradingService.sortScore(assignmentId, username);
        //图片base64码
        imageString = imageString.replaceAll(" ", "+");
        String radarMap = imageString.split(",")[1];
        data.put("title", tAssignmentsVO.getTitle());
        data.put("submitTime", tAssignmentsVO.getCommitDate());
        data.put("evaluation", evaluation);
        data.put("keyword", tAssignmentsVO.getKeyword()==null?"":tAssignmentsVO.getKeyword());
        data.put("conclusion", conclusion);
        data.put("sectionList", examDetailsVOList);
        for (ExamDetailsVO examDetailsVO : examDetailsVOS) {
            if(examDetailsVO.getScore()==null){
                examDetailsVO.setScore(0.00);
            }
        }
        data.put("examDetailList", examDetailsVOS);
        data.put("stuScore", tAssignmentsVO.getStuScore());
        data.put("sort", sort);
        data.put("correctCount", correctCount);
        data.put("radarMap", radarMap);
        //导出word
        WordHandler handler = new WordHandler();
        File outFile = handler.createDoc("/ftl", "report.ftl", data, "标准报告");
        FileInputStream in = new FileInputStream(outFile);
        OutputStream o = response.getOutputStream();
        byte b[] = new byte[1024];
        response.setContentType("application/x-doc");
        response.setHeader("Content-disposition", "attachment; filename=" + URLEncoder.encode("标准报告" + ".doc", "UTF-8"));// 指定下载的文件名
        response.setHeader("Content_Length", String.valueOf(outFile.length()));       // download the file.
        int n = 0;
        while ((n = in.read(b)) != -1) {
            o.write(b, 0, n);
        }
        o.flush();
        o.close();
        in.close();
    }

    /**************************************************************************
     * Description 获取报告雷达图数据
     *
     * @author 黄浩
     * @date 2021年1月5日
     **************************************************************************/
    @RequestMapping("/radarMapData")
    @ResponseBody
    public List<TestSectionVO> radarMapData(Integer assignmentId, Integer gradingId,String username) {
        long start = System.currentTimeMillis();
        List<TestSectionVO> examDetailsVOList = examDetailService.radarMapData(assignmentId, username, gradingId);
        long end = System.currentTimeMillis();
        System.out.println("运行时间:" + (end - start) / 1000);
        return examDetailsVOList;
    }
    /**************************************************************************
     * Description 考试模块-查看考试成绩api
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping(value = "/commitGrade", method = RequestMethod.POST)
    @ResponseBody
    public String commitGrade(Integer assignmentId, String type,Integer siteId,String username) {
        List<LayuiDataVo> examGradingList = new ArrayList<>();
        //学生成绩集合
        if (type.equals("exam")) {
            examGradingList = examGradingService.findExamGradingList(assignmentId, "teacher", 1, 200, projectName, null,username);
        } else {
            examGradingList = examGradingService.findTestGradingList(assignmentId, "teacher",null, 1,100,null);
        }
        gradeBookService.commitGrade(siteId,assignmentId,apiGateWayHost,examGradingList);
        return "更新完毕";
    }
    /**************************************************************************
     * Description 获取课程中的学生
     *
     * @author 黄浩
     * @date 2021年1月18日
     **************************************************************************/
    @RequestMapping("/siteStudentApi")
    @ResponseBody
    public CommonResult<List<LayuiDataVo>> siteStudentApi(@RequestParam Integer page, @RequestParam Integer limit, String search,@RequestParam Integer examId,@RequestParam Integer siteId) {
        TCourseSite tCourseSite = tCourseSiteJPA.findById(siteId).get();
        List<LayuiDataVo> layuiDataVo = new ArrayList<>();
        if(tCourseSite.getTitle().equals("全校考试")){
            layuiDataVo = shareService.findSiteStudentAllSchool(page,limit,search,examId);
            return CommonResult.success(layuiDataVo, shareService.countSiteStudent(siteId, search));
        }else{
            layuiDataVo = shareService.findNotPassStudents(siteId,page,limit,search,examId);
            return CommonResult.success(layuiDataVo, shareService.countNotPassStudents(siteId, search,examId));
        }
    }
    /**************************************************************************
     * Description 设置学生免考
     *
     * @author 黄浩
     * @date 2021年1月18日
     **************************************************************************/
    @RequestMapping("/examFreeApi")
    @ResponseBody
    public void examFreeApi(Integer examId,String[] students,String username) {
        examGradingService.examFree(examId,students,username);
    }
    /**************************************************************************
     * Description 学生免考名单页面
     *
     * @author 黄浩
     * @date 2021年1月18日
     **************************************************************************/
    @RequestMapping("/exemption")
    public String getExemption(HttpServletRequest request, Map<String, Object> map, Integer examId) {
        map.put("examId", examId);
        return "views/exemption";
    }
}
