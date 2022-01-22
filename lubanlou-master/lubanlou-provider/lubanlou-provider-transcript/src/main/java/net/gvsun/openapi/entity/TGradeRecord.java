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
 * The persistent class for the t_grade_record database table.
 * 
 */
@Data
@Table(name="t_grade_record")
@ToString
public class TGradeRecord implements Serializable {
	private static final long serialVersionUID = 1L;

	@TableId(value = "id", type = IdType.AUTO)
	private Integer id;

	@Column(name = "student_number")
	private String studentNumber;

	private String cname;

	private BigDecimal points;

	@Column(name="object_id")
	private Integer objectId;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="record_time")
	private Date recordTime;

	@Column(name="weight_id")
	private Integer weightId;

	@Column(name = "grade_by")
	private String gradeBy;

}