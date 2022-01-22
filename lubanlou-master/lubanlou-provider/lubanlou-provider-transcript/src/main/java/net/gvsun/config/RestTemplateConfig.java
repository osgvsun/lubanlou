package net.gvsun.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {

    @Autowired
    @Qualifier("datasourceRestTemplate")
    private RestTemplate restTemplate;

    @Bean
    public RestTemplate restTemplate() {
        return restTemplate;
    }

}
