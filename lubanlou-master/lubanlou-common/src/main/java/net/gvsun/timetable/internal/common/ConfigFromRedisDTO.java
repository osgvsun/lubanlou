package net.gvsun.timetable.internal.common;

import lombok.Data;
import net.gvsun.timetable.internal.user.AuthorityDTO;

import java.util.List;

/**
*  Description
*
*  @author weicheng
*  @date 2021/2/18 15:42
*/
@Data
public class ConfigFromRedisDTO {
    private String projectName;
    private SelectBySchoolDTO school;
    private boolean annexManage;
    private boolean softManage;
    private boolean baseManage;
    private int advanceCancelTime;
    private boolean jobReservation;
    private boolean deviceLend;
    private boolean stationNum;
    private boolean cmsAccess;
    private boolean userOperation;
    private boolean showroom;
    private boolean yuntai;
    private boolean labAddAdim;
    private boolean eduDirect;
    private boolean eduAjust;
    private boolean eduBatch;
    private boolean eduNoBatch;
    private boolean selfBatch;
    private boolean selfNoBatch;
    private boolean materialConfigYC;
    private String newServer;
    private String noREC;
    private String authTimetableType;
    private String professorIntroductionUrl;
    private String backToCms;
    private String cms;
    private boolean virtual;
    private String virtualCallBackUrl;
    private String messageServiceUrl;
    private String messageProject;
    private String operationItemName;
    private String refuseTitle;
    private String selfRefuseTitle;
    private String crossAcademyActionAuth;
    private boolean protocolType;
    private boolean batchMaintenance;
    private boolean peopleApplyReceive;
    //是否重定向排课页面(只在公司使用,学校配置为false)
    public boolean timetableTest;
    private List<AuthorityDTO> peopleApplyReceiveAuthority;
    //实验项目字段是否展示字段开始
    /**
     * 学期id
     */
    private boolean showTerm;

    /**
     * 所属实验室id
     */
    private boolean showLab;

    /**
     * 学科编号
     */
    private boolean showSubject;

    /**
     * 实验要求
     */
    private boolean showCategoryRequire;

    /**
     * 实验学时数
     */
    private boolean showDepartmentHours;

    /**
     * 课程总学时
     */
    private boolean showCourseHoursTotal;


    /**
     * 实验总人数
     */
    private boolean showStudentNumber;

    /**
     * 实验组数
     */
    private boolean showSetNumber;

    /**
     * 每组人数
     */
    private boolean showStudentNumberGroup;

    /**
     * 实验类别
     */
    private boolean showCategoryMain;

    /**
     * 实验类型
     */
    private boolean showCategoryApp;

    /**
     * 实验性质
     */
    private boolean showCategoryNature;

    /**
     * 实验者类型
     */
    private boolean showCategoryStudent;

    /**
     * 变动状态
     */
    private boolean showStatusChange;

    /**
     * 开放范围
     */
    private boolean showCategoryPublic;

    /**
     * 获奖等级
     */
    private boolean showCategoryRewardLevel;

    /**
     * 所属专业
     */
    private boolean showMajor;

    /**
     * 主讲教师
     */
    private boolean showTeacherSpeakerId;

    /**
     * 辅导教师
     */
    private  boolean showTeacherAssistantId;

    /**
     * 指导书名称
     */
    private boolean showGuideBookTitle;

    /**
     * 编者
     */
    private boolean showGuideBookAuthor;

    /**
     * 考核方法
     */
    private boolean showAssessmentMethods;

    /**
     * 计划开课周次
     */
    private boolean showPlanWeek;

    /**
     * 实验内容
     */
    private boolean showIntroduction;

    /**
     * 课前准备
     */
    private boolean showPreparation;

    /**
     * 首开人
     */
    private boolean showUpdateUser;

    /**
     * 首开时间
     */
    private boolean showUpdateTime;

    /**
     * 首开学院
     */
    private boolean showItemAcademy;

    /**
     * 实验编号
     */
    private boolean showCodeCustom;

    /**
     * 实验备注
     */
    private boolean showPurpose;

    /**
     * 设备材料
     */
    private boolean showResource;

    /**
     * 附件
     */
    private boolean showEnclosure;
    //实验项目字段是否展示字段结束

    /**
     * 语言切换
     */
    private boolean showLanguage;

    /**
     *是否使用新的预约时间
     */
    private boolean reservationTime;

}
