package net.gvsun.openapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.gvsun.openapi.entity.TTestGrading;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Description 字典表CDictionary的方法处理
 *
 * @author weicheng
 * @date 2020/6/28 15:12
 */
@Component
@Mapper
public interface TTestGradingMapper extends BaseMapper<TTestGrading> {
    @Select("select ttg.* from t_test_grading as ttg where ttg.student=#{student} and ttg.site_id=#{siteId}")
    TTestGrading findTTestGradingByStudentAndSAndSiteId(@Param("student")String student,@Param("siteId") Integer siteId);
    @Select("select ttg.* from t_test_grading as ttg where ttg.student=#{student} and ttg.course_number=#{courseNumber}")
    TTestGrading findTTestGradingByStudentAndSAndCourseNumber(@Param("student")String student,@Param("courseNumber")String courseNumber);
}
