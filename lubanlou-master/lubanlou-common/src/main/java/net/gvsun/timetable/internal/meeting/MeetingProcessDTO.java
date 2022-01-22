package net.gvsun.timetable.internal.meeting;


import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * Description
 *
 * @author weicheng
 * @date 2021/2/18 10:50
 */
@Data
public class MeetingProcessDTO {

    private Integer id;
    private String meetingName;
    private String meetingAddress;
    private String promoter;
    private Integer meetingStage;
    private String meetingTheme;

    /**
     * 参会名单
     */
    private String meetingParticipants;
    private Date startTime;
    private Date endTime;
    private String meetingDuration;
    private Integer meetingStageDefinition;
    private String meetingStageNameDef;
    private String search;
    private String meetingTime;
    private String stageName;
    private String date;
    private String time;

    /**
     * 会议流程模板
     */
    private Integer meetingModel;
    /**
     * 会议流程模板名称
     */
    private String meetingModelName;

    /**
     * 分页参数
     */
    private Integer page;
    private Integer limit;
    private String projectName;
    private String zuulServerUrl;
    private Integer term;
    private String userRole;
    private boolean isNext;
    private List<MeetingStageDTO> meetingStageDTOList;
    private String[] times;
    private String businessKey;


}
