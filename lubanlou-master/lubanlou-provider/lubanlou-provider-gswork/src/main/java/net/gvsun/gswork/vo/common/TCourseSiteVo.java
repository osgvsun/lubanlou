package net.gvsun.gswork.vo.common;

import java.io.Serializable;

/**************************************************************************
 * Description:站点的VO层
 *
 * @author:lixueteng
 * @date:2017/11/9 0009
 **************************************************************************/
public class TCourseSiteVo implements Serializable{
    /**
     *  站点id
     */
    private Integer id;
    /**
     * 站点标题
     */
    private String title;

    private Integer termId;

    private String termName;

    private String userByCreatedBy;

    private String cname;

    private Integer isopen;

    private String siteCode;

    public Integer getId() {
        return id;
    }

    public TCourseSiteVo setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public TCourseSiteVo setTitle(String title) {
        this.title = title;
        return this;
    }
    public Integer getTermId() {
        return termId;
    }

    public void setTermId(Integer termId) {
        this.termId = termId;
    }
    public String getUserByCreatedBy() {
        return userByCreatedBy;
    }

    public void setUserByCreatedBy(String userByCreatedBy) {
        this.userByCreatedBy = userByCreatedBy;
    }

    public Integer getIsopen() {
        return isopen;
    }

    public void setIsopen(Integer isopen) {
        this.isopen = isopen;
    }

    public String getSiteCode() {
        return siteCode;
    }

    public void setSiteCode(String siteCode) {
        this.siteCode = siteCode;
    }

    public String getTermName() {
        return termName;
    }

    public void setTermName(String termName) {
        this.termName = termName;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }
}
