package net.gvsun.gsquestionpool.questionpoolmain.questionPool;

import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.gsquestionpool.dto.UserVo;
import net.gvsun.gsquestionpool.service.common.ShareService;
import net.gvsun.gsquestionpool.service.exampool.ExamQuestionPoolService;
import net.gvsun.gsquestionpool.service.questionPool.QuestionPoolCategoryService;
import net.gvsun.gsquestionpool.service.questionPool.QuestionPoolInAndOutService;
import net.gvsun.gsquestionpool.service.questionPool.QuestionPoolListService;
import net.gvsun.gsquestionpool.service.questionPool.QuestionPoolUpLoadService;
import net.gvsun.gsquestionpool.util.DateFormatUtil;
import net.gvsun.gsquestionpool.util.EmptyUtil;
import net.gvsun.gsquestionpool.vo.common.LayuiUpLoadResponseVo;
import net.gvsun.gsquestionpool.vo.exampool.ExamMajorTermVO;
import net.gvsun.gsquestionpool.vo.exampool.ExamQuestionPoolVO;
import net.gvsun.gsquestionpool.vo.questionPool.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.*;


@Controller
@RequestMapping("/questionPool")
public class QuestionPoolController {
    @Autowired
    private ShareService shareService;
    @Autowired
    private QuestionPoolListService questionPoolListService;
    @Autowired
    private QuestionPoolInAndOutService questionPoolInAndOutService;
    @Autowired
    private QuestionPoolCategoryService questionPoolCategoryService;
    @Autowired
    private QuestionPoolUpLoadService questionPoolUpLoadService;
    @Autowired
    private ExamQuestionPoolService examQuestionPoolService;
    @Value("${projectName}")
    private String projectName;
    @Value("${serverHost}/gvsunExam/views/mainindex?pathType=exam")
    private String examHost;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHostForUpload;
    @Value("${apiGateWayHost}")
    private String apiGateWayHost;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHost;
    @Value("${filePath}")
    private String filePath;
    @Value("${oauth2Host}")
    private String oauth2Host;
    @Value("${gsTeachHost}")
    private String gsTeachHost;

