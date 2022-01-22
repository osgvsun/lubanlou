package net.gvsun.auditserver.external;

import lombok.Data;

/**
 * @description 定义审核枚举类
 * @author  Smark Lee
 * @date  2021/11/8
 * @return
 **/
public enum AuditTypeEnum {
    /**
     * 院内审核
     */
    ACA_INSIDE("院内预约审核"),
    /**
     * 实验室所处学校审核
     */
    LAB_BELONG_SCHOOL("实验室所处学校审核"),
    /**
     * 预约者所处学校审核
     */
    RES_USER_BELONG_SCHOOL("预约者所处学校审核");

    private String name;

    AuditTypeEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
