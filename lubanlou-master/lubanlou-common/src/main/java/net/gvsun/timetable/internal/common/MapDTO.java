package net.gvsun.timetable.internal.common;

import lombok.Data;

import java.io.Serializable;

/**
*  Description 用于存放返回信息显示的VO
*
*  @author weicheng
*  @date 2021/2/18 10:25
*/
@Data
public class MapDTO implements Serializable {
    private String key;
    private String value;
}
