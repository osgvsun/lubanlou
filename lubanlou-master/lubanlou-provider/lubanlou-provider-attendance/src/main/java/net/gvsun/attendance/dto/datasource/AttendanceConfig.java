package net.gvsun.attendance.dto.datasource;

import lombok.Data;

import java.io.Serializable;

/**
 * Description : 此为配置类，必须与redis中的值相对应（datasource2.2.0规定）
 *
 * @Author : cjl
 * @CreateTime : 2021/12/22 13:40
 **/
@Data
public class AttendanceConfig implements Serializable {
    /**
     *  实验室预约
     * */
    boolean labReservation;
    /**
     * 大仪预约
     * */
    boolean insReservation;
    /**
     *  设备预约
     * */
    boolean devReservation;
    /**
     *  工位预约
     * */
    boolean staReservation;
}
