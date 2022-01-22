package net.gvsun.gsexam.service.common;

import net.gvsun.gsexam.dto.common.AuthorityVo;
import net.gvsun.gsexam.dto.common.DataResourceVO;
import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.vo.exam.TCourseSiteVo;
import net.gvsun.gsexam.vo.layui.LayuiDataVo;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
     * Description 通用模块-分页展示信息
     *
     * @author lixueteng
     * @date 2017-09-21
     **************************************************************************/
    public Map<String, Integer> getPage(int currpage, int pageSize, int totalRecords);

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
     * Description:作业-生成pdf
     *
     * @author：裴继超
     * @date ：2017-3-20
     **************************************************************************/
    public File Pdf(ArrayList<String> imageUrllist, String mOutputPdfFileName);

    /**************************************************************************
     * Description:获得文件夹内文件的个数。
     *
     * @author：黄浩
     * @date ：2018年12月27日
     **************************************************************************/
    public long getFileSize(File f);

    /**************************************************************************
     * Description 根据课程siteId和username判断改用户是否存在于课程中
     *
     * @author 曹焕
     * @date 2018年12月05日
     * @param siteId
     **************************************************************************/
    public boolean findTCourseSitesBySiteIdAndUsername(Integer siteId, String username);

    public Boolean changeDataResource(String dataSource);

    public List<DataResourceVO> findAllDataResource();

    /**************************************************************************
     * @Description 浙江外国语统一身份认证通过身份证号码查找用户
     * @author 张德冰
     * @date 2019-05-14
     **************************************************************************/
    public UserVo getUserByMasterMajor(String username);

    /***********************************************************************************************
     * @功能：通用模塊service層定義-处理中文乱码
     * @作者：彭文玉
     * @日期：2014-07-27
     ***********************************************************************************************/
    public String htmlEncode(String str);

    /***********************************************************************************************
     * @功能：查找班级成员
     * @作者：刘博越
     * @日期：2019-05-30
     ***********************************************************************************************/
    public List<UserVo> findStudentByClassNumber(String classNumber);

    public String findStageMangeByType();

    public AuthorityVo initializeRole(Integer cid, String username);

    /************************************************************************
     *@Description:切换用户课程中角色
     *@Author:黄浩
     *@Date:2018/8/1
     ************************************************************************/
    public void changeSiteRole(Integer authId, Integer siteId, String username);
    /************************************************************************
     *@Description:获取全校考试这门课程的Id
     *@Author:黄浩
     *@Date:2020年10月27日
     ************************************************************************/
    public Integer specialSite();
    /************************************************************************
     *@Description:获取用户课程中所有角色
     *@Author:黄浩
     *@Date:2018/8/1
     ************************************************************************/
    public List<AuthorityVo> getAllAuthInSite(String manageId, String username);
    /************************************************************************
     *@Description:通过课程id查找课程
     *@Author:fubowen
     *@Date:2020-12-21
     ************************************************************************/
    public TCourseSiteVo findTCourseSiteBySiteId(Integer siteId);
    /**************************************************************************
     * Description 分页获取没通过考试的学生名单（包括未参加考试和成绩不合格）
     *
     * @author 黄浩
     * @date 2021年1月18日
     * @param siteId
     **************************************************************************/
    public List<LayuiDataVo> findNotPassStudents(Integer siteId, Integer page, Integer limit, String search,Integer assignmentId);

    /**
     * 获取没通过考试的学生名单数量
     * @param siteId
     * @param search
     * @param assignmentId
     * @return
     */
    public Integer countNotPassStudents(Integer siteId, String search,Integer assignmentId);
    /**************************************************************************
     * Description 获取全校课程的课程用户（根据t_assignment_class表）
     *
     * @author fubowen
     * @date 2021-3-22
     **************************************************************************/
    public List<LayuiDataVo> findSiteStudentAllSchool(Integer page, Integer limit, String search,Integer examId);
    /**************************************************************************
     * Description 获取课程用户数量
     *
     * @author 黄浩
     * @date 2021年1月18日
     * @param siteId
     **************************************************************************/
    public int countSiteStudent(Integer siteId,String search);
}