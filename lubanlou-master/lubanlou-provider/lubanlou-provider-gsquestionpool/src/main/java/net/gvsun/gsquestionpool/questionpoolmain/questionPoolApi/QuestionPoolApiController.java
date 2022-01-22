package net.gvsun.gsquestionpool.questionpoolmain.questionPoolApi;

import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.gsquestionpool.dto.UserVo;
import net.gvsun.gsquestionpool.service.common.ShareService;
import net.gvsun.gsquestionpool.service.exampool.ExamQuestionPoolService;
import net.gvsun.gsquestionpool.service.questionPool.QuestionPoolCategoryService;
import net.gvsun.gsquestionpool.service.questionPool.QuestionPoolListService;
import net.gvsun.gsquestionpool.service.questionPool.QuestionPoolUpLoadService;
import net.gvsun.gsquestionpool.util.EmptyUtil;
import net.gvsun.gsquestionpool.vo.common.LayuiUpLoadResponseVo;
import net.gvsun.gsquestionpool.vo.exampool.ExamItemVo;
import net.gvsun.gsquestionpool.vo.exampool.ExamMajorTermVO;
import net.gvsun.gsquestionpool.vo.exampool.ExamQuestionPoolVO;
import net.gvsun.gsquestionpool.vo.questionPool.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.*;


@RestController
@RequestMapping("/questionPoolApi")
public class QuestionPoolApiController {
    private String fail = "fail";
    private String success = "success";
    @Autowired
    private ShareService shareService;
    @Autowired
    private QuestionPoolListService questionPoolListService;
    @Autowired
    private QuestionPoolCategoryService questionPoolCategoryService;
    @Autowired
    private QuestionPoolUpLoadService questionPoolUpLoadService;
    @Autowired
    private ExamQuestionPoolService examQuestionPoolService;
    @Value("${projectName}")
    private String projectName;
    @Value("${filePath}")
    private String filePath;
    /**************************************************************************
     * Description 题库类别管理-删除功能
     *
     * @author 曹焕
     * @date 2018-08-20
     **************************************************************************/
    @RequestMapping("/deleteQuestionCategory")
    public String deleteQuestionCategory(Integer cateGoryId){
        questionPoolCategoryService.deleteQuestionPoolById(cateGoryId);
        return "redirect:/questionPool/questionCategory";
    }
    /**************************************************************************
     * Description 题库模块-题库入口
     *
     * @author 李梦晨
     * @date 2017-10-11
     **************************************************************************/
    @RequestMapping("/mainPage")
    public String mainPage(Integer currpage, HttpServletRequest request, Map<String, Object> map, Integer type, String title, String username, Integer typ) throws Exception {
        //获取站点
        if(typ==null){
            if (projectName.equals("proteach")){
                typ=1;
            }else {
                typ=0;
            }
        }
        map.put("typ",typ);
        Object cidO = request.getSession().getAttribute("cid");
        //Session过期后，登出
        Integer cid2 = 0;
        if(cidO!=null) {
            cid2 = Integer.parseInt(cidO.toString());
        }
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //左侧栏假数据
        map.put("leftMenu",questionPoolLeft);

        //分页获取题库列表 默认每页试题
        Integer pageSize=10;
        if(currpage==null){
            currpage=1;
        }
        List<QuestionPoolVO> questionPool;
        if(typ==0){
            questionPool = questionPoolListService.findQuestionPool(currpage,pageSize,type,title,username);
            map.put("questionPool",questionPool);
        }else if(typ == 1){
            questionPool = questionPoolListService.findQuestionListBySiteId(cid2,title,username,currpage,pageSize,type);
            map.put("questionPool",questionPool);
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
        int totalRecords=0;
        int totalPage=0;
        if(typ==0){
            totalRecords=questionPoolListService.countQuestionPool(type,title,username);
            totalPage= (totalRecords+pageSize-1)/pageSize;
        }else if(typ==1){
            totalRecords=questionPoolListService.findQuestionListBySiteIdNumber(cid2,title,username,type).size();
            totalPage= (totalRecords+pageSize-1)/pageSize;
        }

        map.put("totalRecords",totalRecords);
        //类别
        map.put("type",type);
        map.put("title",title);
        map.put("username",username);
        //当前页
        map.put("currpage",currpage);
        //总页数
        map.put("totalPage",totalPage);
        // 后台分页select框
        int []pageArray=new int [totalPage];//n为长度
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i+1;
        }
        map.put("pageArray",pageArray);
        //项目名称
        map.put("projectName",projectName);
        //获取课程题库
        return "questionPool/questionPool";
    }



