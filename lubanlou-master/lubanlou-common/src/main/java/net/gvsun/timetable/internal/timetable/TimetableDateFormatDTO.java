package net.gvsun.timetable.internal.timetable;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * Descriptions：数据传输对象-排课的周次节次及星期描述方式的DTO对象
 *
 * @author weicheng
 * @date 2018-09-04
 */
@Data
public class TimetableDateFormatDTO implements Serializable {

    private int weekday;
    private int Week;
    private int startClass;
    private int endClass;
    private int term;
    private Date date;

}
