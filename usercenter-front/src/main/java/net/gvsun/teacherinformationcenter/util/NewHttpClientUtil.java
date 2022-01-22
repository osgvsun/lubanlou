package net.gvsun.teacherinformationcenter.util;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.function.Function;

/**
 * 模拟HTTP请求，支持POST方法和GET方法，
 * 其中POST方法可以使用application/x-www-form-urlencoded编码格式、
 * multipart/form-data编码格式（支持传递文件）、
 * application/json编码格式。
 * <p>
 * 对于GET方法，参数会放在url的后面。
 * <p>
 * 每个方法还有对应的带有内容处理器的版本，如果你不想直接处理字符串形式的响应内容（原始响应数据），
 * 可以给这些GET或POST方法注册一个内容处理器，它会返回给你你指定的数据类型。
 *
 * @author 陈敬
 * @since 2019年7月11日
 */
public class NewHttpClientUtil {
    /**
     * 模拟GET请求，模拟的编码方式是application/x-www-form-urlencoded（GET唯一支持的编码方式）
     *
     * @param httpUrl    地址
     * @param parameters 请求参数
     * @param headers    请求头
     * @return 返回响应字符串
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年7月12日
     */
    public static String doGet(String httpUrl, Map<String, String> parameters, Map<String, String> headers) throws IOException {
        Objects.requireNonNull(httpUrl);
        Objects.requireNonNull(parameters);
        Objects.requireNonNull(headers);
        Set<String> keySet = parameters.keySet();
        StringBuilder builder = new StringBuilder(httpUrl);
        builder.append("?");
        boolean first = true;
        for (String key : keySet) {
            if (first) {
                builder.append(URLEncoder.encode(key, "UTF-8")).append("=").append(URLEncoder.encode(parameters.get(key), "UTF-8"));
                first = false;
            } else {
                builder.append("&").append(URLEncoder.encode(key, "UTF-8")).append("=").append(URLEncoder.encode(parameters.get(key), "UTF-8"));
            }
        }
        URL url = new URL(builder.toString());
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36");
        urlConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        headers.forEach(urlConnection::setRequestProperty);

        return getResponse(urlConnection);
    }

    /**
     * 模拟GET请求，从URL获取输入流（如果想从URL获取二进制文件，可以使用这个方法）
     *
     * @param httpUrl    地址
     * @param parameters 请求参数（如果没有请求参数，可以传递一个空的Map，但是不能传入null）
     * @param headers    请求头（如果没有请求头，可以传递一个空的Map，但是不能传入null）
     * @return 返回的Map对象目前包含两个键/值对：content-Length文件大小（单位：字节，如果content-Length为-1，则表示文件大小未知），inputStream输入流
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年7月14日
     */
    public static Map<String, Object> getInputStreamFromURL(String httpUrl, Map<String, String> parameters, Map<String, String> headers) throws IOException {
        Objects.requireNonNull(httpUrl);
        Objects.requireNonNull(parameters);
        Objects.requireNonNull(headers);
        Set<String> keySet = parameters.keySet();
        StringBuilder builder = new StringBuilder(httpUrl);
        builder.append("?");
        boolean first = true;
        for (String key : keySet) {
            if (first) {
                builder.append(URLEncoder.encode(key, "UTF-8")).append("=").append(URLEncoder.encode(parameters.get(key), "UTF-8"));
                first = false;
            } else {
                builder.append("&").append(URLEncoder.encode(key, "UTF-8")).append("=").append(URLEncoder.encode(parameters.get(key), "UTF-8"));
            }
        }
        URL url = new URL(builder.toString());
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

        urlConnection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36");
        urlConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        headers.forEach(urlConnection::setRequestProperty);
        return getResponseInputStream(urlConnection);
    }

    /**
     * 模拟GET请求，模拟的编码方式是application/x-www-form-urlencoded（GET唯一支持的编码方式）
     *
     * @param httpUrl    地址
     * @param parameters 请求参数
     * @return 返回响应字符串
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年7月12日
     */
    public static String doGet(String httpUrl, Map<String, String> parameters) throws IOException {
        return doGet(httpUrl, parameters, new HashMap<>());
    }

