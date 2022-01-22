package net.gvsun.teacherinformationcenter.controller.datashare;

import net.gvsun.datasource.dto.GvsunDataSourceDto;
import net.gvsun.teacherinformationcenter.service.ShareService;
import net.gvsun.teacherinformationcenter.vo.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/datashare")
public class DataShareController {
    private final ShareService shareService;
    @Value("${datashareHost}")
    private String datashareHost;

    public DataShareController(ShareService shareService) {
        this.shareService = shareService;
    }

    @GetMapping("/index")
    public String index(Map<String, Object> map, HttpServletRequest request,String path) throws IOException {

        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);

        request.getSession().setAttribute("user", user);

        GvsunDataSourceDto currDbSource = shareService.getCurrDbSource();
        map.put("currDbSource", currDbSource);
        map.put("path", path);
        return "/datashare/dataShareCenter";
    }

    @GetMapping("/schoolCampusList")
    public String schoolCampusList() {
        return "/datashare/share/schoolCampusList";
    }

    @GetMapping("/userCardList")
    public String userCardList() {
        return "/datashare/share/userCardList";
    }

    @GetMapping("/schoolAcademyList")
    public String schoolAcademyList() {
        return "/datashare/share/schoolAcademyList";
    }

    @GetMapping("/userList")
    public String userList() {
        return "/datashare/share/userList";
    }

    @GetMapping("/schoolTermList")
    public String schoolTermList() {
        return "/datashare/share/schoolTermList";
    }

    @GetMapping("/schoolTimeList")
    public String schoolTimeList() {
        return "/datashare/share/schoolTimeList";
    }

    @GetMapping("/schoolBuildList")
    public String schoolBuildList() {
        return "/datashare/share/schoolBuildList";
    }

    @GetMapping("/schoolSubjectList")
    public String schoolSubjectList() {
        return "/datashare/share/schoolSubjectList";
    }

    @GetMapping("/schoolMajorList")
    public String schoolMajorList() {
        return "/datashare/share/schoolMajorList";
    }

    @GetMapping("/schoolDepartmentList")
    public String schoolDepartmentList() {
        return "/datashare/share/schoolDepartmentList";
    }

    @GetMapping("/schoolClassList")
    public String schoolClassList() {
        return "/datashare/share/schoolClassList";
    }

    @GetMapping("/schoolRoomList")
    public String schoolRoomList() {
        return "/datashare/share/schoolRoomList";
    }

    @GetMapping("/schoolDeviceList")
    public String schoolDeviceList() {
        return "/datashare/share/schoolDeviceList";
    }

    @GetMapping("/dictionary")
    public String dictionary() {
        return "/datashare/share/dictionary";
    }

    @GetMapping("/dictionaryType")
    public String dictionaryType() {
        return "/datashare/share/dictionaryType";
    }

    @GetMapping("/schoolCourseList")
    public String schoolCourseList() {
        return "/datashare/share/schoolCourseList";
    }

    @GetMapping("/schoolCourseInfoList")
    public String schoolCourseInfoList() {
        return "/datashare/share/schoolCourseInfoList";
    }

    @GetMapping("/schoolCourseDetailList")
    public String schoolCourseDetailList() {
        return "/datashare/share/schoolCourseDetailList";
    }

    @GetMapping("/schoolCourseClassList")
    public String schoolCourseClassList() {
        return "/datashare/share/schoolCourseClassList";
    }

    @GetMapping("/schoolCourseStudentList")
    public String schoolCourseStudentList() {
        return "/datashare/share/schoolCourseStudentList";
    }

    @GetMapping("/viewDetail")
    public String viewDetail(Map<String, Object> map,String courseNo) {
        map.put("courseNo",courseNo);
        return "/datashare/share/viewDetail";
    }

    @GetMapping("/viewCourseStudent")
    public String viewCourseStudent(Map<String, Object> map,String courseNo) {
        map.put("courseNo",courseNo);
        return "/datashare/share/viewCourseStudent";
    }

    @GetMapping("/newSchoolTerm")
    public String newSchoolTerm() {
        return "/datashare/share/newSchoolTerm";
    }

    @GetMapping("/newSchoolCourse")
    public String newSchoolCourse() {
        return "/datashare/share/newSchoolCourse";
    }

    @GetMapping("/newSchoolCourseInfo")
    public String newSchoolCourseInfo() {
        return "/datashare/share/newSchoolCourseInfo";
    }

    @GetMapping("/newDictionaryType")
    public String newDictionaryType() {
        return "/datashare/share/newDictionaryType";
    }

}