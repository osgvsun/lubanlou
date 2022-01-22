package net.gvsun.timetable.internal.timetable;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Descriptions：直接排课-列表呈现vo
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
public class WeekBySelectPlanDTO implements Serializable {
    private int term;
    private int weekday;
    private Integer search;
    private String classes;
    private String labRoomIds;
    private String courseDetailNo;


}
