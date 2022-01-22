package net.gvsun.gswork.vo.transcript;

import java.io.Serializable;

/**
 * Created by REM on 2019/2/26.
 */
public class TranscriptUserVo implements Serializable {
    private Integer id;
    private String username;
    private String cname;
    private String courseNumber;
    private Integer groupId;
    private Integer siteId;
    private Integer groupRanking;
    private String groupMarking;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber) {
        this.courseNumber = courseNumber;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Integer getSiteId() {
        return siteId;
    }

    public void setSiteId(Integer siteId) {
        this.siteId = siteId;
    }

    public Integer getGroupRanking() {
        return groupRanking;
    }

    public void setGroupRanking(Integer groupRanking) {
        this.groupRanking = groupRanking;
    }

    public String getGroupMarking() {
        return groupMarking;
    }

    public void setGroupMarking(String groupMarking) {
        this.groupMarking = groupMarking;
    }
}
