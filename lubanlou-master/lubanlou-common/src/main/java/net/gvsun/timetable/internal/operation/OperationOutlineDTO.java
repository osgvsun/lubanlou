package net.gvsun.timetable.internal.operation;


import lombok.Data;
import net.gvsun.datashare.external.shareddata.SchoolAcademyDTO;
import net.gvsun.timetable.internal.asset.AssetDTO;
import net.gvsun.timetable.internal.device.SchoolDeviceDTO;
import net.gvsun.timetable.internal.labroom.CommonDocumentDTO;

import java.io.Serializable;
import java.util.List;

/**
 * Descriptions
 *
 * @author caohuan
 * @date  2021-09-15
 */
@Data
public class OperationOutlineDTO implements Serializable {
    /**
     * 实验项目主键
     */
    private Integer id;
    /**
     * 实验项目编号
     */
    private String labOutlineName;
    private String creator;
    private String startSchool;
    /**
     * 面向专业
     */
    private String courseNumber;
    /**
     * 实验名称
     */
    private String courseName;

    /**
     * 学期名称
     */
    private String cname;

    /**
     * 所属实验室名称
     */
    private String academyName;

    /**
     * 所属课程名称
     */
    private Integer cDictionaryId;

    /**
     * 创建者名称
     */
    private String cNumber;

    /**
     * 状态
     */
    private String cName;
    private SchoolAcademyDTO schoolAcademyDTO;


}
