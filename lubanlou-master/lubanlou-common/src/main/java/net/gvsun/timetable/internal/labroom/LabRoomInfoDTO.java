package net.gvsun.timetable.internal.labroom;


import lombok.Data;
import net.gvsun.timetable.internal.audit.BaseActionAuthDTO;
import net.gvsun.timetable.internal.school.SystemBuildDTO;
import net.gvsun.timetable.internal.school.SystemCampusDTO;
import net.gvsun.timetable.internal.user.UserDTO;

import java.io.Serializable;
import java.util.List;

/**
 * Descriptions：实验室列表呈现vo
 *
 * @author 魏诚
 * @date 2018-09-04
 */
@Data
public class LabRoomInfoDTO implements Serializable {
    /**
     * 实验室编号
     */
    private String id;
    /**
     * 教学班编号
     */
    private String labRoomName;
    /**
     * 课程编号
     */
    private String labRoomNumber;
    /**
     * 课程名称
     */
    private String address;
    /**
     * 教师工号
     */
    private String username;
    /**
     * 学院名称
     */
    private String academyName;
    /**
     * 学院名称
     */
    private String academyNumer;
    //
    private List<UserDTO> managers;

    private BaseActionAuthDTO baseActionAuthDTO;
    /**
     * 校区信息
     */
    private String campusName;
    /**
     * 楼宇信息
     */
    private String buildName;

}
