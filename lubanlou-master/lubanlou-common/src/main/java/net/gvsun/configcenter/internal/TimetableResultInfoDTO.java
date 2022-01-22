package net.gvsun.configcenter.internal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;

/*************************************************************************************
 * Description:业务结果dto
 *
 * @author: 杨新蔚
 * @date: 2020/7/27
 *************************************************************************************/
@NoArgsConstructor
@Data
public class TimetableResultInfoDTO {
    //业务结果
    private TimetableResultDTO timetableResult;
    //参数map，用于调用api接口
    private HashMap<String,String> paramMap;
    //流程提交人
    private String submitUser;
    //并行网关执行的任务序号列表,逗号隔开,如1，3
    private String taskList;
    //结果
    private String result;
    //阶段步骤(1,2,3,4...)
    private Integer stageId;
    //对应业务流程id
    private Integer timetableProcessId ;
    //阶段名称
    private String processCname;
    //是否完结
    private Integer isComplete;
    //其他步骤业务结果，设备流程添加，将该result存至有特定indicatorName（|autoInsert|）的后续步骤
    private List<TimetableResultDTO> otherStepResults;
    //用户短信、邮件相关dto，用于发送邮件、短信
    private List<MessageUserDTO> messageUserDTOS;
}
