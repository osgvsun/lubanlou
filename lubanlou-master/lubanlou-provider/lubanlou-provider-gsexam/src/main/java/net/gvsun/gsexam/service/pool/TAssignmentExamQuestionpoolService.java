package net.gvsun.gsexam.service.pool;

import net.gvsun.gsexam.dto.common.ExamQuestionpoolVo;
import net.gvsun.gsexam.dto.common.QuestionpoolCategoryVo;

import java.util.List;

/**
 * 考试试卷库
 */
public interface TAssignmentExamQuestionpoolService {

    /**
     * 查询所有的试卷库vo
     */
    public List<ExamQuestionpoolVo> findAllExamQuestpool();

    /**
     * 查询所有的试卷库分类
     */
    public List<QuestionpoolCategoryVo> findAllExamQuestpoolCategory();

    /**
     * 根据试卷库分类查找试卷库vo
     */
    public List<ExamQuestionpoolVo> findExamQuestpoolWithcategory(Integer category);

}
