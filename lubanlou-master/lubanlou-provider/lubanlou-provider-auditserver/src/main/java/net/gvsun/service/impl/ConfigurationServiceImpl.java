package net.gvsun.service.impl;

import net.gvsun.service.ConfigurationService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


/**
 * 使用前请查看接口详解
 */
@Service("ConfigurationService")

public class ConfigurationServiceImpl implements ConfigurationService {
    @PersistenceContext private EntityManager entityManager;
    /************************************************************************
     *@Description:获取配置项当前状态
     *@Author:吴奇臻
     *@Date:2018/11/20
     ************************************************************************/
    @Override
    public String getBusinessConfigStatus(String projectName,String businessConfigItem){
        String sql="SELECT\n" +
                "\tc.business_config_status\n" +
                "FROM\n" +
                "\tc_message_properties c\n" +
                "WHERE\n" +
                "\tc.project_name = '"+projectName+"'\n" +
                "AND c.business_config_item = '"+businessConfigItem+"'";
        if(entityManager.createNativeQuery(sql).getResultList().size()==0){
            return "no";
        }else {
            String businessConfigItemStat=entityManager.createNativeQuery(sql).getSingleResult().toString();
            return businessConfigItemStat;
        }
    }

    /************************************************************************
     *@Description:获取配置拓展项当前状态
     *@Author:吴奇臻
     *@Date:2018/11/20
     ************************************************************************/
    @Override
    public String getBusinessConfigurationExtend(String projectName, String businessConfigItemExtend){
        String sql="SELECT\n" +
                "\tc.business_config_extend_status\n" +
                "FROM\n" +
                "\tc_message_properties_extend c\n" +
                "WHERE\n" +
                "\tc.project_name = '"+projectName+"'\n" +
                "AND c.business_config_item_extend = '"+businessConfigItemExtend+"'";
        if(entityManager.createNativeQuery(sql).getResultList().size()==0){
            return "no";
        }else {
            String businessConfigItemExtendStat=entityManager.createNativeQuery(sql).getSingleResult().toString();
            return businessConfigItemExtendStat;
        }
    }
}
