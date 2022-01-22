package net.gvsun;

import net.gvsun.datasource.EnableMultiDatasource;
import net.gvsun.feign.EnableGvSunFeign;
import net.gvsun.kafka.EnableGvSunKafka;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @SpringBootApplication默认扫描当前包及其子包，可以通过(scanBasePackages = "")配置要扫描的包
 */
@EnableEurekaClient
@SpringBootApplication
@EnableTransactionManagement//启用事务
@EnableMultiDatasource
@EnableGvSunKafka
@EnableGvSunFeign
public class AuditApplication {
    protected static final Logger logger = LoggerFactory.getLogger(AuditApplication.class);

    @Bean
    public Runnable createRunnable() {
        return () -> {
            logger.info("欢迎使用审核服务v1.0.1 --- author:Jason");
        };
    }

    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(AuditApplication.class);
        ConfigurableApplicationContext context = application.run(args);
        context.getBean(Runnable.class).run();
    }
}
