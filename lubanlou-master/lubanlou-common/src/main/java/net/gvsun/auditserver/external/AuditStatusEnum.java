package net.gvsun.auditserver.external;

/**
 * @description 审核流程状态
 * @author  Smark Lee
 * @date  2021/11/11
 * @return
 **/
public enum AuditStatusEnum {
    /**
     * 院内审核
     */
    AUDITING("审核中"),
    /**
     * 实验室所处学校审核
     */
    PASS("审核通过"),
    /**
     * 预约者所处学校审核
     */
    REFUSE("审核拒绝");

    private String name;

    AuditStatusEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
