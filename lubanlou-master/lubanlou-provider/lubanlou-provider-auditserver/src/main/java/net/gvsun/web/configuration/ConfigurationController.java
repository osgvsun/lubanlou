package net.gvsun.web.configuration;

import com.alibaba.fastjson.JSON;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.gvsun.AuditApplication;
import net.gvsun.domain.entity.CMessagePropertiesExtend;
import net.gvsun.domain.repository.CMessagePropertiesExtendRepository;
import net.gvsun.service.ConfigurationService;
import net.gvsun.service.configuration.RestResult;
import net.gvsun.domain.entity.CMessageProperties;
import net.gvsun.domain.repository.CMessagePropertiesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Administrator on 2018/11/21.
 */
@RestController
@Api(value = "api-ConfigurationController", description = "审核业务设置模块")
@RequestMapping("/configuration")
public class ConfigurationController {
    protected static final Logger logger = LoggerFactory.getLogger(AuditApplication.class);
    private String fail = "fail";
    private String success = "success";
    @Autowired private ConfigurationService configurationService;
    @Autowired private CMessagePropertiesRepository cMessagePropertiesRepository;
    @Autowired private CMessagePropertiesExtendRepository cMessagePropertiesExtendRepository;
    /************************************************************************
     *@Description:获取业务配置项信息
     *@Author:吴奇臻
     *@Date:2018/11/20
     ************************************************************************/
    @ApiOperation(value = "获取业务配置项信息", notes="获取业务配置项信息")
    @RequestMapping(value = "/getBusinessConfiguration",method = RequestMethod.POST)
    public RestResult getBusinessConfiguration(@RequestParam String projectName, @RequestParam String businessConfigItem){
        RestResult result = new RestResult(success);
        try {
            String businessConfigStatus = configurationService.getBusinessConfigStatus(projectName, businessConfigItem);
            if(businessConfigStatus == null){
                result.setStatus(fail);
            }
            result.setData(JSON.toJSONString(businessConfigStatus));
        } catch (Exception e) {
            result.setStatus(fail);
            logger.error("获取"+businessConfigItem+"配置信息失败！！！");
            e.printStackTrace();
        }
        return result;
    }

    /************************************************************************
     *@Description:获取业务配置项信息拓展
     *@Author:吴奇臻
     *@Date:2018/11/20
     ************************************************************************/
    @ApiOperation(value = "获取业务配置项信息拓展", notes="获取业务配置项信息拓展")
    @RequestMapping(value = "/getBusinessConfigurationExtend",method = RequestMethod.POST)
    public RestResult getBusinessConfigurationExtend(@RequestParam String projectName, @RequestParam String businessConfigItemExtend){
        RestResult result = new RestResult(success);
        try {
            String businessConfigStatus = configurationService.getBusinessConfigurationExtend(projectName, businessConfigItemExtend);
            if(businessConfigStatus == null){
                result.setStatus(fail);
            }
            result.setData(JSON.toJSONString(businessConfigStatus));
        } catch (Exception e) {
            result.setStatus(fail);
            logger.error("获取"+businessConfigItemExtend+"配置信息失败！！！");
            e.printStackTrace();
        }
        return result;
    }

    /************************************************************************
     *@Description:获取项目配置项状态
     *@Author:吴奇臻
     *@Date:2018/11/20
     ************************************************************************/
    @ApiOperation(value = "获取项目配置项状态", notes="获取项目配置项状态")
    @RequestMapping(value = "/getBusinessConfigurationList",method = RequestMethod.POST)
    public RestResult getBusinessConfigurationList(@RequestParam String projectName){
        RestResult result = new RestResult(success);
        try {
            List<CMessageProperties> businessConfigList = cMessagePropertiesRepository.getCMessagePropertiesByProjectName(projectName);
            if(businessConfigList == null){
                result.setStatus(fail);
            }
            result.setData(JSON.toJSONString(businessConfigList));
        } catch (Exception e) {
            result.setStatus(fail);
            logger.error("获取"+projectName+"配置信息失败！！！");
            e.printStackTrace();
        }
        return result;
    }
    /************************************************************************
     *@Description:更改项目配置项状态
     *@Author:吴奇臻
     *@Date:2018/11/20
     ************************************************************************/
    @ApiOperation(value = "更改项目配置项状态", notes="更改项目配置项状态")
    @RequestMapping(value = "/setBusinessConfigurationStat",method = RequestMethod.POST)
    public RestResult setBusinessConfigurationStat(@RequestParam String id,@RequestParam String status) {
        RestResult result = new RestResult(success);
        try {
            CMessageProperties businessConfiguration = cMessagePropertiesRepository.getCMessagePropertiesById(Integer.parseInt(id));
            if (businessConfiguration == null) {
                result.setStatus(fail);
            }
            businessConfiguration.setBusinessConfigStatus(status);
            cMessagePropertiesRepository.saveAndFlush(businessConfiguration);
        } catch (Exception e) {
            result.setStatus(fail);
            logger.error("更改" + id + "配置信息失败！！！");
            e.printStackTrace();
        }
        return result;
    }

