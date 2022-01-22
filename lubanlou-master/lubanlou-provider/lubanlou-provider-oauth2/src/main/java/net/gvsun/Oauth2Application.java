package net.gvsun;

import com.easycache.annotation.aop.EnableEasyCache;
import net.gvsun.datasource.EnableMultiDatasource;
import net.gvsun.feign.EnableGvSunFeign;
import net.gvsun.kafka.EnableGvSunKafka;
import net.gvsun.rbac.EnableRBAC;
import net.gvsun.session.EnableUnifySession;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
@EnableMultiDatasource
@EnableEasyCache
@EnableUnifySession
@EnableGvSunKafka
@EnableGvSunFeign
@EnableRBAC
public class Oauth2Application {
    public static void main(String[] args) {
        SpringApplication.run(Oauth2Application.class, args);
    }
}
