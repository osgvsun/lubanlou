package net.gvsun.timetable.internal.user;


import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * Descriptions：共享库-User的DTO对象
 *
 * @author 魏诚
 * @date 2018-09-04
 */
@Data
public class UserDTO implements Serializable {
    /**
     * 用户的编号
     */
    private String username;
    /**
     * 用户的姓名
     */
    private String cname;
    /**
     * 用户的卡号
     */
    private String cardno;
    /**
     * 用户的学院
     */
    private String academyName;
    /**
     * 用户的学院
     */
    private String academyNumber;
    /**
     * 用户的身份
     */
    private String userRole;
    /**
     * 用户班级名称
     */
    private String className;
    /**
     * 用户班级编号
     */
    private String classNumber;
    /**
     * 用户身份
     */
    private String identity;
    /**
     * 教师姓名（工号）
     */
    private String teacher;

    /**
     * 用户辅组功能：是否选择：0：未选，1选择
     */
    private int selected;

    /**
     * 年龄
     */
    private String age;

    /**
     * 工龄
     */
    private String workingYears;

    /**
     * 职称
     */
    private String Title;

    /**
     * 电话
     */
    private String telephone;

    /**
     * 冲突课程名称
     */
    private String courseName;


    private List<AuthorityDTO> authorityDTOs;


}
