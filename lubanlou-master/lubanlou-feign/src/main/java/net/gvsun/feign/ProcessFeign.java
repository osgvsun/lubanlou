package net.gvsun.feign;


import net.gvsun.common.Result;
import net.gvsun.process.external.ProcessDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(value = "process/api/process")
public interface ProcessFeign {
    /*************************************************************************************
     * Description:启动安全检查流程实例-督导检查、过程计划
     *
     * @author: 杨新蔚
     * @date: 2021/3/12
     *************************************************************************************/
    @PostMapping(path = "/startExampleOfCheckProcess")
    Result startExampleOfCheckProcess(@RequestBody ProcessDTO processDTO);

    /*************************************************************************************
     * Description: 完成安全检查流程当前任务节点，根据审核一级进入下一级或结束流程实例
     *
     * @author: 杨新蔚
     * @date: 2021/3/12
     *************************************************************************************/
    @PostMapping(path = "/completeTaskOfCheckProcess")
    Result completeTaskOfCheckProcess(@RequestBody ProcessDTO processDTO);

}
