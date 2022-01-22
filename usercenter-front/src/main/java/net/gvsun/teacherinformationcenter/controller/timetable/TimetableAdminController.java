package net.gvsun.teacherinformationcenter.controller.timetable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import util.HttpClientUtil;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;


/****************************************************************************
 * Description说明： 排课管理 排课管理的所有页面跳转的功能在本文件中实现 作者：魏诚 时间：2014-08-16
 ****************************************************************************/
@Controller("TimetableAdminController")
@SessionAttributes({"selected_academy", "isPosted"})
public class TimetableAdminController {
    @Autowired
    private HttpServletRequest request;

    @Value("${apiGateWayHost}")
    private String apiGateWayHost;


    /**
     * Description 新建自主课程
     * <p>
     * author 陈乐为 2019年6月13日
     */
    @RequestMapping("/timetable/newSchoolCourseInfoForSelf")
    public String newSchoolCourseInfoForSelf(Map<String, Object> map) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/schoolCourseManager/editSchoolCourseInfoForSelf");
    }
}