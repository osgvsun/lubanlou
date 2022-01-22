package net.gvsun.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

/**
 * @Auther:lay
 * @Date: 2019/3/6 15:38
 * @Description:
 */
@Configuration
@EnableRedisHttpSession
public class RedisSessionConfig {

}
