package net.gvsun.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import  net.gvsun.config.CustomRouteLocator;
import  net.gvsun.dto.ResultDataDto;
import  net.gvsun.entity.GatewayApiDefine;
import  net.gvsun.feign.OFeign;
import  net.gvsun.service.GatewayService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.zuul.filters.Route;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.regex.Pattern;

/**
 * 陈敬
 *
 * @since 2021年2月2日
 */
@Component
public class TokenFilter extends ZuulFilter {
    private static final Logger logger = LoggerFactory.getLogger(TokenFilter.class);
    private final FilterUtils filterUtils;
    private final GatewayService gatewayService;
    private final CustomRouteLocator customRouteLocator;
    private final ObjectMapper mapper = new ObjectMapper();
    private final OFeign oFeign;
    public static final String OAUTH2_HEADER_PREFIX = "Bearer ";
    public static final String OAUTH2_HEADER = "Authorization";
    private static final String SPLIT = "\r\n";

    @Autowired
    public TokenFilter(FilterUtils filterUtils, GatewayService gatewayService,
                       CustomRouteLocator customRouteLocator,
                       OFeign oFeign) {
        this.filterUtils = filterUtils;
        this.gatewayService = gatewayService;
        this.customRouteLocator = customRouteLocator;
        this.oFeign = oFeign;
    }

    @Override
    public String filterType() {
        return FilterConstants.PRE_TYPE;
    }

    @Override
    public int filterOrder() {
        return 0;
    }

    @Override
    public boolean shouldFilter() {
        String serviceId = filterUtils.getServiceId();
        List<GatewayApiDefine> globalWhitelist = gatewayService.getGlobalWhitelist();
        boolean exist = false;
        for (GatewayApiDefine g : globalWhitelist) {
            if (g.getServiceId().equals(serviceId)) {
                exist = true;
                break;
            }
        }
        return !exist;
    }

    @Override
    public Object run() throws ZuulException {
        System.out.println("TokenFilter============================");
        RequestContext requestContext = RequestContext.getCurrentContext();
        HttpServletRequest request = requestContext.getRequest();
        String uri = request.getRequestURI();
        List<Route> routes = customRouteLocator.getRoutes();
        List<GatewayApiDefine> globalWhitelist = gatewayService.getGlobalWhitelist();
        List<GatewayApiDefine> partialWhiteList = gatewayService.getPartialWhiteList();
        List<GatewayApiDefine> partialBlackList = gatewayService.getPartialBlackList();
        List<GatewayApiDefine> disableServiceList = gatewayService.getDisableServiceList();

        System.out.println("globalWhitelist");
        for(GatewayApiDefine g : globalWhitelist) {
            System.out.println(g.getServiceId());
        }
        System.out.println("partialWhiteList");
        for(GatewayApiDefine g : partialWhiteList) {
            System.out.println(g.getServiceId());
        }
        System.out.println("partialBlackList");
        for(GatewayApiDefine g : partialBlackList) {
            System.out.println(g.getServiceId());
        }
        System.out.println("disableServiceList");
        for(GatewayApiDefine g : disableServiceList) {
            System.out.println(g.getServiceId());
        }

        if (serviceIn(globalWhitelist)) {//访问全局白名单中的服务
            logger.info("访问{}微服务,地址:{},全局白名单", filterUtils.getServiceId(), uri);
        } else if (serviceIn(partialWhiteList)) {//访问局部白名单中的服务
            GatewayApiDefine service = gatewayService.getServiceById(filterUtils.getServiceId());
            if (partialWhiteMatch(service)) {  //访问路径在局部白名单中
                return null;
            } else {//不在局部白名单，需要认证
                logger.info("访问{}微服务,地址:{},需要认证", filterUtils.getServiceId(), uri);
                if (authentication()) {
                    return null;
                } else {
                    errorResponse("认证未通过");
                    return null;
                }
            }
        } else if (serviceIn(partialBlackList)) {
            GatewayApiDefine service = gatewayService.getServiceById(filterUtils.getServiceId());
            if (partialBlackMatch(service)) {  //访问路径在局部黑名单中，需要认证
                logger.info("访问{}微服务,地址:{},需要认证", filterUtils.getServiceId(), uri);
                if (authentication()) {
                    return null;
                } else {
                    errorResponse("认证未通过");
                    return null;
                }
            } else {//不在局部黑名单
                return null;
            }
        } else if (serviceIn(disableServiceList)) {//访问禁用的服务
            logger.info("访问{}微服务,地址:{},服务禁用", filterUtils.getServiceId(), uri);
            errorResponse("指定的服务被禁用");
        }
        return null;
    }


    private boolean serviceIn(List<GatewayApiDefine> list) {
        String serviceId = filterUtils.getServiceId();
        boolean in = false;
        if (serviceId != null) {
            for (GatewayApiDefine g : list) {
                if (g.getServiceId().equals(serviceId)) {
                    in = true;
                    break;
                }
            }
        }
        return in;
    }

    /**
     * 将服务的局部白名单和访问uri进行匹配
     *
     * @return true 如果是局部白名单，false 需要进行token验证
     */
    private boolean partialWhiteMatch(GatewayApiDefine service) {
        String partWhiteLabel = service.getPartWhiteLabel();
        if (!StringUtils.isEmpty(partWhiteLabel)) {
            String[] paths = partWhiteLabel.split(SPLIT);
            String cPath = filterUtils.getServiceControllerPath();
            for (String path : paths) {
                if (Pattern.matches(path, cPath)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean partialBlackMatch(GatewayApiDefine service) {
        String partWhiteLabel = service.getPartWhiteLabel();
        if (!StringUtils.isEmpty(partWhiteLabel)) {
            String[] paths = partWhiteLabel.split(SPLIT);
            String cPath = filterUtils.getServiceControllerPath();
            for (String path : paths) {
                if (Pattern.matches(path, cPath)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean authentication() {
        RequestContext currentContext = RequestContext.getCurrentContext();
        String authorization = currentContext.getRequest().getHeader(OAUTH2_HEADER);
        if (!StringUtils.isEmpty(authorization)) {
            if (authorization.startsWith(OAUTH2_HEADER_PREFIX))
                authorization = authorization.substring(OAUTH2_HEADER_PREFIX.length());
            ResultDataDto<String> res = oFeign.checkToken(authorization);
            return res.getCode() == 0;
        }
        return false;
    }

    private void errorResponse(String msg) {
        try {
            ResultDataDto<String> res = new ResultDataDto<>(1, msg);
            RequestContext requestContext = RequestContext.getCurrentContext();
            requestContext.setSendZuulResponse(false);
            requestContext.getResponse().setContentType("application/json;charset=utf-8");
            requestContext.getResponse().getWriter().write(mapper.writeValueAsString(res));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
