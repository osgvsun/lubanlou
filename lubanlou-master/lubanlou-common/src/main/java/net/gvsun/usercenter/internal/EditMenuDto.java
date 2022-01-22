package net.gvsun.usercenter.internal;

public class EditMenuDto {
    private Long id;                //menu ID
    private Long currentRoleId;     //当前角色ID
    private Long beOperatedRoleId;  //被操作角色ID
    private String username;        //用户名
    private Integer adminSetting;   //管理员配置
    private Integer selfSetting;    //用户自己配置
    private Integer target;         //1给用户中心配置，2给网站配置

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCurrentRoleId() {
        return currentRoleId;
    }

    public void setCurrentRoleId(Long currentRoleId) {
        this.currentRoleId = currentRoleId;
    }

    public Long getBeOperatedRoleId() {
        return beOperatedRoleId;
    }

    public void setBeOperatedRoleId(Long beOperatedRoleId) {
        this.beOperatedRoleId = beOperatedRoleId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getAdminSetting() {
        return adminSetting;
    }

    public void setAdminSetting(Integer adminSetting) {
        this.adminSetting = adminSetting;
    }

    public Integer getSelfSetting() {
        return selfSetting;
    }

    public void setSelfSetting(Integer selfSetting) {
        this.selfSetting = selfSetting;
    }

    public Integer getTarget() {
        return target;
    }

    public void setTarget(Integer target) {
        this.target = target;
    }
}
