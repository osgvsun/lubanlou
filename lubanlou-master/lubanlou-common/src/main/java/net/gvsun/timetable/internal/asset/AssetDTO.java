package net.gvsun.timetable.internal.asset;


import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions
 *
 * @author lay
 * @date  2021-07-21
 */
@Data
public class AssetDTO implements Serializable {
    /**
     * 主键
     */
    private Integer id;
    /**
     * 物资名称
     */
    private String chName;

    /**
     * 物资类型
     */
    private String category;

    /**
     * 规格型号
     */
    private String specifications;

    /**
     * 单位
     */
    private String unit;

    /**
     * 数量
     */
    private String amount;

    /**
     * 价格
     */
    private String totalPrice;

}
