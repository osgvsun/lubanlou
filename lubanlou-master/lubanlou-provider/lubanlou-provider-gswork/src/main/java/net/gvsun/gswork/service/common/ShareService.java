package net.gvsun.gswork.service.common;

import net.gvsun.common.KafkaDTO;
import net.gvsun.common.LayTableVO;
import net.gvsun.gswork.domain.TAssignmentGrading;
import net.gvsun.gswork.vo.ExperimentSkillVO;
import net.gvsun.gswork.vo.WkChapterVO;
import net.gvsun.gswork.vo.WkLessonVO;
import net.gvsun.gswork.vo.common.AuthorityVo;
import net.gvsun.gswork.vo.common.CourseInfoVO;
import net.gvsun.gswork.vo.common.TCourseSiteVo;
import net.gvsun.gswork.vo.common.UserVo;
import net.gvsun.gswork.vo.courseInfo.CourseTableTopDateInfoVO;
import net.gvsun.gswork.vo.courseInfo.DoubleClassCourseInfoVO;
import net.gvsun.resource.dto.ResourceFileDto;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.PatternSyntaxException;

public interface ShareService {

    /**************************************************************************
     * Description 通用模块-获取登录用户信息
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
    public UserVo getUser();

    /**************************************************************************
     * Description 通用模块-根据username获取用户信息
     *
     * @author 魏诚
     * @date 2017-08-16
     **************************************************************************/
    public UserVo getUserByUsername(String username);

    /***********************************************************************************************
     * Description ：通用模塊service層定義-修改登录的角色
     *
     * @作者：魏诚
     * @日期：2016-11-17
     ***********************************************************************************************/
    public void changeRole(final String authorityName);

    /**************************************************************************
     * Description 通用模块-根据authorityName获取權限信息
     *
     * @author 魏诚
     * @date 2017-08-16
     **************************************************************************/
    public AuthorityVo getAuthorityByName(String authorityName);

    /**************************************************************************
     * Description 通用模块-获取当前權限信息，如果当前未有权限信息，则默认当前第一个权限
     *
     * @author 魏诚
     * @date 2017-08-16
     **************************************************************************/
    public AuthorityVo getCurrAuthorityByName(Object authorityName);


    /**************************************************************************
     * Description 根据用户名获取用户权限信息
     *
     * @author 罗璇
     * @date 2017年10月26日
     **************************************************************************/
    public List<AuthorityVo> findAuthByUsername(String username);

    /**************************************************************************
     * Description 根据权限名获取权限信息
     *
     * @author 罗璇
     * @date 2017年10月26日
     **************************************************************************/
    public AuthorityVo findAuthVoByAuthId(Integer authId);

    /**************************************************************************
     * Description 获取所有教师
     *
     * @author 杨礼杰
     * @date 2018年3月7日
     **************************************************************************/
    public List<UserVo> findUserByRole();

    /**************************************************************************
     * Description 获取权限（老师还是学生）
     *
     * @author 马帅
     * @date 2017年3月6日
     **************************************************************************/
    public Integer getFlagByUserAndSite(UserVo userVo, CourseInfoVO courseInfoVO);


    /*
     * 处理中文乱码 作者：彭文玉
     */

    public String htmlEncode(String str);

    /**************************************************************************
     * Description 根据用户名获取用户系统权限权限信息
     *
     * @author 黄浩
     * @date 2018年8月2日
     **************************************************************************/
    public List<AuthorityVo> findSystemAuthByUsername(String username);

    /**************************************************************************
     * Description 根据用户名获取用户站点权限权限信息
     *
     * @author 黄浩
     * @date 2018年8月2日
     **************************************************************************/
    public List<AuthorityVo> findSiteAuthByUsername(String username);

    /**************************************************************************
     * Description 文件下载次数+1
     *
     * @author 黄浩
     * @date 2018年10月31日
     **************************************************************************/
    public void fileDownloadTimes(Integer id);

    /**************************************************************************
     * Description:作业-生成pdf
     *
     * @author：裴继超
     * @date ：2017-3-20
     **************************************************************************/
    public File Pdf(ArrayList<String> imageUrllist, String mOutputPdfFileName, TAssignmentGrading tAssignmentGrading);

