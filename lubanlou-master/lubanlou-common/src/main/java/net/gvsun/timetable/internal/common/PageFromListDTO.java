package net.gvsun.timetable.internal.common;

import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：共享对象-分页列表的DTO对象
 *
 * @author 魏诚
 * @date 2018-09-04
 */
@Data
public class PageFromListDTO implements Serializable {
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
     * 实验室预约记录Id
     */
    private Integer appointmentId;
    /**
     * 用户工号
     */
    private String username;
    /**
     * 网关地址
     */
    private String zuulServerUrl;

}
