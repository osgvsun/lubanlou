package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;


/**
 * The persistent class for the c_t_channel_state database table.
 * 
 */
@Entity
@Table(name="c_t_channel_state")
@NamedQuery(name="CTChannelState.findAll", query="SELECT c FROM CTChannelState c")
public class CTChannelState implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Integer id;

	private String name;

	//bi-directional many-to-one association to TCourseSiteArtical
	@OneToMany(mappedBy="CTChannelState")
	private Set<TCourseSiteArtical> TCourseSiteArticals;

	//bi-directional many-to-one association to TCourseSiteChannel
	@OneToMany(mappedBy="CTChannelState")
	private Set<TCourseSiteChannel> TCourseSiteChannels;

	public CTChannelState() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<TCourseSiteArtical> getTCourseSiteArticals() {
		return this.TCourseSiteArticals;
	}

	public void setTCourseSiteArticals(Set<TCourseSiteArtical> TCourseSiteArticals) {
		this.TCourseSiteArticals = TCourseSiteArticals;
	}

	public TCourseSiteArtical addTCourseSiteArtical(TCourseSiteArtical TCourseSiteArtical) {
		getTCourseSiteArticals().add(TCourseSiteArtical);
		TCourseSiteArtical.setCTChannelState(this);

		return TCourseSiteArtical;
	}

	public TCourseSiteArtical removeTCourseSiteArtical(TCourseSiteArtical TCourseSiteArtical) {
		getTCourseSiteArticals().remove(TCourseSiteArtical);
		TCourseSiteArtical.setCTChannelState(null);

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
		TCourseSiteChannel.setCTChannelState(this);

		return TCourseSiteChannel;
	}

	public TCourseSiteChannel removeTCourseSiteChannel(TCourseSiteChannel TCourseSiteChannel) {
		getTCourseSiteChannels().remove(TCourseSiteChannel);
		TCourseSiteChannel.setCTChannelState(null);

		return TCourseSiteChannel;
	}

}