    /**
     * 模拟GET请求，模拟的编码方式是application/x-www-form-urlencoded（GET唯一支持的编码方式）
     *
     * @param httpUrl    地址
     * @param parameters 请求参数
     * @param header     请求头
     * @param handler    内容处理器
     * @return 返回内容处理器处理后的结果
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年7月12日
     */
    public static <R> R doGet(String httpUrl, Map<String, String> parameters, Map<String, String> header, Function<String, R> handler) throws IOException {
        String resultString = doGet(httpUrl, parameters, header);
        return handler.apply(resultString);
    }

    /**
     * 模拟GET请求，模拟的编码方式是application/x-www-form-urlencoded（GET唯一支持的编码方式）
     *
     * @param httpUrl    地址
     * @param parameters 请求参数
     * @param handler    内容处理器
     * @return 返回内容处理器处理后的结果
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年7月12日
     */
    public static <R> R doGet(String httpUrl, Map<String, String> parameters, Function<String, R> handler) throws IOException {
        String resultString = doGet(httpUrl, parameters, new HashMap<>());
        return handler.apply(resultString);
    }

    /**
     * 模拟POST请求，模拟的编码方式是application/x-www-form-urlencoded。
     * <p>
     * 因为是表单编码请求，所以不支持发送文件。如果想传递文件请使用支持multiparty/form-data
     * 的方法{@link #doPost(String, Map, List, String)}
     * <p>
     *
     * @param httpUrl    地址
     * @param parameters 表单数据
     * @param handler    内容处理器（你可以注册一个自己的内容处理器，然后此方法就会返回给你处理后的结果）
     * @return 内容处理器处理后的结果
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年7月11日
     */
    public static <R> R doPost(String httpUrl, Map<String, String> parameters, Function<String, R> handler) throws IOException {
        String resultString = doPost(httpUrl, parameters, new HashMap<>());
        return handler.apply(resultString);
    }

    /**
     * 模拟POST请求，模拟的编码方式是application/x-www-form-urlencoded。
     * <p>
     * 因为是表单编码请求，所以不支持发送文件。如果想传递文件请使用支持multiparty/form-data
     * 的方法。
     * <p>
     * 此方法只返回响应体字符串，并不对其作什么格式化或转换为某个类的实例。
     *
     * @param httpUrl    地址
     * @param parameters 表单数据
     * @return 返回响应的字符串
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年7月11日
     */
    public static String doPost(String httpUrl, Map<String, String> parameters) throws IOException {
        return doPost(httpUrl, parameters, new HashMap<>());
    }

    /**
     * 模拟POST请求，模拟的编码方式是application/json。
     * 此方法只返回响应体字符串，并不对其作什么格式化或转换为某个类的实例。
     *
     * @param httpUrl 地址
     * @param data    要作为JSON格式发送的数据
     * @param headers 请求头
     * @return 返回响应的字符串
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年7月11日
     */
    public static <R> String doPostForJSON(String httpUrl, R data, Map<String, String> headers) throws IOException {
        Objects.requireNonNull(httpUrl);
        Objects.requireNonNull(data);
        Objects.requireNonNull(headers);
        URL url = new URL(httpUrl);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36");
        urlConnection.setRequestProperty("Content-Type", "application/json");
        headers.forEach(urlConnection::setRequestProperty);
        urlConnection.setDoOutput(true);
        try (PrintWriter out = new PrintWriter(new OutputStreamWriter(urlConnection.getOutputStream(), StandardCharsets.UTF_8), true)) {
            String jsonString = "";
            if (data instanceof List) {
                JSONArray jsonArray = JSONArray.fromObject(data);
                jsonString = jsonArray.toString();
            } else {
                JSONObject jsonObject = JSONObject.fromObject(data);
                jsonString = jsonObject.toString();
            }
            out.print(jsonString);
            out.flush();
        }

        return getResponse(urlConnection);
    }

