package net.gvsun.gswork.redis;

import org.springframework.stereotype.Service;

@Service("TeachConfigRedisHashService")
public class TeachConfigRedisHashService extends RedisHashService{
    public TeachConfigRedisHashService(){
        super("platform-teach-config");
    };
}
