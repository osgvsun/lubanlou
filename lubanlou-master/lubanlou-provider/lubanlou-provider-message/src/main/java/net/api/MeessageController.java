package net.api;

import net.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@Controller
@RequestMapping("/message")

public class MeessageController {
    @Autowired
    MessageService messageService;
    @Value("${apiGateWayHost}")
    private String apiGateWayHost;

    @RequestMapping("/getMessageInfos")
    public String getMessageInfos(Map map){
        map.put("apiGateWayHost",apiGateWayHost);

        return "index";
    }
}
