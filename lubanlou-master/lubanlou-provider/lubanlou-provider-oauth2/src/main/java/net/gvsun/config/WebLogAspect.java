package net.gvsun.config;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.serializer.SerializerFeature;
import net.gvsun.datasource.ClientDatabaseContext;
import org.apache.catalina.session.StandardSessionFacade;
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
import org.springframework.web.servlet.mvc.method.annotation.ExtendedServletRequestDataBinder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import java.util.logging.Logger;

@Aspect
@Component
public class WebLogAspect {

    private final static Logger logger = Logger.getLogger(WebLogAspect.class.getName());
    @Autowired
    private ClientDatabaseContext clientDatabaseContext;

    /**
     * A join point is in the controller layer if the method is
     * modified by public and defined in a type in the
     * com.shawn.service package or any sub-package under that
     * and modified by public.execution(* net.gvsun.web..*(..))l
     */
    @Pointcut("execution(* net.gvsun.controller..*(..))")
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

        // ip??????
        String ipAddr = getIpAddr(request);
        // ????????????
        String requestUrl = request.getRequestURL().toString();

        // ?????????????????????
        List<Object> argList = new ArrayList<>();
        /*for (Object arg : joinPoint.getArgs()) {
            if (!HttpServletRequest.class.isInstance(arg) && !HttpServletResponse.class.isInstance(arg) && !StandardSessionFacade.class.isInstance(arg) && !ExtendedServletRequestDataBinder.class.isInstance(arg)) {
                argList.add(JSON.toJSONString(arg, SerializerFeature.WriteMapNullValue));
            }
        }*/
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
        logger.info(String.format("????????????: %s,????????????%s,???????????????%s,???????????????%s,???????????????%s,IP???%s",
                stopWatch.getTime() + "??????", clientDatabaseContext.getCurrentDataSourceDto().getSchoolName(), requestUrl, parameters, JSONArray.toJSONString(argList), ipAddr));
        return result;
    }

    @Before(value = "webLog()")
    public void doBefore() {
    }

    /**
     * ??????????????????IP??????????????????request.getRemoteAddr()??????????????????????????????????????????????????????????????????IP??????,
     * ???????????????????????????????????????????????????X-Forwarded-For????????????????????????????????????IP???
     *
     * @return ip
     */
    private String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
            // ?????????????????????????????????ip???????????????ip????????????ip
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