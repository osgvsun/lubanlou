package net.gvsun.gsquestionpool.controller;

import net.gvsun.common.LayTableVO;
import net.gvsun.common.Result;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.gsquestionpool.dto.newDto.AutoExamDTO;
import net.gvsun.gsquestionpool.dto.newDto.TAssignmentItemDTO;
import net.gvsun.gsquestionpool.service.common.ShareService;
import net.gvsun.gsquestionpool.service.exampool.ExamQuestionPoolService;
import net.gvsun.gsquestionpool.service.newService.Service01;
import net.gvsun.gsquestionpool.service.questionPool.QuestionPoolCategoryService;
import net.gvsun.gsquestionpool.service.questionPool.QuestionPoolInAndOutService;
import net.gvsun.gsquestionpool.service.questionPool.QuestionPoolListService;
import net.gvsun.gsquestionpool.service.questionPool.QuestionPoolUpLoadService;
import net.gvsun.gsquestionpool.vo.common.CommonVO;
import net.gvsun.gsquestionpool.vo.common.LayuiUpLoadResponseVo;
import net.gvsun.gsquestionpool.vo.exampool.ExamItemVo;
import net.gvsun.gsquestionpool.vo.exampool.ExamMajorTermVO;
import net.gvsun.gsquestionpool.vo.exampool.ExamQuestionPoolVO;
import net.gvsun.gsquestionpool.vo.questionPool.QuestionPoolCategoryVO;
import net.gvsun.gsquestionpool.vo.questionPool.QuestionPoolVO;
import net.gvsun.gsquestionpool.vo.questionPool.QuestionVo;
import net.gvsun.gsquestionpool.vo.questionPool.TestLibraryVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.*;

@RestController
@RequestMapping("/api")
public class ApiController {
    @Autowired
    private QuestionPoolListService questionPoolListService;
    @Autowired
    private Service01 service01;
    @Autowired
    private QuestionPoolCategoryService questionPoolCategoryService;
    @Autowired
    private ShareService shareService;
    @Autowired
    private QuestionPoolInAndOutService questionPoolInAndOutService;
    @Autowired
    private QuestionPoolUpLoadService questionPoolUpLoadService;
    @Value("${filePath}")
    private String filePath;
    @Autowired
    private ExamQuestionPoolService examQuestionPoolService;

    /**
     * 获取全部题库分类
     * @return
     */
    @RequestMapping("/findAllQuestionPoolCategory")
    public List<QuestionPoolCategoryVO> findAllQuestionPoolCategory(){
        return questionPoolListService.findAllQuestionPoolCategory();
    }

    /**
     * 查询题库列表
     * @return
     */
    @RequestMapping("/findQuestionPoolList")
    public LayTableVO<List<QuestionPoolVO>> findQuestionPoolList(@RequestParam Integer categoryId,@RequestParam Integer type,String title,String owner,
                                                                 @RequestParam Integer page,@RequestParam Integer pageSize){
        List<QuestionPoolVO> list = service01.findQuestionPoolList(categoryId, type, title, owner, page, pageSize);
        Integer count = service01.countQuestionPoolList(categoryId, type, title, owner);
        return LayTableVO.ok(list,(long)count);
    }

    /**
     * 根据id删除题库
     * @param questionPoolId
     */
    @RequestMapping("/deleteQuestionPool")
    public void deleteQuestionPool(@RequestParam Integer questionPoolId){
        questionPoolListService.deleteQuestionPoolById(questionPoolId);
    }

    /**
     * 保存题库
     * @param title
     * @param categoryId
     * @param type
     * @param questionPoolId
     * @param siteId
     * @param username
     */
    @RequestMapping("/saveQuestionPool")
    public void saveQuestionPool(@RequestParam String title,@RequestParam Integer categoryId,@RequestParam Integer type,
                                 Integer questionPoolId,@RequestParam Integer siteId,@RequestParam String username){
        service01.saveQuestionPool(title,categoryId,type,questionPoolId,siteId,username);
    }

    /**
     * 根据id查询题库信息（编辑题库回显数据）
     * @param questionPoolId
     * @return
     */
    @RequestMapping("/findQuestionPoolById")
    public QuestionPoolVO findQuestionPoolById(@RequestParam Integer questionPoolId){
        return questionPoolListService.findQuestionPoolById(questionPoolId);
    }

