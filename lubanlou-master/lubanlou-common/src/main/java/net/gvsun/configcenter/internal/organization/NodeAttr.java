package net.gvsun.configcenter.internal.organization;

import lombok.Getter;
import lombok.Setter;
import net.gvsun.tree.Attribute;

import java.util.Map;

@Setter
@Getter
public class NodeAttr implements Attribute {
    private String name;//节点名
    private Integer templateId;//模板id
    private Map<String,String> customField;//自定义字段
}
