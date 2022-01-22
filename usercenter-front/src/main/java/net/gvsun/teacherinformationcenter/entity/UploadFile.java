package net.gvsun.teacherinformationcenter.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "upload_file")
public class UploadFile implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "fileId")
    private Integer fileId;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "file_size")
    private float fileSize;

    @Column(name = "upload_datetime")
    private Date uploadDatetime;

    public Integer getFileId() {
        return fileId;
    }

    public void setFileId(Integer fileId) {
        this.fileId = fileId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public float getFileSize() {
        return fileSize;
    }

    public void setFileSize(float fileSize) {
        this.fileSize = fileSize;
    }

    public Date getUploadDatetime() {
        return uploadDatetime;
    }

    public void setUploadDatetime(Date uploadDatetime) {
        this.uploadDatetime = uploadDatetime;
    }
}
