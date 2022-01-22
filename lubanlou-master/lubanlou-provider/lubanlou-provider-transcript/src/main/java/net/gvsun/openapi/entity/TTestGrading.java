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
 * The persistent class for the t_test_grading database table.
 * 
 */
@Data
@Table(name="t_test_grading")
@ToString
public class TTestGrading implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@TableId(value = "id", type = IdType.AUTO)
	private Integer id;

	private String student;

	@Column(name="site_id")
	private Integer siteId;

	private String cname;

	@Column(name="course_number")
	private String courseNumber;

	@Column(name="action_grade")
	private BigDecimal actionGrade;

	@Column(name="attendance_grade")
	private BigDecimal attendanceGrade;

	@Column(name="exam_grade")
	private BigDecimal examGrade;

	@Column(name="experiment_grade")
	private BigDecimal experimentGrade;

	@Column(name="group_grade")
	private BigDecimal groupGrade;

	@Column(name="task_grade")
	private BigDecimal taskGrade;

	@Column(name="addition_score")
	private BigDecimal additionScore;

	@Column(name="addition_test_score")
	private BigDecimal additionTestScore;

	@Column(name="addition_task_score")
	private BigDecimal additionTaskScore;

	@Column(name="addition_exam_score")
	private BigDecimal additionExamScore;

	@Column(name="addition_attendance_score")
	private BigDecimal additionAttendanceScore;

	@Column(name="addition_action_score")
	private BigDecimal additionActionScore;

	@Column(name="addition_experiment_score")
	private BigDecimal additionExperimentScore;

	@Column(name="addition_group_score")
	private BigDecimal additionGroupScore;

	@Column(name="test_grade")
	private BigDecimal testGrade;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="update_time")
	private Date updateTime;

	@Column(name="group_id")
	private Integer groupId;

	@Column(name="group_title")
	private String groupTitle;

	@Column(name="classes_number")
	private String classesNumber;

	@Column(name="group_ranking")
	private Integer groupRanking;

	@Column(name="group_marking")
	private String groupMarking;

}