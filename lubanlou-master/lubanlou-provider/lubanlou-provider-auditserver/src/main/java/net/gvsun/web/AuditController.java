package net.gvsun.web;

import com.alibaba.fastjson.JSON;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.gvsun.AuditApplication;
import net.gvsun.common.Result;
import net.gvsun.domain.entity.BusinessAuditConfig;
import net.gvsun.domain.repository.BusinessAuditConfigRepository;
import net.gvsun.service.AuditService;
import net.gvsun.service.BusinessAuditLevelStatus;
import net.gvsun.service.BusinessAuditResult;
import net.gvsun.service.RestResult;
import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2018/8/28.
 */
@RestController
@Api(value = "api-AuditController", description = "审核业务模块")
@RequestMapping("/audit")
public class AuditController {
    protected static final Logger logger = LoggerFactory.getLogger(AuditApplication.class);
    private String fail = "fail";
    private String success = "success";
    @Autowired private AuditService auditService;
    @Autowired private BusinessAuditConfigRepository businessAuditConfigRepository;
    /************************************************************************
     *@Description:保存业务审核层级
     *@Author:吴奇臻
     *@Date:2018/9/27
     ************************************************************************/
    @RequestMapping(value = "/saveBusinessAuditConfigLevel",method = RequestMethod.POST)
    @ApiOperation(value = "保存业务审核层级", notes="保存业务审核层级")
    public RestResult saveBusinessAuditConfigLevel(@RequestParam String auditLevelConfig, @RequestParam String businessType){
        RestResult result = new RestResult(success);

        try {
            List<BusinessAuditConfig> businessAuditConfigList=businessAuditConfigRepository.getBusByLevelAndType(businessType);
            if(businessAuditConfigList.size()!=0){
                businessAuditConfigRepository.deleteAll(businessAuditConfigList);
            }
            if(auditLevelConfig != null && !"".equals(auditLevelConfig)&&!"无需审核".equals(auditLevelConfig)) {
                String[] strings = auditLevelConfig.split(",");
                for (int i = 0; i < strings.length; i++) {
                    BusinessAuditConfig businessAuditConfig = new BusinessAuditConfig();
                    businessAuditConfig.setAuthId(strings[i]);
                    businessAuditConfig.setAuditLevel(i + 1);
                    businessAuditConfig.setType(businessType);
                    businessAuditConfigRepository.saveAndFlush(businessAuditConfig);
                }
            }else{

            }
        } catch (Exception e) {
            result.setStatus(fail);
            logger.error("保存"+businessType+"审核层级失败！！！");
            e.printStackTrace();
        }
        return result;
    }
    /************************************************************************
     *@Description:获取审核业务层级
     *@Author:吴奇臻
     *@Date:2018/9/27
     ************************************************************************/
    @ApiOperation(value = "获取审核业务层级", notes="获取审核业务层级")
    @RequestMapping(value = "/getBusinessAuditConfigLevel",method = RequestMethod.POST)
    public RestResult getBusinessAuditConfigLevel(@RequestParam String businessType){
        RestResult result = new RestResult(success);
        try {
            List<BusinessAuditConfig> businessAuditConfigList = businessAuditConfigRepository.getBusByLevelAndType(businessType);
            result.setData(JSON.toJSONString(businessAuditConfigList));
        }catch (Exception e) {
            result.setStatus(fail);
            logger.error("获取"+businessType+"审核层级失败！！！");
            e.printStackTrace();
        }
        return result;
    }
    /************************************************************************
     *@Description:获取审核业务层级前缀
     *@Author:吴奇臻
     *@Date:2018/9/27
     ************************************************************************/
    @ApiOperation(value = "获取审核业务层级前缀", notes="获取审核业务层级前缀")
    @RequestMapping(value = "/getBusinessAuditConfigLevelContaining",method = RequestMethod.POST)
    public RestResult getBusinessAuditConfigLevelContaining(@RequestParam String businessType){
        RestResult result = new RestResult(success);
        try {
            List<BusinessAuditConfig> businessAuditConfigList = businessAuditConfigRepository.getBusByLevelAndTypeContaining(businessType);
            result.setData(JSON.toJSONString(businessAuditConfigList));
        }catch (Exception e) {
            result.setStatus(fail);
            logger.error("获取"+businessType+"审核层级失败！！！");
            e.printStackTrace();
        }
        return result;
    }
    /************************************************************************
     *@Description:保存业务审核流程设置
     *@Author:孙虎
     *@Date:2018/8/28
     ************************************************************************/
    @ApiOperation(value = "保存业务审核流程设置", notes="保存业务审核流程设置")
    @RequestMapping(value = "/saveBusinessAuditConfigs",method = RequestMethod.POST)
    public RestResult saveBusinessAuditConfigs(@RequestParam String businessUid, @RequestParam String config, @RequestParam String businessType){
        RestResult result = new RestResult(success);
        Map<Integer, String> configs = new HashMap<>();
        String[] strings = config.split(",");
        for (int i = 0; i < strings.length; i++) {
            configs.put(i + 1, strings[i]);
        }
        try {
            auditService.saveBusinessAuditConfigs(businessUid,configs,businessType);
        } catch (Exception e) {
            result.setStatus(fail);
            logger.error("保存"+businessType+"审核设置失败！！！");
            e.printStackTrace();
        }
        return result;
    }
    /************************************************************************
     *@Description:获取业务审核流程设置
     *@Author:孙虎
     *@Date:2018/8/28
     ************************************************************************/
    @ApiOperation(value = "获取业务审核流程设置", notes="获取业务审核流程设置")
    @RequestMapping(value = "/getBusinessAuditConfigs",method = RequestMethod.POST)
    public RestResult getBusinessAuditConfigs(@RequestParam(required = false) String businessUid, @RequestParam String businessType){
        RestResult result = new RestResult(success);
        try {
            Map<Integer, String> auditConfigs = auditService.getBusinessAuditConfigs(businessUid, businessType);
            if(auditConfigs.size() == 0){
                result.setStatus(fail);
            }
            result.setData(JSON.toJSONString(auditConfigs));
        } catch (Exception e) {
            result.setStatus(fail);
            logger.error("获取"+businessType+"审核设置失败！！！");
            e.printStackTrace();
        }
        return result;
    }
    /************************************************************************
     *@Description:保存业务预约初始的审核级别状态
     *@Author:孙虎
     *@Date:2018/8/28
     ************************************************************************/
    @ApiOperation(value = "保存业务预约初始的审核级别状态", notes="保存业务预约初始的审核级别状态")
    @RequestMapping(value = "/saveInitBusinessAuditStatus",method = RequestMethod.POST)
    public RestResult saveInitBusinessAuditStatus(@RequestParam String businessUid, @RequestParam String businessType, @RequestParam String businessAppUid){
        RestResult result = new RestResult(success);
        try {
            auditService.saveInitBusinessAuditStatus(businessUid, businessType, businessAppUid);
        } catch (Exception e) {
            result.setStatus(fail);
            logger.error("保存"+businessType+"业务的初始审核状态失败！！！");
            e.printStackTrace();
        }
        return result;
    }
    /************************************************************************
     *@Description:获取业务目前所处审核级别状态
     *@Author:孙虎
     *@Date:2018/8/28
     ************************************************************************/
    @ApiOperation(value = "获取业务目前所处审核级别状态", notes="获取业务目前所处审核级别状态")
    @RequestMapping(value = "/getCurrAuditStage",method = RequestMethod.POST)
    public RestResult getCurrAuditStage(@RequestParam String businessType, @RequestParam String businessAppUid){
        RestResult result = new RestResult(success);
        String[] busAppUids = businessAppUid.split(",");
        List<BusinessAuditResult> auditResults = new ArrayList<>();
        Map<Integer, String> currAuditStage = new HashMap<>();
        for (int i = 0; i < busAppUids.length; i++) {
            BusinessAuditResult businessAuditResult = new BusinessAuditResult();
            try {
                currAuditStage = auditService.getCurrAuditStage(busAppUids[i], businessType);
                if(currAuditStage.size()>0){
                    businessAuditResult.setResult(currAuditStage.entrySet().iterator().next().getValue());
                    businessAuditResult.setLevel(currAuditStage.entrySet().iterator().next().getKey());
                }
            } catch (Exception e) {
                result.setStatus(fail);
                logger.error("获取"+businessType+"业务所处审核级别状态失败！！！");
                e.printStackTrace();
            }
            businessAuditResult.setBusinessAppId(busAppUids[i]);
            auditResults.add(businessAuditResult);
        }
        result.setData(JSON.toJSONString(auditResults));
        return result;
    }
    /************************************************************************
     *@Description:保存业务单级审核结果 并返回审核后所处结果状态
     *@Author:孙虎
     *@Date:2018/8/28
     ************************************************************************/
    @ApiOperation(value = "并返回审核后所处结果状态", notes="并返回审核后所处结果状态")
    @RequestMapping(value = "/saveBusinessLevelAudit",method = RequestMethod.POST)
    public RestResult saveBusinessLevelAudit(@RequestParam String businessUid, @RequestParam String businessType, @RequestParam String businessAppUid,
                                             @RequestParam String result, @RequestParam String info, @RequestParam String username){
        RestResult r = new RestResult(success);
        try {
            Map<Integer, String> levelAudit = auditService.saveBusinessLevelAudit(businessAppUid,businessUid,result,info,businessType,username);
            r.setData(JSON.toJSONString(levelAudit));
        } catch (Exception e) {
            r.setStatus(fail);
            logger.error("保存"+businessType+"业务单级审核失败！！！");
            e.printStackTrace();
        }
        return r;
    }
    /************************************************************************
     *@Description:保存业务单级审核结果 并返回审核后所处结果状态,如果业务中有审核拒绝情况，则重置所有审核记录
     *@Author:吴奇臻
     *@Date:2018/9/21
     ************************************************************************/
    @ApiOperation(value = "并返回审核后所处结果状态", notes="并返回审核后所处结果状态")
    @RequestMapping(value = "/saveBusinessLevelAuditReject",method = RequestMethod.POST)
    public RestResult saveBusinessLevelAuditReject(@RequestParam String businessUid, @RequestParam String businessType, @RequestParam String businessAppUid,
                                             @RequestParam String result, @RequestParam String info, @RequestParam String username){
        RestResult r = new RestResult(success);
        try {
            Map<Integer, String> levelAudit = auditService.saveBusinessLevelAuditReject(businessAppUid,businessUid,result,info,businessType,username);
            r.setData(JSON.toJSONString(levelAudit));
        } catch (Exception e) {
            r.setStatus(fail);
            logger.error("保存"+businessType+"业务单级审核失败！！！");
            e.printStackTrace();
        }
        return r;
    }
    /************************************************************************
     *@Description:删除已有的审核记录
     *@Author:吴奇臻
     *@Date:2018/9/29
     ************************************************************************/
    @ApiOperation(value = "删除已有的审核记录", notes="删除已有的审核记录")
    @RequestMapping(value = "/deleteBusinessLevelAudit",method = RequestMethod.POST)
    public RestResult deleteBusinessLevelAudit(@RequestParam String businessType, @RequestParam String businessAppUid){
        RestResult r = new RestResult(success);
        try {
            String info = auditService.deleteBusinessLevelAudit(businessAppUid,businessType);
            r.setData(JSON.toJSONString(info));
        } catch (Exception e) {
            r.setStatus(fail);
            logger.error("删除"+businessType+"业务单级审核失败！！！");
            e.printStackTrace();
        }
        return r;
    }
    /************************************************************************
     *@Description:获取业务预约审核各级状态
     *@Author:孙虎
     *@Date:2018/8/28
     ************************************************************************/
    @ApiOperation(value = "获取业务预约审核各级状态", notes="获取业务预约审核各级状态")
    @RequestMapping(value = "/getBusinessLevelStatus",method = RequestMethod.POST)
    public RestResult getBusinessLevelStatus(@RequestParam String businessUid, @RequestParam String businessType, @RequestParam String businessAppUid){
        RestResult result = new RestResult(success);
        try {
            List<BusinessAuditLevelStatus> businessLevelStatus = auditService.getBusinessLevelStatus(businessUid,businessAppUid,businessType);
            result.setData(JSON.toJSONString(businessLevelStatus));
        } catch (Exception e) {
            result.setStatus(fail);
            logger.error("获取"+businessType+"业务审核各级状态失败！！！");
            e.printStackTrace();
        }
        return result;
    }

