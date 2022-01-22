package net.gvsun.openapi.service;


import net.gvsun.common.Result;
import net.gvsun.dto.ReportWeightDto;
import net.gvsun.vo.*;
import net.gvsun.vo.practicetimetable.*;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface OpenApiTranscriptService {
	/**************************************************************************
	 * Description：创建成绩册
	 *
	 * @author：黄浩
	 * @date ：2019年4月26日
	 **************************************************************************/
	public Result createGradeBook(Integer siteId, String siteName, Integer assignmentId,
								  String assignmentTitle, String type, Double weight, String module,
								  Integer experimentId, String experimentTitle, String courseNumber,
								  String product, String termNumber, String termName, Integer isOpen);
	/*************************************************************************************
	 * Description:成绩册-批量增加学生
	 *
	 * @author： 黄浩
	 * @date：2019年10月22日
	 *************************************************************************************/
	public Result insertStudents(List<UserVo> data);
	/*************************************************************************************
	 * Description:提交到成绩册
	 *
	 * @author： 黄浩
	 * @date：2020年3月30日
	 *************************************************************************************/
	public Result submitTranscript(List<UserRecordVo> data);
	/**************************************************************************
	 * Description：新增成绩数据
	 *
	 * @author：黄浩
	 * @date ：2019年4月26日
	 **************************************************************************/
	public Result saveRecord(Integer siteId, Integer assignmentId, String username, String cname, Double points, String module, Integer experimentId, String courseNumber);
}
