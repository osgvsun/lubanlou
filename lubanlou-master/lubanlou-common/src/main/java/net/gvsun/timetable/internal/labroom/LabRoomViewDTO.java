package net.gvsun.timetable.internal.labroom;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 *  Description 实验室对象
 *
 *  @author weicheng
 *  @date 2020/12/18 7:26
 */
@Data
@ToString
public class LabRoomViewDTO implements Serializable {
    /**
     * 实验室主键
     */
    private Integer id;
    /**
     * 实验室编号
     */
    private String labRoomNumber;
    /**
     * 实验室名称
     */
    private String labRoomName;
}
