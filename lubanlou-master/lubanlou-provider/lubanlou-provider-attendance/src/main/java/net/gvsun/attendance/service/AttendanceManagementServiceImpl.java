package net.gvsun.attendance.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import net.gvsun.attendance.dbsource.entity.AttendanceStatus;
import net.gvsun.attendance.dbsource.mapper.AttendanceStatusMapper;
import net.gvsun.attendance.dto.AttendanceStudentDTO;
import net.gvsun.attendance.external.AttendanceDTO;
import net.gvsun.feign.IotFeign;
import net.gvsun.iot.external.*;
import net.gvsun.timetable.internal.params.TimetableQueryParam;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AttendanceManagementServiceImpl implements AttendanceManagementService {
    private final IotFeign iotFeign;
    private final AttendanceStatusMapper attendanceStatusMapper;
    private final AttendanceCourseService attendanceCourseService;

    public AttendanceManagementServiceImpl(IotFeign iotFeign, AttendanceStatusMapper attendanceStatusMapper, AttendanceCourseService attendanceCourseService) {
        this.iotFeign = iotFeign;
        this.attendanceStatusMapper = attendanceStatusMapper;
        this.attendanceCourseService = attendanceCourseService;
    }

    @Override
    public List<AttendanceResultDetailVo> getAttendanceLogs(AttendanceDTO attendanceDTO) {
        List<AttendanceResultDetailVo> attendanceResults = new LinkedList<>();
        IotParameter iotParameter = new IotParameter();
        //根据日期查询, 默认取一个月的数据
        SimpleDateFormat sdfTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        c.add(Calendar.DATE,+1);
        String endDateStr = sdfTime.format(c.getTime());
        c.add(Calendar.MONTH,-1);
        String startDateStr = sdfTime.format(c.getTime());
        if (attendanceDTO.getStartDate()!=null&&!"".equals(attendanceDTO.getStartDate())){
            startDateStr = attendanceDTO.getStartDate()+" 00:00:00";
        }
        if (attendanceDTO.getEndDate()!=null&&!"".equals(attendanceDTO.getEndDate())){
            endDateStr = attendanceDTO.getEndDate()+" 23:59:59";
        }
        iotParameter.setBeginDateTime(startDateStr);
        iotParameter.setEndDateTime(endDateStr);
        iotParameter.setHardwareType(547);
        //根据工号查询
        if (attendanceDTO.getUsername()!=null&&!"".equals(attendanceDTO.getUsername())){
            iotParameter.setUsername(attendanceDTO.getUsername());
        }
        //根据属地查询
        if (attendanceDTO.getUsernames()!=null&&!"".equals(attendanceDTO.getUsernames())){
            iotParameter.setUsernames(attendanceDTO.getUsernames());
        }
//        //默认当前页及页码
        Integer page = null;
        Integer limit = null;
        if (attendanceDTO.getCurrPage()!=null){
            page = attendanceDTO.getCurrPage();
        }
        if (attendanceDTO.getPageSize() !=null){
            limit = attendanceDTO.getPageSize();
        }
        //根据时间逆序排列
        iotParameter.setOrderColumn(OrderColumnEnum.DATE_TIME);
        iotParameter.setIsAsc(false);
        List<CommonHdwlogDTO> result = iotFeign.getIotLog(iotParameter,page,limit).getData();
        for (CommonHdwlogDTO commonHdwlogDTO : result) {
            AttendanceResultDetailVo attendanceResult = new AttendanceResultDetailVo();
            DateTimeFormatter dfLocalTime = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            attendanceResult.setUsername(commonHdwlogDTO.getUsername());
            attendanceResult.setCardno(commonHdwlogDTO.getCardNumber());
            attendanceResult.setCname(commonHdwlogDTO.getCardName());
            attendanceResult.setDatetime(dfLocalTime.format(commonHdwlogDTO.getDateTime()));
            attendanceResult.setStatus(commonHdwlogDTO.getStatus());
            attendanceResult.setAddress(commonHdwlogDTO.getAddress());
           if ("xcx".equals(commonHdwlogDTO.getHardwareIp())||"ilkkzm".equals(commonHdwlogDTO.getHardwareIp())){
               attendanceResult.setSource("小程序考勤");
           }else{
               attendanceResult.setSource("考勤机考勤");
           }
            attendanceResults.add(attendanceResult);
        }
        return attendanceResults;
    }
    /**
     * Description :获取基本考勤记录明细记录数
     *
     * @Author : cjl
     * @CreateTime : 2021/9/2 13:35
     **/
    @Override
    public Long countAttendanceLogs(AttendanceDTO attendanceDTO) {
        IotParameter iotParameter = new IotParameter();
        //根据日期查询, 默认取一个月的数据
        SimpleDateFormat sdfTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());
        c.add(Calendar.DATE,+1);
        String endDateStr = sdfTime.format(c.getTime());
        c.add(Calendar.MONTH,-1);
        String startDateStr = sdfTime.format(c.getTime());
        if (attendanceDTO.getStartDate()!=null&&!"".equals(attendanceDTO.getStartDate())){
            startDateStr = attendanceDTO.getStartDate()+" 00:00:00";
        }
        if (attendanceDTO.getEndDate()!=null&&!"".equals(attendanceDTO.getEndDate())){
            endDateStr = attendanceDTO.getEndDate()+" 23:59:59";
        }
        iotParameter.setBeginDateTime(startDateStr);
        iotParameter.setEndDateTime(endDateStr);
        iotParameter.setHardwareType(547);
        //根据工号查询
        if (attendanceDTO.getUsername()!=null&&!"".equals(attendanceDTO.getUsername())){
            iotParameter.setUsername(attendanceDTO.getUsername());
        }
        //根据属地查询
        if (attendanceDTO.getUsernames()!=null&&!"".equals(attendanceDTO.getUsernames())){
            iotParameter.setUsernames(attendanceDTO.getUsernames());
        }
        long count = iotFeign.getIotLog(iotParameter,1,10).getCount();
        return count;
    }
    /**
     * Description 获取基本考勤记录(精确到天)
     *
     * @author cjl
     * @date 2021/9/7
     **/
    @Override
    public List<AttendanceResultVo> getBasicAttendanceLogByDate(AttendanceDTO attendanceDTO) throws Exception {
        List<AttendanceResultVo> attendanceResults = new LinkedList<>();
        Date date = new Date();
        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat sdfTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        IotParameter iotParameter = new IotParameter();
        iotParameter.setHardwareType(547);
        //根据日期查询
        if (attendanceDTO.getStartDate()!=null&&!"".equals(attendanceDTO.getStartDate())){
            iotParameter.setBeginDateTime(attendanceDTO.getStartDate()+" 00:00:00");
            iotParameter.setEndDateTime(attendanceDTO.getStartDate()+" 23:59:59");
        }else{
            //默认为当天
            String stringDate = sdfDate.format(date);
            iotParameter.setBeginDateTime(stringDate+" 00:00:00");
            iotParameter.setEndDateTime(stringDate+" 23:59:59");
        }
        //根据工号查询
        if (attendanceDTO.getUsername()!=null&&!"".equals(attendanceDTO.getUsername())){
            iotParameter.setUsername(attendanceDTO.getUsername());
        }
        //根据属地查询
        if (attendanceDTO.getUsernames()!=null&&!"".equals(attendanceDTO.getUsernames())){
            iotParameter.setUsernames(attendanceDTO.getUsernames());
        }
        //默认当前页及页码
        List<CommonHdwlogDTO> resultList = iotFeign.getIotLog(iotParameter,null,null).getData();
        //根据学生学号分组
        Map<String, List<CommonHdwlogDTO>> collect = resultList.stream().filter(map->map.getUsername() !=null).collect(Collectors.groupingBy(CommonHdwlogDTO::getUsername));
        JSONObject jsonObject = JSONObject.parseObject(JSON.toJSONString(collect));
        //根据学生学号去重
        List<CommonHdwlogDTO> listTemp = resultList;
        listTemp = listTemp.stream().collect(Collectors.collectingAndThen(Collectors.toCollection(()->
                new TreeSet<>(Comparator.comparing(CommonHdwlogDTO::getUsername))),ArrayList::new));
//        AttendanceResultVo attendanceResult = new AttendanceResultVo();
        for (CommonHdwlogDTO commonHdwlogDTO : listTemp) {
            AttendanceResultVo attendanceResult = new AttendanceResultVo();
            //去除未知人员的脏数据
            if (!"000000".equals(commonHdwlogDTO.getUsername())){
            String username = commonHdwlogDTO.getUsername();
            JSONArray jsonArray = jsonObject.getJSONArray(username);
            List<JSONObject> jsonValues = new ArrayList<JSONObject>();
            for (int i = 0; i < jsonArray.size(); i++) {
                JSONObject j = jsonArray.getJSONObject(i);
                jsonValues.add(j);
            }
            //日志按时间升序排列
            Collections.sort(jsonValues, new Comparator<JSONObject>() {
                @Override
                public int compare(JSONObject o1, JSONObject o2) {
                    return o1.getString("dateTime").compareTo(o2.getString("dateTime"));
                }
            });
            //取出考勤日志
            //学号
            attendanceResult.setUsername(username);
            //姓名
            attendanceResult.setCname(commonHdwlogDTO.getCardName());
            //考勤日期
            DateTimeFormatter dfLocalDate = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            attendanceResult.setWorkDate(dfLocalDate.format(commonHdwlogDTO.getDateTime()));
            //卡号
            attendanceResult.setCardno(commonHdwlogDTO.getCardNumber());
            //上午上班时间
            String dateTime1 = jsonValues.get(0).getString("dateTime").replace('T', ' ');
            attendanceResult.setStartTime(dateTime1);
            //下午下班时间
            String dateTime2 = jsonValues.get(jsonValues.size() - 1).getString("dateTime").replace('T', ' ');
            attendanceResult.setEndTime(dateTime2);
            //工作时间
            long workDateTime1 = sdfTime.parse(dateTime1).getTime();
            long workDateTime2 = sdfTime.parse(dateTime2).getTime();
            double workTimeMill = (double) (workDateTime2 - workDateTime1);
            double workTimeHour = workTimeMill / 1000 / 60 / 60;
            attendanceResult.setWorkTime(String.format("%.2f", workTimeHour));
            //上午上班考勤地点
            String address1 = jsonValues.get(0).getString("address");
            if (address1 != null) {
                attendanceResult.setStartWorkPlace(address1);
            }
            //下午下班考勤地点
            String address2 = jsonValues.get(jsonValues.size() - 1).getString("address");
            if (address2 != null) {
                attendanceResult.setEndWorkPlace(address2);
            }
            //考勤方式
            String hardwareType1 = jsonValues.get(0).getString("hardwareIp");
            String hardwareType2 = jsonValues.get(jsonValues.size() - 1).getString("hardwareIp");
            if (("xcx".equals(hardwareType1) || "ilkkzm".equals(hardwareType1)) && ("xcx".equals(hardwareType2) || "ilkkzm".equals(hardwareType2))) {
                attendanceResult.setMethod("小程序考勤");
            } else {
                attendanceResult.setMethod("考勤机考勤");
            }
            //获取考勤状态
            DateTimeFormatter dfLocalDateId = DateTimeFormatter.ofPattern("yyyyMMdd");
            String id = dfLocalDateId.format(commonHdwlogDTO.getDateTime());
            List<AttendanceStatus> statusList = attendanceStatusMapper.getAttendanceStatus(id, username);
            if (statusList.size() != 0) {
                String status = statusList.get(0).getStatus();
                attendanceResult.setAttendanceStatus(status);
            } else {
                //若无考勤则默认为正常出勤
                attendanceResult.setAttendanceStatus("1");
            }
            iotParameter.setBeginDateTime(iotParameter.getBeginDateTime().replace("00:00:00", "11:30:00"));
            iotParameter.setEndDateTime(iotParameter.getEndDateTime().replace("23:59:59", "13:00:00"));
            iotParameter.setUsername(username);
            List<CommonHdwlogDTO> resultListNoon = iotFeign.getIotLog(iotParameter, null, null).getData();
            if (resultListNoon.size() != 0) {
                //根据学生学号分组
                Map<String, List<CommonHdwlogDTO>> collectNoon = resultListNoon.stream().filter(map -> map.getUsername() != null).collect(Collectors.groupingBy(CommonHdwlogDTO::getUsername));
                JSONObject jsonObjectNoon = JSONObject.parseObject(JSON.toJSONString(collectNoon));
                //根据学生学号去重
                JSONArray jsonArrayNoon = jsonObjectNoon.getJSONArray(username);
                List<JSONObject> jsonValuesNoon = new ArrayList<JSONObject>();
                for (int i = 0; i < jsonArrayNoon.size(); i++) {
                    JSONObject j = jsonArrayNoon.getJSONObject(i);
                    jsonValuesNoon.add(j);
                }
                //日志按时间升序排列
                Collections.sort(jsonValuesNoon, new Comparator<JSONObject>() {
                    @Override
                    public int compare(JSONObject o1, JSONObject o2) {
                        return o1.getString("dateTime").compareTo(o2.getString("dateTime"));
                    }
                });
                //取出考勤日志
                //上午下班时间
                String dateTime3 = jsonValuesNoon.get(0).getString("dateTime").replace('T', ' ');
                attendanceResult.setAmEndTime(dateTime3);
                //下午上班时间
                String dateTime4 = jsonValuesNoon.get(jsonValuesNoon.size() - 1).getString("dateTime").replace('T', ' ');
                attendanceResult.setPmStartTime(dateTime4);
                //上午下班考勤地点
                String address3 = jsonValuesNoon.get(0).getString("address");
                if (address3 != null) {
                    attendanceResult.setAmEndWorkPlace(address3);
                }
                //下午上班考勤地点
                String address4 = jsonValuesNoon.get(jsonValuesNoon.size() - 1).getString("address");
                if (address4 != null) {
                    attendanceResult.setPmStartWorkPlace(address4);
                }
            }
            attendanceResults.add(attendanceResult);
            }
        }
        return attendanceResults;
    }
    /**
     * Description 获取基本考勤记录数(精确到天)
     *
     * @author cjl
     * @date 2021/9/7
     **/
    @Override
    public Long countBasicAttendanceLogByDate(AttendanceDTO attendanceDTO) throws Exception {
        Date date = new Date();
        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat sdfTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        IotParameter iotParameter = new IotParameter();
        iotParameter.setHardwareType(547);
        //根据日期查询
        if (attendanceDTO.getStartDate() != null && !"".equals(attendanceDTO.getStartDate())) {
            iotParameter.setBeginDateTime(attendanceDTO.getStartDate() + " 00:00:00");
            iotParameter.setEndDateTime(attendanceDTO.getStartDate() + " 23:59:59");
        } else {
            //默认为当天
            String stringDate = sdfDate.format(date);
            iotParameter.setBeginDateTime(stringDate + " 00:00:00");
            iotParameter.setEndDateTime(stringDate + " 23:59:59");
        }
        //根据工号查询
        if (attendanceDTO.getUsername() != null && !"".equals(attendanceDTO.getUsername())) {
            iotParameter.setUsername(attendanceDTO.getUsername());
        }
        //根据属地查询
        if (attendanceDTO.getUsernames() != null && !"".equals(attendanceDTO.getUsernames())) {
            iotParameter.setUsernames(attendanceDTO.getUsernames());
        }
        List<CommonHdwlogDTO> resultList = iotFeign.getIotLog(iotParameter,null,null).getData();
        //根据学生学号分组
        Map<String, List<CommonHdwlogDTO>> collect = resultList.stream().filter(map->map.getUsername() !=null).collect(Collectors.groupingBy(CommonHdwlogDTO::getUsername));
        JSONObject jsonObject = JSONObject.parseObject(JSON.toJSONString(collect));
        //根据学生学号去重
        List<CommonHdwlogDTO> listTemp = resultList;
        listTemp = listTemp.stream().collect(Collectors.collectingAndThen(Collectors.toCollection(()-> new TreeSet<>(Comparator.comparing(CommonHdwlogDTO::getUsername))),ArrayList::new));
        long count = listTemp.size();
        return count;
    }
    /**
     * Description 根据课程id、开始时间、结束时间、ip获取该课程学生考勤记录
     *
     * @Author chenjiali 2021-09-16
     */
    @Override
    public List<AttendanceStudentDTO> getStudentAttendanceRecords(String id, String startTime, String endTime, List<String> hardwareIps,
                                                                  Float meters,Integer currPage,Integer pageSize){
        List<AttendanceStudentDTO> attendanceStudentDTOList = new ArrayList<>();
        //获取课程学生名单
        final List<AttendanceStudentDTO> studentList ;
        TimetableQueryParam param = new TimetableQueryParam();
        param.setId(id);
        studentList = attendanceCourseService.getTimetableAttendanceList(param);
        //获取时间段内考勤日志
        IotParameter iotParameter = new IotParameter();
        if (meters !=null){
            iotParameter.setAttDeviation(meters);
        }
        if (startTime!=null && !"".equals(startTime)){
            iotParameter.setBeginDateTime(startTime);
        }
        if (endTime!=null && !"".equals(endTime)){
            iotParameter.setEndDateTime(endTime);
        }
        if (hardwareIps!=null && !"".equals(hardwareIps)){
            iotParameter.setHardwareIps(hardwareIps);
        }else {
            //无考勤设备则无考勤数据
            iotParameter.setHardwareIp("8888");
        }
        List<CommonHdwlogDTO> resultList = iotFeign.getIotLog(iotParameter,null,null).getData();
        //按学生学号分组
        Map<String, List<CommonHdwlogDTO>> collect = resultList.stream().filter(map->map.getUsername() !=null).collect(Collectors.groupingBy(CommonHdwlogDTO::getUsername));
        JSONObject jsonObject = JSONObject.parseObject(JSON.toJSONString(collect));
        //根据学生名单解析数据
        for(AttendanceStudentDTO stu:studentList) {
            String username=stu.getUsername();
            JSONArray jsonArray = jsonObject.getJSONArray(username);
            //判断日志不为空
            if(jsonArray!=null) {
                List< JSONObject> jsonValues = new ArrayList<JSONObject>();
                for(int i=0;i<jsonArray.size();i++){
                    JSONObject j =jsonArray.getJSONObject(i);
                    jsonValues.add(j);
                }
                //日志按时间升序排列
                Collections.sort(jsonValues, new Comparator<JSONObject>() {
                    @Override
                    public int compare(JSONObject o1, JSONObject o2) {
                        return o1.getString("dateTime").compareTo(o2.getString("dateTime"));
                    }
                });
                //取出考勤日志
                if(jsonValues.size()==1){
                    AttendanceStudentDTO attendanceStudentDTO = new AttendanceStudentDTO();
                    attendanceStudentDTO.setId(id);
                    attendanceStudentDTO.setUsername(username);
                    attendanceStudentDTO.setStudentName(stu.getStudentName());
                    attendanceStudentDTO.setClassDate(stu.getClassDate());
                    attendanceStudentDTO.setDatetime(jsonValues.get(0).getString("dateTime").replace('T', ' '));
                    attendanceStudentDTO.setAddress(jsonValues.get(0).getString("address"));
                    attendanceStudentDTO.setAttDeviation(jsonValues.get(0).getString("attDeviation"));
                    //获取考勤状态
                    List<AttendanceStatus> statusList = attendanceStatusMapper.getAttendanceStatus(id,username);
                    if (statusList.size()!=0){
                        String status = statusList.get(0).getStatus();
                        attendanceStudentDTO.setStatus(status);
                    }else {
                        //若无考勤则默认为正常出勤
                        attendanceStudentDTO.setStatus("1");
                    }
                    attendanceStudentDTOList.add(attendanceStudentDTO);
                }else if(jsonValues.size()>=2) {
                    AttendanceStudentDTO attendanceStudentDTO = new AttendanceStudentDTO();
                    String dateTime1=jsonValues.get(0).getString("dateTime");
                    String dateTime2=jsonValues.get(jsonValues.size()-1).getString("dateTime");
                    String address1 =jsonValues.get(0).getString("address");
                    String address2 =jsonValues.get(jsonValues.size()-1).getString("address");
                    String attDeviation1 =jsonValues.get(0).getString("attDeviation");
                    String attDeviation2 =jsonValues.get(jsonValues.size()-1).getString("attDeviation");
                    attendanceStudentDTO.setId(id);
                    attendanceStudentDTO.setUsername(username);
                    attendanceStudentDTO.setStudentName(stu.getStudentName());
                    attendanceStudentDTO.setClassDate(stu.getClassDate());
                    attendanceStudentDTO.setDatetime(dateTime1.replace('T', ' '));
                    attendanceStudentDTO.setDatetime2(dateTime2.replace('T', ' '));
                    attendanceStudentDTO.setAddress(address1);
                    attendanceStudentDTO.setAddress2(address2);
                    attendanceStudentDTO.setAttDeviation(attDeviation1);
                    attendanceStudentDTO.setAttDeviation2(attDeviation2);
                    //获取考勤状态
                    List<AttendanceStatus> statusList = attendanceStatusMapper.getAttendanceStatus(id,username);
                    if (statusList.size()!=0){
                        String status = statusList.get(0).getStatus();
                        attendanceStudentDTO.setStatus(status);
                    }else {
                        //若无考勤则默认为正常出勤
                        attendanceStudentDTO.setStatus("1");
                    }
                    attendanceStudentDTOList.add(attendanceStudentDTO);
                }
            }else {
                AttendanceStudentDTO attendanceStudentDTO = new AttendanceStudentDTO();
                attendanceStudentDTO.setId(id);
                attendanceStudentDTO.setUsername(username);
                attendanceStudentDTO.setStudentName(stu.getStudentName());
                attendanceStudentDTO.setClassDate(stu.getClassDate());
                attendanceStudentDTO.setDatetime("");
                attendanceStudentDTO.setDatetime2("");
                attendanceStudentDTO.setAddress("");
                attendanceStudentDTO.setAddress2("");
                attendanceStudentDTO.setAttDeviation("");
                attendanceStudentDTO.setAttDeviation2("");
                //获取考勤状态
                List<AttendanceStatus> statusList = attendanceStatusMapper.getAttendanceStatus(id,username);
                if (statusList.size()!=0){
                    String status = statusList.get(0).getStatus();
                    attendanceStudentDTO.setStatus(status);
                }else {
                    //若无考勤则默认为正常出勤
                    attendanceStudentDTO.setStatus("1");
                }
                attendanceStudentDTOList.add(attendanceStudentDTO);
            }
        }
        return attendanceStudentDTOList;
    }
}
