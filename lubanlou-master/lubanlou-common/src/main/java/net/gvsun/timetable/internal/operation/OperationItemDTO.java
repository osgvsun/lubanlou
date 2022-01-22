package net.gvsun.timetable.internal.operation;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions
 *
 * @author lay
 * @date  2021-07-21
 */
@Data
public class OperationItemDTO implements Serializable {

    /**
     * 实验项目主键
     */
    private Integer id;
    /**
     * 实验编号
     */
    private String lpCodeCustom;

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
     * 草稿
     */
    private String draft;

    /**
     * 审核中
     */
    private String underReview;


    /**
     * 审核通过
     */
    private String approved;

    /**
     * 审核拒绝
     */
    private String auditReject;
    /**
     * 已停用
     */
    private String auditDeactivate;


    /**
     * 审核权限
     */
    private String authName;


    /**
     * 审核等级
     */
    private Integer level;

    /**
     * 审核细节
     */
    private String auditDetail;

    /**
     * 首开人
     */
    private String updateUser;
}
