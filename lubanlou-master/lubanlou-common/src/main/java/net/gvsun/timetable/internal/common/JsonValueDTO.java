package net.gvsun.timetable.internal.common;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
*  Description 用于存放页面按钮显示的VO
*
*  @author weicheng
*  @date 2021/1/22 23:26
*/
@Data
@ToString
public class JsonValueDTO implements Serializable {
    public String id;
    public String text;
    public Integer status;
    public String dates;
    public String tip;
    public String getId() {
        return id;
    }
    public String parameterOne;
    public String parameterTwo;
}
