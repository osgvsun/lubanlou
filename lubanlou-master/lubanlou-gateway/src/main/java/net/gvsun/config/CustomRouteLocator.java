package net.gvsun.config;

import net.gvsun.entity.GatewayApiDefine;
import  net.gvsun.service.GatewayService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.cloud.netflix.zuul.filters.RefreshableRouteLocator;
import org.springframework.cloud.netflix.zuul.filters.SimpleRouteLocator;
import org.springframework.cloud.netflix.zuul.filters.ZuulProperties;
import org.springframework.cloud.netflix.zuul.filters.ZuulProperties.ZuulRoute;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Component
public class CustomRouteLocator extends SimpleRouteLocator implements RefreshableRouteLocator {
    public final static Logger logger = LoggerFactory.getLogger(CustomRouteLocator.class);
    private final GatewayService gatewayService;
    private ServerProperties server;
    private ZuulProperties properties;

    @Autowired
    public CustomRouteLocator(ServerProperties server, ZuulProperties properties, GatewayService gatewayService) {
        super(server.getServerHeader(), properties);
        this.properties = properties;
        this.server = server;
        this.gatewayService = gatewayService;
    }

    @Override
    public void refresh() {
        doRefresh();
    }

    @Override
    protected Map<String, ZuulRoute> locateRoutes() {
        LinkedHashMap<String, ZuulRoute> routesMap = new LinkedHashMap<String, ZuulRoute>();
        //从application.properties中加载路由信息
        routesMap.putAll(super.locateRoutes());
        //从db中加载路由信息
        routesMap.putAll(locateRoutesFromDB());
        //优化一下配置
        LinkedHashMap<String, ZuulRoute> values = new LinkedHashMap<>();
        for (Map.Entry<String, ZuulRoute> entry : routesMap.entrySet()) {
            String path = entry.getKey();
            // Prepend with slash if not already present.
            if (!path.startsWith("/")) {
                path = "/" + path;
            }
            if (StringUtils.hasText(this.properties.getPrefix())) {
                path = this.properties.getPrefix() + path;
                if (!path.startsWith("/")) {
                    path = "/" + path;
                }
            }
            values.put(path, entry.getValue());
        }
        return values;
    }

    private Map<String, ZuulRoute> locateRoutesFromDB() {
        Map<String, ZuulRoute> routes = new LinkedHashMap<>();
        List<GatewayApiDefine> results = gatewayService.getAllService();
        for (GatewayApiDefine result : results) {
            if (StringUtils.isEmpty(result.getPath()) && StringUtils.isEmpty(result.getUrl())) {
                continue;
            }
            result.setId(result.getServiceId());
            ZuulRoute zuulRoute = new ZuulRoute();
            try {
                org.springframework.beans.BeanUtils.copyProperties(result, zuulRoute);
            } catch (Exception e) {
                logger.error("load zuul route info from db with error:", e);
            }
            routes.put(zuulRoute.getPath(), zuulRoute);
        }
        return routes;
    }

}
