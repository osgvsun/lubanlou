package net.gvsun.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Created by hasee on 2018/1/4.
 */
@Configuration
@EnableSwagger2
public class Swagger2 {

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
//                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("net"))
                .paths(PathSelectors.any())
                .build();
    }

//    private ApiInfo apiInfo() {
//        Contact contact=new Contact();
//        return new ApiInfoBuilder()
//                .title("Blog系统API文档")
//                .contact(contact.toString())
//                .build();
//    }

}