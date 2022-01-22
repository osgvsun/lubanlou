package net.gvsun.openapi.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the t_grade_object database table.
 * 
 */
@Data
@Table(name="t_grade_object")
@ToString
public class TGradeObject implements Serializable {
	private static final long serialVersionUID = 1L;

	@TableId(value = "id", type = IdType.AUTO)
	private Integer id;
	@Column(name="assignment_id")
	private  String assignmentId;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="due_time")
	private Date dueTime;

	private Integer marked;

	@Column(name="points_possible")
	private BigDecimal pointsPossible;
	@Column(name="grade_id")
	private Integer gradeId;

	private Integer released;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="start_time")
	private Date startTime;

	private String title;

	private String type;
	private String module;

	private BigDecimal weight;
	@Column(name="experiment_title")
	private String experimentTitle;
	@Column(name="experiment_id")
	private Integer experimentId;
	@Column(name="is_open")
	private Integer isOpen;

}