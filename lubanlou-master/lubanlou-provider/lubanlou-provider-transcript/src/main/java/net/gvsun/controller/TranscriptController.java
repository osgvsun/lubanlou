package net.gvsun.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import net.gvsun.common.Result;
import net.gvsun.dto.ReportWeightDto;
import net.gvsun.service.ShareService;
import net.gvsun.service.TranscriptService;
import net.gvsun.transcript.external.TGradeObjectVO;
import net.gvsun.usercenter.internal.UserDetailDto;
import net.gvsun.vo.*;
import net.gvsun.vo.practicetimetable.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;


/**
 * Created by REM on 2019/2/25.
 */
@RestController
@Api(value = "transcript")
public class TranscriptController {
    @Autowired
    private TranscriptService transcriptService;
    @Autowired
    private ShareService shareService;
    @Value("${apiGateWayHost}")
    private String apiGateWayHost;
    /**************************************************************************
     * Description 成绩册-查看分项成绩
     *
     * @author 黄浩
     * @date 2019年4月24日
     **************************************************************************/
    @GetMapping("/gradebookList")
    @ApiOperation(value = "查看分项成绩")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo gradebookList(@RequestParam(required = true) String module,@RequestParam(required = true) Integer siteId,
                                      @RequestParam(required = true) String type,@RequestParam(required = false) Integer currpage,
                                      @RequestParam(required = false) Integer pageSize,@RequestParam(required = false) String username,
                                      @RequestParam(required = false) String cname,@RequestParam(required = false) String courseNumber,
                                      @RequestParam(required = false) String classesNumber) {
        TranscriptVo transcriptVo = null;

        if (currpage!=null){
            currpage = currpage - 1;
              transcriptVo = transcriptService.findTGradeRecords(module, type, siteId, currpage.toString(), pageSize.toString(),cname,username,courseNumber,classesNumber);
        }else {
            transcriptVo = transcriptService.findTGradeRecords(module, type, siteId, "", "",cname,username,courseNumber,classesNumber);
        }
        return JsonReturnVo.successJson(transcriptVo);
    }

    /**************************************************************************
     * Description 成绩册-查看分项成绩
     *
     * @author 黄浩
     * @date 2019年4月24日
     **************************************************************************/
    @GetMapping("/gradebookListSjtudc")
    @ApiOperation(value = "查看分项成绩")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public TranscriptVo gradebookListSjtudc(@RequestParam(required = true) String module,@RequestParam(required = true) Integer siteId,
                                      @RequestParam(required = true) String type,@RequestParam(required = false) Integer currpage,
                                      @RequestParam(required = false) Integer pageSize,@RequestParam(required = false) String username,
                                      @RequestParam(required = false) String cname,@RequestParam(required = false) String classesNumber) {
        TranscriptVo transcriptVo = null;

        if (currpage!=null){
            currpage = currpage - 1;
            transcriptVo = transcriptService.findTGradeRecords(module, type, siteId, currpage.toString(), pageSize.toString(),cname,username,"",classesNumber);
        }else {
            transcriptVo = transcriptService.findTGradeRecords(module, type, siteId, "", "",cname,username,"",classesNumber);
        }
        return transcriptVo;
    }

