package net.gvsun.feign;

import net.gvsun.auditserver.external.RestResult;
import net.gvsun.common.EntityTypeEnum;
import net.gvsun.common.Result;
import net.gvsun.iot.external.*;
import net.gvsun.timetable.internal.labroom.LabInfoDTO;
import net.gvsun.timetable.internal.params.TimetableQueryParam;
import net.gvsun.timetable.internal.timetable.JudgeConflictTimeTableVO;
import net.gvsun.timetable.internal.timetable.TimetableParamVO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(value = "timetable")
public interface TimetableFeign {

    @PostMapping(value = "/api/common/iot/stations")
    Result stations(@RequestParam("ip") String ip);

    /**
     * @return
     * @Description 获取iot当天及隔天权限信息
     * @param type
     * @author SmarkLee
     * @Date 2021/4/7 11:26
     **/
    @PostMapping(value = "/api/iot/getIotReservationDataDaily")
    public List<InstrumentReservationTodayDTO> getIotReservationDataDaily(@RequestBody String type);

    /**
     * @return
     * @Description 获取iot相关设备信息
     * @author SmarkLee
     * @Date 2021/4/7 11:26
     **/
    @PostMapping(value = "/api/iot/getAgentDataDaily")
    public List<LabRoomAgentDTO> getAgentDataDaily();

    /**
     * @return
     * @Description 获取iot相关考勤信息
     * @author SmarkLee
     * @Date 2021/4/7 11:26
     **/
    @PostMapping(value = "/api/iot/getAttendanceUserDaily")
    public List<AttendanceUserDTO> getAttendanceUserDaily();

    /**
     * @return
     * @Description 获取iot相关考勤信息
     * @author SmarkLee
     * @Date 2021/4/7 11:26
     **/
    @PostMapping(value = "/api/iot/getUserDaily")
    public List<UserDTO> getUserDaily();


    /**
     * @param id       实验室id
     * @param currDate 日期
     * @return
     * @Description 获取大仪所需实验室预约数据
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     **/
    @GetMapping("/api/timetable/common/instrument/getTimeTableAppointmentForInstrument")
    RestResult getTimeTableAppointmentForInstrument(@RequestParam("id") Integer id, @RequestParam("currDate") String currDate);

    @RequestMapping(method = RequestMethod.POST, value = "/api/labroom/apiLabRoomList")
    String apiLabRoomList(@RequestParam(required = true, value = "labRoomNumber") String labRoomNumber, @RequestParam(required = true, value = "labRoomName") String
            labRoomName,
                          @RequestParam(required = true, value = "labRoomAddress") String labRoomAddress, @RequestParam(required = false, value = "labCategory") Integer labCategory,
                          @RequestParam(required = true, value = "pageSize") Integer pageSize, @RequestParam(required = true, value = "currpage") Integer currpage);

    @RequestMapping(method = RequestMethod.POST, value = "/api/timetable/common/getTodayVirtualImageByCourseId")
    String getTodayVirtualImageByCourseId(@RequestBody JudgeConflictTimeTableVO timeTableVO);

    @RequestMapping(method = RequestMethod.POST, value = "/api/labroom/apiGetUsableLabRoomList")
    String apiGetUsableLabRoomList(@RequestParam(required = true, value = "weeks") String weeks, @RequestParam(required = true, value = "weekdays") String weekdays,
                                   @RequestParam(required = true, value = "classes") String classes, @RequestParam(required = true, value = "term") String term);

    @RequestMapping(method = RequestMethod.GET, value = "/api/timetable/common/apiGetTimetableRecord")
    String apiGetTimetableRecord(@RequestParam(required = true, value = "courseCode") String courseCode);

    @RequestMapping(method = RequestMethod.POST, value = "/api/labroom/apiLabRoomListCount")
    String apiLabRoomListCount(@RequestParam(required = true, value = "labRoomNumber") String labRoomNumber, @RequestParam(required = true, value = "labRoomName") String labRoomName,
                               @RequestParam(required = true, value = "labRoomAddress") String labRoomAddress, @RequestParam(required = true, value = "labCategory") Integer labCategory);

    @RequestMapping(method = RequestMethod.POST, value = "/api/labroom/apiLabRoomListByIdArray")
    String apiLabRoomListByIdArray(@RequestParam(required = true, value = "roomIds") String roomIds);

    @RequestMapping(method = RequestMethod.POST, value = "/api/timetable/common/apiSaveCommonTimetableRecord")
    String apiSaveCommonTimetableRecord(@RequestBody List<JudgeConflictTimeTableVO> list);

    @RequestMapping(method = RequestMethod.POST, value = "/api/timetable/self/apiSaveSelfReTimetableByDate")
    String apiSaveSelfReTimetableByDate(@RequestBody TimetableParamVO vo);

    @PostMapping(value = "/api/timetable/common/apiTimetableTeachTrainList")
    String apiTimetableTeachTrainList(@RequestParam(value = "siteId") int siteId);

    /**
    *  Description 排课主页面-获取总课表列表信息
    *
    *  @param param
    *  @return net.gvsun.common.Result
    *  @author weicheng
    *  @date 2021/8/11 10:21
    */
    @PostMapping(value = "/api/timetable/listTimetables")
    Result apiListTimetables(@RequestBody TimetableQueryParam param);

    /**
     * Description 获取实验室列表（教学用）
     *
     * @return
     * @Author 黄浩  2021年10月9日
     */
    @PostMapping(value = "/api/labroom/apiGetLabRoomList")
    String apiGetLabRoomList();
    /**
     * Description 根据主实验id或者分室id获取实验信息
     * author 曹焕
     * 2021-10-13
     */
    @ResponseBody
    @RequestMapping("/api/labroom/getLabInfoById")
     Result getLabInfoById(@RequestBody LabInfoDTO labInfoDTO);

    @ResponseBody
    @RequestMapping("/api/operation/getOperationItemReportList")
    Result getOperationItemReportList(@RequestParam("yearCode") String yearCode, @RequestParam("loginAuth")Integer loginAuth, @RequestParam("academyNumber")String academyNumber );


}