    /**
     * 模拟POST请求，模拟的编码方式是application/json。
     *
     * @param httpUrl 地址
     * @param data    要作为JSON格式发送的数据
     * @return 返回响应的字符串
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年7月11日
     */
    public static <R> String doPostForJSON(String httpUrl, R data) throws IOException {
        return doPostForJSON(httpUrl, data, new HashMap<>());
    }

    /**
     * 模拟POST请求，模拟的编码方式是multipart/form-data
     *
     * @param httpUrl    地址
     * @param parameters 表单数据
     * @param pathList   文件列表
     * @param name       文件发送到目标时所使用的名字，相当于{@code <input type="file" name="file"/>}中的name
     * @param handler    内容处理器
     * @return 返回内容处理器处理后的结果
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年7月11日
     */
    public static <R> R doPost(String httpUrl, Map<String, String> parameters, List<Path> pathList, String name, Function<String, R> handler) throws IOException {
        String resultString = doPost(httpUrl, parameters, new HashMap<>(), pathList, name);
        return handler.apply(resultString);
    }

    /**
     * 模拟POST请求，模拟的编码方式是multipart/form-data
     * 此方法只返回响应体字符串，并不对其作什么格式化或转换为某个类的实例。
     *
     * @param httpUrl    地址
     * @param parameters 表单数据
     * @param pathList   文件列表
     * @param name       文件发送到目标时所使用的名字，相当于{@code <input type="file" name="file"/>}中的name
     * @return 返回响应的字符串
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年7月11日
     */
    public static String doPost(String httpUrl, Map<String, String> parameters, List<Path> pathList, String name) throws IOException {
        return doPost(httpUrl, parameters, new HashMap<>(), pathList, name);
    }

    /**
     * 模拟POST请求，模拟的编码方式是application/x-www-form-urlencoded。
     * <p>
     * 因为是表单编码请求，所以不支持发送文件。如果想传递文件请使用支持multiparty/form-data
     * 的方法，{@link #doPost(String, Map, Map, List, String)}
     * <p>
     * 此方法只返回响应体字符串，并不对其作什么格式化或转换为某个类的实例。
     *
     * @param httpUrl    地址
     * @param parameters 表单数据
     * @param headers    请求的头（如果没有，可以设为null）
     * @return 返回响应的字符串
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年7月11日
     */
    public static String doPost(String httpUrl, Map<String, String> parameters, Map<String, String> headers) throws IOException {
        Objects.requireNonNull(httpUrl);
        Objects.requireNonNull(parameters);
        Objects.requireNonNull(headers);
        URL url = new URL(httpUrl);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36");
        urlConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        headers.forEach(urlConnection::setRequestProperty);
        urlConnection.setDoOutput(true);
        boolean first = true;
        try (PrintWriter out = new PrintWriter(new OutputStreamWriter(urlConnection.getOutputStream(), StandardCharsets.UTF_8), false)) {
            Set<String> keySet = parameters.keySet();
            for (String key : keySet) {
                String value = parameters.get(key);
                if (first)
                    first = false;
                else
                    out.print("&");
                out.print(key + "=");
                out.print(URLEncoder.encode(value, "UTF-8"));
            }
            out.flush();
        }

        return getResponse(urlConnection);
    }

    /**
     * 模拟POST请求，模拟的编码方式是application/x-www-form-urlencoded。
     * <p>
     * 因为是表单编码请求，所以不支持发送文件。如果想传递文件请使用支持multiparty/form-data
     * 的方法，{@link #doPost(String, Map, Map, List, String)}
     * <p>
     *
     * @param httpUrl    地址
     * @param parameters 表单数据
     * @param headers    请求的头
     * @param handler    内容处理器
     * @return 返回内容处理器处理后的结果
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年7月11日
     */
    public static <R> R doPost(String httpUrl, Map<String, String> parameters, Map<String, String> headers, Function<String, R> handler) throws IOException {
        String resultString = doPost(httpUrl, parameters, headers);
        return handler.apply(resultString);
    }

