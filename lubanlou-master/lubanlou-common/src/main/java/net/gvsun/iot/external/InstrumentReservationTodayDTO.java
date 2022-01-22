package net.gvsun.iot.external;

import lombok.Data;

import java.io.Serializable;
import java.util.Objects;

/**
 *
 * @Description 用来转换reservationToday对应数据的DTO
 * @author SmarkLee
 * @Date 2021/4/6 10:16
 * @return
 **/
@Data
public class InstrumentReservationTodayDTO implements Serializable{
    String id;
    String username;
    String cname;
    String cardNo;
    String startTime;
    String endTime;
    Integer isAdmin;
    String deviceNo;
    Integer deviceIndex;
    String hardwareIp;
    Integer hardwareType;
    Integer cardType;
    Integer labRoomId;
    String serverIp;
    String serverMac;

    public void setStarTime(String startTime) {
        if (Objects.nonNull(startTime)&&startTime.contains(".0")){
            startTime = startTime.replace(".0","");
        }
        this.startTime = startTime;
    }

    public void setEndTime(String endTime) {
        if (Objects.nonNull(endTime)&&endTime.contains(".0")){
            endTime = endTime.replace(".0","");
        }
        this.endTime = endTime;
    }


    public InstrumentReservationTodayDTO(){ }

    public InstrumentReservationTodayDTO(String id, String username, String cname, String cardNo, String startTime, String endTime, Integer isAdmin, String deviceNo, Integer deviceIndex, String hardwareIp, Integer hardwareType, Integer cardType, Integer labRoomId, String serverIp, String serverMac) {
        this.id = id;
        this.username = username;
        this.cname = cname;
        this.cardNo = cardNo;
        this.setStarTime(startTime);
        this.setEndTime(endTime);
        this.isAdmin = isAdmin;
        this.deviceNo = deviceNo;
        this.deviceIndex = deviceIndex;
        this.hardwareIp = hardwareIp;
        this.hardwareType = hardwareType;
        this.cardType = cardType;
        this.labRoomId = labRoomId;
        this.serverIp = serverIp;
        this.serverMac = serverMac;
    }

    /**
     * @description 完善用户权限信息
     * @author  Smark Lee
     * @date  2021/11/18
     * @return
     **/
    public InstrumentReservationTodayDTO completeInfoByUserDTO(UserDTO userDTO){
        if (this.getCardType() == 26){
            this.setCardNo(userDTO.getAclCard());
        }
        if (this.getCardType() == 34){
            this.setCardNo(userDTO.getCardno());
        }
        // 这里需要补齐id以区分同一个用户的不同卡号数据
        this.id = this.getId() +"_" + this.getCardNo();
        this.setCname(userDTO.getCname());
        return this;
    }
}
