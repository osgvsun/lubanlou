package net.gvsun.configcenter.internal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.models.auth.In;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/*************************************************************************************
 * Description:模板dto
 *
 * @author: 杨新蔚
 * @date: 2020/9/15
 *************************************************************************************/
@NoArgsConstructor
@Data
public class TemplateDTO {
    //模板id
    Integer templateId;
    //模板id
    Integer id;
    //模板名称
    String templateCname;
    //模板类型（外键）
    Integer configType;
    //是否发布
    Integer isReleased;
    //业务id
    String businessId;
    //主键配置，用于查询（即将弃用）
    Integer primaryConfig;
    //来源项目
    String sourceProject;
    //流程引擎key
    String processKey;
    //模板页面按钮总览名称显示（如总览、会议信息）
    String infoCname;
    //模板页面按钮下一步名称显示（如下一步、下一阶段）
    String nextStepCname;
    //图节点uid
    Integer graphNodeUid;
}