    /**************************************************************************
     * Description ??????????????????-????????????
     *
     * @author ??????
     * @date 2018-08-20
     **************************************************************************/
    @RequestMapping("/deleteQuestionCategory")
    public String deleteQuestionCategory(Integer cateGoryId, HttpServletRequest request, Map<String, Object> map) {
        questionPoolCategoryService.deleteQuestionPoolById(cateGoryId);
        return "redirect:/questionPool/questionCategory";
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ?????????
     * @date 2017-10-11
     **************************************************************************/
    @RequestMapping("/mainPage")
    public String mainPage(Integer currpage, HttpServletRequest request, Map<String, Object> map, Integer type, String title, String username, Integer typ, Integer cid) throws Exception {
        UserVo userVo = this.getCurrUser();
        //????????????
        if (typ == null) {
            if (projectName.equals("proteach")) {
                typ = 1;
            } else {
                typ = 0;
            }
        }
        map.put("typ", typ);
        Object cidO = request.getSession().getAttribute("cid");
        //????????????????????????
        String link = "";
        if(cidO==null){
            link = gsTeachHost+"/system/myCourseList";
        }else{
            link = gsTeachHost+"/teach/mainPage";
        }
        request.getSession().setAttribute("teachUrl",link);
        //Session??????????????????
        Integer cid2 = 0;
        if (cid!=null){
            cid2 = cid;
        }
        if (cidO != null) {
            cid2 = Integer.parseInt(cidO.toString());
        }
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //??????????????????
        map.put("leftMenu", questionPoolLeft);

        //???????????????????????? ??????????????????
        Integer pageSize = 10;
        if (currpage == null) {
            currpage = 1;
        }
        List<QuestionPoolVO> questionPool;
        if (typ == 0) {
            questionPool = questionPoolListService.findQuestionPool(currpage, pageSize, type, title, username);
            map.put("questionPool", questionPool);
        } else if (typ == 1) {
            questionPool = questionPoolListService.findQuestionListBySiteId(cid2, title, username, currpage, pageSize, type);
            map.put("questionPool", questionPool);
        }
        //List<QuestionPoolVO> questionPool = questionPoolListService.findQuestionPool(currpage,pageSize,type,title,username);
//        map.put("questionPool",questionPool);
        //  List<QuestionPoolVO> courseQuestionPool = questionPoolListService.findQuestionListBySiteId(cid2,title,username);
//        map.put("courseQuestionPool",courseQuestionPool);
//        if(typ==0){
//            map.put("questionPool",questionPool);
//        }else if(typ==1) {
//            map.put("questionPool",courseQuestionPool);
//        }
        int totalRecords = 0;
        int totalPage = 0;
        if (typ == 0) {
            totalRecords = questionPoolListService.countQuestionPool(type, title, username);
            totalPage = (totalRecords + pageSize - 1) / pageSize;
        } else if (typ == 1) {
            totalRecords = questionPoolListService.findQuestionListBySiteIdNumber(cid2, title, username, type).size();
            totalPage = (totalRecords + pageSize - 1) / pageSize;
        }

        map.put("totalRecords", totalRecords);
        //??????
        map.put("type", type);
        map.put("title", title);
        map.put("username", username);
        //?????????
        map.put("currpage", currpage);
        //?????????
        map.put("totalPage", totalPage);
        // ????????????select???
        int[] pageArray = new int[totalPage];//n?????????
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        map.put("pageArray", pageArray);
        //????????????
        map.put("projectName", projectName);
        //??????????????????
        // ????????????????????????
        map.put("examHost", examHost);
        String image=shareService.findStageMangeByType();
        // map.put("image", image);
        // map.put("resourceContainerHost", apiGateWayHost+"/resource");
        //map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        // map.put("currentUsername", userVo.getUsername());
        request.getSession().setAttribute("image", image);
        request.getSession().setAttribute("currentUsername", userVo.getUsername());
        request.getSession().setAttribute("currentUserCname", userVo.getCname());
        request.getSession().setAttribute("resourceContainerHost", resourceContainerHost);
        request.getSession().setAttribute("resourceContainerHostForUpload", resourceContainerHostForUpload);
        request.getSession().setAttribute("oauth2Host", oauth2Host);
        return "questionPool/questionPool";
    }


    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2017-10-11
     **************************************************************************/
    @RequestMapping("/automatic")
    public String automatic(HttpServletRequest request, Map<String, Object> map, Integer id, Integer type) throws Exception {
        //?????????????????????
        //????????????????????????
        List<QuestionPoolCategoryVO> allQuestionPoolCategory =
                questionPoolListService.findAllQuestionPoolCategory();
        map.put("category", allQuestionPoolCategory);
        //?????????????????????


        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //??????????????????
        map.put("leftMenu", questionPoolLeft);
        map.put("id", id);
//        if(id!=null){
//            ExamQuestionPoolVO pool=
//        }
        if (id == null) {
            map.put("showData", false);
            map.put("examQuestionPoo", new ExamQuestionPoolVO());
        } else {
            //???????????????

            ExamQuestionPoolVO examQuestionPoo = questionPoolListService.findExamQuestionPoolVOById(id, type);
            map.put("examQuestionPoo", examQuestionPoo);
            //????????????
            map.put("showData", true);
        }
        map.put("examHost", examHost);
        return "questionPool/automatic";
    }

    /**************************************************************************
     * Description ????????????-????????????????????????
     *
     * @author ?????????
     * @date 2017-11-30
     **************************************************************************/
    @RequestMapping("/questionPoolContent")
    public String questonPoolContent(Integer questionPoolId, Map<String, Object> map, Integer type, String name, Integer flag, Integer currpage) throws Exception {
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //??????????????????
        map.put("leftMenu", questionPoolLeft);
        //??????10?????????
        Integer pageSize = 10;
        if (currpage == null) {
            currpage = 1;
        }
        //?????????????????????????????????
        QuestionPoolVO questionPool = questionPoolListService.findQuestionPoolById(questionPoolId);
        map.put("questionPool", questionPool);
        List<QuestionVo> relist = questionPoolListService.findquestionPoolList(questionPoolId, currpage, name, type, flag);
        Integer totalRecords = questionPoolListService.countTAssignmentItem(questionPoolId, name, type, flag);
        int totalPage = (totalRecords + pageSize - 1) / pageSize;
        map.put("totalRecords", totalRecords);
        //?????????
        map.put("currpage", currpage);
        //?????????
        if (totalPage == 0) {
            totalPage = 1;
        }
        map.put("totalPage", totalPage);
        // ????????????select???
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        map.put("pageArray", pageArray);
        map.put("name", name);
        map.put("type", type);
        map.put("flag", flag);
        map.put("relist", relist);
        map.put("questionPoolId", questionPoolId);
        map.put("projectName", projectName);
        map.put("examHost", examHost);
        map.put("resourceContainerHost", apiGateWayHost+"/resource");
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        map.put("currentUsername", this.getCurrUser().getUsername());
        map.put("currentUserCname", this.getCurrUser().getCname());
        return "questionPool/questionPoolContent";
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ??????
     * @date 2017-12-4
     **************************************************************************/
    @RequestMapping("/deleteTAssignmentItem")
    public String deleteTAssignmentItem(@RequestParam Integer questionPoolId, Map<String, Object> map, Integer itemId, Integer type) {
        questionPoolListService.deleteTAssignmentItemById(itemId, questionPoolId);
        if(type!=null && !type.equals("")){
            return "redirect:/questionPool/questionPoolContent?questionPoolId=" + questionPoolId + "&type=" + type;
        }else{
            return "redirect:/questionPool/questionPoolContent?questionPoolId=" + questionPoolId;
        }
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ??????
     * @date 2017-12-6
     **************************************************************************/
    @RequestMapping("/addQuestion")
    public String addQuestion(HttpServletRequest request, Map<String, Object> map, @RequestParam Integer questionPoolId) throws Exception {
        String itemId = request.getParameter("itemId");
        //????????????
        String type = request.getParameter("type");
        Integer isOrder = null;
        // ???????????????
        if ("8".equals(type)) {//?????????????????????
            if (request.getParameter("isOrder") == null || "".equals(request.getParameter("isOrder"))) {
                isOrder = 1;
            } else {
                isOrder = Integer.valueOf(request.getParameter("isOrder"));
            }
        }
        // ?????????
        if ("5".equals(type)) {
            if (request.getParameter("gradeType") == null || "".equals(request.getParameter("gradeType"))) {
                isOrder = 1;
            } else {
                isOrder = Integer.valueOf(request.getParameter("gradeType"));
            }
        }
        //??????
        String stem = request.getParameter("stem");
        //????????????
        String answerLabel = request.getParameter("answer");
        //????????????????????????
        String answerText = request.getParameter("single");
        //????????????
        String answerLabelChoice = request.getParameter("answerLabelChoices");
        //???????????????????????????
        String sanswerWeight = request.getParameter("sanswerWeight");
        //????????????????????????
        String singleWeight = request.getParameter("singleWeight");
        //??????????????????
        UserVo userVo = this.getCurrUser();
        if (!EmptyUtil.isEmpty(type)) {
            if (!EmptyUtil.isEmpty(itemId)) {//??????
                questionPoolListService.insertTAssignmentItem(type, stem, answerLabel, answerText, userVo, answerLabelChoice, questionPoolId, Integer.parseInt(itemId), isOrder,sanswerWeight,singleWeight);
            } else {//??????
                questionPoolListService.insertTAssignmentItem(type, stem, answerLabel, answerText, userVo, answerLabelChoice, questionPoolId, null, isOrder,sanswerWeight,singleWeight);
            }
        }
        return "redirect:/questionPool/questionPoolContent?questionPoolId=" + questionPoolId;
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ??????
     * @date 2017-12-9
     **************************************************************************/
    @RequestMapping("/modifyQuestion")
    public String modifyQuestion(@RequestParam Integer questionPoolId, HttpServletRequest request, Map<String, Object> map, Integer itemId, Integer type) {
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //??????????????????
        map.put("leftMenu", questionPoolLeft);
        QuestionVo question = questionPoolListService.findQuestionOptionById(itemId);
        map.put("type", question.getType());
        map.put("question", question);
        map.put("count", question.getItemOptions().size());
        map.put("questionPoolId", questionPoolId);
        map.put("examHost", examHost);
        //????????????????????????
        UserVo userVo=this.getCurrUser();
        map.put("resourceContainerHost",apiGateWayHost+"/resource");
        map.put("resourceContainerHostForUpload",resourceContainerHostForUpload);
        map.put("currentUsername", userVo.getUsername());
        map.put("currentUserCname",userVo.getCname());
//        map.put("type",type);
        return "questionPool/modifyQuestionPool";
    }

    /**************************************************************************
     * Description ????????????-????????????
     *
     * @author ?????????
     * @date 2018-10-30
     **************************************************************************/
    @RequestMapping("/markQuestionFlag")
    public String markQuestionFlag(@RequestParam Integer questionPoolId, HttpServletRequest request, Map<String, Object> map, Integer itemId, Integer currpage) {
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //??????????????????
        map.put("leftMenu", questionPoolLeft);
        //???flag???0??????1
        questionPoolListService.markQuestionFlag(itemId);
        map.put("questionPoolId", questionPoolId);
        return "redirect:/questionPool/questionPoolContent?questionPoolId=" + questionPoolId + "&currpage=" + currpage;
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2018-10-30
     **************************************************************************/
    @RequestMapping("/markQuestionFlagBack")
    public String markQuestionFlagBack(@RequestParam Integer questionPoolId, HttpServletRequest request, Map<String, Object> map, Integer itemId, Integer currpage) {
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //??????????????????
        map.put("leftMenu", questionPoolLeft);
        //???flag???1??????0
        questionPoolListService.markQuestionFlagBack(itemId);
        map.put("questionPoolId", questionPoolId);
        return "redirect:/questionPool/questionPoolContent?questionPoolId=" + questionPoolId + "&currpage=" + currpage;
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2017-11-30
     **************************************************************************/
    @RequestMapping("/modifyQuestionPool")
    public String modifyQuestionPool(@RequestParam Integer questionPoolId, HttpServletRequest request, Map<String, Object> map, Integer typ) throws Exception {
        //????????????????????????
        List<QuestionPoolCategoryVO> allQuestionPoolCategory =
                questionPoolListService.findAllQuestionPoolCategory();
        map.put("typ", typ);
        map.put("category", allQuestionPoolCategory);
        //?????? ???????????????????????????
        map.put("questionPoolId", questionPoolId);
        if (questionPoolId == -1) {
            map.put("questionPool", new QuestionPoolVO());
        } else {
            //???????????????id???????????????????????????
            QuestionPoolVO questionVO = questionPoolListService.findQuestionPoolById(questionPoolId);
            map.put("questionPool", questionVO);
        }
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //??????????????????
        map.put("leftMenu", questionPoolLeft);
        map.put("projectName", projectName);
        map.put("examHost", examHost);
        return "questionPool/addPool";
    }


    /**************************************************************************
     * Description ??????????????????-??????????????????
     *
     * @author ?????????
     * @date 2017-12-06
     **************************************************************************/
    @RequestMapping("/questionCategory")
    public String questionCategory(HttpServletRequest request, Map<String, Object> map) {
        List<QuestionPoolCategoryVO> questionPoolCategoryList = questionPoolCategoryService.getAllQuestionPoolCategories();
        map.put("questionPoolCategoryList", questionPoolCategoryList);
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //??????????????????
        map.put("leftMenu", questionPoolLeft);
        UserVo userVo=this.getCurrUser();
        map.put("projectName", projectName);
        map.put("examHost", examHost);
        String image=shareService.findStageMangeByType();
        // map.put("image", image);
        // map.put("resourceContainerHost", apiGateWayHost+"/resource");
        //map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        // map.put("currentUsername", userVo.getUsername());
        request.getSession().setAttribute("image", image);
        request.getSession().setAttribute("currentUsername", userVo.getUsername());
        request.getSession().setAttribute("currentUserCname", userVo.getCname());
        request.getSession().setAttribute("resourceContainerHost", apiGateWayHost+"/resource");
        request.getSession().setAttribute("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "questionPool/questionCategory";
    }


    /**************************************************************************
     * Description ?????????-??????????????????
     *
     * @author ?????????
     * @date 2017-12-21
     **************************************************************************/
    @RequestMapping("/addedQuestions")
    public String addedQuestions(HttpServletRequest request, Integer questionPoolId, Integer currpage, Integer currsection, Map<String, Object> map) throws Exception {
        Object cid = request.getSession().getAttribute("cid");
        //????????????????????? ?????????????????????
        int pageSizeWithQuestionPoool = Integer.MAX_VALUE;
        //????????????????????????
        List<QuestionPoolVO> questionPool = questionPoolListService.findQuestionPool(1, pageSizeWithQuestionPoool, null, null, null);
        //????????????????????????
        if(cid!=null && !cid.equals("")){
            questionPool.addAll(questionPoolListService.findQuestionListBySiteId(Integer.parseInt(cid.toString()), null, null, 1, Integer.MAX_VALUE, null));
        }
        map.put("questionPool", questionPool);
        if (questionPoolId != null) {
            //????????????????????????????????????????????????
            //??????10?????????
            Integer pageSize = 10;
            if (null == currpage) {
                currpage = 1;
            }
            //?????????????????????????????????
            QuestionPoolVO questionPoolSelected = questionPoolListService.findQuestionPoolById(questionPoolId);
            map.put("questionPoolSelected", questionPoolSelected);
            List<QuestionVo> relist = questionPoolListService.findquestionPoolList(questionPoolId, currpage, null, null, null);
            Integer totalRecords = questionPoolListService.countTAssignmentItem(questionPoolId, null, null, null);
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
        } else {
            map.put("questionPoolSelected", new QuestionPoolVO());
        }
        map.put("currsection", currsection);
        return "questionPool/addedQuestions";
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
        int[] newItemIds = new int[itemIds.length];
        for (int i = 0; i < itemIds.length; i++) {
            newItemIds[i] = Integer.parseInt(itemIds[i]);
        }
        if (currpage == null) {
            currpage = 1;
        }
        List<QuestionVo> questionVos = examQuestionPoolService.showAllQuestionByIds(newItemIds, currpage);
        map.put("currpage", currpage);
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
        return "questionPool/viewQuestions";
    }


    /**************************************************************************
     * Description ??????????????????-??????????????????
     *
     * @author ?????????
     * @date 2017-12-06
     **************************************************************************/
    @RequestMapping("/addQuestionCategory")
    public String addQuestionCategory(HttpServletRequest request, Map<String, Object> map) {
        QuestionPoolCategoryVO questionPoolCategoryVO = new QuestionPoolCategoryVO();
        map.put("questionPoolCategoryVO", questionPoolCategoryVO);
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //??????????????????
        map.put("leftMenu", questionPoolLeft);
        map.put("examHost", examHost);
        return "questionPool/addQuestionCategory";
    }

    /**************************************************************************
     * Description ??????????????????-??????????????????
     *
     * @author ?????????
     * @date 2017-12-06
     **************************************************************************/
    @RequestMapping("/editQuestionCategory")
    public String editQuestionCategory(HttpServletRequest request, Map<String, Object> map, Integer categoryId) {
        QuestionPoolCategoryVO questionPoolCategoryVO = questionPoolCategoryService.getQuestionPoolCategoryById(categoryId);
        map.put("questionPoolCategoryVO", questionPoolCategoryVO);
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //??????????????????
        map.put("leftMenu", questionPoolLeft);
        map.put("examHost", examHost);
        return "questionPool/addQuestionCategory";
    }

    /**
     * ????????????-??????????????????
     *
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/saveQuestionCategory")
    public String saveQuestionCategory(HttpServletRequest request, Map<String, Object> map, @ModelAttribute QuestionPoolCategoryVO questionPoolCategoryVO) {
        questionPoolCategoryService.saveQuestionCategory(questionPoolCategoryVO);
        return "redirect:/questionPool/questionCategory";
    }


    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2017-11-30
     **************************************************************************/
    @RequestMapping("/addQuestionPool")
    public String addQuestionPool(@RequestParam Integer questionPoolId, HttpServletRequest request, Map<String, Object> map) throws Exception {
        map.put("questionPoolId", questionPoolId);
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //??????????????????
        map.put("leftMenu", questionPoolLeft);
        map.put("examHost", examHost);
        //????????????????????????
        UserVo userVo=this.getCurrUser();
        map.put("resourceContainerHost",apiGateWayHost+"/resource");
        map.put("resourceContainerHostForUpload",resourceContainerHostForUpload);
        map.put("currentUsername", userVo.getUsername());
        map.put("currentUserCname",userVo.getCname());
        return "questionPool/addQuestionPool";
    }


    /**************************************************************************
     * Description ????????????-???????????????
     *
     * @author ?????????
     * @date 2017-12-18
     **************************************************************************/
    @RequestMapping("/testLibrary")
    public String testLibrary(Integer currpage, HttpServletRequest request, Map<String, Object> map, Integer type) throws Exception {
        //??????????????????
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        map.put("leftMenu", questionPoolLeft);
        //??????10?????????
        Integer pageSize = 10;
        map.put("pageSize", pageSize);
        if (currpage == null) {//????????????????????????????????????
            currpage = 1;
        }
        //?????????
        map.put("currpage", currpage);
        //????????????????????????
        List<TestLibraryVo> tepool = questionPoolListService.findAllTestLibrary(currpage, pageSize, type);
        map.put("tepool", tepool);
        //????????????
        Integer totalRecords = questionPoolListService.countExamQuestionpool(type);
        map.put("totalRecords", totalRecords);
        //?????????
        int totalPage = (totalRecords + pageSize - 1) / pageSize;
        map.put("totalPage", totalPage);
        // ????????????select???
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        map.put("pageArray", pageArray);
        map.put("type", type);
        map.put("examHost", examHost);
        return "questionPool/testLibrary";
    }

    /**************************************************************************
     * Description ???????????????????????????
     *
     * @author ?????????
     * @date 2017-12-25
     **************************************************************************/
    @RequestMapping("/deleteExamQuestionpool")
    public @ResponseBody
    String deleteExamQuestionpool(Integer examQuestionpoolId) throws Exception {
        questionPoolListService.deleteExamQuestionpool(examQuestionpoolId);
        return "success";
    }

    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2017-12-18
     **************************************************************************/
    @RequestMapping("/manually")
    public String manually(HttpServletRequest request, Map<String, Object> map, Integer id, Integer type) throws Exception {
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //??????????????????
        map.put("leftMenu", questionPoolLeft);
        //?????????????????????hh

        List<QuestionPoolCategoryVO> allQuestionPoolCategory =
                questionPoolListService.findAllQuestionPoolCategory();
        map.put("category", allQuestionPoolCategory);


        List<QuestionPoolCategoryVO> questionPoolCategoryList = questionPoolCategoryService.getAllQuestionPoolCategories();
        if (id == null) {
            map.put("showData", false);
            map.put("examQuestionPoo", new ExamQuestionPoolVO());
        } else {
            ExamQuestionPoolVO examQuestionPoo = questionPoolListService.findExamQuestionPoolVOById(id, type);
            map.put("examQuestionPoo", examQuestionPoo);
            //????????????
            map.put("showData", true);
        }
        map.put("questionPoolCategoryList", questionPoolCategoryList);
        map.put("id", id);
        map.put("examHost", examHost);
        return "questionPool/manually";
    }


    /**************************************************************************
     * Description ????????????-??????????????????
     *
     * @author ?????????
     * @date 2017-12-18
     **************************************************************************/
    @RequestMapping("/independent")
    public String independent(HttpServletRequest request, Map<String, Object> map, Integer id, Integer type) throws Exception {
        //???????????????
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        map.put("leftMenu", questionPoolLeft);
        //?????????????????????
        List<QuestionPoolCategoryVO> questionPoolCategoryList = questionPoolCategoryService.getAllQuestionPoolCategories();
        map.put("questionPoolCategoryList", questionPoolCategoryList);
        map.put("id", id);
        if (id == null) {
            map.put("showData", false);
            map.put("examQuestionPoo", new ExamQuestionPoolVO());
        } else {
            ExamQuestionPoolVO examQuestionPoo = questionPoolListService.findExamQuestionPoolVOById(id, type);
            map.put("examQuestionPoo", examQuestionPoo);
            //????????????
            map.put("showData", true);
        }
        map.put("examHost", examHost);
        return "questionPool/independent";
    }


    /**************************************************************************
     * Description ????????????-?????????????????????
     *
     * @author ?????????
     * @date 2017-12-18
     **************************************************************************/
    @RequestMapping("/libraryMosify")
    public String libraryMosify(HttpServletRequest request, Map<String, Object> map) throws Exception {

        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //??????????????????
        map.put("leftMenu", questionPoolLeft);
        return "questionPool/libraryMosify";
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
     * Description ??????-???????????????
     *
     * @author ?????????
     * @date 2017???11???29???
     **************************************************************************/
    // ????????????
    @RequestMapping(value = "/importQuestionPoolItem", method = RequestMethod.POST)
    @ResponseBody
    public Object upload(@RequestParam("file") MultipartFile file, Integer questionPoolId) throws Exception {
        UserVo userVo = getCurrUser();
        LayuiUpLoadResponseVo layui = new LayuiUpLoadResponseVo();
        String name = file.getOriginalFilename();
        if (!name.endsWith("xlsx") && !name.endsWith("xls")) {
            layui.setCode(2);
            layui.setMsg("??????????????????");
            layui.setData(new ArrayList<>());
        } else {
            InputStream input = file.getInputStream();
            //???inputstream??????byte
            ByteArrayOutputStream outStream = new ByteArrayOutputStream();
            byte[] data = new byte[4096];
            int count = -1;
            while ((count = input.read(data, 0, 4096)) != -1) {
                outStream.write(data, 0, count);
            }
            data = null;
            byte[] bytes = outStream.toByteArray();
            Map<String, String> result = questionPoolUpLoadService.resolveExcelWithQUestionPool(bytes, name, questionPoolId, userVo,filePath, ClientDatabaseContextHolder.getClientDatabase());
//        LayuiUpLoadResponseVo layui = new LayuiUpLoadResponseVo();
            if (!result.get("message").equals("ok")) {
                layui.setCode(0);
                layui.setMsg(result.get("message") + "Excel??????????????????????????????" + result.get("x") + "???" + result.get("y"));
                layui.setData(new ArrayList<>());
            } else {
                layui.setCode(1);
                layui.setMsg("????????????");
            }
        }
        return layui;


    }

    /**************************************************************************
     * Description ??????--????????????
     *
     * @author ?????????
     * @date 2017???12???4???
     **************************************************************************/
    // ????????????
    @RequestMapping("/saveQuestionPool")
    public String saveQuestionPool(Map<String, Object> map, HttpServletRequest request) throws Exception {
        //????????????
        Object cidO = request.getSession().getAttribute("cid");
        UserVo userVo = getCurrUser();
        //?????????id
        String questionPoolId = request.getParameter("questionPoolId");
        //???????????????
        String title = request.getParameter("title");
        //???????????????
        String category = request.getParameter("category");
        //?????????????????????
        String createdTime = request.getParameter("createdTime");
        //??????????????? 1???????????? 2????????????
        String type = request.getParameter("type");
        QuestionPoolVO questionPoolVO = new QuestionPoolVO();
        if (questionPoolId != null && !"".equals(questionPoolId)) {
            questionPoolVO.setId(Integer.parseInt(questionPoolId));
        }
        questionPoolVO.setTitle(title);
        questionPoolVO.setUsername(userVo.getUsername());
        questionPoolVO.setCreateTime(DateFormatUtil.stringToDate2(createdTime));
        questionPoolVO.setCategory(Integer.parseInt(category));
        if ("ycteach".equals(projectName)) {
            questionPoolVO.setType(1);
        } else {
            questionPoolVO.setType(Integer.valueOf(type));
        }
        if (cidO != null) {
            Integer cid2 = Integer.parseInt(cidO.toString());
            questionPoolListService.saveQuestionPool(questionPoolVO, userVo, cid2);
        } else {
            //Session??????????????????
            return "redirect:/questionPool/login";
        }
        //????????????????????????
        if (questionPoolVO.getType() == 1) {
            return "redirect:/questionPool/mainPage?typ=0";
        } else {
            return "redirect:/questionPool/mainPage?typ=1";
        }
    }

    /**************************************************************************
     * Description ????????????--?????????????????????id????????????
     *
     * @author ?????????
     * @date 2017???12???05???
     **************************************************************************/
    @RequestMapping("/deleteQuestionPool")
    public String deleteQuestionPool(Integer questionPoolId, Integer typ) {
        questionPoolListService.deleteQuestionPoolById(questionPoolId);
        return "redirect:/questionPool/mainPage?typ=" + typ;
    }

    /**************************************************************************
     * Description ????????????--???????????????
     *
     * @author ?????????
     * @date 2017???12???05???
     **************************************************************************/
    @ResponseBody
    @RequestMapping("/exportExcelQuestionPoolById")
    public void exportExcelQuestionPoolById(@RequestParam Integer questionPoolId, HttpServletResponse response) throws IOException {
        String title = questionPoolListService.findTAssignmentQuestionById(questionPoolId);
        byte[] bytes = questionPoolInAndOutService.exportExcelQuestionPoolById(questionPoolId);
        String titleQuestion = "Questionpool-" + title;
        titleQuestion = titleQuestion.replaceAll("\\/", "_");
        response.setContentType("multipart/form-data;charset=UTF-8");// ??????response???????????????
        response.setHeader(
                "Content-disposition",
                "attachment;filename="
                        + URLEncoder.encode(titleQuestion + ".xls", "UTF-8"));// ??????????????????
        ServletOutputStream outputStream = response.getOutputStream();
        outputStream.write(bytes);
        outputStream.close();

      /*  File file = new File(fileName);
        if (file.exists()) {
            InputStream fis = new FileInputStream(fileName);
            response.reset();
            response.setContentType("multipart/form-data;charset=UTF-8");// ??????response???????????????
            response.setHeader(
                    "Content-disposition",
                    "attachment;filename="
                            + URLEncoder.encode(fileName, "UTF-8"));// ??????????????????
            OutputStream fos = response.getOutputStream();
            byte[] buffer = new byte[8192];
            int count = 0;
            while ((count = fis.read(buffer)) > 0) {
                fos.write(buffer, 0, count);
            }
            fos.close();
            fis.close();
        }
        //??????????????????
        File file2 = new File(fileName);
        file2.delete();*/
    }

    /**************************************************************************
     * Description ?????????--????????????
     *
     * @author ?????????
     * @date 2017???12???19???
     **************************************************************************/
    @RequestMapping("/saveExamPapaer")
    public String saveExamPapaer(HttpServletRequest request) {
        //?????????????????????
        String examTitle = request.getParameter("examTitle");
        //?????????????????????
        String examCategory = request.getParameter("examCategory");
        //?????????????????????
        String totalScore = request.getParameter("totalScore");
        //?????????????????????
        String[] maxTerms = request.getParameterValues("maxTerm");
        //????????????????????????????????????
        String[] termScores = request.getParameterValues("termScore");

        return "redirect:/questionPool/testLibrary";
    }

    /**************************************************************************
     * Description ?????????--????????????
     *
     * @author ?????????
     * @date 2017???12???19???
     * @author ???????????????2018???12???17??????
     **************************************************************************/
    @ResponseBody
    @RequestMapping("/getAllQuestionPool")
    public List<QuestionPoolVO> getAllQuestionPool(HttpServletRequest request) {
        Object cid = request.getSession().getAttribute("cid");
        //????????????????????????
        List<QuestionPoolVO> questionPool = questionPoolListService.findQuestionPool(1, 999, null, null, null);
        //????????????????????????
        if(cid!=null && !cid.equals("")){
            questionPool.addAll(questionPoolListService.findQuestionListBySiteId(Integer.parseInt(cid.toString()), null, null, 1, 999, null));
        }
        return questionPool;
    }

    /**************************************************************************
     * Description ?????????-????????????-????????????
     *
     * @author ??????
     * @date 2017???12???28???
     **************************************************************************/
    @RequestMapping(value = "/importExamPoolItem", method = RequestMethod.POST)
    @ResponseBody
    public Object importExamPoolItem(@RequestParam("file") MultipartFile file) throws Exception {
        UserVo userVo = getCurrUser();
        String name = file.getName();
        InputStream input = file.getInputStream();
        //???inputstream??????byte
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        byte[] data = new byte[4096];
        int count = -1;
        while ((count = input.read(data, 0, 4096)) != -1) {
            outStream.write(data, 0, count);
        }
        data = null;
        byte[] bytes = outStream.toByteArray();
        Set<Integer> itemIds = questionPoolUpLoadService.resolveExcelWithExamPool(bytes, name, userVo);
        String rs = "";
        for (Integer itemId : itemIds) {
            rs += itemId + ",";
        }
        LayuiUpLoadResponseVo layuiUpLoadResponseVo = new LayuiUpLoadResponseVo();
        layuiUpLoadResponseVo.setCode(0);
        layuiUpLoadResponseVo.setMsg(rs.substring(0, rs.length() - 1));
        layuiUpLoadResponseVo.setData(new ArrayList<>());
        return layuiUpLoadResponseVo;
    }

    /**************************************************************************
     * Description ?????????-??????????????????
     *
     * @author ?????????
     * @date 2017???12???29???
     **************************************************************************/
    @RequestMapping("/independentExamSection")
    public String saveIndependentExamSection(HttpServletRequest request, Integer id) {
        //??????????????????
        String currUsername = getCurrUser().getUsername();
        //?????????????????????????????????
        //???????????????
        String examQuestionPoolTitle = request.getParameter("examQuestionPoolTitle");
        //???????????????
        Integer examQuestionPoolcategory = Integer.valueOf(request.getParameter("category"));
        //??????????????????
        String username = currUsername;
        //?????????????????????
        Date date = new Date();
        String score = request.getParameter("score");
        //???????????????
        double score2 = Double.valueOf(request.getParameter("score"));
        //???????????????
        List<ExamMajorTermVO> sections = new ArrayList<>();
        //?????????VO
        ExamQuestionPoolVO pool = new ExamQuestionPoolVO();
        pool.setTitle(examQuestionPoolTitle);
        pool.setCategory(examQuestionPoolcategory);
        pool.setCreateTime(date);
        pool.setScore(score2);
        pool.setUsername(username);

        //??????????????????????????????id??????
        String examSectionIds[] = request.getParameterValues("examSectionId");
        //?????????????????????????????????????????????????????????
        if (examSectionIds != null) {
            for (int i = 0; i < examSectionIds.length; i++) {
                //?????????????????????????????????,?????????????????????id????????????
                //?????????????????????
                String examSectionTitle = request.getParameter("examSectionTitle_" + examSectionIds[i]);
                //??????????????????????????????
                int itemcount = Integer.valueOf(request.getParameter("itemCount" + examSectionIds[i]));
                //??????????????????????????????
                double itemscore = Double.valueOf(request.getParameter("itemScore_" + examSectionIds[i]));
                //??????????????????????????????
                List<Integer> itemIds = new ArrayList<>();//??????????????????List
                String itemList = request.getParameter("itemList" + examSectionIds[i]);//??????????????????id??????????????????
                String[] itemIdsByString = itemList.split(",");//??????????????????id?????????String??????
                //????????????????????????id?????????itemIds???
                for (String itemId : itemIdsByString) {
                    //?????????????????????????????????
                    itemIds.add(Integer.valueOf(itemId));
                }
                //???????????????vo
                ExamMajorTermVO examMajorTermVO = new ExamMajorTermVO();
                examMajorTermVO.setTitle(examSectionTitle);
                examMajorTermVO.setItemcount(itemcount);
                examMajorTermVO.setItemscore(itemscore);
                examMajorTermVO.setItemids(itemIds);

                //??????????????????????????????
                sections.add(examMajorTermVO);
            }
        }
        //???????????????????????????
        pool.setExamMajorTerms(sections);
        //???????????????
        examQuestionPoolService.saveIndependentPool(pool, id);
        return "redirect:/questionPool/testLibrary";
    }

    /**************************************************************************
     * Description ?????????-?????????????????????????????????
     *
     * @author ?????????
     * @date 2018-1-2
     **************************************************************************/
    @RequestMapping("/viewIndependentQuestions")
    public String viewIndependentQuestions(HttpServletRequest request, String sectionIds, Integer sectionId, Integer currpage, Map<String, Object> map) throws Exception {
        if (currpage == null) {
            currpage = 1;
        }
        //???????????????????????????
        map.put("sectionIds", sectionIds);
        //?????????????????????
        String[] itemIds = sectionIds.split(",");
        int[] newItemIds = new int[itemIds.length];
        for (int i = 0; i < itemIds.length; i++) {
            newItemIds[i] = Integer.parseInt(itemIds[i]);
        }
        //????????????
        Integer pageSize = 10;
        //??????vo
        List<QuestionVo> questionVos = examQuestionPoolService.findAllQuestionByIds(newItemIds, currpage, pageSize);
        map.put("questionVos", questionVos);
        //?????????
        map.put("currpage", currpage);
        //?????????
        map.put("totalRecords", itemIds.length);
        //?????????
        int totalPage = (itemIds.length + pageSize - 1) / pageSize;
        map.put("totalPage", totalPage);
        //sectionId
        map.put("sectionId", sectionId);
        //????????????select???
        int[] pageArray = new int[totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i + 1;
        }
        map.put("pageArray", pageArray);
        return "questionPool/viewIndependentQuestions";
    }
}
