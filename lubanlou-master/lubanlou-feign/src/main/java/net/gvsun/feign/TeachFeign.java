package net.gvsun.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "gvsunTms", path = "/gvsunTms")
public interface TeachFeign {
    @RequestMapping(method = RequestMethod.GET, value = "/userCenter/getPersonalCourseSite")
    String getPersonalCourseSite(@RequestParam("username") String username);

    @RequestMapping(method = RequestMethod.GET, value = "/apiForConfigCenter/getAllTCourseSiteList")
    String getAllTCourseSiteList();

    @RequestMapping(method = RequestMethod.GET, value = "/system/characteristicCourseListApi")
    String characteristicCourseListApi(@RequestParam(required = false, value = "teacher") String teacher
            ,@RequestParam("page") Integer page,@RequestParam("pageSize")  Integer pageSize);
}
