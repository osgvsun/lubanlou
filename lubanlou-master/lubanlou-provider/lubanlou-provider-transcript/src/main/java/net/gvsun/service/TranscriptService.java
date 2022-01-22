package net.gvsun.service;


import net.gvsun.common.Result;
import net.gvsun.dto.ReportWeightDto;
import net.gvsun.transcript.external.TGradeObjectVO;
import net.gvsun.usercenter.internal.UserDetailDto;
import net.gvsun.vo.*;
import net.gvsun.vo.practicetimetable.*;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface TranscriptService {
	/*************************************************************************************
	 * Description:成绩册-获取成绩
	 *
	 * @author： 魏诚
	 * @date：2018-08-08
	 *************************************************************************************/
	public TranscriptVo findTGradeRecords(String module, String type, Integer siteId , String currpage,String pageSize,String cname, String username,String courseNumber,String classesNumber);
	/*************************************************************************************
	 * Description:成绩册-获取成绩
	 *
	 * @author： 黄浩
	 * @date：2019年4月24日
	 *************************************************************************************/
	public List<Object[]> findTGradeRecordsForGvsunTeach(String module, String type, Integer siteId , String currpage,String pageSize,String cname, String username,String classesNumber);
	/*************************************************************************************
	 * Description:成绩册-更新最新总成绩
	 *
	 * @author： 黄浩
	 * @date：2019年4月25日
	 *************************************************************************************/
	public void synchronizeTTestGrading(int siteId);
	/*************************************************************************************
	 * Description:成绩册-更新最新额外成绩
	 *
	 * @author： 黄浩
	 * @date：2019年4月25日
	 *************************************************************************************/
	public void saveTTestGrading(String module,String type, int siteId, String student,float score);
	/*************************************************************************************
	 * Description:成绩册-获取成绩
	 *
	 * @author： 黄浩
	 * @date：2019年4月24日
	 *************************************************************************************/
	public TotalVo findTotalGradeBooks(Integer siteId ,String currpage,String pageSize, String username, String cname,String classesNumber);
	/**************************************************************************
	 * Description：同步成绩单中缺少的数据
	 *
	 * @author：fubowen
	 * @date ：2021-7-27
	 **************************************************************************/
	public void synchronizeTGradeObject(Integer siteId,String siteName,List<TGradeObjectVO> list);
	/**************************************************************************
	 * Description：创建成绩册
	 *
	 * @author：黄浩
	 * @date ：2019年4月26日
	 **************************************************************************/
	public boolean createGradeBook(Integer siteId,String siteName, String assignmentId,String assignmentTitle,String type,
								   Double weight,String module,Integer experimentId,String experimentTitle,
								   String courseNumber,String product,String termNumber,String termName,Integer isOpen);
	/**************************************************************************
	 * Description：新增成绩数据
	 *
	 * @author：黄浩
	 * @date ：2019年4月26日
	 **************************************************************************/
	public JsonReturnVo saveRecord(Integer siteId, String assignmentId, String username, String cname, Double points,String module,Integer experimentId,String courseNumber);
	/**************************************************************************
	 * Description：新增成绩数据
	 *
	 * @author：黄浩
	 * @date ：2019年4月26日
	 **************************************************************************/
	public Result batchSaveRecord(Integer siteId, String assignmentId, List<net.gvsun.transcript.external.UserVo> list);
	/****************************************************************************
	 * Description:设置成绩权重(t_grade_object表)
	 *
	 * @author：黄浩
	 * @date：2018-2-5
	 *****************************************************************************/
	public void singleWeightSetting(String weightStr, String idStr,String functionType);
	/**************************************************************************
	 * Description 通过type查询权重
	 *
	 * @author 马帅
	 * @date 2018年2月1日
	 * @param siteId 站点id
	 * @param type 需要查询的类型
	 * @return 权重List
	 **************************************************************************/
	public List<TWeightSettingVO> findTWeightSettingListByType(Integer siteId, String type);
	/**************************************************************************
	 * Description 查询成绩册VO
	 *
	 * @author 马帅
	 * @date 2018年1月31日
	 * @param siteId 站点id
	 * @param type 类型
	 * @return 成绩册VO
	 **************************************************************************/
	public List<TGradeObjectVO> findTGradeObjects(String module, String type, Integer siteId );
	/****************************************************************************
	 * Description:设置成绩权重(t_weight_setting表)
	 *
	 * @author：黄浩
	 * @date：2018-2-5
	 *****************************************************************************/
	public void weightSetting(String weightStr, String idStr,String functionType,String displayStr);
	/**************************************************************************
	 * Description 通过type查询权重
	 *
	 * @author 魏诚
	 * @date 2018年8月19日
	 **************************************************************************/
	public TotalWeightSettingVO findTWeightSetting(Integer siteId);
	/**************************************************************************
	 * Description 删除成绩册
	 *
	 * @author 黄浩
	 * @date 2019年5月14日
	 **************************************************************************/
	public void deleteTranscript(String assignment,String type,String module,Integer siteId);
	/****************************************************************************
	 * Description:设置实验项目权重
	 *
	 * @author：黄浩
	 * @date：2018-2-5
	 *****************************************************************************/
	public void experimentWeightSetting(String weightStr, String idStr, String functionType);
	/*************************************************************************************
	 * Description:成绩册-初始化总成绩
	 *
	 * @author： 黄浩
	 * @date：2019年4月25日
	 *************************************************************************************/
	public void initializeTTestGrading(Integer siteId, String student,String cname,Integer groupId,String groupTitle,String courseNumber,String classesNumber);
	/*************************************************************************************
	 * Description:成绩册-删除总成绩
	 *
	 * @author： 黄浩
	 * @date：2019年4月25日
	 *************************************************************************************/
	public void deleteTTestGrading(Integer siteId, String student);
	/*************************************************************************************
	 * Description:成绩册-批量删除总成绩
	 *
	 * @author： 黄浩
	 * @date：2019年4月25日
	 *************************************************************************************/
	public void deleteTTestGradings(Integer siteId, String student);
	/*************************************************************************************
	 * Description:成绩册-获取成绩
	 *
	 * @author： 魏诚
	 * @date：2018-08-08
	 *************************************************************************************/
	public TranscriptVo findTGradeRecordsPage(String module, String type, Integer siteId , String currpage,String pageSize,String cname, String username,String classesNumber);
	/*************************************************************************************
	 * Description:成绩册-修改某学生某个成绩册的成绩
	 *
	 * @author： 黄浩
	 * @date：2019年7月9日
	 *************************************************************************************/
	public boolean editTranscript(String student, Integer assignmentId,Double points);
	/**************************************************************************
	 * Description excel导入学生成绩
	 *
	 * @author 黄浩
	 * @date 2019年7月25日
	 * @param
	 **************************************************************************/
	public boolean importRecordByExcel(byte[] bytes, String fileName, Integer siteId, String assignmentId) throws ParseException;
	/*************************************************************************************
	 * Description:成绩册-修改实验项目状态值
	 *
	 * @author： 黄浩
	 * @date：2019年10月9日
	 *************************************************************************************/
	public JsonReturnVo editIsOpen(Integer experimentId,Integer flag);
	/*************************************************************************************
	 * Description:成绩册-保存权重
	 *
	 * @author： 黄浩
	 * @date：2019年10月9日
	 *************************************************************************************/
	public boolean saveTWeightSetting(String courseNumber,float weight,Integer id,String title);
	public Result<String> savePracticeWeight(String courseNumber, float weight, Integer id, String title);
	/*************************************************************************************
	 * Description:成绩册-保存权重
	 *
	 * @author： 黄浩
	 * @date：2019年10月9日
	 *************************************************************************************/
	public CourseWeightVo findTWeightSettingByCourseNumber(String courseNumber, String termUId, Integer page, Integer limit, String product);
	/*************************************************************************************
	 * Description:成绩册-删除权重
	 *
	 * @author： 黄浩
	 * @date：2019年10月9日
	 *************************************************************************************/
	public boolean deleteTWeightSetting(Integer id);
	/*************************************************************************************
	 * Description:成绩册-获取某一权重
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public TWeightSettingVO findWeightById(Integer id);
	/*************************************************************************************
	 * Description:成绩册-获取课程
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public CourseVo courseList(String termNumber, String courseNumber, String product, Integer page, Integer limit);
	/*************************************************************************************
	 * Description:成绩册-获取工种列表
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public CourseGradeObjectVo gradeObjectList(String termNumber, String courseNumber, String product, Integer page, Integer limit,String username);
	/*************************************************************************************
	 * Description:成绩册-获取评分项列表
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public List<TWeightSettingVO> getWeightByCourseNumber(String courseNumber);
	/*************************************************************************************
	 * Description:成绩册-获取工种使用评分项情况列表
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public TGradeObjectLayuiVo getTGradeObjectStatusByCourseNumber(String courseNumber);
	/*************************************************************************************
	 * Description:成绩册-权重状态值修改
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public boolean editWeightEnable(List<ObjectWeightEnableVo> data);
	/*************************************************************************************
	 * Description:成绩册-工种权重计算
	 *
	 * @author： 黄浩
	 * @date：2019年10月30日
	 *************************************************************************************/
	public boolean calculateWorkWeight(String courseNumber);
	/*************************************************************************************
	 * Description:成绩册-获取工种使用评分项情况列表
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public TGradeObjectLayuiVo scoreItemWeightList(String courseNumber);
	/*************************************************************************************
	 * Description:成绩册-获取工种成绩列表
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public TGradeObjectLayuiVo gradebookListPracticeTimetable(String courseNumber,String product,Integer workId,Integer page,Integer limit);
	/*************************************************************************************
	 * Description:成绩册-工训打分
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public boolean markingPracticeTimetable(List<ObjectWeightEnableVo> data);
	/*************************************************************************************
	 * Description:成绩册-获取课程成绩列表（工训）
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public TGradeObjectLayuiVo gradebookTotalListPracticeTimetable(String courseNumber,String product,Integer page,Integer limit);
	/*************************************************************************************
	 * Description:成绩册-批量增加学生（工训）
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public boolean insertStudents(List<UserVo> data);
	/*************************************************************************************
	 * Description:成绩册-获取只能打分的评分项列表
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public List<TWeightSettingVO> getWeightByWorkId(Integer workId);
	/*************************************************************************************
	 * Description:成绩册-复制课程工种权重
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public boolean copyCourseWeight(String sourceCourseNumber,String targetCourseNumber);
	/*************************************************************************************
	 * Description:成绩册-工种与用户的关系
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public boolean workUser(WorkUserVo workUserVo);
	/*************************************************************************************
	 * Description:成绩册-获取课程成绩列表（工训，导出用）
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public List<Map<String,Object>> exportTotalListPracticeTimetable(String courseNumber, String product, Integer page, Integer limit);
	/*************************************************************************************
	 * Description:成绩册-获取工种成绩列表（导出用）
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public List<Map<String,Object>> exportListPracticeTimetable(String courseNumber,String product,Integer workId,Integer page,Integer limit);
	/**************************************************************************
	 * Description：新增小组成绩数据
	 *
	 * @author：黄浩
	 * @date ：2019年4月26日
	 **************************************************************************/
	public JsonReturnVo saveExperienceRecord(Integer siteId, Integer type, Integer groupId, String teacherPoints, String judgesPoints,String siteName,String title);
	/*************************************************************************************
	 * Description:成绩册-批量设置学生小组（教学）
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public boolean groupStudents(List<UserVo> data);
	/*************************************************************************************
	 * Description:成绩册-更新组内排名（教学）
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public boolean updateGroupStudentRanking(List<UserVo> data);
	/*************************************************************************************
	 * Description:成绩册-删除小组成员（教学）
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public boolean deleteGroupStudent(List<UserVo> data);
	/*************************************************************************************
	 * Description:提交到成绩册
	 *
	 * @author： 黄浩
	 * @date：2020年3月30日
	 *************************************************************************************/
	public boolean submitTranscript(List<UserRecordVo> data);
	/*************************************************************************************
	 * Description:课程维度提交到成绩册
	 *
	 * @author： 黄浩
	 * @date：2020年3月30日
	 *************************************************************************************/
	public boolean submitTranscriptBySite(List<UserRecordVo> data);
	/*************************************************************************************
	 * Description:提交行为成绩到成绩册
	 *
	 * @author： 黄浩
	 * @date：2020年3月30日
	 *************************************************************************************/
	public boolean submitBehavior(List<TimetableOnlineTimeVO> data);
	/*************************************************************************************
	 * Description:保存评分项
	 *
	 * @author： 黄浩
	 * @date：2020年8月14日
	 *************************************************************************************/
//	public boolean saveGradingItem(PracticeWeightVo practiceWeightVo);
	/*************************************************************************************
	 * Description:根据标准分计算评分项权重（工训）
	 *
	 * @author： 黄浩
	 * @date：2020年8月14日
	 *************************************************************************************/
	public void calculateWeightByCorrect(String experimentTitle);
	/*************************************************************************************
	 * Description:获取数据
	 *
	 * @author： 黄浩
	 * @date：2020年8月14日
	 *************************************************************************************/
	public List<PracticeWeightShowVo> practiceWeightLevel(String experimentTitle,String student,Integer parentId);
	/*************************************************************************************
	 * Description:成绩册-工训打分
	 *
	 * @author： 黄浩
	 * @date：2020年8月17日
	 *************************************************************************************/
	public boolean markingPracticeGrading(List<ObjectWeightEnableVo> data);
	/*************************************************************************************
	 * Description:成绩册-往上级计算成绩（工训）
	 *
	 * @author： 黄浩
	 * @date：2020年8月17日
	 *************************************************************************************/
	public boolean calculatePracticeGrading(String experimentTitle,String student);
	/**************************************************************************
	 * Description: 考核方式导出
	 *
	 * @author:黄浩
	 * @date:2020年9月18日
	 **************************************************************************/
	public byte[] exportReportWeightBySiteId(Integer siteId);
	/**************************************************************************
	 * Description: 获取成绩权重表格对象
	 *
	 * @author:fubowen
	 * @date:2020-12-23
	 **************************************************************************/
	public List<ReportWeightDto> getGradeWeightBySiteId(Integer siteId);
	/**************************************************************************
	 * Description：新增成绩数据
	 *
	 * @author：黄浩
	 * @date ：2019年4月26日
	 **************************************************************************/
	public JsonReturnVo saveExamRecord(String assignmentId, String username, String cname, Double points);
	/**************************************************************************
	 * Description：获取评分项数据并保存
	 *
	 * @author：黄浩
	 * @date ：2020年10月28日
	 **************************************************************************/
	public boolean getIndicatorAndSave(String workUid,String timetableId,String businessTime,String apiGateWayHost);
	/**************************************************************************
	 * Description：保存分级评分项打分
	 *
	 * @author：黄浩
	 * @date ：2020年10月28日
	 **************************************************************************/
	public boolean saveIndicatorScore(List<GradeIndicatorDTO> gradeIndicatorDTOList);
	/****************************************************************************
	 * Description:获取学习行为额外成绩
	 *
	 * @author：黄浩
	 * @date：2021年1月29日
	 *****************************************************************************/
	public BigDecimal additionActionScore(String username, Integer siteId);
	/****************************************************************************
	 * Description:获取流程成绩报表数据
	 *
	 * @author：黄浩
	 * @date：2021年1月29日
	 *****************************************************************************/
	public List<UserDTO> configGradeData(GradeIndicatorDTO gradeIndicatorDTO);
	/****************************************************************************
	 * Description:获取打分教师
	 *
	 * @author：黄浩
	 * @date：2021年1月29日
	 *****************************************************************************/
	public List<UserDetailDto> getConfigTeacher(GradeIndicatorDTO gradeIndicatorDTO);
	/****************************************************************************
	 * Description:保存权重（教学系统管理-课程模板配置修改显示及隐藏）
	 *
	 * @author：fubowen
	 * @date：2021-3-1
	 *****************************************************************************/
	public void saveCourseTemplate(String title,Integer display);
	/****************************************************************************
	 * Description:通过type查询权重
	 *
	 * @author：fubowen
	 * @date：2021-3-2
	 *****************************************************************************/
	public List<TWeightSettingVO> findTWeightSettingListByTypeNew(String type);
	/****************************************************************************
	 * Description:保存教学系统配置到权重表
	 *
	 * @author：fubowen
	 * @date：2021-3-15
	 *****************************************************************************/
	public void saveSystemWeightSetting(List<TWeightSettingVO> list);

	public void deleteTranscriptByCourseNumber(String courseNumber,String product);

	public Result<String> copyPracticeWeight(String courseNumber, String ids);

	List<TranscriptVo> findTGradeRecordsApi(String module, String type, Integer siteId,String assignmentSearch, String userSearch);
}