    /**************************************************************************
     * Description 题库模块-智能组卷入口
     *
     * @author 李梦晨
     * @date 2017-10-11
     **************************************************************************/
    @RequestMapping("/automatic")
    public String automatic(Map<String, Object> map, Integer id, Integer type) {
        //获取所有的分类
        //获取题库分类列表
        List<QuestionPoolCategoryVO> allQuestionPoolCategory =
                questionPoolListService.findAllQuestionPoolCategory();
        map.put("category",allQuestionPoolCategory);
        //获取所有试题库


        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //左侧栏假数据
        map.put("leftMenu",questionPoolLeft);
        map.put("id",id);
//        if(id!=null){
//            ExamQuestionPoolVO pool=
//        }
        if(id==null){
            map.put("showData",false);
            map.put("examQuestionPoo",new ExamQuestionPoolVO());
        }else{
            //获取旧数据

            ExamQuestionPoolVO examQuestionPoo= questionPoolListService.findExamQuestionPoolVOById(id,type);
            map.put("examQuestionPoo",examQuestionPoo);
            //展示数据
            map.put("showData",true);
        }
        return "questionPool/automatic";
    }







    /**************************************************************************
     * Description 题库模块-标记题目
     *
     * @author 洪春莹
     * @date 2018-10-30
     **************************************************************************/
    @RequestMapping("/markQuestionFlag")
    public String markQuestionFlag(@RequestParam Integer questionPoolId, HttpServletRequest request, Map<String, Object> map, Integer itemId, Integer currpage){
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //左侧栏假数据
        map.put("leftMenu",questionPoolLeft);
        //将flag由0改为1
        questionPoolListService.markQuestionFlag(itemId);
        map.put("questionPoolId",questionPoolId);
        return "redirect:/questionPool/questionPoolContent?questionPoolId="+questionPoolId+"&currpage="+currpage;
    }

    /**************************************************************************
     * Description 题库模块-取消标记题目
     *
     * @author 洪春莹
     * @date 2018-10-30
     **************************************************************************/
    @RequestMapping("/markQuestionFlagBack")
    public String markQuestionFlagBack(@RequestParam Integer questionPoolId, HttpServletRequest request, Map<String, Object> map, Integer itemId, Integer currpage){
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //左侧栏假数据
        map.put("leftMenu",questionPoolLeft);
        //将flag由1改为0
        questionPoolListService.markQuestionFlagBack(itemId);
        map.put("questionPoolId",questionPoolId);
        return "redirect:/questionPool/questionPoolContent?questionPoolId="+questionPoolId+"&currpage="+currpage;
    }


    /**************************************************************************
     * Description 题库类别模块-题库类别列表
     *
     * @author 李梦晨
     * @date 2017-12-06
     **************************************************************************/
    @RequestMapping("/questionCategory")
    public String questionCategory(HttpServletRequest request, Map<String, Object> map) {
        List<QuestionPoolCategoryVO> questionPoolCategoryList = questionPoolCategoryService.getAllQuestionPoolCategories();
        map.put("questionPoolCategoryList",questionPoolCategoryList);
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //左侧栏假数据
        map.put("leftMenu",questionPoolLeft);
        map.put("projectName",projectName);
        return "questionPool/questionCategory";
    }




