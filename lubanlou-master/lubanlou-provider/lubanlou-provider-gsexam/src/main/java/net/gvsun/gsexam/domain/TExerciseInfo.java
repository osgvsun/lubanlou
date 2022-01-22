package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;


/**
 * The persistent class for the t_exercise_info database table.
 * 
 */
@Entity
@Table(name="t_exercise_info")
@NamedQuery(name="TExerciseInfo.findAll", query="SELECT t FROM TExerciseInfo t")
public class TExerciseInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Lob
	private String blankStochasticString;

	@Column(name="mistake_number")
	private Integer mistakeNumber;

	@Lob
	private String multipleStochasticString;

	@Column(name="order_number")
	private Integer orderNumber;

	@Lob
	private String singleStochasticString;

	@Column(name="stochastic_number")
	private Integer stochasticNumber;

	@Lob
	private String stochasticString;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="username")
	private User user;

	//bi-directional many-to-one association to TCourseSite
	@ManyToOne
	@JoinColumn(name="site_id")
	private TCourseSite TCourseSite;

	//bi-directional many-to-one association to TAssignmentQuestionpool
	@ManyToOne
	@JoinColumn(name="question_id")
	private TAssignmentQuestionpool TAssignmentQuestionpool;

	public TExerciseInfo() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBlankStochasticString() {
		return this.blankStochasticString;
	}

	public void setBlankStochasticString(String blankStochasticString) {
		this.blankStochasticString = blankStochasticString;
	}

	public Integer getMistakeNumber() {
		return this.mistakeNumber;
	}

	public void setMistakeNumber(int mistakeNumber) {
		this.mistakeNumber = mistakeNumber;
	}

	public String getMultipleStochasticString() {
		return this.multipleStochasticString;
	}

	public void setMultipleStochasticString(String multipleStochasticString) {
		this.multipleStochasticString = multipleStochasticString;
	}

	public Integer getOrderNumber() {
		return this.orderNumber;
	}

	public void setOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
	}

	public String getSingleStochasticString() {
		return this.singleStochasticString;
	}

	public void setSingleStochasticString(String singleStochasticString) {
		this.singleStochasticString = singleStochasticString;
	}

	public Integer getStochasticNumber() {
		return this.stochasticNumber;
	}

	public void setStochasticNumber(int stochasticNumber) {
		this.stochasticNumber = stochasticNumber;
	}

	public String getStochasticString() {
		return this.stochasticString;
	}

	public void setStochasticString(String stochasticString) {
		this.stochasticString = stochasticString;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public TCourseSite getTCourseSite() {
		return this.TCourseSite;
	}

	public void setTCourseSite(TCourseSite TCourseSite) {
		this.TCourseSite = TCourseSite;
	}

	public TAssignmentQuestionpool getTAssignmentQuestionpool() {
		return this.TAssignmentQuestionpool;
	}

	public void setTAssignmentQuestionpool(TAssignmentQuestionpool TAssignmentQuestionpool) {
		this.TAssignmentQuestionpool = TAssignmentQuestionpool;
	}

}