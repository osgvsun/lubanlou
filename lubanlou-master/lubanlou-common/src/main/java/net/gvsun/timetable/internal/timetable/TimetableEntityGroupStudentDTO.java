package net.gvsun.timetable.internal.timetable;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
/**
 *  Description 排课分批学生设置表timetable_group_students对象
 *
 *  @author weicheng
 *  @date 2020/6/29 20:39
 */
public class TimetableEntityGroupStudentDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer id;
	private Integer timetableGroup;
	private String username;
}
