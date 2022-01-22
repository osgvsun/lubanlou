package net.gvsun.configcenter.internal;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Description:业务流程相关用户表
 *
 * @author: 杨新蔚
 * @date: 2021/12/7
 */
@Data
@ToString
public class TimetableProcessUserDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    Integer timetableId;
    //发起对象集合
    List<TimetableProcessInitiatorDTO> timetableProcessInitiatorDTOS;
    //目标对象集合
    List<TimetableProcessTargetDTO> timetableProcessTargetDTOS;
}
