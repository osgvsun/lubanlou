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
     * Description 考试模块-考试入口
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
//    @RequestMapping("/exam")
//    public String exam(HttpServletRequest request, Map<String, Object> map) throws Exception {
//        //获取当前用户
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
//        //获取当前登录人的权限
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
     * Description 考试模块-查看考试列表
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
//    @RequestMapping("/examList")
//    public String examList(HttpServletRequest request, Map<String, Object> map, Integer tCourseSiteId) throws Exception {
//        //角色判断：1:如果具有老师权限且为该课程的创建者或者助教则默认为老师，0:如果没有教师权限则默认为学生
//        UserVo currUser = getCurrUser();
//        String classNumber = currUser.getClassNumber();
//        map.put("classNumber", classNumber);
//        map.put("userName", getCurrUser().getUsername());
//        map.put("projectTitle", projectTitle);
//        //获取站点
//        if (tCourseSiteId != null) {
//            //如果有传入tCourseSiteId则用传入id
//            request.getSession().setAttribute("cid", tCourseSiteId.intValue());
//            List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite();
//            request.getSession().setAttribute("siteList", allTCourseSite);
//            map.put("allTCourseSite", allTCourseSite);
//        }
//
//        Object cidO = request.getSession().getAttribute("cid");
//        Integer cid = Integer.parseInt(cidO.toString());
//
//        //获取当前登录人的权限
//        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
//        List<ExamListVo> examListDtos = examListService.findExamList(cid, currUser, authorityName, "exam",1);
//        map.put("examList", examListDtos);
//        map.put("projectName", projectName);
//        map.put("authorityName", authorityName);
//        map.put("today", new Date());
//        return "exam/examList";
//    }

    /**************************************************************************
     * Description 考试模块-查看补考名单
     *
     * @author 洪春莹
     * @date 2018-12-14
     **************************************************************************/
    @RequestMapping("/makeupExamStudentList")
    public String makeupExamStudentList(HttpServletRequest request, Map<String, Object> map, Integer examId,Integer siteId) {
        //获取补考名单
        List<TAssignmentGradingVO> tAssignmentGradingVOList = examListService.makeupExamStudentList(examId,siteId);
        map.put("tAssignmentGradingVOList", tAssignmentGradingVOList);
        map.put("projectTitle", projectTitle);
        map.put("projectName", projectName);
        map.put("examId", examId);
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        return "exam/makeupExamStudentList";
    }

    /**************************************************************************
     * Description 考试模块-查询学生列表
     *
     *@author 洪春莹
     * @date 2018年12月17日
     **************************************************************************/
    @RequestMapping("/studentList")
    public String studentList(Integer currpage, HttpServletRequest request, Map<String, Object> map, Integer examId) {
        //每页数据20条
        Integer pageSize = 20;
        //当前页
        if (currpage == null) {
            currpage = 1;
        }
        //获取学号
        String username = request.getParameter("username");
        map.put("username", username);
        //获取姓名
        String cname = request.getParameter("cname");
        map.put("cname", cname);
        //获取站点学生
        List<UserVo> studentList = examListService.findAllStudent(username, cname, currpage);
        //获取站点学生数量
        Integer totalRecords = examListService.countStudentList(username, cname);
        //Integer totalRecords=studentList.size();
        //总页
        int totalPage = (totalRecords + pageSize - 1) / pageSize;
        map.put("totalRecords", totalRecords);
        map.put("currpage", currpage);
        map.put("totalPage", totalPage);
        // 后台分页select框
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }

        map.put("examId", examId);
        map.put("pageArray", pageArray);
        map.put("studentList", studentList);
        map.put("projectTitle", projectTitle);
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        return "exam/newStudentToExam";
    }

    /**************************************************************************
     * Description:保存补考添加的学生
     * @author 洪春莹
     * @date 2018年12月17日
     **************************************************************************/
    @RequestMapping("/addStudentToExam")
    public String addStudentToExam(HttpServletRequest request, Integer examId) {
        //需要添加的学生存入数组内
        String[] usernames = request.getParameter("addStudentList").split(",");
        //保存添加的学生
        examListService.saveStudentToExam(examId, usernames);
        return "redirect:/exam/makeupExamStudentList?examId=" + examId;
    }


    /**************************************************************************
     * Description 考试模块-查看已提交考试的成绩列表
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
    @RequestMapping("/examGradingList")
    public String examGradingList(HttpServletRequest request, Map<String, Object> map) throws Exception {
        map.put("projectTitle", projectTitle);
        return "exam/examGradingList";
    }

    /**************************************************************************
     * Description 考试模块-查看学生答题详情
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
    @RequestMapping("/assignmentItemMappingList")
    public String findTestDetailByGradingId(HttpServletRequest request, Integer assignGradingId, Map<String, Object> map) {
        map.put("projectTitle", projectTitle);
        return "exam/assignmentItemMappingList";
    }

    /**************************************************************************
     * Description 考试模块-新增编辑考试
     *
     * @author 魏诚
     * @date 2017-08-09
     * @author 陈敬（修改）2018年12月17日
     **************************************************************************/
    @RequestMapping("/editExam")
    public String editExam(HttpServletRequest request, Map<String, Object> map, Integer cid, String fromTeach, Integer assignmentId, Integer moduleType) throws Exception {
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
        //获取考试
        //Integer assignmentId = request.getParameter("assignmentId") != null ? Integer.valueOf(request.getParameter("assignmentId")) : null;
        List<EditExamTAssignmentComponentVo> editExamTAssignmentComponentVoList = tAssignmentService.findTAssCompVoList(assignmentId);
        map.put("tAssignment", editExamTAssignmentComponentVoList);
        //新建页面参数保存VO对象
        EditTestVo editTestVo = new EditTestVo();
        if (assignmentId != null) {
            editTestVo = tAssignmentService.findEditTestVoById(assignmentId, projectName);
            if (moduleType == null) {
                moduleType = editTestVo.getTestChapterType();
            }
        }
        map.put("editTestVo", editTestVo);
        map.put("projectTitle", projectTitle);
        //获取课程网站信息
        //获取站点
        Object cidO = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cidO.toString());
        // Integer tCourseSiteId = 50;//暂时写死，等待后面模块完成
        map.put("tCourseSiteId", tCourseSiteId);
        map.put("today", new Date());
        map.put("projectName", projectName);
        if (projectName.equals("proteach")) {
            //获取wkChapters
            List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTCourseSiteIdAndModuleType(tCourseSiteId, moduleType);
            map.put("wkChapters", wkChapterDtoList);
        }
        //获取学院（只显示有可以考试的班级的学院）
        //List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllAcademys();
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
        List<ExamSubScribeVo> subScribeExamList = examSubScribeService.getSubScribeExamList(user.getUsername());
        map.put("subScribeExamList", subScribeExamList);
        //存放题库的信息
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        //获取所有试卷库分类
        List<QuestionpoolCategoryVo> questionpoolCategoryVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpoolCategory();
        map.put("questionpoolCategory", questionpoolCategoryVoList);
        //获取所有试卷库
        List<ExamQuestionpoolVo> examQuestionpoolVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpool();
        map.put("examQuestionpool", examQuestionpoolVoList);
        map.put("fromTeach", fromTeach);
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        return "exam/editExam";
    }

    /**************************************************************************
     * Description 考试模块-新增编辑考试-根据学院动态获取班级
     *
     * @author 洪春莹
     * @date 2018-12-05
     **************************************************************************/
    @RequestMapping("/findAllClasses")
    @ResponseBody
    public List<SchoolClassesVo> findAllClasses(Map<String, Object> map, String schoolAcademy) {
        map.put("projectTitle", projectTitle);
        //根据学院获取班级
        List<SchoolClassesVo> schoolClassesVoList = wkChapterService.findAllClassesByAcademyNumber(schoolAcademy);
        return schoolClassesVoList;
    }

    /**************************************************************************
     * Description 考试模块-查看考试
     *
     * @author 刘博越
     * @date 2019年5月17日
     **************************************************************************/
