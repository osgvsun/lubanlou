package net.gvsun.gswork;

import com.easycache.annotation.aop.EnableEasyCache;
import net.gvsun.datasource.EnableMultiDatasource;
import net.gvsun.es.service.DailyReportService;
import net.gvsun.feign.EnableGvSunFeign;
import net.gvsun.kafka.EnableGvSunKafka;
import net.gvsun.resource.service.ResourceContainerService;
import net.gvsun.resource.service.ResourceContainerServiceImplDefault;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableMBeanExport;
import org.springframework.jmx.support.RegistrationPolicy;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableMultiDatasource
@EnableMBeanExport(registration = RegistrationPolicy.IGNORE_EXISTING)
@EnableEurekaClient
@EnableAsync
@EnableEasyCache
@EnableGvSunFeign
@EnableGvSunKafka
public class GsWorkApplication {

	public static void main(String[] args) {
		SpringApplication.run(GsWorkApplication.class, args);
	}

	@Bean
	public ResourceContainerService resourceContainerService(@Value("${oauth2Host}") String oauth2Host) {
		return new ResourceContainerServiceImplDefault("教学平台", oauth2Host);
	}


	@Bean
	public DailyReportService dailyReportService(@Value("${es.host}") String esHost) {
		return new DailyReportService(esHost);
	}
}
