package net.gvsun.timetable.internal.timetable;


import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * Descriptions：分批判冲排课-时间表格传输对象
 *
 * @author Hezhaoyi
 * @date  2019-8-20
 */
@Data
public class TimetableByBatchScheduledDTO implements Serializable {
    private String month;
    private List data;

}
