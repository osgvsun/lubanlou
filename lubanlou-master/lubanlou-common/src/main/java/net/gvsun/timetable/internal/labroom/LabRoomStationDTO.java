package net.gvsun.timetable.internal.labroom;

import java.io.Serializable;

/************************************************************
 * Descriptions：实验室列表呈现vo
 *
 * @作者：魏诚
 * @时间：2018-09-04
 ************************************************************/
public class LabRoomStationDTO implements Serializable {
    //实验室编号
    private String id;
    //教学班编号
    private String labRoomName;
    //课程编号
    private String labRoomNumber;
   private Integer labRoomWorker;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabRoomName() {
        return labRoomName;
    }

    public void setLabRoomName(String labRoomName) {
        this.labRoomName = labRoomName;
    }

    public String getLabRoomNumber() {
        return labRoomNumber;
    }

    public void setLabRoomNumber(String labRoomNumber) {
        this.labRoomNumber = labRoomNumber;
    }

    public Integer getLabRoomWorker() {
        return labRoomWorker;
    }

    public void setLabRoomWorker(Integer labRoomWorker) {
        this.labRoomWorker = labRoomWorker;
    }
}
