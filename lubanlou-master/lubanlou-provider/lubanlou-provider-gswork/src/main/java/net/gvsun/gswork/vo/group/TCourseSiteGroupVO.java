package net.gvsun.gswork.vo.group;

import lombok.Data;

import java.io.Serializable;

@Data
public class TCourseSiteGroupVO implements Serializable {
    private Integer id;
    private Integer categoryId;
    private String groupTitle;
    private String description;
}
