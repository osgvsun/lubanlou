package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;


/**
 * The persistent class for the t_assignment_item_component database table.
 * 
 */
@Entity
@Table(name="t_assignment_item_component")
@NamedQuery(name="TAssignmentItemComponent.findAll", query="SELECT t FROM TAssignmentItemComponent t")
public class TAssignmentItemComponent implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@Column(name="item_quantity")
	private Integer itemQuantity;

	@Column(name="item_score")
	private double itemScore;

	@Column(name="item_type")
	private Integer itemType;

	@Column(name="section_name")
	private String sectionName;

	//bi-directional many-to-one association to TAssignment
	@ManyToOne
	@JoinColumn(name="t_assignment_id")
	private TAssignment TAssignment;

	//bi-directional many-to-one association to TAssignmentQuestionpool
	@ManyToOne
	@JoinColumn(name="t_questionpool_id")
	private TAssignmentQuestionpool TAssignmentQuestionpool;

	public TAssignmentItemComponent() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getItemQuantity() {
		return this.itemQuantity;
	}

	public void setItemQuantity(int itemQuantity) {
		this.itemQuantity = itemQuantity;
	}

	public double getItemScore() {
		return this.itemScore;
	}

	public void setItemScore(double itemScore) {
		this.itemScore = itemScore;
	}

	public Integer getItemType() {
		return this.itemType;
	}

	public void setItemType(int itemType) {
		this.itemType = itemType;
	}

	public String getSectionName() {
		return this.sectionName;
	}

	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}

	public TAssignment getTAssignment() {
		return this.TAssignment;
	}

	public void setTAssignment(TAssignment TAssignment) {
		this.TAssignment = TAssignment;
	}

	public TAssignmentQuestionpool getTAssignmentQuestionpool() {
		return this.TAssignmentQuestionpool;
	}

	public void setTAssignmentQuestionpool(TAssignmentQuestionpool TAssignmentQuestionpool) {
		this.TAssignmentQuestionpool = TAssignmentQuestionpool;
	}

}