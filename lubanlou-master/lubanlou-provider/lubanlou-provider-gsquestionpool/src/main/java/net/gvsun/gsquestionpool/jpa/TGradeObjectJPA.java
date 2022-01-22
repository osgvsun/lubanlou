package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.TGradeObject;
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
public interface TGradeObjectJPA extends JpaRepository<TGradeObject, Integer>,
        JpaSpecificationExecutor<TGradeObject> {
	//查询测验对应成绩题目
	@Query("select c from TGradeObject c where c.TGradebook.id = ?1 and c.TAssignment.id = ?2")
	List<TGradeObject> findTGradeObjectByBookIdAndAid(Integer tGradeBookId, Integer tAssignmentId);
}
