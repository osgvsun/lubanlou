package net.gvsun.teacherinformationcenter.controller.timetable;

import net.gvsun.teacherinformationcenter.service.ShareService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import util.HttpClientUtil;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/****************************************************************************
 * Descriptions：教务排课管理模块
 *
 * author 魏诚
 * date 2018-09-04
 ****************************************************************************/
@Controller("EduCourseController")
@RequestMapping("/lims/timetable/engineer/educourse")
public class EduCourseController<JsonResult> {
    @Autowired
    private ShareService shareService;

    /************************************************************
     * Descriptions：教务排课管理-教务二次分批排课的主显示页面
     *
     * author 魏诚
     * date 2018-09-04
     ************************************************************/
    @RequestMapping("/updateEduAdjustCourse")
    public String updateEduAdjustCourse(Map<String, Object> map, HttpServletRequest request) {
        String res = HttpClientUtil.doPost(
                tUtils.getLimsUrl(request),
                null, tUtils.getHeaderMap(request));
        tUtils.jsonToMap(map, res);
        return ("/timetable/educourse/updateEduAdjustCourse");
    }

}
