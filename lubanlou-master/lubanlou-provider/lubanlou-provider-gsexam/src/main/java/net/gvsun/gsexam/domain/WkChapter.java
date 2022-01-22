package net.gvsun.gsexam.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;


/**
 * The persistent class for the wk_chapter database table.
 * 
 */
@Entity
@Table(name="wk_chapter")
@NamedQuery(name="WkChapter.findAll", query="SELECT w FROM WkChapter w")
public class WkChapter implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id")
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;

	@Lob
	private String content;

	@Lob
	private String deep;

	private Integer fileId;

	private String fileList;

	private Integer lockchapter;

	private String name;

	private Integer seq;

	private Integer type;

	private String videoUrl;

	//bi-directional many-to-one association to TCourseSite
	@ManyToOne
	@JoinColumn(name="site_id")
	private TCourseSite TCourseSite;

	//bi-directional many-to-one association to WkFolder
	@OneToMany(mappedBy="wkChapter")
	private Set<WkFolder> wkFolders;

	//bi-directional many-to-one association to WkLesson
	@OneToMany(mappedBy="wkChapter")
	private Set<WkLesson> wkLessons;

	public WkChapter() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getDeep() {
		return this.deep;
	}

	public void setDeep(String deep) {
		this.deep = deep;
	}

	public Integer getFileId() {
		return this.fileId;
	}

	public void setFileId(int fileId) {
		this.fileId = fileId;
	}

	public String getFileList() {
		return this.fileList;
	}

	public void setFileList(String fileList) {
		this.fileList = fileList;
	}

	public Integer getLockchapter() {
		return this.lockchapter;
	}

	public void setLockchapter(int lockchapter) {
		this.lockchapter = lockchapter;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSeq() {
		return this.seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public Integer getType() {
		return this.type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getVideoUrl() {
		return this.videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

	public TCourseSite getTCourseSite() {
		return this.TCourseSite;
	}

	public void setTCourseSite(TCourseSite TCourseSite) {
		this.TCourseSite = TCourseSite;
	}

	public Set<WkFolder> getWkFolders() {
		return this.wkFolders;
	}

	public void setWkFolders(Set<WkFolder> wkFolders) {
		this.wkFolders = wkFolders;
	}

	public WkFolder addWkFolder(WkFolder wkFolder) {
		getWkFolders().add(wkFolder);
		wkFolder.setWkChapter(this);

		return wkFolder;
	}

	public WkFolder removeWkFolder(WkFolder wkFolder) {
		getWkFolders().remove(wkFolder);
		wkFolder.setWkChapter(null);

		return wkFolder;
	}

	public Set<WkLesson> getWkLessons() {
		return this.wkLessons;
	}

	public void setWkLessons(Set<WkLesson> wkLessons) {
		this.wkLessons = wkLessons;
	}

	public WkLesson addWkLesson(WkLesson wkLesson) {
		getWkLessons().add(wkLesson);
		wkLesson.setWkChapter(this);

		return wkLesson;
	}

	public WkLesson removeWkLesson(WkLesson wkLesson) {
		getWkLessons().remove(wkLesson);
		wkLesson.setWkChapter(null);

		return wkLesson;
	}

}