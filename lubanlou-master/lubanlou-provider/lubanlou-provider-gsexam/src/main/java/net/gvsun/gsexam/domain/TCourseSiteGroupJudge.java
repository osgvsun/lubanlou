package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the t_course_site_group_judges database table.
 * 
 */
@Entity
@Table(name="t_course_site_group_judges")
@NamedQuery(name="TCourseSiteGroupJudge.findAll", query="SELECT t FROM TCourseSiteGroupJudge t")
public class TCourseSiteGroupJudge implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id")
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;

	@Column(name="acceptance_result")
	private String acceptanceResult;

	private String comment;

	@Column(name="complete_data")
	private String completeData;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="create_date")
	private Date createDate;

	@Column(name="funduse_rationality")
	private String funduseRationality;

	private Integer period;

	@Column(name="product_progress")
	private String productProgress;

	@Column(name="project_innovativeness")
	private String projectInnovativeness;

	@Column(name="project_practicability")
	private String projectPracticability;

	private String rationality;

	@Lob
	private String result;

	@Column(name="stage_results")
	private String stageResults;

	@Column(name="total_score")
	private String totalScore;

	//bi-directional many-to-one association to TCourseSiteGroup
	@ManyToOne
	@JoinColumn(name="group_id")
	private TCourseSiteGroup TCourseSiteGroup;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;

	public TCourseSiteGroupJudge() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAcceptanceResult() {
		return this.acceptanceResult;
	}

	public void setAcceptanceResult(String acceptanceResult) {
		this.acceptanceResult = acceptanceResult;
	}

	public String getComment() {
		return this.comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getCompleteData() {
		return this.completeData;
	}

	public void setCompleteData(String completeData) {
		this.completeData = completeData;
	}

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getFunduseRationality() {
		return this.funduseRationality;
	}

	public void setFunduseRationality(String funduseRationality) {
		this.funduseRationality = funduseRationality;
	}

	public int getPeriod() {
		return this.period;
	}

	public void setPeriod(int period) {
		this.period = period;
	}

	public String getProductProgress() {
		return this.productProgress;
	}

	public void setProductProgress(String productProgress) {
		this.productProgress = productProgress;
	}

	public String getProjectInnovativeness() {
		return this.projectInnovativeness;
	}

	public void setProjectInnovativeness(String projectInnovativeness) {
		this.projectInnovativeness = projectInnovativeness;
	}

	public String getProjectPracticability() {
		return this.projectPracticability;
	}

	public void setProjectPracticability(String projectPracticability) {
		this.projectPracticability = projectPracticability;
	}

	public String getRationality() {
		return this.rationality;
	}

	public void setRationality(String rationality) {
		this.rationality = rationality;
	}

	public String getResult() {
		return this.result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getStageResults() {
		return this.stageResults;
	}

	public void setStageResults(String stageResults) {
		this.stageResults = stageResults;
	}

	public String getTotalScore() {
		return this.totalScore;
	}

	public void setTotalScore(String totalScore) {
		this.totalScore = totalScore;
	}

	public TCourseSiteGroup getTCourseSiteGroup() {
		return this.TCourseSiteGroup;
	}

	public void setTCourseSiteGroup(TCourseSiteGroup TCourseSiteGroup) {
		this.TCourseSiteGroup = TCourseSiteGroup;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}