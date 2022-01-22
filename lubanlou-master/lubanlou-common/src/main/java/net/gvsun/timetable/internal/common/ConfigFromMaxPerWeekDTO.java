package net.gvsun.timetable.internal.common;

import lombok.Data;
import lombok.ToString;
import java.io.Serializable;

/**
*  Description 配置中心-排课微服务-批次处理-每周最大周次
*
*  @author weicheng
*  @date 2020/5/14 9:36
*/
@Data
@ToString
public class ConfigFromMaxPerWeekDTO implements Serializable {
    private String courseNo;
    private String datasource;
    private int term;
    private int maxNum;
    private String createdBy;
    private String role;
    private String academyNumber;
}
