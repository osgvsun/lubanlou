package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.QuestionpoolCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 题库-题库类别
 * 
 * @author lixueteng
 * @date 2017-12-01
 ****************************************************************************/
public interface QuestionPoolCategoryJPA extends JpaRepository<QuestionpoolCategory, Integer>,
        JpaSpecificationExecutor<QuestionpoolCategory> {
	//查询所有
	@Query("select c from QuestionpoolCategory c")
	List<QuestionpoolCategory> findQuestionPoolCategory();
	@Query(value = "select * from questionpool_category where id = ?1",nativeQuery = true)
    QuestionpoolCategory findOne(Integer id);
}
