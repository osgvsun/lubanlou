package net.gvsun.timetable.internal.labroom.fulltext;


import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
*  Description
*
*  @author weicheng
*  @date 2021/2/18 10:44
*/
@Data
public class LabRoomDetailDTO implements Serializable {


    private String labRoomId;
    private String labRoomName;
    /**
     * 实验室编号
     */
    private String labRoomNumber;

    /**
     * 实验室编号
     */
    private String labRoomEnName;

    /**
     * 实验室简称
     */
    private String labRoomAbbreviation;

    /**
     * 实验中心id
     */
    private String centerName;
    private String centerNubmer;
    /**
     * 主实验室
     */
    private String labName;


    /**
     * 所属楼宇
     */
    private String buildName;
    /**
     * 所属楼层
     */
    private Integer floorNo;
    /**
     * 所属校区
     */
    private String  campusName;


    /**
     * 所属房间
     */
    private String roomName;

    /**
     * 所属房间名称
     */
    private String labAddressDetail;

    /**
     * 使用面积
     */
    private BigDecimal labRoomArea;
    /**
     * 实验室类别名称
     */
    private String labRoomClassification;
    /**
     * 实验室分类名称
     */
    private String labRoomSort;



}