    /**************************************************************************
     * Description 试卷库-新增试题入口
     *
     * @author 李梦晨
     * @date 2017-12-21
     **************************************************************************/
     @RequestMapping("/addedQuestions")
     public String addedQuestions(HttpServletRequest request, Integer questionPoolId, Integer currpage, Integer currsection, Map<String, Object> map) throws Exception {
         //获取所有的题库 供下拉列表使用
         int pageSizeWithQuestionPoool=Integer.MAX_VALUE;
         List<QuestionPoolVO> questionPool = questionPoolListService.findQuestionPool(1,pageSizeWithQuestionPoool,null,null,null);
         map.put("questionPool",questionPool);
        if(questionPoolId!=null){
            //获取对应的题库和对应的题库的选项
            //每页10条数据
            Integer pageSize=10;
            if(null==currpage){
                currpage=1;
            }
            //获取当前题库的先关信息
            QuestionPoolVO questionPoolSelected= questionPoolListService.findQuestionPoolById(questionPoolId);
            map.put("questionPoolSelected",questionPoolSelected);
            List<QuestionVo> relist =questionPoolListService.findquestionPoolList(questionPoolId,currpage,null,null,null);
            Integer totalRecords = questionPoolListService.countTAssignmentItem(questionPoolId,null,null,null);
            int totalPage= (totalRecords+pageSize-1)/pageSize;
            map.put("totalRecords",totalRecords);
            //当前页
            map.put("currpage",currpage);
            System.out.println("currpage==="+currpage);
            //总页数
            map.put("totalPage",totalPage);
            // 后台分页select框
            int []pageArray=new int [totalPage];
            for (int i = 0; i < pageArray.length; i++) {
                pageArray[i] = i+1;
            }
            map.put("pageArray",pageArray);
            map.put("relist",relist);
            map.put("questionPoolId",questionPoolId);
        }else{
            map.put("questionPoolSelected",new QuestionPoolVO());
        }
        map.put("currsection",currsection);
        return "questionPool/addedQuestions";
     }


    /**************************************************************************
     * Description 试卷库-新增试题入口
     *
     * @author 李梦晨
     * @date 2017-12-21
     **************************************************************************/
    @RequestMapping("/viewQuestions")
    public String viewQuestions(HttpServletRequest request, String sectionIds, Integer sectionId, Integer currpage, Map<String, Object> map) throws Exception {
        Integer pageSize=10;
       //获取所有的小题
        String[] itemIds = sectionIds.split(",");
        int[] newItemIds=new int[itemIds.length];
        for(int i=0;i<itemIds.length;i++){
            newItemIds[i]=Integer.parseInt(itemIds[i]);
        }
        if(currpage==null){
            currpage=1;
        }
        List<QuestionVo> questionVos = examQuestionPoolService.showAllQuestionByIds(newItemIds,currpage);
        map.put("currpage",currpage);
        //总数量
        map.put("totalRecords",itemIds.length);
        map.put("questionVos",questionVos);
        //sectionId
        map.put("sectionId",sectionId);
        int totalPage= (itemIds.length+pageSize-1)/pageSize;
        map.put("totalPage",totalPage);
        // 后台分页select框
        int []pageArray=new int [totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i+1;
        }
        map.put("pageArray",pageArray);
        return "questionPool/viewQuestions";
    }




    /**************************************************************************
     * Description 题库类别模块-新增题库类别
     *
     * @author 李梦晨
     * @date 2017-12-06
     **************************************************************************/
    @RequestMapping("/addQuestionCategory")
    public String addQuestionCategory(HttpServletRequest request, Map<String, Object> map) {
        QuestionPoolCategoryVO questionPoolCategoryVO = new QuestionPoolCategoryVO();
        map.put("questionPoolCategoryVO",questionPoolCategoryVO);
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //左侧栏假数据
        map.put("leftMenu",questionPoolLeft);
        return "questionPool/addQuestionCategory";
    }

    /**************************************************************************
     * Description 题库类别模块-修改题库类别
     *
     * @author 李梦晨
     * @date 2017-12-06
     **************************************************************************/
    @RequestMapping("/editQuestionCategory")
    public String editQuestionCategory(HttpServletRequest request, Map<String, Object> map, Integer categoryId) {
        QuestionPoolCategoryVO questionPoolCategoryVO = questionPoolCategoryService.getQuestionPoolCategoryById(categoryId);
        map.put("questionPoolCategoryVO",questionPoolCategoryVO);
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //左侧栏假数据
        map.put("leftMenu",questionPoolLeft);
        return "questionPool/addQuestionCategory";
    }

