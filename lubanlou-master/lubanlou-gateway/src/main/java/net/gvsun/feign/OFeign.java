package net.gvsun.feign;

import  net.gvsun.dto.ResultDataDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "oauth2", path = "/uaa")
public interface OFeign {
    @GetMapping(value = "/oauth/checkToken")
    ResultDataDto<String> checkToken(@RequestParam String access_token);
}
