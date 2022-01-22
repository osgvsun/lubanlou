package net.gvsun.gsexam.service.pool;

import net.gvsun.gsexam.domain.ExamQuestionpool;
import net.gvsun.gsexam.domain.QuestionpoolCategory;
import net.gvsun.gsexam.dto.common.ExamQuestionpoolVo;
import net.gvsun.gsexam.dto.common.QuestionpoolCategoryVo;
import net.gvsun.gsexam.jpa.ExamQuestionpoolJPA;
import net.gvsun.gsexam.jpa.QuestionPoolCategoryJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service("tAssignmentExamQuestionpoolService")
public class TAssignmentExamQuestionpoolServiceImpl implements TAssignmentExamQuestionpoolService {

    @Autowired
    private ExamQuestionpoolJPA examQuestionpoolJPA;
    @Autowired
    private QuestionPoolCategoryJPA questionPoolCategoryJPA;

    /**
     * 查询所有的试卷库vo
     */
    @Override
    public List<ExamQuestionpoolVo> findAllExamQuestpool() {
        //查询所有的试卷库
        List<ExamQuestionpool> examQuestionpoolList = examQuestionpoolJPA.findAllExamQuestionpool();
        //创建页面vo容器对象
        List<ExamQuestionpoolVo> examQuestionpoolVoList = new ArrayList<>();
        //遍历所有的试卷库并赋值给vo
        for (ExamQuestionpool examQuestionpool : examQuestionpoolList){
            //新建vo对象
            ExamQuestionpoolVo examQuestionpoolVo = new ExamQuestionpoolVo();
            //给vo赋值
            Integer examQuestionpoolId = examQuestionpool.getId();
            String  examQuestionpoolTitle = examQuestionpool.getTitle();
            Integer examQuestionpoolCategory = examQuestionpool.getCategory();
            Double examQuestionpoolScore = examQuestionpool.getScore();
            examQuestionpoolVo.setExamQuestionpoolId(examQuestionpoolId);
            examQuestionpoolVo.setTitle(examQuestionpoolTitle);
            examQuestionpoolVo.setCategory(examQuestionpoolCategory);
            examQuestionpoolVo.setScore(examQuestionpoolScore);
            //添加到vo容器中
            examQuestionpoolVoList.add(examQuestionpoolVo);
        }
        return examQuestionpoolVoList;
    }

    /**
     * 查询所有的试卷库分类
     */
    @Override
    public List<QuestionpoolCategoryVo> findAllExamQuestpoolCategory(){
        //查询所有的试卷库分类
        List<QuestionpoolCategory> questionpoolCategoryList = questionPoolCategoryJPA.findQuestionPoolCategory();
        //创建页面vo容器对象
        List<QuestionpoolCategoryVo> questionpoolCategoryVoList = new ArrayList<>();
        //遍历所有的试卷库类型并赋值给vo
        for(QuestionpoolCategory questionpoolCategory : questionpoolCategoryList){
            //新建vo对象
            QuestionpoolCategoryVo questionpoolCategoryVo = new QuestionpoolCategoryVo();
            //给vo赋值
            Integer questionpoolCategoryId = questionpoolCategory.getId();
            String questionpoolCategoryTitle = questionpoolCategory.getTitle();
            questionpoolCategoryVo.setId(questionpoolCategoryId);
            questionpoolCategoryVo.setTitle(questionpoolCategoryTitle);
            //添加到vo容器中
            questionpoolCategoryVoList.add(questionpoolCategoryVo);
        }
        return questionpoolCategoryVoList;
    }

    /**
     * 根据试卷库分类查找试卷库vo
     */
    @Override
    public List<ExamQuestionpoolVo> findExamQuestpoolWithcategory(Integer category){
        //根据试卷库分类查询所有的试卷库
        List<ExamQuestionpool> examQuestionpoolList = examQuestionpoolJPA.findExamQuestionpoolWithcategory(category);
        //创建页面vo容器对象
        List<ExamQuestionpoolVo> examQuestionpoolVoList = new ArrayList<>();
        //遍历所有的试卷库并赋值给vo
        for (ExamQuestionpool examQuestionpool : examQuestionpoolList){
            //新建vo对象
            ExamQuestionpoolVo examQuestionpoolVo = new ExamQuestionpoolVo();
            //给vo赋值
            Integer examQuestionpoolId = examQuestionpool.getId();
            String  examQuestionpoolTitle = examQuestionpool.getTitle();
            Integer examQuestionpoolCategory = examQuestionpool.getCategory();
            Double score = examQuestionpool.getScore();
            examQuestionpoolVo.setExamQuestionpoolId(examQuestionpoolId);
            examQuestionpoolVo.setTitle(examQuestionpoolTitle);
            examQuestionpoolVo.setCategory(examQuestionpoolCategory);
            examQuestionpoolVo.setScore(score);
            //添加到vo容器中
            examQuestionpoolVoList.add(examQuestionpoolVo);
        }
        return examQuestionpoolVoList;
    }
}