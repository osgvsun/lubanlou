package net.gvsun.teacherinformationcenter.controller.datashare;

import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.datasource.dto.GvsunDataSourceDto;
import net.gvsun.teacherinformationcenter.service.ShareService;
import net.gvsun.teacherinformationcenter.vo.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/datashare")
public class ReportController {
    private final ShareService shareService;
    @Value("${datashareHost}")
    private String datashareHost;
    @Value("${limsproductHost}")
    private String limsproductHost;

    public ReportController(ShareService shareService) {
        this.shareService = shareService;
    }

    @GetMapping("/dataReportCenter")
    public String dataReportCenter(HttpServletRequest request, Map<String, Object> map) throws IOException {

        HttpSession session = request.getSession();
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);

        session.setAttribute("user", user);

        GvsunDataSourceDto currDbSource = shareService.getCurrDbSource();
        map.put("currDbSource", currDbSource);
        return "/datashare/dataReportCenter";
    }

    @GetMapping("/sj1")
    public String sj1() {
        return "/datashare/report/sj1";
    }

    @GetMapping("/sj6")
    public String sj6(Map<String, Object> map) {
        return "/datashare/report/sj6";
    }

    @GetMapping("/sj5")
    public String sj5(Map<String, Object> map) {
        return "/datashare/report/sj5";
    }

    @GetMapping("/sj4")
    public String sj4(Map<String, Object> map) {
        return "/datashare/report/sj4";
    }

    @GetMapping("/sj2")
    public String sj2() {
        return "/datashare/report/sj2";
    }

    @GetMapping("/sj3")
    public String sj3() {
        return "/datashare/report/sj3";
    }

    @GetMapping("/sj7")
    public String sj7() {
        return "/datashare/report/sj7";
    }

    @GetMapping("/sj8")
    public String sj8() {
        return "/datashare/report/sj8";
    }

    @GetMapping("/sj9")
    public String sj9() {
        return "/datashare/report/sj9";
    }

    @GetMapping("/reportExemplarCenter")
    public String reportExemplarCenter() {
        return "/datashare/report/reportExemplarCenter";
    }

    @GetMapping("/reportProfessionalExperiment")
    public String reportProfessionalExperiment() {
        return "/datashare/report/reportProfessionalExperiment";
    }

    @GetMapping("/reportProfessionalTeachingLaboratory")
    public String reportProfessionalTeachingLaboratory() {
        return "/datashare/report/reportProfessionalTeachingLaboratory";
    }

    @GetMapping("/reportVirtualExperiment")
    public String reportVirtualExperiment() {
        return "/datashare/report/reportVirtualExperiment";
    }

    @GetMapping("/reportLabRoomUsage")
    public String reportLabRoomUsage(Map<String, Object> map) {
        map.put("limsproductHost", limsproductHost);
        return "/datashare/report/reportLabRoomUsage";
    }
    @GetMapping("/reportGitQuestionList")
    public String reportGitQuestionList(Map<String, Object> map) {
        return "/datashare/report/reportGitQuestionList";
    }

    @GetMapping("/reportDutyManage")
    public String reportDutyManage(Map<String, Object> map) {
        return "/datashare/report/reportDutyManage";
    }

    @GetMapping("/reportExperiment")
    public String reportExperiment(Map<String, Object> map) {
        return "/datashare/report/reportExperiment";
    }

    @GetMapping("/reportTeacherEquipment")
    public String reportTeacherEquipment() {
        return "/datashare/report/reportTeacherEquipment";
    }

    @GetMapping("/sandauReport")
    public String shandaReport(Map<String, Object> map) {
        return "/datashare/report/sandauReport";
    }

    @GetMapping("/sj4New")
    public String sj4New(Map<String, Object> map, @RequestParam String yearCode, @RequestParam String system) {
        map.put("yearCode", yearCode);
        map.put("system", system);
        return "/datashare/report/sj4New";
    }

    @GetMapping("/sj5New")
    public String sj5New(Map<String, Object> map, @RequestParam String yearCode, @RequestParam String system) {
        map.put("yearCode", yearCode);
        map.put("system", system);
        return "/datashare/report/sj5New";
    }

    @GetMapping("/sj6New")
    public String sj6New(Map<String, Object> map, @RequestParam String yearCode, @RequestParam String system) {
        map.put("yearCode", yearCode);
        map.put("system", system);
        return "/datashare/report/sj6New";
    }

    @GetMapping("/sj7New")
    public String sj7New(Map<String, Object> map, @RequestParam String yearCode) {
        map.put("yearCode", yearCode);
        return "/datashare/report/sj7New";
    }

    @GetMapping("/sj8New")
    public String sj8New(Map<String, Object> map, @RequestParam String yearCode, @RequestParam String system) {
        map.put("yearCode", yearCode);
        map.put("system", system);
        return "/datashare/report/sj8New";
    }

    @GetMapping("/sj9New")
    public String sj9New(Map<String, Object> map, @RequestParam String yearCode, @RequestParam String system) {
        map.put("yearCode", yearCode);
        map.put("system", system);
        return "/datashare/report/sj9New";
    }

    @GetMapping("/sj4DataSourceList")
    public String sj4DataSourceList() {
        return "/datashare/report/sj4DataSourceList";
    }

    @GetMapping("/sj5DataSourceList")
    public String sj5DataSourceList() {
        return "/datashare/report/sj5DataSourceList";
    }

    @GetMapping("/sj6DataSourceList")
    public String sj6DataSourceList() {
        return "/datashare/report/sj6DataSourceList";
    }

    @GetMapping("/sj7DataSourceList")
    public String sj7DataSourceList() {
        return "/datashare/report/sj7DataSourceList";
    }

    @GetMapping("/sj8DataSourceList")
    public String sj8DataSourceList() {
        return "/datashare/report/sj8DataSourceList";
    }

    @GetMapping("/sj9DataSourceList")
    public String sj9DataSourceList() {
        return "/datashare/report/sj9DataSourceList";
    }

    @GetMapping("/reportUploadError")
    public String reportUploadError() {
        return "/datashare/report/reportUploadError";
    }

    @GetMapping("/reportLake")
    public String reportLake() {
        return "/datashare/report/reportLake";
    }

    @GetMapping("/newReportLake")
    public String newReportLake() {
        return "/datashare/report/newReportLake";
    }

    @GetMapping("/reportInfo")
    public String reportInfo(Map<String, Object> map,String lakeNumber) {
        map.put("lakeNumber",lakeNumber);
        return "/datashare/report/reportInfo";
    }

    @GetMapping("/newReportInfo")
    public String newReportInfo(Map<String, Object> map,String lakeNumber) {
        map.put("lakeNumber",lakeNumber);
        return "/datashare/report/newReportInfo";
    }

    @GetMapping("/luckySheet")
    public String luckySheet(Map<String, Object> map,String lakeNumber,String reportNumber,String params) {
        map.put("lakeNumber",lakeNumber);
        map.put("reportNumber",reportNumber);
        String status = "0";
        if (Objects.isNull(params)){
            map.put("params",params);
        }else {
            String paramsArr[] = params.split(",");
            map.put("params",paramsArr[0]);
            if (paramsArr.length>1){
                status = paramsArr[1];
            }
        }
        map.put("status",status);
        return "/datashare/report/luckySheet";
    }

    /**
     * 获取当前登陆人
     *
     * @return
     */
    @ResponseBody
    @GetMapping("/getCurrentUser")
    public net.gvsun.session.dto.User getCurrentUser(HttpServletRequest request) throws IOException {
        return shareService.getCurrentUserFromUnifySession(request);
    }

}