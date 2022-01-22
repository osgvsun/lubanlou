package net.gvsun.domain.respositiry;

import net.gvsun.domain.entity.TGradeRecord;
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
public interface TGradeRecordJPA extends JpaRepository<TGradeRecord, Integer>,
        JpaSpecificationExecutor<TGradeRecord> {
    @Query(value = "select tgr.* from t_grade_record as tgr where tgr.student_number=?1 and tgr.object_id=?2",nativeQuery=true)
    TGradeRecord findTGradeRecordByStudentNumberAndObjectId(String studentNumber,Integer objectId);
    @Query(value = "select tgr.* from t_grade_record as tgr inner join t_grade_object tgo on tgo.id = tgr.object_id where tgr.student_number=?1 and tgo.assignment_id=?2",nativeQuery=true)
    TGradeRecord findTGradeRecordByStudentNumberAndAssignmentId(String studentNumber,Integer assignmentId);
    @Query(value = "select * from t_grade_record where student_number=?1 and object_id=?2 and weight_id=?3",nativeQuery = true)
    TGradeRecord findByStudentNumberAndObjectIdAndWeightId(String username,Integer objectId,Integer weightId);
    @Query(value = "select tgr.* from t_grade_record tgr " +
            "inner join t_grade_object tgo on tgo.id = tgr.object_id " +
            "inner join t_weight_setting tws on tws.id = tgr.weight_id " +
            "where tgo.experiment_title = ?1 and tws.practice_id = ?2 and tgr.student_number =?3 and tgr.grade_by =?4 " +
            "and tws.create_date = ?5 and tws.modify_date = ?6",nativeQuery = true)
    TGradeRecord findPractice(String workUid,Integer practiceId,String username,String gradeBy,String start,String end);
}
