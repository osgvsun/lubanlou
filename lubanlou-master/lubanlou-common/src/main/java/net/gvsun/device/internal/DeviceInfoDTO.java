package net.gvsun.device.internal;

import lombok.Data;

@Data
public class DeviceInfoDTO {

    private String deviceId;
    private String deviceName;
    private String configUid;

    private String admins;

}
