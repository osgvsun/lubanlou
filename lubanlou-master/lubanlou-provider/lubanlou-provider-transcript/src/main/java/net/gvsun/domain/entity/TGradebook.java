package net.gvsun.domain.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;


/**
 * The persistent class for the t_gradebook database table.
 * 
 */
@Entity
@Table(name="t_gradebook")
@NamedQuery(name="TGradebook.findAll", query="SELECT t FROM TGradebook t")
public class TGradebook implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
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

	public TGradebook() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getSiteId() {
		return siteId;
	}

	public void setSiteId(Integer siteId) {
		this.siteId = siteId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCourseNumber() {
		return courseNumber;
	}

	public void setCourseNumber(String courseNumber) {
		this.courseNumber = courseNumber;
	}

	public String getTermNumber() {
		return termNumber;
	}

	public void setTermNumber(String termNumber) {
		this.termNumber = termNumber;
	}

	public String getTermName() {
		return termName;
	}

	public void setTermName(String termName) {
		this.termName = termName;
	}

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}
}