package net.gvsun.feign.config;

import feign.Request;
import feign.RequestInterceptor;
import net.gvsun.datasource.ClientDatabase;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import org.springframework.context.annotation.Bean;

import java.util.concurrent.TimeUnit;


public class FeignClientConfig {
    @Bean
    public RequestInterceptor headerInterceptor() {
        return requestTemplate -> {
            requestTemplate.header(ClientDatabase.HEADER_KEY_NEW, ClientDatabaseContextHolder.getClientDatabase());
            requestTemplate.header(ClientDatabase.QUERY_KEY, ClientDatabaseContextHolder.getClientDatabase());
        };
    }

    @Bean
    public Request.Options options() {
        return new Request.Options(10, TimeUnit.SECONDS, 30, TimeUnit.SECONDS, true);
    }

}
