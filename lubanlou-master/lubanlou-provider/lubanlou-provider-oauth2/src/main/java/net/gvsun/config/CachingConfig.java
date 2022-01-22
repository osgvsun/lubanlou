package net.gvsun.config;

import com.easycache.EasyCacheConfig;
import com.easycache.manager.CacheManager;
import com.easycache.manager.factory.JedisCacheManagerFactory;
import com.easycache.serializer.impl.JacksonJsonSerializer;
import com.easycache.serializer.impl.StringSerializer;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import redis.clients.jedis.JedisPool;

@Configuration
public class CachingConfig {
    @Bean
    @Primary
    public EasyCacheConfig easyCacheConfig(@Value("${EasyCache.redis.host}") String host,
                                           @Value("${EasyCache.redis.port}") int port,
                                           @Value("${EasyCache.redis.password:#{null}}") String password,
                                           @Value("${EasyCache.redis.database}") Integer database) {
        EasyCacheConfig easyCacheConfig = new EasyCacheConfig();
        easyCacheConfig.setNamespace("OAuth2");

        EasyCacheConfig.RedisConfig redisConfig = easyCacheConfig.new RedisConfig();
        redisConfig.setHost(host);
        redisConfig.setPort(port);
        redisConfig.setPassword(password);
        redisConfig.setDatabase(database);

        easyCacheConfig.setRedisConfig(redisConfig);
        return easyCacheConfig;
    }

    @Bean
    @Primary
    public CacheManager easyCacheManager(EasyCacheConfig easyCacheConfig, JedisPool jedisPool) {
        return new JedisCacheManagerFactory(
                jedisPool,
                new StringSerializer(),         //键序列化器
                //为了方便调试，关闭值压缩和二级缓存
                new JacksonJsonSerializer(),    //值序列化器（不压缩）
                easyCacheConfig,
                null           //不配置二级缓存
        ).create();
    }
}
