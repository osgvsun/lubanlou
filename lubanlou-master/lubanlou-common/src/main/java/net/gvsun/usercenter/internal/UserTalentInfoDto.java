package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserTalentInfoDto implements Serializable {
    private Long id;
    private String username;
    private String talent;
    private Date talentTime;
    private String talentTimeFormat;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTalent() {
        return talent;
    }

    public void setTalent(String talent) {
        this.talent = talent;
    }

    public String getTalentTime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy");
        if (talentTimeFormat != null) {
            format = new SimpleDateFormat(talentTimeFormat);
        }
        if (talentTime != null)
            return format.format(talentTime);
        else
            return null;
    }

    public void setTalentTime(Date talentTime) {
        this.talentTime = talentTime;
    }

    public void setTalentTime(Date talentTime, String format) {
        this.talentTime = talentTime;
        this.talentTimeFormat = format;
    }
}
