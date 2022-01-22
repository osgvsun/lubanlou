package net.gvsun.configcenter.internal.organization;

import lombok.Data;
import net.gvsun.tree.Attribute;

import java.util.List;

/*************************************************************************************
 * Description:图节点dto
 *
 * @author: 杨新蔚
 * @date： 2021/12/8
 *************************************************************************************/
@Data
public class GraphNodeDTO {
    private Integer uid;
    private Attribute attribute;
    private List<GraphNodeDTO> childList;
}
