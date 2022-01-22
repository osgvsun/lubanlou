package net.gvsun.datashare.external.shareddata;

import net.gvsun.common.Recordable;


/**
 * Created by Remli on 2021/6/15.
 */
public class SchoolDeviceExpandDTO implements Shared{
    //保修期
    private String warrantyTime;
    //售后服务人员
    private String serviceUser;
    //售后服务人员电话
    private String servicePhone;
    //设备类别(0:设备 1:家具)
    private String deviceType;
    public String getWarrantyTime() {
        return warrantyTime;
    }

    public void setWarrantyTime(String warrantyTime) {
        this.warrantyTime = warrantyTime;
    }

    public String getServiceUser() {
        return serviceUser;
    }

    public void setServiceUser(String serviceUser) {
        this.serviceUser = serviceUser;
    }

    public String getServicePhone() {
        return servicePhone;
    }

    public void setServicePhone(String servicePhone) {
        this.servicePhone = servicePhone;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }
}
