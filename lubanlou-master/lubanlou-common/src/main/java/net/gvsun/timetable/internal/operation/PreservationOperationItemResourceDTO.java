package net.gvsun.timetable.internal.operation;


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
public class PreservationOperationItemResourceDTO implements Serializable {

    /**
     * 项目设备材料主键
     */
    private Integer id;
    /**
     * 项目设备材料名称
     */
    private String resourceName;

    /**
     * 项目设备材料类型
     */
    private String resourceType;

    /**
     * 项目设备材料规格型号
     */
    private String resourceSpecifications;

    /**
     * 项目设备材料数量
     */
    private Integer resourceUnit;


    /**
     * 所属项目id
     */
    private Integer lpId;

}
