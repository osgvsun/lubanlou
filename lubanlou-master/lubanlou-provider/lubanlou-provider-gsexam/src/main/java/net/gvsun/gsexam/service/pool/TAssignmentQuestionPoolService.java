package net.gvsun.gsexam.service.pool;

import net.gvsun.gsexam.dto.common.QuestionpoolCategoryVo;
import net.gvsun.gsexam.dto.common.TAssignmentQuestpoolVo;
import net.gvsun.gsexam.vo.questionpool.QuestionPoolVO;
import net.gvsun.gsexam.vo.questionpool.QuestionVo;

import java.util.List;
import java.util.Map;

public interface TAssignmentQuestionPoolService {


    /**************************************************************************
    * @Description: 新建考试-选择题库
    * @Author: 罗璇
    * @Date: 2017/9/23 23:04
    **************************************************************************/
    public List<TAssignmentQuestpoolVo> findQuestionForAddTest(Integer cid, Integer type, Integer isTest);
    /**************************************************************************
     * @Description: 更新题库池，根据所选的题库类别和是否公共题库
     * @Author: fubowen
     * @Date: 2020-12-17
     **************************************************************************/
    public List<TAssignmentQuestpoolVo> updateQuestionPool(Integer cid, Integer type, Integer isTest, Integer categoryId, Integer questionType);

    /**************************************************************************
    * @Description: 根据题库id，题目类型来获取题库该类题目总数(新建考试-增加题目)
    * @Author: 罗璇
    * @Date: 2017/10/9 21:57
    **************************************************************************/
    public Map<String,String> getItemCountStr(Integer questionpoolId, String type);
    /**************************************************************************
    * @Description: 根据题库id，题目数量和题目类型来判断是否超出题库该类题目总数
    * @Author: 罗璇
    * @Date: 2017/10/9 23:00
    **************************************************************************/
    public String checkTestItemCount(Integer questionpoolId, Integer quantity, Integer type, Integer gapsNumber);
    /**************************************************************************
     * Description 根据题库的id查询题库
     *
     * @author lixueteng
     * @date 2017-12-5
     * @param questionPoolId 题库的id
     * @return 根据id查询出对应的题库的vo
     **************************************************************************/
    public QuestionPoolVO findQuestionPoolById(Integer questionPoolId);
    /**************************************************************************
     * Description 查看题库的试题
     *
     * @author 马帅
     * @date 2017-11-29
     **************************************************************************/
    public List<QuestionVo> findquestionPoolList(Integer id, Integer currpage, String name, Integer type, Integer limit);
    /**************************************************************************
     * Description 查询总题目数量
     *
     * @author 马帅
     * @date 2017-12-5
     **************************************************************************/
    public Integer countTAssignmentItem(Integer id, String name, Integer type);
    /**************************************************************************
     * Description 通过itmsId查询小题
     *
     * @author 马帅
     * @date 2017-12-1
     **************************************************************************/
    public QuestionVo findQuestionOptionById(Integer itemId);
    /**************************************************************************
     * Description 试卷库--根据小题的id获取对应的试题的list
     * @param ids 试题的id
     * @return 查询到的所有的小题
     * @author lixueteng
     * @date 2017年12月27日
     **************************************************************************/
    public List<QuestionVo> showAllQuestionByIds(Integer[] ids, Integer currpage, Integer limit);

    /**
     * 根据题库id获取改题库下所有题目的id
     * @author 罗璇
     * @date 2018年5月7日
     * @param questionPoolId
     * @return
     */
    public List<Integer> getItemsIdsByPoolId(Integer questionPoolId);
    /**************************************************************************
     * Description get QuestionPool By QuestionPoolId
     *
     * @author Daniel
     * @date 2018-12-11
     **************************************************************************/
    public List<TAssignmentQuestpoolVo> getQuestionPoolWithIds(String questionPoolStr);
    /**************************************************************************
     * Description 查询所有题库类别
     *
     * @author fubowen
     * @date 2020-12-15
     **************************************************************************/
    public List<QuestionpoolCategoryVo> getAllQuestionPoolCategory();
}
