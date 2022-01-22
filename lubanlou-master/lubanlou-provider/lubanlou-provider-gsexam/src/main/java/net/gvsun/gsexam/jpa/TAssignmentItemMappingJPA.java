package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TAssignmentItemMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/****************************************************************************
 * Description 教学系统-作业或测试题题目表—JPA通用数据操作
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface TAssignmentItemMappingJPA extends JpaRepository<TAssignmentItemMapping, Integer>,
        JpaSpecificationExecutor<TAssignmentItemMapping> {


    @Query("select c from TAssignmentItemMapping c where c.userByStudent.username= ?1 and c.TAssignment.id= ?2")
    List<TAssignmentItemMapping> findMappingByNameAndAssignmentId(String username, Integer aid);

    /**************************************************************************
     * Description 开始考试 获取当前学生考试没有作答的题目的数量
     *
     * @author lixueteng
     * @date 2017-11-2
     * @return 未作答题目的数量
     * @param examId 当前考试的id 学生开始考试生成的
     * @param username 当前的登录人的用户名
     **************************************************************************/
	/*select count(*) from t_assignment_item_mapping c where c.student='username'
	and c.assignment_id='exam_id' and c.answer_id !=null group by c.item_id;*/
    @Query("select count(c) from TAssignmentItemMapping c where c.userByStudent.username= ?2 " +
            "and c.TAssignment.id= ?1 and c.TAssignmentAnswer.id is not null group by c.TAssignmentItem.id")
    List<Integer> findRestItemWithUsernameAndExamId(Integer examId, String username);

    @Query("select c from TAssignmentItemMapping c where c.TAssignment.id = ?1 and c.TAssignmentItem.id = ?2 and c.userByStudent.username = ?3 and c.submitTime = ?4")
    List<TAssignmentItemMapping> getTAssignmentItemMapping(Integer tAssignmentId, Integer itemId, String username, Integer submitTime);

    @Query("select m from TAssignmentItemMapping m where m.TAssignmentItem.id=?1 and m.userByStudent.username=?2 and m.TAssignment.id=?3")
    List<TAssignmentItemMapping> findListScoreByItemIdAndUsername(Integer itemId, String username, Integer assignmentId);

    @Query("select m from TAssignmentItemMapping m where m.TAssignmentItem.id=?1 and m.TAssignment.id=?2 group by m.TAssignmentItem.id")
    List<TAssignmentItemMapping> findListScoreByItemId(Integer itemId, Integer assignmentId);

    @Query("select m from TAssignmentItemMapping m where m.TAssignmentItem.id=?1 and m.userByStudent.username=?2 and m.TAssignmentGrading.id=?3 and m.TAssignment.id=?4 group by  m.TAssignmentItem.id")
    public TAssignmentItemMapping findScoreByItemAndUsername(Integer itemId, String username, Integer gradingId, Integer assignmentId);

    @Query("select m from TAssignmentItemMapping m where m.TAssignmentItem.id=?1 and m.userByStudent.username=?2 and m.TAssignmentGrading.id=?3 and m.TAssignment.id=?4")
    List<TAssignmentItemMapping> findListScoreByItemAndUsername(Integer itemId, String username, Integer gradingId, Integer assignmentId);

    @Query("select m from TAssignmentItemMapping m where m.TAssignmentGrading.id=?1 ")
    List<TAssignmentItemMapping> findItemMappingByExamId(Integer gradingId);

    @Query(value = "select * from t_assignment_item_mapping where item_id=?1 and grading_id=?2 order by id", nativeQuery = true)
    List<TAssignmentItemMapping> findScoreByItemAndGrading(Integer itemId, Integer gradingId);

}