    /**
     * 删除题库类别
     * @param categoryId
     */
    @RequestMapping("/deleteQuestionPoolCategory")
    public void deleteQuestionPoolCategory(@RequestParam Integer categoryId){
        questionPoolCategoryService.deleteQuestionPoolById(categoryId);
    }

    /**
     * 保存题库类别
     * @param title
     * @param categoryId
     */
    @RequestMapping("/saveQuestionPoolCategory")
    public void saveQuestionPoolCategory(@RequestParam String title,Integer categoryId){
        service01.saveQuestionPoolCategory(title,categoryId);
    }

    /**
     * 根据id查询题库类别信息（编辑题库类别回显数据）
     * @param categoryId
     * @return
     */
    @RequestMapping("/findQuestionPoolCategoryById")
    public QuestionPoolCategoryVO findQuestionPoolCategoryById(@RequestParam Integer categoryId){
        return questionPoolCategoryService.getQuestionPoolCategoryById(categoryId);
    }

    /**
     * 分页查询题库内题目列表
     * @param questionPoolId
     * @param page
     * @param pageSize
     * @param name
     * @param type
     * @param flag
     * @return
     */
    @RequestMapping("/findQuestionList")
    public LayTableVO<List<QuestionVo>> findQuestionList(@RequestParam Integer questionPoolId,@RequestParam Integer page,@RequestParam Integer pageSize,String name,Integer type,Integer flag){
        List<QuestionVo> list = service01.findQuestionList(questionPoolId,page,pageSize,name,type,flag);
        Integer count = service01.countQuestionList(questionPoolId,name,type,flag);
        return LayTableVO.ok(list,(long)count);
    }

    /**
     * 保存试题
     * @param tAssignmentItemDTO
     * @param username
     * @param questionPoolId
     * @param itemId
     */
    @RequestMapping("/saveTassignmentItem")
    public void saveTassignmentItem(TAssignmentItemDTO tAssignmentItemDTO,@RequestParam String username,@RequestParam Integer questionPoolId,Integer itemId){
        // 简答题
        if ("5".equals(tAssignmentItemDTO.getType())) {
            tAssignmentItemDTO.setIsOrder(tAssignmentItemDTO.getGradeType());
        }
        questionPoolListService.insertTAssignmentItem(tAssignmentItemDTO.getType(), tAssignmentItemDTO.getStem(), tAssignmentItemDTO.getAnswer(),
                tAssignmentItemDTO.getSingle(),shareService.getUserByUsername(username) , tAssignmentItemDTO.getAnswerLabelChoices(), questionPoolId,
                itemId, tAssignmentItemDTO.getIsOrder(),tAssignmentItemDTO.getSanswerWeight(),tAssignmentItemDTO.getSingleWeight());
    }

    /**
     * 删除题库中的试题
     * @param itemId
     * @param questionPoolId
     */
    @RequestMapping("/deleteTAssignmentItemById")
    public void deleteTAssignmentItemById(@RequestParam Integer itemId,@RequestParam Integer questionPoolId){
        questionPoolListService.deleteTAssignmentItemById(itemId, questionPoolId);
    }

    /**
     * 根据id查询试题信息（编辑试题回显数据）
     * @param itemId
     * @return
     */
    @RequestMapping("/findItemById")
    public QuestionVo findItemById(@RequestParam Integer itemId){
        return questionPoolListService.findQuestionOptionById(itemId);
    }

    /**
     * 题目列表-标记题目
     * @param itemId
     */
    @RequestMapping("/markItem")
    public void markItem(@RequestParam Integer itemId){
        questionPoolListService.markQuestionFlag(itemId);
    }

    /**
     * 题目列表-取消标记题目
     * @param itemId
     */
    @RequestMapping("/unmarkItem")
    public void unmarkItem(@RequestParam Integer itemId){
        questionPoolListService.markQuestionFlagBack(itemId);
    }

