package net.gvsun.configcenter.internal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * Description:业务流程目标者对象
 *
 * @author: 杨新蔚
 * @date: 2021/12/7
 */
@Data
@ToString
public class TimetableProcessTargetDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    //业务流程发起者id
    Integer id ;
    //业务流程id
    Integer timetableProcessId ;
    //业务id
    Integer timetableId ;
    //目标者学（工）号
    String targetUsername ;
    //目标者姓名
    String targetCname ;
    //用户信息（json格式）
    String userInfo;
    //是否删除
    Boolean isDelete;
    //创建时间
    Date createdTime;
    //创建者
    String createdBy;
}
