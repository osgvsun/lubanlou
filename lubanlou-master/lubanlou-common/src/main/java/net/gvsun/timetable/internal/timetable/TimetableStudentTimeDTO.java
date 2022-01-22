package net.gvsun.timetable.internal.timetable;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
/**
 *  Description 返回学生占用情况
 *
 *  @author weicheng
 *  @date 2020/6/29 20:39
 */
public class TimetableStudentTimeDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	String studentNumber;
	String weekClass;
}
