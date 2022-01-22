package net.gvsun.config;

import com.alibaba.fastjson.JSONArray;
import net.gvsun.datasource.ClientDatabaseContext;
import org.apache.commons.lang.time.StopWatch;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.logging.Logger;

@Aspect
@Component
public class WebLogAspect {

    @Autowired
    private ClientDatabaseContext clientDatabaseContext;

    private final static Logger logger = Logger.getLogger(WebLogAspect.class.getName());

    /**
     * A join point is in the controller layer if the method is
     * modified by public and defined in a type in the
     * com.shawn.service package or any sub-package under that
     * and modified by public.execution(*  net.gvsun.lims.web..*(..))l
     */
    @Pointcut("execution(* net.gvsun.web..*(..))")
    private void webLog() {
    }

    /**
     * Monitor the elapsed time of method on controller layer, in
     * order to detect performance problems as soon as possible.
     * If elapsed time > 1 s, log it as an error. Otherwise, log it
     * as an info.
     */
    @Around("webLog()")
    public Object monitorElapsedTime(ProceedingJoinPoint joinPoint) throws Throwable {
        // Timing the method in controller layer

        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        Object result;
        result = joinPoint.proceed();

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();
        // ip地址
        String ipAddr = getIpAddr(request);
        // 请求路径
        String requestUrl = request.getRequestURL().toString();
        // TODO：审核这里开放接口，不获取用户信息，暂时写死
        Object user = "anonymous";
        // 构造参数组集合
        List<Object> argList = new ArrayList<>();
        // TODO:此处懒加载导致多对多关系的实体类再转换json时会进入死循环，故先隐掉
        // for (Object arg : joinPoint.getArgs()) {
        //     // request/response无法使用toJSON
        //     if (!HttpServletRequest.class.isInstance(arg)&&!HttpServletResponse.class.isInstance(arg)&&!StandardSessionFacade.class.isInstance(arg) &&!ExtendedServletRequestDataBinder.class.isInstance(arg) ) {
        //        argList.add(JSON.toJSONString(arg,SerializerFeature.WriteMapNullValue));
        //     }
        // }
        Set<Map.Entry<String, String[]>> entrySet = request.getParameterMap().entrySet();
        Iterator<Map.Entry<String, String[]>> iterator = entrySet.iterator();
        StringBuilder parameters = new StringBuilder();
        parameters.append("[");
        while (iterator.hasNext()) {
            Map.Entry<String, String[]> next = iterator.next();
            if (Objects.nonNull(next)) {
                parameters.append("{");
                parameters.append(next.getKey());
                parameters.append("->");
                parameters.append(Arrays.toString(next.getValue()));
                parameters.append("}");
            }
        }
        parameters.append("]");
        stopWatch.stop();
        logger.info(String.format("方法耗时: %s,用户：%s,数据源：%s,请求路径：%s,请求参数：%s,对象参数：%s,IP：%s",
                stopWatch.getTime() + "毫秒",user.toString(), clientDatabaseContext.getCurrentDataSourceDto().getSchoolName(), requestUrl,
                parameters,JSONArray.toJSONString(argList),  ipAddr));
        return result;
    }

    @Before(value = "webLog()")
    public void doBefore() {
    }

    /**
     * 获取用户真实IP地址，不使用request.getRemoteAddr()的原因是有可能用户使用了代理软件方式避免真实IP地址,
     * 可是，如果通过了多级反向代理的话，X-Forwarded-For的值并不止一个，而是一串IP值
     *
     * @return ip
     */
    private String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
            // 多次反向代理后会有多个ip值，第一个ip才是真实ip
            if (ip.contains(",")) {
                ip = ip.split(",")[0];
            }
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
}