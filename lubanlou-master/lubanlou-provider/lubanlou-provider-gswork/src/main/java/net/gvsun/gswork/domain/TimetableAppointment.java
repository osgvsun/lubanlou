package net.gvsun.gswork.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlTransient;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.Set;


/**
 * The persistent class for the timetable_appointment database table.
 *
 */
@Data
@Entity
@Table(name="timetable_appointment")
@NamedQuery(name="TimetableAppointment.findAll", query="SELECT t FROM TimetableAppointment t")
@ToString
public class TimetableAppointment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name="appointment_no")
	private String appointmentNo;

	@Column(name="consumables_costs")
	private BigDecimal consumablesCosts;

	@Column(name="course_code")
	private String courseCode;

	@Column(name="created_by")
	private String createdBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_date")
	private Date createdDate;

	private String detail;

	@Column(name="device_or_lab")
	private Integer deviceOrLab;

	private Boolean enabled;

	@Column(name="end_class")
	private Integer endClass;

	@Column(name="end_week")
	private Integer endWeek;

	@Column(name="group_count")
	private Integer groupCount;

	private Integer groups;

	private Integer labhours;

	private String memo;

	private String preparation;

	private Integer termId;

	private Integer labRoomId;

	private String labRoom;

	private Integer areaId;

	@Column(name="start_class")
	private Integer startClass;

	@Column(name="start_week")
	private Integer startWeek;

	private Integer status;

	@Column(name="timetable_number")
	private Integer timetableNumber;

	@Column(name="timetable_style")
	private Integer timetableStyle;

	@Column(name="total_classes")
	private Integer totalClasses;

	@Column(name="total_weeks")
	private String totalWeeks;

	@Column(name="updated_by")
	private String updatedBy;

    @Column(name="knowledge_other")
    private String knowledgeOther;

    @Column(name="knowledge_link")
    private String knowledgeLink;

    @Column(name="skill_other")
    private String skillOther;

    @Column(name="skill_link")
    private String skillLink;

	@ManyToOne
	@JoinColumn(name="academy_number")
	private SchoolAcademy schoolAcademy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="updated_date")
	private Date updatedDate;

	private Integer weekday;


	@ManyToOne
	@JoinColumns({ @JoinColumn(name = "document_id", referencedColumnName = "id") })
	@XmlTransient
    WkUpload wkUpload;

	@Column(name = "chapter_name")
	@Basic(fetch = FetchType.LAZY)
	String chapterName;

	@ManyToOne
	@JoinColumns({ @JoinColumn(name = "site_id", referencedColumnName = "id") })
	@XmlTransient
    TCourseSite tCourseSite;

	@Column(name="assignment_id")
	private Integer assignmentId;

	//bi-directional many-to-one association to TimetableAppointmentSameNumber
	@OneToMany(mappedBy="timetableAppointment")
	private Set<TimetableAppointmentSameNumber> timetableAppointmentSameNumbers;

	@OneToMany(mappedBy="timetableAppointment", cascade = { CascadeType.REMOVE })
	private List<TimetableSkillRelated> timetableSkillRelateds;

	@Column(name = "start_date")
	@JsonFormat(pattern = "yyyy-MM-dd")
	LocalDate startDate;
	@Column(name = "end_date")
	@JsonFormat(pattern = "yyyy-MM-dd")
	LocalDate endDate;
	@Column(name = "start_time")
	@JsonFormat(pattern = "HH:mm:ss")
	LocalTime startTime;
	@Column(name = "end_time")
	@JsonFormat(pattern = "HH:mm:ss")
	LocalTime endTime;

	@Column(name = "weekdays")
	String weekdays;

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public LocalTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public LocalTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}

	public String getWeekdays() {
		return weekdays;
	}

	public void setWeekdays(String weekdays) {
		this.weekdays = weekdays;
	}

	public TCourseSite gettCourseSite() {
		return tCourseSite;
	}

	public TimetableAppointment settCourseSite(TCourseSite tCourseSite) {
		this.tCourseSite = tCourseSite;
		return this;
	}

	public String getChapterName() {
		return chapterName;
	}

	public TimetableAppointment setChapterName(String chapterName) {
		this.chapterName = chapterName;
		return this;
	}

	public String getLabRoom() {
		return labRoom;
	}

	public void setLabRoom(String labRoom) {
		this.labRoom = labRoom;
	}

	public TimetableAppointment() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAppointmentNo() {
		return this.appointmentNo;
	}

	public void setAppointmentNo(String appointmentNo) {
		this.appointmentNo = appointmentNo;
	}

	public BigDecimal getConsumablesCosts() {
		return this.consumablesCosts;
	}

	public void setConsumablesCosts(BigDecimal consumablesCosts) {
		this.consumablesCosts = consumablesCosts;
	}

	public String getCourseCode() {
		return this.courseCode;
	}

	public void setCourseCode(String courseCode) {
		this.courseCode = courseCode;
	}

	public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getDetail() {
		return this.detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public Integer getDeviceOrLab() {
		return this.deviceOrLab;
	}

	public void setDeviceOrLab(int deviceOrLab) {
		this.deviceOrLab = deviceOrLab;
	}


	public Boolean getEnabled() {
		return enabled;
	}

	public TimetableAppointment setEnabled(Boolean enabled) {
		this.enabled = enabled;
		return this;
	}

	public Integer getEndClass() {
		return this.endClass;
	}

	public void setEndClass(int endClass) {
		this.endClass = endClass;
	}

	public SchoolAcademy getSchoolAcademy() {
		return this.schoolAcademy;
	}

	public void setSchoolAcademy(SchoolAcademy schoolAcademy) {
		this.schoolAcademy = schoolAcademy;
	}

	public Integer getEndWeek() {
		return this.endWeek;
	}

	public void setEndWeek(int endWeek) {
		this.endWeek = endWeek;
	}

	public Integer getGroupCount() {
		return this.groupCount;
	}

	public void setGroupCount(int groupCount) {
		this.groupCount = groupCount;
	}

	public Integer getGroups() {
		return this.groups;
	}

	public void setGroups(int groups) {
		this.groups = groups;
	}

	public Integer getLabhours() {
		return this.labhours;
	}

	public void setLabhours(int labhours) {
		this.labhours = labhours;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

	public String getPreparation() {
		return this.preparation;
	}

	public void setPreparation(String preparation) {
		this.preparation = preparation;
	}

	public Set<TimetableAppointmentSameNumber> getTimetableAppointmentSameNumbers() {
		return timetableAppointmentSameNumbers;
	}

	public void setTimetableAppointmentSameNumbers(Set<TimetableAppointmentSameNumber> timetableAppointmentSameNumbers) {
		this.timetableAppointmentSameNumbers = timetableAppointmentSameNumbers;
	}

	public Integer getStartClass() {
		return this.startClass;
	}

	public void setStartClass(int startClass) {
		this.startClass = startClass;
	}

	public Integer getStartWeek() {
		return this.startWeek;
	}

	public void setStartWeek(int startWeek) {
		this.startWeek = startWeek;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Integer getTimetableNumber() {
		return this.timetableNumber;
	}

	public void setTimetableNumber(int timetableNumber) {
		this.timetableNumber = timetableNumber;
	}

	public Integer getTimetableStyle() {
		return this.timetableStyle;
	}

	public void setTimetableStyle(int timetableStyle) {
		this.timetableStyle = timetableStyle;
	}

	public Integer getTotalClasses() {
		return this.totalClasses;
	}

	public void setTotalClasses(int totalClasses) {
		this.totalClasses = totalClasses;
	}

	public String getTotalWeeks() {
		return this.totalWeeks;
	}

	public void setTotalWeeks(String totalWeeks) {
		this.totalWeeks = totalWeeks;
	}

	public String getUpdatedBy() {
		return this.updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDate() {
		return this.updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Integer getWeekday() {
		return this.weekday;
	}

	public void setWeekday(int weekday) {
		this.weekday = weekday;
	}




	public WkUpload getWkUpload() {
		return wkUpload;
	}

	public TimetableAppointment setWkUpload(WkUpload wkUpload) {
		this.wkUpload = wkUpload;
		return this;
	}

	public Integer getAssignmentId() {
		return assignmentId;
	}

	public void setAssignmentId(Integer assignmentId) {
		this.assignmentId = assignmentId;
	}

	public List<TimetableSkillRelated> getTimetableSkillRelateds() {
		return this.timetableSkillRelateds;
	}

	public void setTimetableSkillRelateds(List<TimetableSkillRelated> timetableSkillRelateds) {
		this.timetableSkillRelateds = timetableSkillRelateds;
	}

	public TimetableSkillRelated addTimetableSkillRelated(TimetableSkillRelated timetableSkillRelated) {
		getTimetableSkillRelateds().add(timetableSkillRelated);
		timetableSkillRelated.setTimetableAppointment(this);

		return timetableSkillRelated;
	}

	public TimetableSkillRelated removeTimetableSkillRelated(TimetableSkillRelated timetableSkillRelated) {
		getTimetableSkillRelateds().remove(timetableSkillRelated);
		timetableSkillRelated.setTimetableAppointment(null);

		return timetableSkillRelated;
	}

	public Integer getTermId() {
		return termId;
	}

	public void setTermId(Integer termId) {
		this.termId = termId;
	}

	public Integer getLabRoomId() {
		return labRoomId;
	}

	public void setLabRoomId(Integer labRoomId) {
		this.labRoomId = labRoomId;
	}

	public Integer getAreaId() {
		return areaId;
	}

	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
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

}