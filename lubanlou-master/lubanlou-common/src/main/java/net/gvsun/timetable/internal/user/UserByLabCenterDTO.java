package net.gvsun.timetable.internal.user;



import lombok.Data;

import java.io.Serializable;

/**
 * Description:用户dto
 *
 * @author: 杨新蔚
 * @date: 2019/11/8
 */
@Data
public class UserByLabCenterDTO implements Serializable {
    /**
     * 用户编号
     */
    private String username;

    /**
     * 用户名
     */
    private String cname;

    /**
     * 用户名
     */
    private String identity;

    /**
     * 班级编号
     */
    private String classNumber;

    /**
     * 班级名
     */
    private String className;

    /**
     * 学院名
     */
    private String academyName;

    /**
     * 学时
     */
    private String classPeriod;

        @Override
    public boolean equals(Object obj) {
        UserByLabCenterDTO u = (UserByLabCenterDTO) obj;
        return username.equals(u.username);
    }

    @Override
    public int hashCode() {
        String in = username;
        return in.hashCode();
    }
}
