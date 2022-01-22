package net.gvsun.timetable.internal.school;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;
import java.time.LocalDateTime;


/**
 * Description 排课主业务信息表对象
 *
 * @author weicheng
 * @date 2020/6/24 13:45
 */

@Data
@ToString
public class SchoolAffiliationDTO {
    String affiliationNumber;

    /**
     * 主管单位的名称
     */
    String name;

    /**
     * 所属学院
     */
    String academyNumber;

    /**
     * 下属学院
     */
    String affiliationAcademy;

    /**
     * 创建日期
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime createdDate;
    /**
     * 更新日期
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime updatedDate;
    /**
     * 创建者
     */
    String createdBy;
    /**
     * 更新者
     */
    String updatedBy;

}
