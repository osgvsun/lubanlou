package net.gvsun.timetable.internal.school;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.io.Serializable;
@Data
@ApiModel(value="DTO-SchoolTermDTO")
public class SchoolTermDTO implements Serializable {
    private Integer id;
    /**
     * 学期名称
     */
    String termName;
}
