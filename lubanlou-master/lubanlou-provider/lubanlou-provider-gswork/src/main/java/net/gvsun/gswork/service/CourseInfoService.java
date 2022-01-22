package net.gvsun.gswork.service;

import net.gvsun.gswork.vo.courseInfo.CourseTableTopDateInfoVO;
import net.gvsun.gswork.vo.courseInfo.DoubleClassCourseInfoVO;
import net.gvsun.gswork.vo.courseInfo.TimetableVirtualImageDTO;

import java.util.List;

/**
 * Created by Remli on 2021/4/30.
 */
public interface CourseInfoService {
    public Integer getCurrWeek(Integer cid);
    public List<CourseTableTopDateInfoVO> getCourseTableTopInfo(Integer cid, Integer weekId);
    public List<DoubleClassCourseInfoVO> getCourseInfoNew(Integer cid, Integer weekId);
    public List<TimetableVirtualImageDTO> getTodayVirtualImage(Integer cid, String apiGateWayHost)throws Exception;
    public List<Integer> getWeekLsit(Integer cid);
}
