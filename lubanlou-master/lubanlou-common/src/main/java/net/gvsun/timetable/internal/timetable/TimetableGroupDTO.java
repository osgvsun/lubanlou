package net.gvsun.timetable.internal.timetable;



import lombok.Data;
import lombok.ToString;
import net.gvsun.timetable.internal.audit.BaseActionAuthDTO;

import java.io.Serializable;
import java.util.List;

/**
*  Description 共享库-SchoolCourseDetail的DTO对象
*  
*  @author weicheng
*  @date 2020/9/17 15:29
*/
@Data
@ToString
public class TimetableGroupDTO implements Serializable {

    /**
    * 主键
    */
    private int id;
    /**
     * 外键对应批的主键
     */
    private int batchId;
    /**
     * 组的人数
     */
    private int groupNumber;
    /**
     * 实际分配的人数
     */
    private int groupStudentNumbers;
    private int timetableId;
    private String timetable;
    /**
     * 当前学生是否已选择
     */
    private int selected;
    private List<TimetableDTO> timetables;
    /**
     * 组名
     */
    private String groupName;
    private BaseActionAuthDTO baseActionAuthDTO;
    /**
     * 分页参数
     */
    private int limit;
    private int page;
    /**
     * 教学班编号
     */
    private String courseNo;
    private int groupId;
    private int station;
    /**
     * 是否安排学生名单 1是/0否
     */
    private int isArrange;
    /**
     * 已安排行政班
     */
    private String[] classSelected;
    /**
     * 已安排行政班字符串类型、用于显示页面
     */
    private String classSelectedString;
    /**
     * 是否已安排行政班标记位
     */
    private boolean flag;
    /**
     * 剩余容量未分配的人数
     */
    private int remainingNumbers;

   
}
