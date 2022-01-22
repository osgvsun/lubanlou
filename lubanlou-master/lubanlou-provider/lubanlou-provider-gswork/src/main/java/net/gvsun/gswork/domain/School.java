package net.gvsun.gswork.domain;

import javax.persistence.*;
import java.io.Serializable;


/**
 * The persistent class for the book_type database table.
 * 
 */
@Entity
@Table(name="school")
@NamedQuery(name="School.findAll", query="SELECT s FROM School s")
public class School implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer number;

	@Column(name="name")
	private String name;


	public School() {
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

}