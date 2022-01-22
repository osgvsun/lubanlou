package net.gvsun.gsquestionpool.service.questionPool;

import net.gvsun.gsquestionpool.domain.QuestionpoolCategory;
import net.gvsun.gsquestionpool.domain.TAssignmentQuestionpool;
import net.gvsun.gsquestionpool.jpa.QuestionPoolCategoryJPA;
import net.gvsun.gsquestionpool.jpa.TAssignmentQuestionpoolJPA;
import net.gvsun.gsquestionpool.vo.questionPool.QuestionPoolCategoryVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 题库类别模块service impl
 * @author 罗璇
 * @date 2017年12月7日
 */
@Service("questionPoolCategoryService")
public class QuestionPoolCategoryServiceImpl implements QuestionPoolCategoryService {

    @Autowired
    private QuestionPoolCategoryJPA questionPoolCategoryJPA;
    @Autowired
    private TAssignmentQuestionpoolJPA tAssignmentQuestionpoolJPA;



    /**
     * 根据id删除题库类别记录
     *
     * @return void
     * @author 曹焕
     * @date 2018年08月20日
     */
    @Override
    public void deleteQuestionPoolById(Integer id){
        if(id!=null){
           List<TAssignmentQuestionpool> tAssignmentQuestionpools= tAssignmentQuestionpoolJPA.findQuestionPoolByCategoryId(id);
            for (TAssignmentQuestionpool ta:tAssignmentQuestionpools) {
                ta.setQuestionpoolCategory(null);
                tAssignmentQuestionpoolJPA.save(ta);
            }

          QuestionpoolCategory questionpoolCategory=  questionPoolCategoryJPA.findOne(id);
            questionPoolCategoryJPA.delete(questionpoolCategory);
        }
    }

    /**
     * 查找所有题库类别记录
     *
     * @return List<QuestionPoolCategoryVO>
     * @author 罗璇
     * @date 2017年12月7日
     */
    @Override
    public List<QuestionPoolCategoryVO> getAllQuestionPoolCategories() {
        List<QuestionPoolCategoryVO> questionPoolCategoryVOList=new ArrayList<>();
        List<QuestionpoolCategory> questionPoolCategories = questionPoolCategoryJPA.findAll();
        for(QuestionpoolCategory category:questionPoolCategories){
            QuestionPoolCategoryVO questionPoolCategoryVO=new QuestionPoolCategoryVO();
            BeanUtils.copyProperties(category,questionPoolCategoryVO);
            questionPoolCategoryVOList.add(questionPoolCategoryVO);
        }
        return questionPoolCategoryVOList;
    }

    /**
     * 根据Id查找题库类型
     *
     * @param categoryId
     * @return
     */
    @Override
    public QuestionPoolCategoryVO getQuestionPoolCategoryById(Integer categoryId) {
        QuestionpoolCategory questionpoolCategory = questionPoolCategoryJPA.findOne(categoryId);
        QuestionPoolCategoryVO questionPoolCategoryVO=new QuestionPoolCategoryVO();
        BeanUtils.copyProperties(questionpoolCategory,questionPoolCategoryVO);
        return questionPoolCategoryVO;
    }

    /**
     * 保存题库类型
     * @param questionPoolCategoryVO
     */
    @Override
    public void saveQuestionCategory(QuestionPoolCategoryVO questionPoolCategoryVO) {
        QuestionpoolCategory questionpoolCategory = new QuestionpoolCategory();
        if (questionPoolCategoryVO.getId() == null){
            questionpoolCategory.setTitle(questionPoolCategoryVO.getTitle());
        }else{
            questionpoolCategory = questionPoolCategoryJPA.findOne(questionPoolCategoryVO.getId());
            questionpoolCategory.setTitle(questionPoolCategoryVO.getTitle());
        }
        questionPoolCategoryJPA.save(questionpoolCategory);
    }
}
