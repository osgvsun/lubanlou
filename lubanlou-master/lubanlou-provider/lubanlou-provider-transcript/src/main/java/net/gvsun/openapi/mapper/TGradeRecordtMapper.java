package net.gvsun.openapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.gvsun.openapi.entity.TGradeRecord;
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
public interface TGradeRecordtMapper extends BaseMapper<TGradeRecord> {
    @Select("select tgr.* from t_grade_record as tgr where tgr.student_number=#{studentNumber} and tgr.object_id=#{objectId}")
    TGradeRecord findTGradeRecordByStudentNumberAndObjectId(@Param("studentNumber")String studentNumber, @Param("objectId")Integer objectId);

    @Insert({"insert into t_grade_object(assignment_id,title,grade_id,type,released,marked,weight,module,experiment_id,experiment_title,is_open)" +
            " values(#{assignmentId},#{title},#{gradeId},#{type},#{released},#{marked},#{weight},#{module},#{experimentId},#{experimentTitle},${isOpen})"})
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int add(TGradeRecord tGradeObject);


}
