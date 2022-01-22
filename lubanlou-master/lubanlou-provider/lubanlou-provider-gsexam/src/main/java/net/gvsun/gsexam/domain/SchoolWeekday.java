package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;


/**
 * The persistent class for the school_weekday database table.
 * 
 */
@Entity
@Table(name="school_weekday")
@NamedQuery(name="SchoolWeekday.findAll", query="SELECT s FROM SchoolWeekday s")
public class SchoolWeekday implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	@Column(name="weekday_name")
	private String weekdayName;

	public SchoolWeekday() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getWeekdayName() {
		return this.weekdayName;
	}

	public void setWeekdayName(String weekdayName) {
		this.weekdayName = weekdayName;
	}

}