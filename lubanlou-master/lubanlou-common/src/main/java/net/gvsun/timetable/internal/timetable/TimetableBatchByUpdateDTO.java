package net.gvsun.timetable.internal.timetable;

import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：直接排课-列表呈现vo
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
public class TimetableBatchByUpdateDTO implements Serializable {

    private int batchId;
    private String batchName;
    private String startDate;
    private String endDate;
    private Integer maxGroupNum;


}
