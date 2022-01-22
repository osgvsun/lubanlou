package net.gvsun.iot.external;

import java.util.Objects;

public class AppRealUseDTO {
    private String appUid;
    private String appRealBeginTime;
    private String appRealEndTime;
    private Float realUseHour;

    public void setRealUseHour(Float realUseHour) {
        if (Objects.isNull(realUseHour)) {
            this.realUseHour = 0.0f;
        }
        this.realUseHour = realUseHour;
    }

    public Float getRealUseHour() {
        if (Objects.isNull(realUseHour)) {
            return 0.0f;
        }
        return realUseHour;
    }

    public AppRealUseDTO() {
    }

    public AppRealUseDTO(String appUid) {
        this.appUid = appUid;
    }

    public AppRealUseDTO setAppRealUseDTO(String appUid, String appRealBeginTime, String appRealEndTime, Float realUseHour) {
        this.appUid = appUid;
        this.appRealBeginTime = appRealBeginTime;
        this.appRealEndTime = appRealEndTime;
        this.realUseHour = realUseHour;
        return this;
    }

    public String getAppUid() {
        return appUid;
    }

    public void setAppUid(String appUid) {
        this.appUid = appUid;
    }

    public String getAppRealBeginTime() {
        return appRealBeginTime;
    }

    public void setAppRealBeginTime(String appRealBeginTime) {
        this.appRealBeginTime = appRealBeginTime;
    }

    public String getAppRealEndTime() {
        return appRealEndTime;
    }

    public void setAppRealEndTime(String appRealEndTime) {
        this.appRealEndTime = appRealEndTime;
    }
}
