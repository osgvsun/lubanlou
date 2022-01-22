package net.gvsun.timetable.internal.labroom;


import lombok.Data;
import net.gvsun.timetable.internal.school.SystemBuildDTO;
import net.gvsun.timetable.internal.school.SystemCampusDTO;

import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
*  Description
*
*  @author weicheng
*  @date 2021/2/18 10:44
*/
@Data
public class LabRoomDTO implements Serializable {
    private String labRoomId;
    private String labRoomName;
    private Integer type;
    /**
     * 是否排课
     */
    private Integer isOpen;

    /**
     * 温度
     */
    private String labTemperature;

    /**
     * 湿度
     */
    private String labHumidity;

    /**
     * pm2.5值
     */
    private String labPm;

    /**
     * 整改状态
     */
    private String rectificationStatus;

    /**
     * 检查时间
     */
    private String inspectTime;

    /**
     * 摄像头id
     */
    private String cameraId;

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
    private Integer labCenter;

    /**
     * 实验中心DTO
     */
    private LabCenterDTO labCenterDTO;
    private Integer labAnnex;
    /**
     * 所属实验室id
     */
    private LabAnnexDTO labAnnexDTO;
    /**
     * 所属楼宇
     */
    private String buildNumber;
    /**
     * 所属楼层
     */
    private Integer floorNo;
    /**
     * 所属校区
     */
    private String  campusNumber;
    /**
     * 楼层DTO
     */
    private SystemBuildDTO systemBuildDTO;
    /**
     * 校区DTO
     */
    private SystemCampusDTO systemCampusDTO;
    /**
     * 会议室地址
     */
    private String labRoomAddress;
    /**
     * 基地id
     */
    private Integer labBase;
    /**
     * 基地名称
     */
    private String labBaseName;
    /**
     * 所属房间
     */
    private String systemRoom;
    /**
     * 所属房间名称
     */
    private String systemRoomName;
    /**
     * 等级
     */
    private Integer labRoomLevel;
    /**
     * 实验室创建时间
     */
    private String labRoomTimeCreate;
    /**
     * 实验室容量
     */
    private Integer labRoomCapacity;
    /**
     * 使用面积
     */
    private BigDecimal labRoomArea;
    /**
     * 实验室类别
     */
    private Integer cdictionaryByLabRoomClassification;
    /**
     * 实验室类别名称
     */
    private String labRoomClassification;
    /**
     * 实验室分类
     */
    private Integer cdictionaryByLabRoomSort;
    /**
     * 实验室分类名称
     */
    private String labRoomSort;
    /**
     * 实验室类型
     */
    private Integer cdictionaryByLabRoom;
    private String  cdictionaryByLabRoomName;
    /**
     * 有无多媒体
     */
    private Integer cdictionaryByIsMultimedia;
    /**
     * 有无多媒体
     */
    private String isMultimedia;
    /**
     * 所属学科
     */
    private String labRoomSubject;
    /**
     * 所属学科名称
     */
    private String labRoomSubjectName;
    /**
     * 是否校企共建
     */
    private Integer isSchoolEnterpriseCooperation;
    /**
     * 是否生产性实训室：1是、0或null否
     */
    private Integer isRoductivity;
    /**
     * 是否真是性实训室：1是、0或null否
     */
    private Integer isSimulation;
    /**是否可预约（1是，0否）*/
    private Integer labRoomReservation;

    /**是否为特殊实验室，1是，0或null否*/
    private Integer isSpecial;
    /**
     * 实验室介绍
     */
    private String labRoomIntroduction;
    /**
     * 规章制度
     */
    private String labRoomRegulations;
    /**
     * 实验室注意事项
     */
    private String labRoomAttentions;
    /**
     * 获奖信息
     */
    private String labRoomPrizeInformation;
    /**
     * 详细地址
     */
    private String labAddressDetail;
    /**
     * 性质
     */
   private String labRoomNature;
    /**
     * 性质名称
     */
    private String labRoomNatureName;
    private Integer page;
    private Integer limit;
    private String name;

    /**
     * 管理员
     */
    private List<String> admins;

}
