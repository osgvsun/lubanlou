package net.gvsun.timetable.internal.common;

import lombok.Data;

import java.io.Serializable;

/**
*  Description
*
*  @author weicheng
*  @date 2021/2/18 10:24
*/
@Data
public class JsonReturnDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String msg;
    private Integer code;
    private Object data;
    /**记录总数*/
    private long count;


}
