package net.gvsun.configcenter.internal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/*************************************************************************************
 * Description:模板与工种信息dto
 *
 * @author: 杨新蔚
 * @date: 2020/8/27
 *************************************************************************************/
@NoArgsConstructor
@Data
@ApiModel(value="模板与工种信息dto",description="模板与工种信息dto")
public class TemplateAndBusinessInfoDTO {
    @ApiModelProperty(value="模板id",name="templateId")
    private Integer templateId;
    @ApiModelProperty(value="模板名称",name="templateCname")
    private String templateCname;
    @ApiModelProperty(value="业务id",name="businessId")
    private String businessId;
    @ApiModelProperty(value="业务名称",name="businessName")
    private String businessName;
    @ApiModelProperty(value="课程编号",name="courseNumber")
    private String courseNumber;
    @ApiModelProperty(value="实验室编号",name="labRoomNumber")
    private String labRoomNumber;
    @ApiModelProperty(value="其他信息",name="businessInfoMap")
    private Map<String,Object> businessInfoMap;
}
