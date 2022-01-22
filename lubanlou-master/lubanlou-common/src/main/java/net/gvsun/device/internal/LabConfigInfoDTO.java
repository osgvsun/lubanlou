package net.gvsun.device.internal;

import lombok.Data;

import java.util.List;

@Data
public class LabConfigInfoDTO {

    private String labId;
    private String configUid;
    private String openObject;
    private String openScope;

    private List<ConfigOpenTimeDTO> configOpenTimeDTOList;
}
