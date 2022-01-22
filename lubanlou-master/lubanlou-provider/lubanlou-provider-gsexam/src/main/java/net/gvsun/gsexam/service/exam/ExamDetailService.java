package net.gvsun.gsexam.service.exam;

import net.gvsun.gsexam.dto.common.TAssignmentVo;
import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.vo.exam.*;
import net.gvsun.gsexam.vo.test.TestSectionVO;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Created by 李雪腾 on 2017/9/13 0013.
 */
public interface ExamDetailService {

    /**************************************************************************
     * Description 开始考试，插入数据，记录考生的考试情况
     *
     * @author lixueteng
     * @date 2017-09-12
     **************************************************************************/
    public TAssignmentVo findExamByUserAndExam(UserVo user, TAssignmentVo exam);
    /**************************************************************************
     * Description 学生开始测试-根据现有测试，创建一个测试副本，用于给小题打分
     *
     * @author fubowen
     * @date 2021-7-13
     **************************************************************************/
    public Integer copyTestForGrading(Integer testId,String username);
    /**************************************************************************
     * Description 开始考试，获取考试题目数据
     *
     * @author lixueteng
     * @date 2017-09-17
     **************************************************************************/
    public ExamDetailVo getExamDetail(Integer examId, String username, Integer pageNumber, Integer pageSize);

    /**************************************************************************
     * Description 开始考试，保存考试的答题记录之前如果之前已经保存过数据，清空重写
     *
     * @author lixueteng
     * @date 2017-09-18
     **************************************************************************/
    public void deleteTAssignmentItemMapping(int assignemntId, Integer currpage, Integer pageSize, UserVo userVo);

    /**************************************************************************
     * Description 开始考试，保存考试的答题记录
     *
     * @author lixueteng
     * @date 2017-09-19
     **************************************************************************/
    public BigDecimal saveTAssignmentItemMapping(Map<String, String[]> answerMap, Integer assignmentId, Integer submitTime, UserVo userVo, Integer grading);

    public BigDecimal saveTAssignmentItemMappingRedis(Map<String, String[]> answerMap, Integer assignmentId, Integer submitTime, UserVo userVo, Integer grading);

    /**************************************************************************
     * Description 开始考试，保存考试
     *
     * @author lixueteng
     * @date 2017-09-19
     **************************************************************************/
    public String saveExam(BigDecimal totalScore, Integer assignmentId, Integer submitTime, Integer simulation, Integer cid, UserVo userVo, Integer grading);

    String saveExamRedis(BigDecimal totalScore, Integer assignmentId, Integer submitTime, Integer simulation, Integer cid, UserVo userVo, Integer grading);

    /**************************************************************************
     * Description 开始考试，获取当前总分
     *
     * @author lixueteng
     * @date 2017-09-19
     **************************************************************************/
    public BigDecimal findTotalScoreByMapping(Integer assignmentId, UserVo userVo);

    /**************************************************************************
     * Description 开始考试，保存学生答题
     *
     * @author lixueteng
     * @date 2017-09-19
     **************************************************************************/
    public Integer saveTAssignmentGradeForTest(BigDecimal totalScore, Integer assignmentId, Integer submitTime, UserVo userVo, Integer grading);

    /**************************************************************************
     * Description 开始考试，查找学生的考试
     *
     * @author lixueteng
     * @date 2017-09-22
     **************************************************************************/
    public Integer findTAssignmentForExam(Integer examId, String username);

    /**************************************************************************
     * Description 开始考试 获取考试小题的id
     *
     * @author lixueteng
     * @date 2017-09-22
     **************************************************************************/
    public List<Integer> findTAssignmentItemIds(Integer examId);

    /**************************************************************************
     * Description 开始考试 根据当前的考试获取老师颁发的考试
     *
     * @author lixueteng
     * @date 2017-09-22
     **************************************************************************/
    public Integer findParentExamByExamId(Integer examId);

    /**************************************************************************
     * Description 开始考试 获取本次考试的结果
     *
     * @author lixueteng
     * @date 2017-09-27
     **************************************************************************/
    public ExamResultVo getExamResult(Integer examId, UserVo userVo);

    /**************************************************************************
     * Description 开始考试 获取学生的考试的提交次数
     *
     * @author lixueteng
     * @date 2017-09-27
     **************************************************************************/
    public Integer getStudentExamSubmitTime(Integer examId, UserVo userVo);

    /**************************************************************************
     * Description 开始考试 获取当前学生考试没有作答的题目的数量
     *
     * @author lixueteng
     * @date 2017-11-2
     **************************************************************************/
    public Integer getItemIsNotAnswer(Integer examId, UserVo userVo);

    /**************************************************************************
     * Description 开始考试 获取考试总的试题的数量
     *
     * @author lixueteng
     * @date 2017-11-2
     **************************************************************************/
    public Integer getItemCountWithExamId(Integer examId);

    /**************************************************************************
     * Description 开始考试 获取当前考试是否还有再次作答的次数
     *
     * @author lixueteng
     * @date 2017-11-2
     * @param examId 考试的ID
     * @param userVo 当前登录人
     * @return 当前考试的剩余提交次数
     **************************************************************************/
    public boolean getExamIsCanAnswer(Integer examId, String username);

    public void testJunit();