    /**************************************************************************
     * Description 成绩册-同步最新总成绩
     *
     * @author 黄浩
     * @date 2019年4月25日
     **************************************************************************/
    @PostMapping("/synchronizeAllTTestGrading")
    @ApiOperation(value = "同步最新总成绩")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo synchronizeAllTTestGrading(@RequestParam(required = true) Integer siteId) {
        transcriptService.synchronizeTTestGrading(siteId);
        return JsonReturnVo.successJson(siteId);
    }
    /**************************************************************************
     * Description 成绩册-保存最新额外成绩
     *
     * @author 黄浩
     * @date 2019年4月25日
     **************************************************************************/
    @PostMapping("/saveTTestGrading")
    @ApiOperation(value = "保存最新额外成绩")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo saveTTestGrading(@RequestParam(required = true) String module,@RequestParam(required = true) Integer siteId,
                                         @RequestParam(required = true) String type,@RequestParam(required = true) String student,
                                         @RequestParam(required = true) float score) {
        transcriptService.saveTTestGrading(module, type, siteId, student, score);
        return JsonReturnVo.successJson(student);
    }
    /**************************************************************************
     * Description 成绩册-查看总成绩
     *
     * @author 黄浩
     * @date 2019年4月24日
     **************************************************************************/
    @GetMapping("/gradebookTotalList")
    @ApiOperation(value = "查看总成绩")
//    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo gradebookTotalList(@RequestParam(required = true) Integer siteId, @RequestParam(required = false) Integer currpage,
                                      @RequestParam(required = false) Integer pageSize,@RequestParam(required = false) String username,
                                      @RequestParam(required = false) String cname,@RequestParam(required = false) String classesNumber) {
        TotalVo totalVo = null;
        if (currpage!=null){
            currpage = currpage - 1;
            totalVo = transcriptService.findTotalGradeBooks(siteId, currpage.toString(), pageSize.toString(),username,cname,classesNumber);
        }else {
            totalVo = transcriptService.findTotalGradeBooks(siteId, "", "",username,cname,classesNumber);
        }
        return JsonReturnVo.successJson(totalVo);
    }
    /**************************************************************************
     * Description 成绩册-创建成绩册
     *
     * @author 黄浩
     * @date 2019年4月26日
     **************************************************************************/
    @PostMapping("/createGradeBook")
    @ApiOperation(value = "创建成绩册")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo createGradeBook(@RequestParam(required = true) Integer siteId,@RequestParam(required = true) String siteName, @RequestParam(required = false) String assignmentId,
                                        @RequestParam(required = false) String assignmentTitle,@RequestParam(required = true) String type,@RequestParam(required = true) Double weight,
                                        @RequestParam(required = true) String module,@RequestParam(required = false) Integer experimentId,@RequestParam(required = false) String experimentTitle,
                                        @RequestParam(required = false) String courseNumber,@RequestParam(required = false)String product,@RequestParam(required = false)String termNumber,
                                        @RequestParam(required = false)String termName,@RequestParam(required = false)Integer isOpen, HttpServletRequest request){
        boolean result = transcriptService.createGradeBook(siteId,siteName,assignmentId,assignmentTitle,type,weight,module,experimentId,experimentTitle,courseNumber,product,termNumber,termName,isOpen);
        if (result){
            return JsonReturnVo.successJson("创建成功");
        }else {
            return JsonReturnVo.errorJson("创建失败");
        }
    }
    /**************************************************************************
     * Description 教学调用接口-同步成绩单中缺少的数据
     *
     * @author fubowen
     * @date 2021-7-27
     **************************************************************************/
    @PostMapping("/synchronizeTGradeObject")
    public JsonReturnVo synchronizeTGradeObject(@RequestParam() Integer siteId,@RequestParam() String siteName, @RequestBody List<TGradeObjectVO> list){
        try{
            transcriptService.synchronizeTGradeObject(siteId,siteName,list);
            return JsonReturnVo.successJson("同步成功");
        }catch (Exception e){
            e.printStackTrace();
            return JsonReturnVo.errorJson("同步失败");
        }
    }
    /**************************************************************************
     * Description 成绩册-新增成绩数据
     *
     * @author 黄浩
     * @date 2019年4月26日
     **************************************************************************/
    @PostMapping("/saveRecord")
    @ApiOperation(value = "新增成绩数据")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo saveRecord(@RequestParam(required = true) Integer siteId,@RequestParam(required = false) String assignmentId,@RequestParam(required = true) Double points,
                                     @RequestParam(required = true) String username, @RequestParam(required = true) String cname,@RequestParam(required = false)String module,
                                   @RequestParam(required = false)Integer experimentId,@RequestParam(required = false) String courseNumber,HttpServletRequest request){
//        CheckAuthorization checkAuthorization = AuthorizationUtil.checkAuthorization(request);
//        if (checkAuthorization.getCheckState().equals("success")){
        return transcriptService.saveRecord(siteId,assignmentId,username,cname,points,module,experimentId,courseNumber);
//        }else {
//            return JsonReturnVo.errorJson("未通过jwt验证:"+checkAuthorization.getErrorCode());
//        }
    }
    /**************************************************************************
     * Description 成绩册-批量保存学生成绩
     *
     * @author fubowen
     * @date 2021-8-12
     **************************************************************************/
    @PostMapping("/batchSaveRecord")
    public Result batchSaveRecord(@RequestParam Integer siteId, @RequestParam String assignmentId, @RequestBody List<net.gvsun.transcript.external.UserVo> list){
        return transcriptService.batchSaveRecord(siteId,assignmentId,list);
    }
    /**************************************************************************
     * Description 学习管理-保存修改后的权重(t_grade_object)
     *
     * @author 马帅
     * @date 2018年1月31日
     **************************************************************************/
    @PostMapping("/saveSingleWeightSetting")
    @ApiOperation(value = "保存修改后的权重(t_grade_object)")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo saveSingleWeightSetting(@RequestParam(required = true) String weightStr,@RequestParam(required = true) String idStr,@RequestParam(required = true) String functionType){
        //跳转的方法标记
        transcriptService.singleWeightSetting(weightStr,idStr,functionType);
        return JsonReturnVo.successJson(idStr);
    }
    /**************************************************************************
     * Description 成绩册-获取各项权重
     *
     * @author 黄浩
     * @date 2019年4月26日
     **************************************************************************/
    @GetMapping("/findTWeightSettingListByType")
    @ApiOperation(value = "获取各项权重")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo findTWeightSettingListByType(@RequestParam(required = true) Integer siteId,@RequestParam(required = true) String type){
        List<TWeightSettingVO> list = transcriptService.findTWeightSettingListByType(siteId,type);
        return JsonReturnVo.successJson(list);
    }
    /**************************************************************************
     * Description 成绩册-获取各项权重(t_grade_object)
     *
     * @author 黄浩
     * @date 2019年4月26日
     **************************************************************************/
    @GetMapping("/findTGradeObjects")
    @ApiOperation(value = "获取各项权重(t_grade_object)")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo findTGradeObjects(@RequestParam(required = true) String module,@RequestParam(required = true) String type,@RequestParam(required = true) Integer siteId){
        List<TGradeObjectVO> list = transcriptService.findTGradeObjects(module,type,siteId);
        return JsonReturnVo.successJson(list);
    }
    /**************************************************************************
     * Description 学习管理-保存修改后的权重(t_weight_setting)
     *
     * @author 马帅
     * @date 2018年1月31日
     **************************************************************************/
    @PostMapping("/saveWeightSetting")
    @ApiOperation(value = "保存修改后的权重(t_weight_setting)")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo saveWeightSetting(@RequestParam(required = true) String weightStr, @RequestParam(required = true) String idStr,@RequestParam(required = true) String functionType,@RequestParam(required = false) String displayStr){
        transcriptService.weightSetting(weightStr,idStr,functionType,displayStr);
        return JsonReturnVo.successJson(idStr);
    }
    /**************************************************************************
     * Description 查询总成绩的各项权重
     *
     * @author 黄浩
     * @date 2019年5月8日
     **************************************************************************/
    @GetMapping("/findTotalWeight")
    @ApiOperation(value = "查询总成绩的各项权重(t_weight_setting)")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo findTotalWeight(@RequestParam(required = true) Integer siteId){
        TotalWeightSettingVO totalWeightSettingVO = transcriptService.findTWeightSetting(siteId);
        return JsonReturnVo.successJson(totalWeightSettingVO);
    }
    /**************************************************************************
     * Description 删除成绩册
     *
     * @author 黄浩
     * @date 2019年5月14日
     **************************************************************************/
    @PostMapping("/deleteTranscript")
    @ApiOperation(value = "删除成绩册")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo deleteTranscript(@RequestParam(required = false) String assignmentId,@RequestParam(required = false) String type,@RequestParam(required = false) String module,@RequestParam(required = false) Integer siteId){
        siteId = (siteId==null?0:siteId);
        transcriptService.deleteTranscript(assignmentId,type,module,siteId);
        return JsonReturnVo.successJson("成功");
    }
    /**************************************************************************
     * Description 学习管理-保存修改后的权重(t_weight_setting)
     *
     * @author 马帅
     * @date 2018年1月31日
     **************************************************************************/
    @PostMapping("/saveExperimentWeightSetting")
    @ApiOperation(value = "保存实验项目权重(t_grade_object)")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo saveExperimentWeightSetting(@RequestParam(required = true) String weightStr, @RequestParam(required = true) String idStr,@RequestParam(required = true) String functionType){
        transcriptService.experimentWeightSetting(weightStr,idStr,functionType);
        return JsonReturnVo.successJson(idStr);
    }
    /**************************************************************************
     * Description 成绩册-初始化
     *
     * @author 黄浩
     * @date 2019年4月25日
     **************************************************************************/
    @PostMapping("/initializeTTestGrading")
    @ApiOperation(value = "初始化总成绩")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo initializeTTestGrading(@RequestParam(required = true) Integer siteId, @RequestParam(required = true) String student
                                                ,@RequestParam(required = true) String cname,@RequestParam(required = false) Integer groupId
                                                ,@RequestParam(required = false) String groupTitle,@RequestParam(required = false) String courseNumber
                                                ,@RequestParam(required = false) String classesNumber) {
        transcriptService.initializeTTestGrading(siteId, student, cname,groupId,groupTitle,courseNumber,classesNumber);
        return JsonReturnVo.successJson(student);
    }
    /**************************************************************************
     * Description 成绩册-删除成绩册
     *
     * @author 黄浩
     * @date 2019年4月25日
     **************************************************************************/
    @PostMapping("/deleteTTestGrading")
    @ApiOperation(value = "删除总成绩")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo deleteTTestGrading(@RequestParam(required = true) Integer siteId, @RequestParam(required = true) String student) {
        transcriptService.deleteTTestGrading(siteId, student);
        return JsonReturnVo.successJson(student);
    }
    /**************************************************************************
     * Description 成绩册-批量删除成绩册
     *
     * @author 黄浩
     * @date 2019年4月25日
     **************************************************************************/
    @PostMapping("/deleteTTestGradings")
    @ApiOperation(value = "批量删除总成绩")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo deleteTTestGradings(@RequestParam(required = true) Integer siteId, @RequestParam(required = true) String students) {
        transcriptService.deleteTTestGradings(siteId, students);
        return JsonReturnVo.successJson(students);
    }
    /**************************************************************************
     * Description 成绩册-批量导入学生成绩
     *
     * @author 黄浩
     * @date 2019年4月26日
     **************************************************************************/
    @PostMapping("/importRecordByExcel")
    @ApiOperation(value = "批量导入学生成绩")
    public boolean importRecordByExcel(@RequestParam("file") MultipartFile file, Integer siteId, String assignmentId)throws Exception{
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
        return transcriptService.importRecordByExcel(bytes, name,siteId,assignmentId);
    }
    /**************************************************************************
     * Description 成绩册-修改状态值（is_open）
     *
     * @author 黄浩
     * @date 2019年10月9日
     **************************************************************************/
    @PostMapping("/editIsOpen")
    @ApiOperation(value = "修改实验项目状态值（is_open）")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo editIsOpen(@RequestParam(required = true) Integer experimentId,@RequestParam(required = true) Integer flag) {
        return transcriptService.editIsOpen(experimentId, flag);
    }
    /**************************************************************************
     * Description 成绩册-保存权重
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @PostMapping("/saveTWeightSetting")
    @ApiOperation(value = "保存权重")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public boolean saveTWeightSetting(@RequestParam(required = false) String courseNumber,@RequestParam(required = true) float weight,
                                           @RequestParam(required = true) String title,@RequestParam(required = false) Integer id) {
        return transcriptService.saveTWeightSetting(courseNumber, weight,id,title);
    }
    /**************************************************************************
     * Description 成绩册-保存工训评分项
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @PostMapping("/savePracticeWeight")
    @ApiOperation(value = "保存权重")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public Result<String> savePracticeWeight(@RequestParam(required = false) String courseNumber,@RequestParam(required = true) float weight,
                                      @RequestParam(required = true) String title,@RequestParam(required = false) Integer id) {
        return transcriptService.savePracticeWeight(courseNumber, weight,id,title);
    }
    /**************************************************************************
     * Description 成绩册-权重列表
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @GetMapping("/tWeightSettingListApi")
    @ApiOperation(value = "权重列表")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public CourseWeightVo tWeightSettingListApi(@RequestParam(required = false) String courseNumber, @RequestParam(required = false) String termUId,
                                                      @RequestParam(required = true) Integer page, @RequestParam(required = true) Integer limit,
                                                      @RequestParam(required = true) String product){
        return transcriptService.findTWeightSettingByCourseNumber(courseNumber,termUId,page,limit,product);
    }
    /**************************************************************************
     * Description 成绩册-权重停用启用
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @PostMapping("/deleteTWeightSettingApi")
    @ApiOperation(value = "权重停用启用")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public boolean deleteTWeightSettingApi(Integer id){
        return transcriptService.deleteTWeightSetting(id);
    }
    /**************************************************************************
     * Description 成绩册-获取某一权重
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @PostMapping("/findWeightAip")
    @ApiOperation(value = "获取某一权重")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public TWeightSettingVO findWeightAip(Integer id){
        return transcriptService.findWeightById(id);
    }
    /**************************************************************************
     * Description 成绩册-获取课程
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @GetMapping("/courseListApi")
    @ApiOperation(value = "获取课程")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public CourseVo courseListApi(@RequestParam(required = false) String courseNumber, @RequestParam(required = false) String termUId,
                                  @RequestParam(required = true) Integer page, @RequestParam(required = true) Integer limit,
                                  @RequestParam(required = true) String product){
        return transcriptService.courseList(termUId,courseNumber,product,page,limit);
    }
    /**************************************************************************
     * Description 成绩册-获取课程与工种
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @GetMapping("/gradeObjectListApi")
    @ApiOperation(value = "获取课程与工种")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public CourseGradeObjectVo gradeObjectListApi(@RequestParam(required = false) String courseNumber, @RequestParam(required = false) String termUId,
                                                  @RequestParam(required = true) Integer page, @RequestParam(required = true) Integer limit,
                                                  @RequestParam(required = true) String product,@RequestParam(required = false) String username){
        return transcriptService.gradeObjectList(termUId,courseNumber,product,page,limit,username);
    }
    /**************************************************************************
     * Description 成绩册-获取评分项列表
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @GetMapping("/scoreItemListApi")
    @ApiOperation(value = "获取评分项列表")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public List<TWeightSettingVO> scoreItemListApi(@RequestParam(required = true) String courseNumber){
        return transcriptService.getWeightByCourseNumber(courseNumber);
    }
    /**************************************************************************
     * Description 成绩册-获取工种使用评分项情况列表
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @GetMapping("/scoreItemEnableListApi")
    @ApiOperation(value = "获取工种使用评分项情况列表")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public TGradeObjectLayuiVo scoreItemEnableListApi(@RequestParam(required = true) String courseNumber){
        return transcriptService.getTGradeObjectStatusByCourseNumber(courseNumber);
    }
    /**************************************************************************
     * Description 成绩册-修改权重状态值
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @PostMapping("/editScoreItemEnableApi")
    @ResponseBody
    @ApiOperation(value = "修改权重状态值")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public boolean editScoreItemEnableApi(@RequestBody(required = true)List<ObjectWeightEnableVo> data){
        return transcriptService.editWeightEnable(data);
    }
    /**************************************************************************
     * Description 成绩册-计算工种权重
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @PostMapping("/calculateWorkWeightApi")
    @ApiOperation(value = "计算工种权重")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public boolean editScoreItemEnableApi(@RequestParam(required = true)String courseNumber){
        return transcriptService.calculateWorkWeight(courseNumber);
    }
    /**************************************************************************
     * Description 成绩册-获取工种使用评分项权重列表
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @GetMapping("/scoreItemWeightListApi")
    @ApiOperation(value = "获取工种使用评分项权重列表")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public TGradeObjectLayuiVo scoreItemWeightListApi(@RequestParam(required = true) String courseNumber){
        return transcriptService.scoreItemWeightList(courseNumber);
    }
    /**************************************************************************
     * Description 成绩册-获取工种成绩列表
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @GetMapping("/gradebookListPracticeTimetableApi")
    @ApiOperation(value = "获取工种成绩列表")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public TGradeObjectLayuiVo gradebookListPracticeTimetableApi(@RequestParam(required = true) String courseNumber,@RequestParam(required = true) String product,
                                                                 @RequestParam(required = true) Integer workId,@RequestParam(required = true) Integer page,
                                                                 @RequestParam(required = true) Integer limit){
        return transcriptService.gradebookListPracticeTimetable(courseNumber,product,workId,page,limit);
    }
    /**************************************************************************
     * Description 成绩册-工训打分
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @PostMapping("/markingPracticeTimetableApi")
    @ResponseBody
    @ApiOperation(value = "工训打分")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public boolean markingPracticeTimetableApi(@RequestBody(required = true)List<ObjectWeightEnableVo> data){
        return transcriptService.markingPracticeTimetable(data);
    }
    /**************************************************************************
     * Description 成绩册-获取课程成绩列表（工训）
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @GetMapping("/gradebookTotalListPracticeTimetableApi")
    @ApiOperation(value = "成绩册-获取课程成绩列表（工训）")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public TGradeObjectLayuiVo gradebookTotalListPracticeTimetableApi(@RequestParam(required = true) String courseNumber,@RequestParam(required = true) String product,
                                                                @RequestParam(required = true) Integer page, @RequestParam(required = true) Integer limit){
        return transcriptService.gradebookTotalListPracticeTimetable(courseNumber,product,page,limit);
    }
    /**************************************************************************
     * Description 成绩册-批量添加学生
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @PostMapping("/insertStudentsApi")
    @ResponseBody
    @ApiOperation(value = "批量添加学生")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public boolean insertStudentsApi(@RequestBody List<UserVo> data){
        return transcriptService.insertStudents(data);
    }
    /**************************************************************************
     * Description 成绩册-获取可打分评分项列表
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @GetMapping("/scoreItemMarkingListApi")
    @ApiOperation(value = "获取评分项列表")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public List<TWeightSettingVO> scoreItemMarkingListApi(@RequestParam(required = true) Integer workId){
        return transcriptService.getWeightByWorkId(workId);
    }
    /*************************************************************************************
     * Description:成绩册-复制课程工种权重
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @PostMapping("/copyCourseWeightApi")
    @ApiOperation(value = "复制课程工种权重")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public boolean copyCourseWeight(String sourceCourseNumber,String targetCourseNumber){
        return transcriptService.copyCourseWeight(sourceCourseNumber,targetCourseNumber);
    }
    /*************************************************************************************
     * Description:成绩册-工种与用户的关系
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @PostMapping("/workUserApi")
    @ApiOperation(value = "复制课程工种权重")
    public boolean workUserApi(@RequestBody(required = true) WorkUserVo workUserVo){
        return transcriptService.workUser(workUserVo);
    }
    /**************************************************************************
     * Description 成绩册-获取课程成绩列表（工训，导出用）
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @GetMapping("/exportTotalListPracticeTimetableApi")
    @ApiOperation(value = "成绩册-获取课程成绩列表（工训，导出用）")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public List<Map<String,Object>> exportTotalListPracticeTimetableApi(@RequestParam(required = true) String courseNumber,@RequestParam(required = true) String product,
                                                                      @RequestParam(required = true) Integer page, @RequestParam(required = true) Integer limit){
        return transcriptService.exportTotalListPracticeTimetable(courseNumber,product,page,limit);
    }
    /**************************************************************************
     * Description 成绩册-获取工种成绩列表（导出用）
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @GetMapping("/exportListPracticeTimetableApi")
    @ApiOperation(value = "获取工种成绩列表，导出用")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public List<Map<String,Object>> exportListPracticeTimetableApi(@RequestParam(required = true) String courseNumber,@RequestParam(required = true) String product,
                                                                 @RequestParam(required = true) Integer workId,@RequestParam(required = true) Integer page,
                                                                 @RequestParam(required = true) Integer limit){
        return transcriptService.exportListPracticeTimetable(courseNumber,product,workId,page,limit);
    }
    /**************************************************************************
     * Description 成绩册-新增教学小组成绩数据
     *
     * @author 黄浩
     * @date 2019年4月26日
     **************************************************************************/
    @PostMapping("/saveExperienceRecord")
    @ApiOperation(value = "新增成绩数据")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo saveExperienceRecord(@RequestParam(required = true) Integer siteId,@RequestParam(required = true) Integer type, @RequestParam(required = true) Integer groupId,
                                             @RequestParam(required = true) String teacherPoints, @RequestParam(required = true) String judgesPoints,@RequestParam(required = false)String siteName,@RequestParam(required = false)String title){
        return transcriptService.saveExperienceRecord(siteId,type,groupId,teacherPoints,judgesPoints,siteName,title);
    }
    /**************************************************************************
     * Description 成绩册-批量设置学生小组（教学）
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @PostMapping("/groupStudentsApi")
    @ResponseBody
    @ApiOperation(value = "批量设置学生小组（教学）")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public boolean groupStudentsApi(@RequestBody List<UserVo> data){

        return transcriptService.groupStudents(data);
    }
    /**************************************************************************
     * Description 成绩册-更新组内排名（教学）
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @PostMapping("/updateGroupStudentRankingApi")
    @ResponseBody
    @ApiOperation(value = "更新组内排名（教学）")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public boolean updateGroupStudentRankingApi(@RequestBody List<UserVo> data){
        return transcriptService.updateGroupStudentRanking(data);
    }
    /**************************************************************************
     * Description 成绩册-删除小组成员（教学）
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @PostMapping("/deleteGroupStudentApi")
    @ResponseBody
    @ApiOperation(value = "删除小组成员（教学）")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public boolean deleteGroupStudentApi(@RequestBody List<UserVo> data){
        return transcriptService.deleteGroupStudent(data);
    }
    /**************************************************************************
     * Description 提交到成绩册（教学）
     *
     * @author 黄浩
     * @date 2020年3月30日
     **************************************************************************/
    @PostMapping("/submitTranscriptApi")
    @ResponseBody
    @ApiOperation(value = "提交到成绩册（教学）")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public boolean submitTranscriptApi(@RequestBody List<UserRecordVo> data){
        return transcriptService.submitTranscript(data);
    }
    /**************************************************************************
     * Description 课程维度下提交到成绩册（教学）
     *
     * @author 黄浩
     * @date 2020年3月30日
     **************************************************************************/
    @PostMapping("/submitTranscriptBySiteApi")
    @ResponseBody
    @ApiOperation(value = "提交到成绩册（教学）")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public boolean submitTranscriptBySiteApi(@RequestBody List<UserRecordVo> data){
        return transcriptService.submitTranscriptBySite(data);
    }
    /**************************************************************************
     * Description 提交到行为成绩成绩册（教学）
     *
     * @author 黄浩
     * @date 2020年3月30日
     **************************************************************************/
    @PostMapping("/submitBehaviorApi")
    @ResponseBody
    @ApiOperation(value = "提交到行为成绩成绩册（教学）")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public boolean submitBehaviorApi(@RequestBody List<TimetableOnlineTimeVO> data){
        return transcriptService.submitBehavior(data);
    }
