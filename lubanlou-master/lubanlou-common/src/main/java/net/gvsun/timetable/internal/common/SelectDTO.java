package net.gvsun.timetable.internal.common;

import lombok.Data;

import java.io.Serializable;

/**
*  Description 用于存放页面按钮显示的VO
*
*  @author huanghao
*  @date 2018/8/18 10:21
*/
@Data
public class SelectDTO implements Serializable {
    private String search;
}
