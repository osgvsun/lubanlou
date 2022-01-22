package net.gvsun.timetable.internal.timetable;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：直接排课-列表呈现vo
 *
 * @author 魏诚
 * @date 2018-09-04
 */
@Data
public class TimetableInClassDTO implements Serializable {
    /**
     * 教学班编号
     */
    private String courseNo;
    /**
     * 学期
     */
    private Integer termId;
    /**
     * 排课星期
     */
    private Integer weekday;
    /**
     * 排课周次,多选，逗号分隔
     */
    private String weeks;
    /**
     * 排课节次,多选，逗号分隔
     */
    private String sections;

    /**
     * 排课地点，多选，逗号分隔
     */
    private String rooms;
    /**
     * 授课教师
     */
    private String teacher;
    private String info;
}
