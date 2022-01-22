package net.gvsun.filters;

import com.netflix.zuul.context.RequestContext;
import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 陈敬
 *
 * @since 2021年2月2日
 */
@Component
public class FilterUtils {
    public static final int ROUTE_FILTER = 0;
    public static final int TOKEN_FILTER = 1;
    private static final Pattern SERVICE_ID_PATTERN = Pattern.compile("^/([^/]*)/.*");

    public String getServiceId() {
        RequestContext currentContext = RequestContext.getCurrentContext();
        String uri = currentContext.getRequest().getRequestURI();
        Matcher matcher = SERVICE_ID_PATTERN.matcher(uri);
        if (matcher.matches()) {
            return matcher.group(1);
        } else {
            return null;
        }
    }

    public String getServiceControllerPath() {
        RequestContext currentContext = RequestContext.getCurrentContext();
        String uri = currentContext.getRequest().getRequestURI();
        Matcher matcher = SERVICE_ID_PATTERN.matcher(uri);
        if (matcher.matches()) {
            String serviceId = matcher.group(1);
            if (uri.length() > serviceId.length() + 1) {
                return uri.substring(serviceId.length() + 1);
            } else {
                return "/";
            }
        } else {
            return null;
        }
    }
}
