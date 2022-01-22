package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TAssignmentSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 教学系统-题库主表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TAssignmentSectionJPA extends JpaRepository<TAssignmentSection, Integer>,
        JpaSpecificationExecutor<TAssignmentSection> {
	@Query("select c from TAssignmentSection  c where c.TAssignment.id=?1 ")
	List<TAssignmentSection> findSetionByTAssignmentId(Integer tAssignmentId);

}
