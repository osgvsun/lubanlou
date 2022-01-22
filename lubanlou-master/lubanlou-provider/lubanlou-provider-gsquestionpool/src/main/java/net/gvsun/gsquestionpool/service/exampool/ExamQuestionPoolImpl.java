package net.gvsun.gsquestionpool.service.exampool;

import net.gvsun.gsquestionpool.domain.*;
import net.gvsun.gsquestionpool.dto.TAssignmentAnswerDto;
import net.gvsun.gsquestionpool.jpa.*;
import net.gvsun.gsquestionpool.util.EmptyUtil;
import net.gvsun.gsquestionpool.vo.exampool.ExamItemVo;
import net.gvsun.gsquestionpool.vo.exampool.ExamMajorTermVO;
import net.gvsun.gsquestionpool.vo.exampool.ExamQuestionPoolVO;
import net.gvsun.gsquestionpool.vo.questionPool.QuestionOptionVo;
import net.gvsun.gsquestionpool.vo.questionPool.QuestionVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.*;
import java.util.stream.Collectors;

/**************************************************************************
 * Description:试卷库service实现
 *
 * @author:lixueteng
 * @date:2017/12/20 0020
 **************************************************************************/
@Service("examQuestionPoolService")
public class ExamQuestionPoolImpl implements ExamQuestionPoolService {

    @Autowired
    private ExamQuestionpoolJPA examQuestionpoolJPA;
    @Autowired
    private ExamSectionJPA examSectionJPA;
    @Autowired
    private TAssignmentItemJPA tAssignmentItemJPA;
    @Autowired
    private TAssignmentQuestionpoolJPA tAssignmentQuestionpoolJPA;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private TAssignmentAnswerJPA tAssignmentAnswerJPA;
    @Autowired
    private TAssignmentJPA tAssignmentJPA;

    /**************************************************************************
     * Description 试卷库--手动组卷
     * @param examQuestionPoolVO 试卷库VO
     * @author 李雪腾
     * @date 2017年12月05日
     **************************************************************************/
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void saveManuallyPool(ExamQuestionPoolVO examQuestionPoolVO, Integer Examid) {
        //试卷库的保存
        ExamQuestionpool examQuestionpool = new ExamQuestionpool();
        if (Examid != null) {
            examQuestionpool = examQuestionpoolJPA.findOne(Examid);
        }
        examQuestionpool.setTitle(examQuestionPoolVO.getTitle());
        examQuestionpool.setCategory(examQuestionPoolVO.getCategory());
        examQuestionpool.setCreatedDate(examQuestionPoolVO.getCreateTime());
        examQuestionpool.setCreatedName(examQuestionPoolVO.getUsername());
        examQuestionpool.setScore(examQuestionPoolVO.getScore());
        examQuestionpool.setType(2);
        examQuestionpool.setStatus(1);
        ExamQuestionpool questionpool = examQuestionpoolJPA.save(examQuestionpool);
        //题库的保存
        for (ExamMajorTermVO term : examQuestionPoolVO.getExamMajorTerms()) {
            ExamSection section = new ExamSection();
            section.setExamQuestionpool(questionpool);
            section.setName(term.getTitle());
            section.setItemCount(term.getItemcount());
            section.setItemScore(term.getItemscore());
            //获取所有的小题
            List<Integer> itemids = term.getItemids();
            Set<TAssignmentItem> itemList = new HashSet<>();
            for (Integer id : itemids) {
                TAssignmentItem one = tAssignmentItemJPA.findOne(id);
                itemList.add(one);
            }
            section.setTAssignmentItems(itemList);
            examSectionJPA.save(section);
            examSectionJPA.flush();
        }

    }

