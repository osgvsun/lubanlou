package net.gvsun.gswork.service;

import java.util.Map;

public interface RedisService {
    /****************************************************************************
     * Description:获取redis里的配置
     *
     * @author：黄浩
     * @date：2020年5月20日
     *****************************************************************************/
    public Map<String,Object> getTranscriptConfigFromRedis(Integer siteId);
    /****************************************************************************
     * Description:获取redis里的配置(课程模板配置的子项别名)
     *
     * @author：fubowen
     * @date：2021-3-16
     *****************************************************************************/
    public Map<String,Object> getNameConfigFromRedis();
    /****************************************************************************
     * Description:初始化课程模板配置到redis里
     *
     * @author：fubowen
     * @date：2021-3-15
     *****************************************************************************/
    public void initCourseTemplateConfigToRedis();
}
