package net.gvsun.timetable.internal.meeting;


import lombok.Data;

/**
 * Description
 *
 * @author weicheng
 * @date 2021/2/18 10:51
 */
@Data
public class MeetingStageDTO {

    /**
     * 阶段id
     */
    private Integer id;

    /**
     * 阶段名称
     */
    private String stageName;

    /**
     * 阶段文件要求
     */
    private String stageRequirement;

    /**
     * 阶段文件要求名称
     */
    private String requirementName;


}
