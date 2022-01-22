package net.gvsun.gswork.datasource.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@TableName("t_course_site_group")
public class TCourseSiteGroup implements Serializable {
    private static final long serialVersionUID = 1L;
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    private Integer siteId;
    private String groupTitle;
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDate;
    private String githubAddress;
    private Integer isOpen;
    private Integer publish;
    private Integer isExcellent;
    @TableField(updateStrategy = FieldStrategy.IGNORED)
    private Integer actTaskId;
    private Integer leaderId;
    private Integer categoryId;
}