    /**************************************************************************
     * Description:考试-查询学生答题详情
     *
     * @author：黄浩
     * @date ：2018年5月21日
     **************************************************************************/
    public List<ExamDetailsVO> findTestDetail(Integer testId, String username, Integer gradingId, Integer currpage, Integer pageSize, Integer dictionary, String search);

    /**************************************************************************
     * Description 获取当前测试信息
     *
     * @author：黄浩
     * @date ：2018年5月21日
     **************************************************************************/
    public TAssignmentsVO findExamById(Integer examId, String username, Integer grading);

    /**************************************************************************
     * Description:考试-查询学生答题详情
     *
     * @author：黄浩
     * @date ：2018年5月21日
     **************************************************************************/
    public List<Map> findTestDetailMapping(Integer testId, String username);

    /**************************************************************************
     * Description 根据username和examId统计该学生的已提交考试题目个数
     *
     * @author 曹焕
     * @date 2018-10-15
     **************************************************************************/
    public Integer countTestamDetail(Integer examId, Integer gradingId, String username, Integer dictionary, String search);

    /**************************************************************************
     * Description:测验-查询学生答题详情
     *
     * @author：黄浩
     * @date ：2018年5月21日
     **************************************************************************/
    public List<ExamDetailsVO> findExamDetail(Integer examId, String username, Integer grading, Integer currpage, Integer pageSize,Integer dictionary);

    /**************************************************************************
     * Description:测验-查询学生答题详情
     *
     * @author：黄浩
     * @date ：2018年5月21日
     **************************************************************************/
    public List<Map> findExamDetailMapping(Integer examId, String username, Integer gradingId);

    /**************************************************************************
     * Description 根据examId统计该学生的已提交考试题目个数
     *
     * @author 曹焕
     * @date 2018-10-15
     **************************************************************************/
    public Integer countExamDetail(Integer examId,Integer dictionary);

    /**************************************************************************
     * Description 新建t_assignment_grading
     *
     * @author 黄浩
     * @date 2018年12月8日
     **************************************************************************/
    public Integer insertTAssignmentGrading(Integer assignmentId, Integer submitTime,UserVo userVo);

    /**************************************************************************
     * Description 保存pdf图片
     *
     * @author 黄浩
     * @date 2018年12月12日
     **************************************************************************/
    public String saveMarkingImage(String pdfDirector, Integer gradingId, Integer page, String imageString);

    /**************************************************************************
     * Description 生成pdf
     *
     * @author 黄浩
     * @date 2018年12月12日
     **************************************************************************/
    public String submitMarking(String pdfDirector, Integer gradingId, Integer siteId, String postUrl, UserVo userVo, Integer page);

    /**************************************************************************
     * Description 创建试卷并生成试卷
     *
     * @author lixueteng
     * @date 2017-09-12
     **************************************************************************/
    public Integer createExamPaper(int examId, String username);

    /**************************************************************************
     * Description 开始考试，组卷
     *
     * @author lixueteng
     * @date 2017-09-12
     **************************************************************************/
    public Integer createRandomExam(Integer examId, Integer examParentId, String username);

    /**************************************************************************
     * Description:考试-查询学生答题详情
     *
     * @author：黄浩
     * @date ：2018年5月21日
     **************************************************************************/
    public String findTestDetailMappingJson(Integer testId, String username);


    public boolean checkExamAvaliable(Integer examId, String username);

    public Integer getStudentExamSubmitTime(Integer examId, String username);

    public ExamResultForDyVo getExamResultDetail(Integer examId, String username, String accessScore);

    public BigDecimal saveTAssignmentItemMapping(Map<String, String[]> answerMap, Integer assignmentId, Integer submitTime, String username, Integer grading);

    public Integer saveTAssignmentGradeForTest(BigDecimal totalScore, Integer assignmentId, Integer submitTime, String username, Integer grading);

    String synchronizeAnswerDetails(Integer gradingId);

    /**************************************************************************
     * Description:考试-需手动打分的简答题
     *
     * @author：黄浩
     * @date ：2020年9月25日
     **************************************************************************/
    public List<ExamDetailsVO> findExamGradeItems(Integer testId, String username, Integer currpage, Integer pageSize);
    /**************************************************************************
     * Description:考试-需手动打分的简答题数量
     *
     * @author：黄浩
     * @date ：2020年9月25日
     **************************************************************************/
    public long countExamGradeItems(Integer testId, String username);
    /**************************************************************************
     * Description:考试-老师手动打分解答题
     *
     * @author：黄浩
     * @date ：2020年9月25日
     **************************************************************************/
    public boolean gradeItem(Integer itemId, Integer gradingId, Double score);
    /**************************************************************************
     * Description 开始考试，保存学生答题
     *
     * @author lixueteng
     * @date 2017-09-19
     **************************************************************************/
    public Integer saveTAssignmentGradeForTest1(Double totalScore, Integer assignmentId, String username, Integer gradingId);
    /**************************************************************************
     * Description:考试-查询学生答题详情
     *
     * @author：黄浩
     * @date ：2018年5月21日
     **************************************************************************/
    public List<TestSectionVO> findTestDetail(Integer testId, String username, Integer gradingId);
    /**************************************************************************
     * Description:考试-获取报告雷达图数据
     *
     * @author：黄浩
     * @date ：2021年1月5日
     **************************************************************************/
    public List<TestSectionVO> radarMapData(Integer testId, String username, Integer gradingId);

}
