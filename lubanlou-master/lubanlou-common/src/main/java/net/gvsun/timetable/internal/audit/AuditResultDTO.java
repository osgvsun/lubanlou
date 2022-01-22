package net.gvsun.timetable.internal.audit;

import lombok.Data;

import java.io.Serializable;


/**
*  Description
*
*  @author weicheng
*  @date 2021/3/4 16:55
*/
@Data
public class AuditResultDTO implements Serializable {
    private String status;
    private Object data;

}
