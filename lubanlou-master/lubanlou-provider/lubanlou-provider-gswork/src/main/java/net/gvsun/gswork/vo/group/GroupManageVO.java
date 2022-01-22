package net.gvsun.gswork.vo.group;

import lombok.Data;

import java.io.Serializable;

/**
 * 小组管理列表展示vo，三个实体，小组类别，小组，学生，id为三个实体id，其中学生为username，name为三个实体name，其中学生为cname
 * (三个实体放到一块展示)
 */
@Data
public class GroupManageVO implements Serializable {
    private String id;
    private String pId;
    private String name;
}
