package net.gvsun.timetable.internal.timetable;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 * Description 排课预约教师明细表单对象
 *
 * @author weicheng
 * @date 2020/6/24 13:45
 */
@Data
@ToString
public class TimetableEntityItemDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    Integer id;
    String itemId;
    Integer timetableAppointment;
}
