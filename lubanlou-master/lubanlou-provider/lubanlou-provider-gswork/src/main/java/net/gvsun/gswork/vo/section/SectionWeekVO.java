package net.gvsun.gswork.vo.section;

import lombok.Data;
import net.gvsun.gswork.vo.courseInfo.CourseTableTopDateInfoVO;
import net.gvsun.gswork.vo.courseInfo.DoubleClassCourseInfoVO;

import java.util.List;

@Data
public class SectionWeekVO {
    private List<CourseTableTopDateInfoVO> topInfo;
    private List<Integer> weekList;
    private Integer currWeek;
    private List<DoubleClassCourseInfoVO> doubleClass;
}
