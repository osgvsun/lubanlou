package net.gvsun.attendance.service;

import net.gvsun.attendance.dto.datasource.AttendanceConfig;

/**
 * Description : 通用方法类
 *
 * @Author : cjl
 * @CreateTime : 2021/12/22 13:52
 **/
public interface ShareService {

    /**
     * Description 获取当前数据源配置文件
     *
     * @author chenjiali
     * @date 2021/12/22
     */
    AttendanceConfig getCurrentDataSourceConfiguration();
}
