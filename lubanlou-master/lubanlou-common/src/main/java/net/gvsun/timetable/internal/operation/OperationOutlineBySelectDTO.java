package net.gvsun.timetable.internal.operation;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions
 * @author lay
 * @date  2021-12-31
 */
@Data
public class OperationOutlineBySelectDTO implements Serializable {
    /**
     * 分页当前页
     */
    private Integer page;
    /**
     * 分页记录
     */
    private Integer limit;
    /**
     * 学期id
     */
    private Integer termId;
    /**
     * 用户中文名
     */
    private String name;
    /**
     * 用户工号
     */
    private String username;
    /**
     * 大纲状态
     */
    private Integer status;

    /**
     * 当前用户权限
     */
    private String currAuth;
}
