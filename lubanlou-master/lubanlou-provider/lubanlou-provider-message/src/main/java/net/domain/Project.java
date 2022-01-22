package net.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;


/**
 * The persistent class for the user database table.
 * 
 */
@Data
@Entity
@Table(name = "project")
public class Project implements Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 * 主键
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	/**
	 * 项目名称
	 */
	@Column(name="project")
	private String project;
	/**
	 * 项目中文名
	 */
	@Column(name="project_name")
	private String projectName;
}