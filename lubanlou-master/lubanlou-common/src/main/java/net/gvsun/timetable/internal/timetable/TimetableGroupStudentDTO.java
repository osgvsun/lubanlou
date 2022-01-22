package net.gvsun.timetable.internal.timetable;


import lombok.Data;
import lombok.ToString;
import net.gvsun.timetable.internal.user.UserDTO;

import java.io.Serializable;
import java.util.List;

/**
 * Descriptions：共享库-SchoolCourseDetail的DTO对象
 *
 * @author weicheng
 * @date  2018-09-04
 */
@Data
@ToString
public class TimetableGroupStudentDTO implements Serializable {
    /**
     * 分组id
     */
    private int groupId;
    /**
     * 用户名单
     */
    private List<UserDTO> userDTOs;
    /**
     * 当前组的人数
     */
    private TimetableGroupDTO timetableGroupDTO;
    /**
     * 当前组的人数
     */
    private int groupNumber;
    /**
     * 当前组的 学生
     */
    private String[] students;
    /**
     * 调进的分组id
     */
    private Integer inGroupId;
    private String createdBy;
    private String role;
    private String academyNumber;
}
