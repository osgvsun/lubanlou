package net.gvsun.gswork.controller;

import net.gvsun.common.LayTableVO;
import net.gvsun.common.Result;
import net.gvsun.gswork.service.RedisService;
import net.gvsun.gswork.service.ToolService;
import net.gvsun.gswork.service.WorkService;
import net.gvsun.gswork.service.common.ShareService;
import net.gvsun.gswork.vo.*;
import net.gvsun.gswork.vo.common.*;
import net.gvsun.gswork.vo.group.*;
import net.gvsun.gswork.vo.section.SectionWeekVO;
import net.gvsun.resource.dto.ResourceFileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;


/**
 * Created by REM on 2019/2/25.
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class WorkApiController {
    @Value("${pdfDirector}")
    private String pdfDirector;
    @Autowired
    private ShareService shareService;
    @Autowired
    private WorkService workService;
    @Autowired
    private RedisService redisService;
    @Autowired
    private ToolService toolService;

    /**
     * 教师权限查看普通/小组作业列表数据
     * @param cid 课程id
     * @param chapterType 章类型
     * @param type 作业类型
     * @param isGroup 是否小组作业
     * @param page 当前页
     * @param limit 页面大小
     * @param search 搜索内容
     * @return 通用返回对象
     */
    @RequestMapping(value = "/teacherNormalHomeworkListApi")
    public CommonResult<List<TAssignmentVO>> teacherNormalHomeworkListApi(@RequestParam Integer cid,@RequestParam Integer chapterType,@RequestParam String type,@RequestParam Integer isGroup,@RequestParam Integer page,@RequestParam Integer limit, String search) {
        //数据
        List<TAssignmentVO> tAssignmentVOList = workService.assignmentList(cid, chapterType, type, isGroup, page, limit, search);
        //总数
        Integer totalRecords = workService.assignmentListCount(cid, chapterType, type, isGroup, search);
        return CommonResult.success(tAssignmentVOList, totalRecords);
    }

    /**
     * 课程章节数据
     * @param cid 课程id
     * @param moduleType 模块类型（知识、技能、体验）
     * @return 章vo的list
     */
    @RequestMapping(value = "/chapterListApi")
    public List<WkChapterVO> chapterListApi(@RequestParam Integer cid,@RequestParam Integer moduleType) {
        return shareService.chapterList(cid, moduleType);
    }

    /**
     * @description 小节数据
     * @param chapterId 章id
     * @return 小节vo的list
     */
    @RequestMapping(value = "/lessonListApi")
    public List<WkLessonVO> lessonListApi(@RequestParam Integer chapterId) {
        return shareService.lessonList(chapterId);
    }

    /**
     * @description 保存作业
     * @param cid 课程id
     * @param username  当前登陆用户名
     * @param tAssignmentVO 作业vo
     */
    @RequestMapping(value = "/saveAssignmentApi")
    @Transactional(rollbackFor = Exception.class)
    public void saveAssignmentApi(@RequestParam Integer cid,@RequestParam String username,@RequestBody TAssignmentVO tAssignmentVO) {
        String module = "";
        switch (tAssignmentVO.getCategory()){
            case 1:module = "knowledge";break;
            case 2:module = "skill";break;
            case 3:module = "experience";break;
            case 200:module = "skill";break;
            default:
        }
        //调用保存重复作业
        boolean repeat = workService.saveRepateAssignment(tAssignmentVO, cid, username);
        if (!repeat) {
            Integer assignmentId = workService.saveAssignment(tAssignmentVO, cid, username);
            //校准提交状态
            workService.correctIslate(assignmentId);
            //创建成绩册
            workService.createGradeBook(cid,assignmentId,module);
            if (tAssignmentVO.getType() == 1 && !workService.isGroup(assignmentId))//groupSource:0小组，1：自定义
            {
//                workService.saveAssignmentGroup(assignmentId, tAssignmentVO.getGroupUsernames(), tAssignmentVO.getGroupNum(), cid, tAssignmentVO.getGroupSource(),tAssignmentVO.getGroupTitle());
                //保存小组作业中间表
                workService.saveGroupAssignment(assignmentId,tAssignmentVO.getCategoryId(),tAssignmentVO.getGroupIds());
            }
        }
    }

    /**
     * 单个作业数据
     * @param assignmentId 作业id
     * @param cid 课程id
     * @return
     */
    @RequestMapping(value = "/assignmentApi")
    public TAssignmentVO assignmentApi(@RequestParam Integer assignmentId,@RequestParam Integer cid) {
        TAssignmentVO tAssignmentVO = workService.getTAssignmentInfoByAssignmentId(cid, assignmentId);
        return tAssignmentVO;
    }

    /**
     * 删除作业
     * @param assignmentId 作业id
     */
    @RequestMapping(value = "/deleteAssignmentApi")
    public void deleteAssignmentApi(@RequestParam Integer assignmentId) {
        workService.deleteAssignment(assignmentId);
    }

    /**
     * 作业提交列表数据（教师浏览）
     * @param assignmentId 作业id
     * @param page 当前页
     * @param limit 页面大小
     * @param search 搜索内容
     * @param submitDate 提交日期
     * @param islate 标志位 2：已提交 3：未提交 4：迟交 5：需重新提交
     * @param siteId 课程id
     * @return
     */
    @RequestMapping(value = "/correctedByTeacherData")
    public CommonResult<List<TAssignmentGradingVO>> correctedByTeacherData(@RequestParam Integer assignmentId,@RequestParam Integer page,@RequestParam Integer limit, String search, String submitDate, Integer islate,@RequestParam Integer siteId) {
        //数据
        List<TAssignmentGradingVO> tAssignmentGradingVOList = workService.correctedByTeacherData(assignmentId, page, limit, search, submitDate,islate,siteId);
        //总数
        Integer totalRecords = workService.correctedByTeacherDataCount(assignmentId, search, submitDate,islate,siteId);
        return CommonResult.success(tAssignmentGradingVOList, totalRecords);
    }


    /**
     * 普通作业单个/批量评语
     * @param comments
     * @param siteId
     * @param assignmentId
     * @param usernames
     */
    @RequestMapping("/commonWorkBatchComment")
    public void commonWorkBatchComment(@RequestParam String comments,@RequestParam Integer siteId,@RequestParam Integer assignmentId,@RequestParam String[] usernames){
        workService.commonWorkBatchComment(comments,siteId,assignmentId,usernames);
    }

    /**
     * 普通作业单个/批量打分
     * @param finalScore
     * @param siteId
     * @param assignmentId
     * @param usernames
     */
    @RequestMapping("/commonWorkBatchScore")
    @Transactional(rollbackFor = Exception.class)
    public void commonWorkBatchScore(@RequestParam Double finalScore,@RequestParam Integer siteId,@RequestParam Integer assignmentId,@RequestParam String[] usernames){
        //保存成绩到本地数据库
        workService.commonWorkBatchScore(finalScore,siteId,assignmentId,usernames);
        //批量保存成绩到成绩册
        workService.batchSaveGradebook(siteId,usernames,finalScore,assignmentId);
    }

    /**
     * 小组作业小组评语
     * @param comments
     * @param siteId
     * @param assignmentId
     * @param groupId
     */
    @RequestMapping("/groupWorkGroupComment")
    public void groupWorkGroupComment(@RequestParam String comments,@RequestParam Integer siteId,@RequestParam Integer assignmentId,@RequestParam Integer groupId){
        workService.groupWorkGroupComment(comments,siteId,assignmentId,groupId);
    }

    /**
     * 小组作业小组打分
     * @param finalScore
     * @param siteId
     * @param assignmentId
     * @param groupId
     * @param username
     */
    @RequestMapping("/groupWorkGroupScore")
    @Transactional(rollbackFor = Exception.class)
    public void groupWorkGroupScore(@RequestParam Double finalScore,@RequestParam Integer siteId,@RequestParam Integer assignmentId,@RequestParam Integer groupId,@RequestParam String username){
        //保存成绩到本地数据库
        workService.groupWorkGroupScore(finalScore,siteId,assignmentId,groupId,username);
        //批量保存成绩到成绩册
        //获取小组成员列表
        List<String> list = workService.getGroupUserList(groupId);
        String[] strings = list.toArray(new String[list.size()]);
        workService.batchSaveGradebook(siteId,strings,finalScore,assignmentId);
    }

    /**
     * 小组成员评分评语
     * @param voList
     * @param siteId
     * @param assignmentId
     * @param groupId
     * @param username
     */
    @RequestMapping("/groupMemberCommentAndScore")
    public void groupMemberCommentAndScore(@RequestBody List<GroupMemberVO> voList,@RequestParam Integer siteId, @RequestParam Integer assignmentId, @RequestParam Integer groupId, @RequestParam String username){
        workService.groupMemberCommentAndScore(voList,siteId,assignmentId,groupId,username);
    }

    /**
     * 小组成员评分评语展示页面
     * @param assignmentId
     * @param groupId
     * @return
     */
    @RequestMapping("/groupMemberDisplay")
    public List<GroupMemberVO> groupMemberDisplay(@RequestParam Integer assignmentId, @RequestParam Integer groupId){
        return workService.groupMemberDisplay(assignmentId,groupId);
    }

    /**
     * 学生权限查看普通作业列表数据
     * @param chapterType 章类型
     * @param type 作业类型
     * @param isGroup 是否小组作业
     * @param islate 学生是否迟交
     * @param page 当前页
     * @param limit 页面大小
     * @param search 搜索内容
     * @param cid 课程id
     * @param username 当前登录用户名
     * @return
     */
    @RequestMapping(value = "/studentNormalHomeworkListApi")
    public CommonResult<List<TAssignmentVO>> studentNormalHomeworkListApi(@RequestParam Integer chapterType,@RequestParam String type,@RequestParam Integer isGroup, String islate,@RequestParam Integer page,@RequestParam Integer limit,
                                                                          String search,@RequestParam Integer cid,@RequestParam String username) {
        //数据
        List<TAssignmentVO> tAssignmentVOList = workService.studentAssignmentList(cid, chapterType, type, isGroup, username, islate, page, limit, search);
        //总数
        Integer totalRecords = workService.studentAssignmentListCount(cid, chapterType, type, isGroup, username, islate, search);
        return CommonResult.success(tAssignmentVOList, totalRecords);
    }

    /**
     * 学生提交作业api
     * @param username 当前登录用户名
     * @param tAssignmentGradingVO 作业vo
     * @return
     */
    @RequestMapping(value = "/commitTAssignmentApi")
    public Result<TAssignmentGradingVO> commitTAssignmentApi(@RequestParam String username,@RequestBody TAssignmentGradingVO tAssignmentGradingVO) {
        //保存提交
        return workService.saveTAssignmentGrading(tAssignmentGradingVO, username);
    }

    /**
     * 学生查看提交作业api
     * @param assignmentId 作业id
     * @param username 当前登录用户名
     * @return
     */
    @RequestMapping(value = "/studentNormalHomeworkDetailApi")
    public List<TAssignmentGradingVO> studentNormalHomeworkDetailApi(@RequestParam Integer assignmentId,@RequestParam String username) {
        //保存提交
        return workService.gradingDetailByStudent(assignmentId, username);
    }

    /**
     * 获取普通作业学生最新的提交记录
     * @param assignmentId
     * @param username
     * @return
     */
    @RequestMapping(value = "/latestCommonWorkSubmitApi")
    public WorkSubmitVO latestCommonWorkSubmitApi(@RequestParam Integer assignmentId, @RequestParam String username) {
        return workService.latestCommonWorkSubmitApi(assignmentId,username);
    }

    /**
     * 获取小组作业整个小组的最新提交记录
     * @param assignmentId
     * @param groupId
     * @return
     */
    @RequestMapping(value = "/latestGroupWorkSubmitApi")
    public WorkSubmitVO latestGroupWorkSubmitApi(@RequestParam Integer assignmentId, @RequestParam Integer groupId) {
        return workService.latestGroupWorkSubmitApi(assignmentId,groupId);
    }

    /**
     * 学生权限查看小组作业列表数据
     * @param chapterType 章类型
     * @param type 作业类型
     * @param page 当前页
     * @param limit 页面大小
     * @param search 搜索内容
     * @param cid 课程id
     * @param username 当前登录用户名
     * @return
     */
    @RequestMapping(value = "/studentGroupAssignmentListApi")
    public CommonResult<List<TAssignmentVO>> studentGroupAssignmentListApi(@RequestParam Integer chapterType, @RequestParam String type, @RequestParam Integer page,
                                                                           @RequestParam Integer limit, String search,@RequestParam Integer cid,@RequestParam String username) {
        //数据
        List<TAssignmentVO> tAssignmentVOList = workService.assignmentGroupList(cid, chapterType, type, username, page, limit, search);
        //总数
        Integer totalRecords = workService.assignmentGroupListCount(cid, chapterType, type, username, search);
        return CommonResult.success(tAssignmentVOList, totalRecords);
    }

    /**
     * 小组提交作业页面数据api（查看也可用）
     * @param assignmentId
     * @param groupId
     * @param student
     * @return
     */
    @RequestMapping(value = "/studentSubmitTeamHomeworkApi")
    public List<TAssignmentGradingVO> studentSubmitTeamHomeworkApi(@RequestParam Integer assignmentId,@RequestParam Integer groupId,@RequestParam String student) {
        //submitTime:0：编辑保存的查看；1:查看提交后的数据；
        return workService.groupGradingDetailByStudent(assignmentId,student,groupId);
    }

    /**
     * 小组提交作业api
     * @param username 当前登录用户名
     * @param tAssignmentGradingVO 作业vo
     * @return
     */
    @RequestMapping(value = "/commitGroupAssignmentApi")
    public Result commitGroupAssignmentApi(@RequestParam String username,@RequestBody TAssignmentGradingVO tAssignmentGradingVO) {
        workService.commitGroupAssignment(tAssignmentGradingVO, username);
        return Result.ok(tAssignmentGradingVO);
    }

    /**
     * 教师批改小组作业列表api
     * @param assignmentId 作业id
     * @param islate 标志位 2：已提交 3：未提交 4：迟交 5：需重新提交
     * @param userSearch 搜索内容
     * @param submitDate 提交日期
     * @param page 当前页
     * @param limit 页面大小
     * @return
     */
    @RequestMapping(value = "/teacherteamCorrectListApi")
    public CommonResult<List<GroupCorrectedVO>> teacherteamCorrectListApi(@RequestParam Integer assignmentId, @RequestParam Integer islate,
                                                                          String userSearch, String submitDate,@RequestParam Integer page,@RequestParam Integer limit) {
        //数据
        List<GroupCorrectedVO> list = workService.groupGradingList(assignmentId, islate, userSearch, submitDate, page, limit);
        //总数
        Integer totalRecords = workService.groupGradingListCount(assignmentId, islate, userSearch);
        return CommonResult.success(list, totalRecords);
    }

