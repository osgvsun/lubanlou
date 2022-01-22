package net.gvsun.vo;

import java.io.Serializable;

/**
 * Created by REM on 2019/2/26.
 */
public class ProjectStageVo implements Serializable{
    private Integer projectId;
    private String projectName;

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
}
