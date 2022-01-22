package net.gvsun.feign;

import net.gvsun.feign.config.FeignClientConfig;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Import;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@EnableFeignClients("net.gvsun.feign")
@Import(FeignClientConfig.class)
public @interface EnableGvSunFeign {
}
