package net.gvsun.timetable.internal.labroom;



import lombok.Data;
import net.gvsun.timetable.internal.user.UserByLabCenterDTO;

import java.util.List;
import java.util.Map;

/**
 * Description
 *
 * @author weicheng
 * @date 2021/2/18 11:11
 */
@Data
public class LabCenterInfoDTO {
    /**
     * 业务id
     */
    private String id;
    /**
     * 业务名称
     */
    private String name;
    /**
     * 课程编号
     */
    private String courseNumber;
    /**
     * 实验室编号
     */
    private String labRoomNumber;
    /**
     * 开始时间
     */
    private String startTime;
    /**
     * 结束时间
     */
    private String endTime;
    /**
     * 发起人List
     */
    private List<UserByLabCenterDTO> initiatorDTOS;
    /**
     * 目标人List
     */
    private List<UserByLabCenterDTO> targetDTOS;
    /**
     * 其他信息
     */
    private Map<String, Object> infoMap;


}
