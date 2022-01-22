package net.gvsun.datashare.external.reportdata;

/**
 * Created by Remli on 2021/6/3.
 */
public class SJ9DTO {
    private String schoolCode;
    private String laboratoryNumber;
    private String laboratoryName;
    private String deviceName;
    private String deviceNumber;
    private String devicePrice;
    private String buyDate;
    private String academyNumber;

    public String getLaboratoryNumber() {
        return laboratoryNumber;
    }

    public void setLaboratoryNumber(String laboratoryNumber) {
        this.laboratoryNumber = laboratoryNumber;
    }

    public String getLaboratoryName() {
        return laboratoryName;
    }

    public void setLaboratoryName(String laboratoryName) {
        this.laboratoryName = laboratoryName;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getDeviceNumber() {
        return deviceNumber;
    }

    public void setDeviceNumber(String deviceNumber) {
        this.deviceNumber = deviceNumber;
    }

    public String getDevicePrice() {
        return devicePrice;
    }

    public void setDevicePrice(String devicePrice) {
        this.devicePrice = devicePrice;
    }

    public String getBuyDate() {
        return buyDate;
    }

    public void setBuyDate(String buyDate) {
        this.buyDate = buyDate;
    }

    public String getSchoolCode() {
        return schoolCode;
    }

    public void setSchoolCode(String schoolCode) {
        this.schoolCode = schoolCode;
    }

    public String getAcademyNumber() {
        return academyNumber;
    }

    public void setAcademyNumber(String academyNumber) {
        this.academyNumber = academyNumber;
    }
}
