package net.gvsun.feign;

import net.gvsun.common.Result;
import net.gvsun.device.internal.DeviceInfoDTO;
import net.gvsun.device.internal.LabConfigInfoDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(value = "device", path = "/device")
public interface DeviceFeign {
    @GetMapping(value = "/labInfo/{ids}")
    Result<List<DeviceInfoDTO>> getLabInfo(@PathVariable String ids);

    @GetMapping(value = "/labConfigInfo/{labIds}")
    Result<List<LabConfigInfoDTO>> getLabConfigInfo(@PathVariable String labIds);
}