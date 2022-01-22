package net.gvsun.attendance.dto.datasource;

import lombok.Data;

/**
 * Description :
 *
 * @Author : cjl
 * @CreateTime : 2021/12/22 14:14
 **/
@Data
public class AttendanceConfigDTO {
    /**
     *  预约类型key
     * */
    String reservationType;
    /**
     *  预约类型
     * */
    String reservationName;
}
