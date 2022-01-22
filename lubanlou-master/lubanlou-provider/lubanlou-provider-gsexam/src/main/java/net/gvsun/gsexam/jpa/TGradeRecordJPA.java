package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TGradeRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/****************************************************************************
 * Description 教学系统-成绩册相关具体成绩记录—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TGradeRecordJPA extends JpaRepository<TGradeRecord, Integer>,
        JpaSpecificationExecutor<TGradeRecord> {
	//查询测验对应成绩记录
	@Query("select c from TGradeRecord c where c.TGradeObject.id = ?1 and c.user.username = ?2")
	List<TGradeRecord> findTGradeRecordByObjectIdAndUsername(Integer gradeObjectId, String username);

}
