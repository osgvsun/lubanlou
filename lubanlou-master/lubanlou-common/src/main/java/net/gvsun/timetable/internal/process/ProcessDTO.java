package net.gvsun.timetable.internal.process;


import lombok.Data;

import java.io.Serializable;

/**
 * Description
 *
 * @author weicheng
 * @date 2021/2/18 11:10
 */
@Data
public class ProcessDTO implements Serializable {
    /**
     * 流程实例id
     */
    private Integer processId;

    /**
     * 流程提交人
     */
    private String submitUser;

    /**
     * 任务人列表
     */
    private String assignees;

    /**
     * 业务id
     */
    private String businessKey;

    /**
     * 当前任务人
     */
    private String assignee;

    /**
     * 阶段id
     */
    private Integer stageId;

    /**
     * 阶段名称
     */
    private String processCname;

    /**
     * 结果
     */
    private String result;

    /**
     * 流程key
     */
    private String processKey;

    /**
     * 配置中心模板id
     */
    private String templateId;

    /**
     * 项目名称
     */
    private String projectName;

    /**
     * 网关地址
     */
    private String zuulServerUrl;


}
