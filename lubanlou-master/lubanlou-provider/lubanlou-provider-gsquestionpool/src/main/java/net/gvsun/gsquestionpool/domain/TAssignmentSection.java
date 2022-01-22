package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the t_assignment_section database table.
 * 
 */
@Entity
@Table(name="t_assignment_section")
@NamedQuery(name="TAssignmentSection.findAll", query="SELECT t FROM TAssignmentSection t")
public class TAssignmentSection implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_time")
	private Date createdTime;

	private String description;

	private Integer sequence;

	private Integer status;

	//bi-directional many-to-one association to TAssignmentItem
	@OneToMany(mappedBy="TAssignmentSection")
	private Set<TAssignmentItem> TAssignmentItems;

	//bi-directional many-to-one association to TAssignment
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="assignment_id")
	private TAssignment TAssignment;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="created_by")
	private User user;

	public TAssignmentSection() {
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

	public Integer getSequence() {
		return this.sequence;
	}

	public void setSequence(int sequence) {
		this.sequence = sequence;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Set<TAssignmentItem> getTAssignmentItems() {
		return this.TAssignmentItems;
	}

	public void setTAssignmentItems(Set<TAssignmentItem> TAssignmentItems) {
		this.TAssignmentItems = TAssignmentItems;
	}

	public TAssignmentItem addTAssignmentItem(TAssignmentItem TAssignmentItem) {
		getTAssignmentItems().add(TAssignmentItem);
		TAssignmentItem.setTAssignmentSection(this);

		return TAssignmentItem;
	}

	public TAssignmentItem removeTAssignmentItem(TAssignmentItem TAssignmentItem) {
		getTAssignmentItems().remove(TAssignmentItem);
		TAssignmentItem.setTAssignmentSection(null);

		return TAssignmentItem;
	}

	public TAssignment getTAssignment() {
		return this.TAssignment;
	}

	public void setTAssignment(TAssignment TAssignment) {
		this.TAssignment = TAssignment;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}