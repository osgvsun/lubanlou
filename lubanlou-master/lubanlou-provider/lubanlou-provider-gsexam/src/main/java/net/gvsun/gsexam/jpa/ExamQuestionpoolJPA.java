package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.ExamQuestionpool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


/****************************************************************************
 * Description 试卷库
 * 
 * @author lixueteng
 * @date 2017-12-01
 ****************************************************************************/
public interface ExamQuestionpoolJPA extends JpaRepository<ExamQuestionpool, Integer>,
        JpaSpecificationExecutor<ExamQuestionpool> {
	@Query(value = "select * from exam_questionpool where id = ?1",nativeQuery = true)
    ExamQuestionpool findOne(Integer id);
	/****************************************************************************
	 * Description 试卷库---获取试卷库的总数量
	 *
	 * @author 张佳鸣
	 * @date 2017-12-21
	 ****************************************************************************/
	@Query("select count(e) from ExamQuestionpool e where e.status = 1")
	Integer findExamQuestionpoolTotalRecords();

	/****************************************************************************
	 * Description 试卷库---获取所有的试卷库
	 *
	 * @author 张佳鸣
	 * @date 2018-01-08
	 ****************************************************************************/
	@Query("select e from ExamQuestionpool e where e.status = 1")
	List<ExamQuestionpool> findAllExamQuestionpool();

	/****************************************************************************
	 * Description 试卷库---根据试卷库类型获取试卷库
	 *
	 * @author 张佳鸣
	 * @date 2018-01-09
	 ****************************************************************************/
	@Query("select e from ExamQuestionpool e where e.status = 1 and e.category = ?1")
	List<ExamQuestionpool> findExamQuestionpoolWithcategory(@Param("category") Integer category);
}