    @Override
    public List<Integer> findQuestionPoolByCount(ExamMajorTermVO examMajorTerm, Integer questionpoolId, Integer type) {
        List<Integer> itemIds = new ArrayList<Integer>();
        //通过题库id查询本题库所对应的所有试题
        TAssignmentQuestionpool tAssignmentQuestionpool = tAssignmentQuestionpoolJPA.findOne(questionpoolId);
        List<QuestionVo> questionVos = new ArrayList<QuestionVo>();
        String ids = "";
        for (TAssignmentItem tAssignmentItem : tAssignmentQuestionpool.getTAssignmentItems()) {
            ids += "'" + tAssignmentItem.getId() + "',";
        }
        if (!ids.equals("")) {
            ids = ids.substring(0, ids.length() - 1);
        } else {
            ids = "''";
        }
        String sql = "select c from TAssignmentItem c where c.id in (" + ids + ")";
        if (!EmptyUtil.isEmpty(type)) {
            sql += " and c.type=" + type;
        }
        //sql += " order newid()";
        Query query = entityManager.createQuery(sql);
        List<TAssignmentItem> tAssignmentItems = query.getResultList();
        for (TAssignmentItem t : tAssignmentItems) {
            itemIds.add(t.getId());
        }
        return itemIds;
    }

    /**************************************************************************
     * Description 查询计算题库不同类型题目的个数
     * @param questionpoolId 题库id
     * @author 张佳鸣
     * @date 2017-12-25
     * @return 该题库下几种题型的个数和题目类型组成的json
     **************************************************************************/
    @Override
    public Map<Integer, String> calcQuestionpoolNum(Integer questionpoolId) {
        Map<Integer, String> map = new HashMap<Integer, String>();
        //通过题库id查询本题库所对应的所有试题
        TAssignmentQuestionpool tAssignmentQuestionpool = tAssignmentQuestionpoolJPA.findOne(questionpoolId);
        Set<TAssignmentItem> tAssignmentItemList = tAssignmentQuestionpool.getTAssignmentItems();
        //遍历所有试题并计算相对应的不同类型题目个数
        //singleChoiceNum 单选 multipleChoiceNum 多选 judgmentNum 判断题 completionNum 填空题 answerNum 解答题
        int singleChoiceNum = 0;
        int multipleChoiceNum = 0;
        int judgmentNum = 0;
        int completionNum = 0;
        int answerNum = 0;
        for (TAssignmentItem tAssignmentItem : tAssignmentItemList) {
            //根据tAssignmentItem的type判断题型：1多选，2判断，4单选，5简答题，8填空
            if (tAssignmentItem.getType() == 1) {//多选题
                multipleChoiceNum++;
            } else if (tAssignmentItem.getType() == 2) {//判断题
                judgmentNum++;
            } else if (tAssignmentItem.getType() == 4) {//单选题
                singleChoiceNum++;
            } else if (tAssignmentItem.getType() == 5) {//简答题
                answerNum++;
            } else if (tAssignmentItem.getType() == 8) {//填空题
                completionNum++;
            }
        }
        map.put(4, "单选题（共" + singleChoiceNum + "个）");
        map.put(1, "多选题（共" + multipleChoiceNum + "个）");
        map.put(2, "判断题（共" + judgmentNum + "个）");
        map.put(8, "填空题（共" + completionNum + "个）");
        map.put(5, "简答题（共" + answerNum + "个）");
        return map;
    }

    /**************************************************************************
     * Description 试卷库--自动组卷保存
     * @param examQuestionPoolVO 试卷库VO
     * @author 张佳鸣
     * @date 2017年12月26日
     **************************************************************************/
    @Override
    public void saveAutoPool(ExamQuestionPoolVO examQuestionPoolVO, Integer examid) {
        //试卷库的保存
        ExamQuestionpool examQuestionpool = new ExamQuestionpool();
        if (examid != null) {
            examQuestionpool = examQuestionpoolJPA.findOne(examid);
        }

        examQuestionpool.setTitle(examQuestionPoolVO.getTitle());
        examQuestionpool.setCategory(examQuestionPoolVO.getCategory());
        examQuestionpool.setCreatedDate(examQuestionPoolVO.getCreateTime());
        examQuestionpool.setCreatedName(examQuestionPoolVO.getUsername());
        examQuestionpool.setScore(examQuestionPoolVO.getScore());
        examQuestionpool.setType(1);//自动组卷
        examQuestionpool.setStatus(1);//正常（非删除）状态
        ExamQuestionpool questionpool = examQuestionpoolJPA.save(examQuestionpool);
        //试卷库大项的保存
        for (ExamMajorTermVO term : examQuestionPoolVO.getExamMajorTerms()) {
            ExamSection section = new ExamSection();
            section.setExamQuestionpool(questionpool);
            section.setName(term.getTitle());
            section.setItemCount(term.getItemcount());
            section.setItemScore(term.getItemscore());
            section.setItemType(term.getItemType());
            section.setItemQuestionpoolId(term.getItemQuestionPoolId());
            //获取所有的小题
            List<Integer> itemids = term.getItemids();
            Set<TAssignmentItem> itemList = new HashSet<>();
            for (Integer id : itemids) {
                TAssignmentItem one = tAssignmentItemJPA.findOne(id);
                itemList.add(one);
            }
            section.setTAssignmentItems(itemList);
            examSectionJPA.save(section);
            examSectionJPA.flush();
        }
    }

