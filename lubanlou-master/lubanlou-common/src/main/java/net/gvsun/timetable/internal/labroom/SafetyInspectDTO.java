package net.gvsun.timetable.internal.labroom;


import lombok.Data;

import java.io.Serializable;

/**
*  Description
*
*  @author weicheng
*  @date 2021/2/18 10:42
*/
@Data
public class SafetyInspectDTO implements Serializable {

    /**
     * 检查人
     */
    private String inspectUser;

    /**
     * 检查时间段
     */
    private String inspectTime;

    /**
     * 检查名称
     */
    private String inspectName;

    /**
     * 检查项目
     */
    private String inspectItem;

    /**
     * 检查状态
     */
    private String inspectStatus;

    /**
     * 检查得分
     */
    private String inspectScore;

    /**
     * 扣分原因
     */
    private String inspectReason;

}
