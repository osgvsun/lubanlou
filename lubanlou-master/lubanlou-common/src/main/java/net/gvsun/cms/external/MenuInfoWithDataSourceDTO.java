package net.gvsun.cms.external;

import java.util.List;

/**
 * 特定数据源菜单DTO
 */
public class MenuInfoWithDataSourceDTO {

    //业务系统(Project Name)
    private String projectName;

    //数据源(School Name)
    private String schoolName;

    //菜单信息列表
    private List<MenuInfoDTO> menuInfoDTOList;

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public List<MenuInfoDTO> getMenuInfoDTOList() {
        return menuInfoDTOList;
    }

    public void setMenuInfoDTOList(List<MenuInfoDTO> menuInfoDTOList) {
        this.menuInfoDTOList = menuInfoDTOList;
    }
}
