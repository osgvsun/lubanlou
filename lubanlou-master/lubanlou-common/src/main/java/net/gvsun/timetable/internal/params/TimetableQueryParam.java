package net.gvsun.timetable.internal.params;


import lombok.Data;
import lombok.ToString;

/**
 * Descriptions：共享库-SchoolCourseDetail的DTO对象
 *
 * @author 魏诚
 * @date 2018-09-04
 */
@Data
@ToString
public class TimetableQueryParam {

    /**
     * 总课表的主键id，
     */
    private String id;
    /**
     * 排课的年度查询，
     * 例：2021  year 不能为空
     */
    private String year;
    private String termNumber;

    /**
     * 排课的批组查询，
     */
    private String batchId;
    private String groupId;

    /**
     * 排课房间内的物联ip匹配，
     */
    private String ip;

    /**
     * 排课的类型查询，
     * 例："COURSE":教务排课 SELF:自主排课 PRACTICE:工训排课 TEACH:教学排课 TRAIN:培训排课 RESERVATION:预约 仪器预约:INSTRUMENT
     */
    private String timetableType = "";

    /**
     * 排课的学生查询，
     * 例：190320517
     */
    private String studentId;
    private Boolean outputStudent=true;
    private String teacherId;
    private Boolean conflictDetection=false;
    private String studentCard;
    /**
     * 排课的房间查询，
     * 例：k109
     */
    private String roomId;

    /**
     * 过滤排课综合查询
     * 1：教师姓名，工号
     * 2：学生姓名，学号
     * 3：课程名称，课程编号
     * 4：主键id
     * */
    private String search;

    /**
     * 排课的日期查询，
     * 例：2021-05-04 或 2021-05-04 02:04:05
     */
    private String startDate;
    private String endDate;

    /**
     * 排课的状态查询，
     * 例：PUBLIC:已发布 NO_PUBLIC:待发布
     */
    private String status;

    /**
     * 排课的缓存条件策略，
     */
    Boolean redisCondi = true;

    private Integer offset;
    /**
     * 每页记录
     */
    private Integer limit;

}
