package net;

import net.gvsun.datasource.EnableMultiDatasource;
import net.gvsun.feign.EnableGvSunFeign;
import net.gvsun.kafka.EnableGvSunKafka;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableScheduling
@EnableDiscoveryClient
@EnableEurekaClient
@EnableMultiDatasource
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "net.repository")
@SpringBootApplication
@EnableGvSunFeign
@EnableGvSunKafka
public class Application {

    public static void main(String[] args) {
        try {
            ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