    /**
     * 题库类别-保存题库类别
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/saveQuestionCategory")
    public String saveQuestionCategory(HttpServletRequest request, Map<String, Object> map, @ModelAttribute QuestionPoolCategoryVO questionPoolCategoryVO){
        questionPoolCategoryService.saveQuestionCategory(questionPoolCategoryVO);
        return "redirect:/questionPool/questionCategory";
    }


    /**************************************************************************
     * Description 题库模块-添加试题入口
     *
     * @author 李梦晨
     * @date 2017-11-30
     **************************************************************************/
    @RequestMapping("/addQuestionPool")
    public String addQuestionPool(@RequestParam Integer questionPoolId, HttpServletRequest request, Map<String, Object> map) throws Exception {
        map.put("questionPoolId",questionPoolId);
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //左侧栏假数据
        map.put("leftMenu",questionPoolLeft);
        return "questionPool/addQuestionPool";
    }


    /**************************************************************************
     * Description 题库模块-试卷库入口
     *
     * @author 李梦晨
     * @date 2017-12-18
     **************************************************************************/
    @RequestMapping("/testLibrary")
    public String testLibrary(Integer currpage, HttpServletRequest request, Map<String, Object> map, Integer type) throws Exception {
        //左侧栏假数据
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        map.put("leftMenu",questionPoolLeft);
        //每页10条数据
        Integer pageSize=10;
        map.put("pageSize",pageSize);
        if(currpage==null){//若当前页为空则设为第一页
            currpage=1;
        }
        //当前页
        map.put("currpage",currpage);
        //获取所有的试卷库
        List<TestLibraryVo> tepool= questionPoolListService.findAllTestLibrary(currpage,pageSize,type);
        map.put("tepool",tepool);
        //总试卷数
        Integer totalRecords = questionPoolListService.countExamQuestionpool(type);
        map.put("totalRecords",totalRecords);
        //总页数
        int totalPage= (totalRecords+pageSize-1)/pageSize;
        map.put("totalPage",totalPage);
        // 后台分页select框
        int[] pageArray = new int [totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i+1;
        }
        map.put("pageArray",pageArray);
        map.put("type",type);
        return "questionPool/testLibrary";
    }

    /**************************************************************************
     * Description 试卷库的（假）删除
     *
     * @author 张佳鸣
     * @date 2017-12-25
     **************************************************************************/
    @RequestMapping("/deleteExamQuestionpool")
    public @ResponseBody
    String deleteExamQuestionpool(Integer examQuestionpoolId)throws Exception{
        questionPoolListService.deleteExamQuestionpool(examQuestionpoolId);
        return "success";
    }

    /**************************************************************************
     * Description 题库模块-手动组卷入口
     *
     * @author 李梦晨
     * @date 2017-12-18
     **************************************************************************/
    @RequestMapping("/manually")
    public String manually(HttpServletRequest request, Map<String, Object> map, Integer id, Integer type) throws Exception {
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //左侧栏假数据
        map.put("leftMenu",questionPoolLeft);
        //获取所有的分类hh

        List<QuestionPoolCategoryVO> allQuestionPoolCategory =
                questionPoolListService.findAllQuestionPoolCategory();
        map.put("category",allQuestionPoolCategory);


        List<QuestionPoolCategoryVO> questionPoolCategoryList = questionPoolCategoryService.getAllQuestionPoolCategories();
        if(id==null){
            map.put("showData",false);
            map.put("examQuestionPoo",new ExamQuestionPoolVO());
        }else{
            ExamQuestionPoolVO examQuestionPoo= questionPoolListService.findExamQuestionPoolVOById(id,type);
            map.put("examQuestionPoo",examQuestionPoo);
            //展示数据
            map.put("showData",true);
        }
        map.put("questionPoolCategoryList",questionPoolCategoryList);
        map.put("id",id);
        return "questionPool/manually";
    }


    /**************************************************************************
     * Description 题库模块-自主建卷入口
     *
     * @author 李梦晨
     * @date 2017-12-18
     **************************************************************************/
    @RequestMapping("/independent")
    public String independent(HttpServletRequest request, Map<String, Object> map, Integer id, Integer type) throws Exception {
        //左侧栏数据
        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        map.put("leftMenu",questionPoolLeft);
        //获取所有的分类
        List<QuestionPoolCategoryVO> questionPoolCategoryList = questionPoolCategoryService.getAllQuestionPoolCategories();
        map.put("questionPoolCategoryList",questionPoolCategoryList);
        map.put("id",id);
        if(id==null){
            map.put("showData",false);
            map.put("examQuestionPoo",new ExamQuestionPoolVO());
        }else{
            ExamQuestionPoolVO examQuestionPoo= questionPoolListService.findExamQuestionPoolVOById(id,type);
            map.put("examQuestionPoo",examQuestionPoo);
            //展示数据
            map.put("showData",true);
        }

        return "questionPool/independent";
    }



