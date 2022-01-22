package net.gvsun.gsexam.domain;

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
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;

	private String title;

	//bi-directional many-to-one association to TGradeObject
	@OneToMany(mappedBy="TGradebook")
	private Set<TGradeObject> TGradeObjects;

	//bi-directional many-to-one association to TCourseSite
	@ManyToOne
	@JoinColumn(name="site_id")
	private TCourseSite TCourseSite;

	public TGradebook() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Set<TGradeObject> getTGradeObjects() {
		return this.TGradeObjects;
	}

	public void setTGradeObjects(Set<TGradeObject> TGradeObjects) {
		this.TGradeObjects = TGradeObjects;
	}

	public TGradeObject addTGradeObject(TGradeObject TGradeObject) {
		getTGradeObjects().add(TGradeObject);
		TGradeObject.setTGradebook(this);

		return TGradeObject;
	}

	public TGradeObject removeTGradeObject(TGradeObject TGradeObject) {
		getTGradeObjects().remove(TGradeObject);
		TGradeObject.setTGradebook(null);

		return TGradeObject;
	}

	public TCourseSite getTCourseSite() {
		return this.TCourseSite;
	}

	public void setTCourseSite(TCourseSite TCourseSite) {
		this.TCourseSite = TCourseSite;
	}

}