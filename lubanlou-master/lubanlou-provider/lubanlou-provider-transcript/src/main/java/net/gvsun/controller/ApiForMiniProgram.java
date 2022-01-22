package net.gvsun.controller;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/apiForMiniProgram")
public class ApiForMiniProgram {

    private final StringRedisTemplate stringRedisTemplate;

    public ApiForMiniProgram(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    @GetMapping(value = "/getModule")
    public String getModule(@RequestParam String schoolName) {
        String data = (String) stringRedisTemplate.opsForHash().get("platform-xcx-module", schoolName);
        if (Objects.isNull(data)) {
            data = stringRedisTemplate.opsForValue().get("platform-xcx-module-default");
            if (Objects.isNull(data)) {
                return "失败，请检查默认模板是否配置";
            }
        }
        return data;
    }
}
