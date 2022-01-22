package net.gvsun.openapi.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;


/**
 * The persistent class for the t_gradebook database table.
 * 
 */
@Data
@Table(name="t_gradebook")
@ToString
public class TGradebook implements Serializable {
	private static final long serialVersionUID = 1L;

	@TableId(value = "id", type = IdType.AUTO)
	private Integer id;
	@Column(name="site_id")
	private Integer siteId;

	private String title;

	@Column(name="course_number")
	private String courseNumber;

	@Column(name="term_number")
	private String termNumber;

	@Column(name="term_name")
	private String termName;

	@Column(name="product")
	private String product;

}