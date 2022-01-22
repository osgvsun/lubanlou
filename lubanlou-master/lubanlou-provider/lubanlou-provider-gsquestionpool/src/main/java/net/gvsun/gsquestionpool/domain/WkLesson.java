package net.gvsun.gsquestionpool.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;


/**
 * The persistent class for the wk_lesson database table.
 * 
 */
@Entity
@Table(name="wk_lesson")
@NamedQuery(name="WkLesson.findAll", query="SELECT w FROM WkLesson w")
public class WkLesson implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	private String codeImgPath;

	@Lob
	private String content;

	private Timestamp createTime;

	@Lob
	private String deep;

	private Integer fileId;

	@Column(name="learning_target")
	private String learningTarget;

	private String remarks;

	private Integer seq;

	private String sourceList;

	private Integer testId;

	private String title;

	private String type;

	private String videoUrl;

	private Integer viewedNum;

	//bi-directional many-to-one association to WkFolder
	@OneToMany(mappedBy="wkLesson")
	private Set<WkFolder> wkFolders;

	//bi-directional many-to-one association to WkChapter
	@ManyToOne
	@JoinColumn(name="chapter_id")
	private WkChapter wkChapter;

	public WkLesson() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCodeImgPath() {
		return this.codeImgPath;
	}

	public void setCodeImgPath(String codeImgPath) {
		this.codeImgPath = codeImgPath;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Timestamp getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
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

	public String getLearningTarget() {
		return this.learningTarget;
	}

	public void setLearningTarget(String learningTarget) {
		this.learningTarget = learningTarget;
	}

	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Integer getSeq() {
		return this.seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public String getSourceList() {
		return this.sourceList;
	}

	public void setSourceList(String sourceList) {
		this.sourceList = sourceList;
	}

	public Integer getTestId() {
		return this.testId;
	}

	public void setTestId(int testId) {
		this.testId = testId;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getVideoUrl() {
		return this.videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

	public Integer getViewedNum() {
		return this.viewedNum;
	}

	public void setViewedNum(int viewedNum) {
		this.viewedNum = viewedNum;
	}

	public Set<WkFolder> getWkFolders() {
		return this.wkFolders;
	}

	public void setWkFolders(Set<WkFolder> wkFolders) {
		this.wkFolders = wkFolders;
	}

	public WkFolder addWkFolder(WkFolder wkFolder) {
		getWkFolders().add(wkFolder);
		wkFolder.setWkLesson(this);

		return wkFolder;
	}

	public WkFolder removeWkFolder(WkFolder wkFolder) {
		getWkFolders().remove(wkFolder);
		wkFolder.setWkLesson(null);

		return wkFolder;
	}

	public WkChapter getWkChapter() {
		return this.wkChapter;
	}

	public void setWkChapter(WkChapter wkChapter) {
		this.wkChapter = wkChapter;
	}

}