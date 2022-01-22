package net.gvsun.timetable.internal.params;

import lombok.Data;

/**
*  Description mysql的json对应定义对象，自定义字段
*
*  @author weicheng
*  @date 2021/3/23 21:49
*/
@Data
public class ParamTimetableDTO {
    private String courseId;
    private Integer year;
    private Integer month;
    private Integer day;


}
