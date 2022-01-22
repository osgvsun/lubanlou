package net.gvsun.timetable.internal.audit;

import lombok.Data;

import java.io.Serializable;

/**
 * Description 用于存放页面按钮显示的VO
 *
 * @author weicheng
 * @date 2021/2/18 10:26
 */
@Data
public class BaseActionAuthDTO implements Serializable {
    /**
     * 获取查看按钮权限
     */
    private boolean searchActionAuth;
    /**
     * 获取删除按钮权限
     */
    private boolean deleteActionAuth;
    /**
     * 获取增加按钮权限
     */
    private boolean addActionAuth;
    /**
     * 获取修改按钮权限
     */
    private boolean updateActionAuth;
    /**
     * 获取学生选课按钮权限
     */
    private boolean selectGroupActionAuth;
    /**
     * 获取是否审核的设置
     */
    private boolean auditOrNot;
    /**
     * 获取审核按钮权限
     */
    private boolean auditActionAuth;
    /**
     * 获取发布按钮权限
     */
    private boolean publicActionAuth;
    /**
     * 获取跨学院查询权限
     */
    private boolean CrossAcademyActionAuth;
    /**
     * 权限范围
     */
    private String authRange;
    /**
     * 管理删除按钮权限
     */
    private boolean deleteManageAuth;

    public void copy(BaseActionAuthDTO that){
        this.setAuditActionAuth(that.isAuditActionAuth());
        this.setSearchActionAuth(that.isSearchActionAuth());
        this.setAddActionAuth(that.isAddActionAuth());
        this.setDeleteActionAuth(that.isDeleteActionAuth());
        this.setUpdateActionAuth(that.isUpdateActionAuth());
        this.setCrossAcademyActionAuth(that.isCrossAcademyActionAuth());
        this.setPublicActionAuth(that.isPublicActionAuth());
        this.setSelectGroupActionAuth(that.isSelectGroupActionAuth());
        this.setAuthRange(that.getAuthRange());
        this.setAuditOrNot(that.isAuditOrNot());
    }

}
