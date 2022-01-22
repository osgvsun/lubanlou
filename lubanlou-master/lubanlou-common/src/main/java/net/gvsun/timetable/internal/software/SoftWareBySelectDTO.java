package net.gvsun.timetable.internal.software;

import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：共享库-SchoolTerm的DTO对象
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
public class SoftWareBySelectDTO implements Serializable {
    String academyNumber;
    private String search;

}
