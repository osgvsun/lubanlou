package net.gvsun.gswork.service;

import net.gvsun.common.Result;
import net.gvsun.gswork.vo.*;
import net.gvsun.gswork.vo.common.TopConfigVO;
import net.gvsun.gswork.vo.common.UserVo;
import net.gvsun.gswork.vo.group.*;

import java.text.ParseException;
import java.util.List;

/**
 * Created by REM on 2021/3/3.
 */
public interface WorkService {
    /**************************************************************************
     * Description 作业列表
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    List<TAssignmentVO> assignmentList(Integer cid, Integer chapterType, String type, Integer isGroup, Integer page, Integer limit, String search);
    /**************************************************************************
     * Description 作业列表数量
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    Integer assignmentListCount(Integer cid, Integer chapterType, String type, Integer isGroup, String search);
    /**************************************************************************
     * Description:保存作业
     *
     * @author：李雪腾
     * @date ：2018-2-05
     **************************************************************************/
    Integer saveAssignment(TAssignmentVO tAssignmentVO, Integer cid, String username);
    /**************************************************************************
     * Description:保存小组作业关系
     *
     * @author：黄浩
     * @date ：2018-2-05
     **************************************************************************/
    void saveAssignmentGroup(Integer assignmentId, List<String> usernameArr, Integer groupNum, Integer cid, Integer flag, List<String> groupTitles);
    /**************************************************************************
     * Description:保存小组作业中间表
     *
     * @author：fubowen
     * @date ：2021-8-6
     **************************************************************************/
    void saveGroupAssignment(Integer assignmentId, Integer categoryId, Integer[] groupIds);
    /**************************************************************************
     * Description:初始化小组成绩在成绩表
     *
     * @author：fubowen
     * @date ：2021-7-20
     **************************************************************************/
    void initGroupGrading(Integer assignmentId);
    /**************************************************************************
     * Description:获取未成作业小组的成员
     *
     * @author：黄浩
     * @date ：2018-2-05
     **************************************************************************/
    List<UserVo> notInGroupStudents(Integer cid, Integer assignmentId, String exitUsernames);
    /**************************************************************************
     * Description:作业修改截止时候后校准提交状态
     *
     * @author：黄浩
     * @date ：2020年3月30日
     **************************************************************************/
    void correctIslate(Integer assignmentId);
    /**************************************************************************
     * Description 作业截止功能，无需提交就可以打分方法
     *
     * @author：李雪腾
     * @date ：2018-3-14
     **************************************************************************/
    void gradeEnd(Integer cid, Integer assignmentId);
    /**************************************************************************
     * Description 根据作业的id获取作业的信息
     *
     * @author：李雪腾
     * @date ：2018-3-14
     **************************************************************************/
    TAssignmentVO getTAssignmentInfoByAssignmentId(Integer cid, Integer assignmentId);
    /**************************************************************************
     * Description  删除作业
     *
     * @author：李雪腾
     * @date ：2018-3-14
     **************************************************************************/
    void deleteAssignment(Integer assignmentId);
    /**************************************************************************
     * Description  提交作业列表
     *
     * @author：黄浩
     * @date ：2021年3月10日
     **************************************************************************/
    List<TAssignmentGradingVO> correctedByTeacherData(Integer assignmentId, Integer page, Integer limit, String search, String submitDate, Integer islate, Integer siteId);
    /**************************************************************************
     * Description  提交作业列表总数
     *
     * @author：黄浩
     * @date ：2021年3月10日
     **************************************************************************/
    Integer correctedByTeacherDataCount(Integer assignmentId, String search, String submitDate, Integer islate, Integer siteId);
    /**************************************************************************
     * Description：作业评语和作业的打分
     *
     * @author：李雪腾
     * @date ：2018-2-05
     **************************************************************************/
    Integer updateTAssignmentGrading(Integer gradingId, String content, Double finalScore, String username, Integer assignmentId);
    /**************************************************************************
     * Description：作业评语和作业的批量打分
     *
     * @author：黄浩
     * @date ：2021年3月11日
     **************************************************************************/
    List<Integer> batchCorrect(Integer assignmentId, String students, String content, Double finalScore, String username);
    /**************************************************************************
     * Description 学生作业列表
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    List<TAssignmentVO> studentAssignmentList(Integer cid, Integer chapterType, String type, Integer isGroup, String student, String islate, Integer page, Integer limit, String search);
    /**************************************************************************
     * Description 学生学生作业列表数量
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    Integer studentAssignmentListCount(Integer cid, Integer chapterType, String type, Integer isGroup, String student, String islate, String search);
    /**************************************************************************
     * Description：保存作业提交内容
     *
     * @author：黄浩
     * @date ：2021年3月22日
     **************************************************************************/
    Result<TAssignmentGradingVO> saveTAssignmentGrading(TAssignmentGradingVO tAssignmentGradingVO, String username);
    /**************************************************************************
     * Description 学生查看作业
     *
     * @author：黄浩
     * @date ：2021年3月23日
     **************************************************************************/
    List<TAssignmentGradingVO> gradingDetailByStudent(Integer assignmentId, String username);
    /**************************************************************************
     * Description 学生编辑提交作业
     *
     * @author：黄浩
     * @date ：2021年3月23日
     **************************************************************************/
    TAssignmentGradingVO gradingCommitByStudent(Integer assignmentId, String username);
    /**************************************************************************
     * Description 学生小组作业列表
     *
     * @author：黄浩
     * @date ：2021年3月23日
     **************************************************************************/
    List<TAssignmentVO> assignmentGroupList(Integer cid, Integer chapterType, String type, String student, Integer page, Integer limit, String search);
    /**************************************************************************
     * Description 学生小组作业列表数量
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    Integer assignmentGroupListCount(Integer cid, Integer chapterType, String type, String student, String search);
    /**************************************************************************
     * Description 获取小组分工
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    List<DistributionDTO> assignmentDistributionCount(Integer assignmentId, String student);
    /**************************************************************************
     * Description 小组提交作业
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    void commitGroupAssignment(TAssignmentGradingVO tAssignmentGradingVO, String student);
    /**
     * 判断作业是否已经分组
     */
    boolean isGroup(Integer assignmentId);
    /**************************************************************************
     * Description 学生小组查看作业
     *
     * @author：黄浩
     * @date ：2021年3月23日
     **************************************************************************/
    List<TAssignmentGradingVO> groupGradingDetailByStudent(Integer assignmentId, String student, Integer groupId);
    /**************************************************************************
     * Description 小组作业批改列表
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    List<GroupCorrectedVO> groupGradingList(Integer assignmentId, Integer islate, String userSearch, String submitDate, Integer page, Integer limit);
    /**************************************************************************
     * Description 小组作业批改列表数量
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    Integer groupGradingListCount(Integer assignmentId, Integer islate, String userSearch);
    /**************************************************************************
     * Description 获取小组成员
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    List<TAssignmentGradingVO> findGroupMemberGradingList(Integer groupId,Integer assignmentId);
    /**************************************************************************
     * Description 技能-实验资源-实验报告-保存pdf图片（优化）
     *
     * @author 黄浩
     * @date 2018年12月12日
     **************************************************************************/
    String saveMarkingImageNew(String pdfDirector, Integer gradingId, Integer page, String imageString, Boolean clean);
    /**************************************************************************
     * Description 在线批阅数据
     *
     * @author：黄浩
     * @date ：2021年3月23日
     **************************************************************************/
    TAssignmentGradingVO onlineMarkData(Integer gradingId);
    /**************************************************************************
     * Description：小组作业各学生的打分
     *
     * @author：黄浩
     * @date ：2021年3月11日
     **************************************************************************/
    List<Integer> batchCorrectStudent(List<TAssignmentGradingVO> gradingVOList, String username);
    /**************************************************************************
     * Description：返回修改
     *
     * @author：黄浩
     * @date ：2021年3月11日
     **************************************************************************/
    Result<String> sendBackCommit(Integer gradingId);
    /**************************************************************************
     * Description：获取模板配置
     *
     * @author：黄浩
     * @date ：2021年3月11日
     **************************************************************************/
    ConfigShowDTO getAssignmentConfig(String module, String type);
    /**************************************************************************
     * Description：保存模板配置
     *
     * @author：黄浩
     * @date ：2021年3月11日
     **************************************************************************/
    ConfigShowDTO saveAssignmentConfig(ConfigShowDTO configShowDTO);
    /**************************************************************************
     * Description:实验作业-保存重复作业
     * @throws ParseException
     *
     * @author：黄浩
     * @date ：2020年7月22日
     **************************************************************************/
    boolean saveRepateAssignment(TAssignmentVO tAssignmentVO, Integer siteId, String username);
    /**************************************************************************
     * Description：获取作业所有小组以及成员
     *
     * @author：黄浩
     * @date ：2021年3月11日
     **************************************************************************/
    List<GroupCorrectedVO> findAssignmentGroupMember(Integer assignmentId);
    /**************************************************************************
     * Description：创建作业成绩册
     *
     * @author：李雪腾
     * @date ：2018-2-05
     **************************************************************************/
    boolean createGradeBook(Integer cid, Integer assignmentId, String module);
    /**************************************************************************
     * Description：作业成绩计入成绩册
     *
     * @author：李雪腾
     * @date ：2018-2-05
     **************************************************************************/
    void saveGradebook(Integer cid, Integer gradingId);
    /**************************************************************************
     * Description：作业成绩批量计入成绩册
     *
     * @author：fubowen
     * @date ：2021-8-12
     **************************************************************************/
    void batchSaveGradebook(Integer cid, String[] usernames, Double finalScore, Integer assignmentId);
    /**************************************************************************
     * Description：获取课程下小组类别列表
     *
     * @author：fubowen
     * @date ：2021-8-5
     **************************************************************************/
    List<GroupCategoryVO> getGroupCategoryBySiteId(Integer siteId);
    /**************************************************************************
     * Description：获取小组类别下小组列表
     *
     * @author：fubowen
     * @date ：2021-8-5
     **************************************************************************/
    List<TCourseSiteGroupVO> getGroupByCategoryId(Integer categoryId);
    /**************************************************************************
     * Description：获取小组下用户分页
     *
     * @author：fubowen
     * @date ：2021-8-6
     **************************************************************************/
    List<UserVo> getGroupUsersPage(Integer groupId, Integer page, Integer pageSize);
    /**************************************************************************
     * Description：获取小组下用户数量
     *
     * @author：fubowen
     * @date ：2021-8-6
     **************************************************************************/
    Integer getGroupUsersSize(Integer groupId);
    /**************************************************************************
     * Description：保存小组类别
     *
     * @author：fubowen
     * @date ：2021-8-6
     **************************************************************************/
    void saveGroupCategory(Integer categoryId, Integer siteId, String name);
    /**************************************************************************
     * Description：保存小组
     *
     * @author：fubowen
     * @date ：2021-8-6
     **************************************************************************/
    void saveGroup(Integer groupId, Integer categoryId, String name, Integer siteId);
    /**************************************************************************
     * Description：保存小组成员
     *
     * @author：fubowen
     * @date ：2021-8-6
     **************************************************************************/
    void saveGroupUsers(String[] usernames, Integer groupId, Integer siteId);
    /**************************************************************************
     * Description：根据id删除小组
     *
     * @author：fubowen
     * @date ：2021-8-6
     **************************************************************************/
    void deleteGroupById(Integer groupId);
    /**************************************************************************
     * Description：根据id删除小组类别
     *
     * @author：fubowen
     * @date ：2021-8-6
     **************************************************************************/
    void deleteGroupCategoryById(Integer categoryId);
    /**************************************************************************
     * Description：获取全部班级成员
     *
     * @author：fubowen
     * @date ：2021-8-6
     **************************************************************************/
    List<UserVo> getSiteStudents(Integer siteId);
    /**************************************************************************
     * Description：普通作业批量评语
     *
     * @author：fubowen
     * @date ：2021-8-12
     **************************************************************************/
    void commonWorkBatchComment(String comments, Integer siteId, Integer assignmentId, String[] usernames);
    /**************************************************************************
     * Description：普通作业批量打分
     *
     * @author：fubowen
     * @date ：2021-8-12
     **************************************************************************/
    void commonWorkBatchScore(Double finalScore, Integer siteId, Integer assignmentId, String[] usernames);
    /**************************************************************************
     * Description：小组作业评语
     *
     * @author：fubowen
     * @date ：2021-8-12
     **************************************************************************/
    void groupWorkGroupComment(String comments, Integer siteId, Integer assignmentId, Integer groupId);
    /**************************************************************************
     * Description：小组作业打分
     *
     * @author：fubowen
     * @date ：2021-8-12
     **************************************************************************/
    void groupWorkGroupScore(Double finalScore, Integer siteId, Integer assignmentId, Integer groupId, String username);
    /**************************************************************************
     * Description：获取小组成员列表
     *
     * @author：fubowen
     * @date ：2021-8-12
     **************************************************************************/
    List<String> getGroupUserList(Integer groupId);
    /**************************************************************************
     * Description：小组成员评分评语
     *
     * @author：fubowen
     * @date ：2021-8-12
     **************************************************************************/
    void groupMemberCommentAndScore(List<GroupMemberVO> voList, Integer siteId, Integer assignmentId, Integer groupId, String username);
    /**************************************************************************
     * Description：小组成员评分评语列表页面
     *
     * @author：fubowen
     * @date ：2021-8-12
     **************************************************************************/
    List<GroupMemberVO> groupMemberDisplay(Integer assignmentId, Integer groupId);
    /**************************************************************************
     * Description：普通作业-获取学生最新提交
     *
     * @author：fubowen
     * @date ：2021-8-13
     **************************************************************************/
    WorkSubmitVO latestCommonWorkSubmitApi(Integer assignmentId, String username);
    /**************************************************************************
     * Description：小组作业-获取学生最新提交
     *
     * @author：fubowen
     * @date ：2021-8-13
     **************************************************************************/
    WorkSubmitVO latestGroupWorkSubmitApi(Integer assignmentId, Integer groupId);
    /**************************************************************************
     * Description：小组管理-列表展示页面
     *
     * @author：fubowen
     * @date ：2021-8-15
     **************************************************************************/
    List<GroupManageVO> getGroupManageList(Integer siteId);
    /**************************************************************************
     * Description：小组管理-添加小组用户时获取可以添加的用户列表（一个分组类别下，一个用户只能在一个小组）
     *
     * @author：fubowen
     * @date ：2021-8-15
     **************************************************************************/
    List<UserVo> getUserListGroupCanUse(Integer siteId,Integer categoryId);
    /**************************************************************************
     * Description：根据小组作业id和学生username获取学生是属于哪个组的
     *
     * @author：fubowen
     * @date ：2021-8-17
     **************************************************************************/
    Integer getGroupIdByCategoryIdAndStudent(Integer categoryId,String username);
    /**************************************************************************
     * Description：获取小组作业下全部小组
     *
     * @author：fubowen
     * @date ：2021-8-18
     **************************************************************************/
    List<GroupVO> getGroupsByAssignmentId(Integer assignmentId);
    /**************************************************************************
     * Description：获取作业顶部栏信息
     *
     * @author：fubowen
     * @date ：2021-8-20
     **************************************************************************/
    List<TopConfigVO> getWorkTopInfo(Integer siteId);
}
