package net.gvsun.gsexam.service.exam;

import net.gvsun.common.LayTableVO;
import net.gvsun.gsexam.dto.common.SchoolVo;
import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.vo.admit.AdmissionVo;
import net.gvsun.gsexam.vo.exam.ExamListVo;
import net.gvsun.gsexam.vo.exam.SchoolTermVO;
import net.gvsun.gsexam.vo.exam.TAssignmentGradingVO;
import net.gvsun.gsexam.vo.exam.TCourseSiteVo;

import java.util.List;

public interface ExamListService {

    /**************************************************************************
     * Description 查看已提交考试的成绩列表
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
    public List<ExamListVo> findExamList(int id, UserVo userVo, String authorityName, String type, Integer dictionary) ;
    /**************************************************************************
     * Description 查看补考名单
     *
     * @author 洪春莹
     * @date 2018-12-14
     **************************************************************************/
    public List<TAssignmentGradingVO> makeupExamStudentList(Integer examId,Integer siteId);
    /**************************************************************************
     * Description 查找考试成员列表
     * @author 洪春莹
     * @date 2018年12月17日
     **************************************************************************/
    public List<UserVo> findAllStudent(String username, String cname, Integer currpage);
    /**************************************************************************
     * Description 考试成员列表数量
     * @author 洪春莹
     * @date 2018年12月20日
     **************************************************************************/
    public Integer countStudentList(String username, String cname);

    /**************************************************************************
     * Description 保存补考名单添加的学生
     * @author 洪春莹
     * @date 2018-12-17
     **************************************************************************/
    public void saveStudentToExam(Integer examId, String[] username);

    /**************************************************************************
     * Description 站点动态获取
     *
     * @author 李雪腾
     * @date 2017-10-18
     * @return 站点集合
     **************************************************************************/
    public List<TCourseSiteVo> findAllTCourseSite(String search) ;
    LayTableVO<List<TCourseSiteVo>> findAllTCourseSitePage(Integer page, Integer limit, String search);
    /**************************************************************************
     *Description 查询全部站点
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    public List<TCourseSiteVo> findAllSite(String search) ;
    /**************************************************************************
     *Description 通过id查找站点
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    public TCourseSiteVo findCourseSiteById(Integer siteId);
    /**************************************************************************
     *Description 通过id查找学期
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    public SchoolTermVO findSchoolTermById(Integer termId);
    /**************************************************************************
     *Description 保存站点
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    public void saveTCourseSite(TCourseSiteVo tCourseSiteVo);
    /**************************************************************************
     *Description 保存学期
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    public void saveSchoolTerm(SchoolTermVO schoolTermVO) throws Exception;
    /**************************************************************************
     *Description 查找全部学期
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    public List<SchoolTermVO> findAllSchoolTerm();
    public List<UserVo> findAllTeacherByAuthor();
    /**************************************************************************
     * Description 查找所有已提交并已过时的考试
     *
     * @author 洪春莹
     * @date 2018-12-13
     **************************************************************************/
    public List<ExamListVo> findMakeUpExamList(Integer siteId) ;
    /*************************************************************************************
     * Description:个人信息
     *
     * @author： 洪春莹
     * @date：2019-3-11
     *************************************************************************************/
    public UserVo findUserByUserName(String userName);
    /*************************************************************************************
     * Description:保存个人信息
     *
     * @author： 洪春莹
     * @date：2019-3-12
     *************************************************************************************/
    public void saveUserInfo(UserVo userVo);
    /*************************************************************************************
     * Description:个人中心--保存个人照片
     *
     * @author： 黄浩
     * @date：2018-3-27
     *************************************************************************************/
    public void saveMyInfoPhoto(UserVo userVo, String fileid);
    /**************************************************************************
     * Description 个人中心-个人信息(图片删除)
     *
     * @author 曹焕
     * @date 2018年8月24日
     **************************************************************************/
    public  void deleteImg(String username);
    /*************************************************************************************
     * Description:证书信息
     *
     * @author： 洪春莹
     * @date：2019-3-14
     *************************************************************************************/
    public SchoolVo findSchoolByProjectName(String projectName);
    /*************************************************************************************
     * Description:保存证书信息
     *
     * @author： 洪春莹
     * @date：2019-3-14
     *************************************************************************************/
    public void saveCertificate(SchoolVo schoolVo, String projectName);
    /*************************************************************************************
     * Description:证书设置--保存公章照片
     *
     * @author： 洪春莹
     * @date：2019-3-18
     *************************************************************************************/
    public void saveSchoolPhoto(SchoolVo schoolVo, String fileid);
    /**************************************************************************
     *Description 证书设置-图片删除
     * @author 洪春莹
     * @date 2019年3月19日
     **************************************************************************/
    public void deleteSchoolImg(String projectName);
    /**************************************************************************
     * Description 查找未参加考试对象名单数量
     *
     * @author 刘博越
     * @date 2019-6-4
     **************************************************************************/
    public Integer countNotTakeExamList(Integer examId, String search,Integer cid);
    /**************************************************************************
     * Description 准考证数据
     *
     * @author 黄浩
     * @date 2020年11月3日
     **************************************************************************/
    public AdmissionVo admission(String username, Integer siteId, String apiGateWayHost, String datasource);
    /**************************************************************************
     * Description 准入列表
     *
     * @author 黄浩
     * @date 2020年11月3日
     **************************************************************************/
    public List<AdmissionVo> admissionList(Integer siteId, String search, String apiGateWayHost, String student, String datasource);
    /**************************************************************************
     * Description 学生考试汇总
     *
     * @author 黄浩
     * @date 2020年11月25日
     **************************************************************************/
    public List<ExamListVo> studentExams(String username, String type, String search, Integer page, Integer limit,Integer siteId);
    /**************************************************************************
     * Description 学生考试汇总数量
     *
     * @author 黄浩
     * @date 2020年11月25日
     **************************************************************************/
    public Integer countStudentExams(String username, String type, String search);

    /**
     * 判断考试能否删除，如果存在指向本考试的补考，则不能删除
     * @param assignmentId
     * @return
     */
    public Boolean examCanDelete(Integer assignmentId);
}
