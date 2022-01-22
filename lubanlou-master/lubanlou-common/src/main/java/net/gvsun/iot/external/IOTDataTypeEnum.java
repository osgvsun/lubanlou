package net.gvsun.iot.external;

/**
 *
 * @Description iot数据类型枚举类
 * @author SmarkLee
 * @Date 2021/10/13 11:10
 * @return 
 **/
public enum IOTDataTypeEnum {
    ADMIN("管理员"),
    RESERVATION("预约"),
    TIMETABLE("排课");

    String typeCname;

    IOTDataTypeEnum(String typeCname){
        this.typeCname = typeCname;
    }

    public String getTypeCname() {
        return typeCname;
    }
}
