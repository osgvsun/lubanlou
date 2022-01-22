package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the t_assignment_grading_attachment database table.
 * 
 */
@Entity
@Table(name="t_assignment_grading_attachment")
@NamedQuery(name="TAssignmentGradingAttachment.findAll", query="SELECT t FROM TAssignmentGradingAttachment t")
public class TAssignmentGradingAttachment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="t_assignment_grading_attachment_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer tAssignmentGradingAttachmentId;

	@Column(name="created_by")
	private String createdBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_time")
	private Date createdTime;

	private String gradeUrl;

	@Column(name="group_id")
	private Integer groupId;

	private String name;

	@Column(name="t_assignment_grading_id")
	private Integer tAssignmentGradingId;

	private Integer type;

	public TAssignmentGradingAttachment() {
	}

	public Integer getTAssignmentGradingAttachmentId() {
		return this.tAssignmentGradingAttachmentId;
	}

	public void setTAssignmentGradingAttachmentId(int tAssignmentGradingAttachmentId) {
		this.tAssignmentGradingAttachmentId = tAssignmentGradingAttachmentId;
	}

	public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedTime() {
		return this.createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public String getGradeUrl() {
		return this.gradeUrl;
	}

	public void setGradeUrl(String gradeUrl) {
		this.gradeUrl = gradeUrl;
	}

	public Integer getGroupId() {
		return this.groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getTAssignmentGradingId() {
		return this.tAssignmentGradingId;
	}

	public void setTAssignmentGradingId(int tAssignmentGradingId) {
		this.tAssignmentGradingId = tAssignmentGradingId;
	}

	public Integer getType() {
		return this.type;
	}

	public void setType(int type) {
		this.type = type;
	}

}