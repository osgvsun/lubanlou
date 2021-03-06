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
     * Description ????????????-??????????????????
     *
     * @author ??????
     * @date 2020???8???1???
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
     * Description ????????????-????????????api
     *
     * @author ??????
     * @date 2020???7???30???
     **************************************************************************/
    @RequestMapping(value = "/testListApi", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<List<TestInfoVO>> testListApi(HttpServletRequest request, Integer id, Integer page, Integer limit, Integer dateType, Integer dictionary) {
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
        List<TestInfoVO> allTest = testInfoService.findAllTest(getCurrUser(), authorityName, id, dictionary);
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
    @RequestMapping("/testItemsApi")
    @ResponseBody
    public TestDetailVo testItemsApi(Integer assignmentId, String username, Integer page, Integer limit) {
        //???????????????????????????
        TestDetailVo examDetail = testInfoService.getExamDetail(assignmentId, username, page, limit);
        return examDetail;
    }

    /**************************************************************************
     * Description ????????????-??????OR????????????
     *
     * @author ?????????
     * @date 2017-08-09
     **************************************************************************/
    @RequestMapping("/newTest")
    public String newTest(HttpServletRequest request, Map<String, Object> map, Integer cid, Integer moduleType) throws Exception {
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
        //????????????????????????VO??????
        EditTestVo editTestVo = new EditTestVo();
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
            List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTCourseSiteIdAndModuleType(tCourseSiteId, moduleType);
            map.put("wkChapters", wkChapterDtoList);
        }
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(tCourseSiteId);
        map.put("tCourseSiteVo", tCourseSiteVo);
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
        map.put("projectTitle", projectTitle);
        boolean fla = shareService.findTCourseSitesBySiteIdAndUsername(cid, getCurrUser().getUsername());
        map.put("fla", fla);
        return "views/newTest";
    }

    /**************************************************************************
     * @Description: ????????????
     * @Author: lxt
     * @Date: 2018/01/18 14:19
     **************************************************************************/
    @RequestMapping("/saveTest")
    @ResponseBody
    public String saveTest(HttpServletRequest request, Map<String, Object> map, Integer siteId, String currUsername) {
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
        String schoolAcademy = Util.isEmpty(request.getParameter("schoolAcademy")) ? null : request.getParameter("schoolAcademy");
        //??????
//        String classes = Util.isEmpty(request.getParameter("schoolClass")) ? tAssignmentService.findAllClassByAcademyIdStr(request.getParameter("schoolAcademy")) : request.getParameter("schoolClass");
//        String[] schoolClasses = classes.split(",");
        String[] schoolClasses = Util.isEmpty(request.getParameter("schoolClass")) ? tAssignmentService.findAllClassByAcademyId(request.getParameter("schoolAcademy")) : request.getParameterValues("schoolClass");
        //??????ID
        Integer testWkLessonId = Util.isEmpty(request.getParameter("testWkLessonId")) ? null : Integer.valueOf(request.getParameter("testWkLessonId"));
        //????????????
        String date = request.getParameter("duedateTest");

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
        Integer timelimitOneTest = request.getParameter("customTime").equals("?????????") ? Integer.valueOf(request.getParameter("customTime1")) : 1;
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
        Integer aid = testInfoService.saveTest(testInfoVO, shareService.getUserByUsername(username), siteId, projectName);
        if (!"*000".equals(schoolAcademy)) {
            tAssignmentService.saveTAssignmentClass(aid, schoolClasses);
        }
        //???????????????
        tAssignmentService.createGradebook(siteId, aid, testChapterType, testWkChapterId);
        map.put("status", testInfoVO.getStatus());
        map.put("projectTitle", projectTitle);
        return "true";
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ?????????
     * @date 2017-08-09
     **************************************************************************/
    @RequestMapping("/editTest")
    public String editTest(HttpServletRequest request, Map<String, Object> map, Integer cid, Integer assignmentId, Integer moduleType) throws Exception {
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
            List<WkChapterDto> wkChapterDtoList = wkChapterService.findWkChaptersByTCourseSiteIdAndModuleType(tCourseSiteId, editTestVo.getTestChapterType());
            map.put("wkChapters", wkChapterDtoList);
        }
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(tCourseSiteId);
        map.put("tCourseSiteVo", tCourseSiteVo);
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
        map.put("projectTitle", projectTitle);
        map.put("assignmentId", assignmentId);
        return "views/editTest";
    }

    /**************************************************************************
     * Description ????????????-??????????????????
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
     * Description ?????????-??????????????????
     *
     * @author ?????????
     * @date 2017-12-21
     **************************************************************************/
    @RequestMapping("/addTestQuestionBank")
    public String addTestQuestionBank(HttpServletRequest request, Integer questionPoolId, Integer page, Integer limit, Integer currsection, Map<String, Object> map, Integer categoryId, Integer selectType) throws Exception {
        //??????????????????
        Object cid = request.getSession().getAttribute("cid");
        Integer tCourseSiteId = Integer.parseInt(cid.toString());
        TCourseSiteVo tCourseSiteVo = shareService.findTCourseSiteBySiteId(tCourseSiteId);
        map.put("coursename", tCourseSiteVo.getTitle());
        map.put("selectCategory", categoryId);
        map.put("selectType", selectType);
        //?????????????????????????????????
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.findQuestionForAddTest(tCourseSiteId, -1, 0);
        map.put("tAssignmentQuestionpool", tAssignmentQuestionpool);
        if (questionPoolId != null) {
            //????????????????????????????????????????????????
            //??????10?????????
            if (null == page) {
                page = 1;
            }
            //?????????????????????????????????
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
            //?????????
            map.put("currpage", page);

            System.out.println("currpage===" + page);
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
        //????????????????????????
        List<QuestionpoolCategoryVo> qcvoList = tAssignmentQuestionPoolService.getAllQuestionPoolCategory();
        map.put("questionpoolCategory", qcvoList);
        return "views/addTestQuestionBank";
    }

    /**
     * ?????????????????????
     *
     * @param questionPoolId ??????id
     * @param page           ?????????
     * @param pageSize       ????????????
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
     * Description ????????????-???????????????????????????
     *
     * @author fubowen
     * @date 2020-12-17
     **************************************************************************/
    @RequestMapping("/updateQuestionPool")
    @ResponseBody
    public List<TAssignmentQuestpoolVo> updateQuestionPool(Integer selectType, Integer categoryId, Integer questionType, Integer siteId) {
        //?????????????????????
        Integer type = -1;
        if (selectType != null) {
            type = selectType;
        }
        List<TAssignmentQuestpoolVo> tAssignmentQuestionpool = tAssignmentQuestionPoolService.updateQuestionPool(siteId, type, 0, categoryId, questionType);
        return tAssignmentQuestionpool;
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
    @RequestMapping("/testQuestionBankDetail")
    public String testQuestionBankDetail(HttpServletRequest request, String sectionIds, Integer sectionId, Integer page, Integer limit, Map<String, Object> map) throws Exception {
        //?????????????????????
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
        //?????????
        map.put("totalRecords", itemIds.length);
        map.put("questionVos", questionVos);
        //sectionId
        map.put("sectionId", sectionId);
        int totalPage = (itemIds.length + limit - 1) / limit;
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
        return "views/testQuestionBankDetail";
    }

    /**************************************************************************
     * Description ?????????-????????????id????????????????????????
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
     * Description ????????????-??????????????????
     *
     * @author ??????
     * @date 2020???7???31???
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
     * Description ????????????-??????????????????api
     *
     * @author ??????
     * @date 2020???7???31???
     **************************************************************************/
    @RequestMapping(value = "/testScoreApi", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<List<LayuiDataVo>> testScoreApi(Integer assignmentId, String authorityName, Integer tCourseSiteId, String username, Integer page, Integer limit, String search) {
        //??????????????????
        List<LayuiDataVo> examGradingList = examGradingService.findTestGradingList(assignmentId, authorityName, shareService.getUserByUsername(username), page, limit, search);
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(tCourseSiteId);
        if (!tCourseSiteVo.getTitle().equals("????????????")) {
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
     * Description ????????????-??????????????????
     *
     * @author ??????
     * @date 2020???7???31???
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
     * Description ????????????-??????????????????api
     *
     * @author ??????
     * @date 2020???7???31???
     **************************************************************************/
    @RequestMapping("/findExamDetailApi")
    @ResponseBody
    public CommonResult<List<ExamDetailsVO>> findExamDetailApi(Integer assignmentId, String username, Integer gradingId, Integer page, Integer limit, Integer dictionary) {
        //dictionary?????????????????????0???????????????1???????????????2????????????
        List<ExamDetailsVO> examDetailsVOList = examDetailService.findExamDetail(assignmentId, username, gradingId, page, limit, dictionary);
        return CommonResult.success(examDetailsVOList, examDetailService.countExamDetail(assignmentId, dictionary));
    }

    /**************************************************************************
     * Description ????????????-??????????????????????????????????????????????????????
     *
     * @author ?????????
     * @date 2017???11???2???
     **************************************************************************/
    @RequestMapping("/isTestCanAnswer")
    @ResponseBody
    public boolean isTestCanAnswer(@RequestParam Integer examId, @RequestParam String username) {
        return examDetailService.getExamIsCanAnswer(examId, username);
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author fubowen
     * @date 2021-7-13
     **************************************************************************/
    @RequestMapping("/startTest")
    public String startTest(@RequestParam int testId, Integer simulation,
                            String fromTeach) {
        UserVo user = this.getCurrUser();
        //??????????????????-????????????????????????
        Integer newTestId = examDetailService.copyTestForGrading(testId, user.getUsername());
        return "redirect:/views/test/beginTest?testId=" + newTestId + "&simulation=" + simulation + "&page=1&fromTeach=" + fromTeach;
    }

    /**************************************************************************
     * Description ????????????-????????????-??????????????????????????????,????????????????????????id
     *
     * @author fubowen
     * @date 2021-8-9
     **************************************************************************/
    @RequestMapping("/createNewTestApi")
    @ResponseBody
    public Integer startTest(@RequestParam Integer testId, @RequestParam String username) {
        //??????????????????-????????????????????????
        return examDetailService.copyTestForGrading(testId, username);
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author lixueteng
     * @date 2017???8???27???
     **************************************************************************/
    @RequestMapping("/beginTest")
    public String beginTest(@RequestParam int testId,
                            Map<String, Object> map, String fromTeach, Integer currpage) {
        UserVo user = this.getCurrUser();
        Integer pageSize = 10;
        if (currpage == null) {
            currpage = 1;
        }
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
        return "views/beginTest";
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ??????
     * @date 2020???10???20???
     **************************************************************************/
    @RequestMapping("/testInfoApi")
    @ResponseBody
    public TestSectionVO testInfoApi(@RequestParam Integer testId, @RequestParam Integer page, @RequestParam Integer pageSize) {
        return testInfoService.getTestDetail(testId, page, pageSize);
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ??????
     * @date 2020???10???20???
     **************************************************************************/
    @RequestMapping("/copyTestApi")
    @ResponseBody
    public boolean copyTestApi(Integer sourceTestId, Integer targetSiteId, String username) {
        TestSectionVO testSectionVO = testInfoService.getTestDetailNew(sourceTestId, -1, 0);
        return testInfoService.copyTest(sourceTestId, targetSiteId, testSectionVO, username);
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
}