//    /**
//     * 给小组成员打分与评语
//     * @param cid 课程id
//     * @param username 当前登陆用户名
//     * @param gradingVOList 成绩vo list
//     */
//    @RequestMapping(value = "/batchCorrectStudent")
//    public void batchCorrectStudent(@RequestParam Integer cid,@RequestParam String username,@RequestBody List<TAssignmentGradingVO> gradingVOList) {
//        //打分
//        workService.batchCorrectStudent(gradingVOList, username);
//        for(TAssignmentGradingVO tAssignmentGradingVO:gradingVOList){
//            workService.saveGradebook(cid,tAssignmentGradingVO.getGradingId());
//        }
//    }

    /**
     * 发回修改
     * @param gradingId 成绩id
     * @return
     */
    @RequestMapping(value = "/sendBackToCorrect")
    public Result<String> sendBackToCorrect(@RequestParam Integer gradingId) {
        return workService.sendBackCommit(gradingId);
    }

    /**
     * 作业-在线批阅数据
     * @param gradingId 成绩id
     * @return
     */
    @RequestMapping("/onlineMarkingDataApi")
    public TAssignmentGradingVO onlineMarkingDataApi(@RequestParam Integer gradingId) {
        return workService.onlineMarkData(gradingId);
    }

    /**
     * 作业-保存在线批阅图片
     * @return
     */
    @RequestMapping("/saveMarkingImageNew")
    public String saveMarkingImageNew(HttpServletRequest request) {
        String imageString = request.getParameter("imageString");
        String gradingId = request.getParameter("gradingId");
        String page = request.getParameter("page");
        String clean = request.getParameter("clean");
        String result = workService.saveMarkingImageNew(pdfDirector, Integer.parseInt(gradingId), Integer.parseInt(page), imageString, Boolean.valueOf(clean));
        return result;
    }

    /**
     * 获取模板配置信息
     * @param module module参数在（knowledge、skill、creative）中三选一，分别表示知识、技能、体验
     * @param type type参数在（assignment、report）中二选一，分别表示作业、报告
     * @return
     */
    @RequestMapping("/getConfigShowData")
    public ConfigShowDTO getConfigShowData(@RequestParam String module,@RequestParam String type) {
        return workService.getAssignmentConfig(module, type);
    }

    /**
     * 保存模板配置信息
     * @param configShowDTO 模板dto
     * @return
     */
    @RequestMapping("/saveConfigShowApi")
    public ConfigShowDTO saveConfigShowApi(@RequestBody ConfigShowDTO configShowDTO) {
        return workService.saveAssignmentConfig(configShowDTO);
    }

    /**
     * 批量下载实验项目文件打包
     * @param response
     * @param request
     * @param ids 资源容器id列表
     * @param assignmentId 作业id
     * @param cid 课程id
     */
    @RequestMapping(value = "/batchDownFileZip")
    public void batchDownFileZip(HttpServletResponse response, HttpServletRequest request,@RequestParam Long[] ids,
                                 @RequestParam Integer assignmentId,@RequestParam Integer cid) {
        System.out.println("进入下载方法");
        System.out.println("文件id参数为：");
        for (Long id : ids) {
            System.out.println(id);
        }
        //获取当前课程
        TAssignmentVO tAssignmentVO = workService.getTAssignmentInfoByAssignmentId(cid, assignmentId);
        List<ResourceFileDto> resourceFileDtos = shareService.getFilesByIds(ids);
        String skillName = "";
        int a = 0;
        try {
            // 响应头的设置
            response.reset();
            response.setCharacterEncoding("utf-8");
            response.setContentType("multipart/form-data");

            // 设置压缩包的名字
            // 解决不同浏览器压缩包名字含有中文时乱码的问题
            String downloadName = tAssignmentVO.getTitle() + ".zip";

            String agent = request.getHeader("USER-AGENT");
            try {
                if (agent.contains("MSIE") || agent.contains("Trident")) {
                    downloadName = java.net.URLEncoder.encode(downloadName, "UTF-8");
                } else {
                    downloadName = new String(downloadName.getBytes("UTF-8"), "ISO-8859-1");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            response.setHeader("Content-Disposition", "attachment;fileName=\"" + downloadName + "\"");

            // 设置压缩流：直接写入response，实现边压缩边下载
            ZipOutputStream zipos = null;
            try {
                zipos = new ZipOutputStream(new BufferedOutputStream(response.getOutputStream()));
                zipos.setMethod(ZipOutputStream.DEFLATED); // 设置压缩方法
            } catch (Exception e) {
                e.printStackTrace();
            }

//            创建zip输出流
            byte[] buffer = new byte[1024];
            int index = 1;
            Random r = new Random();
            for (ResourceFileDto resourceFileDto : resourceFileDtos) {
                //设置zip里面每个文件的名称

                zipos.putNextEntry(new ZipEntry(resourceFileDto.getCreateUser() + "_" +
                        resourceFileDto.getFileName()));
                //zipos.putNextEntry(new ZipEntry(resourceFileDto.getCreateUser() + "_" + "." + resourceFileDto
                // .getFileName().substring(resourceFileDto.getFileName().lastIndexOf(".") + 1)));

                //根据文件地址获取输入流
                InputStream is = new URL(resourceFileDto.getUrl()).openConnection().getInputStream();
                int length;
                while ((length = is.read(buffer)) > 0) {
                    zipos.write(buffer, 0, length);
                }
                is.close();
                index++;
            }
            //关流代码最好是写在finally{}代码块中,这里做测试就偷个懒
            zipos.closeEntry();
            zipos.close();
            zipos.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    /**
     * 获取某个课程模块显示信息接口
     * @param siteId 课程id
     * @return
     */
    @RequestMapping("/getSiteDisplayConfigApi")
    public Map<String,Object> getSiteDisplayConfigApi(@RequestParam Integer siteId){
        return redisService.getTranscriptConfigFromRedis(siteId);
    }

    /**
     * 获取模块别名信息接口
     * @return
     */
    @RequestMapping("/getNameConfigApi")
    public Map<String,Object> getNameConfigApi(){
        Map<String, Object> nameConfig = redisService.getNameConfigFromRedis();
        if(nameConfig==null){
            redisService.initCourseTemplateConfigToRedis();
        }
        return redisService.getNameConfigFromRedis();
    }

    /**
     * 获取所有课程信息
     * @return
     */
    @RequestMapping("/getAllCourseInfoApi")
    public LayTableVO<List<TCourseSiteVo>> getAllCourseInfoApi(@RequestParam Integer page, @RequestParam Integer limit, String search){
         return shareService.findAllTCourseSite(page, limit, search);
    }

    /**
     * 获取课程下所有实验项目
     * @param siteId 课程id
     * @return
     */
    @RequestMapping("/getAllExpProjectInSite")
    public List<ExperimentSkillVO> getAllExpProjectInSite(@RequestParam Integer siteId){
        return shareService.getAllExpProjectInSite(siteId);
    }

    /**
     * 获取章绑定实验项目
     * @param chapterId
     * @return
     */
    @RequestMapping("/getExpProjectByChapterId")
    public ExperimentSkillVO getExpProjectByChapterId(@RequestParam Integer chapterId){
        return shareService.getExpProjectByChapterId(chapterId);
    }

    /**
     * 新建课程-获取节次对应时间数据
     * @param cid 课程id
     * @param currWeek 当前周
     * @return
     */
    @RequestMapping("/getSectionWeek")
    public SectionWeekVO getSectionWeek(@RequestParam Integer cid,Integer currWeek){
        SectionWeekVO sectionWeekVO = new SectionWeekVO();
        if(currWeek==null){
            currWeek = shareService.getCurrWeek(cid);
        }
        sectionWeekVO.setCurrWeek(currWeek);
        sectionWeekVO.setWeekList(shareService.getWeekList(cid));
        sectionWeekVO.setTopInfo(shareService.getCourseTableTopInfo(cid,currWeek));
        sectionWeekVO.setDoubleClass(shareService.getCourseInfoNew(cid,currWeek));
        return sectionWeekVO;
    }

    /**
     * 根据课程id获取小组类别列表
     * @param siteId 课程id
     * @return
     */
    @RequestMapping("/getGroupCategoryBySiteId")
    public List<GroupCategoryVO> getGroupCategoryBySiteId(@RequestParam Integer siteId){
        return workService.getGroupCategoryBySiteId(siteId);
    }

    /**
     * 根据小组类别id获取小组列表
     * @param categoryId 小组类别id
     * @return
     */
    @RequestMapping("/getGroupByCategoryId")
    public List<TCourseSiteGroupVO> getGroupByCategoryId(@RequestParam Integer categoryId){
        return workService.getGroupByCategoryId(categoryId);
    }

    /**
     * 分页获取小组内成员名单
     * @param groupId 小组id
     * @param page 当前页
     * @param pageSize 页面大小
     * @return
     */
    @RequestMapping("/getUserListByGroupIdPage")
    public LayTableVO<List<UserVo>> getUserListByGroupIdPage(@RequestParam Integer groupId,@RequestParam Integer page,@RequestParam Integer pageSize){
        List<UserVo> list = workService.getGroupUsersPage(groupId, page, pageSize);
        Integer size = workService.getGroupUsersSize(groupId);
        return LayTableVO.ok(list,new Long(size));
    }

    /**
     * 保存小组类别
     * @param categoryId 小组类别id
     * @param siteId 课程id
     * @param name 类别名称
     */
    @RequestMapping("/saveGroupCategory")
    public void saveGroupCategory(Integer categoryId,@RequestParam Integer siteId,@RequestParam String name){
        workService.saveGroupCategory(categoryId,siteId,name);
    }

    /**
     * 保存小组
     * @param groupId 小组id
     * @param categoryId 小组类别id
     * @param name 小组名称
     */
    @RequestMapping("/saveGroup")
    public void saveGroup(Integer groupId,@RequestParam Integer categoryId,@RequestParam String name,@RequestParam Integer siteId){
        workService.saveGroup(groupId,categoryId,name,siteId);
    }

    /**
     * 保存小组用户
     * @param usernames 添加的用户名列表
     * @param groupId 小组id
     * @param siteId 课程id
     */
    @RequestMapping("/saveGroupUsers")
    public void saveGroupUsers(@RequestParam String[] usernames,@RequestParam Integer groupId,@RequestParam Integer siteId){
        workService.saveGroupUsers(usernames,groupId,siteId);
    }

    /**
     * 根据id删除小组
     * @param groupId 小组id
     */
    @RequestMapping("/deleteGroupById")
    public void deleteGroupById(@RequestParam Integer groupId){
        workService.deleteGroupById(groupId);
    }

    /**
     * 根据id删除小组类别
     * @param categoryId 小组类别id
     */
    @RequestMapping("/deleteGroupCategoryById")
    public void deleteGroupCategoryById(@RequestParam Integer categoryId){
        workService.deleteGroupCategoryById(categoryId);
    }

    /**
     * 获取课程下所有学生
     * @param siteId
     * @return
     */
    @RequestMapping("/getSiteStudents")
    public List<UserVo> getSiteStudents(@RequestParam Integer siteId){
        return workService.getSiteStudents(siteId);
    }

    /**
     * 获取小组管理列表
     * @param siteId
     * @return
     */
    @RequestMapping("/getGroupManageList")
    public List<GroupManageVO> getGroupManageList(@RequestParam Integer siteId){
        return workService.getGroupManageList(siteId);
    }

    /**
     * 小组管理-添加小组用户时获取可以添加的用户列表（一个分组类别下，一个用户只能在一个小组）
     * @param siteId
     * @param categoryId
     * @return
     */
    @RequestMapping("/getUserListGroupCanUse")
    public List<UserVo> getUserListGroupCanUse(@RequestParam Integer siteId,@RequestParam Integer categoryId){
        return workService.getUserListGroupCanUse(siteId,categoryId);
    }

    /**
     * 根据小组作业id和学生username获取学生是属于哪个组的
     * @param categoryId
     * @param student
     * @return
     */
    @RequestMapping("/getGroupIdByCategoryIdAndStudent")
    public Integer getGroupIdByCategoryIdAndStudent(@RequestParam Integer categoryId,@RequestParam String student){
        return workService.getGroupIdByCategoryIdAndStudent(categoryId,student);
    }

    /**
     * 获取小组作业下全部小组
     * @param assignmentId
     * @return
     */
    @RequestMapping("/getGroupsByAssignmentId")
    public List<GroupVO> getGroupsByAssignmentId(@RequestParam Integer assignmentId){
        return workService.getGroupsByAssignmentId(assignmentId);
    }

    /**
     * 获取作业顶部栏信息
     * @return
     */
    @RequestMapping("/getWorkTopInfo")
    public List<TopConfigVO> getWorkTopInfo(@RequestParam Integer siteId){
        return workService.getWorkTopInfo(siteId);
    }

    /**
     * 获取用户信息（发送短信邮件使用）
     * @param usernames 用户名列表
     * @return
     */
    @RequestMapping("/getUserListInfo")
    public List<UserInfoDTO> getUserListInfo(@RequestParam String usernames){
        return toolService.getUserListInfo(usernames);
    }

    /**
     * 给课程用户发送短信邮件
     * @param siteId
     * @param assignmentId
     * @param sender
     * @param receiver
     * @param content
     * @param topic
     * @param telephone
     * @param email
     */
    @RequestMapping("/sendMessage")
    public String sendMessage(@RequestParam Integer siteId,@RequestParam Integer assignmentId,@RequestParam String sender,
                            @RequestParam String receiver,@RequestParam String content,
                            @RequestParam String[] topic, String telephone,String email){
        toolService.sendMessage(siteId,assignmentId,sender,receiver,content,topic,telephone,email);
        return "ok";
    }
}
