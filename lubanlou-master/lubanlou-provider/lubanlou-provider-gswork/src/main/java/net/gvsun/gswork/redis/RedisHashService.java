package net.gvsun.gswork.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.Map;
import java.util.Set;

public class RedisHashService {

    @Autowired
    private StringRedisTemplate redisTemplate;
    private String key;

    public RedisHashService() {
    }

    public RedisHashService(String key) {
        this.key = key;
    }

    public Object get(Object hashKey) {
        return redisTemplate.opsForHash().get(key, hashKey);
    }

    public void put(Object hashKey, Object hashValue) {
        redisTemplate.opsForHash().put(key, hashKey, hashValue);
    }

    public Set<Object> keys() {
        return redisTemplate.opsForHash().keys(key);
    }

    public void putAll(Map<?, ?> map) {
        redisTemplate.opsForHash().putAll(key, map);
    }


}
