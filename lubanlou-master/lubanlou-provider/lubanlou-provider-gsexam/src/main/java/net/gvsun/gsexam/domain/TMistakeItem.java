package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;


/**
 * The persistent class for the t_mistake_item database table.
 * 
 */
@Entity
@Table(name="t_mistake_item")
@NamedQuery(name="TMistakeItem.findAll", query="SELECT t FROM TMistakeItem t")
public class TMistakeItem implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Column(name="error_count")
	private Integer errorCount;

	//bi-directional many-to-one association to TCourseSite
	@ManyToOne
	@JoinColumn(name="site_id")
	private TCourseSite TCourseSite;

	//bi-directional many-to-one association to TAssignmentItem
	@ManyToOne
	@JoinColumn(name="item_id")
	private TAssignmentItem TAssignmentItem;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="username")
	private User user;

	//bi-directional many-to-one association to TAssignmentQuestionpool
	@ManyToOne
	@JoinColumn(name="question_id")
	private TAssignmentQuestionpool TAssignmentQuestionpool;

	public TMistakeItem() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getErrorCount() {
		return this.errorCount;
	}

	public void setErrorCount(int errorCount) {
		this.errorCount = errorCount;
	}

	public TCourseSite getTCourseSite() {
		return this.TCourseSite;
	}

	public void setTCourseSite(TCourseSite TCourseSite) {
		this.TCourseSite = TCourseSite;
	}

	public TAssignmentItem getTAssignmentItem() {
		return this.TAssignmentItem;
	}

	public void setTAssignmentItem(TAssignmentItem TAssignmentItem) {
		this.TAssignmentItem = TAssignmentItem;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public TAssignmentQuestionpool getTAssignmentQuestionpool() {
		return this.TAssignmentQuestionpool;
	}

	public void setTAssignmentQuestionpool(TAssignmentQuestionpool TAssignmentQuestionpool) {
		this.TAssignmentQuestionpool = TAssignmentQuestionpool;
	}

}