package net.gvsun.gsexam.exammain.exam;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.gvsun.gsexam.dto.common.*;
import net.gvsun.gsexam.dto.exam.SelectRandomQuestionDTO;
import net.gvsun.gsexam.dto.exam.WkChapterDto;
import net.gvsun.gsexam.dto.exam.login.SubScribeExamDto;
import net.gvsun.gsexam.service.common.ShareService;
import net.gvsun.gsexam.service.exam.*;
import net.gvsun.gsexam.service.pool.TAssignmentExamQuestionpoolService;
import net.gvsun.gsexam.service.pool.TAssignmentQuestionPoolService;
import net.gvsun.gsexam.service.test.TestInfoService;
import net.gvsun.gsexam.utils.DateFormatUtil;
import net.gvsun.gsexam.utils.Util;
import net.gvsun.gsexam.vo.exam.*;
import net.gvsun.gsexam.vo.layui.LayuiDataVo;
import net.gvsun.gsexam.vo.layui.LayuiTableVo;
import net.gvsun.gsexam.vo.questionpool.QuestionPoolVO;
import net.gvsun.gsexam.vo.questionpool.QuestionVo;
import net.gvsun.gsexam.vo.test.TestDetailVo;
import net.gvsun.gsexam.vo.test.TestInfoVO;
import net.gvsun.gsexam.vo.test.TestSectionVO;
import net.gvsun.web.util.Authorization;
import net.gvsun.web.util.AuthorizationUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.*;

@Controller
@RequestMapping("/exam")
public class ExamController {
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


    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ??????
     * @date 2017-08-01
     **************************************************************************/
//    @RequestMapping("/exam")
//    public String exam(HttpServletRequest request, Map<String, Object> map) throws Exception {
//        //??????????????????
//        UserVo userVo = this.getCurrUser();
//        map.put("userName", userVo.getUsername());
//        Object cid = request.getSession().getAttribute("cid");
//        if (null == cid) {
//            if (projectName.equals("proteach")) {
//                request.getSession().setAttribute("cid", 50);
//            } else {
//                request.getSession().setAttribute("cid", 1);
//            }
//        }
//        List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite();
//        request.getSession().setAttribute("siteList", allTCourseSite);
//        map.put("mainPage", "main");
//        map.put("projectName", projectName);
//        map.put("allTCourseSite", allTCourseSite);
//        map.put("projectTitle", projectTitle);
//        //??????????????????????????????
//        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
//        map.put("authorityName", authorityName);
//        String image = shareService.findStageMangeByType();
//        // map.put("image", image);
//        // map.put("resourceContainerHost", apiGateWayHost+"/resource");
//        //map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
//        // map.put("currentUsername", userVo.getUsername());
//        request.getSession().setAttribute("image", image);
//        request.getSession().setAttribute("currentUsername", userVo.getUsername());
//        request.getSession().setAttribute("currentUserCname", userVo.getCname());
//        request.getSession().setAttribute("resourceContainerHost", resourceContainerHost);
//        request.getSession().setAttribute("resourceContainerHostForUpload", resourceContainerHostForUpload);
//        request.getSession().setAttribute("oauth2Host", oauth2Host);
//        //map.put("currentUserCname", userVo.getCname());
//        return "exam/exam";
//    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ??????
     * @date 2017-08-01
     **************************************************************************/
//    @RequestMapping("/examList")
//    public String examList(HttpServletRequest request, Map<String, Object> map, Integer tCourseSiteId) throws Exception {
//        //???????????????1:????????????????????????????????????????????????????????????????????????????????????0:??????????????????????????????????????????
//        UserVo currUser = getCurrUser();
//        String classNumber = currUser.getClassNumber();
//        map.put("classNumber", classNumber);
//        map.put("userName", getCurrUser().getUsername());
//        map.put("projectTitle", projectTitle);
//        //????????????
//        if (tCourseSiteId != null) {
//            //???????????????tCourseSiteId????????????id
//            request.getSession().setAttribute("cid", tCourseSiteId.intValue());
//            List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite();
//            request.getSession().setAttribute("siteList", allTCourseSite);
//            map.put("allTCourseSite", allTCourseSite);
//        }
//
//        Object cidO = request.getSession().getAttribute("cid");
//        Integer cid = Integer.parseInt(cidO.toString());
//
//        //??????????????????????????????
//        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
//        List<ExamListVo> examListDtos = examListService.findExamList(cid, currUser, authorityName, "exam",1);
//        map.put("examList", examListDtos);
//        map.put("projectName", projectName);
//        map.put("authorityName", authorityName);
//        map.put("today", new Date());
//        return "exam/examList";
//    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2018-12-14
     **************************************************************************/
    @RequestMapping("/makeupExamStudentList")
    public String makeupExamStudentList(HttpServletRequest request, Map<String, Object> map, Integer examId,Integer siteId) {
        //??????????????????
        List<TAssignmentGradingVO> tAssignmentGradingVOList = examListService.makeupExamStudentList(examId,siteId);
        map.put("tAssignmentGradingVOList", tAssignmentGradingVOList);
        map.put("projectTitle", projectTitle);
        map.put("projectName", projectName);
        map.put("examId", examId);
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        return "exam/makeupExamStudentList";
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     *@author ?????????
     * @date 2018???12???17???
     **************************************************************************/
    @RequestMapping("/studentList")
    public String studentList(Integer currpage, HttpServletRequest request, Map<String, Object> map, Integer examId) {
        //????????????20???
        Integer pageSize = 20;
        //?????????
        if (currpage == null) {
            currpage = 1;
        }
        //????????????
        String username = request.getParameter("username");
        map.put("username", username);
        //????????????
        String cname = request.getParameter("cname");
        map.put("cname", cname);
        //??????????????????
        List<UserVo> studentList = examListService.findAllStudent(username, cname, currpage);
        //????????????????????????
        Integer totalRecords = examListService.countStudentList(username, cname);
        //Integer totalRecords=studentList.size();
        //??????
        int totalPage = (totalRecords + pageSize - 1) / pageSize;
        map.put("totalRecords", totalRecords);
        map.put("currpage", currpage);
        map.put("totalPage", totalPage);
        // ????????????select???
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }

        map.put("examId", examId);
        map.put("pageArray", pageArray);
        map.put("studentList", studentList);
        map.put("projectTitle", projectTitle);
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        return "exam/newStudentToExam";
    }

    /**************************************************************************
     * Description:???????????????????????????
     * @author ?????????
     * @date 2018???12???17???
     **************************************************************************/
    @RequestMapping("/addStudentToExam")
    public String addStudentToExam(HttpServletRequest request, Integer examId) {
        //????????????????????????????????????
        String[] usernames = request.getParameter("addStudentList").split(",");
        //?????????????????????
        examListService.saveStudentToExam(examId, usernames);
        return "redirect:/exam/makeupExamStudentList?examId=" + examId;
    }


    /**************************************************************************
     * Description ????????????-????????????????????????????????????
     *
     * @author ??????
     * @date 2017-08-01
     **************************************************************************/
    @RequestMapping("/examGradingList")
    public String examGradingList(HttpServletRequest request, Map<String, Object> map) throws Exception {
        map.put("projectTitle", projectTitle);
        return "exam/examGradingList";
    }

    /**************************************************************************
     * Description ????????????-????????????????????????
     *
     * @author ??????
     * @date 2017-08-01
     **************************************************************************/
    @RequestMapping("/assignmentItemMappingList")
    public String findTestDetailByGradingId(HttpServletRequest request, Integer assignGradingId, Map<String, Object> map) {
        map.put("projectTitle", projectTitle);
        return "exam/assignmentItemMappingList";
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ??????
     * @date 2017-08-09
     * @author ??????????????????2018???12???17???
     **************************************************************************/
    @RequestMapping("/editExam")
    public String editExam(HttpServletRequest request, Map<String, Object> map, Integer cid, String fromTeach, Integer assignmentId, Integer moduleType) throws Exception {
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
        //????????????
        //Integer assignmentId = request.getParameter("assignmentId") != null ? Integer.valueOf(request.getParameter("assignmentId")) : null;
        List<EditExamTAssignmentComponentVo> editExamTAssignmentComponentVoList = tAssignmentService.findTAssCompVoList(assignmentId);
        map.put("tAssignment", editExamTAssignmentComponentVoList);
        //????????????????????????VO??????
        EditTestVo editTestVo = new EditTestVo();
        if (assignmentId != null) {
            editTestVo = tAssignmentService.findEditTestVoById(assignmentId, projectName);
            if (moduleType == null) {
                moduleType = editTestVo.getTestChapterType();
            }
        }
        map.put("editTestVo", editTestVo);
        map.put("projectTitle", projectTitle);
        //????????????????????????
        //????????????
        Object cidO = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cidO.toString());
        // Integer tCourseSiteId = 50;//???????????????????????????????????????
        map.put("tCourseSiteId", tCourseSiteId);
        map.put("today", new Date());
        map.put("projectName", projectName);
        if (projectName.equals("proteach")) {
            //??????wkChapters
            List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTCourseSiteIdAndModuleType(tCourseSiteId, moduleType);
            map.put("wkChapters", wkChapterDtoList);
        }
        //????????????????????????????????????????????????????????????
        //List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllAcademys();
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
        List<ExamSubScribeVo> subScribeExamList = examSubScribeService.getSubScribeExamList(user.getUsername());
        map.put("subScribeExamList", subScribeExamList);
        //?????????????????????
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        //???????????????????????????
        List<QuestionpoolCategoryVo> questionpoolCategoryVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpoolCategory();
        map.put("questionpoolCategory", questionpoolCategoryVoList);
        //?????????????????????
        List<ExamQuestionpoolVo> examQuestionpoolVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpool();
        map.put("examQuestionpool", examQuestionpoolVoList);
        map.put("fromTeach", fromTeach);
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        return "exam/editExam";
    }

