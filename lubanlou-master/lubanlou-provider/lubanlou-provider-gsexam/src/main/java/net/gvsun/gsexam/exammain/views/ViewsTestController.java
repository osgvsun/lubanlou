package net.gvsun.gsexam.exammain.views;

import net.gvsun.common.LayTableVO;
import net.gvsun.gsexam.domain.TAssignment;
import net.gvsun.gsexam.dto.common.*;
import net.gvsun.gsexam.dto.exam.SelectRandomQuestionDTO;
import net.gvsun.gsexam.dto.exam.WkChapterDto;
import net.gvsun.gsexam.exammain.api.CommonResult;
import net.gvsun.gsexam.jpa.TAssignmentJPA;
import net.gvsun.gsexam.service.common.ShareService;
import net.gvsun.gsexam.service.exam.*;
import net.gvsun.gsexam.service.pool.TAssignmentExamQuestionpoolService;
import net.gvsun.gsexam.service.pool.TAssignmentQuestionPoolService;
import net.gvsun.gsexam.service.test.TestInfoService;
import net.gvsun.gsexam.utils.Util;
import net.gvsun.gsexam.vo.exam.*;
import net.gvsun.gsexam.vo.layui.LayuiDataVo;
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
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@Controller
@CrossOrigin("*")
@RequestMapping("/views/test")
public class ViewsTestController {
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
    @Value("${serverHost}/gvsunQuestionPool/questionPool/mainPage")
    private String questionPoolHost;
    @Value("${serverHost}/gvsunTms/teach/mainPage?cid=")
    private String teachHost;
    @Autowired
    private TAssignmentJPA tAssignmentJPA;

