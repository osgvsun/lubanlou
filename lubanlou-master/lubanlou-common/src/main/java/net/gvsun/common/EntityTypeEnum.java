package net.gvsun.common;

/**
 * @author Smark Lee
 * @Description 查询实体类型通用枚举类
 * @Date 2020/12/2 15:54
 * @return
 **/
public enum EntityTypeEnum {
    /**
     * 工位仪
     */
    STA("工位仪"),
    /**
     * 设备
     */
    DEV("设备"),
    /**
     * 实验室
     */
    LAB("实验室"),
    /**
     * 主实验室
     */
    ANNEX("主实验室");

    String name;

    EntityTypeEnum(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