    /**************************************************************************
     * Description ????????????-??????????????????-??????????????????????????????
     *
     * @author ?????????
     * @date 2018-12-05
     **************************************************************************/
    @RequestMapping("/findAllClasses")
    @ResponseBody
    public List<SchoolClassesVo> findAllClasses(Map<String, Object> map, String schoolAcademy) {
        map.put("projectTitle", projectTitle);
        //????????????????????????
        List<SchoolClassesVo> schoolClassesVoList = wkChapterService.findAllClassesByAcademyNumber(schoolAcademy);
        return schoolClassesVoList;
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ?????????
     * @date 2019???5???17???
     **************************************************************************/
//    @RequestMapping("/viewExam")
//    public String viewExam(HttpServletRequest request, Map<String, Object> map, String fromTeach, Integer examId, Integer moduleType) throws Exception {
//        //????????????????????????
//        UserVo user = getCurrUser();
//        map.put("user", user);
//        //????????????
//        //Integer assignmentId = request.getParameter("assignmentId") != null ? Integer.valueOf(request.getParameter("assignmentId")) : null;
//        List<EditExamTAssignmentComponentVo> editExamTAssignmentComponentVoList = tAssignmentService.findTAssCompVoList(examId);
//        map.put("tAssignment", editExamTAssignmentComponentVoList);
//        //????????????????????????VO??????
//        EditTestVo editTestVo = new EditTestVo();
//        if (examId != null) {
//            editTestVo = tAssignmentService.findEditTestVoById(examId, projectName);
//            if (moduleType == null)
//                moduleType = editTestVo.getTestChapterType();
//        }
//        map.put("editTestVo", editTestVo);
//        map.put("today", new Date());
//        map.put("projectName", projectName);
//        map.put("moduleType", moduleType);
//        map.put("fromTeach", fromTeach);
//        //??????????????????????????????
//        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
//        map.put("authorityName", authorityName);
//        return "exam/viewExam";
//    }

    /**************************************************************************
     * Description ?????????????????????????????????????????????
     *
     * @author ??????
     * @date 2018-09-05
     **************************************************************************/
    @RequestMapping("/checkAssignmentTitle")
    @ResponseBody
    public String checkAssignmentTitle(HttpServletRequest request, @RequestParam String title, Integer id, Integer type, boolean isChapter) {
//        Object cidO = request.getSession().getAttribute("cid");
//        //Session??????????????????
//        if (cidO==null){
//            return "redirect:/teach/tosignout";
//        }
//        Integer cid2 =Integer.parseInt(cidO.toString());
        return examSubScribeService.checkTitle(title, id, type, isChapter);
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2017-12-18
     **************************************************************************/
    @RequestMapping("/modifyExam")
    public String modifyExam(HttpServletRequest request, @RequestParam Integer assignmentId, Map<String, Object> map) {
        //????????????????????????
        UserVo user = getCurrUser();
        map.put("user", user);
        //??????????????????VO??????
        EditTestVo editTestVo = tAssignmentService.findEditTestVoById(assignmentId, projectName);
        map.put("editTestVo", editTestVo);
        //
        List<EditExamTAssignmentComponentVo> editExamTAssignmentComponentVoList = tAssignmentService.findTAssCompVoList(assignmentId);
        map.put("tAssignment", editExamTAssignmentComponentVoList);
        //????????????????????????
        //????????????
        Object cidO = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cidO.toString());
        map.put("tCourseSiteId", tCourseSiteId);
        map.put("today", new Date());
        //??????wkChapters
        List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTCourseSiteId(tCourseSiteId);
        map.put("wkChapters", wkChapterDtoList);
        //????????????????????????
        Integer moduleType = 1;//????????????
        map.put("moduleType", moduleType);
        //selectId
        map.put("selectId", -1);
        //??????????????????????????????
        List<ExamSubScribeVo> subScribeExamList = examSubScribeService.getSubScribeExamList(user);
        map.put("subScribeExamList", subScribeExamList);
        //?????????????????????
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        //???????????????????????????
        List<QuestionpoolCategoryVo> questionpoolCategoryVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpoolCategory();
        map.put("questionpoolCategory", questionpoolCategoryVoList);
        //?????????????????????
        List<ExamQuestionpoolVo> examQuestionpoolVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpool();
        map.put("examQuestionpool", examQuestionpoolVoList);
        map.put("projectTitle", projectTitle);
        return "exam/editExam";
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

    /*    *//**************************************************************************
     * Description ????????????-?????????????????????????????????????????????????????????
     *
     * @author ?????????
     * @date 2018-01-09
     **************************************************************************//*
    @RequestMapping("/findExamQuestionpoolCategory")
    public @ResponseBody Map<Integer,String> findExamQuestionpoolCategory(@RequestParam Integer examQuestionpoolId){
        Map map = new HashMap();

        return map;
    }*/

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ?????????
     * @date 2017???12???15???
     **************************************************************************/
    @RequestMapping("/deleteExam")
    public String deleteExam(@RequestParam Integer tAssignmentId) {
        //?????????????????????wkFolder??????????????????tAssignment??????
        tAssignmentService.deleteExam(tAssignmentId);
        if (projectName.equals("ycteach")) {
            return "redirect:/exam/ycexamList";
        } else {
            return "redirect:/exam/examList";
        }
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ?????????
     * @date 2018???11???16???
     **************************************************************************/
    @RequestMapping("/deleteTest")
    public String deleteTest(@RequestParam Integer tAssignmentId) {
        //?????????????????????wkFolder??????????????????tAssignment??????
        tAssignmentService.deleteExam(tAssignmentId);
        return "redirect:/exam/testList";
    }

    /**************************************************************************
     * @Description: ??????????????????-ajax??????type????????????
     * @Author: ??????
     * @Date: 2017/10/10 17:39
     **************************************************************************/
    @RequestMapping("/editExam/findChapterMap")
    @ResponseBody
    public Map<Integer, String> findChapterMap(@RequestParam Integer tCourseSiteId, Integer moduleType, HttpServletRequest request) {
        Map<Integer, String> map = new HashMap<Integer, String>();
        Object cid = request.getSession().getAttribute("cid");
        tCourseSiteId = Integer.parseInt(cid.toString());
        map = wkChapterService.findChapterMapByModuleTypeAndSiteId(tCourseSiteId, moduleType);
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
     * @Description: ????????????id????????????????????????????????????????????????
     * @Author: ??????
     * @Date: 2017/10/9 21:55
     **************************************************************************/
    @ResponseBody
    @RequestMapping("/question/getItemCount")
    public Map<String, String> getItemCount(Integer questionpoolId, String type) {
        return tAssignmentQuestionPoolService.getItemCountStr(questionpoolId, type);
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
    @RequestMapping("/saveTest")
    public String saveTest(String fromTeach, HttpServletRequest request, Map<String, Object> map) {
        //??????????????????
        Object cid = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cid.toString());
        //??????????????????
        String currUsername = getCurrUser().getUsername();
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
        String[] schoolClasses = Util.isEmpty(request.getParameter("schoolClass")) ? tAssignmentService.findAllClassByAcademyId(request.getParameter("schoolAcademy")) : request.getParameterValues("schoolClass");
        //???????????????
        String isMakeUpExam = Util.isEmpty(request.getParameter("isMakeUpExam")) ? null : request.getParameter("isMakeUpExam");
        //???????????????id
        Integer oldAssignmentId = Util.isEmpty(request.getParameter("oldAssignmentId")) ? null : Integer.valueOf(request.getParameter("oldAssignmentId"));
        //????????????
        Date startdateTest = Util.isEmpty(request.getParameter("startdateTest")) ? null : Util.parseToDate(request.getParameter("startdateTest"));
        //????????????
        Date duedateTest = Util.isEmpty(request.getParameter("duedateTest")) ? null : Util.parseToDate(request.getParameter("duedateTest"));
        //???????????????
        String username = currUsername;
        //????????????
        Double testScoreTest = Util.isEmpty(request.getParameter("testScoreTest")) ? null : Double.valueOf(request.getParameter("testScoreTest"));
        //????????????
        Double passingScore = Util.isEmpty(request.getParameter("passingScore")) ? null : Double.valueOf(request.getParameter("passingScore"));
        //????????????
        Integer mins = Util.isEmpty(request.getParameter("mins")) ? null : Integer.valueOf(request.getParameter("mins"));
        //????????????(?????????????????????)
        //Integer timelimitOneTest = Util.isEmpty(request.getParameter("timelimitOneTest")) ? null : Integer.valueOf(request.getParameter("timelimitOneTest"));
        Integer timelimitOneTest = Util.isEmpty(request.getParameter("customTime")) ? 1 : Integer.valueOf(request.getParameter("customTime"));
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
        //????????????
        String type = request.getParameter("type");
        //????????????id
        Integer siteId = Util.isEmpty(request.getParameter("siteId")) ? null : Integer.valueOf(request.getParameter("siteId"));
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
//        if (Integer.parseInt(testNeedSubScribe) != -1) {
//            //?????????????????????
//            String subScribeExamIdForString = request.getParameter("subScribeExamId");
//            //?????????????????????????????????
//            if (subScribeExamIdForString != null) {
//                subScribeExamId = Integer.parseInt(subScribeExamIdForString);
//            }
//        }
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
        //??????????????????
        Integer newTAssignmentId = tAssignmentService.saveTest(editTestVo, currUsername, tCourseSiteId, projectName);
        //???????????????????????????
        tAssignmentService.createGradebook(tCourseSiteId, newTAssignmentId, testChapterType, testWkChapterId);
        map.put("fromTeach", fromTeach);
        map.put("status", editTestVo.getStatus());
        //????????????????????????????????????
        if ("0".equals(isMakeUpExam) && !"*000".equals(schoolAcademy)) {
            tAssignmentService.saveTAssignmentClass(newTAssignmentId, schoolClasses);
        }
        map.put("projectTitle", projectTitle);
        map.put("projectName", projectName);
        return "exam/addExamResult";
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author lixueteng
     * @date 2017???8???27???
     **************************************************************************/
    @RequestMapping("/startExam")
    public String startExam(@RequestParam int examId, Integer simulation,
                            String fromTeach) {
        UserVo user = this.getCurrUser();
        //????????????
        Integer examPaperId = examDetailService.createExamPaper(examId, user.getUsername());
        // ???????????????????????????????????????????????????????????????dubbo????????????????????????????????????
        examPaperId = examDetailService.createRandomExam(examPaperId, examId, user.getUsername());
        return "redirect:/exam/beginExam?examId=" + examPaperId + "&simulation=" + simulation + "&page=1&fromTeach=" + fromTeach;
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author lixueteng
     * @date 2017???8???27???
     **************************************************************************/
    @RequestMapping("/beginExam")
    public String beginExam(@RequestParam int examId, Integer simulation,
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
        return "exam/startExam";
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
        examDetailService.saveExam(totalScore, assignmentId, submitTime, simulation, cid, userVo, grading);
        long time4 = System.currentTimeMillis();

        System.out.println("examDetailService.insertTAssignmentGrading------>" + (time2 - time1));
        System.out.println("examDetailService.saveTAssignmentItemMapping------>" + (time3 - time2));
        System.out.println("examDetailService.saveExam------>" + (time4 - time3));

        return this.showExamResult(assignmentId, userVo);
    }

    @ResponseBody
    @RequestMapping("/saveTAssignmentItemMappingRedis")
    public String saveTAssignmentItemMappingRedis(HttpServletRequest request) {
        UserVo userVo = this.getCurrUser();
        Integer cid = Integer.parseInt(request.getSession().getAttribute("cid").toString());
        Integer assignmentId = Integer.valueOf(request.getParameter("assignmentId"));
        Integer submitTime = Integer.valueOf(request.getParameter("submitTime"));
        Integer simulation = Integer.valueOf(request.getParameter("simulation"));
        // ??????????????????
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
        BigDecimal totalScore = examDetailService.saveTAssignmentItemMappingRedis(answerMap, assignmentId, submitTime, userVo, grading);
        long time3 = System.currentTimeMillis();
        examDetailService.saveExamRedis(totalScore, assignmentId, submitTime, simulation, cid, userVo, grading);
        long time4 = System.currentTimeMillis();

        System.out.println("examDetailService.insertTAssignmentGrading------>" + (time2 - time1));
        System.out.println("examDetailService.saveTAssignmentItemMappingRedis------>" + (time3 - time2));
        System.out.println("examDetailService.saveExamRedis------>" + (time4 - time3));

        return this.showExamResult(assignmentId, userVo);
    }

    private String showExamResult(Integer assignmentId, UserVo userVo) {
        Integer parentExamId = examDetailService.findParentExamByExamId(assignmentId);
        ExamResultVo examResult;
        if (parentExamId != null) {
            examResult = examDetailService.getExamResult(parentExamId, userVo);
        } else {
            examResult = examDetailService.getExamResult(assignmentId, userVo);
        }
        if (examResult.getTotalSubmitTime() == 0) {
            return "???????????????" + examResult.getTitle() + "\n???????????????" + examResult.getScore() + "???\n??????????????????????????????";
        } else {
            return "???????????????" + examResult.getTitle() + "\n???????????????" + examResult.getScore() + "???\n??????" + examResult.getRemainSubmitTime() + "?????????";
        }
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ??????
     * @date 2017???8???27???
     **************************************************************************/
    @RequestMapping("/viewExamScore")
    public String viewExamScore(HttpServletRequest request, Map<String, Object> map) throws Exception {
        UserVo userVo = getCurrUser();
        //??????id ??????50
        Object cid1 = request.getSession().getAttribute("cid");
        Integer cid = Integer.parseInt(cid1.toString());
        //???????????????????????????????????????
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        List<ExamListVo> examList = examListService.findExamList(cid, userVo, authorityName, "exam",1);
        map.put("examList", examList);
        map.put("projectName", projectName);
        map.put("projectTitle", projectTitle);
        return "exam/viewExamScore";
    }

    /**************************************************************************
     * Description ????????????-?????????????????????
     *
     * @author ?????????
     * @date 2019???6???3???
     **************************************************************************/
    @RequestMapping("/showNotTakeExamPage")
    public String showNotTakeExamPage(HttpServletRequest request, @RequestParam Integer examId, Integer currpage, Map<String, Object> map) {
        //??????????????????
        Object cid = request.getSession().getAttribute("cid");
        Integer cid2 = Integer.parseInt(cid.toString());
        //????????????20???
        Integer pageSize = 20;
        //?????????
        if (currpage == null) {
            currpage = 1;
        }
        UserVo userVo = this.getCurrUser();
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        //??????????????????
        List<LayuiDataVo> notTakeExamList = examGradingService.findNotTakeExamList(examId, currpage,20,null,cid2);
        if (projectName.equals("proteach")) {
            Iterator<LayuiDataVo> it = notTakeExamList.iterator();
            while (it.hasNext()) {
                LayuiDataVo x = it.next();
                boolean fla = shareService.findTCourseSitesBySiteIdAndUsername(cid2, x.getUsername());
                if (!fla) {
                    it.remove();
                }
            }
        }
        map.put("notTakeExamList", notTakeExamList);
        map.put("examId", examId);
        map.put("projectName", projectName);
        //????????????????????????????????????
        Integer totalRecords = examListService.countNotTakeExamList(examId,null,cid2);
        //??????
        int totalPage = (totalRecords + pageSize - 1) / pageSize;
        map.put("totalRecords", totalRecords);
        map.put("currpage", currpage);
        map.put("totalPage", totalPage);
        map.put("pageSize", pageSize);
        // ????????????select???
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        map.put("pageArray", pageArray);
        map.put("projectTitle", projectTitle);
        return "exam/notTakeExamList";
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
            userVo = shareService.getUserByUsername(un);
        }
        return userVo;
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ?????????
     * @date 2017???8???27???
     **************************************************************************/
    @RequestMapping("/showExamResult")
    public String showExamResult(@RequestParam Integer examId, Map<String, Object> map, String fromTeach, Integer flag) {
        UserVo userVo = this.getCurrUser();
        ExamResultVo examResult = examDetailService.getExamResult(examId, userVo);
        map.put("examResult", examResult);
        map.put("fromTeach", fromTeach);
        map.put("flag", flag);
        map.put("projectTitle", projectTitle);
        return "exam/examResult";
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2017???10???17???
     **************************************************************************/
    @RequestMapping("/showExamGradingPage")
    public String showExamGradingPage(HttpServletRequest request, @RequestParam Integer examId, Integer currpage, Map<String, Object> map,Integer siteId,String username) {
        //????????????20???
        Integer pageSize = 20;
        //?????????
        if (currpage == null) {
            currpage = 1;
        }
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        //??????????????????
        List<LayuiDataVo> examGradingList = examGradingService.findExamGradingList(examId, authorityName, currpage,pageSize, projectName,null,username);
        if (projectName.equals("proteach")) {
            Iterator<LayuiDataVo> it = examGradingList.iterator();
            while (it.hasNext()) {
                LayuiDataVo x = it.next();
                boolean fla = shareService.findTCourseSitesBySiteIdAndUsername(siteId, x.getUsername());
                if (!fla) {
                    it.remove();
                }
            }
        }
        map.put("examGradingList", examGradingList);
        map.put("examId", examId);
        map.put("projectName", projectName);
        //????????????????????????????????????
        int totalRecords = examGradingService.countExamGradingList(examId, username, authorityName,null);
        //??????
        int totalPage = (totalRecords + pageSize - 1) / pageSize;
        map.put("totalRecords", totalRecords);
        map.put("currpage", currpage);
        map.put("totalPage", totalPage);
        map.put("pageSize", pageSize);
        // ????????????select???
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        map.put("pageArray", pageArray);
        map.put("projectTitle", projectTitle);
        return "exam/examGradingList";
    }


    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2017???10???17???
     **************************************************************************/
    /*@RequestMapping("/showExamGrading")
    @ResponseBody
    public Object showExamGrading(HttpServletRequest request, @RequestParam Integer examId, Integer page, Integer limit, Map<String, Object> map) {
        UserVo userVo = this.getCurrUser();
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        //??????????????????
        List<LayuiDataVo> examGradingList = examGradingService.findExamGradingList(examId, userVo, page, limit,authorityName);
        LayuiTableVo layuiTableVo = new LayuiTableVo();
        layuiTableVo.setCode(0);
        layuiTableVo.setMsg("");
        //??????????????????
        layuiTableVo.setCount(examGradingList.size());
        layuiTableVo.setData(examGradingList);
        return layuiTableVo;
    }*/

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2017???10???19???
     **************************************************************************/
    @RequestMapping("/subscribeExam")
    public String subscribeExam(HttpServletRequest request, Map<String, Object> map) {
        return "exam/subscribeExam";
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2017???10???24???
     **************************************************************************/
    @RequestMapping("/saveSubscribeExam")
    public String saveSubscribeExam(HttpServletRequest request, Map<String, Object> map) {
        //?????????????????????
        UserVo userVo = getCurrUser();
        //??????????????????
        String title = request.getParameter("subscribeExamTitle");
        //??????????????????
        String description = request.getParameter("subscribeExamDes");
        //???????????????????????????
        String startDate = request.getParameter("startdateSubscribeExam");
        //???????????????????????????
        String endDate = request.getParameter("duedateSubscribeExam");
        //???????????????????????????
        String number = request.getParameter("subscribeNumber");
        SubScribeExamDto examDto = new SubScribeExamDto();
        examDto.setTitle(title);
        examDto.setDescription(description);
        examDto.setStartDate(DateFormatUtil.string2Date(startDate, "yyyy-MM-dd HH:mm:ss"));
        examDto.setEndDate(DateFormatUtil.string2Date(endDate, "yyyy-MM-dd HH:mm:ss"));
        examDto.setNumber(Integer.parseInt(number));
        examSubScribeService.saveSubScribeExam(examDto, userVo);
        return "redirect:/exam/examAppointment";
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2017???10???24???
     **************************************************************************/
    @RequestMapping("/subscribeExamList")
    public String subscribeExamList(HttpServletRequest request, Map<String, Object> map) {
        return "exam/examAppointment";
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2018???11???20???
     **************************************************************************/
    @RequestMapping("/viewTestDetails")
    public String viewTestDetails(Integer examId, String username, Integer gradingId, HttpServletRequest request, Map<String, Object> map, Integer currpage) {
        //??????????????????
        TAssignmentsVO tAssignmentsVO = examDetailService.findExamById(examId, username, gradingId);
        map.put("exam", tAssignmentsVO);
        Integer pageSize = 10;
        //?????????
        if (currpage == null) {
            currpage = 1;
        }
        List<ExamDetailsVO> examDetailsVOList = examDetailService.findTestDetail(examId, username,gradingId, currpage, pageSize,1,null);
        map.put("examDetailVOList", examDetailsVOList);
        List<Map> tAssignmentItemMapping = examDetailService.findTestDetailMapping(examId, username);
        map.put("recordMap", tAssignmentItemMapping.get(0));
        map.put("examId", examId);
        map.put("username", username);
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        Integer totalRecords = examDetailService.countTestamDetail(examId,gradingId, username,1,null);
        int totalPage;
        //?????????
        if (totalRecords == 0) {
            totalPage = 1;
        } else {
            //?????????
            totalPage = (totalRecords + pageSize - 1) / pageSize;
        }
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        map.put("pageArray", pageArray);
        map.put("totalRecords", totalRecords);
        map.put("currpage", currpage);
        map.put("gradingId", gradingId);
        map.put("totalPage", totalPage);
        map.put("flag", 1);
        map.put("type", "test");
        map.put("projectName", projectName);
        map.put("projectTitle", projectTitle);
        return "exam/viewTestDetails";
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2018???11???23???
     **************************************************************************/
    @RequestMapping("/viewExamDetails")
    public String viewExamDetails(Integer examId, String username, Integer gradingId, HttpServletRequest request, Map<String, Object> map, Integer currpage) {
        Integer pageSize = 10;
        //?????????
        if (currpage == null) {
            currpage = 1;
        }
        //??????????????????
        TAssignmentsVO tAssignmentsVO = examDetailService.findExamById(examId, username, gradingId);
        map.put("exam", tAssignmentsVO);
        List<ExamDetailsVO> examDetailsVOList = examDetailService.findExamDetail(examId, username, gradingId, currpage, pageSize,0);
        map.put("examDetailVOList", examDetailsVOList);
        List<Map> tAssignmentItemMapping = examDetailService.findExamDetailMapping(examId, username, gradingId);
        map.put("recordMap", tAssignmentItemMapping.get(0));
        Integer totalRecords = examDetailService.countExamDetail(examId,0);
        int totalPage;
        //?????????
        if (totalRecords == 0) {
            totalPage = 1;
        } else {
            //?????????
            totalPage = (totalRecords + pageSize - 1) / pageSize;
        }
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        map.put("pageArray", pageArray);
        map.put("totalRecords", totalRecords);
        map.put("currpage", currpage);
        map.put("examId", examId);
        map.put("gradingId", gradingId);
        map.put("username", username);
        map.put("totalPage", totalPage);
        map.put("flag", 0);
        map.put("type", "exam");
        map.put("projectName", projectName);
        map.put("projectTitle", projectTitle);
        return "exam/viewTestDetails";
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ?????????
     * @date 2017???10???25???
     **************************************************************************/
    @RequestMapping("/examAppointment")
    public String examAppointment(HttpServletRequest request, Map<String, Object> map) {
        //?????????????????????
        UserVo userVo = getCurrUser();
        //???????????????????????????
        List<ExamSubScribeVo> subScribeExamList = examSubScribeService.getSubScribeExamList(userVo);
        map.put("subScribeExamList", subScribeExamList);
        //?????????????????????????????? ???????????????????????????
        map.put("flag", 1);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getAuthorities().iterator().next().toString());
        map.put("projectTitle", projectTitle);
        return "exam/examAppointment";
    }

    /**************************************************************************
     * Description ????????????-??????????????????????????????????????????????????????id
     *
     * @author ?????????
     * @date 2017???10???26???
     **************************************************************************/
    @RequestMapping("/alreadySubScribeStudentId")
    public String alreadySubScribeStudentId(HttpServletRequest request, @RequestParam Integer subScribeExamId, Map<String, Object> map) {
        map.put("subScribeExamId", subScribeExamId);
        return "exam/alreadySubScribe";
    }

    /**************************************************************************
     * Description ????????????-??????????????????????????????????????????????????????
     *
     * @author ?????????
     * @date 2017???10???25???
     **************************************************************************/
    @RequestMapping("/alreadySubScribeStudent")
    @ResponseBody
    public Object alreadySubScribeStudent(HttpServletRequest request, @RequestParam Integer subScribeExamId, Integer page, Integer limit, Map<String, Object> map) {
        UserVo userVo = getCurrUser();
        List<SubScribeStudentVo> subScribeExamStudentList = examSubScribeService.getSubScribeExamStudentList(subScribeExamId, userVo, page, limit);
        LayuiTableVo layuiTableVo = new LayuiTableVo();
        layuiTableVo.setCode(0);
        layuiTableVo.setMsg("");
        layuiTableVo.setCount(subScribeExamStudentList.size());
        layuiTableVo.setData(subScribeExamStudentList);
        return layuiTableVo;
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2017???10???26???
     **************************************************************************/
    @RequestMapping("/startSubScribeExam")
    public String startSubScribeExam(HttpServletRequest request, @RequestParam Integer subScribeExamId, Map<String, Object> map) {
        UserVo userVo = getCurrUser();
        examSubScribeService.startSubScribeExam(subScribeExamId, userVo);
        map.put("subScribeExamId", subScribeExamId);
        return "redirect:/exam/examAppointment";
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2017???10???26???
     **************************************************************************/
    @RequestMapping("/cancelSubScribeExam")
    public String cancelSubScribeExam(HttpServletRequest request, @RequestParam Integer subScribeExamId, Map<String, Object> map) {
        UserVo userVo = getCurrUser();
        examSubScribeService.cancelSubScribeExam(subScribeExamId, userVo);
        return "redirect:/exam/examAppointment";
    }

    /**************************************************************************
     * Description ????????????-??????????????????????????????
     *
     * @author ?????????
     * @date 2017???10???31???
     **************************************************************************/
    @RequestMapping("/isHaveAssignedForExam")
    @ResponseBody
    public boolean isHaveAssignedForExam(HttpServletRequest request, @RequestParam Integer subScribeExamId, Map<String, Object> map) {
        boolean isRest = examSubScribeService.setSubScribeExamStatus(subScribeExamId);
        return isRest;
    }

    /**************************************************************************
     * Description ????????????-????????????????????????????????????????????????
     *
     * @author ?????????
     * @date 2017???11???2???
     **************************************************************************/
    @RequestMapping("/numberOfItemRest")
    @ResponseBody
    public Integer numberOfItemRest(HttpServletRequest request, @RequestParam Integer examId, Map<String, Object> map) {
        UserVo userVo = getCurrUser();
        Integer itemIsNotAnswerNumber = examDetailService.getItemIsNotAnswer(examId, userVo);
        //???????????????????????????????????????
        Integer totalNumber = examDetailService.getItemCountWithExamId(examId);
        return totalNumber - itemIsNotAnswerNumber;
    }

    /**************************************************************************
     * Description ????????????-??????????????????????????????????????????????????????
     *
     * @author ?????????
     * @date 2017???11???2???
     **************************************************************************/
    @RequestMapping("/isExamCanAnswer")
    @ResponseBody
    public boolean isExamCanAnswer(HttpServletRequest request, @RequestParam Integer examId, Map<String, Object> map) {
        UserVo userVo = getCurrUser();
        return examDetailService.getExamIsCanAnswer(examId, userVo.getUsername());

    }

    /**************************************************************************
     * Description ????????????-??????????????????????????????????????????????????????
     *
     * @author ?????????
     * @date 2017???11???2???
     **************************************************************************/
    @RequestMapping("/changeTCourseSite")
    public String changeTCourseSite(HttpServletRequest request, @RequestParam Integer cid, Map<String, Object> map) {
        request.getSession().setAttribute("cid", cid);
        return "redirect:/exam/exam";

    }

    /**************************************************************************
     * Description ????????????-??????OR????????????
     *
     * @author ?????????
     * @date 2017-08-09
     **************************************************************************/
    @RequestMapping("/newTest")
    public String newTest(HttpServletRequest request, Map<String, Object> map, Integer cid, String fromTeach, Integer assignmentId, Integer moduleType) throws Exception {
        //????????????????????????
        UserVo user = getCurrUser();
        map.put("user", user);
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        if (cid != null) {
            //???????????????tCourseSiteId????????????id
            request.getSession().setAttribute("cid", cid.intValue());
            List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite("");
            request.getSession().setAttribute("siteList", allTCourseSite);
            map.put("allTCourseSite", allTCourseSite);
        }
        //????????????
        //Integer assignmentId = request.getParameter("assignmentId") != null ? Integer.valueOf(request.getParameter("assignmentId")) : null;
        List<EditExamTAssignmentComponentVo> editExamTAssignmentComponentVoList = tAssignmentService.findTAssCompVoList(assignmentId);
        map.put("tAssignment", editExamTAssignmentComponentVoList);
        //????????????????????????VO??????
        EditTestVo editTestVo = new EditTestVo();
        if (assignmentId != null) {
            editTestVo = tAssignmentService.findEditTestVoById(assignmentId, projectName);
            //editTestVo.settAssignmentId(assignmentId);
        }
        map.put("editTestVo", editTestVo);
        //????????????????????????
        //????????????
        Object cidO = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cidO.toString());
        // Integer tCourseSiteId = 50;//???????????????????????????????????????
        map.put("tCourseSiteId", tCourseSiteId);
        map.put("today", new Date());
        map.put("projectName", projectName);
        if (projectName.equals("proteach")) {
            //??????wkChapters
            if (moduleType != null && moduleType == 1) {
                List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTCourseSiteIdAndModuleType(tCourseSiteId, moduleType);
                map.put("wkChapters", wkChapterDtoList);
            } else {
                List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTExperimentSKillId(tCourseSiteId);
                map.put("wkChapters", wkChapterDtoList);
            }
        }
        //????????????????????????????????????????????????????????????
        //List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllAcademys();
        List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllExamAcademys();
        map.put("schoolAcademyVoList", schoolAcademyVoList);
        //????????????????????????
//        Integer moduleType = 1;//????????????
        map.put("moduleType", moduleType);
        //selectId
        map.put("selectId", -1);
        //??????????????????????????????
        List<ExamSubScribeVo> subScribeExamList = examSubScribeService.getSubScribeExamList(user);
        map.put("subScribeExamList", subScribeExamList);
        //?????????????????????
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        //???????????????????????????
        List<QuestionpoolCategoryVo> questionpoolCategoryVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpoolCategory();
        map.put("questionpoolCategory", questionpoolCategoryVoList);
        //?????????????????????
        List<ExamQuestionpoolVo> examQuestionpoolVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpool();
        map.put("examQuestionpool", examQuestionpoolVoList);
        map.put("fromTeach", fromTeach);
        map.put("projectTitle", projectTitle);
        return "exam/newTest";
    }

    /**************************************************************************
     * @Description: ????????????
     * @Author: lxt
     * @Date: 2018/01/18 14:19
     **************************************************************************/
    @RequestMapping("/saveExam")
    public String saveExam(@RequestParam Integer tCourseSiteId, Integer moduleType, Integer selectId, String fromTeach, HttpServletRequest request, Map<String, Object> map) {
        //??????????????????
        Object cid = request.getSession().getAttribute("cid");
        tCourseSiteId = Integer.parseInt(cid.toString());
        //??????????????????
        String currUsername = getCurrUser().getUsername();
        //?????????????????????????????????
        //??????ID
        Integer tAssignmentId = Util.isEmpty(request.getParameter("testId")) ? null : Integer.valueOf(request.getParameter("testId"));
        //????????????
        String tAssignmentTitle = request.getParameter("testTitle");
        //??????
        Integer testChapterType = Util.isEmpty(request.getParameter("testChapterType")) ? null : Integer.valueOf(request.getParameter("testChapterType"));
        //??????ID
        Integer testWkChapterId = Util.isEmpty(request.getParameter("testWkChapterId")) ? null : Integer.valueOf(request.getParameter("testWkChapterId"));
        //??????
        String[] schoolAcademy = Util.isEmpty(request.getParameter("schoolAcademy")) ? null : request.getParameterValues("schoolAcademy");
        //??????ID
        Integer testWkLessonId = Util.isEmpty(request.getParameter("testWkLessonId")) ? null : Integer.valueOf(request.getParameter("testWkLessonId"));
        //????????????
        Date startdateTest = Util.isEmpty(request.getParameter("startdateTest")) ? null : Util.parseToDate(request.getParameter("startdateTest"));
        //????????????
        Date duedateTest = Util.isEmpty(request.getParameter("duedateTest")) ? null : Util.parseToDate(request.getParameter("duedateTest"));
        //???????????????
        String username = currUsername;
        //????????????
        Integer status = Util.isEmpty(request.getParameter("status")) ? null : Integer.valueOf(request.getParameter("status"));
        //????????????
        Double testScoreTest = Util.isEmpty(request.getParameter("testScoreTest")) ? null : Double.valueOf(request.getParameter("testScoreTest"));
        //????????????
        Integer timelimitOneTest = Util.isEmpty(request.getParameter("timelimitOneTest")) ? null : Integer.valueOf(request.getParameter("timelimitOneTest"));
        //???????????????????????????
        String toGradebook = request.getParameter("checknameTest");
        //????????????????????????
        String gradeToStudent = request.getParameter("checkname1Test");
        //????????????????????????
        String gradeToTotalGrade = request.getParameter("checkname2Test");
        //????????????????????????
        String answerToStudent = request.getParameter("checkname3Test");
        //????????????
        String content = request.getParameter("contentTest");
        //???????????? ??????exam ??????test
        String type = request.getParameter("type");
        if (testChapterType == 200) {
            type = "prepareTest";
        }
        TestInfoVO testInfoVO = new TestInfoVO();
        testInfoVO.setId(tAssignmentId);
        testInfoVO.setUsername(username);
        testInfoVO.setTitle(tAssignmentTitle);
        testInfoVO.setCategoryId(testChapterType);
        testInfoVO.setChapterId(testWkChapterId);
        testInfoVO.setClassId(testWkLessonId);
        testInfoVO.setDescription(content);
        if (testScoreTest != null) {
            testInfoVO.setScore(testScoreTest);
        }
        //testInfoVO.setSchoolAcademy(schoolAcademy);
        testInfoVO.setStatus(status);
        testInfoVO.setStartDate(startdateTest);
        testInfoVO.setEndTime(duedateTest);
        testInfoVO.setSubmitTime(timelimitOneTest);
        testInfoVO.setIsToGradebook(toGradebook);
        testInfoVO.setIsToStudent(gradeToStudent);
        testInfoVO.setIsToTotalScore(gradeToTotalGrade);
        testInfoVO.setIsShowDetail(answerToStudent);
        testInfoVO.setType(type);
        List<TestSectionVO> sectionVOList = new ArrayList<>();
        //????????????????????????????????????
        TestSectionVO sectionVO = new TestSectionVO();
        //????????????????????????????????????????????????
        String sectionStr = request.getParameter("selectedItemIds");
        String[] idsArray = sectionStr.split(",");
        sectionVO.setSectionIndex(1);
        sectionVO.setSectionTitle("??????????????????");
        sectionVO.setItemScore(0);
        List<Integer> idsInt = new ArrayList<>();
        for (String id : idsArray) {
            idsInt.add(Integer.parseInt(id));
        }
        sectionVO.setItemIds(idsInt);
        sectionVOList.add(sectionVO);
        testInfoVO.setTestSectionVOS(sectionVOList);
        Integer aid = testInfoService.saveTest(testInfoVO, getCurrUser(), tCourseSiteId, projectName);
        //???????????????
        tAssignmentService.createGradebook(tCourseSiteId, aid, testChapterType, testWkChapterId);
        map.put("fromTeach", fromTeach);
        map.put("status", testInfoVO.getStatus());
        //????????????????????????????????????
        tAssignmentService.saveTAssignmentAcademy(aid, schoolAcademy);
        map.put("projectTitle", projectTitle);
        return "exam/addTestResult";
    }

    /**************************************************************************
     * Description ?????????-??????????????????
     *
     * @author ?????????
     * @date 2017-12-21
     **************************************************************************/
    @RequestMapping("/addedQuestions")
    public String addedQuestions(HttpServletRequest request, Integer questionPoolId, Integer currpage, Integer currsection, Map<String, Object> map) throws Exception {
        //??????????????????
        Object cid = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cid.toString());
        //?????????????????????????????????
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        if (questionPoolId != null) {
            //????????????????????????????????????????????????
            //??????10?????????
            Integer pageSize = 10;
            if (null == currpage) {
                currpage = 1;
            }
            //?????????????????????????????????
            QuestionPoolVO questionPoolSelected = tAssignmentQuestionPoolService.findQuestionPoolById(questionPoolId);
            map.put("questionPoolSelected", questionPoolSelected);
            List<QuestionVo> relist = tAssignmentQuestionPoolService.findquestionPoolList(questionPoolId, currpage, null, null,pageSize);
            String idStr = "";
            for (QuestionVo vo : relist) {
                idStr += vo.getId() + ",";
            }
            if (idStr.length() > 0) {
                idStr = idStr.substring(0, idStr.length() - 1);
            }
            map.put("idStr", idStr);
            Integer totalRecords = tAssignmentQuestionPoolService.countTAssignmentItem(questionPoolId, null, null);
            int totalPage = (totalRecords + pageSize - 1) / pageSize;
            map.put("totalRecords", totalRecords);
            //?????????
            map.put("currpage", currpage);

            System.out.println("currpage===" + currpage);
            //?????????
            map.put("totalPage", totalPage);
            // ????????????select???
            int[] pageArray = new int[totalPage];
            for (int i = 0; i < pageArray.length; i++) {
                pageArray[i] = i + 1;
            }
            map.put("pageArray", pageArray);
            map.put("relist", relist);
            map.put("questionPoolId", questionPoolId);
            map.put("pageSize", pageSize);
        } else {
            map.put("questionPoolSelected", new QuestionPoolVO());
        }
        map.put("currsection", currsection);
        map.put("projectTitle", projectTitle);
        map.put("resourceContainerHost",resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("currentUsername", this.getCurrUser().getUsername());
        map.put("currentUserCname", this.getCurrUser().getCname());
        return "exam/addedQuestions";
    }

    /**
     * ????????????id?????????????????????????????????id????????????
     *
     * @return
     * @author ??????
     * @date 2018???5???7???
     */
    @ResponseBody
    @RequestMapping("/selectRandomQuestionStr")
    public SelectRandomQuestionDTO selectRandomQuestionStr(@RequestParam Integer questionPoolId, Integer num) {
        //????????????DTO
        SelectRandomQuestionDTO rs = new SelectRandomQuestionDTO();
        //????????????
        List<Integer> itemsIdsList = tAssignmentQuestionPoolService.getItemsIdsByPoolId(questionPoolId);
        //??????
        Collections.shuffle(itemsIdsList);
        //???????????????????????????????????????
        if (num > itemsIdsList.size()) {
            rs.setResCode(0);
            rs.setResMsg("???????????????" + itemsIdsList.size() + "???????????????????????????");
        } else {
            rs.setResCode(1);
            if (num == -1) {
                String data = StringUtils.join(itemsIdsList.toArray(), ",");
                rs.setData(data);
            } else {
                String data = StringUtils.join(itemsIdsList.subList(0, num).toArray(), ",");
                rs.setData(data);
            }

        }

        return rs;
    }


    /**************************************************************************
     * Description ?????????-??????????????????
     *
     * @author ?????????
     * @date 2017-12-21
     **************************************************************************/
    @RequestMapping("/viewQuestions")
    public String viewQuestions(HttpServletRequest request, String sectionIds, Integer sectionId, Integer currpage, Map<String, Object> map) throws Exception {
        Integer pageSize = 10;
        //?????????????????????
        String[] itemIds = sectionIds.split(",");
        Integer[] newItemIds = new Integer[itemIds.length];
        for (int i = 0; i < itemIds.length; i++) {
            newItemIds[i] = Integer.parseInt(itemIds[i]);
        }
        if (currpage == null) {
            currpage = 1;
        }
        List<QuestionVo> questionVos = tAssignmentQuestionPoolService.showAllQuestionByIds(newItemIds, currpage,pageSize);
        map.put("currpage", currpage);
        map.put("pageSize", pageSize);
        //?????????
        map.put("totalRecords", itemIds.length);
        map.put("questionVos", questionVos);
        //sectionId
        map.put("sectionId", sectionId);
        int totalPage = (itemIds.length + pageSize - 1) / pageSize;
        map.put("totalPage", totalPage);
        // ????????????select???
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        map.put("pageArray", pageArray);
        map.put("projectTitle", projectTitle);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("currentUsername", this.getCurrUser().getUsername());
        map.put("currentUserCname", this.getCurrUser().getCname());
        return "exam/viewQuestions";
    }

    /**************************************************************************
     * Description ????????????-??????????????????????????????????????????????????????
     *
     * @author ?????????
     * @date 2018???1???22???
     **************************************************************************/
//    @RequestMapping("/testList")
//    public String testList(HttpServletRequest request, Map<String, Object> map, Integer tCourseSiteId) {
//        //??????????????????
//        UserVo userVo = getCurrUser();
//        //???????????????????????????
//        String schoolAcademy = userVo.getAcademyNumber();
//        map.put("schoolAcademy", schoolAcademy);
//        if (tCourseSiteId != null) {
//            //???????????????tCourseSiteId????????????id
//            request.getSession().setAttribute("cid", tCourseSiteId.intValue());
//            List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite();
//            request.getSession().setAttribute("siteList", allTCourseSite);
//            map.put("allTCourseSite", allTCourseSite);
//        }
//        //??????????????????
//        Object cid = request.getSession().getAttribute("cid");
//        Integer siteId = Integer.parseInt(cid.toString());
//        //??????????????????????????????
//        Object authority = request.getSession().getAttribute("AUTHORITYNAME");
//        String authorityName = "TEACHER";
//        if (authority!=null){
//            authorityName = authority.toString();
//        }
//        List<TestInfoVO> allTest = testInfoService.findAllTest(userVo, authorityName,siteId,1);
//        map.put("testList", allTest);
//        map.put("projectName", projectName);
//        map.put("projectTitle", projectTitle);
//        map.put("authorityName", authorityName);
//        return "exam/testList";
//    }

    /**************************************************************************
     * Description ????????????-??????????????????????????????????????????????????????
     *
     * @author ?????????
     * @date 2017???11???2???
     **************************************************************************/
    @RequestMapping("/isTestCanAnswer")
    @ResponseBody
    public boolean isTestCanAnswer(HttpServletRequest request, @RequestParam Integer examId, Map<String, Object> map) {
        UserVo userVo = getCurrUser();
        return examDetailService.getExamIsCanAnswer(examId, userVo.getUsername());
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author lixueteng
     * @date 2017???8???27???
     **************************************************************************/
    @RequestMapping("/beginTest")
    public String beginTest(HttpServletRequest request, @RequestParam int testId, Integer simulation,
                            Map<String, Object> map, String fromTeach, Integer currpage) {
        Integer pageSize = 10;
        if (currpage == null) {
            currpage = 1;
        }

        UserVo user = this.getCurrUser();
        //???????????????????????????
        TestDetailVo examDetail = testInfoService.getExamDetail(testId, user.getUsername(), currpage, pageSize);
        if (examDetail.getPageModel() == null) {
            examDetail.setPageModel(new HashMap<>());
            examDetail.getPageModel().put("totalPage", 0);
            examDetail.getPageModel().put("currpage", 0);
        }
        map.put("testDetail", examDetail);
        //??????????????????
        //List<Map> tAssignmentItemMapping = examGradingService.getTAssignmentItemMapping(testId, user);


        Map<String, Integer> pageModel = examDetail.getPageModel();
        // ????????????select???

        int[] pageArray = new int[pageModel.get("totalPage")];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        map.put("pageArray", pageArray);
        map.put("totalRecords", pageModel.get("totalRecords"));
        map.put("pageSize", pageSize);
        map.put("recordMap", new HashMap<>());
        map.put("itemTextMap", new HashMap<>());
        map.put("fromTeach", fromTeach);
        map.put("projectTitle", projectTitle);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("currentUsername", this.getCurrUser().getUsername());
        map.put("currentUserCname", this.getCurrUser().getCname());
        return "exam/startTest";
    }

    /**************************************************************************
     * Description ????????????-????????????????????????
     *
     * @author lixueteng
     * @date 2018???1???24???
     **************************************************************************/
    @RequestMapping("/saveTestMapping")
    public String saveTestMapping(HttpServletRequest request, Map<String, Object> map) {
        UserVo userVo = this.getCurrUser();
        Object cid1 = request.getSession().getAttribute("cid");
        Integer cid = Integer.parseInt(cid1.toString());
        Integer assignmentId = Integer.valueOf(request.getParameter("assignmentId"));
        Integer currPage = 1;
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

        testInfoService.saveTAssignmentItemMapping(answerMap, assignmentId, submitTime, userVo);

        //?????????????????????
        if (submitTime > 0) {
            Integer gradingId = testInfoService.saveTAssignmentGrade(answerMap, assignmentId, submitTime, new BigDecimal(0), userVo.getUsername());
            //???????????????
            Authorization authorization = AuthorizationUtil.getAuthorization(getCurrUser().getUsername());
            testInfoService.saveGradebook(cid, assignmentId, gradingId, getCurrUser(), apiGateWayHost, authorization.getJwtToken());
        }
        //?????????????????????
        return "redirect:/exam/showTestResult?examId=" + assignmentId;

    }


    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ??????
     * @date 2017???8???27???
     **************************************************************************/
    @RequestMapping("/viewTestScore")
    public String viewTestScore(HttpServletRequest request, Map<String, Object> map) throws Exception {
        UserVo userVo = getCurrUser();
        //??????id ??????50
        Object cid1 = request.getSession().getAttribute("cid");
        Integer cid = Integer.parseInt(cid1.toString());
        //???????????????????????????????????????
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        List<ExamListVo> examList = examListService.findExamList(cid, userVo, authorityName, "test",1);
        map.put("examList", examList);
        map.put("projectName", projectName);
        map.put("projectTitle", projectTitle);
        return "exam/viewTestScore";
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2017???10???17???
     **************************************************************************/
    @RequestMapping("/showTestGradingPage")
    public String showTestGradingPage(HttpServletRequest request, @RequestParam Integer examId, Integer currpage, Map<String, Object> map,Integer siteId,String username) {
        //????????????20???
        Integer pageSize = 20;
        //?????????
        if (currpage == null) {
            currpage = 1;
        }
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        //??????????????????
        List<LayuiDataVo> examGradingList = examGradingService.findExamGradingList(examId, authorityName, currpage,pageSize, projectName,null,username);
        if (projectName.equals("proteach")) {
            Iterator<LayuiDataVo> it = examGradingList.iterator();
            while (it.hasNext()) {
                LayuiDataVo x = it.next();
                boolean fla = shareService.findTCourseSitesBySiteIdAndUsername(siteId, x.getUsername());
                if (!fla) {
                    it.remove();
                }
            }
        }
        map.put("examGradingList", examGradingList);
        map.put("examId", examId);
        map.put("projectName", projectName);
        //????????????????????????????????????
        int totalRecords = examGradingService.countExamGradingList(examId, username, authorityName,null);
        //??????
        int totalPage = (totalRecords + pageSize - 1) / pageSize;
        map.put("totalRecords", totalRecords);
        map.put("currpage", currpage);
        map.put("totalPage", totalPage);
        map.put("pageSize", pageSize);
        // ????????????select???
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        map.put("pageArray", pageArray);
        map.put("projectTitle", projectTitle);
        return "exam/testGradingList";
    }


    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2017???10???17???
     **************************************************************************/
    /*@RequestMapping("/showTestGrading")
    @ResponseBody
    public Object showTestGrading(HttpServletRequest request, @RequestParam Integer examId, Integer page, Integer limit, Map<String, Object> map) {
        UserVo userVo = this.getCurrUser();
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        //??????????????????
        List<LayuiDataVo> examGradingList = examGradingService.findExamGradingList(examId, userVo, page, limit,authorityName);
        LayuiTableVo layuiTableVo = new LayuiTableVo();
        layuiTableVo.setCode(0);
        layuiTableVo.setMsg("");
        //??????????????????
        layuiTableVo.setCount(examGradingList.size());
        layuiTableVo.setData(examGradingList);
        return layuiTableVo;
    }*/

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ?????????
     * @date 2017???8???27???
     **************************************************************************/
    @RequestMapping("/showTestResult")
    public String showTestResult(HttpServletRequest request, @RequestParam Integer examId, Map<String, Object> map) {
        UserVo userVo = this.getCurrUser();
        ExamResultVo examResult = examDetailService.getExamResult(examId, userVo);
        map.put("examResult", examResult);
        map.put("projectTitle", projectTitle);
        return "exam/testResult";
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
     * Description:??????-??????????????????
     * @throws IOException
     *
     * @author????????????
     * @date ???2017-3-20
     **************************************************************************/
    @RequestMapping("/saveMarkingImage")
    @ResponseBody
    public String saveMarkingImage(@RequestParam String imageString, Integer gradingId,
                                   Integer page) {
        String result = examDetailService.saveMarkingImage(pdfDirector, gradingId, page, imageString);

        return result;
    }

    /**************************************************************************
     * Description:????????????pdf
     * @throws IOException
     *
     * @author????????????
     * @date ???2017-3-8
     **************************************************************************/
    @RequestMapping("/submitMarking")
    public String submitMarking(@RequestParam Integer gradingId, HttpServletRequest request, Integer page) throws Exception {
        //??????????????????
        Object cid = request.getSession().getAttribute("cid");
        Integer siteId = Integer.parseInt(cid.toString());
        String resourceFile = examDetailService.submitMarking(pdfDirector, gradingId, siteId, resourceContainerHost, getCurrUser(), page);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(resourceFile);
        String path = "redirect:" + jsonNode.get("url").asText();
        return path;
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
        //?????????????????????????????????0;
        List<ExamDetailsVO> examDetailsVOList = examDetailService.findTestDetail(examId, username,0, currpage, pageSize,1,null);
        return examDetailsVOList;
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
     * Description ????????????
     *
     * @author ?????????
     * @date 2019???3???11???
     **************************************************************************/
    @RequestMapping("/listMyInfo")
    public String listMyInfo(HttpServletRequest request, Map<String, Object> map, String userName) {
        //??????????????????
        UserVo userInfoVO = examListService.findUserByUserName(userName);
        map.put("userInfo", userInfoVO);
        map.put("userName", userName);
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
        return "exam/listMyInfo";
    }

    /**************************************************************************
     * Description ??????????????????
     *
     * @author ?????????
     * @date 2019???3???12???
     **************************************************************************/
    @RequestMapping("/editMyInfo")
    public String editMyInfo(HttpServletRequest request, Map<String, Object> map, String userName, Integer flag) {
        //??????????????????
        UserVo userVo = examListService.findUserByUserName(userName);
        map.put("userVo", userVo);
        map.put("userName", userName);
        //????????????
        List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllAcademys();
        map.put("schoolAcademyVoList", schoolAcademyVoList);
        map.put("uploadFileHost", uploadFileHost);
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        map.put("flag", flag);
        return "exam/editMyInfo";
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
        return "redirect:/exam/listMyInfo?userName=" + userVo.getUsername();
    }

    /**************************************************************************
     * Description ????????????--??????????????????
     *
     * @author ??????
     * @date 2018???3???27???
     **************************************************************************/
    @RequestMapping("/saveMyInfoPhoto")
    public String saveMyInfoPhoto(String fileid, String userName) {
        //??????????????????
        UserVo userVo = examListService.findUserByUserName(userName);
        examListService.saveMyInfoPhoto(userVo, fileid);
        return "redirect:/exam/listMyInfo?userName=" + userName;
    }

    /**************************************************************************
     *Description ????????????-????????????(????????????)
     * @author ?????????
     * @date 2019???3???19???
     * **************************************************************************/
    @RequestMapping("/deleteMyInfoPhoto")
    public String deleteMyInfoPhoto(String username) {
        examListService.deleteImg(username);
        return "redirect:/exam/listMyInfo?userName=" + username;
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     *@author ?????????
     * @date 2019???3???12???
     **************************************************************************/
    @RequestMapping("/userList")
    public String userList(Integer currpage, HttpServletRequest request, Map<String, Object> map) {
        //?????????????????????
        UserVo userVo = this.getCurrUser();
        map.put("userName", userVo.getUsername());
        //????????????20???
        Integer pageSize = 20;
        //?????????
        if (currpage == null) {
            currpage = 1;
        }
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        //????????????
        String username = request.getParameter("username");
        map.put("username", username);
        //????????????
        String cname = request.getParameter("cname");
        map.put("cname", cname);
        //??????????????????
        List<UserVo> studentList = examListService.findAllStudent(username, cname, currpage);
        //????????????????????????
        Integer totalRecords = examListService.countStudentList(username, cname);
        //??????
        int totalPage = (totalRecords + pageSize - 1) / pageSize;
        map.put("totalRecords", totalRecords);
        map.put("currpage", currpage);
        map.put("totalPage", totalPage);
        // ????????????select???
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }

        map.put("pageArray", pageArray);
        map.put("studentList", studentList);
        map.put("projectTitle", projectTitle);
        return "exam/userList";
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
        return "exam/certificateDetail";
    }

    /**************************************************************************
     * Description ??????????????????
     *
     * @author ?????????
     * @date 2019???3???14???
     **************************************************************************/
    @RequestMapping("/editCertificate")
    public String editCertificate(HttpServletRequest request, Map<String, Object> map, String projectName) {
        //??????????????????
        SchoolVo schoolVo = examListService.findSchoolByProjectName(projectName);
        map.put("schoolVo", schoolVo);
        //??????????????????????????????
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        map.put("uploadFileHost", uploadFileHost);
        return "exam/editCertificate";
    }

    /**************************************************************************
     * Description ????????????--????????????????????????
     *
     * @author ?????????
     * @date 2019???3???18???
     **************************************************************************/
    @RequestMapping("/saveSchoolPhoto")
    public String saveSchoolPhoto(String fileid) {
        //??????????????????
        SchoolVo schoolVo = examListService.findSchoolByProjectName(projectName);
        examListService.saveSchoolPhoto(schoolVo, fileid);
        return "redirect:/exam/certificateDetail";
    }

    /**************************************************************************
     * Description ??????????????????
     *
     * @author ?????????
     * @date 2019???3???14???
     **************************************************************************/
    @RequestMapping("/saveCertificate")
    public String saveCertificate(@ModelAttribute SchoolVo schoolVo) {
        examListService.saveCertificate(schoolVo, projectName);
        return "redirect:/exam/certificateDetail";
    }

    /**************************************************************************
     *Description ????????????-????????????
     * @author ?????????
     * @date 2019???3???19???
     * **************************************************************************/
    @RequestMapping("/deleteSchoolPhoto")
    public String deleteSchoolPhoto(String projectName) {
        examListService.deleteSchoolImg(projectName);
        return "redirect:/exam/certificateDetail";
    }

    /**************************************************************************
     *Description ????????????
     * @author ??????
     * @date 2019???8???29???
     * **************************************************************************/
    @RequestMapping("/siteList")
    public String siteList(HttpServletRequest request, Map<String, Object> map) {
        List<TCourseSiteVo> tCourseSiteVoList = examListService.findAllSite("");
        map.put("siteList", tCourseSiteVoList);
        map.put("projectName", projectName);
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        return "exam/siteList";
    }

    /**************************************************************************
     *Description ????????????
     * @author ??????
     * @date 2019???8???29???
     * **************************************************************************/
    @RequestMapping("/termList")
    public String termList(HttpServletRequest request, Map<String, Object> map) {
        List<SchoolTermVO> schoolTermVOList = examListService.findAllSchoolTerm();
        map.put("termList", schoolTermVOList);
        map.put("projectName", projectName);
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        return "exam/termList";
    }

    /**************************************************************************
     *Description ????????????
     * @author ??????
     * @date 2019???8???29???
     * **************************************************************************/
    @RequestMapping("/newTerm")
    public String newTerm(HttpServletRequest request, Map<String, Object> map) {
        map.put("schoolTermVO", new SchoolTermVO());
        return "exam/editTerm";
    }

    /**************************************************************************
     *Description ????????????
     * @author ??????
     * @date 2019???8???29???
     * **************************************************************************/
    @RequestMapping("/saveTerm")
    public String saveTerm(SchoolTermVO schoolTermVO) throws Exception {
        examListService.saveSchoolTerm(schoolTermVO);
        return "redirect:/exam/termList";
    }

    /**************************************************************************
     *Description ????????????
     * @author ??????
     * @date 2019???8???29???
     * **************************************************************************/
    @RequestMapping("/newSite")
    public String newSite(HttpServletRequest request, Map<String, Object> map) {
        //??????????????????
        List<SchoolTermVO> schoolTermVOList = examListService.findAllSchoolTerm();
        //??????????????????
        List<UserVo> teacherList = examListService.findAllTeacherByAuthor();
        map.put("schoolList", schoolTermVOList);
        map.put("teacherList", teacherList);
        map.put("tCourseSiteVO", new TCourseSiteVo());
        return "exam/editSite";
    }

    /**************************************************************************
     *Description ????????????
     * @author ??????
     * @date 2019???8???29???
     * **************************************************************************/
    @RequestMapping("/saveSite")
    public String saveSite(TCourseSiteVo tCourseSiteVo) {
        examListService.saveTCourseSite(tCourseSiteVo);
        return "redirect:/exam/termList";
    }

    /**************************************************************************
     *Description ????????????
     * @author ??????
     * @date 2019???8???29???
     * **************************************************************************/
    @RequestMapping("/editTerm")
    public String editTerm(HttpServletRequest request, Map<String, Object> map, Integer termId) {
        SchoolTermVO schoolTermVO = examListService.findSchoolTermById(termId);
        map.put("schoolTermVO", schoolTermVO);
        return "exam/editTerm";
    }

    /**************************************************************************
     *Description ????????????
     * @author ??????
     * @date 2019???8???29???
     * **************************************************************************/
    @RequestMapping("/editSite")
    public String editSite(HttpServletRequest request, Map<String, Object> map, Integer siteId) {
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(siteId);
        //??????????????????
        List<SchoolTermVO> schoolTermVOList = examListService.findAllSchoolTerm();
        //??????????????????
        List<UserVo> teacherList = examListService.findAllTeacherByAuthor();
        map.put("schoolList", schoolTermVOList);
        map.put("teacherList", teacherList);
        map.put("tCourseSiteVO", tCourseSiteVo);
        return "exam/editSite";
    }
}
