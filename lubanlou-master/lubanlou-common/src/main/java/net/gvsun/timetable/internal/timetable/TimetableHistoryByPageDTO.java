package net.gvsun.timetable.internal.timetable;



import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 * Descriptions：备份分页列表的DTO对象
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
@ToString
public class TimetableHistoryByPageDTO implements Serializable {
    /**
     * 当前页
     */
    private Integer offset;
    /**
     * 每页记录
     */
    private Integer limit;
    /**
     * 学期
     */
    private Integer termId;
    /**
     * 状态
     */
    private String status;
    /**
     * 查询关键字
     */
    private String search;
    /**
     * 排序字段
     */
    private String sort;
    /**
     * 升序降序
     */
    private String order;
    /**
     * 升序降序
     */
    private String backupType;
    private String createdBy;
    private String role;
    private String academyNumber;

}
