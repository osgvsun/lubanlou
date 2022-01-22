package net.gvsun.iot.external;

/**
 *  Description 设备信息表
 *
 *  @param
 *  @return
 *  @author 李涵
 *  @date 2020/7/27 10:17
 */

public class LabRoomAgentDTO {
    /**
     * username 房间号
     */
    String roomNum;

    /**
     * username 房间名
     */
    String roomName;

    /**
     * username 物联ip
     */
    String hardwareIp;

    /**
     * 物联名字
     */
    String hardwareName;

    /**
     * 设备类型
     */
    String hardwareType;

    /**
     * 一物联版本
     */
    String hardwareVersion;

    /**
     * 物联型号
     */
    Integer hardwareModule;

    /**
     * 物联MAC地址
     */
    String hardwareMac;

    /**
     * 制造商
     */
    String manufacturer;

    /**
     * 读卡类型（26/34）
     */
    Integer cardType;

    /**
     * 服务器ip
     */
    String serverIp;

    /**
     * 学院编号
     */
    String academyNumber;

    /**
     * 实验中心编号
     */
    String labCenterNumber;
    /**
     * 表内相关（默认为空）
     */
    String relation;

    /**
     * 门禁序列号/大仪电流表号/摄像头端口号
     */
    String sn;

    /**
     * 门号
     */
    Integer deviceIndex;

    /**
     * 物联服务器mac地址
     */
    String serverMac;

    public LabRoomAgentDTO() {
    }

    public LabRoomAgentDTO(String roomNum, String roomName, String hardwareIp, String hardwareName, String hardwareType, String hardwareVersion, Integer hardwareModule, String hardwareMac, String manufacturer, Integer cardType, String serverIp, String academyNumber, String labCenterNumber, String relation, String sn, Integer deviceIndex, String serverMac) {
        this.roomNum = roomNum;
        this.roomName = roomName;
        this.hardwareIp = hardwareIp;
        this.hardwareName = hardwareName;
        this.hardwareType = hardwareType;
        this.hardwareVersion = hardwareVersion;
        this.hardwareModule = hardwareModule;
        this.hardwareMac = hardwareMac;
        this.manufacturer = manufacturer;
        this.cardType = cardType;
        this.serverIp = serverIp;
        this.academyNumber = academyNumber;
        this.labCenterNumber = labCenterNumber;
        this.relation = relation;
        this.sn = sn;
        this.deviceIndex = deviceIndex;
        this.serverMac = serverMac;
    }

    public String getRoomNum() {
        return roomNum;
    }

    public void setRoomNum(String roomNum) {
        this.roomNum = roomNum;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public String getHardwareIp() {
        return hardwareIp;
    }

    public void setHardwareIp(String hardwareIp) {
        this.hardwareIp = hardwareIp;
    }

    public String getHardwareName() {
        return hardwareName;
    }

    public void setHardwareName(String hardwareName) {
        this.hardwareName = hardwareName;
    }

    public String getHardwareType() {
        return hardwareType;
    }

    public void setHardwareType(String hardwareType) {
        this.hardwareType = hardwareType;
    }

    public String getHardwareVersion() {
        return hardwareVersion;
    }

    public void setHardwareVersion(String hardwareVersion) {
        this.hardwareVersion = hardwareVersion;
    }

    public Integer getHardwareModule() {
        return hardwareModule;
    }

    public void setHardwareModule(Integer hardwareModule) {
        this.hardwareModule = hardwareModule;
    }

    public String getHardwareMac() {
        return hardwareMac;
    }

    public void setHardwareMac(String hardwareMac) {
        this.hardwareMac = hardwareMac;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Integer getCardType() {
        return cardType;
    }

    public void setCardType(Integer cardType) {
        this.cardType = cardType;
    }

    public String getServerIp() {
        return serverIp;
    }

    public void setServerIp(String serverIp) {
        this.serverIp = serverIp;
    }

    public String getAcademyNumber() {
        return academyNumber;
    }

    public void setAcademyNumber(String academyNumber) {
        this.academyNumber = academyNumber;
    }

    public String getLabCenterNumber() {
        return labCenterNumber;
    }

    public void setLabCenterNumber(String labCenterNumber) {
        this.labCenterNumber = labCenterNumber;
    }

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }

    public String getSn() {
        return sn;
    }

    public void setSn(String sn) {
        this.sn = sn;
    }

    public Integer getDeviceIndex() {
        return deviceIndex;
    }

    public void setDeviceIndex(Integer deviceIndex) {
        this.deviceIndex = deviceIndex;
    }

    public String getServerMac() {
        return serverMac;
    }

    public void setServerMac(String serverMac) {
        this.serverMac = serverMac;
    }
}
