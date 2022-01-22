package net.gvsun.domain.respositiry;

import net.gvsun.domain.entity.TWeightSetting;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/****************************************************************************
 * Description 教学系统-成绩册中的考试名称或作业名称—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TWeightSettingJPA extends JpaRepository<TWeightSetting, Integer>,
        JpaSpecificationExecutor<TWeightSetting> {
    @Query("select t from TWeightSetting t where  t.siteId=?1")
    List<TWeightSetting> findTWeightSettingsBySiteId(Integer siteId);
    @Query(value = "select * from t_weight_setting where  id=?1",nativeQuery = true)
    TWeightSetting findOne(Integer id);
    @Query(value = "select count(*) from t_weight_setting tws inner join t_gradebook tg on tws.course_number=tg.course_number where tg.product=?1",nativeQuery = true)
    Integer countTotleWeight(String product);
    @Query(value = "select * from t_weight_setting where course_number = ?1 order by id",nativeQuery = true)
    List<TWeightSetting> findTWeightSettingByCourseNumber(String courseNumber);
    @Query(value = "select tws.* from t_weight_setting tws " +
            "inner join object_weight ow on tws.id = ow.weight_id " +
            "inner join t_grade_object tgo on tgo.id = ow.object_id " +
            "where tgo.id = ?1 group by tws.id order by tws.id" ,nativeQuery = true)
    List<TWeightSetting> findTWeightSettingByObjectId(Integer objectId);
    @Query(value = "select GROUP_CONCAT(id) from t_weight_setting where course_number = ?1",nativeQuery = true)
    String findTWeightSettingIdByCourseNumber(String courseNumber);
    @Query(value = "select tws.* from t_weight_setting tws " +
            "inner join object_weight ow on tws.id = ow.weight_id " +
            "inner join t_grade_object tgo on ow.object_id = tgo.id " +
            "where tws.course_number = ?1 and tgo.id = ?2 order by tws.id",nativeQuery = true)
    List<TWeightSetting> findMarkWeight(String courseNumber,Integer workId);
    @Query(value = "select * from t_weight_setting where site_id=?1 and type=?2",nativeQuery = true)
    TWeightSetting findTWeightSettingBySiteIdAndType(Integer siteId,String type);
    @Query(value = "select * from t_weight_setting where practice_id=?1 and create_date is null" ,nativeQuery = true)
    TWeightSetting findTWeightSettingByPracticeId(Integer practiceId);
    @Query(value = "select tws.* from t_weight_setting tws " +
            "left join object_weight ow on tws.id=ow.weight_id " +
            "left join t_grade_object tgo on tgo.id=ow.object_id " +
            "where tgo.experiment_title=?1 and tws.`level` =  ?2",nativeQuery = true)
    List<TWeightSetting> practiceWeightShow(String experimentTitle,Integer level);
    @Query(value = "select * from t_weight_setting where practice_id=?1 and create_date = ?2 and modify_date = ?3" ,nativeQuery = true)
    TWeightSetting findTWeightSettingByPracticeIdDate(Integer practiceId,String start,String end);
    @Query(value = "select * from t_weight_setting where type=?1",nativeQuery = true)
    List<TWeightSetting> findTWeightSettingsByType(String type);
    @Query(value = "select * from t_weight_setting where id in (:idList)",nativeQuery = true)
    List<TWeightSetting> findByIds(@Param("idList")List<Integer> idList);
}
