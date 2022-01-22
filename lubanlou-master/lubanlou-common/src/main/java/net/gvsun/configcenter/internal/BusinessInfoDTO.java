package net.gvsun.configcenter.internal;

import java.util.List;
import java.util.Map;

public class BusinessInfoDTO {
    // 业务id
    private String id;
    // 业务名称
    private String name;
    // 课程编号
    private String courseNumber;
    // 实验室编号
    private String labRoomNumber;
    // 开始时间
    private String startTime;
    // 结束时间
    private String endTime;
    // 发起人List
    private List<UserDTO>  initiatorDTOS;
    // 目标人List
    private List<UserDTO>  targetDTOS;
    // 其他信息
    private Map<String,Object> infoMap;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Map<String, Object> getInfoMap() {
        return infoMap;
    }

    public void setInfoMap(Map<String, Object> infoMap) {
        this.infoMap = infoMap;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public List<UserDTO> getInitiatorDTOS() {
        return initiatorDTOS;
    }

    public void setInitiatorDTOS(List<UserDTO> initiatorDTOS) {
        this.initiatorDTOS = initiatorDTOS;
    }

    public List<UserDTO> getTargetDTOS() {
        return targetDTOS;
    }

    public void setTargetDTOS(List<UserDTO> targetDTOS) {
        this.targetDTOS = targetDTOS;
    }

    public String getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber) {
        this.courseNumber = courseNumber;
    }

    public String getLabRoomNumber() {
        return labRoomNumber;
    }

    public void setLabRoomNumber(String labRoomNumber) {
        this.labRoomNumber = labRoomNumber;
    }
}
