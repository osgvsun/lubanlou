package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.ExamQuestionpool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;


/****************************************************************************
 * Description 试卷库
 * 
 * @author lixueteng
 * @date 2017-12-01
 ****************************************************************************/
public interface ExamQuestionpoolJPA extends JpaRepository<ExamQuestionpool, Integer>,
        JpaSpecificationExecutor<ExamQuestionpool> {
	/****************************************************************************
	 * Description 试卷库---获取试卷库的总数量
	 *
	 * @author 张佳鸣
	 * @date 2017-12-21
	 ****************************************************************************/
	@Query("select count(e) from ExamQuestionpool e where e.status = 1")
	Integer findExamQuestionpoolTotalRecords();
	@Query("select count(e) from ExamQuestionpool e where e.category=?1 and e.status=1")
	Integer findExamQuestionpoolTotalRecordsBycategory(Integer type);
	@Query(value = "select * from exam_questionpool where id = ?1",nativeQuery = true)
	ExamQuestionpool findOne(Integer id);
}
