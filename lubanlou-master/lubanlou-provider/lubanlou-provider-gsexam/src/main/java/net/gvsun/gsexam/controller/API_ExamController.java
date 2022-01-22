package net.gvsun.gsexam.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.gvsun.common.LayTableVO;
import net.gvsun.gsexam.dto.common.*;
import net.gvsun.gsexam.dto.exam.WkChapterDto;
import net.gvsun.gsexam.service.common.ShareService;
import net.gvsun.gsexam.service.exam.*;
import net.gvsun.gsexam.service.pool.TAssignmentExamQuestionpoolService;
import net.gvsun.gsexam.service.pool.TAssignmentQuestionPoolService;
import net.gvsun.gsexam.vo.exam.*;
import net.gvsun.gsexam.vo.layui.LayuiDataVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class API_ExamController {
    @Autowired
    private ExamListService examListService;
    @Autowired
    private TAssignmentService tAssignmentService;
    @Autowired
    private WkChapterService wkChapterService;
    @Autowired
    private ExamSubScribeService examSubScribeService;
    @Autowired
    private TAssignmentQuestionPoolService tAssignmentQuestionPoolService;
    @Autowired
    private TAssignmentExamQuestionpoolService tAssignmentExamQuestionpoolService;
    @Value("${projectName}")
    private String projectName;
    @Autowired
    private ExamDetailService examDetailService;
    @Autowired
    private ExamGradingService examGradingService;
    @Autowired
    private ShareService shareService;
    @Value("${pdfDirector}")
    private String pdfDirector;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHost;

    /**
     * 考试模块-查看补考名单
     * @param examId 考试id
     * @return
     */
    @RequestMapping("/viewMakeUpList")
    public List<TAssignmentGradingVO> viewMakeUpList(@RequestParam Integer examId,@RequestParam Integer siteId){
        return examListService.makeupExamStudentList(examId,siteId);
    }

    /**
     * 考试模块-查询学生列表
     * @param username 用户名
     * @param cname 中文名
     * @param currpage 当前页
     * @return
     */
    @RequestMapping("/queryStudentList")
    public List<UserVo> queryStudentList(String username,String cname,@RequestParam Integer currpage ){
        return examListService.findAllStudent(username, cname, currpage);
    }

    /**
     * 保存补考添加的学生
     * @param examId 考试id
     * @param usernames 需要添加的学生存入数组内
     */
    @RequestMapping("/saveStudentToExam")
    public void saveStudentToExam(@RequestParam Integer examId,@RequestParam String[] usernames){
        examListService.saveStudentToExam(examId, usernames);
    }

    /**
     * 获取所有课程信息
     * @return
     */
    @RequestMapping("/findAllTCourseSite")
    public LayTableVO<List<TCourseSiteVo>> findAllTCourseSite(@RequestParam Integer page,@RequestParam Integer limit, String search){
        return examListService.findAllTCourseSitePage(page, limit, search);
    }

    /**
     * 根据id查找考试试题构成情况页面Vo
     * @param assignmentId 考试id
     * @return
     */
    @RequestMapping("/findTAssCompVoList")
    public List<EditExamTAssignmentComponentVo> findTAssCompVoList(@RequestParam Integer assignmentId){
        return tAssignmentService.findTAssCompVoList(assignmentId);
    }

    /**
     * 获取章信息接口，指定课程和章类型
     * @param siteId 课程id
     * @param type  章类型
     * @return
     */
    @RequestMapping("/getWkChapters")
    public List<WkChapterDto> getWkChapters(@RequestParam Integer siteId,@RequestParam Integer type){
        return wkChapterService.findWkChaptersByTCourseSiteIdAndModuleType(siteId, type);
    }

    /**
     * 查找学院列表(有可以考试班级的学院)
     * @return
     */
    @RequestMapping("/findAllExamAcademys")
    public List<SchoolAcademyVo> findAllExamAcademys(){
        return wkChapterService.findAllExamAcademys();
    }

    /**
     * 获取可以补考的考试（所有已发布并过时的）
     * @param siteId
     * @return
     */
    @RequestMapping("/findMakeUpExamList")
    public List<ExamListVo> findMakeUpExamList(@RequestParam Integer siteId){
        return examListService.findMakeUpExamList(siteId);
    }

    /**
     * 获取预约考试列表
     * @param username
     * @return
     */
    @RequestMapping("/getSubScribeExamList")
    public List<ExamSubScribeVo> getSubScribeExamList(@RequestParam String username){
        return examSubScribeService.getSubScribeExamList(username);
    }

    /**
     * 获取题库信息
     * @param siteId
     * @return
     */
    @RequestMapping("/findQuestionForAddTest")
    public List<TAssignmentQuestpoolVo> findQuestionForAddTest(@RequestParam Integer siteId){
        return tAssignmentQuestionPoolService.findQuestionForAddTest(siteId, -1, 0);
    }

    /**
     * 查询所有的试卷库分类
     * @return
     */
    @RequestMapping("/findAllExamQuestpoolCategory")
    public List<QuestionpoolCategoryVo> findAllExamQuestpoolCategory(){
        return tAssignmentExamQuestionpoolService.findAllExamQuestpoolCategory();
    }

    /**
     * 获取所有试卷库
     * @return
     */
    @RequestMapping("/findAllExamQuestpool")
    public List<ExamQuestionpoolVo> findAllExamQuestpool(){
        return tAssignmentExamQuestionpoolService.findAllExamQuestpool();
    }

    /**
     * 考试模块-新增编辑考试-根据学院动态获取班级
     * @param schoolAcademy
     * @return
     */
    @RequestMapping("/findAllClasses")
    public List<SchoolClassesVo> findAllClasses(@RequestParam String schoolAcademy) {
        return wkChapterService.findAllClassesByAcademyNumber(schoolAcademy);
    }

    /**
     * 检查各个章中内容的标题是否重复
     * @param title
     * @param id
     * @param type
     * @param isChapter
     * @return
     */
    @RequestMapping("/checkAssignmentTitle")
    public String checkAssignmentTitle(@RequestParam String title, Integer id, Integer type, boolean isChapter) {
        return examSubScribeService.checkTitle(title, id, type, isChapter);
    }

    /**
     * 查找编辑考试内容
     * @param assignmentId
     * @return
     */
    @RequestMapping("/findEditTestVoById")
    public EditTestVo findEditTestVoById(@RequestParam Integer assignmentId){
        return tAssignmentService.findEditTestVoById(assignmentId, projectName);
    }

    /**
     * 根据课程id查询章信息
     * @param siteId
     * @return
     */
    @RequestMapping("/findWkChaptersByTCourseSiteId")
    public List<WkChapterDto> findWkChaptersByTCourseSiteId(@RequestParam Integer siteId){
        return wkChapterService.findWkChaptersByTCourseSiteId(siteId);
    }

    /**
     * 考试模块-修改编辑考试，根据试卷库分类查找试卷库
     * @param category
     * @return
     */
    @RequestMapping("/findExamQuestionpool")
    public List<ExamQuestionpoolVo> findExamQuestionpool(@RequestParam Integer category) {
        return tAssignmentExamQuestionpoolService.findExamQuestpoolWithcategory(category);
    }

    /**
     * 考试模块-删除考试/测试
     * @param tAssignmentId
     */
    @RequestMapping("/deleteExam")
    public void deleteExam(@RequestParam Integer tAssignmentId) {
        //删除考试文件夹wkFolder及相关的考试tAssignment数据
        tAssignmentService.deleteExam(tAssignmentId);
    }

    /**
     * 知识技能体验-ajax根据type获取章节
     * @param siteId
     * @param moduleType
     * @return
     */
    @RequestMapping("/editExam/findChapterMap")
    public Map<Integer, String> findChapterMap(@RequestParam Integer siteId, Integer moduleType) {
        return wkChapterService.findChapterMapByModuleTypeAndSiteId(siteId, moduleType);
    }

    /**
     * 知识技能体验-ajax根据type获取章节
     * @param chapterId
     * @return
     */
    @RequestMapping("/editExam/findLessonMap")
    public Map<Integer, String> findLessonMap(@RequestParam Integer chapterId) {
        return wkChapterService.findLessonMapByChapterId(chapterId);
    }

    /**
     * 根据题库id，题目类型来获取题库该类题目总数
     * @param questionpoolId
     * @param type
     * @return
     */
    @RequestMapping("/question/getItemCount")
    public Map<String, String> getItemCount(Integer questionpoolId, String type) {
        return tAssignmentQuestionPoolService.getItemCountStr(questionpoolId, type);
    }

    /**
     * 检查指定类型题目数量是否超出题库该类型题目数量
     * @param questionpoolId
     * @param quantity
     * @param type
     * @param gapsNumber
     * @return
     */
    @RequestMapping("/question/checkTestItemCount")
    public String checkTestItemCount(Integer questionpoolId, Integer quantity, String type, Integer gapsNumber) {
        return tAssignmentQuestionPoolService.checkTestItemCount(questionpoolId, quantity, Integer.parseInt(type), gapsNumber);
    }

    /**
     * 保存考试
     * @param editTestVo
     * @param username
     * @param siteId
     */
    @RequestMapping("/saveTest")
    public void saveTest(@RequestBody EditTestVo editTestVo,@RequestParam String username,@RequestParam Integer siteId){
        //保存考试方法
        Integer newTAssignmentId = tAssignmentService.saveTest(editTestVo, username, siteId, projectName);
        //根据考试创建成绩册
        tAssignmentService.createGradebook(siteId, newTAssignmentId, editTestVo.getTestChapterType(), editTestVo.getTestWkChapterId());
        //保存数据到考试班级关系表
        if ("0".equals(editTestVo.getIsMakeUpExam()) && !"*000".equals(editTestVo.getSchoolAcademy())) {
            tAssignmentService.saveTAssignmentClass(newTAssignmentId, editTestVo.getSchoolClass());
        }
    }

    /**
     * 考试模块-开始考试
     * @param examId
     * @param username
     * @return
     */
    @RequestMapping("/startExam")
    public Integer startExam(@RequestParam Integer examId,@RequestParam String username) {
        //创建考卷
        Integer examPaperId = examDetailService.createExamPaper(examId, username);
        // 将下面方法放到上面方法会导致报错，目前怀疑dubbo的问题，没有查出具体原因
        examPaperId = examDetailService.createRandomExam(examPaperId, examId, username);
        return examPaperId;
    }

    /**
     * 开始考试，获取考试题目数据
     * @param examId
     * @param username
     * @param page
     * @param pageSize
     * @return
     */
    @RequestMapping("/getExamDetail")
    public ExamDetailVo getExamDetail(@RequestParam Integer examId,@RequestParam String username,@RequestParam Integer page,@RequestParam Integer pageSize){
        return examDetailService.getExamDetail(examId, username, page, pageSize);
    }

    /**
     * 获取学生答题记录
     * @param examId
     * @param username
     * @return
     */
    @RequestMapping("/getStudentAnswerRecord")
    public List<Map> getStudentAnswerRecord(@RequestParam Integer examId,@RequestParam String username){
        Integer parentExamId = examDetailService.findParentExamByExamId(examId);
        return examGradingService.getTAssignmentItemMapping(parentExamId, username);
    }

    /**
     * 考试模块-保存考试记录
     * @param request
     * @param username
     * @param cid
     * @param assignmentId
     * @param submitTime
     * @param simulation
     * @return
     */
    @RequestMapping("/saveTAssignmentItemMapping")
    public String saveTAssignmentItemMapping(HttpServletRequest request,@RequestParam String username,@RequestParam Integer cid,@RequestParam Integer assignmentId,
                                             @RequestParam Integer submitTime,@RequestParam Integer simulation) {
        UserVo userVo = shareService.getUserByUsername(username);
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
        examDetailService.saveExam(totalScore, assignmentId, submitTime, simulation, cid, userVo, grading);
        long time4 = System.currentTimeMillis();

        System.out.println("examDetailService.insertTAssignmentGrading------>" + (time2 - time1));
        System.out.println("examDetailService.saveTAssignmentItemMapping------>" + (time3 - time2));
        System.out.println("examDetailService.saveExam------>" + (time4 - time3));

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

    /**
     * 查看已提交考试的成绩列表
     * @param cid
     * @param authorityName 当前登录人的权限名
     * @param username
     * @return
     */
    @RequestMapping("/findExamList")
    public List<ExamListVo> findExamList(@RequestParam Integer cid,@RequestParam String authorityName,@RequestParam String username){
        UserVo userVo = shareService.getUserByUsername(username);
        return examListService.findExamList(cid, userVo, authorityName, "exam",1);
    }

    /**
     * 考试模块-未参加考试列表
     * @param examId
     * @param currpage
     * @param pageSize
     * @param cid
     * @return
     */
    @RequestMapping("/findNotTakeExamList")
    public List<LayuiDataVo> findNotTakeExamList(@RequestParam Integer examId,@RequestParam Integer currpage,@RequestParam Integer pageSize,@RequestParam Integer cid){
        List<LayuiDataVo> notTakeExamList = examGradingService.findNotTakeExamList(examId, currpage,pageSize,null,cid);
        if (projectName.equals("proteach")) {
            Iterator<LayuiDataVo> it = notTakeExamList.iterator();
            while (it.hasNext()) {
                LayuiDataVo x = it.next();
                boolean fla = shareService.findTCourseSitesBySiteIdAndUsername(cid, x.getUsername());
                if (!fla) {
                    it.remove();
                }
            }
        }
        return notTakeExamList;
    }

    /**
     * 考试模块-考试结果
     * @param examId
     * @param username
     * @return
     */
    @RequestMapping("/getExamResult")
    public ExamResultVo getExamResult(@RequestParam Integer examId,@RequestParam String username){
        UserVo userVo = shareService.getUserByUsername(username);
        return examDetailService.getExamResult(examId, userVo);
    }

    /**
     * 开始考试，获取当前考试的学生成绩列表
     * @param examId
     * @param username
     * @param authorityName
     * @param currPage
     * @param pageSize
     * @return
     */
    @RequestMapping("/findExamGradingList")
    public LayTableVO findExamGradingList(@RequestParam Integer examId,@RequestParam String username,@RequestParam String authorityName,
                                          @RequestParam Integer currPage,@RequestParam Integer pageSize){
        List<LayuiDataVo> examGradingList = examGradingService.findExamGradingList(examId, authorityName, currPage,pageSize, projectName,null,username);
        int totalRecords = examGradingService.countExamGradingList(examId, username, authorityName,null);
        return LayTableVO.ok(examGradingList,(long)totalRecords);
    }
    /**
     *
     * @param response
     * @param examId
     * @throws IOException
     */
    @RequestMapping("/exportGradeList")
    public void exportGradeList(HttpServletResponse response, Integer examId) throws IOException {
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

    /**
     * 作业-保存成绩图片
     * @param imageString
     * @param gradingId
     * @param page
     * @return
     */
    @RequestMapping("/saveMarkingImage")
    public String saveMarkingImage(@RequestParam String imageString, Integer gradingId,
                                   Integer page) {
        return examDetailService.saveMarkingImage(pdfDirector, gradingId, page, imageString);
    }

    /**
     * 图片生成pdf
     * @param gradingId
     * @param siteId
     * @param username
     * @param page
     * @return
     * @throws Exception
     */
    @RequestMapping("/submitMarking")
    public String submitMarking(@RequestParam Integer gradingId, @RequestParam Integer siteId,@RequestParam String username, @RequestParam Integer page) throws Exception {
        UserVo userVo = shareService.getUserByUsername(username);
        String resourceFile = examDetailService.submitMarking(pdfDirector, gradingId, siteId, resourceContainerHost, userVo, page);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(resourceFile);
        return jsonNode.get("url").asText();
    }

    /**
     * 查看考试题目json
     * @param examId
     * @param username
     * @param currpage
     * @param pageSize
     * @return
     */
    @RequestMapping(value = "/apiTestDetails", produces = "application/json;charset=UTF-8")
    public List<ExamDetailsVO> apiTestDetails(@RequestParam Integer examId,@RequestParam String username,@RequestParam Integer currpage,@RequestParam Integer pageSize) {
        //由于目前不使用而写死成0;
        List<ExamDetailsVO> examDetailsVOList = examDetailService.findTestDetail(examId, username,0, currpage, pageSize,1,null);
        return examDetailsVOList;
    }

    /**
     * 查看学生答题详情json
     * @param examId
     * @param username
     * @return
     */
    @RequestMapping("/apiStudentTestDetails")
    public String apiStudentTestDetails(@RequestParam Integer examId,@RequestParam String username) {
        return examDetailService.findTestDetailMappingJson(examId, username);
    }

    /**
     * 根据题库动态获取填空题空的个数以及对应的题数
     * @param questionpoolId
     * @return
     */
    @RequestMapping("/findGapsNumberByQuestionpool")
    public List<GapsNumberVo> findGapsNumberByQuestionpool(@RequestParam Integer questionpoolId) {
        return wkChapterService.findGapsNumberByQuestionpool(questionpoolId);
    }

    /**
     * 查找学院列表
     * @return
     */
    @RequestMapping("/findAllAcademys")
    public List<SchoolAcademyVo> findAllAcademys(){
        return wkChapterService.findAllAcademys();
    }

    /**
     * 查找考试成员列表
     * @param username
     * @param currPage
     * @return
     */
    @RequestMapping("/findAllStudent")
    public LayTableVO findAllStudent(@RequestParam String username,@RequestParam Integer currPage){
        UserVo userVo = shareService.getUserByUsername(username);
        List<UserVo> studentList = examListService.findAllStudent(username, userVo.getCname(), currPage);
        Integer totalRecords = examListService.countStudentList(username, userVo.getCname());
        return LayTableVO.ok(studentList,(long)totalRecords);
    }

    /**
     * 获取证书信息
     * @return
     */
    @RequestMapping("/findSchoolByProjectName")
    public SchoolVo findSchoolByProjectName(){
        return examListService.findSchoolByProjectName(projectName);
    }

    /**
     * 证书设置--保存学校公章图片
     * @param fileid
     */
    @RequestMapping("/saveSchoolPhoto")
    public void saveSchoolPhoto(String fileid) {
        //获取证书信息
        SchoolVo schoolVo = examListService.findSchoolByProjectName(projectName);
        examListService.saveSchoolPhoto(schoolVo, fileid);
    }

    /**
     * 保存证书信息
     * @param schoolVo
     * @return
     */
    @RequestMapping("/saveCertificate")
    public void saveCertificate(@ModelAttribute SchoolVo schoolVo) {
        examListService.saveCertificate(schoolVo, projectName);
    }

    /**
     * 证书设置-图片删除
     */
    @RequestMapping("/deleteSchoolPhoto")
    public void deleteSchoolPhoto() {
        examListService.deleteSchoolImg(projectName);
    }

    /**
     * 站点列表
     * @return
     */
    @RequestMapping("/siteList")
    public List<TCourseSiteVo> siteList(String search) {
        return examListService.findAllSite(search);
    }

    /**
     * 学期列表
     * @return
     */
    @RequestMapping("/termList")
    public List<SchoolTermVO> termList() {
        return examListService.findAllSchoolTerm();
    }

    /**
     * 保存学期
     * @param schoolTermVO
     * @throws Exception
     */
    @RequestMapping("/saveTerm")
    public void saveTerm(SchoolTermVO schoolTermVO) throws Exception {
        examListService.saveSchoolTerm(schoolTermVO);
    }

    /**
     * 查询所有教师
     * @return
     */
    @RequestMapping("/findAllTeacherByAuthor")
    public List<UserVo> findAllTeacherByAuthor(){
        return examListService.findAllTeacherByAuthor();
    }

    /**
     * 保存站点
     * @param tCourseSiteVo
     */
    @RequestMapping("/saveSite")
    public void saveSite(TCourseSiteVo tCourseSiteVo) {
        examListService.saveTCourseSite(tCourseSiteVo);
    }

    /**
     * 通过id查找学期
     * @param termId
     * @return
     */
    @RequestMapping("/findSchoolTermById")
    public SchoolTermVO findSchoolTermById(@RequestParam Integer termId){
        return examListService.findSchoolTermById(termId);
    }

    /**
     * 通过id查找站点
     * @param siteId
     * @return
     */
    @RequestMapping("/findCourseSiteById")
    public TCourseSiteVo findCourseSiteById(@RequestParam Integer siteId){
        return examListService.findCourseSiteById(siteId);
    }

    /**
     * 判断考试能否删除，如果存在指向本考试的补考，则不能删除
     * @param assignmentId
     * @return
     */
    @RequestMapping("/examCanDelete")
    public Boolean examCanDelete(@RequestParam Integer assignmentId){
        return examListService.examCanDelete(assignmentId);
    }
}
