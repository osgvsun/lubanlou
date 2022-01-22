package net.gvsun.common;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 列表list显示通用DTO模块
 * Created by huanghao on 2018/8/20.
 */
@Data
public class BaseDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 列表的行数
     */
    private List rows;
    /**
     * 记录总数
     */
    private long total;
    private int code;
    /**
     * 返回信息
     */
    private String msg;
    /**
     * 记录总数
     */
    private long count;
    /**
     * 分页的列表记录
     */
    private List data;
    /**
     * 返回记录
     */
    private List result;

}