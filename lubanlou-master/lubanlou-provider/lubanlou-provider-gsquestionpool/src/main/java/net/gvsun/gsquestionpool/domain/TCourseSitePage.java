package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;


/**
 * The persistent class for the t_course_site_page database table.
 * 
 */
@Entity
@Table(name="t_course_site_page")
@NamedQuery(name="TCourseSitePage.findAll", query="SELECT t FROM TCourseSitePage t")
public class TCourseSitePage implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	private Integer popup;

	@Column(name="site_order")
	private Integer siteOrder;

	private String title;

	//bi-directional many-to-one association to TCourseSite
	@ManyToOne
	@JoinColumn(name="site_id")
	private TCourseSite TCourseSite;

	public TCourseSitePage() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getPopup() {
		return this.popup;
	}

	public void setPopup(int popup) {
		this.popup = popup;
	}

	public Integer getSiteOrder() {
		return this.siteOrder;
	}

	public void setSiteOrder(int siteOrder) {
		this.siteOrder = siteOrder;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public TCourseSite getTCourseSite() {
		return this.TCourseSite;
	}

	public void setTCourseSite(TCourseSite TCourseSite) {
		this.TCourseSite = TCourseSite;
	}

}