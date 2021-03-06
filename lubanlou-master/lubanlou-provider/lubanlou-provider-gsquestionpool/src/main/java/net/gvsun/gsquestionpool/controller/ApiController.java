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
     * ????????????????????????
     * @return
     */
    @RequestMapping("/findAllQuestionPoolCategory")
    public List<QuestionPoolCategoryVO> findAllQuestionPoolCategory(){
        return questionPoolListService.findAllQuestionPoolCategory();
    }

    /**
     * ??????????????????
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
     * ??????id????????????
     * @param questionPoolId
     */
    @RequestMapping("/deleteQuestionPool")
    public void deleteQuestionPool(@RequestParam Integer questionPoolId){
        questionPoolListService.deleteQuestionPoolById(questionPoolId);
    }

    /**
     * ????????????
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
     * ??????id????????????????????????????????????????????????
     * @param questionPoolId
     * @return
     */
    @RequestMapping("/findQuestionPoolById")
    public QuestionPoolVO findQuestionPoolById(@RequestParam Integer questionPoolId){
        return questionPoolListService.findQuestionPoolById(questionPoolId);
    }

    /**
     * ??????????????????
     * @param categoryId
     */
    @RequestMapping("/deleteQuestionPoolCategory")
    public void deleteQuestionPoolCategory(@RequestParam Integer categoryId){
        questionPoolCategoryService.deleteQuestionPoolById(categoryId);
    }

    /**
     * ??????????????????
     * @param title
     * @param categoryId
     */
    @RequestMapping("/saveQuestionPoolCategory")
    public void saveQuestionPoolCategory(@RequestParam String title,Integer categoryId){
        service01.saveQuestionPoolCategory(title,categoryId);
    }

    /**
     * ??????id????????????????????????????????????????????????????????????
     * @param categoryId
     * @return
     */
    @RequestMapping("/findQuestionPoolCategoryById")
    public QuestionPoolCategoryVO findQuestionPoolCategoryById(@RequestParam Integer categoryId){
        return questionPoolCategoryService.getQuestionPoolCategoryById(categoryId);
    }

    /**
     * ?????????????????????????????????
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
     * ????????????
     * @param tAssignmentItemDTO
     * @param username
     * @param questionPoolId
     * @param itemId
     */
    @RequestMapping("/saveTassignmentItem")
    public void saveTassignmentItem(TAssignmentItemDTO tAssignmentItemDTO,@RequestParam String username,@RequestParam Integer questionPoolId,Integer itemId){
        // ?????????
        if ("5".equals(tAssignmentItemDTO.getType())) {
            tAssignmentItemDTO.setIsOrder(tAssignmentItemDTO.getGradeType());
        }
        questionPoolListService.insertTAssignmentItem(tAssignmentItemDTO.getType(), tAssignmentItemDTO.getStem(), tAssignmentItemDTO.getAnswer(),
                tAssignmentItemDTO.getSingle(),shareService.getUserByUsername(username) , tAssignmentItemDTO.getAnswerLabelChoices(), questionPoolId,
                itemId, tAssignmentItemDTO.getIsOrder(),tAssignmentItemDTO.getSanswerWeight(),tAssignmentItemDTO.getSingleWeight());
    }

    /**
     * ????????????????????????
     * @param itemId
     * @param questionPoolId
     */
    @RequestMapping("/deleteTAssignmentItemById")
    public void deleteTAssignmentItemById(@RequestParam Integer itemId,@RequestParam Integer questionPoolId){
        questionPoolListService.deleteTAssignmentItemById(itemId, questionPoolId);
    }

    /**
     * ??????id????????????????????????????????????????????????
     * @param itemId
     * @return
     */
    @RequestMapping("/findItemById")
    public QuestionVo findItemById(@RequestParam Integer itemId){
        return questionPoolListService.findQuestionOptionById(itemId);
    }

    /**
     * ????????????-????????????
     * @param itemId
     */
    @RequestMapping("/markItem")
    public void markItem(@RequestParam Integer itemId){
        questionPoolListService.markQuestionFlag(itemId);
    }

    /**
     * ????????????-??????????????????
     * @param itemId
     */
    @RequestMapping("/unmarkItem")
    public void unmarkItem(@RequestParam Integer itemId){
        questionPoolListService.markQuestionFlagBack(itemId);
    }

    /**
     * ????????????--????????????
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
        response.setContentType("multipart/form-data;charset=UTF-8");// ??????response???????????????
        response.setHeader(
                "Content-disposition",
                "attachment;filename="
                        + URLEncoder.encode(titleQuestion + ".xls", "UTF-8"));// ??????????????????
        ServletOutputStream outputStream = response.getOutputStream();
        outputStream.write(bytes);
        outputStream.close();
    }

    /**
     * ????????????-????????????
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
            Map<String, String> result = questionPoolUpLoadService.resolveExcelWithQUestionPool(bytes, name, questionPoolId, shareService.getUserByUsername(username),filePath, ClientDatabaseContextHolder.getClientDatabase());
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

    /**
     * ???????????????????????????
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
     * ???????????????????????????
     * @param examQuestionPoolId
     */
    @RequestMapping("/deleteExamQuestionPool")
    public void deleteExamQuestionPool(@RequestParam Integer examQuestionPoolId){
        questionPoolListService.deleteExamQuestionpool(examQuestionPoolId);
    }

    /**
     * ??????id??????????????????????????????????????????
     * @param examQuestionPoolId
     * @param type
     * @return
     */
    @RequestMapping("/findExamQuestionPoolById")
    public ExamQuestionPoolVO findExamQuestionPoolById(@RequestParam Integer examQuestionPoolId,@RequestParam Integer type){
        return questionPoolListService.findExamQuestionPoolVOById(examQuestionPoolId, type);
    }

    /**
     * ?????????????????????????????????????????????
     * @param cid
     * @return
     */
    @RequestMapping("/getAllQuestionPool")
    public List<QuestionPoolVO> getAllQuestionPool(Integer cid) {
        //????????????????????????
        List<QuestionPoolVO> questionPool = questionPoolListService.findQuestionPool(1, 999, null, null, null);
        if(cid!=null){
            //????????????????????????
            questionPool.addAll(questionPoolListService.findQuestionListBySiteId(Integer.parseInt(cid.toString()), null, null, 1, 999, null));
        }
        return questionPool;
    }

    /**
     * ?????????????????????????????????????????????
     * @param questionPoolId
     * @return
     */
    @RequestMapping("/calQuestionPoolItemNum")
    public Map<Integer, String> calQuestionPoolItemNum(@RequestParam Integer questionPoolId){
        return examQuestionPoolService.calcQuestionpoolNum(questionPoolId);
    }

    /**
     * ?????????-??????????????????
     * @param request
     * @param username
     * @param id
     * @param autoExamDTO
     */
    @RequestMapping("/saveAutoExamQuestionPool")
    public void saveAutoExamQuestionPool(HttpServletRequest request,@RequestParam String username,Integer id, AutoExamDTO autoExamDTO){
        //?????????????????????????????????
        //???????????????
        List<ExamMajorTermVO> sections=new ArrayList<>();
        //?????????VO
        ExamQuestionPoolVO pool=new ExamQuestionPoolVO();
        pool.setId(id);
        pool.setTitle(autoExamDTO.getExamQuestionPoolTitle());
        pool.setCategory(autoExamDTO.getCategory());
        pool.setCreateTime(new Date());
        pool.setScore(autoExamDTO.getScore());
        pool.setUsername(username);
        //?????????????????????????????????????????????????????????
        String[] examSectionIds = autoExamDTO.getExamSectionId();
        if(examSectionIds!=null){
            for(int i=0;i<examSectionIds.length;i++){
                //?????????????????????????????????,?????????????????????id????????????
                //?????????????????????
                String examSectionTitle = request.getParameter("examSectionTitle_"+examSectionIds[i]);
                //??????????????????????????????
                int itemcount = Integer.valueOf(request.getParameter("itemcount_"+examSectionIds[i]));
                //??????????????????????????????
                double itemscore = Double.valueOf(request.getParameter("itemscore_"+examSectionIds[i]));
                //??????????????????????????????
                List<Integer> itemIds = new ArrayList<>();
                //???????????????vo
                ExamMajorTermVO examMajorTermVO= new ExamMajorTermVO();
                examMajorTermVO.setTitle(examSectionTitle);
                examMajorTermVO.setItemcount(itemcount);
                examMajorTermVO.setItemscore(itemscore);
                //????????????????????????id
                int questionpoolId = Integer.valueOf(request.getParameter("questionpoolId_"+examSectionIds[i]));
                examMajorTermVO.setItemQuestionPoolId(questionpoolId);
                //??????????????????????????????
                int questionType = Integer.valueOf(request.getParameter("questionType_"+examSectionIds[i]));
                examMajorTermVO.setItemType(questionType);
                //??????????????????????????????????????????????????????id
                List<Integer> allItemIds = examQuestionPoolService.findQuestionPoolByCount(examMajorTermVO,questionpoolId,questionType);
                itemIds = getRandomNum(allItemIds,itemcount);
                //???????????????????????????????????????
                examMajorTermVO.setItemids(itemIds);
                //??????????????????????????????
                sections.add(examMajorTermVO);
            }
        }
        //???????????????????????????
        pool.setExamMajorTerms(sections);
        //???????????????
        examQuestionPoolService.saveAutoPool(pool,id);
    }

    /**
     * ????????????-???????????????
     * @param list
     * @param selected
     * @return
     */
    public List<Integer> getRandomNum(List<Integer> list, int selected) {
        List<Integer> reList = new ArrayList<Integer>();
        Random random = new Random();
        // ?????????????????????????????????
        if (list.size() >= selected) {
            for (int i = 0; i < selected; i++) {
                // ?????????????????????0-list.size()-1;
                int target = random.nextInt(list.size());
                reList.add(list.get(target));
                list.remove(target);
            }
        } else {
            selected = list.size();
            for (int i = 0; i < selected; i++) {
                // ?????????????????????0-list.size()-1;
                int target = random.nextInt(list.size());
                reList.add(list.get(target));
                list.remove(target);
            }
        }
        return reList;
    }

    /**
     * ?????????-????????????????????????
     * @param examQuestionPoolId
     * @return
     */
    @RequestMapping("/itemApi")
    public List<ExamItemVo> itemApi(@RequestParam Integer examQuestionPoolId){
        return examQuestionPoolService.getItem(examQuestionPoolId);
    }

    /**
     * ?????????-??????????????????
     * @param request
     * @param username
     * @param id
     * @param autoExamDTO
     */
    @RequestMapping("/saveManualExamQuestionPool")
    public void saveManualExamQuestionPool(HttpServletRequest request,@RequestParam String username,Integer id,AutoExamDTO autoExamDTO){
        //?????????????????????;;;
        ExamQuestionPoolVO pool=new ExamQuestionPoolVO();
        pool.setTitle(autoExamDTO.getExamQuestionPoolTitle());
        pool.setCategory(autoExamDTO.getCategory());
        pool.setCreateTime(new Date());
        pool.setUsername(username);
        //???????????????
        //?????????????????????
//        if(id==null){};
        String[] sectionIndex = autoExamDTO.getExamSectionId();
        double totalScore = 0;
        List<ExamMajorTermVO> sections=new ArrayList<>();
        if(sectionIndex!=null){for(int i=0;i<sectionIndex.length;i++){
            ExamMajorTermVO majorTerm=new ExamMajorTermVO();
            //???????????????????????????
            String sectionTotalScore = request.getParameter("totalscore" + sectionIndex[i]);
            totalScore+=Double.parseDouble(sectionTotalScore);
            //?????????????????????title
            String sectionTitle= request.getParameter("section"+sectionIndex[i]);
            majorTerm.setTitle(sectionTitle);
            //??????????????????????????????
            String itemCount = request.getParameter("itemcount" + sectionIndex[i]);
            majorTerm.setItemcount(Integer.parseInt(itemCount));
            //????????????????????????????????????
            String itemscore = request.getParameter("itemscore"+sectionIndex[i]);
            majorTerm.setItemscore(Double.parseDouble(itemscore));
            //?????????????????????????????????????????????id
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
     * ?????????-????????????-????????????
     * @param file
     * @param username
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/importExamPoolItem")
    public Object importExamPoolItem(@RequestParam("file") MultipartFile file,@RequestParam String username) throws Exception {
        String name = file.getOriginalFilename();
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
     * ?????????-??????????????????
     * @param request
     * @param username
     * @param id
     * @param autoExamDTO
     */
    @RequestMapping("/saveIndependentExamQuestionPool")
    public void saveIndependentExamQuestionPool(HttpServletRequest request,@RequestParam String username,Integer id,AutoExamDTO autoExamDTO){
        //?????????????????????????????????
        //???????????????
        List<ExamMajorTermVO> sections = new ArrayList<>();
        //?????????VO
        ExamQuestionPoolVO pool = new ExamQuestionPoolVO();
        pool.setTitle(autoExamDTO.getExamQuestionPoolTitle());
        pool.setCategory(autoExamDTO.getCategory());
        pool.setCreateTime(new Date());
        pool.setScore(autoExamDTO.getScore());
        pool.setUsername(username);

        //??????????????????????????????id??????
        String examSectionIds[] = autoExamDTO.getExamSectionId();
        //?????????????????????????????????????????????????????????
        if (examSectionIds != null) {
            for (int i = 0; i < examSectionIds.length; i++) {
                //?????????????????????????????????,?????????????????????id????????????
                //?????????????????????
                String examSectionTitle = request.getParameter("examSectionTitle_" + examSectionIds[i]);
                //??????????????????????????????
                int itemcount = Integer.valueOf(request.getParameter("itemCount_" + examSectionIds[i]));
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
    }
}
