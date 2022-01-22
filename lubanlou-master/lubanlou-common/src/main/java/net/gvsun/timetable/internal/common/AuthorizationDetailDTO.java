package net.gvsun.timetable.internal.common;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
*  Description 通用权限配置的dto
*
*  @author weicheng
*  @date 2021/3/19 11:33
*/
@Data
@ToString
public class AuthorizationDetailDTO implements Serializable {

    /**
     * 权限代号
     */
    private String role="";
    /**
     * 是否可添加
     */
    private Boolean add = false;
    /**
     * 是否可删除
     */
    private Boolean delete = false;
    /**
     * 是否可修改
     */
    private Boolean update = false;
    /**
     * 是否可检索
     */
    private Boolean search = false;
    /**
     * 是否可学生选课
     */
    private Boolean selectCourse = false;
    /**
     * 是否可发布排课
     */
    private Boolean publicTimetable = false;
}
