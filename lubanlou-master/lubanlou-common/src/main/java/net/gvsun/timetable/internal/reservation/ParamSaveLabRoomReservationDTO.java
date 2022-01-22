package net.gvsun.timetable.internal.reservation;

import lombok.Data;

import java.io.Serializable;

/*****************************************************
 * Description 保存工位预约
 *
 * @author 魏诚
 * @date 2019-3-1
 *****************************************************/
@Data
public class ParamSaveLabRoomReservationDTO implements Serializable {
    /**
     * 实验室主键
     */
    private int labRoom;

    /**
     * 预约结束日期
     */
    private String endTime;
    /**
     * 预约开始日期
     */
    private String startTime;

    /**
     * 工号
     */
    private String username;

    /**
     * 网关地址
     */
    private String zuulServerUrl;
    /**
     *  预约日期
     * */
    private String reservationTime;
    /**
     *  预约原因
     * */
    private String reason;
    /**
     *  预约人员类型
     * */
    private String userRole;
}