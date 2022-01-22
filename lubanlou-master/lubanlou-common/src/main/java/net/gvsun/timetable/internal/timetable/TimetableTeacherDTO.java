package net.gvsun.timetable.internal.timetable;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 * Description VO-泛型通用vo-泛型页面对象业务对象
 *
 * @author weicheng
 * @date 2020/6/15 11:22
 */
@Data
@ToString
public class TimetableTeacherDTO implements Serializable {

    private static final long serialVersionUID = 2355512314235134L;

    /**
     * 教师内容
     * 1:教师名称
     * 2:(工号)
     */
    private String teacher;
    /**
     * 教师类型
     * teacher:教师，tutor:助教
     */
    private String type;
    /**
     * 工号
     */
    private String username;
}
