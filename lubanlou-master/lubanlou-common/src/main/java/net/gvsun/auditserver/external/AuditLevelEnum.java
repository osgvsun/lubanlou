package net.gvsun.auditserver.external;

/**
 * @description 定义审核层级枚举类
 * @author  Smark Lee
 * @date  2021/11/8
 * @return
 **/
public enum AuditLevelEnum {
    /**
     * 导师
     */
    TEACHER("导师"),
    /**
     * 课题组负责人
     */
    TEAMHEADER("课题组负责人"),
    /**
     * 设备管理员
     */
    EQUIPMENTADMIN("设备管理员"),
    /**
     * 实验室管理员
     */
    LABMANAGER("实验室管理员"),
    /**
     * 中心主任
     */
    EXCENTERDIRECTOR("中心主任"),
    /**
     * 费用管理员
     */
    CHARGEADMIN("费用管理员"),
    /**
     * 费用管理员
     */
    PREEXTEACHING("实验教学副院长"),
    /**
     * 费用管理员
     */
    ACADEMYLEVELM("院系级系统管理员"),
    /**
     * 费用管理员
     */
    EXPERIMENTALTEACHING("实验教务"),
    /**
     * 费用管理员
     */
    ASSISTANT("助教"),
    /**
     * 费用管理员
     */
    GRADUATE("研究生"),
    /**
     * 费用管理员
     */
    COLLEGELEADER("学院领导"),
    /**
     * 费用管理员
     */
    DEAN("教务处"),
    /**
     * 费用管理员
     */
    ASSETMANAGEMENT("实训部设备资产统计员（耗材管理员，设备管理科科员）"),
    /**
     * 费用管理员
     */
    CFO("系主任"),
    /**
     * 费用管理员
     */
    DEPARTMENTHEADER("教研室主任"),
    /**
     * 费用管理员
     */
    CABINETADMIN("物联管理员"),
    /**
     * 费用管理员
     */
    PRESECTEACHING("实训部教学秘书"),

    /**
     * 费用管理员
     */
    ASSETMANAGER("设备管理科科员（设备管理科科长）"),

    /**
     * 费用管理员
     */
    SUPERVISIONGROUP("督导小组"),

    /**
     * 费用管理员
     */
    FULLTIMEMANAGER("专职管理员"),
    /**
     * 费用管理员
     */
    STUGROUP("督查科"),
    /**
     * 费用管理员
     */
    OPEARTIONSECURITYMANAGEMENT("运行与安全管理科");


    private String name;

    AuditLevelEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