    /**************************************************************************
     * Description 测试模块-测试列表入口
     *
     * @author 黄浩
     * @date 2020年8月1日
     **************************************************************************/
    @RequestMapping("/testList")
    public String testList(HttpServletRequest request, Map<String, Object> map, Integer cid) {
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
        UserVo userVo = this.getCurrUser();
        request.getSession().setAttribute("oauth2Host", oauth2Host);
        request.getSession().setAttribute("currentUsername", userVo.getUsername());
        request.getSession().setAttribute("currentUserCname", userVo.getCname());
        request.getSession().setAttribute("resourceContainerHostresourceContainerHost", resourceContainerHost);
        request.getSession().setAttribute("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("questionUrl", questionPoolHost);
        request.getSession().setAttribute("pathType", "test");
        boolean fla = shareService.findTCourseSitesBySiteIdAndUsername(cid, getCurrUser().getUsername());
        map.put("fla", fla);
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(cid);
        map.put("cTitle", tCourseSiteVo.getTitle());
        map.put("teachHost", teachHost);
        return "views/testList";
    }

    /**************************************************************************
     * Description 考试模块-测试列表api
     *
     * @author 黄浩
     * @date 2020年7月30日
     **************************************************************************/
    @RequestMapping(value = "/testListApi", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<List<TestInfoVO>> testListApi(HttpServletRequest request, Integer id, Integer page, Integer limit, Integer dateType, Integer dictionary) {
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
        List<TestInfoVO> allTest = testInfoService.findAllTest(getCurrUser(), authorityName, id, dictionary);
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
     * Description 考试模块-新增OR编辑测试
     *
     * @author 李雪腾
     * @date 2017-08-09
     **************************************************************************/
    @RequestMapping("/newTest")
    public String newTest(HttpServletRequest request, Map<String, Object> map, Integer cid, Integer moduleType) throws Exception {
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
        //新建页面参数保存VO对象
        EditTestVo editTestVo = new EditTestVo();
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
            List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTCourseSiteIdAndModuleType(tCourseSiteId, moduleType);
            map.put("wkChapters", wkChapterDtoList);
        }
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(tCourseSiteId);
        map.put("tCourseSiteVo", tCourseSiteVo);
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
        map.put("projectTitle", projectTitle);
        boolean fla = shareService.findTCourseSitesBySiteIdAndUsername(cid, getCurrUser().getUsername());
        map.put("fla", fla);
        return "views/newTest";
    }

    /**************************************************************************
     * @Description: 保存测试
     * @Author: lxt
     * @Date: 2018/01/18 14:19
     **************************************************************************/
    @RequestMapping("/saveTest")
    @ResponseBody
    public String saveTest(HttpServletRequest request, Map<String, Object> map, Integer siteId, String currUsername) {
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
        String schoolAcademy = Util.isEmpty(request.getParameter("schoolAcademy")) ? null : request.getParameter("schoolAcademy");
        //班级
//        String classes = Util.isEmpty(request.getParameter("schoolClass")) ? tAssignmentService.findAllClassByAcademyIdStr(request.getParameter("schoolAcademy")) : request.getParameter("schoolClass");
//        String[] schoolClasses = classes.split(",");
        String[] schoolClasses = Util.isEmpty(request.getParameter("schoolClass")) ? tAssignmentService.findAllClassByAcademyId(request.getParameter("schoolAcademy")) : request.getParameterValues("schoolClass");
        //课时ID
        Integer testWkLessonId = Util.isEmpty(request.getParameter("testWkLessonId")) ? null : Integer.valueOf(request.getParameter("testWkLessonId"));
        //开始时间
        String date = request.getParameter("duedateTest");

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
        Integer timelimitOneTest = request.getParameter("customTime").equals("自定义") ? Integer.valueOf(request.getParameter("customTime1")) : 1;
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
        if (testChapterType != null) {
            type = (testChapterType == 200 ? "prepareTest" : "test");
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
        testInfoVO.setSchoolAcademy1(schoolAcademy);
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
        Integer aid = testInfoService.saveTest(testInfoVO, shareService.getUserByUsername(username), siteId, projectName);
        if (!"*000".equals(schoolAcademy)) {
            tAssignmentService.saveTAssignmentClass(aid, schoolClasses);
        }
        //创建成绩册
        tAssignmentService.createGradebook(siteId, aid, testChapterType, testWkChapterId);
        map.put("status", testInfoVO.getStatus());
        map.put("projectTitle", projectTitle);
        return "true";
    }

    /**************************************************************************
     * Description 测试模块-编辑测试
     *
     * @author 李雪腾
     * @date 2017-08-09
     **************************************************************************/
    @RequestMapping("/editTest")
    public String editTest(HttpServletRequest request, Map<String, Object> map, Integer cid, Integer assignmentId, Integer moduleType) throws Exception {
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
            List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTCourseSiteIdAndModuleType(tCourseSiteId, editTestVo.getTestChapterType());
            map.put("wkChapters", wkChapterDtoList);
        }
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(tCourseSiteId);
        map.put("tCourseSiteVo", tCourseSiteVo);
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
        map.put("projectTitle", projectTitle);
        map.put("assignmentId", assignmentId);
        return "views/editTest";
    }

    /**************************************************************************
     * Description 测试模块-获取某一测试
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
     * Description 试卷库-新增试题入口
     *
     * @author 李梦晨
     * @date 2017-12-21
     **************************************************************************/
    @RequestMapping("/addTestQuestionBank")
    public String addTestQuestionBank(HttpServletRequest request, Integer questionPoolId, Integer page, Integer limit, Integer currsection, Map<String, Object> map, Integer categoryId, Integer selectType) throws Exception {
        //获取当前站点
        Object cid = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cid.toString());
        TCourseSiteVo tCourseSiteVo = shareService.findTCourseSiteBySiteId(tCourseSiteId);
        map.put("coursename", tCourseSiteVo.getTitle());
        map.put("selectCategory", categoryId);
        map.put("selectType", selectType);
        //获取所有可以使用的题库
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        if (questionPoolId != null) {
            //获取对应的题库和对应的题库的选项
            //每页10条数据
            if (null == page) {
                page = 1;
            }
            //获取当前题库的先关信息
            QuestionPoolVO questionPoolSelected = tAssignmentQuestionPoolService.findQuestionPoolById(questionPoolId);
            map.put("questionPoolSelected", questionPoolSelected);
            List<QuestionVo> relist = tAssignmentQuestionPoolService.findquestionPoolList(questionPoolId, page, null, null, limit);
            String idStr = "";
            for (QuestionVo vo : relist) {
                idStr += vo.getId() + ",";
            }
            if (idStr.length() > 0) {
                idStr = idStr.substring(0, idStr.length() - 1);
            }
            map.put("idStr", idStr);
            Integer totalRecords = tAssignmentQuestionPoolService.countTAssignmentItem(questionPoolId, null, null);
            int totalPage = (totalRecords + limit - 1) / limit;
            map.put("totalRecords", totalRecords);
            //当前页
            map.put("currpage", page);

            System.out.println("currpage===" + page);
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
            map.put("pageSize", limit);
        } else {
            map.put("questionPoolSelected", new QuestionPoolVO());
        }
        map.put("currsection", currsection);
        map.put("projectTitle", projectTitle);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("currentUsername", this.getCurrUser().getUsername());
        map.put("currentUserCname", this.getCurrUser().getCname());
        //存放题库分类信息
        List<QuestionpoolCategoryVo> qcvoList = tAssignmentQuestionPoolService.getAllQuestionPoolCategory();
        map.put("questionpoolCategory", qcvoList);
        return "views/addTestQuestionBank";
    }

    /**
     * 查看题库的试题
     *
     * @param questionPoolId 题库id
     * @param page           当前页
     * @param pageSize       页面大小
     * @return
     */
    @RequestMapping("/getQuestionsByPoolId")
    @ResponseBody
    public LayTableVO<List<QuestionVo>> getQuestionsByPoolId(@RequestParam Integer questionPoolId, @RequestParam Integer page, @RequestParam Integer pageSize) {
        List<QuestionVo> list = tAssignmentQuestionPoolService.findquestionPoolList(questionPoolId, page, null, null, pageSize);
        Integer size = tAssignmentQuestionPoolService.countTAssignmentItem(questionPoolId, null, null);
        return LayTableVO.ok(list, new Long(size));
    }

    /**************************************************************************
     * Description 新增题库-监听下拉框调的接口
     *
     * @author fubowen
     * @date 2020-12-17
     **************************************************************************/
    @RequestMapping("/updateQuestionPool")
    @ResponseBody
    public List<TAssignmentQuestpoolVo> updateQuestionPool(Integer selectType, Integer categoryId, Integer questionType, Integer siteId) {
        //存放题库的信息
        Integer type = -1;
        if (selectType != null) {
            type = selectType;
        }
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.updateQuestionPool(siteId, type, 0, categoryId, questionType);
        return tAssignmentQuestionpool;
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
    @RequestMapping("/testQuestionBankDetail")
    public String testQuestionBankDetail(HttpServletRequest request, String sectionIds, Integer sectionId, Integer page, Integer limit, Map<String, Object> map) throws Exception {
        //获取所有的小题
        String[] itemIds = sectionIds.split(",");
        Integer[] newItemIds = new Integer[itemIds.length];
        for (int i = 0; i < itemIds.length; i++) {
            newItemIds[i] = Integer.parseInt(itemIds[i]);
        }
        if (page == null) {
            page = 1;
        }
        List<QuestionVo> questionVos = tAssignmentQuestionPoolService.showAllQuestionByIds(newItemIds, page, limit);
        map.put("currpage", page);
        map.put("pageSize", limit);
        //总数量
        map.put("totalRecords", itemIds.length);
        map.put("questionVos", questionVos);
        //sectionId
        map.put("sectionId", sectionId);
        int totalPage = (itemIds.length + limit - 1) / limit;
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
        return "views/testQuestionBankDetail";
    }

    /**************************************************************************
     * Description 试卷库-根据小题id列表获取试题列表
     *
     * @author fubowen
     * @date 2021-8-9
     **************************************************************************/
    @RequestMapping("/getQuestionVoByIds")
    @ResponseBody
    public LayTableVO<List<QuestionVo>> getQuestionVoByIds(String sectionIds, Integer page, Integer limit) {
        String[] split = sectionIds.split(",");
        List<Integer> list = Arrays.stream(split).map(s -> Integer.parseInt(s)).collect(Collectors.toList());
        List<QuestionVo> questionVos = tAssignmentQuestionPoolService.showAllQuestionByIds(list.toArray(new Integer[list.size()]), page, limit);
        return LayTableVO.ok(questionVos, new Long(list.size()));
    }

    /**************************************************************************
     * Description 测试模块-查看测试成绩
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping("/testScore")
    public String testScore(HttpServletRequest request, Map<String, Object> map, Integer assignmentId) {
        List<TCourseSiteVo> allTCourseSite = examListService.findAllTCourseSite("");
        request.getSession().setAttribute("siteList", allTCourseSite);
        map.put("allTCourseSite", allTCourseSite);
        map.put("assignmentId", assignmentId);
        EditTestVo editTestVo = tAssignmentService.findEditTestVoById(assignmentId, projectName);
        map.put("editTestVo", editTestVo);
        return "views/testScore";
    }

    /**************************************************************************
     * Description 测试模块-查看测试成绩api
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping(value = "/testScoreApi", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<List<LayuiDataVo>> testScoreApi(Integer assignmentId, String authorityName, Integer tCourseSiteId, String username, Integer page, Integer limit, String search) {
        //学生成绩集合
        List<LayuiDataVo> examGradingList = examGradingService.findTestGradingList(assignmentId, authorityName, shareService.getUserByUsername(username), page, limit, search);
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(tCourseSiteId);
        if (!tCourseSiteVo.getTitle().equals("全校考试")) {
            Iterator<LayuiDataVo> it = examGradingList.iterator();
            while (it.hasNext()) {
                LayuiDataVo x = it.next();
                boolean fla = shareService.findTCourseSitesBySiteIdAndUsername(tCourseSiteId, x.getUsername());
                if (!fla) {
                    it.remove();
                }
            }
        }
        return CommonResult.success(examGradingList, examGradingService.countExamGradingList(assignmentId, username, authorityName, search));
    }

    /**************************************************************************
     * Description 考试模块-查看答题详情
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping("/testScoreDetail")
    public String testScoreDetail(HttpServletRequest request, Map<String, Object> map, Integer assignmentId, String username, Integer gradingId, String cname) {
        TAssignmentsVO tAssignmentsVO = examDetailService.findExamById(assignmentId, username, gradingId);
        map.put("tAssignmentsVO", tAssignmentsVO);
        map.put("assignmentId", assignmentId);
        map.put("username", username);
        map.put("cname", cname);
        map.put("gradingId", gradingId);
        return "views/testScoreDetail";
    }

    /**************************************************************************
     * Description 测试模块-查看答题详情api
     *
     * @author 黄浩
     * @date 2020年7月31日
     **************************************************************************/
    @RequestMapping("/findExamDetailApi")
    @ResponseBody
    public CommonResult<List<ExamDetailsVO>> findExamDetailApi(Integer assignmentId, String username, Integer gradingId, Integer page, Integer limit, Integer dictionary) {
        //dictionary区分主客观题，0：不区分，1：客观题，2：主观题
        List<ExamDetailsVO> examDetailsVOList = examDetailService.findExamDetail(assignmentId, username, gradingId, page, limit, dictionary);
        return CommonResult.success(examDetailsVOList, examDetailService.countExamDetail(assignmentId, dictionary));
    }

    /**************************************************************************
     * Description 测试模块-判断当前登录人的测试还有多少剩余次数
     *
     * @author 李雪腾
     * @date 2017年11月2日
     **************************************************************************/
    @RequestMapping("/isTestCanAnswer")
    @ResponseBody
    public boolean isTestCanAnswer(@RequestParam Integer examId, @RequestParam String username) {
        return examDetailService.getExamIsCanAnswer(examId, username);
    }

    /**************************************************************************
     * Description 测试模块-开始测试
     *
     * @author fubowen
     * @date 2021-7-13
     **************************************************************************/
    @RequestMapping("/startTest")
    public String startTest(@RequestParam int testId, Integer simulation,
                            String fromTeach) {
        UserVo user = this.getCurrUser();
        //学生开始测试-创建一个测试副本
        Integer newTestId = examDetailService.copyTestForGrading(testId, user.getUsername());
        return "redirect:/views/test/beginTest?testId=" + newTestId + "&simulation=" + simulation + "&page=1&fromTeach=" + fromTeach;
    }

    /**************************************************************************
     * Description 测试模块-开始测试-创建一个测试副本接口,返回新创建的副本id
     *
     * @author fubowen
     * @date 2021-8-9
     **************************************************************************/
    @RequestMapping("/createNewTestApi")
    @ResponseBody
    public Integer startTest(@RequestParam Integer testId, @RequestParam String username) {
        //学生开始测试-创建一个测试副本
        return examDetailService.copyTestForGrading(testId, username);
    }

    /**************************************************************************
     * Description 考试模块-开始测试
     *
     * @author lixueteng
     * @date 2017年8月27日
     **************************************************************************/
    @RequestMapping("/beginTest")
    public String beginTest(@RequestParam int testId,
                            Map<String, Object> map, String fromTeach, Integer currpage) {
        UserVo user = this.getCurrUser();
        Integer pageSize = 10;
        if (currpage == null) {
            currpage = 1;
        }
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
        return "views/beginTest";
    }

    /**************************************************************************
     * Description 测试模块-获取测试题目
     *
     * @author 黄浩
     * @date 2020年10月20日
     **************************************************************************/
    @RequestMapping("/testInfoApi")
    @ResponseBody
    public TestSectionVO testInfoApi(@RequestParam Integer testId, @RequestParam Integer page, @RequestParam Integer pageSize) {
        return testInfoService.getTestDetail(testId, page, pageSize);
    }

    /**************************************************************************
     * Description 测试模块-复制测试题目
     *
     * @author 黄浩
     * @date 2020年10月20日
     **************************************************************************/
    @RequestMapping("/copyTestApi")
    @ResponseBody
    public boolean copyTestApi(Integer sourceTestId, Integer targetSiteId, String username) {
        TestSectionVO testSectionVO = testInfoService.getTestDetailNew(sourceTestId, -1, 0);
        return testInfoService.copyTest(sourceTestId, targetSiteId, testSectionVO, username);
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
}
