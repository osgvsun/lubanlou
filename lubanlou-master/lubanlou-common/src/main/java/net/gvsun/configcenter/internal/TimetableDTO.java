package net.gvsun.configcenter.internal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

/*************************************************************************************
 * Description:业务总dto
 *
 * @author: 杨新蔚
 * @date: 2020/4/9
 *************************************************************************************/
@NoArgsConstructor
@Data
@ApiModel(value="业务信息dto",description="业务信息dto")
public class TimetableDTO implements Serializable,Comparable{
    @ApiModelProperty(value="业务id",name="id")
    Integer id;
    @ApiModelProperty(value="模板id",name="templateId")
    Integer templateId;
    @ApiModelProperty(value="主键配置，用于查询（已弃用）",name="primaryConfig")
    Integer primaryConfig;
    @ApiModelProperty(value="业务来源",name="sourceProject")
    String sourceProject;
    @ApiModelProperty(value="流程引擎流程key",name="processKey")
    String processKey;
    @ApiModelProperty(value="扩展业务id",name="businessId")
    String businessId;
    @ApiModelProperty(value="业务基础时间，非控制显示时间。如上课打分，该时间为上课时间，非打分时间",name="businessTime")
    String businessTime;
    @ApiModelProperty(value="业务当前步骤",name="currentStep")
    Integer currentStep;
    @ApiModelProperty(value="业务开始时间",name="startTime")
    Date startTime;
    @ApiModelProperty(value="业务结束时间",name="endTime")
    Date endTime;
    @ApiModelProperty(value="创建时间",name="createdTime")
    Date createdTime;
    @ApiModelProperty(value="创建人",name="createdBy")
    String createdBy;
    @ApiModelProperty(value="业务流程dto",name="timetableProcessDTOS")
    private List<TimetableProcessDTO> timetableProcessDTOS;
    @ApiModelProperty(value="configIndicatorName为globalVariable开头的数据，需要全局使用",name="globalVariableInfo")
    private Map<String,GlobalVariableDTO> globalVariableInfos;
    @ApiModelProperty(value="其他业务系统基础信息，通过configType的url获取",name="businessInfos")
    private List<Map> businessInfos;

    @Override
    public boolean equals(Object obj) {
        TimetableDTO u = (TimetableDTO) obj;
        return id.equals(u.id);
    }

    @Override
    public int hashCode() {
        Integer in = id;
        return in.hashCode();
    }

    @Override
    public int compareTo(Object o) {
        TimetableDTO timetable=(TimetableDTO) o;
        return id-timetable.id;
    }
}
