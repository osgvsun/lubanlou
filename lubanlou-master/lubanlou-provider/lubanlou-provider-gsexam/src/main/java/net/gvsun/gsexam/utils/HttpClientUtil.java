package net.gvsun.gsexam.utils;


import net.gvsun.datasource.ClientDatabase;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import org.apache.http.Consts;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**************************************************************************
 * Description: HttpClient工具类
 *
 * @author:lixueteng
 * @date:2017/12/7 0007
 **************************************************************************/
public class HttpClientUtil {

    /**
     * 创建Httpclient对象 兼容https
     */
    public static CloseableHttpClient createTrustHttpsClient(String url) {
        if (url.startsWith("https")) {
            try {
                SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
                    @Override
                    public boolean isTrusted(X509Certificate[] x509Certificates, String s) throws CertificateException {
                        // return true 表示所有https请求 绕开证书验证
                        return true;
                    }
                }).build();
                HostnameVerifier hostnameVerifier = new HostnameVerifier() {
                    @Override
                    // 暂无host校验
                    public boolean verify(String s, SSLSession sslSession) {
                        return true;
                    }
                };
                SSLConnectionSocketFactory socketFactory = new SSLConnectionSocketFactory(sslContext, hostnameVerifier);
                return HttpClients.custom().setSSLSocketFactory(socketFactory).build();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            } catch (KeyManagementException e) {
                e.printStackTrace();
            } catch (KeyStoreException e) {
                e.printStackTrace();
            }
        }
        return HttpClients.createDefault();
    }

    public static String doGet(String url, Map<String, String> param) {
        // 创建Httpclient对象
        CloseableHttpClient httpclient = createTrustHttpsClient(url);

        String resultString = "";
        CloseableHttpResponse response = null;
        try {
            // 创建uri
            URIBuilder builder = new URIBuilder(url);
            if (param != null) {
                for (String key : param.keySet()) {
                    builder.addParameter(key, param.get(key));
                }
            }
            URI uri = builder.build();

            // 创建http GET请求
            HttpGet httpGet = new HttpGet(uri);
            httpGet.addHeader(ClientDatabase.HEADER_KEY, ClientDatabaseContextHolder.getClientDatabase());
            // 执行请求
            response = httpclient.execute(httpGet);
            // 判断返回状态是否为200
            if (response.getStatusLine().getStatusCode() == 200) {
                resultString = EntityUtils.toString(response.getEntity(), "UTF-8");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                response.close();
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return resultString;
    }

    public static String doPost(String url, Map<String, String> param) {
        return doPost(url, param, null);
    }

    public static String doPost(String url, Map<String, String> param, Map<String, String> header) {
        // 创建Httpclient对象
        CloseableHttpClient httpClient = createTrustHttpsClient(url);
        CloseableHttpResponse response = null;
        String resultString = "";
        try {
            // 创建Http Post请求
            HttpPost httpPost = new HttpPost(url);
            if (header != null) {
                for (String key : header.keySet()) {
                    httpPost.addHeader(key, header.get(key));
                }
            }
            httpPost.addHeader(ClientDatabase.HEADER_KEY, ClientDatabaseContextHolder.getClientDatabase());
            // 创建参数列表
            if (param != null) {
                List<NameValuePair> paramList = new ArrayList<>();
                for (String key : param.keySet()) {
                    paramList.add(new BasicNameValuePair(key, param.get(key)));
                }
                // 模拟表单
                UrlEncodedFormEntity entity = new UrlEncodedFormEntity(paramList, "utf-8");
                httpPost.setEntity(entity);
            }
            // 执行http请求
            response = httpClient.execute(httpPost);
            resultString = EntityUtils.toString(response.getEntity(), "utf-8");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                response.close();
                httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return resultString;
    }

    public static String doPostJson(String url, String json) {
        // 创建Httpclient对象
        CloseableHttpClient httpClient = createTrustHttpsClient(url);
        CloseableHttpResponse response = null;
        String resultString = "";
        try {
            // 创建Http Post请求
            HttpPost httpPost = new HttpPost(url);
            // 创建请求内容
            StringEntity entity = new StringEntity(json, ContentType.APPLICATION_JSON);
            httpPost.setEntity(entity);
            httpPost.addHeader(ClientDatabase.HEADER_KEY, ClientDatabaseContextHolder.getClientDatabase());
            // 执行http请求
            response = httpClient.execute(httpPost);
            resultString = EntityUtils.toString(response.getEntity(), "utf-8");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                response.close();
                httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return resultString;
    }

    public static String doPostFile(String url, Object object, Map<String, String> map) {
        // 创建Httpclient对象
        CloseableHttpClient httpClient = createTrustHttpsClient(url);
        CloseableHttpResponse response = null;
        String resultString = "";
        try {
            // 创建Http Post请求
            HttpPost httpPost = new HttpPost(url);
            // 创建请求内容
            MultipartEntityBuilder multipartEntityBuilder = MultipartEntityBuilder.create();
            if (object instanceof MultipartFile) {
                MultipartFile file = (MultipartFile) object;
                multipartEntityBuilder.addBinaryBody("file", file.getInputStream(), ContentType.create("multipart/form-data", Consts.UTF_8), file.getOriginalFilename());
            }
            if (object instanceof File) {
                File file = (File) object;
                multipartEntityBuilder.addBinaryBody("file", file, ContentType.create("multipart/form-data", Consts.UTF_8), file.getName());
            }
            Set<Map.Entry<String, String>> entrySet = map.entrySet();
            for (Map.Entry<String, String> entry : entrySet) {
                multipartEntityBuilder.addTextBody(entry.getKey(), entry.getValue(), ContentType.create("text/plain", Consts.UTF_8));
            }
            httpPost.setEntity(multipartEntityBuilder.build());
            httpPost.addHeader(ClientDatabase.HEADER_KEY, ClientDatabaseContextHolder.getClientDatabase());
            // 执行http请求
            response = httpClient.execute(httpPost);
            resultString = EntityUtils.toString(response.getEntity(), "utf-8");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                response.close();
                httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return resultString;
    }

}
