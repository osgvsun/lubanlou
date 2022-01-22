package net.gvsun.gsquestionpool.service.exampool;

import net.gvsun.gsquestionpool.vo.exampool.ExamItemVo;
import net.gvsun.gsquestionpool.vo.exampool.ExamMajorTermVO;
import net.gvsun.gsquestionpool.vo.exampool.ExamQuestionPoolVO;
import net.gvsun.gsquestionpool.vo.questionPool.QuestionVo;

import java.util.List;
import java.util.Map;

/**************************************************************************
 * Description: 试卷库的service
 *
 * @author:lixueteng
 * @date:2017/12/20 0020
 **************************************************************************/
public interface ExamQuestionPoolService {


    /**************************************************************************
     * Description 试卷库--手动组卷
     * @param examQuestionPoolVO 试卷库VO
     * @author 李雪腾
     * @date 2017年12月05日
     **************************************************************************/
    public void saveManuallyPool(ExamQuestionPoolVO examQuestionPoolVO, Integer id);

    /**************************************************************************
     * Description 按照数量随机查询选中试题库下所有小题id
     * @param examMajorTerm 试卷库大项VO
     * @param questionpoolId 题库id
     * @param questionpoolId 题库id
     * @author 马帅
     * @date 2017-12-21
     * @return 小题id
     **************************************************************************/
    public List<Integer> findQuestionPoolByCount(ExamMajorTermVO examMajorTerm, Integer questionpoolId, Integer type);

    /**************************************************************************
     * Description 查询计算题库不同类型题目的个数
     * @param questionpoolId 题库id
     * @author 张佳鸣
     * @date 2017-12-25
     * @return 该题库下几种题型的个数和题目类型组成的json
     **************************************************************************/
    public Map<Integer, String> calcQuestionpoolNum(Integer questionpoolId);

    /**************************************************************************
     * Description 试卷库--自动组卷保存
     * @param examQuestionPoolVO 试卷库VO
     * @author 张佳鸣
     * @date 2017年12月26日
     **************************************************************************/
    public void saveAutoPool(ExamQuestionPoolVO examQuestionPoolVO, Integer examid);
    /**************************************************************************
     * Description 试卷库--根据小题的id获取对应的试题的list
     * @param ids 试题的id
     * @return 查询到的所有的小题
     * @author lixueteng
     * @date 2017年12月27日
     **************************************************************************/
    public List<QuestionVo> showAllQuestionByIds(int[] ids, Integer currpage);

    /**************************************************************************
     * Description 试卷库--自主建卷保存
     * @param examQuestionPoolVO 试卷库VO
     * @author 张佳鸣
     * @date 2017年12月29日
     **************************************************************************/
    public void saveIndependentPool(ExamQuestionPoolVO examQuestionPoolVO, Integer id);

    /**************************************************************************
     * Description 试卷库--根据小题的id获取对应的试题的list（带分页）
     * @param ids 试题的id
     * @param currpage 当前页
     * @param pageSize 页面大小
     * @return 查询到的所有的小题
     * @author 张佳鸣
     * @date 2018年01月03日
     **************************************************************************/
    public List<QuestionVo> findAllQuestionByIds(int[] ids, Integer currpage, Integer pageSize);
    /**************************************************************************
     * Description 获取试卷库的题
     *
     * @author 黄浩
     * @date 2020年11月12日
     **************************************************************************/
    public List<ExamItemVo> getItem(Integer examQuestionPoolId);

}
