package net.gvsun.feign;

import net.gvsun.auditserver.external.RestResult;
import net.gvsun.common.Result;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * Description
 *
 * @author:lay
 * @date: 2021/1/25 08:22
 */
@FeignClient(value = "auditserver")
public interface AuditServerFeign {
    /**
     * Description获取业务预约审核各级状态
     *
     * @author:lay
     * @date:2021/01/25
     */
    @PostMapping(value = "/audit/getBatchBusinessLevelStatus")
    RestResult getBatchBusinessLevelStatus(@RequestParam("businessUid") String businessUid, @RequestParam("businessType")
            String businessType, @RequestParam("businessAppUid") String businessAppUid);

    /**
     *
     * @Description 获取业务配置项信息
     * @param projectName 项目名称
     * @param businessConfigItem    配置项名称
     * @author 李涵
     * @Date 2021/1/21 10:15
     * @return
     **/
    @PostMapping(value = "/configuration/getBusinessConfiguration")
    RestResult getBusinessConfiguration(@RequestParam("projectName") String projectName, @RequestParam("businessConfigItem") String businessConfigItem);

    /**
     *
     * @Description 获取某项目所有配置项
     * @param projectName   项目名称
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/configuration/getBusinessConfigurationList")
    RestResult getBusinessConfigurationList(@RequestParam("projectName") String projectName);

    /**
     *
     * @Description 获取某项目所有配置项
     * @param projectName   项目名称
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/configuration/getBusinessConfigurationExtend")
    RestResult getBusinessConfigurationExtend(@RequestParam("projectName") String projectName, @RequestParam("businessConfigItemExtend") String businessConfigItemExtend);

    /**
     *
     * @Description 更改项目配置项状态
     * @param id   配置项id
     * @param status 状态 yes/no
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/configuration/setBusinessConfigurationStat")
    RestResult setBusinessConfigurationStat(@RequestParam("id") String id,@RequestParam("status") String status);

    /**
     *
     * @Description 获取项目配置拓展项
     * @param id   配置项id
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/configuration/getConfigurationExtensions")
    RestResult getConfigurationExtensions(@RequestParam("id") String id);

    /**
     *
     * @Description 更改项目配置扩展项状态
     * @param id   配置项id
     * @param status  状态 yes/no
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/configuration/setBusinessConfigurationExtendStat")
    RestResult setBusinessConfigurationExtendStat(@RequestParam("id") String id,@RequestParam("status") String status);
    /**
     *
     * @Description 删除项目配置项纪录
     * @param id   配置项id
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/configuration/deleteBusinessConfigurationRecord")
    RestResult deleteBusinessConfigurationRecord(@RequestParam("id") String id);
    /**
     *
     * @Description 删除项目配置拓展项纪录
     * @param id 父级配置id
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value="/configuration/deleteBusinessConfigExtensionRecord")
    RestResult deleteBusinessConfigExtensionRecord(@RequestParam("id") String id);

    /**
     *
     * @Description 保存业务审核层级
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/audit/saveBusinessAuditConfigLevel")
    RestResult saveBusinessAuditConfigLevel(@RequestParam("auditLevelConfig") String auditLevelConfig, @RequestParam("businessType") String businessType);

    /**
     *
     * @Description 获取审核业务层级
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/audit/getBusinessAuditConfigLevel")
    RestResult getBusinessAuditConfigLevel(@RequestParam("businessType") String businessType);

    /**
     *
     * @Description 获取审核业务层级前缀
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/audit/getBusinessAuditConfigLevelContaining")
    RestResult getBusinessAuditConfigLevelContaining(@RequestParam("businessType") String businessType);

    /**
     *
     * @Description 保存业务审核流程设置
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/audit/saveBusinessAuditConfigs")
    RestResult saveBusinessAuditConfigs(@RequestParam("businessUid") String businessUid, @RequestParam("config") String config, @RequestParam("businessType") String businessType);

    /**
     *
     * @Description 获取业务审核流程设置
     * @param businessType 业务类型
     * @param businessUid
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/audit/getBusinessAuditConfigs")
    RestResult getBusinessAuditConfigs(@RequestParam(required = false,value = "businessUid") String businessUid, @RequestParam("businessType") String businessType);

    /**
     *
     * @Description 保存业务预约初始的审核级别状态
     * @param businessType 业务类型
     * @param businessAppUid 业务uid
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/audit/saveInitBusinessAuditStatus")
    RestResult saveInitBusinessAuditStatus(@RequestParam("businessUid") String businessUid, @RequestParam("businessType") String businessType, @RequestParam("businessAppUid") String businessAppUid);

    /**
     *
     * @Description 获取业务目前所处审核级别状态
     * @param businessType 业务类型
     * @param businessAppUid 业务uid
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/audit/getCurrAuditStage")
    RestResult getCurrAuditStage(@RequestParam("businessType") String businessType, @RequestParam("businessAppUid") String businessAppUid);

    /**
     *
     * @Description 保存业务单级审核结果 并返回审核后所处结果
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/audit/saveBusinessLevelAudit")
    RestResult saveBusinessLevelAudit(@RequestParam("businessUid") String businessUid, @RequestParam("businessType") String businessType, @RequestParam("businessAppUid") String businessAppUid,
                                      @RequestParam("result") String result, @RequestParam("info") String info, @RequestParam("username") String username);

    /**
     *
     * @Description 保存业务单级审核结果 并返回审核后所处结果状态,如果业务中有审核拒绝情况，则重置所有审核记录
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/audit/saveBusinessLevelAuditReject")
    RestResult saveBusinessLevelAuditReject(@RequestParam("businessUid")  String businessUid, @RequestParam("businessType")  String businessType, @RequestParam("businessAppUid") String businessAppUid,
                                            @RequestParam("result")  String result, @RequestParam("info")  String info, @RequestParam("username") String  username);

    /**
     *
     * @Description 删除已有的审核记录
     * @param businessType 业务类型
     * @param businessAppUid 业务uid
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/audit/deleteBusinessLevelAudit")
    RestResult deleteBusinessLevelAudit(@RequestParam("businessType") String businessType, @RequestParam("businessAppUid") String businessAppUid);

    /**
     *
     * @Description 获取业务预约审核各级状态
     * @param businessUid
     * @param businessType 业务类型
     * @param businessAppUid 业务uid
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/audit/getBusinessLevelStatus")
    RestResult getBusinessLevelStatus(@RequestParam("businessUid") String businessUid, @RequestParam("businessType") String businessType, @RequestParam("businessAppUid") String businessAppUid);

    /**
     *
     * @Description 删除审核信息
     * @param businessType 业务类型
     * @param businessAppUid 业务id
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/audit/deleteBusinessAudit")
    RestResult deleteBusinessAudit(@RequestParam("businessType") String businessType, @RequestParam("businessAppUid") String businessAppUid);

    /**
     *
     * @Description 保存业务单级审核结果（拒绝后重来）
     * @param businessUid 业务主体id
     * @param businessType 业务类型
     * @param businessAppUid 业务id
     * @param result 审核结果
     * @param info 审核备注
     * @param username 审核人用户名
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/audit/saveBusinessLevelAuditForRepeatable")
    RestResult saveBusinessLevelAuditForRepeatable(@RequestParam("businessUid") String businessUid, @RequestParam("businessType") String businessType, @RequestParam("businessAppUid") String businessAppUid,
                                                   @RequestParam("result") String result, @RequestParam("info") String info, @RequestParam("username") String username);
    /**
     *
     * @Description 获获取审核通过业务层级状态
     * @param businessType 业务类型
     * @param businessAppUid 业务uid
     * @author SmarkLee
     * @Date 2021/1/21 10:16
     * @return
     **/
    @PostMapping(value = "/audit/getBusinessLevelStatusForPass")
    RestResult getBusinessLevelStatusForPass(@RequestParam("businessType") String businessType, @RequestParam("businessAppUid") String businessAppUid);

    /**
     * @description 获取用户审核过的所有业务id
     * @param
     * @author  Smark Lee
     * @date  2021/10/20
     * @return
     **/
    @GetMapping(value = "/audit/getBusinessUidsByCreateUser")
    Result<List<String>> getBusinessUidsByCreateUser(@RequestParam("createUser")String createUser);
}
