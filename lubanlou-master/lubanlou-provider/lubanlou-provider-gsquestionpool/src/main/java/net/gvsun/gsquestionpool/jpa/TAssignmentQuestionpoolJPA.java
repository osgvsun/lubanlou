package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.TAssignmentItem;
import net.gvsun.gsquestionpool.domain.TAssignmentQuestionpool;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
public interface TAssignmentQuestionpoolJPA extends JpaRepository<TAssignmentQuestionpool, Integer>,
        JpaSpecificationExecutor<TAssignmentQuestionpool> {
	@Query(value = "select * from t_assignment_questionpool where questionpool_id = ?1",nativeQuery = true)
	TAssignmentQuestionpool findOne(Integer id);
	//通过id获取对应站点下的题库
	@Query("select t from TAssignmentQuestionpool t where t.QuestionpoolCategory.id=?1")
	List<TAssignmentQuestionpool>findQuestionPoolByCategoryId(Integer id);
	//通过id查询本题库的所有试题
	@Query("select c from TAssignmentItem c where c.id in (?1)")
	List<TAssignmentItem> findTAssignmentItemByIds(String ids);

	/****************************************************************************
	 * Description 题库---获取对应站点下的题库列表
	 *
	 * @author 李雪腾
	 * @param type 1 公共题库 2 站点题库
	 * @param isTest 试卷库还是题库 0 题库 1 试卷库
	 * @param pageable 分页信息
	 * @return 题库列表 and c.QuestionpoolCategory.id!=null
	 * @date 2017-12-1
	 ****************************************************************************/
	@Query("select c from TAssignmentQuestionpool c where c.type=?1 and c.isTest=?2 and c.QuestionpoolCategory.id!=null")
    Page<TAssignmentQuestionpool> findQuestionPool(Integer type, Integer isTest, Pageable pageable);
	@Query("select c from TAssignmentQuestionpool c where c.type=?1 and c.isTest=?2 and c.QuestionpoolCategory.id!=null and c.title like ?3")
    Page<TAssignmentQuestionpool> findQuestionPool1(Integer type, Integer isTest, Pageable pageable, String title);
	@Query("select c from TAssignmentQuestionpool c where c.type=?1 and c.isTest=?2 and c.QuestionpoolCategory.id!=null and c.user.username like ?3")
    Page<TAssignmentQuestionpool> findQuestionPool2(Integer type, Integer isTest, Pageable pageable, String username);
	@Query("select c from TAssignmentQuestionpool c where c.type=?1 and c.isTest=?2 and c.QuestionpoolCategory.id!=null and c.title like ?3 and c.user.username like ?4 ")
    Page<TAssignmentQuestionpool> findQuestionPool3(Integer type, Integer isTest, Pageable pageable, String title, String username);
	@Query("select c from TAssignmentQuestionpool c where c.type=?1 and c.isTest=?2 and c.QuestionpoolCategory.id!=null and c.title like ?3 and c.user.username like ?4 and c.QuestionpoolCategory.id=?5")
    Page<TAssignmentQuestionpool> findQuestionPool4(Integer type, Integer isTest, Pageable pageable, String title, String username, Integer category);
	@Query("select c from TAssignmentQuestionpool c where c.type=?1 and c.isTest=?2 and c.QuestionpoolCategory.id!=null and c.title like ?3 and c.QuestionpoolCategory.id=?4")
    Page<TAssignmentQuestionpool> findQuestionPool5(Integer type, Integer isTest, Pageable pageable, String title, Integer category);
	@Query("select c from TAssignmentQuestionpool c where c.type=?1 and c.isTest=?2 and c.QuestionpoolCategory.id!=null and c.user.username like ?3 and c.QuestionpoolCategory.id=?4")
    Page<TAssignmentQuestionpool> findQuestionPool6(Integer type, Integer isTest, Pageable pageable, String username, Integer category);
	@Query("select c from TAssignmentQuestionpool c where c.type=?1 and c.isTest=?2 and c.QuestionpoolCategory.id!=null and c.QuestionpoolCategory.id=?3")
    Page<TAssignmentQuestionpool> findQuestionPool7(Integer type, Integer isTest, Pageable pageable, Integer category);
	/****************************************************************************
	 * Description 题库---获取符合要求的题库的总的数量
	 *
	 * @author 李雪腾
	 * @param type 1 公共题库 2 站点题库
	 * @param isTest 试卷库还是题库 0 题库 1 试卷库
	 * @return 题库列表的数量
	 * @date 2017-12-1
	 ****************************************************************************/
	@Query("select count(c) from TAssignmentQuestionpool c where c.type=?1 and c.isTest=?2 and c.QuestionpoolCategory.id!=null")
	Integer findQuestionPoolTotalRecords(Integer type, Integer isTest);
	/****************************************************************************
	 * Description 题库---获取符合要求的题库的总的数量
	 *
	 * @author 李雪腾
	 * @param type 1 公共题库 2 站点题库
	 * @param isTest 试卷库还是题库 0 题库 1 试卷库
	 * @param categoryId 题库的种类的id
	 * @return 题库列表的数量
	 * @date 2017-12-1
	 ****************************************************************************/
	@Query("select count(c) from TAssignmentQuestionpool c where c.type=?1 and c.isTest=?2 and c.QuestionpoolCategory.id=?3 ")
	Integer findQuestionPoolTotalRecordsWithType(Integer type, Integer isTest, Integer categoryId);
	/****************************************************************************
	 * Description 题库---获取符合要求的题库的总的数量
	 *
	 * @author 李雪腾
	 * @param type 1 公共题库 2 站点题库
	 * @param isTest 试卷库还是题库 0 题库 1 试卷库
	 * @param categoryId 题库分类Id
	 * @return 左侧栏题库
	 * @date 2017-12-1
	 ****************************************************************************/
	@Query("select c from TAssignmentQuestionpool c where c.type=?1 and c.isTest=?2 and c.QuestionpoolCategory.id=?3")
	List<TAssignmentQuestionpool> findLeftQuestionPool(Integer type, Integer isTest, Integer categoryId);
	/****************************************************************************
	 * Description 题库---获取符合要求的题库的总的数量
	 *
	 * @author 李雪腾
	 * @param type 1 公共题库 2 站点题库
	 * @param isTest 试卷库还是题库 0 题库 1 试卷库
	 * @param categoryId 题库分类Id
	 * @return 左侧栏题库
	 * @date 2017-12-1
	 ****************************************************************************/
	@Query("select c from TAssignmentQuestionpool c where c.isTest=?1 and c.QuestionpoolCategory.id=?2")
	List<TAssignmentQuestionpool> findAllLeftQuestionPool(Integer isTest, Integer categoryId);

}
