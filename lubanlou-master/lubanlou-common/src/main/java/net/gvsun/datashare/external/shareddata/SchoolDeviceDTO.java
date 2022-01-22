package net.gvsun.datashare.external.shareddata;


import net.gvsun.common.Recordable;

import java.math.BigDecimal;

public class SchoolDeviceDTO extends Recordable implements Shared {

    private String deviceNumber;
    private String deviceName;
    private String deviceEnName;
    private String devicePattern;
    private String deviceFormat;
    private String deviceUseDirection;
    private String deviceBuyDate;
    private String deviceAddress;
    private String deviceCountry;
    private BigDecimal devicePrice;
    private String deviceAccountedDate;
    private String deviceSupplier;
    private String department;
    private String user;
    private String keepUser;
    private SchoolDeviceExpandDTO schoolDeviceExpandDTO;

    public String getDeviceNumber() {
        return deviceNumber;
    }

    public void setDeviceNumber(String deviceNumber) {
        this.deviceNumber = deviceNumber;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getDeviceEnName() {
        return deviceEnName;
    }

    public void setDeviceEnName(String deviceEnName) {
        this.deviceEnName = deviceEnName;
    }

    public String getDevicePattern() {
        return devicePattern;
    }

    public void setDevicePattern(String devicePattern) {
        this.devicePattern = devicePattern;
    }

    public String getDeviceFormat() {
        return deviceFormat;
    }

    public void setDeviceFormat(String deviceFormat) {
        this.deviceFormat = deviceFormat;
    }

    public String getDeviceUseDirection() {
        return deviceUseDirection;
    }

    public void setDeviceUseDirection(String deviceUseDirection) {
        this.deviceUseDirection = deviceUseDirection;
    }

    public String getDeviceBuyDate() {
        return deviceBuyDate;
    }

    public void setDeviceBuyDate(String deviceBuyDate) {
        this.deviceBuyDate = deviceBuyDate;
    }

    public String getDeviceAddress() {
        return deviceAddress;
    }

    public void setDeviceAddress(String deviceAddress) {
        this.deviceAddress = deviceAddress;
    }

    public String getDeviceCountry() {
        return deviceCountry;
    }

    public void setDeviceCountry(String deviceCountry) {
        this.deviceCountry = deviceCountry;
    }

    public BigDecimal getDevicePrice() {
        return devicePrice;
    }

    public void setDevicePrice(BigDecimal devicePrice) {
        this.devicePrice = devicePrice;
    }

    public String getDeviceAccountedDate() {
        return deviceAccountedDate;
    }

    public void setDeviceAccountedDate(String deviceAccountedDate) {
        this.deviceAccountedDate = deviceAccountedDate;
    }

    public String getDeviceSupplier() {
        return deviceSupplier;
    }

    public void setDeviceSupplier(String deviceSupplier) {
        this.deviceSupplier = deviceSupplier;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getKeepUser() {
        return keepUser;
    }

    public void setKeepUser(String keepUser) {
        this.keepUser = keepUser;
    }

    public SchoolDeviceExpandDTO getSchoolDeviceExpandDTO() {
        return schoolDeviceExpandDTO;
    }

    public void setSchoolDeviceExpandDTO(SchoolDeviceExpandDTO schoolDeviceExpandDTO) {
        this.schoolDeviceExpandDTO = schoolDeviceExpandDTO;
    }
}
