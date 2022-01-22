package net.gvsun.datashare.external.shareddata;


import net.gvsun.common.Recordable;

public class SchoolBuildDTO extends Recordable implements Shared {

    private String buildNumber;
    private String buildName;
    private String campusNumber;
    private String enabled;
    private String area;
    private String floorNum;
    private String minFloor;

    public String getBuildNumber() {
        return buildNumber;
    }

    public void setBuildNumber(String buildNumber) {
        this.buildNumber = buildNumber;
    }

    public String getBuildName() {
        return buildName;
    }

    public void setBuildName(String buildName) {
        this.buildName = buildName;
    }

    public String getCampusNumber() {
        return campusNumber;
    }

    public void setCampusNumber(String campusNumber) {
        this.campusNumber = campusNumber;
    }

    public String getEnabled() {
        return enabled;
    }

    public void setEnabled(String enabled) {
        this.enabled = enabled;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getFloorNum() {
        return floorNum;
    }

    public void setFloorNum(String floorNum) {
        this.floorNum = floorNum;
    }

    public String getMinFloor() {
        return minFloor;
    }

    public void setMinFloor(String minFloor) {
        this.minFloor = minFloor;
    }
}
