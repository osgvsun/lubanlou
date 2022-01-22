package net.gvsun.timetable.internal.timetable;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.List;

/************************************************************
 * Descriptions：直接排课-保存传参对象
 *
 * @作者：Hezhaoyi
 * @时间：2019-5-27
 ************************************************************/
@ApiModel(value="排课传入对象",description="排课保存传入对象")
public class JudgeConflictTimeTableVO implements Serializable {
    @ApiModelProperty(value="排课的教学班编号",name="courseNo")
    private String courseNo;
    @ApiModelProperty(value="直接排课的教学班明细编号",name="courseDetailNo")
    private String courseDetailNo;
    @ApiModelProperty(value="自主排课id",name="selfId")
    private int selfId;
    @ApiModelProperty(value="排课主键id",name="timetableId")
    private int timetableId;
    @ApiModelProperty(value="排课子表主键id",name="sameNumberId")
    private int sameNumberId;
    @ApiModelProperty(value="学期id",name="term")
    private int term;
    @ApiModelProperty(value="状态",name="status")
    private int status;
    @ApiModelProperty(value="调停课状态",name="adjustStatus")
    private Integer adjustStatus;
    @ApiModelProperty(value="排课类型",name="timetableStyle")
    private int timetableStyle;
    @ApiModelProperty(value="星期",name="weekday")
    private int weekday;
    @ApiModelProperty(value="排课分组",name="groupId")
    private int groupId;
    @ApiModelProperty(value="所选实验室",name="labRoomIds")
    private String labRoomId;
    @ApiModelProperty(value="所选节次",name="classes")
    private String classes;
    @ApiModelProperty(value="所选周次",name="weeks")
    private String weeks;
    @ApiModelProperty(value="不参与自我判冲的周次",name="selfWeeks")
    private String selfWeeks;
    @ApiModelProperty(value="调课、修改周次",name="adjustWeek")
    private String adjustWeek;
    @ApiModelProperty(value="所选教师",name="tearchs")
    private String teacher;
    @ApiModelProperty(value="所选指导教师",name="tutors")
    private String tutor;
    @ApiModelProperty(value="软件id",name="softwares")
    private int[] softwares;
    @ApiModelProperty(value="所选项目",name="items")
    private String item;
    @ApiModelProperty(value="虚拟镜像id",name="virtualId")
    private String virtualId;
    @ApiModelProperty(value="老师判冲按钮",name="buttonT")
    private String buttonT;
    @ApiModelProperty(value="实验室判冲按钮",name="buttonL")
    private String buttonL;
    @ApiModelProperty(value="学生判冲按钮",name="buttonS")
    private String buttonS;
//    @ApiModelProperty(value="排课中间教师数据",name="teacherList")
//    private List<UserDTO> teacherList;
    @ApiModelProperty(value="排课中间实验室数据",name="labRoomArray")
    private String[] labRoomArray;
    @ApiModelProperty(value="用户工号",name="username")
    private String username;

    public String getCourseNo() {
        return courseNo;
    }

    public void setCourseNo(String courseNo) {
        this.courseNo = courseNo;
    }

    public int getTerm() {
        return term;
    }

    public void setTerm(int term) {
        this.term = term;
    }

    public int getWeekday() {
        return weekday;
    }

    public void setWeekday(int weekday) {
        this.weekday = weekday;
    }

    public String getLabRoomId() {
        return labRoomId;
    }

    public void setLabRoomId(String labRoomId) {
        this.labRoomId = labRoomId;
    }

    public String getClasses() {
        return classes;
    }

    public void setClasses(String classes) {
        this.classes = classes;
    }

    public String getWeeks() {
        return weeks;
    }

    public void setWeeks(String weeks) {
        this.weeks = weeks;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getTimetableStyle() {
        return timetableStyle;
    }

    public void setTimetableStyle(int timetableStyle) {
        this.timetableStyle = timetableStyle;
    }

    public String getCourseDetailNo() {
        return courseDetailNo;
    }

    public void setCourseDetailNo(String courseDetailNo) {
        this.courseDetailNo = courseDetailNo;
    }

    public int getSelfId() {
        return selfId;
    }

    public void setSelfId(int selfId) {
        this.selfId = selfId;
    }

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public String getTutor() {
        return tutor;
    }

    public void setTutor(String tutor) {
        this.tutor = tutor;
    }

    public String getVirtualId() {
        return virtualId;
    }

    public void setVirtualId(String virtualId) {
        this.virtualId = virtualId;
    }

    public int getSameNumberId() {
        return sameNumberId;
    }

    public void setSameNumberId(int sameNumberId) {
        this.sameNumberId = sameNumberId;
    }

    public int[] getSoftwares() {
        return softwares;
    }

    public void setSoftwares(int[] softwares) {
        this.softwares = softwares;
    }

    public Integer getAdjustStatus() {
        return adjustStatus;
    }

    public void setAdjustStatus(Integer adjustStatus) {
        this.adjustStatus = adjustStatus;
    }

    public String getButtonT() {
        return buttonT;
    }

    public void setButtonT(String buttonT) {
        this.buttonT = buttonT;
    }

    public String getButtonL() {
        return buttonL;
    }

    public void setButtonL(String buttonL) {
        this.buttonL = buttonL;
    }

    public String getButtonS() {
        return buttonS;
    }

    public void setButtonS(String buttonS) {
        this.buttonS = buttonS;
    }

//    public List<UserDTO> getTeacherList() {
//        return teacherList;
//    }
//
//    public void setTeacherList(List<UserDTO> teacherList) {
//        this.teacherList = teacherList;
//    }

    public String[] getLabRoomArray() {
        return labRoomArray;
    }

    public void setLabRoomArray(String[] labRoomArray) {
        this.labRoomArray = labRoomArray;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
