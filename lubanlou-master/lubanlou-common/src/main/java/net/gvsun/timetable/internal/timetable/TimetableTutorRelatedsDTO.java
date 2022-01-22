package net.gvsun.timetable.internal.timetable;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：批量修改排课教师-TimetableLabTeachers的DTO对象
 *
 * @author weicheng
 * @date 2018-09-04
 */
@Data
public class TimetableTutorRelatedsDTO implements Serializable {
    /**
     * 教学班编号
     */
    private String courseNo;
    /**
     * 新增教师工号，以逗号分隔
     */
    private String tutorsByAdd;
    /**
     * 删除教师工号，以逗号分隔
     */
    private String tutorsByRemove;
    private Integer batchId;
}
