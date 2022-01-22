package net.gvsun.usercenter.internal;

import java.util.List;

/**
 * 管理员审核页面传递的数据，管理员可以给注册人员选择所属站点，并分配该站点的权限
 */
public class AuditDto {
    private Long siteId;        //给用户分配的站点
    private List<Long> roleIds; //用户被分配的角色

    public Long getSiteId() {
        return siteId;
    }

    public void setSiteId(Long siteId) {
        this.siteId = siteId;
    }

    public List<Long> getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(List<Long> roleIds) {
        this.roleIds = roleIds;
    }
}
