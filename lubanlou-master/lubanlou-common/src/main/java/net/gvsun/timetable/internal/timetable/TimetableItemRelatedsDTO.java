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
public class TimetableItemRelatedsDTO implements Serializable {
    /**
     * 排课编号
     */
    private Integer appointmentId;

    /**
     * 教学班编号
     */
    private String courseNo;
    /**
     * 新增项目id号，以逗号分隔
     */
    private String itemsByAdd;
    /**
     * 删除项目id号，以逗号分隔
     */
    private String itemsByRemove;
    private Integer batchId;
}
