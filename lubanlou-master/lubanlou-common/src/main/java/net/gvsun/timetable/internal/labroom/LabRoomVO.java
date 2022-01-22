package net.gvsun.timetable.internal.labroom;

import java.io.Serializable;

/**
 *Desciption 实验室列表对象
 * @author Hezhaoyi
 * 2019-6-12
 */
public class LabRoomVO implements Serializable {
    //实验室id
    private int id;
    //实验室编号
    private String labRoomNumber;
    //实验室名称
    private String labRoomName;
    //（楼宇）楼层
    private String buildFloor;
    //所属中心
    private String centerName;
    //容量
    private Integer labRoomCapacity;
    //实验室等级
    private Integer labRoomLevel;
    //预约状态
    private String reservationrStatus;
    //可预约工位数
    private Integer labRoomWorker;
    //工位预约可选时间段开始时间
    private String stationReStartTime;
    //实验室预约可选时间段结束时间
    private String stationReEndTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLabRoomNumber() {
        return labRoomNumber;
    }

    public void setLabRoomNumber(String labRoomNumber) {
        this.labRoomNumber = labRoomNumber;
    }

    public String getLabRoomName() {
        return labRoomName;
    }

    public void setLabRoomName(String labRoomName) {
        this.labRoomName = labRoomName;
    }

    public String getBuildFloor() {
        return buildFloor;
    }

    public void setBuildFloor(String buildFloor) {
        this.buildFloor = buildFloor;
    }

    public String getCenterName() {
        return centerName;
    }

    public void setCenterName(String centerName) {
        this.centerName = centerName;
    }

    public Integer getLabRoomCapacity() {
        return labRoomCapacity;
    }

    public void setLabRoomCapacity(Integer labRoomCapacity) {
        this.labRoomCapacity = labRoomCapacity;
    }

    public Integer getLabRoomLevel() {
        return labRoomLevel;
    }

    public void setLabRoomLevel(Integer labRoomLevel) {
        this.labRoomLevel = labRoomLevel;
    }


    public String getReservationrStatus() {
        return reservationrStatus;
    }

    public void setReservationrStatus(String reservationrStatus) {
        this.reservationrStatus = reservationrStatus;
    }

    public Integer getLabRoomWorker() {
        return labRoomWorker;
    }

    public void setLabRoomWorker(Integer labRoomWorker) {
        this.labRoomWorker = labRoomWorker;
    }

    public String getStationReStartTime() {
        return stationReStartTime;
    }

    public void setStationReStartTime(String stationReStartTime) {
        this.stationReStartTime = stationReStartTime;
    }

    public String getStationReEndTime() {
        return stationReEndTime;
    }

    public void setStationReEndTime(String stationReEndTime) {
        this.stationReEndTime = stationReEndTime;
    }
}
