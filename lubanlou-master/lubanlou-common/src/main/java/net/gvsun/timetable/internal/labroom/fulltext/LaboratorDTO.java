package net.gvsun.timetable.internal.labroom.fulltext;


import lombok.Data;
import net.gvsun.timetable.internal.device.LabRoomDeviceDTO;
import net.gvsun.timetable.internal.labroom.CommonDocumentDTO;
import net.gvsun.timetable.internal.labroom.LabRoomAgentDTO;
import net.gvsun.timetable.internal.labroom.fulltext.LabRoomAdminDTO;
import net.gvsun.timetable.internal.labroom.fulltext.SoftWareDTO;
import net.gvsun.timetable.internal.operation.OperationItemDetailDTO;

import java.io.Serializable;
import java.util.List;

/**
*  Description
*
*  @author weicheng
*  @date 2021/2/18 10:44
*/
@Data
public class LaboratorDTO implements Serializable {
    private Integer id;
    private String labRoomName;
    private LabRoomDetailDTO labRoomDetailDTO;
    private List<OperationItemDetailDTO> operationItemDetailDTOS;
    private List<LabRoomAdminDTO> labRoomAdminDTOS;
    private List<LabRoomAdminDTO> iotAdminDTOS;
    private List<LabRoomAgentDTO> agentDTOS;
    private List<SoftWareDTO> softwareDTOS;
    private List<LabRoomDeviceDTO> schoolDeviceDTOS;
    private List<CommonDocumentDTO> commonDocumentDTOS;


}
