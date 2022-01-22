package net.gvsun.gsquestionpool.service.questionPool;

import net.gvsun.gsquestionpool.vo.questionPool.QuestionPoolCategoryVO;

import java.util.List;

/**
 * 题库类别模块service
 * @author 罗璇
 * @date 2017年12月7日
 */
public interface QuestionPoolCategoryService {

 /**
  * 根据Id删除题库类型
  * @author 曹焕
  * @param id
  * @return void
  */
   public void deleteQuestionPoolById(Integer id);
    /**
     * 查找所有题库类别记录
     * @author 罗璇
     * @date 2017年12月7日
      * @return List<QuestionPoolCategoryVO>
     */
    public List<QuestionPoolCategoryVO> getAllQuestionPoolCategories();

    /**
     * 根据Id查找题库类型
     * @param categoryId
     * @return
     */
    public QuestionPoolCategoryVO getQuestionPoolCategoryById(Integer categoryId);

    /**
     * 保存题库类型
     * @param questionPoolCategoryVO
     */
    public void saveQuestionCategory(QuestionPoolCategoryVO questionPoolCategoryVO);
}
