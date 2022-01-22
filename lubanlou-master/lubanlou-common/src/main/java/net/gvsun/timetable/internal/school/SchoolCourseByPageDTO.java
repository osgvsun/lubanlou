package net.gvsun.timetable.internal.school;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 * Description 排课计划的分页信息dto
 *
 * @author weicheng
 * @date 2020/6/5 11:10
 */
@Data
@ToString
public class SchoolCourseByPageDTO implements Serializable {
    /**
     * 数据缓存key值
     */
    private String key;
    /**
     * 坐班答疑1：坐班答疑 0：听课
     */
    private String courseApp;
    /**
     * 数据缓存hkey值
     */
    private String hkey;
    /**
     * 分页偏移
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
     * 排序
     */
    private String sort;
    /**
     * 升序降序
     */
    private String order;
    private String role;
    /**
     * 1：SELF自主排课
     * 2：无或COURSE教务排课
     */
    private String type;
    private String modelType;
    private String createdBy;
    private String academyNumber;
    private Integer week;
    /**
     * 是否选课0未选1已选2全部
     */
    private Integer selected;
}