    /**
     * 模拟POST请求，模拟的编码方式是multipart/form-data
     * 此方法只返回响应体字符串，并不对其作什么格式化或转换为某个类的实例。
     *
     * @param httpUrl    地址
     * @param parameters 表单数据
     * @param headers    请求头
     * @param pathList   文件列表
     * @param name       文件发送到目标时所使用的名字，相当于{@code <input type="file" name="file"/>}中的name
     * @return 返回响应的字符串
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年7月11日
     */
    public static String doPost(String httpUrl, Map<String, String> parameters, Map<String, String> headers, List<Path> pathList, String name) throws IOException {
        Objects.requireNonNull(httpUrl);
        Objects.requireNonNull(parameters);
        Objects.requireNonNull(headers);
        Objects.requireNonNull(pathList);
        URL url = new URL(httpUrl);
        String boundary = "----WebKitFormBoundaryaBXDKrnJ8SocRrw1";
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36");
        urlConnection.setRequestProperty("Content-Type", "multipart/form-data;  boundary=" + boundary);
        headers.forEach(urlConnection::setRequestProperty);
        urlConnection.setDoOutput(true);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (OutputStream binaryOut = urlConnection.getOutputStream(); PrintWriter out = new PrintWriter(new OutputStreamWriter(byteArrayOutputStream, StandardCharsets.UTF_8), true)) {
            //先输出非文件的表单数据
            Set<String> keySet = parameters.keySet();
            for (String key : keySet) {
                String value = parameters.get(key);
                out.println("--" + boundary);
                out.println("Content-Disposition: form-data; name=\"" + key + "\"");
                out.println();
                out.println(value);
            }
            binaryOut.write(byteArrayOutputStream.toByteArray());

            //输出带文件的表单数据
            for (Path path : pathList) {
                byteArrayOutputStream.reset();
                String fileName = path.getFileName().toString();
                out.println("--" + boundary);
                out.println("Content-Disposition: form-data; name=" + "\"" + name + "\"; " + "filename=\"" + fileName + "\"");
                out.println();
                binaryOut.write(byteArrayOutputStream.toByteArray());
                byte[] bytes = Files.readAllBytes(path);
                binaryOut.write(bytes);
                byteArrayOutputStream.reset();
                out.println();
                binaryOut.write(byteArrayOutputStream.toByteArray());
            }
            byteArrayOutputStream.reset();
            out.print("--" + boundary + "--");
            out.flush();
            binaryOut.write(byteArrayOutputStream.toByteArray());
            binaryOut.flush();
        }

        return getResponse(urlConnection);
    }


    /**
     * 模拟POST请求，模拟的编码方式是multipart/form-data
     * 此方法只返回响应体字符串，并不对其作什么格式化或转换为某个类的实例。
     *
     * @param httpUrl      地址
     * @param parameters   表单数据
     * @param headers      请求头
     * @param bytesList    文件列表
     * @param fileNameList 文件名列表，和文件列表对应
     * @param name         文件发送到目标时所使用的名字，相当于{@code <input type="file" name="file"/>}中的name
     * @param handler      内容处理器
     * @return 自定义的返回值
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年8月23日
     */
    public static <R> R doPost(String httpUrl, Map<String, String> parameters, Map<String, String> headers, List<byte[]> bytesList, List<String> fileNameList, String name, Function<String, R> handler) throws IOException {
        String res = doPost(httpUrl, parameters, headers, bytesList, fileNameList, name);
        return handler.apply(res);
    }

