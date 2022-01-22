package net.gvsun;

import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.datasource.EnableMultiDatasource;
import net.gvsun.datasource.RoutingConfiguration;
import net.gvsun.oauth2.dto.ClientDetail;
import net.gvsun.oauth2.service.CustomUserDetailsService;
import net.gvsun.oauth2.service.Oauth2Service;
import net.gvsun.oauth2.service.Oauth2ServiceImpl;
import net.gvsun.resource.service.ResourceContainerService;
import net.gvsun.resource.service.ResourceContainerServiceImplDefault;
import net.gvsun.session.EnableUnifySession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@ServletComponentScan
@EnableMultiDatasource
@EnableUnifySession
public class TeacherInformationCenterApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeacherInformationCenterApplication.class, args);
    }

    @Bean
    public ResourceContainerService resourceContainerService(@Value("${oauth2Host}") String oauth2Host) {
        return new ResourceContainerServiceImplDefault("用戶中心", oauth2Host);
    }

    @Bean
    public Oauth2Service oauth2Service(@Value("${oauth2Host}") String oauth2Host,
                                       @Value("${security.oauth2.client.clientId}") String clientId,
                                       @Value("${security.oauth2.client.clientSecret}") String clientSecret) {
        return new Oauth2ServiceImpl(oauth2Host, new ClientDetail(clientId, clientSecret));
    }

    @Bean
    public CustomUserDetailsService customUserDetailsService(Oauth2Service oauth2Service, ClientDatabaseContext clientDatabaseContext) {
        return new CustomUserDetailsService(oauth2Service, null, clientDatabaseContext);
    }
}