    /**************************************************************************
     * Description 试卷库--根据小题的id获取对应的试题的list
     * @param ids 试题的id
     * @param currpage 第几页
     * @return 查询到的所有的小题
     * @author lixueteng
     * @date 2017年12月27日
     **************************************************************************/
    @Override
    public List<QuestionVo> showAllQuestionByIds(int[] ids, Integer currpage) {
        List<QuestionVo> returnList = new ArrayList<>();
        Pageable pageable = PageRequest.of(currpage - 1, 10);
        Page<TAssignmentItem> itemWithItemIds = tAssignmentItemJPA.findItemWithItemIds(ids, pageable);
        //将试题放入到QuestionVo中
        for (TAssignmentItem tAssignment : itemWithItemIds.getContent()) {
            QuestionVo questionDto = new QuestionVo();
            //放入试题id
            questionDto.setId(tAssignment.getId());
            //放入试题标题（题干）
            questionDto.setTitle(tAssignment.getDescription());
            //放入试题类型
            questionDto.setType(tAssignment.getType());
            //单选与多选题
            if (tAssignment.getType() == 1 || tAssignment.getType() == 4) {
                //放入试题选项与试题答案
                List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(tAssignment.getId());
                List<QuestionOptionVo> itemOptions = new ArrayList<QuestionOptionVo>();
                //试题答案
                String itemAnswer = "";
                for (TAssignmentAnswer tAssignmentAnswer : tAssignmentAnswers) {
                    QuestionOptionVo questionOptionDto = new QuestionOptionVo();
                    questionOptionDto.setOptionNumber(tAssignmentAnswer.getLabel());
                    questionOptionDto.setOptionText(tAssignmentAnswer.getText());
                    itemOptions.add(questionOptionDto);
                    //判断改选项是否为正确
                    if (tAssignmentAnswer.getIscorrect() == 1) {
                        itemAnswer += tAssignmentAnswer.getLabel() + ",";
                    }
                }
                //将答案最后一个,删除
                itemAnswer = itemAnswer.substring(0, itemAnswer.length() - 1);
                questionDto.setItemOptions(itemOptions);
                questionDto.setItemAnswer(itemAnswer);
            } else {
                List<QuestionOptionVo> itemOptions = new ArrayList<QuestionOptionVo>();
                //放入试题选项与试题答案
                List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(tAssignment.getId());
                //试题答案
                String itemAnswer = "";
                for (TAssignmentAnswer tAssignmentAnswer : tAssignmentAnswers) {
                    //判断该选项是否为正确
                    if (tAssignmentAnswer.getIscorrect() == 1) {
                        itemAnswer += tAssignmentAnswer.getText() + ",";
                    }
                }
                if (!itemAnswer.equals("")) {
                    itemAnswer = itemAnswer.substring(0, itemAnswer.length() - 1);
                }
                questionDto.setItemOptions(itemOptions);
                questionDto.setItemAnswer(itemAnswer);
            }
            returnList.add(questionDto);
        }

        return returnList;

    }

