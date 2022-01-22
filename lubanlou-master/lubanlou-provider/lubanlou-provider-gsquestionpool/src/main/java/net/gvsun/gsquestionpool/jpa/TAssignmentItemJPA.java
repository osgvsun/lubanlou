package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.TAssignmentAnswer;
import net.gvsun.gsquestionpool.domain.TAssignmentItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


/****************************************************************************
 * Description 教学系统-作业或测试题题目表—JPA通用数据操作
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TAssignmentItemJPA extends PagingAndSortingRepository<TAssignmentItem, Integer> {
	@Query(value = "select * from t_assignment_item where id = ?1",nativeQuery = true)
	TAssignmentItem findOne(Integer id);
	/**
	 * 获取试题的数量
	 * @param siteId
	 * @return
	 */
	@Query("select count(i) from TAssignmentItem i where i.TAssignmentSection.TAssignment.id = ?1 order by i.TAssignmentSection.id,i.id asc")
	int countTAssignmentItem(Integer examId);



 /**************************************************************************
  * Description 分页查询试题
  *
  * @author：李雪腾
  * @date ：2017-09-17
  **************************************************************************/
 	@Query("select i from TAssignmentItem i where i.TAssignmentSection.TAssignment.id =?1 order by i.TAssignmentSection.id,i.id asc ")
    Page<TAssignmentItem> findTAssignmentItemByExamId(Integer examId, Pageable pageable);
	/**************************************************************************
	 * Description 根据小题的id查询所有的小题
	 *
	 * @author：李雪腾
	 * @date ：2017-09-17
	 **************************************************************************/
	@Query("select i from TAssignmentItem i where i.id in ?1")
    Page<TAssignmentItem> findItemWithItemIds(int[] ids, Pageable pageable);
	/**************************************************************************
	 * Description 根据小题的id查询所有的小题的总数
	 *
	 * @author：李雪腾
	 * @date ：2017-09-17
	 **************************************************************************/
	@Query("select count(i) from TAssignmentItem i where i.id in ?1")
	int findItemWithItemIdsCount(int[] ids);

	/**************************************************************************
	 * Description 根据试题的id获取试题
	 *
	 * @author：李雪腾
	 * @date ：2017-09-17
	 **************************************************************************/
	@Query("select i from TAssignmentAnswer i where i.TAssignmentItem.id =?1 order by i.label asc")
	List<TAssignmentAnswer> findTAssignmentAnswerByItemId(Integer itemId);
}
