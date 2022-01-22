package net.gvsun.usercenter.internal;

import java.io.Serializable;

public class EnterpriseUserDto implements Serializable {
    private Long id;
    private String enterpriseName;
    private String enAddress;
    private String legalId;
    private String legalName;
    private String enType;
    private String idNumber;
    private String phone;
    private String email;
    private String address;
    private String businessLicenseAnnex;
    private String legalRepresentativeAnnex;
    private String unitTel;
    private String opPhone;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEnterpriseName() {
        return enterpriseName;
    }

    public void setEnterpriseName(String enterpriseName) {
        this.enterpriseName = enterpriseName;
    }

    public String getEnAddress() {
        return enAddress;
    }

    public void setEnAddress(String enAddress) {
        this.enAddress = enAddress;
    }

    public String getLegalId() {
        return legalId;
    }

    public void setLegalId(String legalId) {
        this.legalId = legalId;
    }

    public String getLegalName() {
        return legalName;
    }

    public void setLegalName(String legalName) {
        this.legalName = legalName;
    }

    public String getEnType() {
        return enType;
    }

    public void setEnType(String enType) {
        this.enType = enType;
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

    public String getBusinessLicenseAnnex() {
        return businessLicenseAnnex;
    }

    public void setBusinessLicenseAnnex(String businessLicenseAnnex) {
        this.businessLicenseAnnex = businessLicenseAnnex;
    }

    public String getLegalRepresentativeAnnex() {
        return legalRepresentativeAnnex;
    }

    public void setLegalRepresentativeAnnex(String legalRepresentativeAnnex) {
        this.legalRepresentativeAnnex = legalRepresentativeAnnex;
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
