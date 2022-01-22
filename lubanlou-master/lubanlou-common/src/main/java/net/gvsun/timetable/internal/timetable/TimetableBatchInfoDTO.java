package net.gvsun.timetable.internal.timetable;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 * Descriptions：直接排课-列表呈现vo
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
@ToString
public class TimetableBatchInfoDTO implements Serializable {
    private String courseNo;
    private String sort;
    private String order;
    private String academyNumber;
    private Integer batchId;
    private Integer groupId;
    private String createdBy;
    private String role;

}
