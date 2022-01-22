package net.gvsun.timetable.internal.operation;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
public class OperationItemBySelectDTO implements Serializable {

    private String academyNumber;
    private String courseNumber;
    private String search;
}
