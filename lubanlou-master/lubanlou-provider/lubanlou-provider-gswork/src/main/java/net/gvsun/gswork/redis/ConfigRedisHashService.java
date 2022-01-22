package net.gvsun.gswork.redis;

import org.springframework.stereotype.Service;

@Service("ConfigRedisHashService")
public class ConfigRedisHashService extends RedisHashService {

    public ConfigRedisHashService() {
        super("platform-assignment-config");
    }

}
