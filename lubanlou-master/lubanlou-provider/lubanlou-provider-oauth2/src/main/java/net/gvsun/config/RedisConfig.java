package net.gvsun.config;

import net.gvsun.oauth2.internal.FastDFS;
import net.gvsun.entity.Cookie;
import net.gvsun.entity.Token;
import net.gvsun.entity.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {
    @Bean
    @Qualifier("oauth2Token")
    public RedisTemplate<String, Token> oauth2redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Token> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(Token.class));

        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(new Jackson2JsonRedisSerializer<>(Token.class));

        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }

    @Bean
    @Qualifier("cookie")
    public RedisTemplate<String, Cookie> cookieRedisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Cookie> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(Cookie.class));

        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(new Jackson2JsonRedisSerializer<>(Cookie.class));

        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }

    @Bean
    @Qualifier("user")
    public RedisTemplate<String, User> userRedisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, User> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(User.class));

        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(new Jackson2JsonRedisSerializer<>(User.class));

        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }

    @Bean
    @Qualifier("fastDFS")
    public RedisTemplate<String, FastDFS> resourceContainerRedisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, FastDFS> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(FastDFS.class));

        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashValueSerializer(new Jackson2JsonRedisSerializer<>(FastDFS.class));

        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }
}
