package net.gvsun.service;

import org.springframework.cloud.netflix.zuul.RoutesRefreshedEvent;
import org.springframework.cloud.netflix.zuul.filters.RouteLocator;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

/****************************************************************************
 * description：
 *
 *  @author：林威
 *  @date：2019-6-11
 ****************************************************************************/
@Service
public class RefreshRouteService {
    private final ApplicationEventPublisher publisher;
    private final RouteLocator routeLocator;

    public RefreshRouteService(ApplicationEventPublisher publisher, RouteLocator routeLocator) {
        this.publisher = publisher;
        this.routeLocator = routeLocator;
    }

    public void refreshRoute() {
        RoutesRefreshedEvent routesRefreshedEvent = new RoutesRefreshedEvent(routeLocator);
        publisher.publishEvent(routesRefreshedEvent);
    }

}
