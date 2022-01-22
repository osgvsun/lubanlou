package net.gvsun.timetable.internal.timetable;

import lombok.Data;
import net.gvsun.timetable.internal.audit.BaseActionAuthDTO;

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
public class TimetableBatchListDTO implements Serializable {
    private int id;
    /**
     * 教学班编号
     */
    private String courseNo;
    private Integer selfId;
    /**
     * 批次名称，默认为第1批等...
     */
    private String batchName;
    /**
     * 分组数
     */
    private int countGroup;
    /**
     * 当前学生是否已选择
     */
    private int selected;
    /**
     * 是否学生选课0自动选课1学生选课
     */
    private int ifselect;
    /**
     * 排课情况1：排课完成0：未完成
     */
    private int flag;
    private List<TimetableGroupDTO> timetableGroupDTOs;
    private Date startDate;
    private Date endDate;
    /**
     * 每人可选组数
     */
    private Integer maxGroupNum;
    private String startTime;
    private String endTime;
    /**
     * 分组学生名单分配方式   1随机分配   2行政班安排  2自行分配
     */
    private Integer distributionMode;

    private BaseActionAuthDTO baseActionAuthDTO;


}
