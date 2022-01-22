package net.gvsun.timetable.internal.labroom;


import lombok.Data;
import net.gvsun.common.EntityTypeEnum;
import net.gvsun.timetable.internal.school.SystemBuildDTO;
import net.gvsun.timetable.internal.school.SystemCampusDTO;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
*  Description
*
*  @author weicheng
*  @date 2021/2/18 10:44
*/
@Data
public class LabInfoDTO {
    private EntityTypeEnum entityTypeEnum;
    private List<Integer> idList;
}
