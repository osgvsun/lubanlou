package net.gvsun.timetable.internal.labroom;


import lombok.Data;
import net.gvsun.common.Result;
import net.gvsun.timetable.internal.school.SystemBuildDTO;
import net.gvsun.timetable.internal.school.SystemCampusDTO;

import java.io.Serializable;
import java.math.BigDecimal;

/**
*  Description
*
*  @author weicheng
*  @date 2021/2/18 10:44
*/
@Data
public class SystemRoomDTO  implements Serializable  {
    /**
     * 房间号
     */
    private String roomNo;
    /**
     * 房间编号
     */
    private String roomNumber;
    /**
     * 房间名称
     */
    private String roomName;
    /**
     * 楼层号
     */
    private String floorNo;
    /**
     * 校区名称
     */
    private String campusName;
    /**
     * 楼宇名称
     */
    private String buildName;
    /**
     * 是否关联实验室(空则未关联，否则关联)
     */
    private String systemRoom;



}
