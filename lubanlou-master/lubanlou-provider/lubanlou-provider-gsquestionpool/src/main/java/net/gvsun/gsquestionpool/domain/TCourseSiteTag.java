package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;


/**
 * The persistent class for the t_course_site_tag database table.
 * 
 */
@Entity
@Table(name="t_course_site_tag")
@NamedQuery(name="TCourseSiteTag.findAll", query="SELECT t FROM TCourseSiteTag t")
public class TCourseSiteTag implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	private String description;

	@Column(name="site_tag")
	private String siteTag;

	@Column(name="site_tag_text")
	private String siteTagText;

	private Integer type;

	//bi-directional many-to-one association to TCourseSiteArtical
	@OneToMany(mappedBy="TCourseSiteTag")
	private Set<TCourseSiteArtical> TCourseSiteArticals;

	//bi-directional many-to-one association to TCourseSiteChannel
	@OneToMany(mappedBy="TCourseSiteTag")
	private Set<TCourseSiteChannel> TCourseSiteChannels;

	public TCourseSiteTag() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSiteTag() {
		return this.siteTag;
	}

	public void setSiteTag(String siteTag) {
		this.siteTag = siteTag;
	}

	public String getSiteTagText() {
		return this.siteTagText;
	}

	public void setSiteTagText(String siteTagText) {
		this.siteTagText = siteTagText;
	}

	public Integer getType() {
		return this.type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Set<TCourseSiteArtical> getTCourseSiteArticals() {
		return this.TCourseSiteArticals;
	}

	public void setTCourseSiteArticals(Set<TCourseSiteArtical> TCourseSiteArticals) {
		this.TCourseSiteArticals = TCourseSiteArticals;
	}

	public TCourseSiteArtical addTCourseSiteArtical(TCourseSiteArtical TCourseSiteArtical) {
		getTCourseSiteArticals().add(TCourseSiteArtical);
		TCourseSiteArtical.setTCourseSiteTag(this);

		return TCourseSiteArtical;
	}

	public TCourseSiteArtical removeTCourseSiteArtical(TCourseSiteArtical TCourseSiteArtical) {
		getTCourseSiteArticals().remove(TCourseSiteArtical);
		TCourseSiteArtical.setTCourseSiteTag(null);

		return TCourseSiteArtical;
	}

	public Set<TCourseSiteChannel> getTCourseSiteChannels() {
		return this.TCourseSiteChannels;
	}

	public void setTCourseSiteChannels(Set<TCourseSiteChannel> TCourseSiteChannels) {
		this.TCourseSiteChannels = TCourseSiteChannels;
	}

	public TCourseSiteChannel addTCourseSiteChannel(TCourseSiteChannel TCourseSiteChannel) {
		getTCourseSiteChannels().add(TCourseSiteChannel);
		TCourseSiteChannel.setTCourseSiteTag(this);

		return TCourseSiteChannel;
	}

	public TCourseSiteChannel removeTCourseSiteChannel(TCourseSiteChannel TCourseSiteChannel) {
		getTCourseSiteChannels().remove(TCourseSiteChannel);
		TCourseSiteChannel.setTCourseSiteTag(null);

		return TCourseSiteChannel;
	}

}