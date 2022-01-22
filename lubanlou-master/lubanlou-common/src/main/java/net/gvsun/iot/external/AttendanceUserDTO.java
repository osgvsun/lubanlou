package net.gvsun.iot.external;

import java.util.Objects;


/**
 *  Description 考勤用户表对应DTO
 *
 *  @param
 *  @return
 *  @author 李涵
 *  @date 2020/7/27 10:17
 */

public class AttendanceUserDTO {
    /**
     * 物联ip
     */
    String hardwareIp;
    /**
     * username 卡号
     */
    String cardNo;
    /**
     * username 用户账号
     */
    String username;
    /**
     * username 用户账号
     */
    String cname;

    /**
     * 权限开始时间
     */
    String beginTime;
    /**
     * 权限截至时间
     */
    String endTime;

    public String getHardwareIp() {
        return hardwareIp;
    }

    public void setHardwareIp(String hardwareIp) {
        this.hardwareIp = hardwareIp;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(String beginTime) {
        if (Objects.nonNull(beginTime)&&beginTime.contains(".0")){
            beginTime = beginTime.replace(".0","");
        }
        this.beginTime = beginTime;
    }

    public String getEndTime() {
        return endTime;
    }
    public void setEndTime(String endTime) {
        if (Objects.nonNull(endTime)&&endTime.contains(".0")){
            endTime = endTime.replace(".0","");
        }
        this.endTime = endTime;
    }

    public AttendanceUserDTO() {

    }

    public AttendanceUserDTO(String hardwareIp, String cardNo, String username, String cname, String beginTime, String endTime) {
        this.hardwareIp = hardwareIp;
        this.cardNo = cardNo;
        this.username = username;
        this.cname = cname;
        this.setBeginTime(beginTime);
        this.setEndTime(endTime);
    }
}