    /**************************************************************************
     * 删除有文件的目录
     *
     * @author：黄浩
     * @date: 2018年12月13日
     **************************************************************************/
    public boolean deleteDir(File dir);

    /**************************************************************************
     * 过滤特殊字符
     *
     * @author：黄浩
     * @date: 2018年12月26日
     **************************************************************************/
    public String StringFilter(String str) throws PatternSyntaxException;

    /**************************************************************************
     * Description 解析文件
     *
     * @author 洪春莹
     * @date 2019年5月10日
     **************************************************************************/
    public String getMiniToken(@RequestParam String url, int ts, String key) throws Exception;


    /**
     * 获取当前用户
     *
     * @return
     */
    UserVo getCurrUser();

    /**
     * 添加至redis和cookie
     *
     * @param response
     * @param token
     */
    public void addCookie(HttpServletResponse response, String token);
    /**************************************************************************
     * Description 站点动态获取
     *
     * @author 李雪腾
     * @date 2017-10-18
     * @return 站点集合
     **************************************************************************/
    public LayTableVO<List<TCourseSiteVo>> findAllTCourseSite(Integer page, Integer limit, String search);
    /**************************************************************************
     * Description 课程章节数据
     *
     * @author 黄浩
     * @date 2021年3月2日
     **************************************************************************/
    public List<WkChapterVO> chapterList(Integer cid, Integer moduleType);
    /**************************************************************************
     * Description 小节数据
     *
     * @author 黄浩
     * @date 2021年3月2日
     **************************************************************************/
    public List<WkLessonVO> lessonList(Integer chapterId);
    /************************************************************************
     *@Description:获取某用户在课程当前的角色
     *@Author:黄浩
     *@Date:2018/8/1
     ************************************************************************/
    public List<Integer> getCurrentAuthInSite(String manageId, String username);
    /************************************************************************
     *@Description:获取用户课程中所有角色
     *@Author:黄浩
     *@Date:2018/8/1
     ************************************************************************/
    public List<AuthorityVo> getAllAuthInSite(String manageId, String username);
    /************************************************************************
     *@Description:切换用户课程中角色
     *@Author:黄浩
     *@Date:2018/8/1
     ************************************************************************/
    public void changeSiteRole(Integer authId, Integer siteId, String username);

    public  List<List<String>> subStringList(List<String> list, int toIndex);

    /**
     * 获取文件列表
     */
    public List<ResourceFileDto> getFilesByIds(Long[] ids);
    /************************************************************************
     *@Description:获取课程下所有实验项目
     *@Author:fubowen
     *@Date:2021-7-28
     ************************************************************************/
    List<ExperimentSkillVO> getAllExpProjectInSite(Integer siteId);
    /************************************************************************
     *@Description:获取章绑定实验项目
     *@Author:fubowen
     *@Date:2021-7-29
     ************************************************************************/
    ExperimentSkillVO getExpProjectByChapterId(Integer chapterId);
    /**************************************************************************
     * Description 获取当前周
     *
     * @author 李雪腾
     * @date 2017-10-18
     * @return 站点集合
     **************************************************************************/
    public Integer getCurrWeek(Integer cid);
    /**************************************************************************
     * Description 获取当前课程的所有周
     *
     * @author qxr
     * @date 2018-8-10
     * @return 站点里的周次集合
     **************************************************************************/
    public List<Integer> getWeekList(Integer cid);
    /************************************
     * 功能：更具weekid获取课表顶部栏信息
     * 作者：lixueteng
     * 日期：2018-02-02
     *************************************/
    public List<CourseTableTopDateInfoVO> getCourseTableTopInfo(Integer cid, Integer weekId);
    /************************************
     * 功能：获取课表信息
     * 作者：Hezhaoyi
     * 日期：2020-3-2
     *************************************/
    public List<DoubleClassCourseInfoVO> getCourseInfoNew(Integer cid, Integer weekId);
    /**
     * 新版发送消息
     * @author 曹焕
     * @date 2021-5-21
     */
    public void sendMessageNew(KafkaDTO kafkaDTO);
}
