package net.gvsun.feign;

import net.gvsun.iot.external.InstrumentReservationTodayDTO;
import net.gvsun.iot.external.LabRoomAgentDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

/**
 * @author 李涵
 * @Description 大仪系统对应feign接口
 * @Date 2021/1/20 10:22
 * @return
 **/
@FeignClient(value = "instruments", path = "/instruments/apiForIot")
public interface InsFeign {
    /**
     * @return
     * @Description 获取iot当天及隔天权限信息
     * @author SmarkLee
     * @Date 2021/4/7 11:26
     **/
    @PostMapping(value = "/getIotReservationDataDaily")
    List<InstrumentReservationTodayDTO> getIotReservationDataDaily();

    /**
     * @return
     * @Description 获取iot相关设备信息
     * @author SmarkLee
     * @Date 2021/4/7 11:26
     **/
    @PostMapping(value = "/getAgentDataDaily")
    List<LabRoomAgentDTO> getAgentDataDaily();
}
