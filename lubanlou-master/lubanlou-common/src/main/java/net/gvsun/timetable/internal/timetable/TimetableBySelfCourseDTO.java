package net.gvsun.timetable.internal.timetable;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 * Description 自主排课对象-ApiSelfCourseListByPage的DTO对象
 *
 * @author weicheng
 * @date 2021/2/1 16:52
 */
@Data
@ToString
public class TimetableBySelfCourseDTO implements Serializable {
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
     * 查询关键子
     */
    private String search;
    /**
     * 排序
     */
    private String sort;
    /**
     * 升序降序
     */
    private String order;
    /**
     * 项目id
     */
    private Integer operationId;
    /**
     * 项目类型
     */
    private Integer operationType;
    /**
     * 学校信息
     */
    private String projectName;
    private String createdBy;
    private String role;
    private String academyNumber;

}
