package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TAssignmentClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 教学系统-考试班级关系表—JPA通用数据操作
 * 
 * @author 洪春莹
 * @date 2018-12-11
 ****************************************************************************/
public interface TAssignmentClassJPA extends JpaRepository<TAssignmentClass, Integer>,
        JpaSpecificationExecutor<TAssignmentClass> {
	//根据考试id与班级编号查询记录
	@Query("select t from TAssignmentClass t where t.tAssignment.id=?1 and t.schoolClass.classNumber = ?2")
    TAssignmentClass findAssignmentClassByIdAndNumber(Integer tAssignmentId, String schoolClass);
	//根据考试id查询记录
	@Query("select t from TAssignmentClass t where t.tAssignment.id=?1")
	List<TAssignmentClass> findAssignmentClassById(Integer tAssignmentId);
	//根据考试id与学院编号查询记录
	@Query("select t from TAssignmentClass t where t.tAssignment.id=?1 and t.schoolAcademy.academyNumber = ?2")
    TAssignmentClass findAssignmentClassByIdAndAcademy(Integer tAssignmentId, String schoolAcademy);

}
