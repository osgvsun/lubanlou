package net.gvsun.gswork.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.gswork.redis.TeachConfigRedisHashService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class RedisServiceImpl implements RedisService {
    @Autowired
    private TeachConfigRedisHashService teachConfigRedisHashService;
    @Autowired
    private ClientDatabaseContext clientDatabaseContext;
    /****************************************************************************
     * Description:获取redis里的配置
     *
     * @author：黄浩
     * @date：2020年5月20日
     *****************************************************************************/
    @Override
    public Map<String, Object> getTranscriptConfigFromRedis(Integer siteId) {
        Map<String, Object> configMap = new HashMap<>();
        try {
            Object config = teachConfigRedisHashService.get(clientDatabaseContext.getCurrentDataSourceDto().getSchoolName() + "-" + siteId);
            //为空则初始化配置设置为全开放
            if (config == null) {
                String[] typeArr = new String[]{"allassignment", "allexam", "alltest", "allattendance", "allgroup", "allbehavior", "allexpwork", "allexpreport", "allexptest", "allexpdata", "allexpattendance", "allexperiencework"};
                for (int i = 0; i < typeArr.length; i++) {
                    configMap.put(typeArr[i], 1);
                }
                JSONObject json = JSONObject.parseObject(JSON.toJSONString(configMap));
                String jsonStr = JSONObject.toJSONString(json);
                teachConfigRedisHashService.put(clientDatabaseContext.getCurrentDataSourceDto().getSchoolName() + "-" + siteId, jsonStr);
            } else {
                configMap = JSONObject.parseObject((String) config);
                //体验作业配置不存在则新增
                if(!configMap.containsKey("allexperiencework")){
                    configMap.put("allexperiencework", 1);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return configMap;
    }
    @Override
    public Map<String, Object> getNameConfigFromRedis() {
        Map<String,Object> map = new HashMap<>();
        Object o = teachConfigRedisHashService.get(clientDatabaseContext.getCurrentDataSourceDto().getSchoolName() + "-name");
        map = JSONObject.parseObject((String)o);
        return map;
    }
    @Override
    public void initCourseTemplateConfigToRedis() {
        System.out.println("调用initCourseTemplateConfigToRedis方法");
        String datasource = clientDatabaseContext.getCurrentDataSourceDto().getSchoolName();
        Map<String, Object> configMap = new HashMap<>();
        Map<String, Object> configMap1 = new HashMap<>();
        String[] typeList = {"assignment", "exam", "test", "attendance", "group", "behavior", "expwork", "expreport", "exptest", "expdata", "expattendance", "practice",
                "wordCloud","knSpace","remoteExp","skSpace","crSpace","notice","timetable","resourceContainer","resourceManagement","onlineAtlas","courseCopy","manageExam","manageTest","experiencework","knowledge","skill","experience","expResource","expRole"};
        String[] nameList = {"作业","考试","测试","考勤","学习小组","学习行为","实验作业","实验报告","实验测试","实验数据","考勤","练习","课程词云","空间","远程实验","空间","空间","通知公告","课表","资源容器","资源管理","在线图谱","课程复制","考试","测试","体验作业","知识","技能","体验","章节资源","小组角色"};
        for (int i=0;i<typeList.length;i++){
            configMap.put("all"+typeList[i],nameList[i]);
            configMap1.put("all"+typeList[i],1);
        }
        JSONObject json = JSONObject.parseObject(JSON.toJSONString(configMap));
        String jsonStr = JSONObject.toJSONString(json);
        JSONObject json1 = JSONObject.parseObject(JSON.toJSONString(configMap1));
        String jsonStr1 = JSONObject.toJSONString(json1);
        teachConfigRedisHashService.put(datasource+"-name",jsonStr);
        System.out.println("向"+datasource+"数据源里写数据，数据为:"+jsonStr);
        teachConfigRedisHashService.put(datasource+"-display",jsonStr1);
        System.out.println("向"+datasource+"数据源里写数据，数据为:"+jsonStr1);
    }
}
