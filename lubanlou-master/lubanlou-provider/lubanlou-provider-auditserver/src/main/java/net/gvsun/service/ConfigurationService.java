package net.gvsun.service;

/**
 *
 */

public interface ConfigurationService {
    /************************************************************************
     *@Description:获取配置项当前状态
     *@Author:吴奇臻
     *@Date:2018/11/20
     ************************************************************************/
    String getBusinessConfigStatus(String projectName, String businessConfigItem);

    /************************************************************************
     *@Description:获取配置拓展项当前状态
     *@Author:吴奇臻
     *@Date:2018/12/24
     ************************************************************************/
    String getBusinessConfigurationExtend(String projectName, String businessConfigItemExtend);
}
