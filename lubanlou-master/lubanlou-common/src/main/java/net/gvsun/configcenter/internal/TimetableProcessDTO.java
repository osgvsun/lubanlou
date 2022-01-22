package net.gvsun.configcenter.internal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/*************************************************************************************
 * Description:业务流程dto
 *
 * @author: 杨新蔚
 * @date: 2020/4/9
 *************************************************************************************/
@NoArgsConstructor
@Data
@ApiModel(value="业务流程dto",description="业务流程dto")
public class TimetableProcessDTO {
    //业务流程id
    private Integer timetableProcessId;
    //流程名称
    private String processCname ;
    //业务id（外键）
    private Integer timetableId ;
    //模板流程步骤
    private Integer processStep ;
    //业务流程初始步骤
    private Integer initialStep ;
    //平行任务序号
    private Integer parallelTask ;
    //是否需要审核0：否，1是
    private Integer isAudit ;
    //是否被选择,0否1是
    private Integer isChose ;
    //表头指标集合
    private List<ConfigIndicatorDTO> configIndicators;
    //参数指标list，用于调用api接口
    private List<ConfigIndicatorDTO> paramConfigIndicatorDTOS;
    //指标结果集合
    private List<TimetableResultDTO> timetableResults;
    //发起用户集合
    private List<TimetableProcessInitiatorDTO> timetableProcessInitiators;
    //目标用户集合
    private List<TimetableProcessTargetDTO> timetableProcessTargets;
    //编辑权限信息集合
    private List<String> authorityNamesEdit;
    //刪除权限信息集合
    private List<String> authorityNamesDelete;
}
