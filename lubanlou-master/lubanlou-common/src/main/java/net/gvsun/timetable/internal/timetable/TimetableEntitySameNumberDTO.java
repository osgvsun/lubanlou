package net.gvsun.timetable.internal.timetable;




import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;


import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * Description 排课预约明细表单对象
 *
 * @author weicheng
 * @date 2020/6/24 13:45
 */
@Data
@ToString
public class TimetableEntitySameNumberDTO implements Serializable {
	private static final long serialVersionUID = 1L;

    /**
     * 星期几
     */
	Integer weekday;
    /**
     * 起始周
     */
	Integer startWeek;
    /**
     * 结束周
     */
	Integer endWeek;
    /**
     * 开始节次
     */
	Integer startClass;
    /**
     * 结束节次
     */
	Integer endClass;
    /**
     * 开始时间
     */
    @JsonFormat(pattern = "HH:mm:ss")
    LocalTime startTime;
    /**
     * 结束时间
     */
    @JsonFormat(pattern = "HH:mm:ss")
    LocalTime endTime;
    /**
     * 开始时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate startDate;
    /**
     * 结束时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate endDate;

    String weekdays;
    Integer timetableAppointment;
}
