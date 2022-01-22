package net.gvsun.process.external;

import java.io.Serializable;
import java.util.List;

public class ProcessDTO implements Serializable {
    //流程实例id
    private Integer processId;

    //流程提交人
    private String submitUser;

    //任务人列表
    private String assignees;

    //业务id
    private String businessKey;

    //当前任务人
    private String assignee;

    //阶段id
    private Integer stageId;

    //阶段名称
    private String processCname;

    //结果
    private String result;

    //流程key
    private String processKey;

    //配置中心模板id
    private String templateId;

    //项目名称
    private String projectName;

    //网关地址
    private String zuulServerUrl;

    //并行网关执行的任务序号列表,逗号隔开如（1，3）
    private String taskList;

    //要执行哪个任务(1,2,3)
    private Integer taskNum;

    public Integer getTaskNum() {
        return taskNum;
    }

    public String getTaskList() {
        return taskList;
    }

    public void setTaskList(String taskList) {
        this.taskList = taskList;
    }

    public void setTaskNum(Integer taskNum) {
        this.taskNum = taskNum;
    }

    public Integer getProcessId() {
        return processId;
    }

    public void setProcessId(Integer processId) {
        this.processId = processId;
    }

    public String getSubmitUser() {
        return submitUser;
    }

    public void setSubmitUser(String submitUser) {
        this.submitUser = submitUser;
    }

    public String getAssignees() {
        return assignees;
    }

    public void setAssignees(String assignees) {
        this.assignees = assignees;
    }

    public String getBusinessKey() {
        return businessKey;
    }

    public void setBusinessKey(String businessKey) {
        this.businessKey = businessKey;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public Integer getStageId() {
        return stageId;
    }

    public void setStageId(Integer stageId) {
        this.stageId = stageId;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getProcessKey() {
        return processKey;
    }

    public void setProcessKey(String processKey) {
        this.processKey = processKey;
    }

    public String getTemplateId() {
        return templateId;
    }

    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getZuulServerUrl() {
        return zuulServerUrl;
    }

    public void setZuulServerUrl(String zuulServerUrl) {
        this.zuulServerUrl = zuulServerUrl;
    }

    public String getProcessCname() {
        return processCname;
    }

    public void setProcessCname(String processCname) {
        this.processCname = processCname;
    }
}
