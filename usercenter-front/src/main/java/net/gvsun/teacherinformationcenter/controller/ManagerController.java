package net.gvsun.teacherinformationcenter.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Controller
@RequestMapping("/manager")
public class ManagerController {
    @Value("${delegation}")
    private boolean delegation;

    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHost;

    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHostForUpload;

    @Value("${oauth2Host}")
    private String oauth2Host;

    /**
     * 用户管理
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "/userManagement", method = {RequestMethod.GET})
    public String login(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/userManagement";
    }

    /**
     * 个人基本情况
     *
     * @return
     */
    @RequestMapping(value = "/personalInfo", method = {RequestMethod.GET})
    public String personalInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/personalInfo";
    }

    /**
     * 教育背景及工作履历
     *
     * @return
     */
    @RequestMapping(value = "/educationInfo", method = {RequestMethod.GET})
    public String educationInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/educationInfo";
    }

    /**
     * 教学相关
     *
     * @return
     */
    @RequestMapping(value = "/teachingRelated", method = {RequestMethod.GET})
    public String teachingRelated(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/teachingRelated";
    }

    /**
     * 科研相关
     *
     * @return
     */
    @RequestMapping(value = "/scientificResearch", method = {RequestMethod.GET})
    public String scientificResearch(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/scientificResearch";
    }

    /**
     * 代表作
     *
     * @return
     */
    @RequestMapping(value = "/masterResearch", method = {RequestMethod.GET})
    public String masterResearch(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/masterResearch";
    }

    /**
     * 人员管理
     *
     * @return
     */
    @RequestMapping(value = "/systemPersonManage", method = {RequestMethod.GET})
    public String systemPersonManage(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/systemPersonManage";
    }

    /**
     * 权限管理
     *
     * @return
     */
    @RequestMapping(value = "/systemRoleManage", method = {RequestMethod.GET})
    public String systemRoleManage(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/systemRoleManage";

    }
    /*
     * 授权管理
     * @param
     * */

    @RequestMapping(value = "/warrant", method = {RequestMethod.GET})
    public String warrant(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/warrant";
    }
    /*
     * 系统日志
     * @param
     * */

    @RequestMapping(value = "/systemJournal", method = {RequestMethod.GET})
    public String systemeJournal(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/systemJournal";
    }


    /**
     * 企业用户管理
     *
     * @return
     */
    @RequestMapping(value = "/enterpriseInfo", method = {RequestMethod.GET})
    public String enterpriseList(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/enterpriseInfo";
    }

    /**
     * 事业单位管理
     *
     * @return
     */
    @RequestMapping(value = "/GSIInfo", method = {RequestMethod.GET})
    public String GSIList(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/GSIInfo";
    }
    /*
     * 权限详情
     * @param
     * */

    @RequestMapping(value = "/tabContent/roleDetail", method = {RequestMethod.GET})
    public String roleDetail(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/roleDetail";
    }
    /*
     * 授权详情
     * @param
     * */

    @RequestMapping(value = "/tabContent/warrantDetail", method = {RequestMethod.GET})
    public String warrantDetail(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/warrantDetail";
    }

    /**
     * 系统配置
     *
     * @return
     */
    @RequestMapping(value = "/AuthorityMenusManage/AuthorityMenus", method = {RequestMethod.GET})
    public String AuthorityMenus(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/AuthorityMenusManage/AuthorityMenus";
    }
    /*
     * 菜单栏目配置
     * @param
     * */
    @RequestMapping(value = "/tabContent/AuthorityMenuManage", method = {RequestMethod.GET})
    public String AuthorityMenuManage(HttpServletRequest request, HttpServletResponse response, Map<String, Object> map) {
        map.put("delegation", delegation);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/AuthorityMenuManage";
    }
    /*
     * 管理员个人基本情况详情
     * @param
     * */
    @RequestMapping(value = "/tabContent/personInfo/basicInfo", method = {RequestMethod.GET})
    public String basicInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/personInfo/basicInfo";
    }

    @RequestMapping(value = "/tabContent/personInfo/enterpriseInfo", method = {RequestMethod.GET})
    public String enterpriseInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/personInfo/enterpriseInfo";
    }

    @RequestMapping(value = "/tabContent/personInfo/GSIInfo", method = {RequestMethod.GET})
    public String GSIInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/personInfo/GSIInfo";
    }

    @RequestMapping(value = "/tabContent/personInfo/unitEnterpriseUser", method = {RequestMethod.GET})
    public String UnitEnterpriseUser(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/personInfo/unitEnterpriseUser";
    }

    @RequestMapping(value = "/tabContent/personInfo/postInfo", method = {RequestMethod.GET})
    public String postInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/personInfo/postInfo";
    }

    @RequestMapping(value = "/tabContent/personInfo/academicInfo", method = {RequestMethod.GET})
    public String academicInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/personInfo/academicInfo";
    }

    @RequestMapping(value = "/tabContent/personInfo/administrationInfo", method = {RequestMethod.GET})
    public String administrationInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/personInfo/administrationInfo";
    }

    @RequestMapping(value = "/tabContent/personInfo/talentInfo", method = {RequestMethod.GET})
    public String talentInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/personInfo/talentInfo";
    }

    @RequestMapping(value = "/tabContent/personInfo/tutorInfo", method = {RequestMethod.GET})
    public String tutorInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/personInfo/tutorInfo";
    }
    @RequestMapping(value = "/tabContent/personInfo/personnelCategory", method = {RequestMethod.GET})
    public String personnelCategory(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/personInfo/personnelCategory";
    }
    /*
     * 教学相关详情
     * @param
     * */
    @RequestMapping(value = "/tabContent/teachingInfo/eduProjectInfo", method = {RequestMethod.GET})
    public String eduProjectInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/teachingInfo/eduProjectInfo";
    }

    @RequestMapping(value = "/tabContent/teachingInfo/eduawardInfo", method = {RequestMethod.GET})
    public String eduawardInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/teachingInfo/eduawardInfo";
    }

    @RequestMapping(value = "/tabContent/teachingInfo/textbookPublishInfo", method = {RequestMethod.GET})
    public String textbookPublishInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/teachingInfo/textbookPublishInfo";
    }
    /*
     * 教育背景详情
     * @param
     * */

    @RequestMapping(value = "/tabContent/educationInfo/edubgInfo", method = {RequestMethod.GET})
    public String edubgInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/educationInfo/edubgInfo";
    }

    @RequestMapping(value = "/tabContent/educationInfo/trainExperienceInfo", method = {RequestMethod.GET})
    public String trainExperienceInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/educationInfo/trainExperienceInfo";
    }

    @RequestMapping(value = "/tabContent/educationInfo/workHistoryInfo", method = {RequestMethod.GET})
    public String workHistoryInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/educationInfo/workHistoryInfo";
    }
    /*
     * 代表作详情
     * @param
     * */
    @RequestMapping(value = "/tabContent/masterResearch/authorizedPatentInfo", method = {RequestMethod.GET})
    public String authorizedPatentInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/masterResearch/authorizedPatentInfo";
    }

    @RequestMapping(value = "/tabContent/masterResearch/masterWorkInfo", method = {RequestMethod.GET})
    public String masterWorkInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/masterResearch/masterWorkInfo";
    }
    /*
     * 科研相关详情
     * @param
     * */

    @RequestMapping(value = "/tabContent/scientificResearch/horizontalSubjectInfo", method = {RequestMethod.GET})
    public String horizontalSubjectInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/scientificResearch/horizontalSubjectInfo";
    }

    @RequestMapping(value = "/tabContent/scientificResearch/longitudinalSubjectInfo", method = {RequestMethod.GET})
    public String longitudinalSubjectInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/scientificResearch/longitudinalSubjectInfo";
    }

    @RequestMapping(value = "/tabContent/scientificResearch/publicationInfo", method = {RequestMethod.GET})
    public String publicationInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/scientificResearch/publicationInfo";
    }

    @RequestMapping(value = "/tabContent/scientificResearch/researchAwardInfo", method = {RequestMethod.GET})
    public String researchAwardInfo(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/tabContent/scientificResearch/researchAwardInfo";
    }
    /*
     * 图表统计页面
     * @param
     * */
    @RequestMapping(value = "/echart", method = {RequestMethod.GET})
    public String echart(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/echart";
    }
    /*
     * 管理员网站师资队伍页面配置
     * @param
     * @author 陈青
     * @date 2019/7/24
     * */
    @RequestMapping(value = "/websiteConfig", method = {RequestMethod.GET})
    public String websiteConfig(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/websiteConfig";
    }

    /*
     * 管理员人才称号管理
     * @param
     * @author 陈青
     * @date 2019/9/24
     * */
    @RequestMapping(value = "/phenomMenuManage/phenomMenuList", method = {RequestMethod.GET})
    public String phenomMenuList(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/phenomMenuManage/phenomMenuList";
    }
    /*
     * 管理员部门管理
     * @param
     * @author 陈青
     * @date 2019/10/56
     * */
    @RequestMapping(value = "/DepartmentManage/department", method = {RequestMethod.GET})
    public String department(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/DepartmentManage/department";
    }
    /*
     * 注册审核
     * @param
     * @author 陈青
     * @date 2019/10/31
     * */
    @RequestMapping(value = "/audit", method = {RequestMethod.GET})
    public String registerAudit(Map<String, String> map) {
        map.put("oauth2Host",oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/audit";
    }

    /*
     * 注册审核
     * @param
     * @author 任健坤
     * @date 2020/03/30
     * */
    @RequestMapping(value = "/EAG_audit", method = {RequestMethod.GET})
    public String EAGRegisterAudit(Map<String, String> map) {
        map.put("oauth2Host",oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/EAG_audit";
    }

    /*
     * 管理员学院维护
     * @param
     * @author 魏好
     * @date 2020/4/1
     * */
    @RequestMapping(value = "/collegeMaintenance", method = {RequestMethod.GET})
    public String collegeMaintenance(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/collegeMaintenance";
    }

    @RequestMapping(value = "/peopleState",method = {RequestMethod.GET})
    public  String peopleState(Map<String,String> map){
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/peopleState";
    }
    @RequestMapping(value = "/teacherPersonManage", method = {RequestMethod.GET})
    public String teacherPersonManage(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/teacherPersonManage";
    }
    /**
     * 服务条款
     *
     * @return
     */
    @RequestMapping(value = "/TOS", method = {RequestMethod.GET})
    public String TOSList(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/TOS";
    }
    /**
     * 注册审核查看详情
     *
     * @return
     */
    @RequestMapping(value = "/EAG_details", method = {RequestMethod.GET})
    public String EAGDetails(Map<String, String> map) {
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/manager/EAG_details";
    }

}