    /**************************************************************************
     * Description 试卷库--自主建卷保存
     * @param examQuestionPoolVO 试卷库VO
     * @author 张佳鸣
     * @date 2017年12月26日
     **************************************************************************/
    @Override
    public void saveIndependentPool(ExamQuestionPoolVO examQuestionPoolVO, Integer examid) {
        //试卷库的保存
        ExamQuestionpool examQuestionpool = new ExamQuestionpool();
        if (examid != null) {
            examQuestionpool = examQuestionpoolJPA.findOne(examid);
        }

        examQuestionpool.setTitle(examQuestionPoolVO.getTitle());
        examQuestionpool.setCategory(examQuestionPoolVO.getCategory());
        examQuestionpool.setCreatedDate(examQuestionPoolVO.getCreateTime());
        examQuestionpool.setCreatedName(examQuestionPoolVO.getUsername());
        examQuestionpool.setScore(examQuestionPoolVO.getScore());
        examQuestionpool.setType(3);//自主建卷
        examQuestionpool.setStatus(1);//正常（非删除）状态
        ExamQuestionpool questionpool = examQuestionpoolJPA.save(examQuestionpool);
        //试卷库大项的保存
        for (ExamMajorTermVO term : examQuestionPoolVO.getExamMajorTerms()) {
            ExamSection section = new ExamSection();
            section.setExamQuestionpool(questionpool);
            section.setName(term.getTitle());
            section.setItemCount(term.getItemcount());
            section.setItemScore(term.getItemscore());
            //获取所有的小题
            List<Integer> itemids = term.getItemids();
            Set<TAssignmentItem> itemList = new HashSet<>();
            for (Integer id : itemids) {
                TAssignmentItem one = tAssignmentItemJPA.findOne(id);
                itemList.add(one);
            }
            section.setTAssignmentItems(itemList);
            examSectionJPA.save(section);
            examSectionJPA.flush();
        }
    }

    /**************************************************************************
     * Description 试卷库--根据小题的id获取对应的试题的list（带分页）
     * @param ids 试题的id
     * @param currpage 当前页
     * @param pageSize 页面大小
     * @return 查询到的所有的小题
     * @author 张佳鸣
     * @date 2018年01月03日
     **************************************************************************/
    @Override
    public List<QuestionVo> findAllQuestionByIds(int[] ids, Integer currpage, Integer pageSize) {
        List<QuestionVo> returnList = new ArrayList<>();
        Pageable pageable = PageRequest.of(currpage - 1, pageSize);
        Page<TAssignmentItem> itemWithItemIds = tAssignmentItemJPA.findItemWithItemIds(ids, pageable);
        //将试题放入到QuestionVo中
        for (TAssignmentItem tAssignment : itemWithItemIds.getContent()) {
            QuestionVo questionDto = new QuestionVo();
            //放入试题id
            questionDto.setId(tAssignment.getId());
            //放入试题标题（题干）
            questionDto.setTitle(tAssignment.getDescription());
            //放入试题类型
            questionDto.setType(tAssignment.getType());
            //单选与多选题
            if (tAssignment.getType() == 1 || tAssignment.getType() == 4) {
                //放入试题选项与试题答案
                List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(tAssignment.getId());
                List<QuestionOptionVo> itemOptions = new ArrayList<QuestionOptionVo>();
                //试题答案
                String itemAnswer = "";
                for (TAssignmentAnswer tAssignmentAnswer : tAssignmentAnswers) {
                    QuestionOptionVo questionOptionDto = new QuestionOptionVo();
                    questionOptionDto.setOptionNumber(tAssignmentAnswer.getLabel());
                    questionOptionDto.setOptionText(tAssignmentAnswer.getText());
                    itemOptions.add(questionOptionDto);
                    //判断改选项是否为正确
                    if (tAssignmentAnswer.getIscorrect() == 1) {
                        itemAnswer += tAssignmentAnswer.getLabel() + ",";
                    }
                }
                //将答案最后一个,删除
                itemAnswer = itemAnswer.substring(0, itemAnswer.length() - 1);
                questionDto.setItemOptions(itemOptions);
                questionDto.setItemAnswer(itemAnswer);
            } else {
                List<QuestionOptionVo> itemOptions = new ArrayList<QuestionOptionVo>();
                //放入试题选项与试题答案
                List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(tAssignment.getId());
                //试题答案
                String itemAnswer = "";
                for (TAssignmentAnswer tAssignmentAnswer : tAssignmentAnswers) {
                    //判断该选项是否为正确
                    if (tAssignmentAnswer.getIscorrect() == 1) {
                        itemAnswer += tAssignmentAnswer.getText() + ",";
                    }
                }
                if (!itemAnswer.equals("")) {
                    itemAnswer = itemAnswer.substring(0, itemAnswer.length() - 1);
                }
                questionDto.setItemOptions(itemOptions);
                questionDto.setItemAnswer(itemAnswer);
            }
            returnList.add(questionDto);
        }
        return returnList;
    }