//    @RequestMapping("/viewExam")
//    public String viewExam(HttpServletRequest request, Map<String, Object> map, String fromTeach, Integer examId, Integer moduleType) throws Exception {
//        //获取登录用户信息
//        UserVo user = getCurrUser();
//        map.put("user", user);
//        //获取考试
//        //Integer assignmentId = request.getParameter("assignmentId") != null ? Integer.valueOf(request.getParameter("assignmentId")) : null;
//        List<EditExamTAssignmentComponentVo> editExamTAssignmentComponentVoList = tAssignmentService.findTAssCompVoList(examId);
//        map.put("tAssignment", editExamTAssignmentComponentVoList);
//        //新建页面参数保存VO对象
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
//        //获取当前登录人的权限
//        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
//        map.put("authorityName", authorityName);
//        return "exam/viewExam";
//    }

    /**************************************************************************
     * Description 检查各个章中内容的标题是否重复
     *
     * @author 徐烺
     * @date 2018-09-05
     **************************************************************************/
    @RequestMapping("/checkAssignmentTitle")
    @ResponseBody
    public String checkAssignmentTitle(HttpServletRequest request, @RequestParam String title, Integer id, Integer type, boolean isChapter) {
//        Object cidO = request.getSession().getAttribute("cid");
//        //Session过期后，登出
//        if (cidO==null){
//            return "redirect:/teach/tosignout";
//        }
//        Integer cid2 =Integer.parseInt(cidO.toString());
        return examSubScribeService.checkTitle(title, id, type, isChapter);
    }

    /**************************************************************************
     * Description 考试模块-修改编辑考试
     *
     * @author 张佳鸣
     * @date 2017-12-18
     **************************************************************************/
    @RequestMapping("/modifyExam")
    public String modifyExam(HttpServletRequest request, @RequestParam Integer assignmentId, Map<String, Object> map) {
        //获取登录用户信息
        UserVo user = getCurrUser();
        map.put("user", user);
        //获取查看考试VO对象
        EditTestVo editTestVo = tAssignmentService.findEditTestVoById(assignmentId, projectName);
        map.put("editTestVo", editTestVo);
        //
        List<EditExamTAssignmentComponentVo> editExamTAssignmentComponentVoList = tAssignmentService.findTAssCompVoList(assignmentId);
        map.put("tAssignment", editExamTAssignmentComponentVoList);
        //获取课程网站信息
        //获取站点
        Object cidO = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cidO.toString());
        map.put("tCourseSiteId", tCourseSiteId);
        map.put("today", new Date());
        //获取wkChapters
        List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTCourseSiteId(tCourseSiteId);
        map.put("wkChapters", wkChapterDtoList);
        //设置知识技能体验
        Integer moduleType = 1;//暂时写死
        map.put("moduleType", moduleType);
        //selectId
        map.put("selectId", -1);
        //获取以发布的预约考试
        List<ExamSubScribeVo> subScribeExamList = examSubScribeService.getSubScribeExamList(user);
        map.put("subScribeExamList", subScribeExamList);
        //存放题库的信息
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        //获取所有试卷库分类
        List<QuestionpoolCategoryVo> questionpoolCategoryVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpoolCategory();
        map.put("questionpoolCategory", questionpoolCategoryVoList);
        //获取所有试卷库
        List<ExamQuestionpoolVo> examQuestionpoolVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpool();
        map.put("examQuestionpool", examQuestionpoolVoList);
        map.put("projectTitle", projectTitle);
        return "exam/editExam";
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

    /*    *//**************************************************************************
     * Description 考试模块-修改编辑考试，根据试卷库查找试卷库分类
     *
     * @author 张佳鸣
     * @date 2018-01-09
     **************************************************************************//*
    @RequestMapping("/findExamQuestionpoolCategory")
    public @ResponseBody Map<Integer,String> findExamQuestionpoolCategory(@RequestParam Integer examQuestionpoolId){
        Map map = new HashMap();

        return map;
    }*/

    /**************************************************************************
     * Description 考试模块-删除考试
     *
     * @author 张佳鸣
     * @date 2017年12月15日
     **************************************************************************/
    @RequestMapping("/deleteExam")
    public String deleteExam(@RequestParam Integer tAssignmentId) {
        //删除考试文件夹wkFolder及相关的考试tAssignment数据
        tAssignmentService.deleteExam(tAssignmentId);
        if (projectName.equals("ycteach")) {
            return "redirect:/exam/ycexamList";
        } else {
            return "redirect:/exam/examList";
        }
    }

    /**************************************************************************
     * Description 考试模块-删除测试
     *
     * @author 洪春莹
     * @date 2018年11月16日
     **************************************************************************/
    @RequestMapping("/deleteTest")
    public String deleteTest(@RequestParam Integer tAssignmentId) {
        //删除考试文件夹wkFolder及相关的考试tAssignment数据
        tAssignmentService.deleteExam(tAssignmentId);
        return "redirect:/exam/testList";
    }

    /**************************************************************************
     * @Description: 知识技能体验-ajax根据type获取章节
     * @Author: 罗璇
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
     * @Description: 根据题库id，题目类型来获取题库该类题目总数
     * @Author: 罗璇
     * @Date: 2017/10/9 21:55
     **************************************************************************/
    @ResponseBody
    @RequestMapping("/question/getItemCount")
    public Map<String, String> getItemCount(Integer questionpoolId, String type) {
        return tAssignmentQuestionPoolService.getItemCountStr(questionpoolId, type);
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
    @RequestMapping("/saveTest")
    public String saveTest(String fromTeach, HttpServletRequest request, Map<String, Object> map) {
        //获取当前站点
        Object cid = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cid.toString());
        //获取当前用户
        String currUsername = getCurrUser().getUsername();
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
        String[] schoolClasses = Util.isEmpty(request.getParameter("schoolClass")) ? tAssignmentService.findAllClassByAcademyId(request.getParameter("schoolAcademy")) : request.getParameterValues("schoolClass");
        //是否为补考
        String isMakeUpExam = Util.isEmpty(request.getParameter("isMakeUpExam")) ? null : request.getParameter("isMakeUpExam");
        //补考原考试id
        Integer oldAssignmentId = Util.isEmpty(request.getParameter("oldAssignmentId")) ? null : Integer.valueOf(request.getParameter("oldAssignmentId"));
        //开始时间
        Date startdateTest = Util.isEmpty(request.getParameter("startdateTest")) ? null : Util.parseToDate(request.getParameter("startdateTest"));
        //结束时间
        Date duedateTest = Util.isEmpty(request.getParameter("duedateTest")) ? null : Util.parseToDate(request.getParameter("duedateTest"));
        //考试布置人
        String username = currUsername;
        //考试分值
        Double testScoreTest = Util.isEmpty(request.getParameter("testScoreTest")) ? null : Double.valueOf(request.getParameter("testScoreTest"));
        //及格分值
        Double passingScore = Util.isEmpty(request.getParameter("passingScore")) ? null : Double.valueOf(request.getParameter("passingScore"));
        //考试时间
        Integer mins = Util.isEmpty(request.getParameter("mins")) ? null : Integer.valueOf(request.getParameter("mins"));
        //提交次数(编辑时保存次数)
        //Integer timelimitOneTest = Util.isEmpty(request.getParameter("timelimitOneTest")) ? null : Integer.valueOf(request.getParameter("timelimitOneTest"));
        Integer timelimitOneTest = Util.isEmpty(request.getParameter("customTime")) ? 1 : Integer.valueOf(request.getParameter("customTime"));
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
        //考试类型
        String type = request.getParameter("type");
        //所属站点id
        Integer siteId = Util.isEmpty(request.getParameter("siteId")) ? null : Integer.valueOf(request.getParameter("siteId"));
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
//        if (Integer.parseInt(testNeedSubScribe) != -1) {
//            //是来自预约考试
//            String subScribeExamIdForString = request.getParameter("subScribeExamId");
//            //再判断预约考试是否为空
//            if (subScribeExamIdForString != null) {
//                subScribeExamId = Integer.parseInt(subScribeExamIdForString);
//            }
//        }
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
        //保存考试方法
        Integer newTAssignmentId = tAssignmentService.saveTest(editTestVo, currUsername, tCourseSiteId, projectName);
        //根据考试创建成绩册
        tAssignmentService.createGradebook(tCourseSiteId, newTAssignmentId, testChapterType, testWkChapterId);
        map.put("fromTeach", fromTeach);
        map.put("status", editTestVo.getStatus());
        //保存数据到考试班级关系表
        if ("0".equals(isMakeUpExam) && !"*000".equals(schoolAcademy)) {
            tAssignmentService.saveTAssignmentClass(newTAssignmentId, schoolClasses);
        }
        map.put("projectTitle", projectTitle);
        map.put("projectName", projectName);
        return "exam/addExamResult";
    }

    /**************************************************************************
     * Description 考试模块-开始考试
     *
     * @author lixueteng
     * @date 2017年8月27日
     **************************************************************************/
    @RequestMapping("/startExam")
    public String startExam(@RequestParam int examId, Integer simulation,
                            String fromTeach) {
        UserVo user = this.getCurrUser();
        //创建考卷
        Integer examPaperId = examDetailService.createExamPaper(examId, user.getUsername());
        // 将下面方法放到上面方法会导致报错，目前怀疑dubbo的问题，没有查出具体原因
        examPaperId = examDetailService.createRandomExam(examPaperId, examId, user.getUsername());
        return "redirect:/exam/beginExam?examId=" + examPaperId + "&simulation=" + simulation + "&page=1&fromTeach=" + fromTeach;
    }

    /**************************************************************************
     * Description 考试模块-开始考试
     *
     * @author lixueteng
     * @date 2017年8月27日
     **************************************************************************/
    @RequestMapping("/beginExam")
    public String beginExam(@RequestParam int examId, Integer simulation,
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
        return "exam/startExam";
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
        // 获取考试成绩
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
            return "此次考试：" + examResult.getTitle() + "\n您所得分：" + examResult.getScore() + "分\n此考试不限制提交次数";
        } else {
            return "此次考试：" + examResult.getTitle() + "\n您所得分：" + examResult.getScore() + "分\n还剩" + examResult.getRemainSubmitTime() + "次机会";
        }
    }

    /**************************************************************************
     * Description 考试模块-考试成绩列表
     *
     * @author 罗璇
     * @date 2017年8月27日
     **************************************************************************/
    @RequestMapping("/viewExamScore")
    public String viewExamScore(HttpServletRequest request, Map<String, Object> map) throws Exception {
        UserVo userVo = getCurrUser();
        //站点id 默认50
        Object cid1 = request.getSession().getAttribute("cid");
        Integer cid = Integer.parseInt(cid1.toString());
        //获取当前站点下面的考试列表
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        List<ExamListVo> examList = examListService.findExamList(cid, userVo, authorityName, "exam",1);
        map.put("examList", examList);
        map.put("projectName", projectName);
        map.put("projectTitle", projectTitle);
        return "exam/viewExamScore";
    }

    /**************************************************************************
     * Description 考试模块-未参加考试列表
     *
     * @author 刘博越
     * @date 2019年6月3日
     **************************************************************************/
    @RequestMapping("/showNotTakeExamPage")
    public String showNotTakeExamPage(HttpServletRequest request, @RequestParam Integer examId, Integer currpage, Map<String, Object> map) {
        //获取当前站点
        Object cid = request.getSession().getAttribute("cid");
        Integer cid2 = Integer.parseInt(cid.toString());
        //每页数据20条
        Integer pageSize = 20;
        //当前页
        if (currpage == null) {
            currpage = 1;
        }
        UserVo userVo = this.getCurrUser();
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        //学生成绩集合
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
        //获取下载次数管理列表数量
        Integer totalRecords = examListService.countNotTakeExamList(examId,null,cid2);
        //总页
        int totalPage = (totalRecords + pageSize - 1) / pageSize;
        map.put("totalRecords", totalRecords);
        map.put("currpage", currpage);
        map.put("totalPage", totalPage);
        map.put("pageSize", pageSize);
        // 后台分页select框
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        map.put("pageArray", pageArray);
        map.put("projectTitle", projectTitle);
        return "exam/notTakeExamList";
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

    /**************************************************************************
     * Description 考试模块-考试结果
     *
     * @author 李雪腾
     * @date 2017年8月27日
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
     * Description 考试模块-显示考试成绩
     *
     * @author 李雪腾
     * @date 2017年10月17日
     **************************************************************************/
    @RequestMapping("/showExamGradingPage")
    public String showExamGradingPage(HttpServletRequest request, @RequestParam Integer examId, Integer currpage, Map<String, Object> map,Integer siteId,String username) {
        //每页数据20条
        Integer pageSize = 20;
        //当前页
        if (currpage == null) {
            currpage = 1;
        }
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        //学生成绩集合
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
        //获取下载次数管理列表数量
        int totalRecords = examGradingService.countExamGradingList(examId, username, authorityName,null);
        //总页
        int totalPage = (totalRecords + pageSize - 1) / pageSize;
        map.put("totalRecords", totalRecords);
        map.put("currpage", currpage);
        map.put("totalPage", totalPage);
        map.put("pageSize", pageSize);
        // 后台分页select框
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        map.put("pageArray", pageArray);
        map.put("projectTitle", projectTitle);
        return "exam/examGradingList";
    }


    /**************************************************************************
     * Description 考试模块-显示考试成绩
     *
     * @author 李雪腾
     * @date 2017年10月17日
     **************************************************************************/
    /*@RequestMapping("/showExamGrading")
    @ResponseBody
    public Object showExamGrading(HttpServletRequest request, @RequestParam Integer examId, Integer page, Integer limit, Map<String, Object> map) {
        UserVo userVo = this.getCurrUser();
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        //学生成绩集合
        List<LayuiDataVo> examGradingList = examGradingService.findExamGradingList(examId, userVo, page, limit,authorityName);
        LayuiTableVo layuiTableVo = new LayuiTableVo();
        layuiTableVo.setCode(0);
        layuiTableVo.setMsg("");
        //成绩的总条数
        layuiTableVo.setCount(examGradingList.size());
        layuiTableVo.setData(examGradingList);
        return layuiTableVo;
    }*/

    /**************************************************************************
     * Description 考试模块-新增考试预约
     *
     * @author 李雪腾
     * @date 2017年10月19日
     **************************************************************************/
    @RequestMapping("/subscribeExam")
    public String subscribeExam(HttpServletRequest request, Map<String, Object> map) {
        return "exam/subscribeExam";
    }

    /**************************************************************************
     * Description 考试模块-保存预约考试
     *
     * @author 李雪腾
     * @date 2017年10月24日
     **************************************************************************/
    @RequestMapping("/saveSubscribeExam")
    public String saveSubscribeExam(HttpServletRequest request, Map<String, Object> map) {
        //获取当前登录人
        UserVo userVo = getCurrUser();
        //预约考试标题
        String title = request.getParameter("subscribeExamTitle");
        //预约考试描述
        String description = request.getParameter("subscribeExamDes");
        //预约考试的开始时间
        String startDate = request.getParameter("startdateSubscribeExam");
        //预约考试的截止时间
        String endDate = request.getParameter("duedateSubscribeExam");
        //预约考试的人数限制
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
     * Description 考试模块-预约考试列表
     *
     * @author 李雪腾
     * @date 2017年10月24日
     **************************************************************************/
    @RequestMapping("/subscribeExamList")
    public String subscribeExamList(HttpServletRequest request, Map<String, Object> map) {
        return "exam/examAppointment";
    }

    /**************************************************************************
     * Description 考试模块-查看考试详情
     *
     * @author 洪春莹
     * @date 2018年11月20日
     **************************************************************************/
    @RequestMapping("/viewTestDetails")
    public String viewTestDetails(Integer examId, String username, Integer gradingId, HttpServletRequest request, Map<String, Object> map, Integer currpage) {
        //获取测试信息
        TAssignmentsVO tAssignmentsVO = examDetailService.findExamById(examId, username, gradingId);
        map.put("exam", tAssignmentsVO);
        Integer pageSize = 10;
        //当前页
        if (currpage == null) {
            currpage = 1;
        }
        List<ExamDetailsVO> examDetailsVOList = examDetailService.findTestDetail(examId, username,gradingId, currpage, pageSize,1,null);
        map.put("examDetailVOList", examDetailsVOList);
        List<Map> tAssignmentItemMapping = examDetailService.findTestDetailMapping(examId, username);
        map.put("recordMap", tAssignmentItemMapping.get(0));
        map.put("examId", examId);
        map.put("username", username);
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        Integer totalRecords = examDetailService.countTestamDetail(examId,gradingId, username,1,null);
        int totalPage;
        //总页数
        if (totalRecords == 0) {
            totalPage = 1;
        } else {
            //总页数
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
     * Description 考试模块-查看测试详情
     *
     * @author 洪春莹
     * @date 2018年11月23日
     **************************************************************************/
    @RequestMapping("/viewExamDetails")
    public String viewExamDetails(Integer examId, String username, Integer gradingId, HttpServletRequest request, Map<String, Object> map, Integer currpage) {
        Integer pageSize = 10;
        //当前页
        if (currpage == null) {
            currpage = 1;
        }
        //获取测试信息
        TAssignmentsVO tAssignmentsVO = examDetailService.findExamById(examId, username, gradingId);
        map.put("exam", tAssignmentsVO);
        List<ExamDetailsVO> examDetailsVOList = examDetailService.findExamDetail(examId, username, gradingId, currpage, pageSize,0);
        map.put("examDetailVOList", examDetailsVOList);
        List<Map> tAssignmentItemMapping = examDetailService.findExamDetailMapping(examId, username, gradingId);
        map.put("recordMap", tAssignmentItemMapping.get(0));
        Integer totalRecords = examDetailService.countExamDetail(examId,0);
        int totalPage;
        //总页数
        if (totalRecords == 0) {
            totalPage = 1;
        } else {
            //总页数
            totalPage = (totalRecords + pageSize - 1) / pageSize;
        }
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        //获取当前登录人的权限
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
     * Description 考试模块-考试预约
     *
     * @author 李雪腾
     * @date 2017年10月25日
     **************************************************************************/
    @RequestMapping("/examAppointment")
    public String examAppointment(HttpServletRequest request, Map<String, Object> map) {
        //获取当前登录人
        UserVo userVo = getCurrUser();
        //获取所有的预约考试
        List<ExamSubScribeVo> subScribeExamList = examSubScribeService.getSubScribeExamList(userVo);
        map.put("subScribeExamList", subScribeExamList);
        //获取当前登录人的权限 目前是默认学生身份
        map.put("flag", 1);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getAuthorities().iterator().next().toString());
        map.put("projectTitle", projectTitle);
        return "exam/examAppointment";
    }

    /**************************************************************************
     * Description 考试模块-获取当前预约考试的已经预约的人数获得id
     *
     * @author 李雪腾
     * @date 2017年10月26日
     **************************************************************************/
    @RequestMapping("/alreadySubScribeStudentId")
    public String alreadySubScribeStudentId(HttpServletRequest request, @RequestParam Integer subScribeExamId, Map<String, Object> map) {
        map.put("subScribeExamId", subScribeExamId);
        return "exam/alreadySubScribe";
    }

    /**************************************************************************
     * Description 考试模块-获取当前预约考试的已经预约的人数详情
     *
     * @author 李雪腾
     * @date 2017年10月25日
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
     * Description 考试模块-点击预约考试
     *
     * @author 李雪腾
     * @date 2017年10月26日
     **************************************************************************/
    @RequestMapping("/startSubScribeExam")
    public String startSubScribeExam(HttpServletRequest request, @RequestParam Integer subScribeExamId, Map<String, Object> map) {
        UserVo userVo = getCurrUser();
        examSubScribeService.startSubScribeExam(subScribeExamId, userVo);
        map.put("subScribeExamId", subScribeExamId);
        return "redirect:/exam/examAppointment";
    }

    /**************************************************************************
     * Description 考试模块-取消预约考试
     *
     * @author 李雪腾
     * @date 2017年10月26日
     **************************************************************************/
    @RequestMapping("/cancelSubScribeExam")
    public String cancelSubScribeExam(HttpServletRequest request, @RequestParam Integer subScribeExamId, Map<String, Object> map) {
        UserVo userVo = getCurrUser();
        examSubScribeService.cancelSubScribeExam(subScribeExamId, userVo);
        return "redirect:/exam/examAppointment";
    }

    /**************************************************************************
     * Description 考试模块-查询是否还有预约名额
     *
     * @author 李雪腾
     * @date 2017年10月31日
     **************************************************************************/
    @RequestMapping("/isHaveAssignedForExam")
    @ResponseBody
    public boolean isHaveAssignedForExam(HttpServletRequest request, @RequestParam Integer subScribeExamId, Map<String, Object> map) {
        boolean isRest = examSubScribeService.setSubScribeExamStatus(subScribeExamId);
        return isRest;
    }

    /**************************************************************************
     * Description 考试模块-获取当前考试剩余多少道题目没有做
     *
     * @author 李雪腾
     * @date 2017年11月2日
     **************************************************************************/
    @RequestMapping("/numberOfItemRest")
    @ResponseBody
    public Integer numberOfItemRest(HttpServletRequest request, @RequestParam Integer examId, Map<String, Object> map) {
        UserVo userVo = getCurrUser();
        Integer itemIsNotAnswerNumber = examDetailService.getItemIsNotAnswer(examId, userVo);
        //获取当前考试的试题的总数量
        Integer totalNumber = examDetailService.getItemCountWithExamId(examId);
        return totalNumber - itemIsNotAnswerNumber;
    }

    /**************************************************************************
     * Description 考试模块-判断当前登录人的考试还有多少剩余次数
     *
     * @author 李雪腾
     * @date 2017年11月2日
     **************************************************************************/
    @RequestMapping("/isExamCanAnswer")
    @ResponseBody
    public boolean isExamCanAnswer(HttpServletRequest request, @RequestParam Integer examId, Map<String, Object> map) {
        UserVo userVo = getCurrUser();
        return examDetailService.getExamIsCanAnswer(examId, userVo.getUsername());

    }

    /**************************************************************************
     * Description 考试模块-判断当前登录人的考试还有多少剩余次数
     *
     * @author 李雪腾
     * @date 2017年11月2日
     **************************************************************************/
    @RequestMapping("/changeTCourseSite")
    public String changeTCourseSite(HttpServletRequest request, @RequestParam Integer cid, Map<String, Object> map) {
        request.getSession().setAttribute("cid", cid);
        return "redirect:/exam/exam";

    }

    /**************************************************************************
     * Description 考试模块-新增OR编辑测试
     *
     * @author 李雪腾
     * @date 2017-08-09
     **************************************************************************/
    @RequestMapping("/newTest")
    public String newTest(HttpServletRequest request, Map<String, Object> map, Integer cid, String fromTeach, Integer assignmentId, Integer moduleType) throws Exception {
        //获取登录用户信息
        UserVo user = getCurrUser();
        map.put("user", user);
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        if (cid != null) {
            //如果有传入tCourseSiteId则用传入id
            request.getSession().setAttribute("cid", cid.intValue());
            List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite("");
            request.getSession().setAttribute("siteList", allTCourseSite);
            map.put("allTCourseSite", allTCourseSite);
        }
        //获取考试
        //Integer assignmentId = request.getParameter("assignmentId") != null ? Integer.valueOf(request.getParameter("assignmentId")) : null;
        List<EditExamTAssignmentComponentVo> editExamTAssignmentComponentVoList = tAssignmentService.findTAssCompVoList(assignmentId);
        map.put("tAssignment", editExamTAssignmentComponentVoList);
        //新建页面参数保存VO对象
        EditTestVo editTestVo = new EditTestVo();
        if (assignmentId != null) {
            editTestVo = tAssignmentService.findEditTestVoById(assignmentId, projectName);
            //editTestVo.settAssignmentId(assignmentId);
        }
        map.put("editTestVo", editTestVo);
        //获取课程网站信息
        //获取站点
        Object cidO = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cidO.toString());
        // Integer tCourseSiteId = 50;//暂时写死，等待后面模块完成
        map.put("tCourseSiteId", tCourseSiteId);
        map.put("today", new Date());
        map.put("projectName", projectName);
        if (projectName.equals("proteach")) {
            //获取wkChapters
            if (moduleType != null && moduleType == 1) {
                List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTCourseSiteIdAndModuleType(tCourseSiteId, moduleType);
                map.put("wkChapters", wkChapterDtoList);
            } else {
                List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTExperimentSKillId(tCourseSiteId);
                map.put("wkChapters", wkChapterDtoList);
            }
        }
        //获取学院（只显示有可以考试的班级的学院）
        //List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllAcademys();
        List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllExamAcademys();
        map.put("schoolAcademyVoList", schoolAcademyVoList);
        //设置知识技能体验
//        Integer moduleType = 1;//暂时写死
        map.put("moduleType", moduleType);
        //selectId
        map.put("selectId", -1);
        //获取以发布的预约考试
        List<ExamSubScribeVo> subScribeExamList = examSubScribeService.getSubScribeExamList(user);
        map.put("subScribeExamList", subScribeExamList);
        //存放题库的信息
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        //获取所有试卷库分类
        List<QuestionpoolCategoryVo> questionpoolCategoryVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpoolCategory();
        map.put("questionpoolCategory", questionpoolCategoryVoList);
        //获取所有试卷库
        List<ExamQuestionpoolVo> examQuestionpoolVoList = tAssignmentExamQuestionpoolService.findAllExamQuestpool();
        map.put("examQuestionpool", examQuestionpoolVoList);
        map.put("fromTeach", fromTeach);
        map.put("projectTitle", projectTitle);
        return "exam/newTest";
    }

    /**************************************************************************
     * @Description: 保存测试
     * @Author: lxt
     * @Date: 2018/01/18 14:19
     **************************************************************************/
    @RequestMapping("/saveExam")
    public String saveExam(@RequestParam Integer tCourseSiteId, Integer moduleType, Integer selectId, String fromTeach, HttpServletRequest request, Map<String, Object> map) {
        //获取当前站点
        Object cid = request.getSession().getAttribute("cid");
        tCourseSiteId = Integer.parseInt(cid.toString());
        //获取当前用户
        String currUsername = getCurrUser().getUsername();
        //以下获取表单发送的参数
        //考试ID
        Integer tAssignmentId = Util.isEmpty(request.getParameter("testId")) ? null : Integer.valueOf(request.getParameter("testId"));
        //考试名称
        String tAssignmentTitle = request.getParameter("testTitle");
        //分类
        Integer testChapterType = Util.isEmpty(request.getParameter("testChapterType")) ? null : Integer.valueOf(request.getParameter("testChapterType"));
        //章节ID
        Integer testWkChapterId = Util.isEmpty(request.getParameter("testWkChapterId")) ? null : Integer.valueOf(request.getParameter("testWkChapterId"));
        //学院
        String[] schoolAcademy = Util.isEmpty(request.getParameter("schoolAcademy")) ? null : request.getParameterValues("schoolAcademy");
        //课时ID
        Integer testWkLessonId = Util.isEmpty(request.getParameter("testWkLessonId")) ? null : Integer.valueOf(request.getParameter("testWkLessonId"));
        //开始时间
        Date startdateTest = Util.isEmpty(request.getParameter("startdateTest")) ? null : Util.parseToDate(request.getParameter("startdateTest"));
        //结束时间
        Date duedateTest = Util.isEmpty(request.getParameter("duedateTest")) ? null : Util.parseToDate(request.getParameter("duedateTest"));
        //考试布置人
        String username = currUsername;
        //考试状态
        Integer status = Util.isEmpty(request.getParameter("status")) ? null : Integer.valueOf(request.getParameter("status"));
        //考试分值
        Double testScoreTest = Util.isEmpty(request.getParameter("testScoreTest")) ? null : Double.valueOf(request.getParameter("testScoreTest"));
        //提交次数
        Integer timelimitOneTest = Util.isEmpty(request.getParameter("timelimitOneTest")) ? null : Integer.valueOf(request.getParameter("timelimitOneTest"));
        //将考试添加到成绩簿
        String toGradebook = request.getParameter("checknameTest");
        //将成绩公布给学生
        String gradeToStudent = request.getParameter("checkname1Test");
        //将成绩计入总成绩
        String gradeToTotalGrade = request.getParameter("checkname2Test");
        //是否显示答题详情
        String answerToStudent = request.getParameter("checkname3Test");
        //考试描述
        String content = request.getParameter("contentTest");
        //考试类型 考试exam 测试test
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
        //获取所选题目生成虚拟大项
        TestSectionVO sectionVO = new TestSectionVO();
        //获取对应的大项对应的小题的字符串
        String sectionStr = request.getParameter("selectedItemIds");
        String[] idsArray = sectionStr.split(",");
        sectionVO.setSectionIndex(1);
        sectionVO.setSectionTitle("测试虚拟大项");
        sectionVO.setItemScore(0);
        List<Integer> idsInt = new ArrayList<>();
        for (String id : idsArray) {
            idsInt.add(Integer.parseInt(id));
        }
        sectionVO.setItemIds(idsInt);
        sectionVOList.add(sectionVO);
        testInfoVO.setTestSectionVOS(sectionVOList);
        Integer aid = testInfoService.saveTest(testInfoVO, getCurrUser(), tCourseSiteId, projectName);
        //创建成绩册
        tAssignmentService.createGradebook(tCourseSiteId, aid, testChapterType, testWkChapterId);
        map.put("fromTeach", fromTeach);
        map.put("status", testInfoVO.getStatus());
        //保存数据到考试学院关系表
        tAssignmentService.saveTAssignmentAcademy(aid, schoolAcademy);
        map.put("projectTitle", projectTitle);
        return "exam/addTestResult";
    }

    /**************************************************************************
     * Description 试卷库-新增试题入口
     *
     * @author 李梦晨
     * @date 2017-12-21
     **************************************************************************/
    @RequestMapping("/addedQuestions")
    public String addedQuestions(HttpServletRequest request, Integer questionPoolId, Integer currpage, Integer currsection, Map<String, Object> map) throws Exception {
        //获取当前站点
        Object cid = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cid.toString());
        //获取所有可以使用的题库
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        if (questionPoolId != null) {
            //获取对应的题库和对应的题库的选项
            //每页10条数据
            Integer pageSize = 10;
            if (null == currpage) {
                currpage = 1;
            }
            //获取当前题库的先关信息
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
            //当前页
            map.put("currpage", currpage);

            System.out.println("currpage===" + currpage);
            //总页数
            map.put("totalPage", totalPage);
            // 后台分页select框
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
     * 根据题库id和抽题数目返回抽到题的id的字符串
     *
     * @return
     * @author 罗璇
     * @date 2018年5月7日
     */
    @ResponseBody
    @RequestMapping("/selectRandomQuestionStr")
    public SelectRandomQuestionDTO selectRandomQuestionStr(@RequestParam Integer questionPoolId, Integer num) {
        //新建返回DTO
        SelectRandomQuestionDTO rs = new SelectRandomQuestionDTO();
        //抽一波题
        List<Integer> itemsIdsList = tAssignmentQuestionPoolService.getItemsIdsByPoolId(questionPoolId);
        //乱序
        Collections.shuffle(itemsIdsList);
        //判断取的数量是否超过总数量
        if (num > itemsIdsList.size()) {
            rs.setResCode(0);
            rs.setResMsg("该题库共有" + itemsIdsList.size() + "道题，请重新选择！");
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
     * Description 试卷库-新增试题入口
     *
     * @author 李梦晨
     * @date 2017-12-21
     **************************************************************************/
    @RequestMapping("/viewQuestions")
    public String viewQuestions(HttpServletRequest request, String sectionIds, Integer sectionId, Integer currpage, Map<String, Object> map) throws Exception {
        Integer pageSize = 10;
        //获取所有的小题
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
        //总数量
        map.put("totalRecords", itemIds.length);
        map.put("questionVos", questionVos);
        //sectionId
        map.put("sectionId", sectionId);
        int totalPage = (itemIds.length + pageSize - 1) / pageSize;
        map.put("totalPage", totalPage);
        // 后台分页select框
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
     * Description 考试模块-判断当前登录人的考试还有多少剩余次数
     *
     * @author 李雪腾
     * @date 2018年1月22日
     **************************************************************************/
//    @RequestMapping("/testList")
//    public String testList(HttpServletRequest request, Map<String, Object> map, Integer tCourseSiteId) {
//        //获取测试列表
//        UserVo userVo = getCurrUser();
//        //获取当前登录人学院
//        String schoolAcademy = userVo.getAcademyNumber();
//        map.put("schoolAcademy", schoolAcademy);
//        if (tCourseSiteId != null) {
//            //如果有传入tCourseSiteId则用传入id
//            request.getSession().setAttribute("cid", tCourseSiteId.intValue());
//            List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite();
//            request.getSession().setAttribute("siteList", allTCourseSite);
//            map.put("allTCourseSite", allTCourseSite);
//        }
//        //获取当前站点
//        Object cid = request.getSession().getAttribute("cid");
//        Integer siteId = Integer.parseInt(cid.toString());
//        //获取当前登录人的权限
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
     * Description 测试模块-判断当前登录人的测试还有多少剩余次数
     *
     * @author 李雪腾
     * @date 2017年11月2日
     **************************************************************************/
    @RequestMapping("/isTestCanAnswer")
    @ResponseBody
    public boolean isTestCanAnswer(HttpServletRequest request, @RequestParam Integer examId, Map<String, Object> map) {
        UserVo userVo = getCurrUser();
        return examDetailService.getExamIsCanAnswer(examId, userVo.getUsername());
    }

    /**************************************************************************
     * Description 考试模块-开始测试
     *
     * @author lixueteng
     * @date 2017年8月27日
     **************************************************************************/
    @RequestMapping("/beginTest")
    public String beginTest(HttpServletRequest request, @RequestParam int testId, Integer simulation,
                            Map<String, Object> map, String fromTeach, Integer currpage) {
        Integer pageSize = 10;
        if (currpage == null) {
            currpage = 1;
        }

        UserVo user = this.getCurrUser();
        //获取测验的相关信息
        TestDetailVo examDetail = testInfoService.getExamDetail(testId, user.getUsername(), currpage, pageSize);
        if (examDetail.getPageModel() == null) {
            examDetail.setPageModel(new HashMap<>());
            examDetail.getPageModel().put("totalPage", 0);
            examDetail.getPageModel().put("currpage", 0);
        }
        map.put("testDetail", examDetail);
        //获取答题记录
        //List<Map> tAssignmentItemMapping = examGradingService.getTAssignmentItemMapping(testId, user);


        Map<String, Integer> pageModel = examDetail.getPageModel();
        // 后台分页select框

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
     * Description 测试模块-提交测试保存测试
     *
     * @author lixueteng
     * @date 2018年1月24日
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
        //获取考试成绩
        Map<String, String[]> answerMap = new HashMap<>();
        List<Integer> itemIds = examDetailService.findTAssignmentItemIds(assignmentId);
        for (Integer id : itemIds) {
            String[] answers = request.getParameterValues("answers" + id);
            String[] answertexts = request.getParameterValues("answertexts" + id);
            answerMap.put("answers" + id, answers);
            answerMap.put("answertexts" + id, answertexts);
        }

        testInfoService.saveTAssignmentItemMapping(answerMap, assignmentId, submitTime, userVo);

        //判断是否为提交
        if (submitTime > 0) {
            Integer gradingId = testInfoService.saveTAssignmentGrade(answerMap, assignmentId, submitTime, new BigDecimal(0), userVo.getUsername());
            //存入成绩册
            Authorization authorization = AuthorizationUtil.getAuthorization(getCurrUser().getUsername());
            testInfoService.saveGradebook(cid, assignmentId, gradingId, getCurrUser(), apiGateWayHost, authorization.getJwtToken());
        }
        //跳转到成绩列表
        return "redirect:/exam/showTestResult?examId=" + assignmentId;

    }


    /**************************************************************************
     * Description 考试模块-考试成绩列表
     *
     * @author 罗璇
     * @date 2017年8月27日
     **************************************************************************/
    @RequestMapping("/viewTestScore")
    public String viewTestScore(HttpServletRequest request, Map<String, Object> map) throws Exception {
        UserVo userVo = getCurrUser();
        //站点id 默认50
        Object cid1 = request.getSession().getAttribute("cid");
        Integer cid = Integer.parseInt(cid1.toString());
        //获取当前站点下面的考试列表
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        List<ExamListVo> examList = examListService.findExamList(cid, userVo, authorityName, "test",1);
        map.put("examList", examList);
        map.put("projectName", projectName);
        map.put("projectTitle", projectTitle);
        return "exam/viewTestScore";
    }

    /**************************************************************************
     * Description 考试模块-显示考试成绩
     *
     * @author 李雪腾
     * @date 2017年10月17日
     **************************************************************************/
    @RequestMapping("/showTestGradingPage")
    public String showTestGradingPage(HttpServletRequest request, @RequestParam Integer examId, Integer currpage, Map<String, Object> map,Integer siteId,String username) {
        //每页数据20条
        Integer pageSize = 20;
        //当前页
        if (currpage == null) {
            currpage = 1;
        }
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        //学生成绩集合
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
        //获取下载次数管理列表数量
        int totalRecords = examGradingService.countExamGradingList(examId, username, authorityName,null);
        //总页
        int totalPage = (totalRecords + pageSize - 1) / pageSize;
        map.put("totalRecords", totalRecords);
        map.put("currpage", currpage);
        map.put("totalPage", totalPage);
        map.put("pageSize", pageSize);
        // 后台分页select框
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        map.put("pageArray", pageArray);
        map.put("projectTitle", projectTitle);
        return "exam/testGradingList";
    }


    /**************************************************************************
     * Description 考试模块-显示考试成绩
     *
     * @author 李雪腾
     * @date 2017年10月17日
     **************************************************************************/
    /*@RequestMapping("/showTestGrading")
    @ResponseBody
    public Object showTestGrading(HttpServletRequest request, @RequestParam Integer examId, Integer page, Integer limit, Map<String, Object> map) {
        UserVo userVo = this.getCurrUser();
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        //学生成绩集合
        List<LayuiDataVo> examGradingList = examGradingService.findExamGradingList(examId, userVo, page, limit,authorityName);
        LayuiTableVo layuiTableVo = new LayuiTableVo();
        layuiTableVo.setCode(0);
        layuiTableVo.setMsg("");
        //成绩的总条数
        layuiTableVo.setCount(examGradingList.size());
        layuiTableVo.setData(examGradingList);
        return layuiTableVo;
    }*/

    /**************************************************************************
     * Description 考试模块-考试结果
     *
     * @author 李雪腾
     * @date 2017年8月27日
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
     * Description:作业-保存成绩图片
     * @throws IOException
     *
     * @author：裴继超
     * @date ：2017-3-20
     **************************************************************************/
    @RequestMapping("/saveMarkingImage")
    @ResponseBody
    public String saveMarkingImage(@RequestParam String imageString, Integer gradingId,
                                   Integer page) {
        String result = examDetailService.saveMarkingImage(pdfDirector, gradingId, page, imageString);

        return result;
    }

    /**************************************************************************
     * Description:图片生成pdf
     * @throws IOException
     *
     * @author：裴继超
     * @date ：2017-3-8
     **************************************************************************/
    @RequestMapping("/submitMarking")
    public String submitMarking(@RequestParam Integer gradingId, HttpServletRequest request, Integer page) throws Exception {
        //获取当前站点
        Object cid = request.getSession().getAttribute("cid");
        Integer siteId = Integer.parseInt(cid.toString());
        String resourceFile = examDetailService.submitMarking(pdfDirector, gradingId, siteId, resourceContainerHost, getCurrUser(), page);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(resourceFile);
        String path = "redirect:" + jsonNode.get("url").asText();
        return path;
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
        //由于目前不使用而写死成0;
        List<ExamDetailsVO> examDetailsVOList = examDetailService.findTestDetail(examId, username,0, currpage, pageSize,1,null);
        return examDetailsVOList;
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
     * Description 个人中心
     *
     * @author 洪春莹
     * @date 2019年3月11日
     **************************************************************************/
    @RequestMapping("/listMyInfo")
    public String listMyInfo(HttpServletRequest request, Map<String, Object> map, String userName) {
        //获取个人信息
        UserVo userInfoVO = examListService.findUserByUserName(userName);
        map.put("userInfo", userInfoVO);
        map.put("userName", userName);
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
        return "exam/listMyInfo";
    }

    /**************************************************************************
     * Description 编辑个人信息
     *
     * @author 洪春莹
     * @date 2019年3月12日
     **************************************************************************/
    @RequestMapping("/editMyInfo")
    public String editMyInfo(HttpServletRequest request, Map<String, Object> map, String userName, Integer flag) {
        //获取个人信息
        UserVo userVo = examListService.findUserByUserName(userName);
        map.put("userVo", userVo);
        map.put("userName", userName);
        //获取学院
        List<SchoolAcademyVo> schoolAcademyVoList = wkChapterService.findAllAcademys();
        map.put("schoolAcademyVoList", schoolAcademyVoList);
        map.put("uploadFileHost", uploadFileHost);
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        map.put("flag", flag);
        return "exam/editMyInfo";
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
        return "redirect:/exam/listMyInfo?userName=" + userVo.getUsername();
    }

    /**************************************************************************
     * Description 个人信息--保存个人图片
     *
     * @author 黄浩
     * @date 2018年3月27日
     **************************************************************************/
    @RequestMapping("/saveMyInfoPhoto")
    public String saveMyInfoPhoto(String fileid, String userName) {
        //获取个人信息
        UserVo userVo = examListService.findUserByUserName(userName);
        examListService.saveMyInfoPhoto(userVo, fileid);
        return "redirect:/exam/listMyInfo?userName=" + userName;
    }

    /**************************************************************************
     *Description 个人中心-个人信息(图片删除)
     * @author 洪春莹
     * @date 2019年3月19日
     * **************************************************************************/
    @RequestMapping("/deleteMyInfoPhoto")
    public String deleteMyInfoPhoto(String username) {
        examListService.deleteImg(username);
        return "redirect:/exam/listMyInfo?userName=" + username;
    }

    /**************************************************************************
     * Description 用户中心-用户列表
     *
     *@author 洪春莹
     * @date 2019年3月12日
     **************************************************************************/
    @RequestMapping("/userList")
    public String userList(Integer currpage, HttpServletRequest request, Map<String, Object> map) {
        //获取当前登录人
        UserVo userVo = this.getCurrUser();
        map.put("userName", userVo.getUsername());
        //每页数据20条
        Integer pageSize = 20;
        //当前页
        if (currpage == null) {
            currpage = 1;
        }
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        //获取学号
        String username = request.getParameter("username");
        map.put("username", username);
        //获取姓名
        String cname = request.getParameter("cname");
        map.put("cname", cname);
        //获取站点学生
        List<UserVo> studentList = examListService.findAllStudent(username, cname, currpage);
        //获取站点学生数量
        Integer totalRecords = examListService.countStudentList(username, cname);
        //总页
        int totalPage = (totalRecords + pageSize - 1) / pageSize;
        map.put("totalRecords", totalRecords);
        map.put("currpage", currpage);
        map.put("totalPage", totalPage);
        // 后台分页select框
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
        return "exam/certificateDetail";
    }

    /**************************************************************************
     * Description 编辑证书信息
     *
     * @author 洪春莹
     * @date 2019年3月14日
     **************************************************************************/
    @RequestMapping("/editCertificate")
    public String editCertificate(HttpServletRequest request, Map<String, Object> map, String projectName) {
        //获取证书信息
        SchoolVo schoolVo = examListService.findSchoolByProjectName(projectName);
        map.put("schoolVo", schoolVo);
        //获取当前登录人的权限
        String authorityName = request.getSession().getAttribute("AUTHORITYNAME").toString();
        map.put("authorityName", authorityName);
        map.put("uploadFileHost", uploadFileHost);
        return "exam/editCertificate";
    }

    /**************************************************************************
     * Description 证书设置--保存学校公章图片
     *
     * @author 洪春莹
     * @date 2019年3月18日
     **************************************************************************/
    @RequestMapping("/saveSchoolPhoto")
    public String saveSchoolPhoto(String fileid) {
        //获取证书信息
        SchoolVo schoolVo = examListService.findSchoolByProjectName(projectName);
        examListService.saveSchoolPhoto(schoolVo, fileid);
        return "redirect:/exam/certificateDetail";
    }

    /**************************************************************************
     * Description 保存证书信息
     *
     * @author 洪春莹
     * @date 2019年3月14日
     **************************************************************************/
    @RequestMapping("/saveCertificate")
    public String saveCertificate(@ModelAttribute SchoolVo schoolVo) {
        examListService.saveCertificate(schoolVo, projectName);
        return "redirect:/exam/certificateDetail";
    }

    /**************************************************************************
     *Description 证书设置-图片删除
     * @author 洪春莹
     * @date 2019年3月19日
     * **************************************************************************/
    @RequestMapping("/deleteSchoolPhoto")
    public String deleteSchoolPhoto(String projectName) {
        examListService.deleteSchoolImg(projectName);
        return "redirect:/exam/certificateDetail";
    }

    /**************************************************************************
     *Description 站点列表
     * @author 曹焕
     * @date 2019年8月29日
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
     *Description 学期列表
     * @author 曹焕
     * @date 2019年8月29日
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
     *Description 新建学期
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    @RequestMapping("/newTerm")
    public String newTerm(HttpServletRequest request, Map<String, Object> map) {
        map.put("schoolTermVO", new SchoolTermVO());
        return "exam/editTerm";
    }

    /**************************************************************************
     *Description 保存学期
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    @RequestMapping("/saveTerm")
    public String saveTerm(SchoolTermVO schoolTermVO) throws Exception {
        examListService.saveSchoolTerm(schoolTermVO);
        return "redirect:/exam/termList";
    }

    /**************************************************************************
     *Description 新建站点
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    @RequestMapping("/newSite")
    public String newSite(HttpServletRequest request, Map<String, Object> map) {
        //获取所有学期
        List<SchoolTermVO> schoolTermVOList = examListService.findAllSchoolTerm();
        //查询所有教师
        List<UserVo> teacherList = examListService.findAllTeacherByAuthor();
        map.put("schoolList", schoolTermVOList);
        map.put("teacherList", teacherList);
        map.put("tCourseSiteVO", new TCourseSiteVo());
        return "exam/editSite";
    }

    /**************************************************************************
     *Description 保存站点
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    @RequestMapping("/saveSite")
    public String saveSite(TCourseSiteVo tCourseSiteVo) {
        examListService.saveTCourseSite(tCourseSiteVo);
        return "redirect:/exam/termList";
    }

    /**************************************************************************
     *Description 修改学期
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    @RequestMapping("/editTerm")
    public String editTerm(HttpServletRequest request, Map<String, Object> map, Integer termId) {
        SchoolTermVO schoolTermVO = examListService.findSchoolTermById(termId);
        map.put("schoolTermVO", schoolTermVO);
        return "exam/editTerm";
    }

    /**************************************************************************
     *Description 修改站点
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    @RequestMapping("/editSite")
    public String editSite(HttpServletRequest request, Map<String, Object> map, Integer siteId) {
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(siteId);
        //获取所有学期
        List<SchoolTermVO> schoolTermVOList = examListService.findAllSchoolTerm();
        //查询所有教师
        List<UserVo> teacherList = examListService.findAllTeacherByAuthor();
        map.put("schoolList", schoolTermVOList);
        map.put("teacherList", teacherList);
        map.put("tCourseSiteVO", tCourseSiteVo);
        return "exam/editSite";
    }
}
