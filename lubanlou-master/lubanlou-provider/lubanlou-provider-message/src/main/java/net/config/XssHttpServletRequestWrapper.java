package net.config;


import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.*;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.regex.Pattern;

public class XssHttpServletRequestWrapper extends HttpServletRequestWrapper {
    private static final Pattern scriptPattern1 = Pattern.compile("<script>(.*?)</script>", Pattern.CASE_INSENSITIVE);
    private static final Pattern scriptPattern2 = Pattern.compile("<script(.*?)>",Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
    private static final Pattern scriptPattern3 = Pattern.compile("</script>", Pattern.CASE_INSENSITIVE);
    private static final Pattern srcPattern1 = Pattern.compile("src[\r\n]*=[\r\n]*\\\'(.*?)\\\'", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
    private static final Pattern srcPattern2 = Pattern.compile("src[\r\n]*=[\r\n]*\\\"(.*?)\\\"", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
    private static final Pattern evalPattern = Pattern.compile("eval\\((.*?)\\)", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
    private static final Pattern expressionPattern = Pattern.compile("expression\\((.*?)\\)", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
    private static final Pattern javascriptPattern = Pattern.compile("javascript:", Pattern.CASE_INSENSITIVE);
    private static final Pattern vbscriptPattern = Pattern.compile("vbscript:", Pattern.CASE_INSENSITIVE);
    private static final Pattern onloadPattern = Pattern.compile("onload(.*?)=", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
    private static final Pattern iframePattern1 = Pattern.compile("<iframe>(.*?)</iframe>", Pattern.CASE_INSENSITIVE);
    private static final Pattern iframePattern2 = Pattern.compile("</iframe>", Pattern.CASE_INSENSITIVE);
    private static final Pattern iframePattern3 = Pattern.compile("<iframe(.*?)>", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
    HttpServletRequest orgRequest = null;

    public XssHttpServletRequestWrapper(HttpServletRequest request) {
        super(request);
        orgRequest = request;
    }

    /**
     * 覆盖getParameter方法，将参数名和参数值都做xss过滤。<br/>
     * 如果需要获得原始的值，则通过super.getParameterValues(name)来获取<br/>
     * getParameterNames,getParameterValues和getParameterMap也可能需要覆盖
     */
    @Override
    public String getParameter(String name) {
        String value = super.getParameter(cleanXSS(name));
        if (value != null) {
            value = cleanXSS(value);
        }
        return value;
    }
    @Override
    public Map<String, String[]> getParameterMap() {
        // change values to value
        Map<String, String[]> parameterMap = super.getParameterMap();
        Map<String, String[]> parameters = new HashMap<String, String[]>(parameterMap.size());
        for (Iterator it = parameterMap.keySet().iterator(); it.hasNext();) {
            Object key = it.next();
            String[] values = (String[]) parameterMap.get(key);
            if (values != null && values.length > 0) {
                int count = values.length;
                String[] encodedValues =new String[count];
                for(int i =0; i < count; i++){
                    encodedValues[i]= cleanXSS(values[i]);
                }
                parameters.put((String)key, encodedValues);
            }

        }
        return parameters;
    }
    @Override
    public String[] getParameterValues(String name) {
        String[] values =super.getParameterValues(name);
        if(values ==null){
            return null;
        }
        int count = values.length;
        String[] encodedValues =new String[count];
        for(int i =0; i < count; i++){
            encodedValues[i]= cleanXSS(values[i]);
        }
        return encodedValues;
    }

    /**
     * 覆盖getHeader方法，将参数名和参数值都做xss过滤。<br/>
     * 如果需要获得原始的值，则通过super.getHeaders(name)来获取<br/>
     * getHeaderNames 也可能需要覆盖
     */
    @Override
    public String getHeader(String name) {

        String value = super.getHeader(cleanXSS(name));
        if (value != null) {
            value = cleanXSS(value);
        }
        return value;
    }

    @Override
    public ServletInputStream getInputStream() throws IOException {
        String str=getRequestBody(super.getInputStream());
        cleanXSS(str);
        final ByteArrayInputStream bais = new ByteArrayInputStream(str.getBytes());
        return new ServletInputStream() {
            @Override
            public int read() throws IOException {
                return bais.read();
            }
            @Override
            public boolean isFinished() {
                return false;
            }
            @Override
            public boolean isReady() {
                return false;
            }
            @Override
            public void setReadListener(ReadListener listener) {
            }
        };
    }

    private String getRequestBody(InputStream stream) {
        String line = "";
        StringBuilder body = new StringBuilder();
        int counter = 0;

        // 读取POST提交的数据内容
        BufferedReader reader = new BufferedReader(new InputStreamReader(stream, Charset.forName("UTF-8")));
        try {
            while ((line = reader.readLine()) != null) {
                body.append(line);
                counter++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return body.toString();
    }


    /**
     * 获取最原始的request
     *
     * @return
     */
    public HttpServletRequest getOrgRequest() {
        return orgRequest;
    }

    /**
     * 获取最原始的request的静态方法
     *
     * @return
     */
    public static HttpServletRequest getOrgRequest(HttpServletRequest req) {
        if (req instanceof XssHttpServletRequestWrapper) {
            return ((XssHttpServletRequestWrapper) req).getOrgRequest();
        }

        return req;
    }

    private String cleanXSS(String value) {
        if (value != null) {
            // NOTE: It's highly recommended to use the ESAPI library and
            // uncomment the following line to
            // avoid encoded attacks.
            // value = ESAPI.encoder().canonicalize(value);
            // Avoid null characters
            value = value.replaceAll("", "");
            // Avoid anything between script tags
            value = scriptPattern1.matcher(value).replaceAll("");
            // Remove any lonesome <script ...> tag
            value = scriptPattern2.matcher(value).replaceAll("");
            // Remove any lonesome </script> tag
            value = scriptPattern3.matcher(value).replaceAll("");

            // Avoid anything in a src='...' type of expression
            value = srcPattern1.matcher(value).replaceAll("");
            value = srcPattern2.matcher(value).replaceAll("");

            // Avoid eval(...) expressions
            value = evalPattern.matcher(value).replaceAll("");

            // Avoid expression(...) expressions
            value = expressionPattern.matcher(value).replaceAll("");

            // Avoid javascript:... expressions
            value = javascriptPattern.matcher(value).replaceAll("");

            // Avoid vbscript:... expressions
            value = vbscriptPattern.matcher(value).replaceAll("");

            // Avoid onload= expressions
            value = onloadPattern.matcher(value).replaceAll("");

            // Remove any lonesome <iframe ...> tag
            value = iframePattern1.matcher(value).replaceAll("");
            value = iframePattern2.matcher(value).replaceAll("");
            value = iframePattern3.matcher(value).replaceAll("");
        }
        return value;
    }

} 