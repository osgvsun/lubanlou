package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserPersonnelCategoryInfoDto implements Serializable {
    private Long id;
    private String personnelCategory;
    private Date startDatetime;
    private String startDatetimeFormat;
    private Date endDatetime;
    private String endDatetimeFormat;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPersonnelCategory() {
        return personnelCategory;
    }

    public void setPersonnelCategory(String personnelCategory) {
        this.personnelCategory = personnelCategory;
    }

    public String getStartDatetime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (startDatetimeFormat != null) {
            format = new SimpleDateFormat(startDatetimeFormat);
        }
        if (startDatetime != null)
            return format.format(startDatetime);
        else
            return null;
    }

    public void setStartDatetime(Date startDatetime) {
        this.startDatetime = startDatetime;
    }

    public void setPersonnelCategoryStartTime(Date startDatetime, String format) {
        this.startDatetime = startDatetime;
        this.startDatetimeFormat = format;
    }

    public String getEndDatetime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (endDatetimeFormat != null) {
            format = new SimpleDateFormat(endDatetimeFormat);
        }
        if (endDatetime != null)
            return format.format(endDatetime);
        else
            return null;
    }

    public void setEndDatetime(Date endDatetime) {
        this.endDatetime = endDatetime;
    }

    public void setEndDatetime(Date endDatetime, String foramt) {
        this.endDatetime = endDatetime;
        this.endDatetimeFormat = foramt;
    }
}
