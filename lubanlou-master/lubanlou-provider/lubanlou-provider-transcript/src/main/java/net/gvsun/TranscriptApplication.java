package net.gvsun;

import net.gvsun.datasource.EnableMultiDatasource;
import net.gvsun.feign.EnableGvSunFeign;
import net.gvsun.kafka.EnableGvSunKafka;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableDiscoveryClient
@EnableEurekaClient
@EnableJpaRepositories
@EnableMultiDatasource
@EnableGvSunFeign
@EnableGvSunKafka
public class TranscriptApplication {

    public static void main(String[] args) {
        SpringApplication.run(TranscriptApplication.class, args);
    }

}

