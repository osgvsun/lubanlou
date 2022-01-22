package net.gvsun.controller;

import net.gvsun.service.GatewayService;
import net.gvsun.service.RefreshRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gateway")
public class GatewayController {
    private final RefreshRouteService refreshRouteService;
    private final GatewayService gatewayService;

    @Autowired
    public GatewayController(RefreshRouteService refreshRouteService, GatewayService gatewayService) {
        this.refreshRouteService = refreshRouteService;
        this.gatewayService = gatewayService;
    }

    @RequestMapping("/refreshRoute")
    public String refreshRoute() {
        refreshRouteService.refreshRoute();
        gatewayService.refreshCache();
        return "success";
    }

    @GetMapping("test")
    public String test() {
        return "2021年10月26日";
    }
}
