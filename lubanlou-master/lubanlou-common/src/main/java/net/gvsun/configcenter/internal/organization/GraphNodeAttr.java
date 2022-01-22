package net.gvsun.configcenter.internal.organization;

import lombok.Getter;
import lombok.Setter;
import net.gvsun.tree.Attribute;

import java.util.Map;

/**
 * 图的节点属性
 *
 * @author 杨新蔚
 */
@Setter
@Getter
public class GraphNodeAttr implements Attribute {
    private String name;//节点名
    private Integer configTypeId;//类型id
    private Integer templateId;//模板id
    private Map<String,String> customField;//自定义字段
}
