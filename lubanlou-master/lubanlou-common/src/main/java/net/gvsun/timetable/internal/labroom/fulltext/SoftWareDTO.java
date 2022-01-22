package net.gvsun.timetable.internal.labroom.fulltext;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * Descriptions：共享库-SchoolTerm的DTO对象
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
public class SoftWareDTO implements Serializable {
    Integer id;
    /**
     * 软件名称
     */
    String name;
    /**
     * 软件版本
     */
    String edition;
    /**
     * 软件价格
     */
    BigDecimal price;

}