    /**
     * 题库列表--题库导出
     * @param questionPoolId
     * @param response
     * @throws Exception
     */
    @RequestMapping("/exportExcelQuestionPoolById")
    public void exportExcelQuestionPoolById(@RequestParam Integer questionPoolId, HttpServletResponse response) throws Exception{
        String title = questionPoolListService.findTAssignmentQuestionById(questionPoolId);
        byte[] bytes = questionPoolInAndOutService.exportExcelQuestionPoolById(questionPoolId);
        String titleQuestion = "Questionpool-" + title;
        titleQuestion = titleQuestion.replaceAll("\\/", "_");
        response.setContentType("multipart/form-data;charset=UTF-8");// 设置response内容的类型
        response.setHeader(
                "Content-disposition",
                "attachment;filename="
                        + URLEncoder.encode(titleQuestion + ".xls", "UTF-8"));// 设置头部信息
        ServletOutputStream outputStream = response.getOutputStream();
        outputStream.write(bytes);
        outputStream.close();
    }

    /**
     * 题目列表-导入题目
     * @param file
     * @param questionPoolId
     * @return
     */
    @RequestMapping("/importExcelQuestionPool")
    public LayuiUpLoadResponseVo importExcelQuestionPool(@RequestParam("file") MultipartFile file, @RequestParam Integer questionPoolId,@RequestParam String username) throws Exception{
        LayuiUpLoadResponseVo layui = new LayuiUpLoadResponseVo();
        String name = file.getOriginalFilename();
        if (!name.endsWith("xlsx") && !name.endsWith("xls")) {
            layui.setCode(2);
            layui.setMsg("文件类型错误");
            layui.setData(new ArrayList<>());
        } else {
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
            Map<String, String> result = questionPoolUpLoadService.resolveExcelWithQUestionPool(bytes, name, questionPoolId, shareService.getUserByUsername(username),filePath, ClientDatabaseContextHolder.getClientDatabase());
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

    /**
     * 分页查询试卷库列表
     * @param categoryId
     * @param page
     * @param pageSize
     * @return
     */
    @RequestMapping("/findTestLibraryList")
    public LayTableVO<List<TestLibraryVo>> findTestLibraryList(@RequestParam Integer categoryId,@RequestParam Integer page,@RequestParam Integer pageSize){
        List<TestLibraryVo> list = questionPoolListService.findAllTestLibrary(page, pageSize, categoryId);
        Integer count = questionPoolListService.countExamQuestionpool(categoryId);
        return LayTableVO.ok(list,(long)count);
    }

    /**
     * 试卷库的（假）删除
     * @param examQuestionPoolId
     */
    @RequestMapping("/deleteExamQuestionPool")
    public void deleteExamQuestionPool(@RequestParam Integer examQuestionPoolId){
        questionPoolListService.deleteExamQuestionpool(examQuestionPoolId);
    }

    /**
     * 根据id获取试卷库信息（编辑时回显）
     * @param examQuestionPoolId
     * @param type
     * @return
     */
    @RequestMapping("/findExamQuestionPoolById")
    public ExamQuestionPoolVO findExamQuestionPoolById(@RequestParam Integer examQuestionPoolId,@RequestParam Integer type){
        return questionPoolListService.findExamQuestionPoolVOById(examQuestionPoolId, type);
    }

    /**
     * 获取已有的题库信息（自动组卷）
     * @param cid
     * @return
     */
    @RequestMapping("/getAllQuestionPool")
    public List<QuestionPoolVO> getAllQuestionPool(Integer cid) {
        //获取公共题库列表
        List<QuestionPoolVO> questionPool = questionPoolListService.findQuestionPool(1, 999, null, null, null);
        if(cid!=null){
            //获取课程题库列表
            questionPool.addAll(questionPoolListService.findQuestionListBySiteId(Integer.parseInt(cid.toString()), null, null, 1, 999, null));
        }
        return questionPool;
    }

    /**
     * 查询计算题库不同类型题目的个数
     * @param questionPoolId
     * @return
     */
    @RequestMapping("/calQuestionPoolItemNum")
    public Map<Integer, String> calQuestionPoolItemNum(@RequestParam Integer questionPoolId){
        return examQuestionPoolService.calcQuestionpoolNum(questionPoolId);
    }

    /**
     * 试卷库-保存自动组卷
     * @param request
     * @param username
     * @param id
     * @param autoExamDTO
     */
    @RequestMapping("/saveAutoExamQuestionPool")
    public void saveAutoExamQuestionPool(HttpServletRequest request,@RequestParam String username,Integer id, AutoExamDTO autoExamDTO){
        //以下获取表单发送的参数
        //试卷库大项
        List<ExamMajorTermVO> sections=new ArrayList<>();
        //试卷库VO
        ExamQuestionPoolVO pool=new ExamQuestionPoolVO();
        pool.setId(id);
        pool.setTitle(autoExamDTO.getExamQuestionPoolTitle());
        pool.setCategory(autoExamDTO.getCategory());
        pool.setCreateTime(new Date());
        pool.setScore(autoExamDTO.getScore());
        pool.setUsername(username);
        //循环页面上所有的试卷库大项并获取参数值
        String[] examSectionIds = autoExamDTO.getExamSectionId();
        if(examSectionIds!=null){
            for(int i=0;i<examSectionIds.length;i++){
                //以下获取表单发送的参数,根据大项的页面id不同区分
                //试卷库大项名称
                String examSectionTitle = request.getParameter("examSectionTitle_"+examSectionIds[i]);
                //试卷库大项的小题数量
                int itemcount = Integer.valueOf(request.getParameter("itemcount_"+examSectionIds[i]));
                //试卷库大项的小题分值
                double itemscore = Double.valueOf(request.getParameter("itemscore_"+examSectionIds[i]));
                //试卷库大项对应的小题
                List<Integer> itemIds = new ArrayList<>();
                //试卷库大项vo
                ExamMajorTermVO examMajorTermVO= new ExamMajorTermVO();
                examMajorTermVO.setTitle(examSectionTitle);
                examMajorTermVO.setItemcount(itemcount);
                examMajorTermVO.setItemscore(itemscore);
                //获取选定的试题库id
                int questionpoolId = Integer.valueOf(request.getParameter("questionpoolId_"+examSectionIds[i]));
                examMajorTermVO.setItemQuestionPoolId(questionpoolId);
                //获取选定的试题库题型
                int questionType = Integer.valueOf(request.getParameter("questionType_"+examSectionIds[i]));
                examMajorTermVO.setItemType(questionType);
                //按照数量随机查询选中试题库下所有小题id
                List<Integer> allItemIds = examQuestionPoolService.findQuestionPoolByCount(examMajorTermVO,questionpoolId,questionType);
                itemIds = getRandomNum(allItemIds,itemcount);
                //添加到试卷库大项对应的小题
                examMajorTermVO.setItemids(itemIds);
                //添加该大项到大项集合
                sections.add(examMajorTermVO);
            }
        }
        //试卷大项放入试卷库
        pool.setExamMajorTerms(sections);
        //保存试卷库
        examQuestionPoolService.saveAutoPool(pool,id);
    }

    /**
     * 工具方法-返回随机数
     * @param list
     * @param selected
     * @return
     */
    public List<Integer> getRandomNum(List<Integer> list, int selected) {
        List<Integer> reList = new ArrayList<Integer>();
        Random random = new Random();
        // 先抽取，备选数量的个数
        if (list.size() >= selected) {
            for (int i = 0; i < selected; i++) {
                // 随机数的范围为0-list.size()-1;
                int target = random.nextInt(list.size());
                reList.add(list.get(target));
                list.remove(target);
            }
        } else {
            selected = list.size();
            for (int i = 0; i < selected; i++) {
                // 随机数的范围为0-list.size()-1;
                int target = random.nextInt(list.size());
                reList.add(list.get(target));
                list.remove(target);
            }
        }
        return reList;
    }

    /**
     * 试卷库-打印试题数据接口
     * @param examQuestionPoolId
     * @return
     */
    @RequestMapping("/itemApi")
    public List<ExamItemVo> itemApi(@RequestParam Integer examQuestionPoolId){
        return examQuestionPoolService.getItem(examQuestionPoolId);
    }

    /**
     * 试卷库-保存手动组卷
     * @param request
     * @param username
     * @param id
     * @param autoExamDTO
     */
    @RequestMapping("/saveManualExamQuestionPool")
    public void saveManualExamQuestionPool(HttpServletRequest request,@RequestParam String username,Integer id,AutoExamDTO autoExamDTO){
        //手动新增试卷库;;;
        ExamQuestionPoolVO pool=new ExamQuestionPoolVO();
        pool.setTitle(autoExamDTO.getExamQuestionPoolTitle());
        pool.setCategory(autoExamDTO.getCategory());
        pool.setCreateTime(new Date());
        pool.setUsername(username);
        //试卷的总分
        //获取所有的大项
//        if(id==null){};
        String[] sectionIndex = autoExamDTO.getExamSectionId();
        double totalScore = 0;
        List<ExamMajorTermVO> sections=new ArrayList<>();
        if(sectionIndex!=null){for(int i=0;i<sectionIndex.length;i++){
            ExamMajorTermVO majorTerm=new ExamMajorTermVO();
            //获取每个大项的总分
            String sectionTotalScore = request.getParameter("totalscore" + sectionIndex[i]);
            totalScore+=Double.parseDouble(sectionTotalScore);
            //获取每个大项的title
            String sectionTitle= request.getParameter("section"+sectionIndex[i]);
            majorTerm.setTitle(sectionTitle);
            //获取大项中题目的数量
            String itemCount = request.getParameter("itemcount" + sectionIndex[i]);
            majorTerm.setItemcount(Integer.parseInt(itemCount));
            //获取大项中每一个题的分数
            String itemscore = request.getParameter("itemscore"+sectionIndex[i]);
            majorTerm.setItemscore(Double.parseDouble(itemscore));
            //获取大项下面对应的所有的小题的id
            List<Integer> ids=new ArrayList<>();
            String sectionStr = request.getParameter("sectionStr" + sectionIndex[i]);
            String[] idsArray = sectionStr.split(",");
            for(int j=0;j<idsArray.length;j++){
                ids.add(Integer.parseInt(idsArray[j]));
            }
            majorTerm.setItemids(ids);
            sections.add(majorTerm);
            pool.setScore(totalScore);
        }}
        pool.setExamMajorTerms(sections);
        examQuestionPoolService.saveManuallyPool(pool,id);
    }

    /**
     * 试卷库-自主建卷-导入题目
     * @param file
     * @param username
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/importExamPoolItem")
    public Object importExamPoolItem(@RequestParam("file") MultipartFile file,@RequestParam String username) throws Exception {
        String name = file.getOriginalFilename();
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
        Set<Integer> itemIds = questionPoolUpLoadService.resolveExcelWithExamPool(bytes, name, shareService.getUserByUsername(username));
        String rs = "";
        for (Integer itemId : itemIds) {
            rs += itemId + ",";
        }
        LayuiUpLoadResponseVo layuiUpLoadResponseVo = new LayuiUpLoadResponseVo();
        layuiUpLoadResponseVo.setCode(0);
        if(rs.length()>0){
            layuiUpLoadResponseVo.setMsg(rs.substring(0, rs.length() - 1));
        }
        layuiUpLoadResponseVo.setData(new ArrayList<>());
        return layuiUpLoadResponseVo;
    }

    /**
     * 试卷库-自主建卷保存
     * @param request
     * @param username
     * @param id
     * @param autoExamDTO
     */
    @RequestMapping("/saveIndependentExamQuestionPool")
    public void saveIndependentExamQuestionPool(HttpServletRequest request,@RequestParam String username,Integer id,AutoExamDTO autoExamDTO){
        //以下获取表单发送的参数
        //试卷库大项
        List<ExamMajorTermVO> sections = new ArrayList<>();
        //试卷库VO
        ExamQuestionPoolVO pool = new ExamQuestionPoolVO();
        pool.setTitle(autoExamDTO.getExamQuestionPoolTitle());
        pool.setCategory(autoExamDTO.getCategory());
        pool.setCreateTime(new Date());
        pool.setScore(autoExamDTO.getScore());
        pool.setUsername(username);

        //获取试卷库大项的页面id集合
        String examSectionIds[] = autoExamDTO.getExamSectionId();
        //循环页面上所有的试卷库大项并获取参数值
        if (examSectionIds != null) {
            for (int i = 0; i < examSectionIds.length; i++) {
                //以下获取表单发送的参数,根据大项的页面id不同区分
                //试卷库大项名称
                String examSectionTitle = request.getParameter("examSectionTitle_" + examSectionIds[i]);
                //试卷库大项的小题数量
                int itemcount = Integer.valueOf(request.getParameter("itemCount_" + examSectionIds[i]));
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
        examQuestionPoolService.saveIndependentPool(pool, id);
    }
}
