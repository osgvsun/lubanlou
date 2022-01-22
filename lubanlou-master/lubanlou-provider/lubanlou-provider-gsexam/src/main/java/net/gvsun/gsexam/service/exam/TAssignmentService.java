package net.gvsun.gsexam.service.exam;

import net.gvsun.gsexam.dto.common.TAssignmentVo;
import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.dto.exam.CopyExamDTO;
import net.gvsun.gsexam.vo.exam.EditExamTAssignmentComponentVo;
import net.gvsun.gsexam.vo.exam.EditTestVo;
import net.gvsun.gsexam.vo.exam.ViewExamVo;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface TAssignmentService {

    /**************************************************************************
     * Description 查看考试内容列表
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
    public TAssignmentVo findExamList(HttpServletRequest request, UserVo user, TAssignmentVo exam);

    /**************************************************************************
     * Description 根据id查找考试试题构成情况页面Vo
     *
     * @author 罗璇
     * @date 2017-09-01
     **************************************************************************/
    public List<EditExamTAssignmentComponentVo> findTAssCompVoList(Integer assignmentId);

    /**************************************************************************
    * @Description: 保存考试返回考试ID
    * @Author: 罗璇
    * @Date: 2017/10/8 19:41
    **************************************************************************/
    public Integer saveTest(EditTestVo editTestVo, String username, Integer tCourseSiteId, String projectName);

    /**************************************************************************
     * Description 保存考试对应的班级到考试班级关系表
     * @author 洪春莹
     * @date 2018-12-11
     **************************************************************************/
    public void saveTAssignmentClass(Integer tAssignmentId, String[] schoolClasses);

    /**************************************************************************
     * Description 保存考试对应的学院到考试学院关系表（和考试班级关系表共用）
     * @author 洪春莹
     * @date 2019-4-23
     **************************************************************************/
    public void saveTAssignmentAcademy(Integer tAssignmentId, String[] schoolAcademy);


    /**************************************************************************
    * @Description: 根据作业测验或考试创建成绩册及成绩单
    * @Author: 罗璇
    * @Date: 2017/10/10 15:58
    **************************************************************************/
    public void createGradebook(Integer tCourseSiteId, Integer tAssignmentId, Integer testChapterType, Integer testChapterId);

    /**************************************************************************
     * Description 查找编辑考试内容
     * @Author 张佳鸣
     * @ate 2017-12-18
     **************************************************************************/
    public EditTestVo findEditTestVoById(Integer tAssignmentId, String projectName);

    /**************************************************************************
     * Description 删除考试
     * @Author 张佳鸣
     * @ate 2017-12-20
     **************************************************************************/
    public void deleteExam(Integer tAssignmentId);
    /**************************************************************************
     * Description 根据学院查找所有班级
     * @Author 刘博越
     * @ate 2019-3-7
     **************************************************************************/
    public String[] findAllClassByAcademyId(String academyNumber);
    /**************************************************************************
     * Description 查找查看考试内容
     * @Author 刘博越
     * @ate 2019-5-28
     **************************************************************************/
    public ViewExamVo findViewExamVoById(Integer tAssignmentId, String projectName);
    /**************************************************************************
     * Description 根据id查找考试名称
     * @Author 曹焕
     * @ate 2019-6-19
     **************************************************************************/
    public String findTAssignmentById(Integer id);
    /**************************************************************************
     * Description:生成考试/测试二维码
     *
     * @author：洪春莹
     * @date ：2019年5月21日
     **************************************************************************/
    public String encodeByExamId(String examId);
    /**************************************************************************
     * Description:二维码图片上传到文件服务器
     *
     * @author：吴奇臻
     * @date ：2019年8月5日
     **************************************************************************/
    public void saveExamQRcode(String examId, String fileName);
    /**************************************************************************
     * Description:获取考试题目
     *
     * @author：黄浩
     * @date ：2020年10月22日
     **************************************************************************/
    public CopyExamDTO getExamDetail(Integer examId);
    /**************************************************************************
     *Description 生成考试
     * @author 黄浩
     * @date 2020年10月20日
     **************************************************************************/
    public boolean copyExam(Integer sourceTestId, Integer targetSiteId, CopyExamDTO copyExamDTO);
    /**************************************************************************
     * Description 根据学院查找所有班级（去除教师班级）
     * @Author 刘博越
     * @ate 2019-3-7
     **************************************************************************/
    public String findAllClassByAcademyIdStr(String academyNumber);
}
