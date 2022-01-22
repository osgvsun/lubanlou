package net.gvsun.timetable.internal.operation;


import lombok.Data;
import net.gvsun.timetable.internal.asset.AssetDTO;
import net.gvsun.timetable.internal.device.SchoolDeviceDTO;
import net.gvsun.timetable.internal.labroom.CommonDocumentDTO;

import java.io.Serializable;
import java.util.List;

/**
 * Descriptions
 *
 * @author lay
 * @date  2021-07-21
 */
@Data
public class OperationItemDetailDTO implements Serializable {
    /**
     * 实验项目主键
     */
    private Integer id;
    /**
     * 实验项目编号
     */
    private String lpCodeCustom;
    /**
     * 面向专业
     */
    private String lpMajorFit;
    /**
     * 实验名称
     */
    private String lpName;

    /**
     * 学期名称
     */
    private String termName;

    /**
     * 所属实验室名称
     */
    private String labRoomName;

    /**
     * 所属课程名称
     */
    private String courseName;

    /**
     * 创建者名称
     */
    private String creatorName;

    /**
     * 状态
     */
    private String auditStatus;

    /**
     * 学科名称
     */
    private String lpSubject;

    /**
     * 实验要求
     */
    private String itemAim;
    /**
     * 所属实验中心
     */
    private String centerName;
    /**
     * 中心主任
     */
    private String labCenterName;

    /**
     * 实验学时
     */
    private String lpDepartmentHours;

    /**
     * 课程总学时
     */
    private String lpCourseHoursTotal;

    /**
     * 实验总人数
     */
    private String lpStudentNumber;

    /**
     * 实验组数
     */
    private String lpSetNumber;

    /**
     * 每组人数
     */
    private String lpStudentNumberGroup;

    /**
     * 实验类别
     */
    private String lpCategoryMain;

    /**
     * 实验类型
     */
    private String lpCategoryApp;

    /**
     * 实验性质
     */
    private String lpCategoryNature;

    /**
     * 实验者类型
     */
    private String lpCategoryStudent;

    /**
     * 变动状态
     */
    private String lpStatusChange;

    /**
     * 开放范围
     */
    private String lpCategoryPublic;

    /**
     * 实验要求
     */
    private String lpCategoryRequire;

    /**
     * 获奖等级
     */
    private String lpCategoryRewardLevel;

    /**
     * 所属专业
     */
    private String lpMajor;

    /**
     * 主讲教师
     */
    private String lpTeacherSpeakerId;

    /**
     * 辅导教师
     */
    private String lpTeacherAssistantId;

    /**
     * 指导书名称
     */
    private String lpGuideBookTitle;


    /**
     * 编者
     */
    private String lpGuideBookAuthor;

    /**
     * 考核方法
     */
    private String lpAssessmentMethods;

    /**
     * 计划开课周次
     */
    private String planWeek;

    /**
     * 实验内容
     */
    private String lpIntroduction;

    /**
     * 课前准备
     */
    private String lpPreparation;

    /**
     * 首开人
     */
    private String updateUser;

    /**
     * 首开时间
     */
    private String updateTime;

    /**
     * 首开学院
     */
    private String academyName;

    /**
     *备注
     */
    private String lpPurposes;

    /**
     * 项目关联材料
     */
    private List<AssetDTO> assetDTOS;

    /**
     * 项目关联设备
     */
    private List<SchoolDeviceDTO> schoolDeviceDTOS;


    /**
     * 项目关联附件
     */
    private List<CommonDocumentDTO> commonDocumentDTOS;
}
