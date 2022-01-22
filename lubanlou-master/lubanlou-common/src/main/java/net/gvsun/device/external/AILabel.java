package net.gvsun.device.external;

import lombok.Data;

/**
 * 适配前端AILabel插件打点数据
 *
 * @author FuShiLiang
 * @since 2021-11-15
 */
@Data
public class AILabel {
    private String id;
    private Props props;
    private Shape shape;
    private Style style;
}
