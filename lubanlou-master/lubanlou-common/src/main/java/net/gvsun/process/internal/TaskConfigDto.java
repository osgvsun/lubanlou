package net.gvsun.process.internal;

import java.io.Serializable;

public class TaskConfigDto implements Serializable {
    //任务id
    private String id;
    //任务名称
    private String name;
    //任务负责人
    private String assignee;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

}
