package net.gvsun.gswork.vo.courseInfo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**************************************************************************
 * Description:
 *
 * @author:lixueteng
 * @date:2018/2/2 0002
 **************************************************************************/
public class TimetableAppointmentVO implements Serializable {

    /**
     * id
     */
    private Integer id;
    /**
     * 上课地点
     */
    private String courseAddress;
    /**
     * 上课内容
     */
    private String courseContent;
    /**
     * 上课的课时节次
     */
    private Integer startClass;
    /**
     * 上课结束节次
     */
    private Integer endClass;
    /**
     * 上课开始时间
     */
    private String startTime;
    /**
     * 上课结束时间
     */
    private String endTime;
    /**
     * 上课开始时间+日期
     */
    private Date startDateTime;
    /**
     * 上课结束时间+日期
     */
    private Date endDateTime;

    /**
     * 获取weekday
     * @return
     */
    private Integer weekDay;

    /**
     * 章节名
     */
    private String chapterName;

    /**
     * 对应的文档
     */
    private DocumentVO documentVO;
    /**
     * 对应的考勤
     */
    private Integer assignmentId;

    /**
     * 实验项目id
     */
    private Integer skillId;

    /**
     *
     */
    private String skillName;
    /**
     * 课程名称
     */
    private String course;
    /**
     * 老师名字
     */
    private String teacher;
    /**
     * 实验室id
     */
    private Integer labRoomId;
    /**
     * 实验室名称
     */
    private String labRoomName;
    /**
     * 知识其他信息
     */
    private String knowledgeOther;
    /**
     * 知识链接
     */
    private String knowledgeLink;
    /**
     * 技能其他信息
     */
    private String skillOther;
    /**
     * 技能链接
     */
    private String skillLink;
    /**
     * 分组名称
     */
    private String groupName;
    /**
     * 技能-实验项目列表
     */
    private List skillVOList;
    /**
     * 分组列表
     */
    private String group;
    /**
     * 文档列表
     */
    private List documentVOList;

    public DocumentVO getDocumentVO() {
        return documentVO;
    }

    public TimetableAppointmentVO setDocumentVO(DocumentVO documentVO) {
        this.documentVO = documentVO;
        return this;
    }

    public String getChapterName() {
        return chapterName;
    }

    public TimetableAppointmentVO setChapterName(String chapterName) {
        this.chapterName = chapterName;
        return this;
    }

    public Integer getId() {
        return id;
    }

    public TimetableAppointmentVO setId(Integer id) {
        this.id = id;
        return this;
    }

    public Integer getWeekDay() {
        return weekDay;
    }

    public TimetableAppointmentVO setWeekDay(Integer weekDay) {
        this.weekDay = weekDay;
        return this;
    }


    public String getCourseAddress() {
        return courseAddress;
    }

    public TimetableAppointmentVO setCourseAddress(String courseAddress) {
        this.courseAddress = courseAddress;
        return this;
    }

    public String getCourseContent() {
        return courseContent;
    }

    public TimetableAppointmentVO setCourseContent(String courseContent) {
        this.courseContent = courseContent;
        return this;
    }

    public Integer getStartClass() {
        return startClass;
    }

    public TimetableAppointmentVO setStartClass(Integer startClass) {
        this.startClass = startClass;
        return this;
    }

    public Integer getEndClass() {
        return endClass;
    }

    public TimetableAppointmentVO setEndClass(Integer endClass) {
        this.endClass = endClass;
        return this;
    }

    public Integer getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Integer assignmentId) {
        this.assignmentId = assignmentId;
    }

    public Integer getSkillId() {
        return skillId;
    }

    public void setSkillId(Integer skillId) {
        this.skillId = skillId;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public Integer getLabRoomId() {
        return labRoomId;
    }

    public void setLabRoomId(Integer labRoomId) {
        this.labRoomId = labRoomId;
    }

    public String getLabRoomName() {
        return labRoomName;
    }

    public void setLabRoomName(String labRoomName) {
        this.labRoomName = labRoomName;
    }

    public String getKnowledgeOther() {
        return knowledgeOther;
    }

    public void setKnowledgeOther(String knowledgeOther) {
        this.knowledgeOther = knowledgeOther;
    }

    public String getKnowledgeLink() {
        return knowledgeLink;
    }

    public void setKnowledgeLink(String knowledgeLink) {
        this.knowledgeLink = knowledgeLink;
    }

    public String getSkillOther() {
        return skillOther;
    }

    public void setSkillOther(String skillOther) {
        this.skillOther = skillOther;
    }

    public String getSkillLink() {
        return skillLink;
    }

    public void setSkillLink(String skillLink) {
        this.skillLink = skillLink;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public List getSkillVOList() {
        return skillVOList;
    }

    public void setSkillVOList(List skillVOList) {
        this.skillVOList = skillVOList;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public List getDocumentVOList() {
        return documentVOList;
    }

    public void setDocumentVOList(List documentVOList) {
        this.documentVOList = documentVOList;
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

    public Date getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(Date startDateTime) {
        this.startDateTime = startDateTime;
    }

    public Date getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(Date endDateTime) {
        this.endDateTime = endDateTime;
    }
}
