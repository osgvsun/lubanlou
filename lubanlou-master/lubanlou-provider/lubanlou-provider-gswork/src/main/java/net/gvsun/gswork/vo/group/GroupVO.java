package net.gvsun.gswork.vo.group;

import lombok.Data;

import java.io.Serializable;
@Data
public class GroupVO implements Serializable {
    private Integer groupId;
    private String title;
    private Integer categoryId;
}
