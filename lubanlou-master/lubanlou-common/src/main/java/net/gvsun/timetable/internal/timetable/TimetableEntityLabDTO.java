package net.gvsun.timetable.internal.timetable;





import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 * Description 排课预约实验室明细表单对象
 *
 * @author weicheng
 * @date 2020/6/24 13:45
 */
@Data
@ToString
public class TimetableEntityLabDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	Integer id;

	Integer labRoom;
	/**
	 */
	Integer timetableAppointment;

}
