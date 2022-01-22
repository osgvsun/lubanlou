package net.gvsun.device.internal;

import lombok.Data;

@Data
public class ConfigOpenTimeDTO {

    private String uid;
    private String configAppUid;
    private String status;
    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;
    private String info;
    private String weekdays;
    private String minAheadTime;
    private String maxAheadTime;
    private String reason;
    private String openRank;
}
