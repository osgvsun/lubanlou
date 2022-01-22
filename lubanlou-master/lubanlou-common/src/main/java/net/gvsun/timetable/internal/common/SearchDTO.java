package net.gvsun.timetable.internal.common;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
*  Description DTO-下拉框的通用查询dto对象
*
*  @author weicheng
*  @date 2020/6/15 11:22
*/
@Data
@ToString
public class SearchDTO implements Serializable {
    /**
     * 业务分类
     * 1:LabroomDeviceManager实验设备管理员
     * 2:schoolAcademy学院
     * 3:schoolClass班级
     * 4:schoolMajor专业
     * 5:schooLTer学期
     */
    private String type;
    /**
    * 通用查询字符
    */
    private String search;
     /**
     * 学院编号
     * 1：空或空字符串，不区分学院
     */
    private String academyNumber;
    /**
     * 用户权限
     * 1：老师 0：学生；
     * 2：空或空字符串，不区分角色
     */
    private String userRole;
}
