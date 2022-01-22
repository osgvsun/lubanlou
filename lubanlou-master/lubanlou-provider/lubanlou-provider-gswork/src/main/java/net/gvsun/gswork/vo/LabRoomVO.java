package net.gvsun.gswork.vo;

import java.io.Serializable;

/**
 * Created by REM on 2018/1/5.
 */
public class LabRoomVO implements Serializable {
    /**
     * 实验室的id
     */
    private Integer id;
    /**
     * 实验室的名字
     */
    private String labRoomName;

    //实验室编号-陈敬2018年9月27日
    private String labRoomNumber;

    //实验室地址-陈敬2018年9月27日
    private String labRoomAddress;

    //可视化地址-陈敬-2018年9月27日
    private String visualAddress2;

    //是否可用(1是，0否）-陈敬2018年9月27日
    private Integer labRoomActive;

    //1可用 0不可用
    private Integer isUsed;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLabRoomName() {
        return labRoomName;
    }

    public void setLabRoomName(String labRoomName) {
        this.labRoomName = labRoomName;
    }

    public String getLabRoomNumber() {
        return labRoomNumber;
    }

    public void setLabRoomNumber(String labRoomNumber) {
        this.labRoomNumber = labRoomNumber;
    }

    public String getLabRoomAddress() {
        return labRoomAddress;
    }

    public void setLabRoomAddress(String labRoomAddress) {
        this.labRoomAddress = labRoomAddress;
    }

    public String getVisualAddress2() {
        return visualAddress2;
    }

    public void setVisualAddress2(String visualAddress2) {
        this.visualAddress2 = visualAddress2;
    }

    public Integer getLabRoomActive() {
        return labRoomActive;
    }

    public void setLabRoomActive(Integer labRoomActive) {
        this.labRoomActive = labRoomActive;
    }

    public Integer getIsUsed() {
        return isUsed;
    }

    public void setIsUsed(Integer isUsed) {
        this.isUsed = isUsed;
    }

    @Override
    public String toString() {
        return "LabRoomVO{" +
                "id=" + id +
                ", labRoomName='" + labRoomName + '\'' +
                ", labRoomNumber='" + labRoomNumber + '\'' +
                ", labRoomAddress='" + labRoomAddress + '\'' +
                ", visualAddress2='" + visualAddress2 + '\'' +
                ", labRoomActive=" + labRoomActive +
                ", isUsed=" + isUsed +
                '}';
    }
}