//    /**************************************************************************
//     * Description 保存评分项，并计算权重（工训）
//     *
//     * @author 黄浩
//     * @date 2020年3月30日
//     **************************************************************************/
//    @PostMapping("/saveGradingItemApi")
//    @ResponseBody
//    @ApiOperation(value = "保存评分项，并计算权重（工训）")
//    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
//    public boolean saveGradingItemApi(@RequestBody PracticeWeightVo data){
//        //保存评分项
//        boolean result = transcriptService.saveGradingItem(data);
//        if (result){
//            //计算权重
//            transcriptService.calculateWeightByCorrect(data.getExperimentTitle());
//        }
//        return result;
//    }
//    /**************************************************************************
//     * Description 打分（工训）
//     *
//     * @author 黄浩
//     * @date 2020年8月17日
//     **************************************************************************/
//    @PostMapping("/markingPracticeGrading")
//    @ResponseBody
//    @ApiOperation(value = "打分（工训）")
//    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
//    public boolean markingPracticeGrading(@RequestBody List<ObjectWeightEnableVo> data){
//        //保存最后一级
//        boolean result = transcriptService.markingPracticeGrading(data);
//        if (result){
//            //计算前几级成绩
//            transcriptService.calculatePracticeGrading(data.get(0).getData()[0],data.get(0).getData()[1]);
//        }
//        return result;
//    }
    /**************************************************************************
     * Description 考核方式导出
     *
     * @author 黄浩
     * @date 2020年9月18日
     **************************************************************************/
    @GetMapping("/exportReportWeight")
    @ApiOperation(value = "考核方式导出")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public void exportReportWeight(HttpServletRequest request, HttpServletResponse response,Integer siteId) throws IOException {
        response.setContentType("multipart/form-data;charset=UTF-8");// 设置response内容的类型
        response.setHeader(
                "Content-disposition",
                "attachment;filename=" + URLEncoder.encode("考核方式.xls", "UTF-8"));// 设置头部信息
        ServletOutputStream outputStream = response.getOutputStream();
        byte[] bytes = transcriptService.exportReportWeightBySiteId(siteId);
        outputStream.write(bytes);
        outputStream.close();
    }
    /**************************************************************************
     * Description 教学大纲导出调用接口（考核方式导出）
     *
     * @author fubowen
     * @date 2020-12-22
     **************************************************************************/
    @PostMapping("/getGradeWeightTable")
    @ResponseBody
    public List<ReportWeightDto> getReportWeightBytes(Integer siteId){
        return transcriptService.getGradeWeightBySiteId(siteId);
    }
    /**************************************************************************
     * Description 成绩册-新增成绩数据
     *
     * @author 黄浩
     * @date 2019年4月26日
     **************************************************************************/
    @PostMapping("/saveExamRecord")
    @ApiOperation(value = "新增成绩数据")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public JsonReturnVo saveExamRecord(@RequestParam(required = false) String assignmentId,@RequestParam(required = true) Double points,
                                       @RequestParam(required = true) String username, @RequestParam(required = true) String cname,HttpServletRequest request){
//        CheckAuthorization checkAuthorization = AuthorizationUtil.checkAuthorization(request);
//        if (checkAuthorization.getCheckState().equals("success")){
        return transcriptService.saveExamRecord(assignmentId,username,cname,points);
//        }else {
//            return JsonReturnVo.errorJson("未通过jwt验证:"+checkAuthorization.getErrorCode());
//        }
    }
    /**************************************************************************
     * Description 成绩册-获取评分项数据并保存（工训）
     *
     * @author 黄浩
     * @date 2019年4月26日
     **************************************************************************/
    @PostMapping("/getIndicatorAndSave")
    @ApiOperation(value = "获取评分项数据并保存（工训）")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public boolean getIndicatorAndSave(@RequestParam String workUid,@RequestParam String timetableIds,@RequestParam String businessTimes){
        return transcriptService.getIndicatorAndSave(workUid,timetableIds,businessTimes,apiGateWayHost);
    }
    /**************************************************************************
     * Description 成绩册-获取评分项数据并保存（工训）
     *
     * @author 黄浩
     * @date 2019年4月26日
     **************************************************************************/
    @PostMapping("/saveIndicatorScore")
    @ApiOperation(value = "获取评分项数据并保存（工训）")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public boolean saveIndicatorScore(@RequestBody List<GradeIndicatorDTO> gradeIndicatorDTOList){
        return transcriptService.saveIndicatorScore(gradeIndicatorDTOList);
    }
    /**************************************************************************
     * Description 成绩册-获取学习行为额外成绩
     *
     * @author 黄浩
     * @date 2019年4月26日
     **************************************************************************/
    @PostMapping("/additionActionScore")
    @ApiOperation(value = "获取学习行为额外成绩")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public BigDecimal additionActionScore(@RequestParam String student, @RequestParam Integer siteId){
        return transcriptService.additionActionScore(student, siteId);
    }
    /**************************************************************************
     * Description 成绩册-配置中心流程打分报表数据
     *
     * @author 黄浩
     * @date 2019年4月26日
     **************************************************************************/
    @PostMapping("/configGradeDataApi")
    @ApiOperation(value = "配置中心流程打分报表数据")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public List<UserDTO> configGradeDataApi(@RequestBody GradeIndicatorDTO gradeIndicatorDTO){
        return transcriptService.configGradeData(gradeIndicatorDTO);
    }
    /**************************************************************************
     * Description 成绩册-获取打分教师
     *
     * @author 黄浩
     * @date 2019年4月26日
     **************************************************************************/
    @PostMapping("/configTeacherApi")
    @ApiOperation(value = "获取打分教师")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public List<UserDetailDto>configTeacherApi(@RequestBody GradeIndicatorDTO gradeIndicatorDTO){
        return transcriptService.getConfigTeacher(gradeIndicatorDTO);
    }
    /**************************************************************************
     * Description 教学系统管理-课程模板配置-修改隐藏或显示
     *
     * @author fubowen
     * @date 2021-03-01
     **************************************************************************/
    @PostMapping("/saveCourseTemplate")
    public ResultVo saveCourseTemplate(@RequestParam String title,@RequestParam Integer display){
        transcriptService.saveCourseTemplate(title,display);
        ResultVo resultVo = new ResultVo(1,"修改成功");
        return resultVo;
    }
    /**************************************************************************
     * Description 根据type获取权重列表
     *
     * @author fubowen
     * @date 2021-03-02
     **************************************************************************/
    @PostMapping("/findTWeightSettingListByTypeNew")
    public ResultVo findTWeightSettingListByTypeNew(@RequestParam String type){
        List<TWeightSettingVO> list = transcriptService.findTWeightSettingListByTypeNew(type);
        ResultVo resultVo = new ResultVo(1,"查询成功",list);
        return resultVo;
    }

    /**************************************************************************
     * Description 保存教学-系统管理-课程模板配置中跟成绩有关的项的显示隐藏到成绩册
     *
     * @author fubowen
     * @date 2021-03-15
     **************************************************************************/
    @PostMapping("/saveSystemWeightSetting")
    public Result saveSystemWeightSetting(@RequestBody List<TWeightSettingVO> list){
        transcriptService.saveSystemWeightSetting(list);
        Result result = Result.ok("success");
        return result;
    }
    /**************************************************************************
     * Description 删除工训成绩
     *
     * @author 黄浩
     * @date 2021年6月10日
     **************************************************************************/
    @PostMapping("/deleteTranscriptByCourseNumber")
    public void deleteTranscriptByCourseNumber(@RequestParam String courseNumber,@RequestParam(required = false)String product){
        transcriptService.deleteTranscriptByCourseNumber(courseNumber, product);
    }

    /**************************************************************************
     * Description 成绩册-复制工训评分项
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @PostMapping("/copyPracticeWeight")
    @ApiOperation(value = "保存权重")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public Result<String> copyPracticeWeight(@RequestParam String courseNumber,@RequestParam String ids) {
        return transcriptService.copyPracticeWeight(courseNumber, ids);
    }
    /**************************************************************************
     * Description 成绩册-查看分项成绩
     *
     * @author 黄浩
     * @date 2019年4月24日
     **************************************************************************/
    @PostMapping("/gradebookListApi")
    @ApiOperation(value = "查看分项成绩")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public List<TranscriptVo> gradebookListApi(@RequestParam(required = true) String module,@RequestParam(required = true) Integer siteId,
                                      @RequestParam(required = true) String type,@RequestParam(required = false) String assignmentSearch,
                                      @RequestParam(required = false) String userSearch) {
        List<TranscriptVo> transcriptVoList = transcriptService.findTGradeRecordsApi(module, type, siteId,assignmentSearch,userSearch);
        return transcriptVoList;
    }
}
