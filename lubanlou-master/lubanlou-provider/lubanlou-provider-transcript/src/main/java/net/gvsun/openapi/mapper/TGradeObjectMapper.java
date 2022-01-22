package net.gvsun.openapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.gvsun.openapi.entity.TGradeObject;
import org.apache.ibatis.annotations.*;
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
public interface TGradeObjectMapper extends BaseMapper<TGradeObject> {
    @Select("select * from t_grade_object where grade_id = #{gradeId} and assignment_id = #{assignmentId}")
    List<TGradeObject> findTGradeObjectByBookIdAndAid(@Param("gradeId") Integer gradeId, @Param("assignmentId") String assignmentId);

    @Insert({"insert into t_grade_object(assignment_id,title,grade_id,type,released,marked,weight,module,experiment_id,experiment_title,is_open)" +
            " values(#{assignmentId},#{title},#{gradeId},#{type},#{released},#{marked},#{weight},#{module},#{experimentId},#{experimentTitle},#{isOpen})"})
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int add(TGradeObject tGradeObject);

    @Select("select tgo.* from t_grade_object as tgo inner join t_gradebook as tg on tgo.grade_id = tg.id where tg.site_id=#{siteId} and tgo.assignment_id=#{assignmentId} and tgo.module is not null")
    TGradeObject findTGradeObjectBySiteId(@Param("siteId")Integer siteId,@Param("assignmentId")String assignmentId);

    @Select( "select tgo.* from t_grade_object as tgo inner join t_gradebook as tg on tgo.grade_id = tg.id where tg.site_id=#{siteId} and tgo.experiment_id=#{experimentId} and tgo.module = 'skill' and tgo.type='report'")
    List<TGradeObject> findTGradeObjectBySiteIdAndExperimentId(@Param("siteId")Integer siteId,@Param("experimentId")Integer experimentId);

    @Select("select tgo.* from t_grade_object as tgo inner join t_gradebook as tg on tgo.grade_id = tg.id where tg.course_number=#{courseNumber} and tgo.assignment_id=#{assignmentId} and tgo.module is not null")
    TGradeObject findTGradeObjectByCourseNumber(@Param("courseNumber")String courseNumber,@Param("assignmentId")String assignmentId);
}
