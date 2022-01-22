package net.gvsun.datashare.external.reportdata;

import java.io.Serializable;

public class ReportData implements Serializable {

    private String dataSource;
    private String key;
    private String data;
    private String yearCode;
    private String infoSource;
    private String loginUser;
    private Integer loginAuth;

    public String getDataSource() {
        return dataSource;
    }

    public void setDataSource(String dataSource) {
        this.dataSource = dataSource;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getYearCode() {
        return yearCode;
    }

    public void setYearCode(String yearCode) {
        this.yearCode = yearCode;
    }

    public String getInfoSource() {
        return infoSource;
    }

    public void setInfoSource(String infoSource) {
        this.infoSource = infoSource;
    }

    public String getLoginUser() {
        return loginUser;
    }

    public void setLoginUser(String loginUser) {
        this.loginUser = loginUser;
    }

    public Integer getLoginAuth() {
        return loginAuth;
    }

    public void setLoginAuth(Integer loginAuth) {
        this.loginAuth = loginAuth;
    }
}
