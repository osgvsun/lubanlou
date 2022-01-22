package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.TAssignmentAnswer;
import net.gvsun.gsexam.domain.TAssignmentItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

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
     *
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

    @Query("select i from TAssignmentItem i where i.TAssignmentSection.TAssignment.id =?1  ")
    List<TAssignmentItem> findTAssignmentItemByTAssignmentId(Integer tAssignmentId);


    /**************************************************************************
     * Description 根据试题的id获取试题
     *
     * @author：李雪腾
     * @date ：2017-09-17
     **************************************************************************/
    @Query("select i from TAssignmentAnswer i where i.TAssignmentItem.id =?1 order by i.label asc")
    List<TAssignmentAnswer> findTAssignmentAnswerByItemId(Integer itemId);

    /**************************************************************************
     * Description 根据小题的id查询所有的小题
     *
     * @author：李雪腾
     * @date ：2017-09-17
     **************************************************************************/
    @Query("select i from TAssignmentItem i where i.id in ?1")
    Page<TAssignmentItem> findItemWithItemIds(Integer[] ids, Pageable pageable);

    /**************************************************************************
     * Description 查询试题
     *
     * @author：李雪腾
     * @date ：2017-09-17
     **************************************************************************/
    @Query("select i from TAssignmentItem i where i.TAssignmentSection.TAssignment.id =?1 order by i.TAssignmentSection.id,i.id asc ")
    List<TAssignmentItem> findTAssignmentItemByExamId(Integer examId);
    /**************************************************************************
     * Description 查询试题
     *
     * @author：李雪腾
     * @date ：2017-09-17
     **************************************************************************/
    @Query("select i from TAssignmentItem i where i.TAssignmentSection.TAssignment.id =?1 and i.type<>5 and i.type<>8 order by i.TAssignmentSection.id,i.id asc ")
    List<TAssignmentItem> findTAssignmentItemByExamId1(Integer examId);
    /**************************************************************************
     * Description 查询试题
     *
     * @author：李雪腾
     * @date ：2017-09-17
     **************************************************************************/
    @Query("select i from TAssignmentItem i where i.TAssignmentSection.TAssignment.id =:examId and i.type<>5 and i.type<>8 and i.description like CONCAT('%',:search,'%')  order by i.TAssignmentSection.id,i.id asc ")
    List<TAssignmentItem> findTAssignmentItemByExamId1Search(@Param("examId") Integer examId, @Param("search") String search);
    /**************************************************************************
     * Description 查询试题
     *
     * @author：李雪腾
     * @date ：2017-09-17
     **************************************************************************/
    @Query("select i from TAssignmentItem i where i.TAssignmentSection.TAssignment.id =?1 and (i.type=5 or i.type =8 ) order by i.TAssignmentSection.id,i.id asc ")
    List<TAssignmentItem> findTAssignmentItemByExamId2(Integer examId);

    /**************************************************************************
     * Description 查询试题
     *
     * @author：李雪腾
     * @date ：2017-09-17
     **************************************************************************/
    @Query("select i from TAssignmentItem i where i.TAssignmentSection.TAssignment.id =:examId and (i.type=5 or i.type =8 ) and i.description like CONCAT('%',:search,'%') order by i.TAssignmentSection.id,i.id asc ")
    List<TAssignmentItem> findTAssignmentItemByExamId2Search(@Param("examId") Integer examId, @Param("search") String search);

    @Query(value = "select tai.* from t_assignment_item tai " +
            "inner join exam_section_item esi on tai.id = esi.item_id " +
            "inner join exam_section es on es.id = esi.exam_section_id " +
            "inner join exam_questionpool eq on eq.id = es.exam_questionpool_id " +
            "inner join t_assignment ta on ta.exam_questionpool_id = eq.id " +
            "where  ta.id = ?1 order by tai.id ",
            nativeQuery = true)
    List<TAssignmentItem> findAllItemByExamId(Integer examId);


    @Query(value = "select tai.* from t_assignment_item tai " +
            "inner join exam_section_item esi on tai.id = esi.item_id " +
            "inner join exam_section es on es.id = esi.exam_section_id " +
            "inner join exam_questionpool eq on eq.id = es.exam_questionpool_id " +
            "inner join t_assignment ta on ta.exam_questionpool_id = eq.id " +
            "where  ta.id = ?1 order by tai.id limit ?2,?3",
            nativeQuery = true)
    List<TAssignmentItem> findAllPaperItemByExamId(Integer examId, Integer page, Integer limit);

    @Query(value = "select tai.* from t_assignment_item tai " +
            "inner join exam_section_item esi on tai.id = esi.item_id " +
            "inner join exam_section es on es.id = esi.exam_section_id " +
            "inner join exam_questionpool eq on eq.id = es.exam_questionpool_id " +
            "inner join t_assignment ta on ta.exam_questionpool_id = eq.id " +
            "where  ta.id = ?1 and tai.type<>5 and tai.type<>8 order by tai.id limit ?2,?3",
            nativeQuery = true)
    List<TAssignmentItem> findPaperItemByExamId(Integer examId, Integer page, Integer limit);
    @Query(value = "select tai.* from t_assignment_item tai " +
            "inner join exam_section_item esi on tai.id = esi.item_id " +
            "inner join exam_section es on es.id = esi.exam_section_id " +
            "inner join exam_questionpool eq on eq.id = es.exam_questionpool_id " +
            "inner join t_assignment ta on ta.exam_questionpool_id = eq.id " +
            "where  ta.id =:examId and tai.type<>5 and tai.type<>8 and tai.description like CONCAT('%',:search,'%') order by tai.id limit :page,:limit",
            nativeQuery = true)
    List<TAssignmentItem> findPaperItemByExamIdSearch(@Param("examId") Integer examId, @Param("page") Integer page, @Param("limit") Integer limit, @Param("search") String search);
    @Query(value = "select tai.* from t_assignment_item tai " +
            "inner join exam_section_item esi on tai.id = esi.item_id " +
            "inner join exam_section es on es.id = esi.exam_section_id " +
            "inner join exam_questionpool eq on eq.id = es.exam_questionpool_id " +
            "inner join t_assignment ta on ta.exam_questionpool_id = eq.id " +
            "where  ta.id = ?1 and (tai.type=5 or tai.type=8) order by tai.id limit ?2,?3",
            nativeQuery = true)
    List<TAssignmentItem> findPaperItemByExamId1(Integer examId, Integer page, Integer limit);
    @Query(value = "select tai.* from t_assignment_item tai " +
            "inner join exam_section_item esi on tai.id = esi.item_id " +
            "inner join exam_section es on es.id = esi.exam_section_id " +
            "inner join exam_questionpool eq on eq.id = es.exam_questionpool_id " +
            "inner join t_assignment ta on ta.exam_questionpool_id = eq.id " +
            "where  ta.id = :examId (tai.type=5 or tai.type=8) and tai.description like CONCAT('%',:search,'%') order by tai.id limit :page,:limit",
            nativeQuery = true)
    List<TAssignmentItem> findPaperItemByExamId1Search(@Param("examId") Integer examId, @Param("page") Integer page, @Param("limit") Integer limit, @Param("search") String search);
    @Query(value = "select tai.* from t_assignment_item tai " +
            "inner join exam_section_item esi on tai.id = esi.item_id " +
            "inner join exam_section es on es.id = esi.exam_section_id " +
            "inner join exam_questionpool eq on eq.id = es.exam_questionpool_id " +
            "inner join t_assignment ta on ta.exam_questionpool_id = eq.id " +
            "where  ta.id = ?1 and tai.type<>5 and tai.type<>8 order by tai.id ",
            nativeQuery = true)
    List<TAssignmentItem> countPaperItemByExamId(Integer examId);

    @Query(value = "select tai.* from t_assignment_item tai " +
            "inner join exam_section_item esi on tai.id = esi.item_id " +
            "inner join exam_section es on es.id = esi.exam_section_id " +
            "inner join exam_questionpool eq on eq.id = es.exam_questionpool_id " +
            "inner join t_assignment ta on ta.exam_questionpool_id = eq.id " +
            "where  ta.id =:examId and tai.type<>5 and tai.type<>8 and tai.description like CONCAT('%',:search,'%') order by tai.id ",
            nativeQuery = true)
    List<TAssignmentItem> countPaperItemByExamIdSearch(@Param("examId") Integer examId, @Param("search") String search);

    @Query(value = "select tai.* from t_assignment_item tai " +
            "inner join exam_section_item esi on tai.id = esi.item_id " +
            "inner join exam_section es on es.id = esi.exam_section_id " +
            "inner join exam_questionpool eq on eq.id = es.exam_questionpool_id " +
            "inner join t_assignment ta on ta.exam_questionpool_id = eq.id " +
            "where  ta.id = ?1 and (tai.type=5 or tai.type=8) order by tai.id ",
            nativeQuery = true)
    List<TAssignmentItem> countPaperItemByExamId1(Integer examId);

    @Query(value = "select tai.* from t_assignment_item tai " +
            "inner join exam_section_item esi on tai.id = esi.item_id " +
            "inner join exam_section es on es.id = esi.exam_section_id " +
            "inner join exam_questionpool eq on eq.id = es.exam_questionpool_id " +
            "inner join t_assignment ta on ta.exam_questionpool_id = eq.id " +
            "where  ta.id =:examId and (tai.type=5 or tai.type=8) and tai.description like CONCAT('%',:search,'%') order by tai.id ",
            nativeQuery = true)
    List<TAssignmentItem> countPaperItemByExamId1Search(@Param("examId") Integer examId, @Param("search") String search);
}
