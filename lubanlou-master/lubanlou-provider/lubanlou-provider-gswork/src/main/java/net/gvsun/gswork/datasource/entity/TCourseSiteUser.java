package net.gvsun.gswork.datasource.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@TableName("t_course_site_user")
public class TCourseSiteUser implements Serializable {
    private static final long serialVersionUID = 1L;
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    private Integer siteId;
    private String username;
    private Integer permission;
    private Integer role;
    private Integer groupId;
    private Integer realGrade;
    private Integer finalGrade;
    private Integer increment;
    private Integer isexemption;
    private Integer batch;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastTime;
    private Integer audit_status;
    private Float evaluationEachOtherScore;
    private Integer groupRanking;
}
