package net.gvsun.feign;

import net.gvsun.common.Result;
import net.gvsun.transcript.external.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;


/**
 * Description transcript 接口
 *
 * @author 付世亮
 * @since 2020-08-24
 */
@FeignClient(value = "transcript")
public interface TranscriptFeign {

    @PostMapping(value = "/insertStudentsApi", consumes = MediaType.APPLICATION_JSON_VALUE)
    boolean insertStudentsApi(List<UserVo> data);

    @PostMapping("/createGradeBook")
    String createGradeBook(@RequestParam(value = "siteId", required = true) Integer siteId, @RequestParam(value = "siteName", required = true) String siteName, @RequestParam(value = "assignmentId", required = false) String assignmentId,
                           @RequestParam(value = "assignmentTitle", required = false) String assignmentTitle, @RequestParam(value = "type", required = true) String type, @RequestParam(value = "weight", required = true) Double weight,
                           @RequestParam(value = "module", required = true) String module, @RequestParam(value = "experimentId", required = false) Integer experimentId, @RequestParam(value = "experimentTitle", required = false) String experimentTitle,
                           @RequestParam(value = "courseNumber", required = false) String courseNumber, @RequestParam(value = "product", required = false) String product, @RequestParam(value = "termNumber", required = false) String termNumber,
                           @RequestParam(value = "termName", required = false) String termName, @RequestParam(value = "isOpen", required = false) Integer isOpen);

    @PostMapping("/workUserApi")
    boolean workUserApi(@RequestBody WorkUserVo workUserVo);

    @PostMapping("/getIndicatorAndSave")
    boolean getIndicatorAndSave(@RequestParam(value = "workUid") String workUid, @RequestParam(value = "timetableIds") String timetableIds, @RequestParam(value = "businessTimes") String businessTimes);

    @RequestMapping(method = RequestMethod.POST, value = "/deleteTTestGrading")
    String deleteTTestGrading(@RequestParam(required = true, value = "siteId") Integer siteId, @RequestParam(required = true, value = "student") String
            student);

    @RequestMapping(method = RequestMethod.POST, value = "/deleteTTestGradings")
    String deleteTTestGradings(@RequestParam(required = true, value = "siteId") Integer siteId, @RequestParam(required = true, value = "students") String students);

    @RequestMapping(method = RequestMethod.GET, value = "/findTotalWeight")
    String findTotalWeight(@RequestParam(required = true, value = "siteId") Integer siteId);

    @RequestMapping(method = RequestMethod.POST, value = "/saveSingleWeightSetting")
    String saveSingleWeightSetting(@RequestParam(required = true, value = "weightStr") String weightStr, @RequestParam(required = true, value = "idStr") String idStr,
                                   @RequestParam(required = true, value = "functionType") String functionType);

    @RequestMapping(method = RequestMethod.POST, value = "/saveWeightSetting")
    String saveWeightSetting(@RequestParam(required = true, value = "weightStr") String weightStr, @RequestParam(required = true, value = "idStr") String idStr,
                             @RequestParam(required = true, value = "functionType") String functionType, @RequestParam(required = false, value = "displayStr") String displayStr);

    @RequestMapping(method = RequestMethod.POST, value = "/synchronizeAllTTestGrading")
    String synchronizeAllTTestGrading(@RequestParam(required = true, value = "siteId") Integer siteId);

    @RequestMapping(method = RequestMethod.POST, value = "/deleteGroupStudentApi")
    Boolean deleteGroupStudentApi(@RequestBody List<TranscriptUserVo> list);

    @RequestMapping(method = RequestMethod.POST, value = "/saveTTestGrading")
    String saveTTestGrading(@RequestParam(required = true, value = "module") String module, @RequestParam(required = true, value = "siteId") Integer siteId,
                            @RequestParam(required = true, value = "type") String type, @RequestParam(required = true, value = "student") String student,
                            @RequestParam(required = true, value = "score") float score);

    @RequestMapping(method = RequestMethod.GET, value = "/findTGradeObjects")
    String findTGradeObjects(@RequestParam(required = true, value = "module") String module, @RequestParam(required = true, value = "type") String type, @RequestParam(required = true, value = "siteId") Integer siteId);

    @RequestMapping(method = RequestMethod.POST, value = "/saveExperimentWeightSetting")
    String saveExperimentWeightSetting(@RequestParam(required = true, value = "weightStr") String weightStr, @RequestParam(required = true, value = "idStr") String idStr, @RequestParam(required = true, value = "functionType") String functionType);

    @RequestMapping(method = RequestMethod.GET, value = "/gradebookList")
    String gradebookList(@RequestParam(required = true, value = "module") String module, @RequestParam(required = true, value = "siteId") Integer siteId,
                         @RequestParam(required = true, value = "type") String type, @RequestParam(required = false, value = "currpage") Integer currpage,
                         @RequestParam(required = false, value = "pageSize") Integer pageSize, @RequestParam(required = false, value = "username") String username,
                         @RequestParam(required = false, value = "cname") String cname, @RequestParam(required = false, value = "courseNumber") String courseNumber,
                         @RequestParam(required = false, value = "classesNumber") String classesNumber);

    @RequestMapping(method = RequestMethod.GET, value = "/findTWeightSettingListByType")
    String findTWeightSettingListByType(@RequestParam(required = true, value = "siteId") Integer siteId, @RequestParam(required = true, value = "type") String type);