    /**************************************************************************
     * Description 题库模块-试卷库修改入口
     *
     * @author 李梦晨
     * @date 2017-12-18
     **************************************************************************/
    @RequestMapping("/libraryMosify")
    public String libraryMosify(HttpServletRequest request, Map<String, Object> map) throws Exception {

        List<QuestionLeftVo> questionPoolLeft = questionPoolListService.findQuestionPoolLeft();
        //左侧栏假数据
        map.put("leftMenu",questionPoolLeft);
        return "questionPool/libraryMosify";
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
            if(auth.getPrincipal() instanceof User){
                un = ((User)auth.getPrincipal()).getUsername().toString();
            }else{
                un = auth.getPrincipal().toString();
            }
            userVo = shareService.getUserByUsername(un);
        }
        return userVo;
    }
    /**************************************************************************
     * Description 题库-题库的导入
     *
     * @author 李雪腾
     * @date 2017年11月29日
     **************************************************************************/
    // 上传文件
    @RequestMapping(value = "/importQuestionPoolItem", method = RequestMethod.POST)
    @ResponseBody
    public Object upload(@RequestParam("file") MultipartFile file, Integer questionPoolId) throws Exception {
        UserVo userVo = getCurrUser();
        LayuiUpLoadResponseVo layui = new LayuiUpLoadResponseVo();
        String name = file.getOriginalFilename();
        if (!name.endsWith("xlsx")&&!name.endsWith("xls")) {
            layui.setCode(2);
            layui.setMsg("文件类型错误");
            layui.setData(new ArrayList<>());
        }else {
            InputStream input = file.getInputStream();
            //将inputstream转为byte
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
                layui.setMsg(result.get("message") + "Excel文件错误位置坐标为：" + result.get("x") + "，" + result.get("y"));
                layui.setData(new ArrayList<>());
            } else {
                layui.setCode(1);
                layui.setMsg("上传成功");
            }
        }
            return layui;


    }


    /**************************************************************************
     * Description 题库列表--根据对应的题库id删除题库
     *
     * @author 李雪腾
     * @date 2017年12月05日
     **************************************************************************/
    @RequestMapping("/deleteQuestionPool")
    public String deleteQuestionPool(Integer questionPoolId,Integer typ){
        questionPoolListService.deleteQuestionPoolById(questionPoolId);
        return "redirect:/questionPool/mainPage?typ="+typ;
    }
    /**************************************************************************
     * Description 试卷库--自动组卷
     *
     * @author 李雪腾
     * @date 2017年12月19日
     **************************************************************************/
    @RequestMapping("/saveExamPapaer")
    public String saveExamPapaer(HttpServletRequest request){
        //获取试卷的名称
        String examTitle = request.getParameter("examTitle");
        //获取试卷的分类
        String examCategory = request.getParameter("examCategory");
        //获取试卷的总分
        String totalScore = request.getParameter("totalScore");
        //获取所有的大项
        String[] maxTerms = request.getParameterValues("maxTerm");
        //每个大项中每个试题的分值
        String[] termScores = request.getParameterValues("termScore");

        return "redirect:/questionPool/testLibrary";
    }
    /**************************************************************************
     * Description 试卷库--自动组卷
     *
     * @author 李雪腾
     * @date 2017年12月19日
     **************************************************************************/
    @ResponseBody
    @RequestMapping("/getAllQuestionPool")
    public List<QuestionPoolVO> getAllQuestionPool(){
        //获取题库列表
        List<QuestionPoolVO> questionPool = questionPoolListService.findQuestionPool(1,999,null,null,null);
        return questionPool;
    }

    /**************************************************************************
     * Description 试卷库-自主建卷-导入题目
     *
     * @author 罗璇
     * @date 2017年12月28日
     **************************************************************************/
    @RequestMapping(value = "/importExamPoolItem", method = RequestMethod.POST)
    @ResponseBody
    public Object importExamPoolItem(@RequestParam("file") MultipartFile file) throws Exception {
        UserVo userVo = getCurrUser();
        String name = file.getName();
        InputStream input = file.getInputStream();
        //将inputstream转为byte
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        byte[] data = new byte[4096];
        int count = -1;
        while((count = input.read(data,0,4096)) != -1){
            outStream.write(data, 0, count);
        }
        data = null;
        byte[] bytes = outStream.toByteArray();
        Set<Integer> itemIds = questionPoolUpLoadService.resolveExcelWithExamPool(bytes,name,userVo);
        String rs = "";
        for (Integer itemId : itemIds) {
            rs += itemId+",";
        }
        LayuiUpLoadResponseVo layuiUpLoadResponseVo = new LayuiUpLoadResponseVo();
        layuiUpLoadResponseVo.setCode(0);
        layuiUpLoadResponseVo.setMsg(rs.substring(0,rs.length()-1));
        layuiUpLoadResponseVo.setData(new ArrayList<>());
        return layuiUpLoadResponseVo;
    }

    /**************************************************************************
     * Description 试卷库-自主建卷保存
     *
     * @author 张佳鸣
     * @date 2017年12月29日
     **************************************************************************/
    @RequestMapping("/independentExamSection")
    public String saveIndependentExamSection(HttpServletRequest request, Integer id){
        //获取当前用户
        String currUsername = getCurrUser().getUsername();
        //以下获取表单发送的参数
        //试卷库名称
        String examQuestionPoolTitle = request.getParameter("examQuestionPoolTitle");
        //试卷库分类
        Integer examQuestionPoolcategory = Integer.valueOf(request.getParameter("category"));
        //试卷库创建者
        String username = currUsername;
        //试卷库创建时间
        Date date = new Date();
        String score=request.getParameter("score");
        //试卷库总分
        double score2 = Double.valueOf(request.getParameter("score"));
        //试卷库大项
        List<ExamMajorTermVO> sections=new ArrayList<>();
        //试卷库VO
        ExamQuestionPoolVO pool=new ExamQuestionPoolVO();
        pool.setTitle(examQuestionPoolTitle);
        pool.setCategory(examQuestionPoolcategory);
        pool.setCreateTime(date);
        pool.setScore(score2    );
        pool.setUsername(username);

        //获取试卷库大项的页面id集合
        String examSectionIds[] = request.getParameterValues("examSectionId");
        //循环页面上所有的试卷库大项并获取参数值
        if(examSectionIds!=null) {
            for (int i = 0; i < examSectionIds.length; i++) {
                //以下获取表单发送的参数,根据大项的页面id不同区分
                //试卷库大项名称
                String examSectionTitle = request.getParameter("examSectionTitle_" + examSectionIds[i]);
                //试卷库大项的小题数量
                int itemcount = Integer.valueOf(request.getParameter("itemCount" + examSectionIds[i]));
                //试卷库大项的小题分值
                double itemscore = Double.valueOf(request.getParameter("itemScore_" + examSectionIds[i]));
                //试卷库大项对应的小题
                List<Integer> itemIds = new ArrayList<>();//新建对应小题List
                String itemList = request.getParameter("itemList" + examSectionIds[i]);//获取前台小题id组成的字符串
                String[] itemIdsByString = itemList.split(",");//根据“，”将id分割成String数组
                //循环遍历对应小题id增加到itemIds中
                for (String itemId : itemIdsByString) {
                    //类型转换并添加到集合中
                    itemIds.add(Integer.valueOf(itemId));
                }
                //试卷库大项vo
                ExamMajorTermVO examMajorTermVO = new ExamMajorTermVO();
                examMajorTermVO.setTitle(examSectionTitle);
                examMajorTermVO.setItemcount(itemcount);
                examMajorTermVO.setItemscore(itemscore);
                examMajorTermVO.setItemids(itemIds);

                //添加该大项到大项集合
                sections.add(examMajorTermVO);
            }
        }
        //试卷大项放入试卷库
        pool.setExamMajorTerms(sections);
        //保存试卷库
        examQuestionPoolService.saveIndependentPool(pool,id);
        return "redirect:/questionPool/testLibrary";
}

    /**************************************************************************
     * Description 试卷库-自主建卷查看上传的题目
     *
     * @author 张佳鸣
     * @date 2018-1-2
     **************************************************************************/
    @RequestMapping("/viewIndependentQuestions")
    public String viewIndependentQuestions(HttpServletRequest request, String sectionIds, Integer sectionId, Integer currpage, Map<String, Object> map) throws Exception {
        if(currpage==null){
            currpage=1;
        }
        //所有小题题号字符串
        map.put("sectionIds",sectionIds);
        //获取所有的小题
        String[] itemIds = sectionIds.split(",");
        int[] newItemIds=new int[itemIds.length];
        for(int i=0;i<itemIds.length;i++){
            newItemIds[i]=Integer.parseInt(itemIds[i]);
        }
        //每页大小
        Integer pageSize=10;
        //题目vo
        List<QuestionVo> questionVos = examQuestionPoolService.findAllQuestionByIds(newItemIds,currpage,pageSize);
        map.put("questionVos",questionVos);
        //当前页
        map.put("currpage",currpage);
        //总数量
        map.put("totalRecords",itemIds.length);
        //总页数
        int totalPage= (itemIds.length+pageSize-1)/pageSize;
        map.put("totalPage",totalPage);
        //sectionId
        map.put("sectionId",sectionId);
        //后台分页select框
        int []pageArray=new int [totalPage];
        for (int i = 0; i < pageArray.length; i++) {
            pageArray[i] = i+1;
        }
        map.put("pageArray",pageArray);
        return "questionPool/viewIndependentQuestions";
    }
    /**************************************************************************
     * Description 通过题库ID获取题库
     *
     * @author 吴奇臻
     * @date 2018-12-5
     **************************************************************************/
    @RequestMapping("/getQuestionPool")
    public RestResult modifyQuestionPool(@RequestParam String questionPoolId){
        RestResult result = new RestResult(success);
        try {
            QuestionPoolVO questionVO = questionPoolListService.findQuestionPoolById(Integer.parseInt(questionPoolId));
            result.setData(questionVO);
        } catch (Exception e) {
            result.setStatus(fail);
            e.printStackTrace();
        }
        return result;
    }
    /**************************************************************************
     * Description 题库--保存题库
     *
     * @author 吴奇臻
     * @date 2018-12-5
     **************************************************************************/
    @RequestMapping("/saveQuestionPool")
    public RestResult saveQuestionPool(@RequestParam String questionPoolId, @RequestParam String title, @RequestParam String username, @RequestParam String category, @RequestParam String type, @RequestParam String cid) throws Exception {
        RestResult result = new RestResult(success);
        try {
            Date createdTime = new Date();
            int id = questionPoolListService.saveQuestionPoolApi(questionPoolId, title, username, createdTime, category, type, cid);
            result.setData(id);
        } catch (Exception e) {
            result.setStatus(fail);
            e.printStackTrace();
        }
        return result;
    }
    /**************************************************************************
     * Description 题库模块-获取题库内容
     *
     * @author 吴奇臻
     * @date 2018-12-7
     **************************************************************************/
    @RequestMapping("/questionPoolContent")
    public RestResult questonPoolContent(@RequestParam String questionPoolId, @RequestParam String type, @RequestParam String name, @RequestParam String currpage) {
        RestResult result = new RestResult(success);
        try {
            List<QuestionVo> relist=new ArrayList<>();
            if(!type.equals("")){
             relist =questionPoolListService.findquestionPoolList(Integer.parseInt(questionPoolId),Integer.parseInt(currpage),name,Integer.parseInt(type),null);
            }else{relist =questionPoolListService.findquestionPoolList(Integer.parseInt(questionPoolId),Integer.parseInt(currpage),name,null,null);}
            result.setData(relist);
        } catch (Exception e) {
            result.setStatus(fail);
            e.printStackTrace();
        }
        return result;
    }
    /**************************************************************************
     * Description 题库模块-获取题库总数
     *
     * @author 吴奇臻
     * @date 2018-12-7
     **************************************************************************/
    @RequestMapping("/questionPoolContentTotal")
    public RestResult questionPoolContentTotal(@RequestParam String questionPoolId, @RequestParam String type, @RequestParam String name) {
        RestResult result = new RestResult(success);
        try {
            Integer totalRecords=0;
            if(!type.equals("")) {
                totalRecords = questionPoolListService.countTAssignmentItem(Integer.parseInt(questionPoolId), name, Integer.parseInt(type), null);
            }else{
                totalRecords = questionPoolListService.countTAssignmentItem(Integer.parseInt(questionPoolId), name, null, null);
            }
            result.setData(totalRecords);
        } catch (Exception e) {
            result.setStatus(fail);
            e.printStackTrace();
        }
        return result;
    }
    /**************************************************************************
     * Description 题库模块-添加题目
     *
     * @author 吴奇臻
     * @date 2018-12-10
     **************************************************************************/
    @RequestMapping("/addQuestion")
    public RestResult addQuestion(@RequestParam String type, @RequestParam String stem, @RequestParam String answerLabel, @RequestParam String answerText, @RequestParam String username, @RequestParam String answerLabelChoice, @RequestParam String questionPoolId, @RequestParam String itemId) throws Exception {
        RestResult result = new RestResult(success);
        try {
            UserVo userVo = shareService.getUserByUsername(username);
            if(!EmptyUtil.isEmpty(type)){
                if(!EmptyUtil.isEmpty(itemId)){
                    questionPoolListService.insertTAssignmentItem(type,stem,answerLabel,answerText,userVo,answerLabelChoice,Integer.parseInt(questionPoolId),Integer.parseInt(itemId),null,null,null);
                }else{
                    questionPoolListService.insertTAssignmentItem(type,stem,answerLabel,answerText,userVo,answerLabelChoice,Integer.parseInt(questionPoolId),null,null,null,null);
                }
            }
        } catch (Exception e) {
            result.setStatus(fail);
            e.printStackTrace();
        }
        return result;
    }
    /**************************************************************************
     * Description 题库模块-删除试题
     *
     * @author 吴奇臻
     * @date 2018-12-10
     **************************************************************************/
    @RequestMapping("/deleteTAssignmentItem")
    public RestResult deleteTAssignmentItem(@RequestParam Integer questionPoolId, Map<String, Object> map, Integer itemId){
        RestResult result = new RestResult(success);
        try {
            questionPoolListService.deleteTAssignmentItemById(itemId,questionPoolId);
        } catch (Exception e) {
            result.setStatus(fail);
            e.printStackTrace();
        }
        return result;
    }
    /**************************************************************************
     * Description 题库模块-修改题目
     *
     * @author 吴奇臻
     * @date 2018-12-10
     **************************************************************************/
    @RequestMapping("/modifyQuestion")
    public RestResult modifyQuestion(@RequestParam Integer itemId){
        RestResult result = new RestResult(success);
        try {
            QuestionVo question = questionPoolListService.findQuestionOptionById(itemId);
            result.setData(question);
        } catch (Exception e) {
            result.setStatus(fail);
            e.printStackTrace();
        }
        return result;
    }
    /**************************************************************************
     * Description 题库模块-获取filename
     *
     * @author 吴奇臻
     * @date 2018-12-10
     **************************************************************************/
    @RequestMapping("/exportExcelQuestionPoolById")
    public RestResult exportExcelQuestionPoolById(@RequestParam Integer questionPoolId){
        RestResult result = new RestResult(success);
        try {
            String  title=questionPoolListService.findTAssignmentQuestionById(questionPoolId);
            String fileName =  "Questionpool-"+title;
            fileName = fileName.replaceAll("\\/", "_");
            //String fileName = questionPoolInAndOutService.exportExcelQuestionPoolById(questionPoolId);
            result.setData(fileName+".xls");
        } catch (Exception e) {
            result.setStatus(fail);
            e.printStackTrace();
        }
        return result;
    }
    /**************************************************************************
     * Description：获取试卷库的题
     *
     * @author 黄浩
     * @date 2020年11月12日
     **************************************************************************/
    @RequestMapping("/itemApi")
    public List<ExamItemVo> itemApi(@RequestParam Integer examQuestionPoolId){
        return examQuestionPoolService.getItem(examQuestionPoolId);
    }

}
