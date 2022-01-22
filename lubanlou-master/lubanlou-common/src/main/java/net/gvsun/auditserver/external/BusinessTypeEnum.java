package net.gvsun.auditserver.external;

/**
 * @description 业务类型枚举类
 * @author  Smark Lee
 * @date  2021/11/8
 * @return
 **/
public enum BusinessTypeEnum {
    /**
     * 机时预约
     */
    MACHINE_APP("机时预约"),
    /**
     * 送样预约
     */
    SPECIMEN_APP("送样预约");

    private String name;

    BusinessTypeEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
