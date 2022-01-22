package net.gvsun.service.usercenter;

import net.gvsun.config.PropertiesConfigure;
import net.gvsun.feign.UsercenterFeign;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserCenterService {
    private final PropertiesConfigure propertiesConfigure;
    private final RestTemplate restTemplate;
    private final UsercenterFeign userCenterFeignClient;

    public UserCenterService(PropertiesConfigure propertiesConfigure,
                             @Qualifier("datasourceRestTemplate") RestTemplate restTemplate,
                             UsercenterFeign userCenterFeignClient) {
        this.propertiesConfigure = propertiesConfigure;
        this.restTemplate = restTemplate;
        this.userCenterFeignClient = userCenterFeignClient;
    }


    public void boundPhoneNumber(String username, String phone, String email) {
        //String gateWayHost = propertiesConfigure.getApiGateWayHost();
        //restTemplate.postForObject(gateWayHost + "/usercenter/datashare/boundPhoneNumber?username={username}&phone={phone}&email={email}", null, String.class, username, phone, email);
        userCenterFeignClient.boundPhone(username, phone, email);
    }
}
