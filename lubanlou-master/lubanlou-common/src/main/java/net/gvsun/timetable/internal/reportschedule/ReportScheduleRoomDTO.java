package net.gvsun.timetable.internal.reportschedule;



import java.io.Serializable;

/**
 * Descriptions：报表中心-房间日程返回对象
 *
 * @author Hezhaoyi
 * @date  2019-7-25
 */
public class ReportScheduleRoomDTO implements Serializable {

    //用户工号
    private String username;
    //用户姓名
    private String cname;
    //实验室id
    private String labId;
    //实验室名称
    private String labName;
    //学期主键
    private String termId;
    //学期名称
    private String termName;
    //上课周次
    private String weeks;
    //上课节次
    private String classes;
    //上课日期
    private String classDate;
    //开始时间
    private String startTime;
    //结束时间
    private String endTime;
    //星期
    private String weekday;
    //日程信息
    private String infos;
    //项目主键
    private String itemId;
    //项目名称
    private String itemName;
    //录播资源存放路径
    private String resourceUrl;
    //业务类型（TIMETABLE 排课）
    private String businessType;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getLabId() {
        return labId;
    }

    public void setLabId(String labId) {
        this.labId = labId;
    }

    public String getLabName() {
        return labName;
    }

    public void setLabName(String labName) {
        this.labName = labName;
    }

    public String getTermId() {
        return termId;
    }

    public void setTermId(String termId) {
        this.termId = termId;
    }

    public String getTermName() {
        return termName;
    }

    public void setTermName(String termName) {
        this.termName = termName;
    }

    public String getWeeks() {
        return weeks;
    }

    public void setWeeks(String weeks) {
        this.weeks = weeks;
    }

    public String getClasses() {
        return classes;
    }

    public void setClasses(String classes) {
        this.classes = classes;
    }

    public String getClassDate() {
        return classDate;
    }

    public void setClassDate(String classDate) {
        this.classDate = classDate;
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

    public String getWeekday() {
        return weekday;
    }

    public void setWeekday(String weekday) {
        this.weekday = weekday;
    }

    public String getInfos() {
        return infos;
    }

    public void setInfos(String infos) {
        this.infos = infos;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getResourceUrl() {
        return resourceUrl;
    }

    public void setResourceUrl(String resourceUrl) {
        this.resourceUrl = resourceUrl;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }
}
