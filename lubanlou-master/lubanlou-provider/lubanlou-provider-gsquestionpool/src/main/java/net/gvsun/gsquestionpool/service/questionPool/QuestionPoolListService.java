package net.gvsun.gsquestionpool.service.questionPool;

import net.gvsun.gsquestionpool.dto.UserVo;
import net.gvsun.gsquestionpool.vo.exampool.ExamQuestionPoolVO;
import net.gvsun.gsquestionpool.vo.questionPool.*;

import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2017/11/29.
 */
public interface QuestionPoolListService {
    /**************************************************************************
     * Description 查看题库的试题
     *
     * @author 马帅
     * @date 2017-11-29
     **************************************************************************/
    public List<QuestionVo> findquestionPoolList(Integer id, Integer pageNumber, String name, Integer type, Integer flag);
    /**************************************************************************
     * Description 删除题库的试题
     *
     * @author 马帅
     * @date 2017-12-5
     **************************************************************************/
    public void deleteTAssignmentItemById(Integer itemId, Integer questionId);
    /**************************************************************************
     * Description 查询题库中题目的总数
     *
     * @author 马帅
     * @date 2017-12-5
     **************************************************************************/
    public Integer countTAssignmentItem(Integer id, String name, Integer type, Integer flag);
    /**************************************************************************
     * Description 新增题目
     *
     * @author 马帅
     * @param isOrder 填空题所属类型(0：无序 1：有序)
     * @date 2017-12-5
     **************************************************************************/
    public void insertTAssignmentItem(String type, String stem, String answer, String single, UserVo userVo, String answerLabelChoices, Integer questionPoolId, Integer itemId, Integer isOrder, String sanswerWeight, String singleWeight);
    /**************************************************************************
     * Description 通过itmeId查询每个小题
     *
     * @author 马帅
     * @date 2017-12-5
     **************************************************************************/
    public QuestionVo findQuestionOptionById(Integer itemId);
    /**************************************************************************
     * Description 题库模块-标记题目
     *
     * @author 洪春莹
     * @date 2018-10-30
     **************************************************************************/
    public void markQuestionFlag(Integer itemId);
    /**************************************************************************
     * Description 题库模块-取消标记题目
     *
     * @author 洪春莹
     * @date 2018-10-30
     **************************************************************************/
    public void markQuestionFlagBack(Integer itemId);
    /**************************************************************************
     * Description 查询左侧栏列表
     *
     * @author 马帅
     * @date 2017-12-5
     **************************************************************************/
    public List<QuestionLeftVo> findQuestionPoolLeft();
    /**************************************************************************
     * Description 查看题库
     *
     * @author lixueteng
     * @date 2017-12-1
     **************************************************************************/
    public List<QuestionPoolVO> findQuestionPool(Integer currpage, Integer pageSize, Integer type, String title, String username);
    /**************************************************************************
     * Description 获取题库分类列表
     *
     * @author lixueteng
     * @return 题库分类列表
     * @date 2017-12-1
     **************************************************************************/
    public List<QuestionPoolCategoryVO> findAllQuestionPoolCategory();
    /**************************************************************************
     * Description 新建题库
     *
     * @author lixueteng
     * @date 2017-12-4
     **************************************************************************/
    public void saveQuestionPool(QuestionPoolVO questionPoolVO, UserVo userVo, Integer siteId);
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
     * Description 根据题库的id删除对应的题库
     *
     * @author lixueteng
     * @date 2017-12-5
     * @param questionPoolId 题库的id
     * @return 根据id删除对应的题库
     **************************************************************************/
    public void deleteQuestionPoolById(Integer questionPoolId);
    /**************************************************************************
     * Description 获取题库的数量
     *
     * @author lixueteng
     * @date 2017-12-5
     * @return 题库的数量
     **************************************************************************/
    public Integer countQuestionPool(Integer type, String title, String username);

    /**************************************************************************
     * Description 获取所有的试卷库
     *
     * @author 张佳鸣
     * @date 2017-12-21
     **************************************************************************/
    public List<TestLibraryVo> findAllTestLibrary(Integer currpage, Integer pageSize, Integer type);

    /**************************************************************************
     * Description 获取试卷库的数量
     *
     * @author 张佳鸣
     * @date 2017-12-21
     **************************************************************************/
    public Integer countExamQuestionpool(Integer type);

    /**************************************************************************
     * Description 试卷库（假）删除
     *
     * @author 张佳鸣
     * @date 2017-12-25
     **************************************************************************/
    public void deleteExamQuestionpool(Integer examQuestionpoolId);
    /**************************************************************************
     * Description:查询课程下的题库列表
     *
     * @author：黄崔俊
     * @date ：2015-12-25
     **************************************************************************/
    public List<QuestionPoolVO> findQuestionListBySiteId(Integer cid, String title, String username, Integer currpage, int pageSize, Integer type);
    /**************************************************************************
     * Description:查询课程下的题库列表
     *
     * @author：黄崔俊
     * @date ：2015-12-25
     **************************************************************************/
    public List<QuestionPoolVO> findQuestionListBySiteIdNumber(Integer cid, String title, String username, Integer type);

    public ExamQuestionPoolVO findExamQuestionPoolVOById(Integer id, Integer type);

    /**************************************************************************
     * Description 保存题库并返回题库ID
     *
     * @author 吴奇臻
     * @date 2018-12-6
     **************************************************************************/
    public int saveQuestionPoolApi(String questionPoolId, String title, String username, Date createdTime, String category, String type, String cid);
    /**************************************************************************
     * Description 保存题库并返回题库ID
     *
     * @author 吴奇臻
     * @date 2018-12-6
     **************************************************************************/
    public QuestionPoolVO saveQuestionPoolForApi(QuestionPoolVO questionPoolVO, Integer siteId);
    public String findTAssignmentQuestionById(Integer id);
 }