    /************************************************************************
     *@Description:批量获取业务预约审核各级状态
     *@Author:孙虎
     *@Date:2018/8/28
     ************************************************************************/
    @ApiOperation(value = "获取业务预约审核各级状态", notes="获取业务预约审核各级状态")
    @RequestMapping(value = "/getBatchBusinessLevelStatus",method = RequestMethod.POST)
    public RestResult getBatchBusinessLevelStatus(@RequestParam String businessUid, @RequestParam String businessType, @RequestParam String businessAppUid){
        RestResult result = new RestResult(success);
        String[] busAppUids = businessAppUid.split(",");
        try {
            for (int i = 0; i < busAppUids.length; i++) {
                BusinessAuditResult businessAuditResult = new BusinessAuditResult();
                List<BusinessAuditLevelStatus> businessLevelStatus = auditService.getBusinessLevelStatus(businessUid,busAppUids[i],businessType);
                businessAuditResult.setBusinessAppId(busAppUids[i]);
                businessAuditResult.setBusinessAuditLevelStatusList(businessLevelStatus);
                result.setData(JSON.toJSONString(businessAuditResult));
            }
        } catch (Exception e) {
            result.setStatus(fail);
            logger.error("获取"+businessType+"业务审核各级状态失败！！！");
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 删除审核信息
     * @param businessType 业务类型
     * @param businessAppUid 业务id
     * @author 黄保钱 2019-1-8
     */
    @ApiOperation(value = "删除审核信息", notes="删除审核信息")
    @RequestMapping(value = "/deleteBusinessAudit",method = RequestMethod.POST)
    public RestResult getBusinessLevelStatus(@RequestParam String businessType, @RequestParam String businessAppUid){
        RestResult result = new RestResult(success);
        try {
            auditService.deleteAuditInfo(businessType, businessAppUid);
            result.setData(null);
        }catch (Exception e){
            result.setStatus(fail);
            logger.error("删除"+businessAppUid+"业务审核失败！！！");
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 保存业务单级审核结果（拒绝后重来）
     * @param businessUid 业务主体id
     * @param businessType 业务类型
     * @param businessAppUid 业务id
     * @param result 审核结果
     * @param info 审核备注
     * @param username 审核人用户名
     * @return 下一级审核信息
     * @author 黄保钱 2019-3-15
     */
    @ApiOperation(value = "保存业务单级审核结果（拒绝后重来）并返回下一级审核信息", notes="保存业务单级审核结果（拒绝后重来）并返回下一级审核信息")
    @RequestMapping(value = "/saveBusinessLevelAuditForRepeatable",method = RequestMethod.POST)
    public RestResult saveBusinessLevelAuditForRepeatable(@RequestParam String businessUid, @RequestParam String businessType, @RequestParam String businessAppUid,
                                                          @RequestParam String result, @RequestParam String info, @RequestParam String username){
        RestResult r = new RestResult(success);
        try {
            Map<Integer, String> levelAudit = auditService.saveBusinessLevelAuditForRepeatable(businessAppUid,businessUid,result,info,businessType,username);
            r.setData(JSON.toJSONString(levelAudit));
        } catch (Exception e) {
            r.setStatus(fail);
            logger.error("保存"+businessType+"业务单级审核失败！！！");
            e.printStackTrace();
        }
        return r;
    }
    /************************************************************************
     *@Description:获获取审核通过业务层级状态
     *@Author:吴奇臻
     *@Date:2019/5/24
     ************************************************************************/
    @ApiOperation(value = "获取审核通过业务层级状态", notes="获取审核通过业务层级状态")
    @RequestMapping(value = "/getBusinessLevelStatusForPass",method = RequestMethod.POST)
    public RestResult getBusinessLevelStatusForPass(@RequestParam String businessType, @RequestParam String businessAppUid){
        RestResult result = new RestResult(success);
        try {
            List<BusinessAuditLevelStatus> businessLevelStatus = auditService.getBusinessLevelStatusForPass(businessAppUid,businessType);
            result.setData(JSON.toJSONString(businessLevelStatus));
        } catch (Exception e) {
            result.setStatus(fail);
            logger.error("获取"+businessType+"业务审核各级状态失败！！！");
            e.printStackTrace();
        }
        return result;
    }

    /**
     * @description 获取用户审核过的所有业务id
     * @param
     * @author  Smark Lee
     * @date  2021/10/20
     * @return
     **/
    @GetMapping("/getBusinessUidsByCreateUser")
    public Result<List<String>> getBusinessUidsByCreateUser(@RequestParam("createUser")String createUser){
        return Result.ok(auditService.getBusinessUidsByCreateUser(createUser));
    }

    /**
     * @description 获取用户审核过的所有业务id
     * @param
     * @author  Smark Lee
     * @date  2021/10/20
     * @return
     **/
    @GetMapping("/test")
    public Result test(){
        return Result.ok("ko");
    }
}
