package net.gvsun.gsexam.service.exam;


import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.vo.exam.ExamInfoVo;
import net.gvsun.gsexam.vo.layui.LayuiDataVo;

import java.util.List;
import java.util.Map;

/**
 * Created by 李雪腾 on 2017/9/26 0026.
 */

public interface ExamGradingService {
    /**************************************************************************
     * Description 开始考试，获取考试的记录
     *
     * @author lixueteng
     * @date 2017-09-26
     **************************************************************************/
    public List<Map> getTAssignmentItemMapping(Integer examId, UserVo userVo);


    /**************************************************************************
     * Description 开始考试，获取考试的记录的成绩
     *
     * @author lixueteng
     * @date 2017-09-26
     **************************************************************************/
    public Integer  findTAssignmentGradingByTestIdAndUser(Integer examId, UserVo userVo);
    /**************************************************************************
     * Description 开始考试，获取当前考试的详情
     *
     * @author lixueteng
     * @date 2017-10-17
     **************************************************************************/
    public ExamInfoVo findExamInfo(Integer examId, UserVo userVo);
    /**************************************************************************
     * Description 开始考试，获取当前考试的学生成绩列表
     *
     * @author lixueteng
     * @date 2017-10-18
     **************************************************************************/
    public List<LayuiDataVo> findExamGradingList(Integer examId, String authorityName, Integer currpage, Integer pageSize, String projectName, String search,String username);
    /**************************************************************************
     * Description 获取当前考试未参加考试学生列表（普通考试）
     *
     * @author 刘博越
     * @date 2019-6-3
     **************************************************************************/
    public List<LayuiDataVo> findNotTakeExamList(Integer examId, Integer currpage, Integer pageSize, String search,Integer cid);

    /**
     * 获取当前考试未参加考试学生列表数量（普通考试）
     * @param examId
     * @param search
     * @param cid
     * @return
     */
    public Integer countNotTakeExamList(Integer examId,String search,Integer cid);

    /**
     * 获取当前考试未参加考试学生列表(全校考试)
     * @param examId
     * @param currpage
     * @param pageSize
     * @param search
     * @return
     */
    public List<LayuiDataVo> findNotTakeExamListAllSchool(Integer examId, Integer currpage, Integer pageSize, String search);

    /**
     * 获取当前考试未参加考试学生列表(全校考试)
     * @param examId
     * @param search
     * @return
     */
    public Integer countNotTakeExamListAllSchool(Integer examId,String search);
    /**************************************************************************
     * Description 学生成绩列表数量
     * @author 洪春莹
     * @date 2018年12月20日
     **************************************************************************/
    public Integer countExamGradingList(Integer examId, String username, String authorityName, String search);
    /**************************************************************************
     * Description 导出成绩单
     *
     * @author 洪春莹
     * @date 2018年12月19日
     **************************************************************************/
    public byte[] exportGradeList(Integer examId);
    /**************************************************************************
     * Description 获取当前考试的学生成绩列表
     *
     * @author 洪春莹
     * @date 2018-12-20
     **************************************************************************/
    public List<LayuiDataVo> findAllExamGradingById(Integer examId);


    public List<Map> getTAssignmentItemMapping(Integer examId, String username);
    public Integer  findTAssignmentGradingByTestIdAndUser(Integer examId, String username);
    /**************************************************************************
     * Description:测验-根据测验id和user查询学生的测验提交情况
     *
     * @author：裴继超
     * @date ：2017-1-4
     **************************************************************************/
    public List<LayuiDataVo> findTestGradingList(Integer examId, String authorityName, UserVo userVo, Integer page, Integer limit, String search);
    /**************************************************************************
     * Description:是否合格（中医院）
     *
     * @author：黄浩
     * @date ：2020年12月24日
     **************************************************************************/
    public boolean isPass(String username);
    /**************************************************************************
     * Description 保存机构报告上传、专家报告上传接口
     *
     * @author 黄浩
     * @date 2020年12月28日
     **************************************************************************/
    public boolean saveReport(Integer gradingId, String fileName, String fileId, Integer type, String username);
    /**************************************************************************
     * Description 获取机构报告id、专家报告上传id
     *
     * @author 黄浩
     * @date 2020年12月28日
     **************************************************************************/
    public Long getReportId(Integer gradingId, Integer type);
    /**************************************************************************
     * Description 查看学生成绩在第几位
     *
     * @author 黄浩
     * @date 2021年1月4日
     **************************************************************************/
    public int sortScore(Integer examId, String student);
    /**************************************************************************
     * Description 学生免考
     *
     * @author 黄浩
     * @date 2021年1月18日
     **************************************************************************/
    public void examFree(Integer examId, String[] students, String username);
}
