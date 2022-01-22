package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;


/**
 * The persistent class for the t_course_site database table.
 * 
 */
@Entity
@Table(name="t_course_site")
@NamedQuery(name="TCourseSite.findAll", query="SELECT t FROM TCourseSite t")
public class TCourseSite implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_time")
	private Date createdTime;

	@Lob
	private String description;

	@Column(name="experiment_skill_profile")
	private String experimentSkillProfile;

	private Integer isNewApp;

	private Integer isOpen;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="modified_time")
	private Date modifiedTime;

	@Column(name="site_code")
	private String siteCode;

	private String siteImage;

	private Integer status;

	private String teacherImage;

	private String title;

	private String type;

	//bi-directional many-to-many association to TAssignmentQuestionpool
	@ManyToMany(mappedBy="TCourseSites")
	private Set<TAssignmentQuestionpool> TAssignmentQuestionpools;

	//bi-directional many-to-one association to SchoolCourseInfo
	@ManyToOne
	@JoinColumn(name="course_number")
	private SchoolCourseInfo schoolCourseInfo;

	//bi-directional many-to-one association to SchoolTerm
	@ManyToOne
	@JoinColumn(name="term_id")
	private SchoolTerm schoolTerm;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="created_by")
	private User userByCreatedBy;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="modified_by")
	private User userByModifiedBy;

	//bi-directional many-to-one association to SchoolCourse
	@ManyToOne
	@JoinColumn(name="course_no")
	private SchoolCourse schoolCourse;

	//bi-directional many-to-one association to TCourseSiteChannel
	@OneToMany(mappedBy="TCourseSite")
	private Set<TCourseSiteChannel> TCourseSiteChannels;

	//bi-directional many-to-one association to TCourseSiteGroup
	@OneToMany(mappedBy="TCourseSite")
	private Set<TCourseSiteGroup> TCourseSiteGroups;

	//bi-directional many-to-one association to TCourseSitePage
	@OneToMany(mappedBy="TCourseSite")
	private Set<TCourseSitePage> TCourseSitePages;

	//bi-directional many-to-one association to TCourseSiteSchedule
	@OneToMany(mappedBy="TCourseSite")
	private Set<TCourseSiteSchedule> TCourseSiteSchedules;

	//bi-directional many-to-one association to TCourseSiteUser
	@OneToMany(mappedBy="TCourseSite")
	private Set<TCourseSiteUser> TCourseSiteUsers;

	//bi-directional many-to-one association to TTestGrading
	@OneToMany(mappedBy="TCourseSite")
	private List<TTestGrading> TTestGradings;

	//bi-directional many-to-one association to TDiscuss
	@OneToMany(mappedBy="TCourseSite")
	private Set<TDiscuss> TDiscusses;

	//bi-directional many-to-one association to TExerciseInfo
	@OneToMany(mappedBy="TCourseSite")
	private Set<TExerciseInfo> TExerciseInfos;

	//bi-directional many-to-one association to TExerciseItemRecord
	@OneToMany(mappedBy="TCourseSite")
	private Set<TExerciseItemRecord> TExerciseItemRecords;

	//bi-directional many-to-one association to TGradebook
	@OneToMany(mappedBy="TCourseSite")
	private Set<TGradebook> TGradebooks;

	//bi-directional many-to-one association to TMessage
	@OneToMany(mappedBy="TCourseSite")
	private Set<TMessage> TMessages;

	//bi-directional many-to-one association to TMistakeItem
	@OneToMany(mappedBy="TCourseSite")
	private Set<TMistakeItem> TMistakeItems;

	//bi-directional many-to-one association to TWeightSetting
	@OneToMany(mappedBy="TCourseSite")
	private Set<TWeightSetting> TWeightSettings;

	//bi-directional many-to-one association to WkChapter
	@OneToMany(mappedBy="TCourseSite")
	private Set<WkChapter> wkChapters;

	public TCourseSite() {
	}

	public List<TTestGrading> getTTestGradings() {
		return TTestGradings;
	}

	public void setTTestGradings(List<TTestGrading> TTestGradings) {
		this.TTestGradings = TTestGradings;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getCreatedTime() {
		return this.createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getExperimentSkillProfile() {
		return this.experimentSkillProfile;
	}

	public void setExperimentSkillProfile(String experimentSkillProfile) {
		this.experimentSkillProfile = experimentSkillProfile;
	}

	public Integer getIsNew_app() {
		return this.isNewApp;
	}

	public void setIsNew_app(int isNewApp) {
		this.isNewApp = isNewApp;
	}

	public Integer getIsOpen() {
		return this.isOpen;
	}

	public void setIsOpen(int isOpen) {
		this.isOpen = isOpen;
	}

	public Date getModifiedTime() {
		return this.modifiedTime;
	}

	public void setModifiedTime(Date modifiedTime) {
		this.modifiedTime = modifiedTime;
	}

	public String getSiteCode() {
		return this.siteCode;
	}

	public void setSiteCode(String siteCode) {
		this.siteCode = siteCode;
	}

	public String getSiteImage() {
		return this.siteImage;
	}

	public void setSiteImage(String siteImage) {
		this.siteImage = siteImage;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getTeacherImage() {
		return this.teacherImage;
	}

	public void setTeacherImage(String teacherImage) {
		this.teacherImage = teacherImage;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Set<TAssignmentQuestionpool> getTAssignmentQuestionpools() {
		return this.TAssignmentQuestionpools;
	}

	public void setTAssignmentQuestionpools(Set<TAssignmentQuestionpool> TAssignmentQuestionpools) {
		this.TAssignmentQuestionpools = TAssignmentQuestionpools;
	}

	public SchoolCourseInfo getSchoolCourseInfo() {
		return this.schoolCourseInfo;
	}

	public void setSchoolCourseInfo(SchoolCourseInfo schoolCourseInfo) {
		this.schoolCourseInfo = schoolCourseInfo;
	}

	public SchoolTerm getSchoolTerm() {
		return this.schoolTerm;
	}

	public void setSchoolTerm(SchoolTerm schoolTerm) {
		this.schoolTerm = schoolTerm;
	}

	public User getUserByCreatedBy() {
		return this.userByCreatedBy;
	}

	public void setUserByCreatedBy(User userByCreatedBy) {
		this.userByCreatedBy = userByCreatedBy;
	}

	public User getUserByModifiedBy() {
		return this.userByModifiedBy;
	}

	public void setUserByModifiedBy(User userByModifiedBy) {
		this.userByModifiedBy = userByModifiedBy;
	}

	public SchoolCourse getSchoolCourse() {
		return this.schoolCourse;
	}

	public void setSchoolCourse(SchoolCourse schoolCourse) {
		this.schoolCourse = schoolCourse;
	}

	public Set<TCourseSiteChannel> getTCourseSiteChannels() {
		return this.TCourseSiteChannels;
	}

	public void setTCourseSiteChannels(Set<TCourseSiteChannel> TCourseSiteChannels) {
		this.TCourseSiteChannels = TCourseSiteChannels;
	}

	public TCourseSiteChannel addTCourseSiteChannel(TCourseSiteChannel TCourseSiteChannel) {
		getTCourseSiteChannels().add(TCourseSiteChannel);
		TCourseSiteChannel.setTCourseSite(this);

		return TCourseSiteChannel;
	}

	public TCourseSiteChannel removeTCourseSiteChannel(TCourseSiteChannel TCourseSiteChannel) {
		getTCourseSiteChannels().remove(TCourseSiteChannel);
		TCourseSiteChannel.setTCourseSite(null);

		return TCourseSiteChannel;
	}

	public Set<TCourseSiteGroup> getTCourseSiteGroups() {
		return this.TCourseSiteGroups;
	}

	public void setTCourseSiteGroups(Set<TCourseSiteGroup> TCourseSiteGroups) {
		this.TCourseSiteGroups = TCourseSiteGroups;
	}

	public TCourseSiteGroup addTCourseSiteGroup(TCourseSiteGroup TCourseSiteGroup) {
		getTCourseSiteGroups().add(TCourseSiteGroup);
		TCourseSiteGroup.setTCourseSite(this);

		return TCourseSiteGroup;
	}

	public TCourseSiteGroup removeTCourseSiteGroup(TCourseSiteGroup TCourseSiteGroup) {
		getTCourseSiteGroups().remove(TCourseSiteGroup);
		TCourseSiteGroup.setTCourseSite(null);

		return TCourseSiteGroup;
	}

	public Set<TCourseSitePage> getTCourseSitePages() {
		return this.TCourseSitePages;
	}

	public void setTCourseSitePages(Set<TCourseSitePage> TCourseSitePages) {
		this.TCourseSitePages = TCourseSitePages;
	}

	public TCourseSitePage addTCourseSitePage(TCourseSitePage TCourseSitePage) {
		getTCourseSitePages().add(TCourseSitePage);
		TCourseSitePage.setTCourseSite(this);

		return TCourseSitePage;
	}

	public TCourseSitePage removeTCourseSitePage(TCourseSitePage TCourseSitePage) {
		getTCourseSitePages().remove(TCourseSitePage);
		TCourseSitePage.setTCourseSite(null);

		return TCourseSitePage;
	}

	public Set<TCourseSiteSchedule> getTCourseSiteSchedules() {
		return this.TCourseSiteSchedules;
	}

	public void setTCourseSiteSchedules(Set<TCourseSiteSchedule> TCourseSiteSchedules) {
		this.TCourseSiteSchedules = TCourseSiteSchedules;
	}

	public TCourseSiteSchedule addTCourseSiteSchedule(TCourseSiteSchedule TCourseSiteSchedule) {
		getTCourseSiteSchedules().add(TCourseSiteSchedule);
		TCourseSiteSchedule.setTCourseSite(this);

		return TCourseSiteSchedule;
	}

	public TCourseSiteSchedule removeTCourseSiteSchedule(TCourseSiteSchedule TCourseSiteSchedule) {
		getTCourseSiteSchedules().remove(TCourseSiteSchedule);
		TCourseSiteSchedule.setTCourseSite(null);

		return TCourseSiteSchedule;
	}

	public Set<TCourseSiteUser> getTCourseSiteUsers() {
		return this.TCourseSiteUsers;
	}

	public void setTCourseSiteUsers(Set<TCourseSiteUser> TCourseSiteUsers) {
		this.TCourseSiteUsers = TCourseSiteUsers;
	}

	public TCourseSiteUser addTCourseSiteUser(TCourseSiteUser TCourseSiteUser) {
		getTCourseSiteUsers().add(TCourseSiteUser);
		TCourseSiteUser.setTCourseSite(this);

		return TCourseSiteUser;
	}

	public TCourseSiteUser removeTCourseSiteUser(TCourseSiteUser TCourseSiteUser) {
		getTCourseSiteUsers().remove(TCourseSiteUser);
		TCourseSiteUser.setTCourseSite(null);

		return TCourseSiteUser;
	}

	public Set<TDiscuss> getTDiscusses() {
		return this.TDiscusses;
	}

	public void setTDiscusses(Set<TDiscuss> TDiscusses) {
		this.TDiscusses = TDiscusses;
	}

	public TDiscuss addTDiscuss(TDiscuss TDiscuss) {
		getTDiscusses().add(TDiscuss);
		TDiscuss.setTCourseSite(this);

		return TDiscuss;
	}

	public TDiscuss removeTDiscuss(TDiscuss TDiscuss) {
		getTDiscusses().remove(TDiscuss);
		TDiscuss.setTCourseSite(null);

		return TDiscuss;
	}

	public Set<TExerciseInfo> getTExerciseInfos() {
		return this.TExerciseInfos;
	}

	public void setTExerciseInfos(Set<TExerciseInfo> TExerciseInfos) {
		this.TExerciseInfos = TExerciseInfos;
	}

	public TExerciseInfo addTExerciseInfo(TExerciseInfo TExerciseInfo) {
		getTExerciseInfos().add(TExerciseInfo);
		TExerciseInfo.setTCourseSite(this);

		return TExerciseInfo;
	}

	public TExerciseInfo removeTExerciseInfo(TExerciseInfo TExerciseInfo) {
		getTExerciseInfos().remove(TExerciseInfo);
		TExerciseInfo.setTCourseSite(null);

		return TExerciseInfo;
	}

	public Set<TExerciseItemRecord> getTExerciseItemRecords() {
		return this.TExerciseItemRecords;
	}

	public void setTExerciseItemRecords(Set<TExerciseItemRecord> TExerciseItemRecords) {
		this.TExerciseItemRecords = TExerciseItemRecords;
	}

	public TExerciseItemRecord addTExerciseItemRecord(TExerciseItemRecord TExerciseItemRecord) {
		getTExerciseItemRecords().add(TExerciseItemRecord);
		TExerciseItemRecord.setTCourseSite(this);

		return TExerciseItemRecord;
	}

	public TExerciseItemRecord removeTExerciseItemRecord(TExerciseItemRecord TExerciseItemRecord) {
		getTExerciseItemRecords().remove(TExerciseItemRecord);
		TExerciseItemRecord.setTCourseSite(null);

		return TExerciseItemRecord;
	}

	public Set<TGradebook> getTGradebooks() {
		return this.TGradebooks;
	}

	public void setTGradebooks(Set<TGradebook> TGradebooks) {
		this.TGradebooks = TGradebooks;
	}

	public TGradebook addTGradebook(TGradebook TGradebook) {
		getTGradebooks().add(TGradebook);
		TGradebook.setTCourseSite(this);

		return TGradebook;
	}

	public TGradebook removeTGradebook(TGradebook TGradebook) {
		getTGradebooks().remove(TGradebook);
		TGradebook.setTCourseSite(null);

		return TGradebook;
	}

	public Set<TMessage> getTMessages() {
		return this.TMessages;
	}

	public void setTMessages(Set<TMessage> TMessages) {
		this.TMessages = TMessages;
	}

	public TMessage addTMessage(TMessage TMessage) {
		getTMessages().add(TMessage);
		TMessage.setTCourseSite(this);

		return TMessage;
	}

	public TMessage removeTMessage(TMessage TMessage) {
		getTMessages().remove(TMessage);
		TMessage.setTCourseSite(null);

		return TMessage;
	}

	public Set<TMistakeItem> getTMistakeItems() {
		return this.TMistakeItems;
	}

	public void setTMistakeItems(Set<TMistakeItem> TMistakeItems) {
		this.TMistakeItems = TMistakeItems;
	}

	public TMistakeItem addTMistakeItem(TMistakeItem TMistakeItem) {
		getTMistakeItems().add(TMistakeItem);
		TMistakeItem.setTCourseSite(this);

		return TMistakeItem;
	}

	public TMistakeItem removeTMistakeItem(TMistakeItem TMistakeItem) {
		getTMistakeItems().remove(TMistakeItem);
		TMistakeItem.setTCourseSite(null);

		return TMistakeItem;
	}

	public Set<TWeightSetting> getTWeightSettings() {
		return this.TWeightSettings;
	}

	public void setTWeightSettings(Set<TWeightSetting> TWeightSettings) {
		this.TWeightSettings = TWeightSettings;
	}

	public TWeightSetting addTWeightSetting(TWeightSetting TWeightSetting) {
		getTWeightSettings().add(TWeightSetting);
		TWeightSetting.setTCourseSite(this);

		return TWeightSetting;
	}

	public TWeightSetting removeTWeightSetting(TWeightSetting TWeightSetting) {
		getTWeightSettings().remove(TWeightSetting);
		TWeightSetting.setTCourseSite(null);

		return TWeightSetting;
	}

	public Set<WkChapter> getWkChapters() {
		return this.wkChapters;
	}

	public void setWkChapters(Set<WkChapter> wkChapters) {
		this.wkChapters = wkChapters;
	}

	public WkChapter addWkChapter(WkChapter wkChapter) {
		getWkChapters().add(wkChapter);
		wkChapter.setTCourseSite(this);

		return wkChapter;
	}

	public WkChapter removeWkChapter(WkChapter wkChapter) {
		getWkChapters().remove(wkChapter);
		wkChapter.setTCourseSite(null);

		return wkChapter;
	}

}