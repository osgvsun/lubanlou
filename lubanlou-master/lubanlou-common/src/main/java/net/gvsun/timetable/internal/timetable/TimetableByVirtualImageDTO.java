package net.gvsun.timetable.internal.timetable;



import lombok.Data;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

/**
 *  Description 排课相关镜像DTO
 *
 *  @author Hezhaoyi
 *  @date 2020/12/8
 */
@Data
public class TimetableByVirtualImageDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 课程id
     */
    private String courseId;

    /**
     * 镜像id
     */
    private String virtualImage;

    /**
     * 开始时间
     */
    private String startTime;

    /**
     * 结束时间
     */
    private String endTime;

    /**
     * 预约id
     */
    private Integer id;

    /**
     * 区分镜像(0为华栖云)
     */
    private Integer flag;


}