    /************************************************************************
     *@Description:获取项目配置扩展项
     *@Author:伍菁
     *@Date:2018/12/18
     ************************************************************************/
    @ApiOperation(value = "获取项目配置扩展项", notes="获取项目配置扩展项")
    @RequestMapping(value = "/getConfigurationExtensions",method = RequestMethod.POST)
    public RestResult getConfigurationExtensions(@RequestParam String id){
        RestResult result = new RestResult(success);
        CMessageProperties businessConfiguration = cMessagePropertiesRepository.getCMessagePropertiesById(Integer.parseInt(id));
        String projectName = businessConfiguration.getProjectName();
        String BusinessConfigItem  = businessConfiguration.getBusinessConfigItem();
        try {
            List<CMessagePropertiesExtend> configurationExtensionList = cMessagePropertiesExtendRepository.getPropertiesExtendByPNameAndBConfigItem(projectName,BusinessConfigItem);
            if(configurationExtensionList == null){
                result.setStatus(fail);
            }
            result.setData(JSON.toJSONString(configurationExtensionList));
        } catch (Exception e) {
            result.setStatus(fail);
            logger.error("获取"+BusinessConfigItem+"配置扩展项信息失败！！！");
            e.printStackTrace();
        }
        return result;
    }

    /************************************************************************
     *@Description:更改项目配置扩展项状态
     *@Author:伍菁
     *@Date:2018/12/20
     ************************************************************************/
    @ApiOperation(value = "更改项目配置扩展项状态", notes="更改项目配置扩展项状态")
    @RequestMapping(value = "/setBusinessConfigurationExtendStat",method = RequestMethod.POST)
    public RestResult setBusinessConfigurationExtendStat(@RequestParam String id,@RequestParam String status) {
        RestResult result = new RestResult(success);
        try {
            CMessagePropertiesExtend businessConfigurationExtend = cMessagePropertiesExtendRepository .getCMessagePropertiesExtendById(Integer.parseInt(id));
            if (businessConfigurationExtend == null) {
                result.setStatus(fail);
            }
            businessConfigurationExtend.setBusinessConfigExtendStatus(status);
            cMessagePropertiesExtendRepository.saveAndFlush(businessConfigurationExtend);
        } catch (Exception e) {
            result.setStatus(fail);
            logger.error("更改" + id + "配置扩展信息失败！！！");
            e.printStackTrace();
        }
        return result;
    }
    /************************************************************************
     *@Description:删除项目配置项纪录
     *@Author:伍菁
     *@Date:2019/1/10
     ************************************************************************/
    @ApiOperation(value = "删除项目配置项纪录", notes="删除项目配置项纪录")
    @RequestMapping(value = "/deleteBusinessConfigurationRecord",method = RequestMethod.POST)
    public RestResult deleteBusinessConfigurationRecord(@RequestParam String id) {
        RestResult result = new RestResult(success);
        try {
            Integer intId = Integer.valueOf(id);
            //找到配置项
            CMessageProperties cMessagePropertie = cMessagePropertiesRepository.getCMessagePropertiesById(intId);
            String projectName = cMessagePropertie.getProjectName();
            String businessConfigItem = cMessagePropertie.getBusinessConfigItem();
            //找到配置项拓展
            List<CMessagePropertiesExtend> cMessagePropertiesExtendList = cMessagePropertiesExtendRepository.getPropertiesExtendByPNameAndBConfigItem(projectName,businessConfigItem);
            if(cMessagePropertie==null){
                result.setStatus(fail);
            }
            //删除配置项拓展
            if (cMessagePropertiesExtendList.size()!=0){
                for (CMessagePropertiesExtend e : cMessagePropertiesExtendList){
                    cMessagePropertiesExtendRepository.delete(e);
                }
            }
            //删除配置项
            cMessagePropertiesRepository.delete(cMessagePropertie);
        } catch (Exception e) {
            result.setStatus(fail);
            logger.error("删除" + id + "配置项记录失败！！！");
            e.printStackTrace();
        }
        return result;
    }
    /************************************************************************
     *@Description:删除项目配置拓展项纪录
     *@Author:伍菁
     *@Date:2019/1/10
     ************************************************************************/
    @ApiOperation(value = "删除项目配置拓展项纪录", notes="删除项目配置拓展项纪录")
    @RequestMapping(value="/deleteBusinessConfigExtensionRecord",method = RequestMethod.POST)
    public RestResult deleteBusinessConfigExtensionRecord(@RequestParam String id){
        RestResult result = new RestResult(success);
        try {
            Integer intId = Integer.valueOf(id);
            //找到配置项拓展
            CMessagePropertiesExtend cMessagePropertiesExtend = cMessagePropertiesExtendRepository.getCMessagePropertiesExtendById(intId);
            if(cMessagePropertiesExtend==null){
                result.setStatus(fail);
            }
            //删除配置项拓展
            cMessagePropertiesExtendRepository.delete(cMessagePropertiesExtend);
        }catch (Exception e){
            result.setStatus(fail);
            logger.error("删除"+id+"配置项拓展失败！！！");
            e.printStackTrace();
        }
        return result;
    }
}
