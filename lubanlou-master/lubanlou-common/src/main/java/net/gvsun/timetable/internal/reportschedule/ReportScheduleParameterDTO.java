package net.gvsun.timetable.internal.reportschedule;



import java.io.Serializable;

/**
 * Descriptions：报表中心-请求DTO参数对象
 *
 * @author Hezhaoyi
 * @date  2019-7-25
 */
public class ReportScheduleParameterDTO implements Serializable {
    //实验室id
    private String labRoomId;
    //用户工号
    private String username;
    //上课日期
    private String classDate;
    //学期
    private String term;
    //周次
    private String week;
    //课程名称-查询条件
    private String courseName;
    //设备名称-查询条件
    private String deviceName;
    //项目-查询条件
    private String itemName;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLabRoomId() {
        return labRoomId;
    }

    public void setLabRoomId(String labRoomId) {
        this.labRoomId = labRoomId;
    }

    public String getClassDate() {
        return classDate;
    }

    public void setClassDate(String classDate) {
        this.classDate = classDate;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public String getWeek() {
        return week;
    }

    public void setWeek(String week) {
        this.week = week;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }
}
