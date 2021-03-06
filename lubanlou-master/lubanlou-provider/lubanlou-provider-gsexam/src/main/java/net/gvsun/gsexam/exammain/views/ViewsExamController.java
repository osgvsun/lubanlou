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
     * Description ????????????
     *
     * @author ?????????
     * @date 2019???3???11???
     **************************************************************************/
    @RequestMapping("/personalInfo")
    public String listMyInfo(HttpServletRequest request, Map<String, Object> map) {
        //??????????????????
        UserVo userInfoVO = examListService.findUserByUserName(this.getCurrUser().getUsername());
        map.put("userInfo", userInfoVO);
        map.put("userName", userInfoVO.getUsername());
        //??????????????????????????????
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
     * Description ??????????????????
     *
     * @author ?????????
     * @date 2019???3???12???
     **************************************************************************/
    @RequestMapping("/editpersonalinfo")
    public String editMyInfo(HttpServletRequest request, Map<String, Object> map, Integer flag) {
        //??????????????????
        UserVo userVo = examListService.findUserByUserName(getCurrUser().getUsername());
        map.put("userVo", userVo);
        map.put("userName", userVo.getUsername());
        //????????????
        List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllAcademys();
        map.put("schoolAcademyVoList", schoolAcademyVoList);
        map.put("uploadFileHost", uploadFileHost);
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        map.put("flag", flag);
        return "views/editpersonalinfo";
    }

    /**************************************************************************
     * Description ??????????????????
     *
     * @author ?????????
     * @date 2019???3???12???
     **************************************************************************/
    @RequestMapping("/saveMyInfo")
    public String saveMyInfo(@ModelAttribute UserVo userVo) {
        examListService.saveUserInfo(userVo);
        return "true";
    }

    /**************************************************************************
     * Description ????????????--??????????????????
     *
     * @author ??????
     * @date 2018???3???27???
     **************************************************************************/
    @RequestMapping("/saveMyInfoPhoto")
    public String saveMyInfoPhoto(String fileid) {
        //??????????????????
        UserVo userVo = examListService.findUserByUserName(getCurrUser().getUsername());
        examListService.saveMyInfoPhoto(userVo, fileid);
        return "true";
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ??????
     * @date 2020???7???30???
     **************************************************************************/
    @RequestMapping("/mainindex")
    public String mainindex(HttpServletRequest request, Map<String, Object> map, Integer cid, String pathType, String d) throws Exception {

        //??????????????????
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
        //??????????????????????????????
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
     * Description ????????????-??????????????????
     *
     * @author ??????
     * @date 2020???7???30???
     **************************************************************************/
    @RequestMapping("/examList")
    public String examList(HttpServletRequest request, Map<String, Object> map, Integer cid) {
        System.out.println("????????????:" + System.currentTimeMillis());
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
     * ??????????????????????????????
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
     * Description ????????????-????????????api
     *
     * @author ??????
     * @date 2020???7???30???
     **************************************************************************/
    @RequestMapping(value = "/examListApi", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<List<ExamListVo>> examListApi(HttpServletRequest request, Integer id, Integer page, Integer limit, Integer dateType, Integer dictionary, @RequestParam String student,String authorityName) {
        //dictionary???1 ??????id?????????id;2 ??????id?????????id;3 ??????id?????????id
        UserVo userVo = shareService.getUserByUsername(student);
        dictionary = (dictionary == null ? 1 : dictionary);
        if (dictionary == 1) {
            request.getSession().setAttribute("cid", id);
        }
        dateType = (dateType == null ? 0 : dateType);
        Date date = new Date();
        List<ExamListVo> examListDtos = examListService.findExamList(id, userVo, authorityName, "exam", dictionary);
        //????????????1???????????????2???????????????3
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
        //??????
        if (page * limit <= totalRecords) {
            examListDtos = examListDtos.subList(limit * (page - 1), limit * page);
        } else {
            examListDtos = examListDtos.subList(limit * (page - 1), totalRecords);
        }
        System.out.println("????????????:" + System.currentTimeMillis());
        return CommonResult.success(examListDtos, totalRecords);
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ??????
     * @date 2020???7???31???
     **************************************************************************/
    @RequestMapping("/newExam")
    public String newExam(HttpServletRequest request, Map<String, Object> map, Integer cid, Integer moduleType) throws Exception {
        //????????????????????????
        UserVo user = getCurrUser();
        map.put("user", user);
        if (cid != null) {
            map.put("cid", cid);
            //???????????????tCourseSiteId????????????id
            request.getSession().setAttribute("cid", cid.intValue());
            List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite("");
            request.getSession().setAttribute("siteList", allTCourseSite);
            map.put("allTCourseSite", allTCourseSite);
        }
        //????????????????????????VO??????
        EditTestVo editTestVo = new EditTestVo();
        map.put("editTestVo", editTestVo);
        map.put("projectTitle", projectTitle);
        //????????????????????????
        //????????????
        Object cidO = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cidO.toString());
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(tCourseSiteId);
        map.put("tCourseSiteId", tCourseSiteId);
        map.put("tCourseSiteVo", tCourseSiteVo);
        map.put("today", new Date());
        map.put("projectName", projectName);
        if (projectName.equals("proteach")) {
            //??????wkChapters
            List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTCourseSiteIdAndModuleType(tCourseSiteId, moduleType);
            map.put("wkChapters", wkChapterDtoList);
        }
        //????????????????????????????????????????????????????????????
//        List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllAcademys();
        List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllExamAcademys();
        map.put("schoolAcademyVoList", schoolAcademyVoList);
        //????????????????????????????????????????????????????????????
        List<ExamListVo> makeUpExamList = examListService.findMakeUpExamList(tCourseSiteId);
        map.put("makeUpExamList", makeUpExamList);
        //????????????????????????
//      Integer moduleType = 1;//????????????
        map.put("moduleType", moduleType);
        //selectId
        map.put("selectId", -1);
        //??????????????????????????????
        List<ExamSubScribeVo> subScribeExamList = examSubScribeService.getSubScribeExamList(user);
        map.put("subScribeExamList", subScribeExamList);
//        //?????????????????????
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        //???????????????????????????
        List<QuestionpoolCategoryVo> questionpoolCategoryVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpoolCategory();
        map.put("questionpoolCategory", questionpoolCategoryVoList);
        //?????????????????????
        List<ExamQuestionpoolVo> examQuestionpoolVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpool();
        map.put("examQuestionpool", examQuestionpoolVoList);
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        return "views/newExam";
    }

    /**************************************************************************
     * @Description: ??????????????????-ajax??????type????????????
     * @Author: ??????
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
     * @Description: ??????????????????-ajax??????type????????????
     * @Author: ??????
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
     * Description ????????????-??????????????????-??????????????????????????????
     *
     * @author ?????????
     * @date 2018-12-05
     **************************************************************************/
    @RequestMapping("/findAllClasses")
    @ResponseBody
    public List<SchoolClassesVo> findAllClasses(HttpServletRequest request, Map<String, Object> map, String schoolAcademy) throws Exception {
        map.put("projectTitle", projectTitle);
        //????????????????????????
        List<SchoolClassesVo> schoolClassesVoList = wkChapterService.findAllClassesByAcademyNumber(schoolAcademy);
        return schoolClassesVoList;
    }

    /**************************************************************************
     * Description ????????????-??????????????????-????????????
     *
     * @author ??????
     * @date 2020???8???3???
     **************************************************************************/
    @RequestMapping("/addExamQuestionBank")
    public String addExamQuestionBank(HttpServletRequest request, Map<String, Object> map) {
        Object cid = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cid.toString());
        TCourseSiteVo tCourseSiteVo = shareService.findTCourseSiteBySiteId(tCourseSiteId);
        map.put("coursename", tCourseSiteVo.getTitle());
        //?????????????????????
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        //????????????????????????
        List<QuestionpoolCategoryVo> qcvoList = tAssignmentQuestionPoolService.getAllQuestionPoolCategory();
        map.put("questionpoolCategory", qcvoList);
        return "views/addExamQuestionBank";
    }

    /**************************************************************************
     * Description ????????????-???????????????????????????
     *
     * @author fubowen
     * @date 2020-12-17
     **************************************************************************/
    @RequestMapping("/updateQuestionPool")
    @ResponseBody
    public List<TAssignmentQuestpoolVo> updateQuestionPool(Integer cid,Integer selectType, Integer categoryId, Integer questionType) {
        //?????????????????????
        Integer type = -1;
        if (selectType != null) {
            type = selectType;
        }
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.updateQuestionPool(cid, type, 0, categoryId, questionType);
        return tAssignmentQuestionpool;
    }

    /**************************************************************************
     * @Description: ?????????????????????????????????????????????????????????????????????
     * @Author: ??????
     * @Date: 2017/10/9 22:59
     **************************************************************************/
    @ResponseBody
    @RequestMapping("/question/checkTestItemCount")
    public String checkTestItemCount(Integer questionpoolId, Integer quantity, String type, Integer gapsNumber) {
        return tAssignmentQuestionPoolService.checkTestItemCount(questionpoolId, quantity, Integer.parseInt(type), gapsNumber);
    }

    /**************************************************************************
     * @Description: ????????????
     * @Author: ??????
     * @Date: 2017/10/5 14:19
     **************************************************************************/
    @RequestMapping("/saveExam")
    @ResponseBody
    public String saveExam(HttpServletRequest request, Map<String, Object> map,Integer siteId, String currUsername) {
        //?????????????????????????????????
        //??????ID
        Integer tAssignmentId = Util.isEmpty(request.getParameter("testId")) ? null : Integer.valueOf(request.getParameter("testId"));
        //????????????
        String tAssignmentTitle = request.getParameter("testTitle");
        //??????
        Integer testChapterType = Util.isEmpty(request.getParameter("testChapterType")) ? null : Integer.valueOf(request.getParameter("testChapterType"));
        //??????ID
        Integer testWkChapterId = Util.isEmpty(request.getParameter("testWkChapterId")) ? null : Integer.valueOf(request.getParameter("testWkChapterId"));
        //??????ID
        Integer testWkLessonId = Util.isEmpty(request.getParameter("testWkLessonId")) ? null : Integer.valueOf(request.getParameter("testWkLessonId"));
        //??????
        String schoolAcademy = Util.isEmpty(request.getParameter("schoolAcademy")) ? null : request.getParameter("schoolAcademy");
        //??????
//        String classes = Util.isEmpty(request.getParameter("schoolClass")) ? tAssignmentService.findAllClassByAcademyIdStr(request.getParameter("schoolAcademy")) : request.getParameter("schoolClass");
//        String[] schoolClasses = classes.split(",");
        String[] schoolClasses = Util.isEmpty(request.getParameter("schoolClass")) ? tAssignmentService.findAllClassByAcademyId(request.getParameter("schoolAcademy")) : request.getParameterValues("schoolClass");
        //???????????????
        String isMakeUpExam = Util.isEmpty(request.getParameter("isMakeUpExam")) ? null : request.getParameter("isMakeUpExam");
        //???????????????id
        Integer oldAssignmentId = Util.isEmpty(request.getParameter("oldAssignmentId")) ? null : Integer.valueOf(request.getParameter("oldAssignmentId"));
        //????????????
        String date = request.getParameter("duedateTest");

        Date startdateTest = Util.isEmpty(request.getParameter("startdateTest")) ? null : Util.parseToDate(request.getParameter("startdateTest"));
        //????????????
        Date duedateTest = Util.isEmpty(request.getParameter("duedateTest")) ? null : Util.parseToDate(request.getParameter("duedateTest"));
        String username = currUsername;
        //????????????
        Double testScoreTest = Util.isEmpty(request.getParameter("testScoreTest")) ? null : Double.valueOf(request.getParameter("testScoreTest"));
        //????????????
        Double passingScore = Util.isEmpty(request.getParameter("passingScore")) ? null : Double.valueOf(request.getParameter("passingScore"));
        //????????????
        Integer mins = Util.isEmpty(request.getParameter("mins")) ? null : Integer.valueOf(request.getParameter("mins"));
        //????????????(?????????????????????)
        Integer timelimitOneTest = request.getParameter("customTime").equals("?????????") ? Integer.valueOf(request.getParameter("customTime1")) : 1;
        //??????????????????(?????????????????????)
        Integer effectiveDays = request.getParameter("effectiveDays").equals("??????") ? Integer.valueOf(request.getParameter("effectiveDays1")) : 0;
        //???????????????????????????
        String toGradebook = request.getParameter("checknameTest");
        //????????????????????????
        String gradeToStudent = request.getParameter("checkname1Test");
        //????????????????????????
        String gradeToTotalGrade = request.getParameter("checkname2Test");
        //????????????????????????
        String answerToStudent = request.getParameter("checkname3Test");
        //????????????
        String testFrom = request.getParameter("testFrom");
        //????????????
        Integer needSubmit = Util.isEmpty(request.getParameter("testNeedSubmit")) ? null : Integer.valueOf(request.getParameter("testNeedSubmit"));
        //????????????
        String content = request.getParameter("contentTest");
        String evaluation = request.getParameter("evaluation");
        String keyword = request.getParameter("keyword");
        String conclusion = request.getParameter("conclusion");
        //????????????
        String type = request.getParameter("type");
        //????????????
        Integer status = Util.isEmpty(request.getParameter("status")) ? null : Integer.valueOf(request.getParameter("status"));
        //??????????????????
        Date createdTime = new Date();
        //???????????????
        String createdBy = currUsername;
        //folderId
        Integer folderId = Util.isEmpty(request.getParameter("testWkFolderId")) ? null : Integer.valueOf(request.getParameter("testWkFolderId"));
        //TAssignmentControlId
        Integer tAssignmentControlId = Util.isEmpty(request.getParameter("testControlId")) ? null : Integer.valueOf(request.getParameter("testControlId"));
        //TAssignmentAnswerAssignId
        Integer tAssignmentAnswerAssignId = Util.isEmpty(request.getParameter("testAnswerAssignId")) ? null : Integer.valueOf(request.getParameter("testAnswerAssignId"));
        //sectionName ?????????????????????
        String[] sectionNames = request.getParameterValues("sectionName");
        //questionIdTest ?????????????????????
        String[] questionIds = request.getParameterValues("questionIdTest");
        //itemTypeTest ?????????????????????
        String[] itemTypes = request.getParameterValues("itemTypeTest");
        //itemQuantityTest ?????????????????????
        String[] itemQuantitys = request.getParameterValues("itemQuantityTest");
        //itemScoreTest ?????????????????????
        String[] itemScores = request.getParameterValues("itemScoreTest");
        //examQuestionpool ????????????????????????
        String examQuestionpool = request.getParameter("examQuestionpool");
        //???????????????????????????????????????
        String testNeedSubScribe = request.getParameter("testNeedSubScribe");
        // ????????????????????????????????????????????????
        String[] gapsNumbers = request.getParameterValues("gapsNumbers");
        Integer subScribeExamId = -1;
        //set?????????Vo??????
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
        //??????????????????
        Integer newTAssignmentId = tAssignmentService.saveTest(editTestVo, currUsername, siteId, projectName);
        //????????????????????????????????????
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
        //        ???????????????????????????
        tAssignmentService.createGradebook(siteId, newTAssignmentId, testChapterType, testWkChapterId);
        map.put("status", editTestVo.getStatus());
        map.put("projectTitle", projectTitle);
        map.put("projectName", projectName);
        return "true";
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ??????
     * @date 2020???7???31???
     **************************************************************************/
    @RequestMapping("/editExam")
    public String editExam(HttpServletRequest request, Map<String, Object> map, Integer cid, Integer moduleType, Integer assignmentId) throws Exception {
        //????????????????????????
        UserVo user = getCurrUser();
        map.put("user", user);
        if (cid != null) {
            map.put("cid", cid);
            //???????????????tCourseSiteId????????????id
            request.getSession().setAttribute("cid", cid.intValue());
            List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite("");
            request.getSession().setAttribute("siteList", allTCourseSite);
            map.put("allTCourseSite", allTCourseSite);
        }
        List<EditExamTAssignmentComponentVo> editExamTAssignmentComponentVoList = tAssignmentService.findTAssCompVoList(assignmentId);
        map.put("tAssignment", editExamTAssignmentComponentVoList);
        //??????????????????

        EditTestVo editTestVo = tAssignmentService.findEditTestVoById(assignmentId, projectName);
        ;
        map.put("editTestVo", editTestVo);
        map.put("projectTitle", projectTitle);
        //????????????????????????
        //????????????
        Object cidO = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cidO.toString());
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(tCourseSiteId);
        map.put("tCourseSiteId", tCourseSiteId);
        map.put("tCourseSiteVo", tCourseSiteVo);
        map.put("today", new Date());
        map.put("projectName", projectName);
        if (projectName.equals("proteach")) {
            //??????wkChapters
            List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTCourseSiteIdAndModuleType(tCourseSiteId, editTestVo.getTestChapterType());
            map.put("wkChapters", wkChapterDtoList);
        }
        //????????????????????????????????????????????????????????????
//        List<SchoolAcademyVo> schoolAcademyVoList1 = wkChapterService.findAllAcademys();
        List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllExamAcademys();
        map.put("schoolAcademyVoList", schoolAcademyVoList);
        //????????????????????????????????????????????????????????????
        List<ExamListVo> makeUpExamList = examListService.findMakeUpExamList(tCourseSiteId);
        map.put("makeUpExamList", makeUpExamList);
        //????????????????????????
//      Integer moduleType = 1;//????????????
        map.put("moduleType", moduleType);
        //selectId
        map.put("selectId", -1);
        //??????????????????????????????
        List<ExamSubScribeVo> subScribeExamList = examSubScribeService.getSubScribeExamList(user);
        map.put("subScribeExamList", subScribeExamList);
//        //?????????????????????
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        //???????????????????????????
        List<QuestionpoolCategoryVo> questionpoolCategoryVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpoolCategory();
        map.put("questionpoolCategory", questionpoolCategoryVoList);
        //?????????????????????
        List<ExamQuestionpoolVo> examQuestionpoolVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpool();
        map.put("examQuestionpool", examQuestionpoolVoList);
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        //????????????????????????
        List<SchoolClassesVo> schoolClassesVoList = wkChapterService.findAllClassesByAcademyNumber(editTestVo.getSchoolAcademy());
        map.put("schoolClasses", schoolClassesVoList);
        map.put("assignmentId", assignmentId);
        return "views/editExam";
    }

    /**************************************************************************
     * Description ????????????-????????????????????????
     *
     * @author ??????
     * @date 2020???7???31???
     **************************************************************************/
    @RequestMapping("/getOneTAssignmentApi")
    @ResponseBody
    public EditTestVo getOneTAssignmentApi(Integer assignmentId) {
        return tAssignmentService.findEditTestVoById(assignmentId, projectName);
    }

    /**************************************************************************
     * Description ????????????-?????????????????????????????????????????????????????????
     *
     * @author ?????????
     * @date 2018-01-09
     **************************************************************************/
    @RequestMapping("/findExamQuestionpool")
    public @ResponseBody
    Map<Integer, String> findExamQuestionpool(@RequestParam Integer category) {
        Map map = new HashMap();
        List<ExamQuestionpoolVo> examQuestionpoolVoList = tAssignmentExamQuestionpoolService.findExamQuestpoolWithcategory(category);
        //???????????????????????????????????????map??????
        for (ExamQuestionpoolVo examQuestionpoolVo : examQuestionpoolVoList) {
            int examQuestionpoolId = examQuestionpoolVo.getExamQuestionpoolId();
            String examQuestionpoolTitle = examQuestionpoolVo.getTitle();
            Double Score = examQuestionpoolVo.getScore();
            map.put(examQuestionpoolId, examQuestionpoolTitle + "(????????????:" + Score + ")");
        }
        return map;
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ??????
     * @date 2020???7???31???
     **************************************************************************/
    @RequestMapping("/examDetail")
    public String examDetail(Map<String, Object> map, Integer assignmentId) {
        map.put("assignmentId", assignmentId);
        return "views/examDetail";
    }

    /**************************************************************************
     * Description ????????????-?????????????????????????????????????????????
     *
     * @author ??????
     * @date 2020???7???31???
     **************************************************************************/
    @RequestMapping("/findTAssCompVoListApi")
    @ResponseBody
    public List<EditExamTAssignmentComponentVo> findTAssCompVoListApi(Integer assignmentId) {
        List<EditExamTAssignmentComponentVo> editExamTAssignmentComponentVoList = tAssignmentService.findTAssCompVoList(assignmentId);
        return editExamTAssignmentComponentVoList;
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ??????
     * @date 2020???7???31???
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
     * Description ????????????-??????????????????api
     *
     * @author ??????
     * @date 2020???7???31???
     **************************************************************************/
    @RequestMapping(value = "/examScoreApi", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<List<LayuiDataVo>> examScore(Integer assignmentId, Integer page, Integer limit, String search,String authorityName,Integer siteId,String username) {
        //??????????????????
        List<LayuiDataVo> examGradingList = examGradingService.findExamGradingList(assignmentId, authorityName, page, limit, projectName, search,username);
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(siteId);
        if (!tCourseSiteVo.getTitle().equals("????????????")) {
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
     * Description ????????????-???????????????????????????
     *
     * @author ??????
     * @date 2020???7???31???
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
     * Description ????????????-???????????????????????????api
     *
     * @author ??????
     * @date 2020???7???31???
     **************************************************************************/
    @RequestMapping("/noExamScoreApi")
    @ResponseBody
    public CommonResult<List<LayuiDataVo>> noExamScoreApi(Integer assignmentId, Integer page, Integer limit, String search, Integer cid) {
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(cid);
        if (tCourseSiteVo.getTitle().equals("????????????")) {
            return CommonResult.success(examGradingService.findNotTakeExamListAllSchool(assignmentId, page, limit, search), examGradingService.countNotTakeExamListAllSchool(assignmentId, search));
        }else{
            return CommonResult.success(examGradingService.findNotTakeExamList(assignmentId, page, limit, search,cid), examGradingService.countNotTakeExamList(assignmentId, search,cid));
        }
    }

    /**************************************************************************
     * Description ???????????????
     *
     * @author ?????????
     * @date 2018???12???19???
     **************************************************************************/
    @ResponseBody
    @RequestMapping("/exportGradeList")
    public void exportGradeList(HttpServletRequest request, Map<String, Object> map, HttpServletResponse response, Integer examId) throws IOException {
        //????????????id??????????????????
        String examTitle = tAssignmentService.findTAssignmentById(examId);
        //??????????????????
        String title = examTitle + "?????????.xls";
        title = title.replaceAll("\\/", "_");
        response.setContentType("multipart/form-data;charset=UTF-8");// ??????response???????????????
        response.setHeader("Content-disposition", "attachment;filename=" + URLEncoder.encode(title, "UTF-8"));// ??????????????????
        byte[] bytes = examGradingService.exportGradeList(examId);
        ServletOutputStream outputStream = response.getOutputStream();
        outputStream.write(bytes);
        outputStream.close();
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ?????????
     * @date 2017???12???15???
     **************************************************************************/
    @RequestMapping("/deleteExamApi")
    @ResponseBody
    public String deleteExam(@RequestParam Integer tAssignmentId) {
        //?????????????????????wkFolder??????????????????tAssignment??????
        tAssignmentService.deleteExam(tAssignmentId);
        return "true";
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ??????
     * @date 2020???7???31???
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
     * Description ????????????-??????????????????-?????????????????????
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
     * Description ????????????-??????????????????api
     *
     * @author ??????
     * @date 2020???7???31???
     **************************************************************************/
    @RequestMapping("/findTestDetailApi")
    @ResponseBody
    public CommonResult<List<ExamDetailsVO>> findTestDetailApi(Integer assignmentId, String username, Integer gradingId, Integer page, Integer limit, Integer dictionary, String search) {
        //dictionary???1????????????2?????????,0????????????????????????
        List<ExamDetailsVO> examDetailsVOList = examDetailService.findTestDetail(assignmentId, username, gradingId, page, limit, dictionary, search);
        return CommonResult.success(examDetailsVOList, examDetailService.countTestamDetail(assignmentId, gradingId, username, dictionary, search));
    }

    /**************************************************************************
     * Description ????????????-??????????????????api
     *
     * @author ??????
     * @date 2020???7???31???
     **************************************************************************/
    @RequestMapping("/findTestDetailMappingApi")
    @ResponseBody
    public List<Map> findTestDetailMappingApi(Integer assignmentId, String username) {
        List<Map> tAssignmentItemMapping = examDetailService.findTestDetailMapping(assignmentId, username);
        return tAssignmentItemMapping;
    }

    /**************************************************************************
     * Description:????????????/?????????????????????????????????
     *
     * @author????????????
     * @date ???2019???5???21???
     **************************************************************************/
    @RequestMapping("/examQRCode")
    @ResponseBody
    public String examQRCode(String examId) {
        //????????????/??????id???????????????
        String result = tAssignmentService.encodeByExamId(examId);
        tAssignmentService.saveExamQRcode(examId, result);
        return result;
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author lixueteng
     * @date 2017???8???27???
     **************************************************************************/
    @RequestMapping("/startExamRoute")
    public String startExam(HttpServletRequest request, Map<String, Object> map, Integer assignmentId) {
        EditTestVo editTestVo = tAssignmentService.findEditTestVoById(assignmentId, projectName);
        map.put("editTestVo", editTestVo);
        return "views/startExam";
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author lixueteng
     * @date 2017???8???27???
     **************************************************************************/
    @RequestMapping("/startExam")
    public String startExam(HttpServletRequest request, @RequestParam int examId, Integer simulation,
                            Map<String, Object> map, String fromTeach) {
        UserVo user = this.getCurrUser();
        //????????????
        Integer examPaperId = examDetailService.createExamPaper(examId, user.getUsername());
        // ???????????????????????????????????????????????????????????????dubbo????????????????????????????????????
        examPaperId = examDetailService.createRandomExam(examPaperId, examId, user.getUsername());
        return "redirect:/views/beginExam?examId=" + examPaperId + "&simulation=" + simulation + "&page=1&fromTeach=" + fromTeach;
    }

    /**************************************************************************
     * Description ????????????-????????????(??????????????????)
     *
     * @author fubowen
     * @date 2021-8-5
     **************************************************************************/
    @RequestMapping("/newExamPaper")
    @ResponseBody
    public Integer startExam(@RequestParam Integer examId,@RequestParam String username) {
        //????????????
        Integer examPaperId = examDetailService.createExamPaper(examId, username);
        // ???????????????????????????????????????????????????????????????dubbo????????????????????????????????????
        examPaperId = examDetailService.createRandomExam(examPaperId, examId, username);
        return examPaperId;
    }

    /**************************************************************************
     * Description ????????????-??????????????????????????????????????????????????????
     *
     * @author ?????????
     * @date 2017???11???2???
     **************************************************************************/
    @RequestMapping("/isExamCanAnswer")
    @ResponseBody
    public boolean isExamCanAnswer(@RequestParam Integer examId,@RequestParam String username) {
        return examDetailService.getExamIsCanAnswer(examId, username);
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author lixueteng
     * @date 2017???8???27???
     **************************************************************************/
    @RequestMapping("/beginExam")
    public String beginExam(HttpServletRequest request, @RequestParam int examId, Integer simulation,
                            Integer page, Map<String, Object> map, String fromTeach) {
        UserVo user = this.getCurrUser();
        ExamDetailVo examDetailVo = examDetailService.getExamDetail(examId, user.getUsername(), page, 5);
        //???????????????????????????
        if (examDetailVo.getStatus() == 1) {
            return "redirect:/exam/exam";
        }
        map.put("currPage", page);
        map.put("examId", examId);
        map.put("simulation", simulation);
        map.put("examDetailVo", examDetailVo);

        Map<String, Integer> pageModel = examDetailVo.getPageModel();
        //???????????????????????????
        map.put("totalRecords", pageModel.get("totalRecords"));
        //????????????????????????
        Integer parentExamId = examDetailService.findParentExamByExamId(examId);
        List<Map> tAssignmentItemMapping = examGradingService.getTAssignmentItemMapping(parentExamId, user);
        map.put("recordMap", tAssignmentItemMapping.get(0));
        map.put("itemTextMap", tAssignmentItemMapping.get(1));
        //???????????????????????????
        //?????????????????????
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
        // ????????????select???
        int[] pageArray = new int[pageModel.get("totalPage")];//n?????????
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
        // ??????????????????
        Map<String, String[]> answerMap = new HashMap<>();
        List<Integer> itemIds = examDetailService.findTAssignmentItemIds(assignmentId);
        for (Integer id : itemIds) {
            String[] answers = request.getParameterValues("answers" + id);//????????????
            String[] answertexts = request.getParameterValues("answertexts" + id);//????????????
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
     * Description ????????????-??????????????????
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
        //??????????????????
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
            return "???????????????" + examResult.getTitle() + "\n???????????????" + examResult.getScore() + "???\n??????????????????????????????\n"+transcriptResult+"???";
        } else {
            return "???????????????" + examResult.getTitle() + "\n???????????????" + examResult.getScore() + "???\n??????" + examResult.getRemainSubmitTime() + "?????????\n"+transcriptResult+"???";
        }
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2018-12-14
     **************************************************************************/
    @RequestMapping("/makeupExamList")
    public String makeupExamStudentList(HttpServletRequest request, Map<String, Object> map, Integer assignmentId) {
        map.put("assignmentId", assignmentId);
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        return "views/makeupExamList";
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2018-12-14
     **************************************************************************/
    @RequestMapping("/makeupExamListApi")
    @ResponseBody
    public CommonResult<List<TAssignmentGradingVO>> makeupExamListApi(Integer assignmentId, Integer page, Integer limit,Integer siteId) {
        //??????????????????
        List<TAssignmentGradingVO> tAssignmentGradingVOList = examListService.makeupExamStudentList(assignmentId,siteId);
        Integer totalRecords = tAssignmentGradingVOList.size();
        //??????
        if (page * limit <= totalRecords) {
            tAssignmentGradingVOList = tAssignmentGradingVOList.subList(limit * (page - 1), limit * page);
        } else {
            tAssignmentGradingVOList = tAssignmentGradingVOList.subList(limit * (page - 1), totalRecords);
        }
        return CommonResult.success(tAssignmentGradingVOList, totalRecords);
    }

    /**************************************************************************
     * Description ????????????-????????????api
     *
     * @author ??????
     * @date 2020???7???30???
     **************************************************************************/
    @RequestMapping(value = "/testListApi",method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<List<TestInfoVO>> testListApi(HttpServletRequest request, Integer id, String search, Integer page, Integer limit, Integer dateType, Integer dictionary,String curruser) throws Exception {
        dateType = (dateType == null ? 0 : dateType);
        //dictionary???1 ??????id?????????id;2 ??????id?????????id;3 ??????id?????????id
        dictionary = (dictionary == null ? 1 : dictionary);
        if (dictionary == 1) {
            request.getSession().setAttribute("cid", id);
        }
        //??????????????????????????????
        Object authority = request.getSession().getAttribute("AUTHORITYNAME");
        String authorityName = "TEACHER";
        if (authority != null) {
            authorityName = authority.toString();
        }
        Date date = new Date();
        List<TestInfoVO> allTest = testInfoService.findAllTest(shareService.getUserByUsername(curruser), authorityName, id, dictionary);
        //????????????1???????????????2???????????????3
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
        //??????
        if (page * limit <= totalRecords) {
            allTest = allTest.subList(limit * (page - 1), limit * page);
        } else {
            allTest = allTest.subList(limit * (page - 1), totalRecords);
        }
        return CommonResult.success(allTest, totalRecords);
    }

    /**************************************************************************
     * Description ????????????-????????????api
     *
     * @author ??????
     * @date 2020???7???30???
     **************************************************************************/
    @RequestMapping("/examItemsApi")
    @ResponseBody
    public ExamDetailVo examItemsApi(Integer assignmentId, String username, Integer page, Integer limit) {
        //????????????
        Integer examPaperId = examDetailService.createExamPaper(assignmentId, username);
        // ???????????????????????????????????????????????????????????????dubbo????????????????????????????????????
        examPaperId = examDetailService.createRandomExam(examPaperId, assignmentId, username);
        ExamDetailVo examDetailVo = examDetailService.getExamDetail(examPaperId, username, page, limit);
        return examDetailVo;
    }

    /**************************************************************************
     * Description ????????????-????????????api
     *
     * @author ??????
     * @date 2020???7???30???
     **************************************************************************/
    @RequestMapping("/testItemsApi")
    @ResponseBody
    public TestDetailVo testItemsApi(Integer assignmentId, String username, Integer page, Integer limit) {
        //???????????????????????????
        TestDetailVo examDetail = testInfoService.getExamDetail(assignmentId, username, page, limit);
        return examDetail;
    }

    /**************************************************************************
     * Description ????????????-?????????????????????????????????
     *
     * @author ??????
     * @date 2020???9???25???
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
     * Description ????????????-??????????????????api
     *
     * @author ??????
     * @date 2020???7???31???
     **************************************************************************/
    @RequestMapping("/examGradeDetailApi")
    @ResponseBody
    public CommonResult<List<ExamDetailsVO>> examGradeDetailApi(Integer assignmentId, String username, Integer page, Integer limit) {
        List<ExamDetailsVO> examDetailsVOList = examDetailService.findExamGradeItems(assignmentId, username, page, limit);
        return CommonResult.success(examDetailsVOList, examDetailService.countExamGradeItems(assignmentId, username));
    }

    /**************************************************************************
     * Description ????????????-?????????????????????
     *
     * @author ??????
     * @date 2020???7???31???
     **************************************************************************/
    @RequestMapping(value = "/gradeExam", method = RequestMethod.POST)
    @ResponseBody
    public boolean gradeExam(@RequestParam(required = true) Integer itemId, @RequestParam(required = true) Integer gradingId, @RequestParam(required = true) Double score) {
        return examDetailService.gradeItem(itemId, gradingId, score);
    }

    /**************************************************************************
     * Description ????????????-???????????????
     *
     * @author ??????
     * @date 2020???7???31???
     **************************************************************************/
    @RequestMapping(value = "/updateTranscript", method = RequestMethod.POST)
    @ResponseBody
    public boolean updateTranscript(@RequestParam Integer gradingId) {
        return gradeBookService.updateTranscript(gradingId);
    }

    /**************************************************************************
     * Description ????????????
     *
     * @author ?????????
     * @date 2019???3???14???
     **************************************************************************/
    @RequestMapping("/certificateDetail")
    public String certificateDetail(HttpServletRequest request, Map<String, Object> map) {
        map.put("projectName", projectName);
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        //??????????????????
        SchoolVo schoolVo = examListService.findSchoolByProjectName(projectName);
        map.put("schoolVo", schoolVo);
        map.put("uploadFileHost", uploadFileHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "views/setCertificate";
    }

    /**************************************************************************
     * Description ??????????????????
     *
     * @author ?????????
     * @date 2019???3???14???
     **************************************************************************/
    @RequestMapping("/editSetCertificate")
    public String editCertificate(HttpServletRequest request, Map<String, Object> map, String projectName) {
        //??????????????????
        UserVo userVo = examListService.findUserByUserName(getCurrUser().getUsername());
        map.put("userName", userVo.getUsername());
        SchoolVo schoolVo = examListService.findSchoolByProjectName(projectName);
        map.put("schoolVo", schoolVo);
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        map.put("uploadFileHost", uploadFileHost);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "views/editSetCertificate";
    }

    /**************************************************************************
     * Description ????????????--????????????????????????
     *
     * @author ?????????
     * @date 2019???3???18???
     **************************************************************************/
    @RequestMapping("/saveSchoolPhoto")
    @ResponseBody
    public boolean saveSchoolPhoto(String fileid) {
        //??????????????????
        SchoolVo schoolVo = examListService.findSchoolByProjectName(projectName);
        examListService.saveSchoolPhoto(schoolVo, fileid);
        return true;
    }

    /**************************************************************************
     * Description ??????????????????
     *
     * @author ?????????
     * @date 2019???3???14???
     **************************************************************************/
    @RequestMapping("/saveCertificate")
    @ResponseBody
    public boolean saveCertificate(@ModelAttribute SchoolVo schoolVo) {
        examListService.saveCertificate(schoolVo, projectName);
        return true;
    }

    /**************************************************************************
     *Description ????????????-????????????
     * @author ?????????
     * @date 2019???3???19???
     * **************************************************************************/
    @RequestMapping("/deleteSchoolPhoto")
    @ResponseBody
    public boolean deleteSchoolPhoto(String projectName) {
        examListService.deleteSchoolImg(projectName);
        return true;
    }

    /**************************************************************************
     * Description ??????????????????????????????????????????????????????????????????
     *
     * @author ??????
     * @date 2019???01???24???
     **************************************************************************/
    @RequestMapping("/findGapsNumberByQuestionpool")
    @ResponseBody
    public List<GapsNumberVo> findGapsNumberByQuestionpool(Integer questionpoolId) {
        return wkChapterService.findGapsNumberByQuestionpool(questionpoolId);
    }

    /**************************************************************************
     * Description ????????????????????????json
     *
     * @author ??????
     * @date 2018???12???28???
     **************************************************************************/
    @RequestMapping("/apiStudentTestDetails")
    @ResponseBody
    public String apiStudentTestDetails(Integer examId, String username) {
//        List<Map> tAssignmentItemMapping = examDetailService.findTestDetailMapping(examId, username);
        String tAssignmentItemMapping = examDetailService.findTestDetailMappingJson(examId, username);
        return tAssignmentItemMapping;
    }

    /**************************************************************************
     * Description ??????????????????json
     *
     * @author ??????
     * @date 2018???12???28???
     **************************************************************************/
    @RequestMapping(value = "/apiTestDetails", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public List<ExamDetailsVO> apiTestDetails(Integer examId, String username, Integer currpage) {
        Integer pageSize = 10;
        //?????????
        if (currpage == null) {
            currpage = 1;
        }
        //??????????????????????????????0
        List<ExamDetailsVO> examDetailsVOList = examDetailService.findTestDetail(examId, username, 0, currpage, pageSize, 1, null);
        return examDetailsVOList;
    }

    /**************************************************************************
     * Description:??????-??????????????????
     * @throws IOException
     *
     * @author????????????
     * @date ???2017-3-20
     **************************************************************************/
    @RequestMapping("/saveMarkingImage")
    @ResponseBody
    public String saveMarkingImage(@RequestParam String imageString, Integer gradingId,
                                   Integer page, HttpServletRequest request) {
        String result = examDetailService.saveMarkingImage(pdfDirector, gradingId, page, imageString);

        return result;
    }

    /**************************************************************************
     * Description ????????????????????????
     *
     * @author ??????
     * @date 2020???10???21???
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
     * Description ????????????-??????????????????
     *
     * @author ??????
     * @date 2020???10???22???
     **************************************************************************/
    @RequestMapping("/copyExamApi")
    @ResponseBody
    public boolean copyExamApi(Integer sourceExamId, Integer targetSiteId) {
        CopyExamDTO copyExamDTO = tAssignmentService.getExamDetail(sourceExamId);
        return tAssignmentService.copyExam(sourceExamId, targetSiteId, copyExamDTO);
    }

    /**************************************************************************
     * Description ???????????????
     *
     * @author ??????
     * @date 2020???10???22???
     **************************************************************************/
    @RequestMapping(value = "/admissionData", method = RequestMethod.GET)
    @ResponseBody
    public AdmissionVo admissionData(String username, String datasource, Integer cid) {
        AdmissionVo admissionVo = examListService.admission(username, cid, apiGateWayHost, datasource);
        return admissionVo;
    }

    /**************************************************************************
     * Description ?????????????????????
     *
     * @author ??????
     * @date 2020???10???22???
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
        //??????
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
     * Description ????????????-????????????????????????
     *
     * @author ??????
     * @date 2017???9???7???
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
     * Description ????????????
     *
     * @author ?????????
     * @date 2020???11???3???
     **************************************************************************/
    @RequestMapping("/examAccess")
    public String getExamAccess(HttpServletRequest request, Map<String, Object> map, Integer cid) {
        //??????????????????????????????????????????
        Object d = request.getSession().getAttribute("datasource");
        if (d != null) {
            map.put("datasource", d);
        } else {
            map.put("datasource", "");
        }
        //??????id
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
        //??????????????????????????????
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
     * Description ????????????-????????????api
     *
     * @author ??????
     * @date 2020???7???30???
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
     * Description ????????????????????????(type:401)???????????????????????????(type:402)
     *
     * @author ??????
     * @date 2020???12???28???
     **************************************************************************/
    @RequestMapping("/saveReportsApi")
    @ResponseBody
    public boolean saveReportsApi(Integer gradingId, String fileName, Long fileId, Integer type,String username) {
        return examGradingService.saveReport(gradingId, fileName, fileId.toString(), type, username);
    }

    /**************************************************************************
     * Description ????????????????????????????????????id(type:401)???????????????????????????id(type:402)
     *
     * @author ??????
     * @date 2020???12???28???
     **************************************************************************/
    @RequestMapping("/getReportIdApi")
    @ResponseBody
    public Long getReportIdApi(Integer gradingId, Integer type) {
        return examGradingService.getReportId(gradingId, type);
    }

    /**************************************************************************
     * Description ???word????????????????????????
     *
     * @author ??????
     * @date 2021???1???5???
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
        //????????????
        List<TestSectionVO> examDetailsVOList = examDetailService.findTestDetail(assignmentId, username, gradingId);
        List<ExamDetailsVO> examDetailsVOS = new ArrayList<>();
        Integer correctCount = 0;
        for (TestSectionVO testSectionVO : examDetailsVOList) {
            examDetailsVOS.addAll(testSectionVO.getItems());
            correctCount += testSectionVO.getCorrectCount();
        }
        //????????????
        int sort = examGradingService.sortScore(assignmentId, username);
        //??????base64???
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
        //??????word
        WordHandler handler = new WordHandler();
        File outFile = handler.createDoc("/ftl", "report.ftl", data, "????????????");
        FileInputStream in = new FileInputStream(outFile);
        OutputStream o = response.getOutputStream();
        byte b[] = new byte[1024];
        response.setContentType("application/x-doc");
        response.setHeader("Content-disposition", "attachment; filename=" + URLEncoder.encode("????????????" + ".doc", "UTF-8"));// ????????????????????????
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
     * Description ???????????????????????????
     *
     * @author ??????
     * @date 2021???1???5???
     **************************************************************************/
    @RequestMapping("/radarMapData")
    @ResponseBody
    public List<TestSectionVO> radarMapData(Integer assignmentId, Integer gradingId,String username) {
        long start = System.currentTimeMillis();
        List<TestSectionVO> examDetailsVOList = examDetailService.radarMapData(assignmentId, username, gradingId);
        long end = System.currentTimeMillis();
        System.out.println("????????????:" + (end - start) / 1000);
        return examDetailsVOList;
    }
    /**************************************************************************
     * Description ????????????-??????????????????api
     *
     * @author ??????
     * @date 2020???7???31???
     **************************************************************************/
    @RequestMapping(value = "/commitGrade", method = RequestMethod.POST)
    @ResponseBody
    public String commitGrade(Integer assignmentId, String type,Integer siteId,String username) {
        List<LayuiDataVo> examGradingList = new ArrayList<>();
        //??????????????????
        if (type.equals("exam")) {
            examGradingList = examGradingService.findExamGradingList(assignmentId, "teacher", 1, 200, projectName, null,username);
        } else {
            examGradingList = examGradingService.findTestGradingList(assignmentId, "teacher",null, 1,100,null);
        }
        gradeBookService.commitGrade(siteId,assignmentId,apiGateWayHost,examGradingList);
        return "????????????";
    }
    /**************************************************************************
     * Description ????????????????????????
     *
     * @author ??????
     * @date 2021???1???18???
     **************************************************************************/
    @RequestMapping("/siteStudentApi")
    @ResponseBody
    public CommonResult<List<LayuiDataVo>> siteStudentApi(@RequestParam Integer page, @RequestParam Integer limit, String search,@RequestParam Integer examId,@RequestParam Integer siteId) {
        TCourseSite tCourseSite = tCourseSiteJPA.findById(siteId).get();
        List<LayuiDataVo> layuiDataVo = new ArrayList<>();
        if(tCourseSite.getTitle().equals("????????????")){
            layuiDataVo = shareService.findSiteStudentAllSchool(page,limit,search,examId);
            return CommonResult.success(layuiDataVo, shareService.countSiteStudent(siteId, search));
        }else{
            layuiDataVo = shareService.findNotPassStudents(siteId,page,limit,search,examId);
            return CommonResult.success(layuiDataVo, shareService.countNotPassStudents(siteId, search,examId));
        }
    }
    /**************************************************************************
     * Description ??????????????????
     *
     * @author ??????
     * @date 2021???1???18???
     **************************************************************************/
    @RequestMapping("/examFreeApi")
    @ResponseBody
    public void examFreeApi(Integer examId,String[] students,String username) {
        examGradingService.examFree(examId,students,username);
    }
    /**************************************************************************
     * Description ????????????????????????
     *
     * @author ??????
     * @date 2021???1???18???
     **************************************************************************/
    @RequestMapping("/exemption")
    public String getExemption(HttpServletRequest request, Map<String, Object> map, Integer examId) {
        map.put("examId", examId);
        return "views/exemption";
    }
}