    /**************************************************************************
     * Description 获取试卷库的题
     *
     * @author 黄浩
     * @date 2020年11月12日
     **************************************************************************/
    @Override
    public List<ExamItemVo> getItem(Integer examQuestionPoolId) {
        List<ExamItemVo> examItemVoList = new ArrayList<>();
        //获取试卷库
        //获取学生考试的那条记录
        ExamQuestionpool examQuestionpool = examQuestionpoolJPA.findOne(examQuestionPoolId);
        List<TAssignmentItem> tAssignmentItems = new ArrayList<>();
        List<TAssignmentItem> tAssignmentItemList = new ArrayList<>();
        //遍历试卷库大项获取所有试题id
        Set<ExamSection> examSections = examQuestionpool.getExamSections();//试卷库大项
        for (ExamSection examSection : examSections) {
            //试题
            Set<TAssignmentItem> tAssignmentItemSet = examSection.getTAssignmentItems();
            for (TAssignmentItem items : tAssignmentItemSet) {
                ExamItemVo item = new ExamItemVo();
                item.setId(items.getId());
                item.setDescription(items.getDescription());
                item.setType(items.getType());
                item.setScore(examSection.getItemScore());
                item.setSectionId(examSection.getId());
                item.setSectionName(examSection.getName());
                List<TAssignmentAnswerDto> answerText = new ArrayList<>();
                //解决set集合顺序不确定问题
                List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentItemJPA.findTAssignmentAnswerByItemId(items.getId());
                for (TAssignmentAnswer answer : tAssignmentAnswers) {
                    TAssignmentAnswerDto answerDto = new TAssignmentAnswerDto();
                    answerDto.setId(answer.getId());
                    answerDto.setText(answer.getText());
                    answerDto.setLabel(answer.getLabel());
                    answerDto.setIscorrect(answer.getIscorrect());
                    answerText.add(answerDto);
                }
                item.setAnswertext(answerText);
                //判断是否是填空题
                if (item.getType() == 8) {
                    item.setDescription(items.getDescriptionTemp());
                }
                examItemVoList.add(item);
            }
        }
        //1多选，2对错，4单选，5简答题，8填空
        //顺序为4--1--2--8--5
        List<ExamItemVo> sortList = new ArrayList<>();
        List<ExamItemVo> sortList4 = examItemVoList.stream().filter(item -> item.getType().equals(4)).collect(Collectors.toList());
        List<ExamItemVo> sortList1 = examItemVoList.stream().filter(item -> item.getType().equals(1)).collect(Collectors.toList());
        List<ExamItemVo> sortList2 = examItemVoList.stream().filter(item -> item.getType().equals(2)).collect(Collectors.toList());
        List<ExamItemVo> sortList8 = examItemVoList.stream().filter(item -> item.getType().equals(8)).collect(Collectors.toList());
        List<ExamItemVo> sortList5 = examItemVoList.stream().filter(item -> item.getType().equals(5)).collect(Collectors.toList());
        sortList.addAll(sortList4);
        sortList.addAll(sortList1);
        sortList.addAll(sortList2);
        sortList.addAll(sortList8);
        sortList.addAll(sortList5);
        return sortList;
    }

}
