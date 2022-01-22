package net.gvsun.iot.external;


public class AppCommonHdwLogDTO {
    private String appUid;
    private String appBeginTime;
    private String appEndTime;
    private String dateTime;
    private Integer statusType;
    private String status;

    public AppCommonHdwLogDTO() {
    }

    public AppCommonHdwLogDTO(String appUid, String appBeginTime, String appEndTime, String dateTime, Integer statusType, String status) {
        this.appUid = appUid;
        this.appBeginTime = appBeginTime;
        this.appEndTime = appEndTime;
        this.dateTime = dateTime;
        this.statusType = statusType;
        this.status = status;
    }

    public String getAppUid() {
        return appUid;
    }

    public void setAppUid(String appUid) {
        this.appUid = appUid;
    }

    public String getAppBeginTime() {
        return appBeginTime;
    }

    public void setAppBeginTime(String appBeginTime) {
        this.appBeginTime = appBeginTime;
    }

    public String getAppEndTime() {
        return appEndTime;
    }

    public void setAppEndTime(String appEndTime) {
        this.appEndTime = appEndTime;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public Integer getStatusType() {
        return statusType;
    }

    public void setStatusType(Integer statusType) {
        this.statusType = statusType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
