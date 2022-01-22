package net.gvsun.feign;

import net.gvsun.common.LayTableVO;
import net.gvsun.configcenter.internal.api.CommonResult;
import net.gvsun.process.internal.TimetableDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * Description Feign-配置中心
 *
 * @author fubowen
 * @date 2021-5-24
 */
@FeignClient(value = "configcenter")
public interface ConfigcenterFeign {

    @RequestMapping(method = RequestMethod.POST, value = "/api/timetable/timetable")
    String timetable(@RequestBody TimetableDTO timetableDTO);

    @RequestMapping(method = RequestMethod.POST, value = "/api/timetableProcess/timetableByTimetableAndStep")
    String timetableByTimetableAndStep(@RequestParam("timetableId") Integer timetableId, @RequestParam("processStep") Integer processStep);

    @RequestMapping(method = RequestMethod.POST, value = "/api/timetable/timetableList")
    String timetableList(@RequestBody List<TimetableDTO> timetableDTOS);

    @RequestMapping(method = RequestMethod.GET, value = "/api/timetable/info")
    CommonResult<List<net.gvsun.configcenter.internal.TimetableDTO>> info(@RequestParam(value = "timetableId") Integer timetableId);

    @RequestMapping(method = RequestMethod.GET, value = "/api/timetableProcess/report/academicAdvisor")
    LayTableVO<List<List<String>>> reportAcademicAdvisor(@RequestParam(value = "page",required = false)Integer page,
                                                         @RequestParam(value = "limit",required = false)Integer limit,
                                                         @RequestParam(value = "search",required = false)String search);
}