    /**
     * 模拟POST请求，模拟的编码方式是multipart/form-data
     * 此方法只返回响应体字符串，并不对其作什么格式化或转换为某个类的实例。
     *
     * @param httpUrl      地址
     * @param parameters   表单数据
     * @param headers      请求头
     * @param bytesList    文件列表
     * @param fileNameList 文件名列表，和文件列表对应
     * @param name         文件发送到目标时所使用的名字，相当于{@code <input type="file" name="file"/>}中的name
     * @return 返回响应的字符串
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年8月23日
     */
    public static String doPost(String httpUrl, Map<String, String> parameters, Map<String, String> headers, List<byte[]> bytesList, List<String> fileNameList, String name) throws IOException {
        Objects.requireNonNull(httpUrl);
        Objects.requireNonNull(parameters);
        Objects.requireNonNull(headers);
        Objects.requireNonNull(bytesList);
        Objects.requireNonNull(fileNameList);
        URL url = new URL(httpUrl);
        String boundary = "----WebKitFormBoundaryaBXDKrnJ8SocRrw1";
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36");
        urlConnection.setRequestProperty("Content-Type", "multipart/form-data;  boundary=" + boundary);
        headers.forEach(urlConnection::setRequestProperty);
        urlConnection.setDoOutput(true);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (OutputStream binaryOut = urlConnection.getOutputStream(); PrintWriter out = new PrintWriter(new OutputStreamWriter(byteArrayOutputStream, StandardCharsets.UTF_8), true)) {
            //先输出非文件的表单数据
            Set<String> keySet = parameters.keySet();
            for (String key : keySet) {
                String value = parameters.get(key);
                out.println("--" + boundary);
                out.println("Content-Disposition: form-data; name=\"" + key + "\"");
                out.println();
                out.println(value);
            }
            binaryOut.write(byteArrayOutputStream.toByteArray());

            //输出带文件的表单数据
            for (int i = 0; i < bytesList.size(); i++) {
                byteArrayOutputStream.reset();
                String fileName = fileNameList.get(i);
                out.println("--" + boundary);
                out.println("Content-Disposition: form-data; name=" + "\"" + name + "\"; " + "filename=\"" + fileName + "\"");
                out.println();
                binaryOut.write(byteArrayOutputStream.toByteArray());
                byte[] bytes = bytesList.get(i);
                binaryOut.write(bytes);
                byteArrayOutputStream.reset();
                out.println();
                binaryOut.write(byteArrayOutputStream.toByteArray());
            }
            byteArrayOutputStream.reset();
            out.print("--" + boundary + "--");
            out.flush();
            binaryOut.write(byteArrayOutputStream.toByteArray());
            binaryOut.flush();
        }

        return getResponse(urlConnection);
    }

    /**
     * 模拟POST请求，模拟的编码方式是multipart/form-data
     *
     * @param httpUrl    地址
     * @param parameters 表单数据
     * @param headers    请求头
     * @param pathList   文件列表
     * @param name       文件发送到目标时所使用的名字，相当于{@code <input type="file" name="file"/>}中的name
     * @param handler    内容处理器
     * @return 返回内容处理器处理后的结果
     * @throws IOException 建立连接和获取响应的过程中可能会因服务器不可达而出现异常，
     *                     我会及时报告给你，由你决定如何处理异常。
     * @author 陈敬
     * @since 2019年7月11日
     */
    public static <R> R doPost(String httpUrl, Map<String, String> parameters, Map<String, String> headers, List<Path> pathList, String name, Function<String, R> handler) throws IOException {
        String resultString = doPost(httpUrl, parameters, headers, pathList, name);
        return handler.apply(resultString);
    }

    /**
     * 处理响应数据为文本
     */
    private static String getResponse(HttpURLConnection urlConnection) throws IOException {
        String encoding = urlConnection.getContentEncoding();
        if (encoding == null)
            encoding = "UTF-8";
        StringBuilder response = new StringBuilder();
        try (Scanner in = new Scanner(urlConnection.getInputStream(), encoding)) {
            while (in.hasNextLine()) {
                response.append(in.nextLine());
                response.append("\n");
            }
        } catch (IOException e) {
            InputStream err = urlConnection.getErrorStream();
            if (err == null)
                throw e;
            else {
                try (Scanner in = new Scanner(err, encoding)) {
                    response.append(in.nextLine());
                    response.append("\n");
                }
            }
        }
        return response.toString();
    }

    /**
     * 处理响应数据为二进制文件
     */
    private static Map<String, Object> getResponseInputStream(HttpURLConnection urlConnection) throws IOException {
        Map<String, Object> data = new HashMap<>();
        data.put("content-Length", urlConnection.getContentLengthLong());
        InputStream in = new ByteArrayInputStream(new byte[0]);
        try {
            in = urlConnection.getInputStream();
        } catch (IOException e) {
            InputStream err = urlConnection.getErrorStream();
            if (err == null)
                throw e;
            else
                in = err;
        }
        data.put("inputStream", in);
        return data;
    }
}