package net.gvsun.openapi.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.gvsun.openapi.entity.TGradebook;
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
public interface TGradeBookMapper extends BaseMapper<TGradebook> {
    @Select("select * from t_gradebook where site_id = #{siteId}")
    List<TGradebook> findTGradebookInSite(Integer siteId);
    @Select("select * from t_gradebook where course_number = #{courseNumber}")
    List<TGradebook> findTGradebookInCourseNumber(String courseNumber);
    @Insert({"insert into t_gradebook(site_id,title,course_number,term_number,term_name,product) values(#{siteId},#{title},#{courseNumber},#{termNumber},#{termName},#{product})"})
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int add(TGradebook tGradebook);
}
