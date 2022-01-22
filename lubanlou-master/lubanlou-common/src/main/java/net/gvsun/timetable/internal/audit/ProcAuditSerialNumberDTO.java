package net.gvsun.timetable.internal.audit;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@Data
@NoArgsConstructor
@ToString
/**
*  Description DTO-审核流水单audit_serial_number的DTO对象
*
*  @author weicheng
*  @date 2020/7/2 14:23
*/
public class ProcAuditSerialNumberDTO implements Serializable {
    /**
     * 用户username
     * */
    private String uuid;
    /**
     * 选课组编号
     * */
    private String businessAppUid;
    /**
     * schoolCourseDetail的编号的详细
     * */
    private String businessType;
    /**
     * 排课的实验室
     * */
    private boolean enable;

}
