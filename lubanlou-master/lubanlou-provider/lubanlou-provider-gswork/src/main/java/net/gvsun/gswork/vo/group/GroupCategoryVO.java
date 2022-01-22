package net.gvsun.gswork.vo.group;

import lombok.Data;

import java.io.Serializable;

@Data
public class GroupCategoryVO implements Serializable {
    private Integer id;
    private String name;
    private Integer siteId;
}
