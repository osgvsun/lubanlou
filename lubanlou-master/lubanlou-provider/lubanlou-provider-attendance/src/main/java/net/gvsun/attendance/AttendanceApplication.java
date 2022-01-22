package net.gvsun.attendance;

import net.gvsun.datasource.EnableMultiDatasource;
import net.gvsun.feign.EnableGvSunFeign;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;


@EnableEurekaClient
@SpringBootApplication
@EnableMultiDatasource
@EnableGvSunFeign
public class AttendanceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AttendanceApplication.class, args);
    }
}
