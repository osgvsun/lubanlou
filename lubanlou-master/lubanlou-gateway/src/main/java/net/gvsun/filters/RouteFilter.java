package net.gvsun.filters;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * 陈敬
 *
 * @since 2021年2月2日
 */
@Component
public class RouteFilter extends ZuulFilter {
    private final FilterUtils filterUtils;

    @Autowired
    public RouteFilter(FilterUtils filterUtils) {
        this.filterUtils = filterUtils;
    }

    @Override
    public String filterType() {
        return FilterConstants.ROUTE_TYPE;
    }

    @Override
    public int filterOrder() {
        return FilterUtils.ROUTE_FILTER;
    }

    @Override
    public boolean shouldFilter() {
        String serviceId = filterUtils.getServiceId();
        return "jwt".equals(serviceId);
    }

    @Override
    public Object run() throws ZuulException {
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();
        String url = request.getRequestURI();
        String substring = url.substring("/jwt".length());
        url = "/uaa" + substring;
        ctx.put(FilterConstants.REQUEST_URI_KEY, url);
        return null;
    }
}
