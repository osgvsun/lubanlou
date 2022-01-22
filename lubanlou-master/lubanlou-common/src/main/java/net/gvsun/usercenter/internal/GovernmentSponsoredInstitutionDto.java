package net.gvsun.usercenter.internal;

import java.io.Serializable;

public class GovernmentSponsoredInstitutionDto implements Serializable {
    private String gsiName; //事业单位名称
    private String gsiAddress; //所属区域
    private String chargeName; //负责人姓名
    private String idNumber; //身份证号
    private String phone; //电话
    private String email; //邮箱
    private String address; //地址
    private String gsiData; //事业单位证明材料
    private String idPhoto; //负责人证件照
    private String unitTel;//单位电话
    private String opPhone;//经办人手机号

    public String getGsiName() {
        return gsiName;
    }

    public void setGsiName(String gsiName) {
        this.gsiName = gsiName;
    }

    public String getGsiAddress() {
        return gsiAddress;
    }

    public void setGsiAddress(String gsiAddress) {
        this.gsiAddress = gsiAddress;
    }

    public String getChargeName() {
        return chargeName;
    }

    public void setChargeName(String chargeName) {
        this.chargeName = chargeName;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGsiData() {
        return gsiData;
    }

    public void setGsiData(String gsiData) {
        this.gsiData = gsiData;
    }

    public String getIdPhoto() {
        return idPhoto;
    }

    public void setIdPhoto(String idPhoto) {
       this.idPhoto = idPhoto;
    }

    public String getUnitTel() {
        return unitTel;
    }

    public void setUnitTel(String unitTel) {
        this.unitTel = unitTel;
    }

    public String getOpPhone() {
        return opPhone;
    }

    public void setOpPhone(String opPhone) {
        this.opPhone = opPhone;
    }
}
