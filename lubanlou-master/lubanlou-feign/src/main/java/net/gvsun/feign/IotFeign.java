package net.gvsun.feign;

import net.gvsun.common.LayTableVO;
import net.gvsun.iot.external.CommonHdwlogDTO;
import net.gvsun.iot.external.IotParameter;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * @Description IOT微服务对应feign接口
 * @Date 2021/8/18
 * @author SmarkLee
 **/
@FeignClient(value = "iot")
public interface IotFeign {
    /**
     * @description 获取物联操作日志(包含分页参数)
     * @param iotParameter iot统一查询参数
     * @param page 页码
     * @param limit 大小
     * @author  SmarkLee
     * @date  2021/8/18
     * @return
     **/
    @RequestMapping("/getIotLog")
    LayTableVO<List<CommonHdwlogDTO>> getIotLog(@RequestBody(required = false) IotParameter iotParameter,
                                                 @RequestParam(value ="page",required = false) Integer page,
                                                 @RequestParam(value ="limit",required = false) Integer limit);
    /**
     * @description 获取物联操作日志(不包含分页参数)
     * @param iotParameter iot统一查询参数
     * @author  SmarkLee
     * @date  2021/9/9
     * @return
     **/
    @RequestMapping("/getIotLog")
    LayTableVO<List<CommonHdwlogDTO>> getIotLog(@RequestBody(required = false) IotParameter iotParameter);
}
