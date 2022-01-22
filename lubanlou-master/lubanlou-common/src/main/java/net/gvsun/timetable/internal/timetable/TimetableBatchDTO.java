package net.gvsun.timetable.internal.timetable;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Descriptions：直接排课-列表呈现vo
 *
 * @author 魏诚
 * @date 2018-09-04
 */
@Data
public class TimetableBatchDTO implements Serializable {
    private int id;
    /**
     * 教学班编号
     */
    private String courseNo;
    /**
     * 批次名称，默认为第1批等...
     */
    private String batchName;
    /**
     * 分组数
     */
    private int countGroup;
    /**
     * 是否学生选课0自动选课1学生选课
     */
    private int ifselect;
    /**
     * 每组人数
     */
    private int numbers;
    private int flag;
    private int selfId;
    private List<TimetableGroupDTO> timetableGroupDTOs;
    private Date startDate;
    private Date endDate;
    private String startopDate;
    /**
     * 每人可选组数
     */
    private int maxGroupNum;
    /**
     * 最多退选次数
     */
    private int maxDropNum;
    /**
     * 批次id
     */
    private int batchId;
    /**
     * 分页参数
     */
    private int limit;
    private int page;
    /**
     * 组数id
     */
    private int groupId;
    /**
     * 教学班编号
     */
    private String classNumber;
    /**
     * 搜索
     */
    private String search;
    /**
     * 起始学号
     */
    private String startStudentNumber;
    /**
     * 终止学号
     */
    private String endStudentNumber;
    /**
     * 学期
     */
    private int termId;

}
