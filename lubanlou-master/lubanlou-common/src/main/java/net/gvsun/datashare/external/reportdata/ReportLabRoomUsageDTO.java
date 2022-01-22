package net.gvsun.datashare.external.reportdata;

import lombok.Data;

import java.util.List;

/**
 * Created by Administrator on 2021/9/1.
 */
@Data
public class ReportLabRoomUsageDTO {
    private String roomId;
    private String buildName;
    private String floorNo;
    private String labRoomName;
    private String labRoomUsage;
    private List<LabRoomWeekUsageDTO> labRoomWeekUsageDTOList;
    private String labCenter;
    private String academyName;
    private String termNumber;
}