    @RequestMapping(method = RequestMethod.GET, value = "/gradebookTotalList")
    String gradebookTotalList(@RequestParam(required = true, value = "siteId") Integer siteId, @RequestParam(required = false, value = "currpage") Integer currpage,
                              @RequestParam(required = false, value = "pageSize") Integer pageSize, @RequestParam(required = false, value = "username") String username,
                              @RequestParam(required = false, value = "cname") String cname, @RequestParam(required = false, value = "classesNumber") String classesNumber);

    @RequestMapping(method = RequestMethod.POST, value = "/saveExperienceRecord")
    String saveExperienceRecord(@RequestParam(required = true, value = "siteId") Integer siteId, @RequestParam(required = true, value = "type") Integer type, @RequestParam(required = true, value = "groupId") Integer groupId,
                                @RequestParam(required = true, value = "teacherPoints") String teacherPoints, @RequestParam(required = true, value = "judgesPoints") String judgesPoints,
                                @RequestParam(required = false, value = "siteName") String siteName, @RequestParam
                                        (required = false, value = "title") String title);

    @RequestMapping(method = RequestMethod.POST, value = "/groupStudentsApi")
    String groupStudentsApi(@RequestBody List<TranscriptUserVo> list);

    @RequestMapping(method = RequestMethod.POST, value = "/submitTranscriptBySiteApi")
    String submitTranscriptBySiteApi(@RequestBody List<UserRecordVo> list);

    @RequestMapping(method = RequestMethod.POST, value = "/submitTranscriptApi")
    String submitTranscriptApi(@RequestBody List<UserRecordVo> list);

    @RequestMapping(method = RequestMethod.POST, value = "/updateGroupStudentRankingApi")
    String updateGroupStudentRankingApi(@RequestBody List<TranscriptUserVo> list);

    @RequestMapping(method = RequestMethod.POST, value = "/deleteTranscript")
    String deleteTranscript(@RequestParam(required = false, value = "assignmentId") String assignmentId, @RequestParam(required = false, value = "type") String type,
                            @RequestParam(required = false, value = "module") String module, @RequestParam(required = false, value = "siteId") Integer siteId);

    @RequestMapping(method = RequestMethod.POST, value = "/saveRecord")
    String saveRecord(@RequestParam(required = true, value = "siteId") Integer siteId, @RequestParam(required = false, value = "assignmentId") String assignmentId, @RequestParam(required = true, value = "points") Double points,
                      @RequestParam(required = true, value = "username") String username, @RequestParam(required = true, value = "cname") String cname, @RequestParam(required = false, value = "module") String module,
                      @RequestParam(required = false, value = "experimentId") Integer experimentId, @RequestParam(required = false, value = "courseNumber") String courseNumber);

    @RequestMapping(method = RequestMethod.POST, value = "/batchSaveRecord")
    Result batchSaveRecord(@RequestParam("siteId") Integer siteId, @RequestParam("assignmentId") String assignmentId,@RequestBody List<UserVo> list);

    @RequestMapping(method = RequestMethod.POST, value = "/submitBehaviorApi")
    String submitBehaviorApi(@RequestBody List<TimetableOnlineTimeVO> list);

    @RequestMapping(method = RequestMethod.POST, value = "/editIsOpen")
    String editIsOpen(@RequestParam(required = true, value = "experimentId") Integer experimentId, @RequestParam(required = true, value = "flag") Integer flag);

    @RequestMapping(method = RequestMethod.POST, value = "/getGradeWeightTable")
    List getGradeWeightTable(@RequestParam(required = true, value = "siteId") Integer siteId);

    @RequestMapping(method = RequestMethod.POST, value = "/initializeTTestGrading")
    String initializeTTestGrading(@RequestParam(required = true, value = "siteId") Integer siteId, @RequestParam(required = true, value = "student") String student
            , @RequestParam(required = true, value = "cname") String cname, @RequestParam(required = false, value = "groupId") Integer groupId
            , @RequestParam(required = false, value = "groupTitle") String groupTitle, @RequestParam(required = false, value = "courseNumber") String courseNumber
            , @RequestParam(required = false, value = "classesNumber") String classesNumber);

    @RequestMapping(method = RequestMethod.POST, value = "/additionActionScore")
    BigDecimal additionActionScore(@RequestParam(required = true, value = "student") String student, @RequestParam(required = true, value = "siteId") Integer siteId);

    @RequestMapping(method = RequestMethod.POST, value = "/saveCourseTemplate")
    String saveCourseTemplate(@RequestParam(required = true, value = "title") String title, @RequestParam(required = true, value = "display") Integer display);

    @RequestMapping(method = RequestMethod.POST, value = "/findTWeightSettingByTypeNew")
    String findTWeightSettingListByTypeNew(@RequestParam(required = true, value = "type") String type);

    @RequestMapping(method = RequestMethod.POST, value = "/findTWeightSettingList")
    String findTWeightSettingList();

    @RequestMapping(method = RequestMethod.POST, value = "/saveSystemWeightSetting")
    String saveSystemWeightSetting(@RequestBody List<TWeightSettingVO> list);

    @RequestMapping(method = RequestMethod.POST, value = "/saveExamRecord")
    String saveExamRecord(@RequestParam("assignmentId") String assignmentId, @RequestParam("points") Double points
            , @RequestParam("username") String username, @RequestParam("cname") String cname);

    @RequestMapping(method = RequestMethod.POST, value = "/synchronizeTGradeObject")
    String synchronizeTGradeObject(@RequestParam("siteId") Integer siteId,@RequestParam("siteName") String siteName, @RequestBody List<TGradeObjectVO> list);

}
