package net.gvsun.domain.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;


/**
 * The persistent class for the t_gradebook database table.
 * 
 */
@Entity
@Table(name="object_weight")
@NamedQuery(name="ObjectWeight.findAll", query="SELECT t FROM ObjectWeight t")
public class ObjectWeight implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	@Column(name="object_id")
	private Integer objectId;


	@Column(name="weight_id")
	private Integer weightId;

	@Column(name="final_weight")
	private BigDecimal finalWeight;

	private Integer enable;

	@Column(name="marking_score")
	private BigDecimal markingScore;

	public ObjectWeight() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getObjectId() {
		return objectId;
	}

	public void setObjectId(Integer objectId) {
		this.objectId = objectId;
	}

	public Integer getWeightId() {
		return weightId;
	}

	public void setWeightId(Integer weightId) {
		this.weightId = weightId;
	}

	public BigDecimal getFinalWeight() {
		return finalWeight;
	}

	public void setFinalWeight(BigDecimal finalWeight) {
		this.finalWeight = finalWeight;
	}

	public Integer getEnable() {
		return enable;
	}

	public void setEnable(Integer enable) {
		this.enable = enable;
	}

	public BigDecimal getMarkingScore() {
		return markingScore;
	}

	public void setMarkingScore(BigDecimal markingScore) {
		this.markingScore = markingScore;
	}
}