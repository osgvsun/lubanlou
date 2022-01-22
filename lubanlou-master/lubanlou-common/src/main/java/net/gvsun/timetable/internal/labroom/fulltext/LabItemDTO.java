package net.gvsun.timetable.internal.labroom.fulltext;


import lombok.Data;
import net.gvsun.timetable.internal.asset.AssetDTO;
import net.gvsun.timetable.internal.device.SchoolDeviceDTO;
import net.gvsun.timetable.internal.labroom.CommonDocumentDTO;

import java.io.Serializable;
import java.util.List;

/**
 * Descriptions
 *
 * @author lay
 * @date  2021-07-21
 */
@Data
public class LabItemDTO implements Serializable {
    /**
     * 实验项目主键
     */
    private Integer id;
    /**
     * 面向专业
     */
    private String lpMajorFit;
    /**
     * 实验名称
     */
    private String lpName;

    /**
     * 所属课程名称
     */
    private String courseName;

    /**
     * 实验要求
     */
    private String itemAim;


    /**
     * 实验学时
     */
    private String lpDepartmentHours;

    /**
     * 实验类别
     */
    private String lpCategoryMain;

    /**
     * 实验类型
     */
    private String lpCategoryApp;

}
