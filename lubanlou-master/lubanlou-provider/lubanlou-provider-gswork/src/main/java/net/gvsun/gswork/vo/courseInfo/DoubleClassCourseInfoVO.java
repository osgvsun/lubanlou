package net.gvsun.gswork.vo.courseInfo;


import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**************************************************************************
 * Description:第1~2节中课表的信息的VO
 *
 * @author:lixueteng
 * @date:2018/2/3 0003
 **************************************************************************/
public class DoubleClassCourseInfoVO implements Serializable {
    /**
     * 开始小节
     */
    private Integer startClassInt;
    /**
     * 结束小节
     */
    private Integer endClassInt;
    /**
     * 课程开始时间
     */
    private String classStartTime;
    /**
     * 课程结束时间
     */
    private String classEndTime;
    /**
     * 状态
     */
    private Integer status;

    public Integer getStatus() {
        return status;
    }

    public DoubleClassCourseInfoVO setStatus(Integer status) {
        this.status = status;
        return this;
    }


    public Map<Integer, TimetableAppointmentVO> mapInfo;

    public Map<Integer, ScheduleVo> scheduleVoMap;


    /**
     * 课程对应的课表信息
     */
    private List<TimetableAppointmentVO> timetableAppointmentVOS;


    public Map<Integer, TimetableAppointmentVO> getMapInfo() {
        return mapInfo;
    }

    public DoubleClassCourseInfoVO setMapInfo(Map<Integer, TimetableAppointmentVO> mapInfo) {
        this.mapInfo = mapInfo;
        return this;
    }

    public Integer getStartClassInt() {
        return startClassInt;
    }

    public DoubleClassCourseInfoVO setStartClassInt(Integer startClassInt) {
        this.startClassInt = startClassInt;
        return this;
    }

    public Integer getEndClassInt() {
        return endClassInt;
    }

    public DoubleClassCourseInfoVO setEndClassInt(Integer endClassInt) {
        this.endClassInt = endClassInt;
        return this;
    }


    public String getClassStartTime() {
        return classStartTime;
    }

    public DoubleClassCourseInfoVO setClassStartTime(String classStartTime) {
        this.classStartTime = classStartTime;
        return this;
    }

    public String getClassEndTime() {
        return classEndTime;
    }

    public DoubleClassCourseInfoVO setClassEndTime(String classEndTime) {
        this.classEndTime = classEndTime;
        return this;
    }

    public List<TimetableAppointmentVO> getTimetableAppointmentVOS() {
        return timetableAppointmentVOS;
    }

    public DoubleClassCourseInfoVO setTimetableAppointmentVOS(List<TimetableAppointmentVO> timetableAppointmentVOS) {
        this.timetableAppointmentVOS = timetableAppointmentVOS;
        return this;
    }

    public Map<Integer, ScheduleVo> getScheduleVoMap() {
        return scheduleVoMap;
    }

    public void setScheduleVoMap(Map<Integer, ScheduleVo> scheduleVoMap) {
        this.scheduleVoMap = scheduleVoMap;
    }
}
