package net.gvsun.timetable.internal.timetable;



import lombok.Data;
import lombok.ToString;

import java.io.Serializable;


@Data
@ToString
/**
*  Description 排课分组对应关系表
*
*  @author weicheng
*  @date 2020/7/23 17:34
*/
public class TimetableEntityGroupDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	Integer timetableAppointment;
	Integer timetableGroup;
}
