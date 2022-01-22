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
public class PreservationOperationItemDTO implements Serializable {

    /**
     * 项目主键
     */
    private Integer id;
    /**
     * 项目名称
     */
    private String lpName;

    /**
     * 项目编号
     */
    private String lpCodeCustom;

    /**
     * 学期id
     */
    private Integer lpTerm;

    /**
     * 所属实验室id
     */
    private String lpLabId;


    /**
     * 所属实验室中文名
     */
    private String lpLabName;

    /**
     * 所属课程编号
     */
    private String lpCourseNumber;

    /**
     * 所属课程中文名
     */
    private String lpCourseName;

    /**
     * 学科编号
     */
    private String lpSubject;

    /**
     * 实验要求
     */
    private Integer lpCategoryRequire;

    /**
     * 实验学时数
     */
    private Double lpDepartmentHours;

    /**
     * 课程总学时
     */
    private Double lpCourseHoursTotal;


    /**
     * 实验总人数
     */
    private Integer lpStudentNumber;

    /**
     * 实验组数
     */
    private Integer lpSetNumber;

    /**
     * 每组人数
     */
    private Integer lpStudentNumberGroup;

    /**
     * 实验类别
     */
    private Integer lpCategoryMain;

    /**
     * 实验类型
     */
    private Integer lpCategoryApp;

    /**
     * 实验性质
     */
    private Integer lpCategoryNature;

    /**
     * 实验者类型
     */
    private Integer lpCategoryStudent;

    /**
     * 变动状态
     */
    private Integer lpStatusChange;

    /**
     * 开放范围
     */
    private Integer lpCategoryPublic;

    /**
     * 获奖等级
     */
    private Integer lpCategoryRewardLevel;

    /**
     * 所属专业
     */
    private String lpMajor;

    /**
     * 主讲教师
     */
    private String lpTeacherSpeakerId;
    /**
     * 主讲教师中文名
     */
    private String lpTeacherSpeakerName;

    /**
     * 辅导教师
     */
    private  String lpTeacherAssistantId;

    /**
     * 辅导教师中文名
     */
    private  String lpTeacherAssistantName;

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
     * 创建人
     */
    private String lpCreateUser;

    /**
     * 审核状态
     */
    private Integer lpStatusCheck;

    /**
     *首开人
     */
    private String updateUser;

    /**
     *首开人中文名
     */
    private String updateUserName;

    /**
     *首开学院
     */
    private String academyNumber;

    /**
     *首开时间
     */
    private String updateTime;

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
