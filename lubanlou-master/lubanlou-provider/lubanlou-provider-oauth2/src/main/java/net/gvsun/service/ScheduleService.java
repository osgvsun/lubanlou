package net.gvsun.service;

import lombok.extern.slf4j.Slf4j;
import net.gvsun.entity.Token;
import net.gvsun.service.redis.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Map;

@Slf4j
@Service
public class ScheduleService {
    private final RedisService redisService;

    @Autowired
    public ScheduleService(RedisService redisService) {
        this.redisService = redisService;
    }


    @PostConstruct
    public void deleteFilesPeriodically() {
        try {
            //从Redis里删除过期令牌
            Map<String, Token> entries = redisService.getAllToken();
            entries.forEach((k, v) -> {
                if (v.getTimeout() != null && v.getTimeout() < System.currentTimeMillis() / 1000) {
                    redisService.deleteAccessToken(v.getAccessToken());
                }
            });
        } catch (Exception e) {
            log.warn(String.format("定期清理Token计划任务执行失败:%s", e.getMessage()));
        }
    }
}
