package net.gvsun.gsquestionpool;

import com.easycache.annotation.aop.EnableEasyCache;
import com.github.tobato.fastdfs.FdfsClientConfig;
import net.gvsun.datasource.EnableMultiDatasource;
import net.gvsun.datasource.RoutingConfiguration;
import net.gvsun.resource.service.ResourceContainerService;
import net.gvsun.resource.service.ResourceContainerServiceImplDefault;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableMBeanExport;
import org.springframework.context.annotation.Import;
import org.springframework.jmx.support.RegistrationPolicy;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableMultiDatasource
@EnableMBeanExport(registration = RegistrationPolicy.IGNORE_EXISTING)
@EnableEurekaClient
@EnableAsync
@EnableEasyCache
@EnableFeignClients
@Import({FdfsClientConfig.class, RoutingConfiguration.class})
public class QuestionpoolApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuestionpoolApplication.class, args);
	}

	@Bean
	public ResourceContainerService resourceContainerService(@Value("${oauth2Host}") String oauth2Host) {
		return new ResourceContainerServiceImplDefault("教学平台", oauth2Host);
	}

}
