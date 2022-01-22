package net.gvsun.timetable.internal.timetable;




import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@ToString
/**
 *  Description 排课分批设置表timetable_batch对象
 *
 *  @author weicheng
 *  @date 2020/6/29 20:39
 */
public class TimetableTimeDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	String weeks;
	String weekday;
	String classes;
}
