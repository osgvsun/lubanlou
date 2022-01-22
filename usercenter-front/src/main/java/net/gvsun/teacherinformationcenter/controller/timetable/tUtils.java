package net.gvsun.teacherinformationcenter.controller.timetable;

import net.gvsun.teacherinformationcenter.vo.User;
import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class tUtils {
    // json值传入页面
    public static void jsonToMap(Map<String, Object> map, String res) {
        if (!"".equals(res) && res != null) {
            JSONObject resJson = JSONObject.fromObject(res);
            if (resJson.has("status") && resJson.has("data") && resJson.keySet().size() == 2) {
                String status = resJson.getString("status");
                String data = resJson.getString("data");
                switch (status) {
                    case "success":
                        if (data != null && !data.equals("")) {
                            JSONObject dataJson = JSONObject.fromObject(data);
                            for (Object key : dataJson.keySet()) {
                                Object x = dataJson.get(key);
                                // 判断是否是JSONArray
                                if (x instanceof JSONArray) {
                                    List<Map> y = JSONArray.toList((JSONArray) x, new HashMap(((JSONArray) x).size()), new JsonConfig());
                                    map.put(key.toString(), y);
                                } else if (x instanceof JSONObject) {
                                    Map<String, Object> m = new HashMap<>();
                                    JSONObject obj = (JSONObject) dataJson.get(key);
                                    Iterator it = obj.entrySet().iterator();
                                    while (it.hasNext()) {
                                        Map.Entry<String, Object> entry = (Map.Entry<String, Object>) it.next();
                                        if (entry.getValue().equals("null")) {
                                            m.put(entry.getKey(), null);
                                        }else {
                                            m.put(entry.getKey(), entry.getValue());
                                        }
                                    }
                                    map.put(key.toString(), m);
                                } else {
                                    if (x instanceof JSONNull) {
                                        x = null;
                                    }
                                    map.put(key.toString(), x);
                                }
                            }
                        }
                        break;
                    default:
                        System.out.println("lims/timetable api error[status:" + status + "]");
                        break;
                }
            } else {
                // 没有状态码的返回值
                for (Object key : resJson.keySet()) {
                    map.put(key.toString(), resJson.get(key));
                }
            }
        }
    }

    public static Map getHeaderMap(HttpServletRequest request) {
        Map<String, String> header = new HashMap<>();
        String datasource = tUtils.getCookie(request, "datasource.cookie");
        header.put("Cookie", "datasource.cookie=" + datasource);
        return header;
    }

    public static String getLimsUrl(HttpServletRequest request) {
        String qs = request.getQueryString();
        StringBuffer params = new StringBuffer();
        String lims_scope = tUtils.getCookie(request, "lims_scope");
        String[] strArr = lims_scope.split("-");
        String acno = "";
        if (strArr.length == 2) {
            acno = strArr[1];
            request.getSession().setAttribute("selected_role", strArr[0]);
            request.getSession().setAttribute("selected_academy", strArr[1]);
        }
        if (qs != null) {
            params.append("?" + qs + "&acno=" + acno);
        } else {
            params.append("?acno=" + acno);
        }
        params.append("&selectedRole=" + strArr[0]);
        params.append("&username=" + ((net.gvsun.session.dto.User)request.getSession().getAttribute("user")).getUsername());
        String requestUrl = request.getSession().getAttribute("limsproductHost") + "/api" + request.getServletPath() + params;
        return requestUrl;
    }

    public static String getCookie(HttpServletRequest request, String key) {
        // 获取cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(key)) {
                    return cookie.getValue();
                }
            }
        }
        return "";
    }
}