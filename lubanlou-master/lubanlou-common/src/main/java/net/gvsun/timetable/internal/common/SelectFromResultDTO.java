package net.gvsun.timetable.internal.common;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
*  Description  * 用于存放封装下拉框显示的VO
*
*  @author weicheng
*  @date 2021/2/18 10:25
*/
@Data
public class SelectFromResultDTO implements Serializable {
    private List results;
}
