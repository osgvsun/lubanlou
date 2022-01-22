package net.gvsun.gsexam.service.exam;

import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.dto.exam.login.SubScribeExamDto;
import net.gvsun.gsexam.vo.exam.ExamSubScribeVo;
import net.gvsun.gsexam.vo.exam.SubScribeStudentVo;

import java.util.List;

/**************************************************************************
 * Description:预约考试的service
 *
 * @author:lixueteng
 * @date:2017/10/24 0024
 **************************************************************************/
public interface ExamSubScribeService {
    /**************************************************************************
     * Description:保存预约考试
     *
     * @author:lixueteng
     * @date:2017/10/24 0024
     * @param subScribeExamDto 要保存的预约考试的dto
     * @param userVo 当前登录人
     **************************************************************************/
    public void saveSubScribeExam(SubScribeExamDto subScribeExamDto, UserVo userVo);
    /**************************************************************************
     * Description:获取预约考试列表
     *
     * @author:lixueteng
     * @date:2017/10/24 0024
     * @param userVo 当前登录人
     * @return 预约考试列表
     **************************************************************************/
    public List<ExamSubScribeVo> getSubScribeExamList(UserVo userVo);
    /**************************************************************************
     * Description:获取预约考试列表
     *
     * @author:lixueteng
     * @date:2017/10/25 0024
     * @param userVo 当前登录人
     * @param subScribeExamId 预约考试的id
     * @param page 当前页
     * @param limit 每页数量限制
     * @return 已经预约考试的学生列表
     **************************************************************************/
    public List<SubScribeStudentVo> getSubScribeExamStudentList(Integer subScribeExamId, UserVo userVo, Integer page, Integer limit);
    /**************************************************************************
     * Description:学生点击开始预约
     *
     * @author:lixueteng
     * @date:2017/10/25 0024
     * @param userVo 当前登录人
     * @param subScribeExamId 预约考试的id
     **************************************************************************/
    public void startSubScribeExam(Integer subScribeExamId, UserVo userVo);
    /**************************************************************************
     * Description:学生点击取消预约
     *
     * @author:lixueteng
     * @date:2017/10/26 0024
     * @param userVo 当前登录人
     * @param subScribeExamId 预约考试的id
     **************************************************************************/
    public void cancelSubScribeExam(Integer subScribeExamId, UserVo userVo);
    /**************************************************************************
     * Description:设置当前预约考试状态是否可用
     *
     * @author:lixueteng
     * @date:2017/10/26 0024
     * @param subScribeExamId 预约考试的id
     * @param status 想要设置的状态
     **************************************************************************/
    public void setSubScribeExamStatus(Integer subScribeExamId, Integer status);
    /**************************************************************************
     * Description:判断是否还有剩余预约的名额
     *
     * @author:lixueteng
     * @date:2017/10/31 0024
     * @param subScribeExamId 预约考试的id
     * @return 是否有名额
     **************************************************************************/
    public boolean setSubScribeExamStatus(Integer subScribeExamId);
    /**************************************************************************
     * Description:添加标题判重
     *
     * @author：徐烺
     * @date ：2018年9月5日
     **************************************************************************/

    String checkTitle(String title, Integer id, Integer type, boolean isChapter);


    public List<ExamSubScribeVo> getSubScribeExamList(String username);
}
