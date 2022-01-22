package net.gvsun.gswork.vo.courseInfo;

import java.io.Serializable;

/**************************************************************************
 * Description: 文档VO
 *
 * @author:lixueteng
 * @date:2018/2/6 0006
 **************************************************************************/
public class DocumentVO implements Serializable{
    private Integer id;
    private String resourceUrl;
    private String documentName;
    private String siteName;
    private String path;

    /**
     * 文件名
     */
    private String fileName;
    /**
     * 文件的url
     */
    private String fileUrl;
    private String size;

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getFileName() {
        return fileName;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public DocumentVO setFileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public DocumentVO setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
        return this;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getResourceUrl() {
        return resourceUrl;
    }

    public void setResourceUrl(String resourceUrl) {
        this.resourceUrl = resourceUrl;
    }

    public String getDocumentName() {
        return documentName;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }
}
