package net.gvsun.service;

import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import net.gvsun.auditserver.external.AuditEntityVO;
import net.gvsun.auditserver.external.AuditTypeEnum;
import net.gvsun.auditserver.external.AuditVO;
import net.gvsun.common.EntityTypeEnum;
import net.gvsun.domain.entity.BusinessAuditConfig;
import net.gvsun.domain.entity.BusinessAuditLevelResult;
import net.gvsun.domain.entity.BusinessAuditStatus;
import net.gvsun.domain.entity.audit.AuditConfig;
import net.gvsun.domain.entity.audit.AuditEntity;
import net.gvsun.domain.repository.BusinessAuditConfigRepository;
import net.gvsun.domain.repository.BusinessAuditLevelResultRepository;
import net.gvsun.domain.repository.BusinessAuditStatusRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.validation.constraints.NotNull;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 使用前请查看接口详解
 */
@Service("auditService")
public class AuditServiceImpl implements AuditService {
    @PersistenceContext private EntityManager entityManager;
    @Autowired private BusinessAuditConfigRepository businessAuditConfigRepository;
    @Autowired private BusinessAuditStatusRepository businessAuditStatusRepository;
    @Autowired private BusinessAuditLevelResultRepository businessAuditLevelResultRepository;
    @Autowired private IAuditEntityService auditEntityService;
    @Autowired private IAuditConfigService auditConfigService;


    /************************************************************************
     *@Description:保存业务预约初始的审核级别状态
     *@Author:孙虎
     *@return:业务预约所属初始审核级别：-1代表不需要审核或者所有审核级都关闭
     *@Date:2018/8/16
     ************************************************************************/
    @Transactional
    @Override
    public int saveInitBusinessAuditStatus(String businessUid, String businessType, String businessAppUid) throws Exception{
        //是否已有该预约的状态
        List<BusinessAuditStatus> status = businessAuditStatusRepository.findBypAppUidAndType(businessAppUid, businessType);
        if(status.size() != 0){
            throw new RuntimeException("已存在id为" + businessAppUid + "的" + businessType + "业务预约状态");
        }
        //判断是否在数据库配置业务的审核流程
        isHaveAuditConfigForType(businessType);
        //初始所属审核级别
        int initStage = BUSINESSINITSTATUS_PASS;
        String sql = "SELECT MIN(bac.audit_level) FROM business_audit_config_relate bacr\n" +
                "INNER JOIN business_audit_config bac ON bac.uid = bacr.audit_config_id AND bacr.type = '" + businessType + "'" +
                "\nWHERE bacr.business_id = '" + businessUid + "'";
        Object initStatus = entityManager.createNativeQuery(sql).getSingleResult();
        if(initStatus!=null){//有审核过程
            initStage = Integer.valueOf(initStatus.toString());
        }
        //保存初始审核状态
        BusinessAuditStatus businessAuditStatus = new BusinessAuditStatus();
        businessAuditStatus.setAuditStage(initStage);
        businessAuditStatus.setBusinessAppId(businessAppUid);
        businessAuditStatus.setType(businessType);
        if(initStage==BUSINESSINITSTATUS_PASS){
            businessAuditStatus.setResult(BUSINESSAPPRESULT_PASS);
        }else {
            businessAuditStatus.setResult(BUSINESSAPPRESULT_AUDITING);
        }
        businessAuditStatusRepository.saveAndFlush(businessAuditStatus);
        return initStage;
    }
    /************************************************************************
     *@Description:获取业务目前所处审核级别状态
     *@Author:孙虎
     *@return:map: key:所处审核级别，-1代表审核全部通过 0 代表审核被某级拒绝 预约已失败 value：审核级别名称
     *@Date:2018/8/17
     ************************************************************************/
    @Override
    public Map<Integer, String> getCurrAuditStage(String pAppUid, String businessType) throws Exception{
        //判断是否在数据库配置业务的审核流程
        isHaveAuditConfigForType(businessType);
        Map<Integer, String> map = new HashMap<>();
        String sql = "SELECT\n" +
                "bas.audit_stage,\n" +
                "bac.auth_id\n" +
                "FROM\n" +
                "business_audit_status bas\n" +
                "LEFT JOIN business_audit_config bac ON bac.audit_level = bas.audit_stage AND bac.type = '"+businessType+"'" +
                "WHERE bas.business_app_id = '"+pAppUid+"' AND bas.type = '"+businessType+"'";
        List result = entityManager.createNativeQuery(sql).getResultList();;

        if (result.size()==0) {
            return map;
        }
        Object[] objects = (Object[]) result.get(0);
        if(objects[1] == null){
            int level = Integer.valueOf(objects[0].toString());
            if(level==BUSINESSINITSTATUS_PASS){
                map.put(BUSINESSINITSTATUS_PASS, BUSINESSAPPRESULT_PASS);
            }else {
                map.put(BUSINESSINITSTATUS_FAIL, BUSINESSAPPRESULT_FAIL);
            }
        }else {
            map.put(Integer.valueOf(objects[0].toString()), objects[1].toString());
        }
        return map;
    }
    /************************************************************************
     *@Description:保存业务单级审核结果 并返回审核后结果
     *@Author:孙虎
     *@return:map: key:所处审核级别，-1代表审核全部通过 0 代表审核被某级拒绝 预约已失败 value：审核级别名称
     *@Date:2018/8/17
     ************************************************************************/
    @Transactional
    @Override
    public Map<Integer, String> saveBusinessLevelAudit(String businessAppUid,String businessUid, String result, String info, String businessType,String username) throws Exception{
        //判断是否在数据库配置业务的审核流程
        isHaveAuditConfigForType(businessType);
        //是否已有该预约的状态
        List<BusinessAuditStatus> status = businessAuditStatusRepository.findBypAppUidAndType(businessAppUid, businessType);
        if(status.size() != 1){
            throw new RuntimeException("不存在id为" + businessAppUid + "的" + businessType + "业务预约状态");
        }
        //当前的所属审核级别
        Map<Integer, String> currAuditStage = getCurrAuditStage(businessAppUid, businessType);
        //当前级别
        Integer currStage = currAuditStage.entrySet().iterator().next().getKey();
        String currStageLevelName=currAuditStage.entrySet().iterator().next().getValue();
        //审核已通过或已拒绝不再保存
        if (currStage != BUSINESSINITSTATUS_PASS && currStage != BUSINESSINITSTATUS_FAIL) {
            //该预约业务对应的审核状态数据
            BusinessAuditStatus businessAuditStatus = businessAuditStatusRepository.findBypAppUidAndType(businessAppUid,businessType).get(0);
            if(result.equals(BUSINESSAPPRESULT_FAIL)){//单级审核拒绝
                businessAuditStatus.setResult(result);
                businessAuditStatus.setAuditStage(BUSINESSINITSTATUS_FAIL);
            }else{//单级审核通过
                //最终审核级别
                int finalStage = getFinalAuditStage(businessUid,businessType);
                //是否是最后一级审核
                if(currAuditStage.containsKey(finalStage)){
                    //最后一级审核通过
                   businessAuditStatus.setResult(result);
                   businessAuditStatus.setAuditStage(BUSINESSINITSTATUS_PASS);
                }else {//非最后一级审核通过
                    //获取下一级的审核级别
                    int nextStage = getNextAuditStage(businessUid,businessType,currStage);
                    businessAuditStatus.setAuditStage(nextStage);
                }
            }
            //保存预约业务的审核状态
            businessAuditStatus = businessAuditStatusRepository.saveAndFlush(businessAuditStatus);
            saveSingleBusinessLevelAudit(businessAuditStatus.getUid(),result,info,currStage,username,currStageLevelName);
        }else {
            throw new RuntimeException("id为" + businessAppUid + "的" + businessType + "业务流程已完成");
        }
        return getCurrAuditStage(businessAppUid, businessType);
    }
    /************************************************************************
     *@Description:保存业务单级审核结果 并返回审核后结果(如果有拒绝情况，则清空之前审核记录）
     *@Author:吴奇臻
     *@return:map: key:所处审核级别，-1代表审核全部通过 0 代表审核被某级拒绝 预约已失败 value：审核级别名称
     *@Date:2018/9/21
     ************************************************************************/
    @Transactional
    @Override
    public Map<Integer,String> saveBusinessLevelAuditReject(String businessAppUid, String businessUid, String result, String info, String businessType, String username)throws Exception{
        //判断是否在数据库配置业务的审核流程
        isHaveAuditConfigForType(businessType);
        //是否已有该预约的状态
        List<BusinessAuditStatus> status = businessAuditStatusRepository.findBypAppUidAndType(businessAppUid, businessType);
        if(status.size() != 1){
            throw new RuntimeException("不存在id为" + businessAppUid + "的" + businessType + "业务预约状态");
        }
        //当前的所属审核级别
        Map<Integer, String> currAuditStage = getCurrAuditStage(businessAppUid, businessType);
        //当前级别
        Integer currStage = currAuditStage.entrySet().iterator().next().getKey();
        String currStageLevelName=currAuditStage.entrySet().iterator().next().getValue();
        //审核已通过或已拒绝不再保存
        if (currStage != BUSINESSINITSTATUS_PASS && currStage != BUSINESSINITSTATUS_FAIL) {
            //该预约业务对应的审核状态数据
            BusinessAuditStatus businessAuditStatus = businessAuditStatusRepository.findBypAppUidAndType(businessAppUid,businessType).get(0);
            if(result.equals(BUSINESSAPPRESULT_FAIL)){//单级审核拒绝，重置所有审核记录，返回未审核状态
                //删除审核记录
                List<BusinessAuditLevelResult> businessAuditLevelResult=businessAuditLevelResultRepository.getBusinessAuditLevelResultByStatusId(businessAuditStatus.getUid());
                businessAuditLevelResultRepository.deleteAll(businessAuditLevelResult);
                businessAuditStatusRepository.delete(businessAuditStatus);

            }else{//单级审核通过
                //最终审核级别
                int finalStage = getFinalAuditStage(businessUid,businessType);
                //是否是最后一级审核
                if(currAuditStage.containsKey(finalStage)){
                    //最后一级审核通过
                    businessAuditStatus.setResult(result);
                    businessAuditStatus.setAuditStage(BUSINESSINITSTATUS_PASS);
                }else {//非最后一级审核通过
                    //获取下一级的审核级别
                    int nextStage = getNextAuditStage(businessUid,businessType,currStage);
                    businessAuditStatus.setAuditStage(nextStage);
                }
                //保存预约业务的审核状态
                businessAuditStatus = businessAuditStatusRepository.saveAndFlush(businessAuditStatus);
                saveSingleBusinessLevelAudit(businessAuditStatus.getUid(),result,info,currStage,username,currStageLevelName);
            }

        }else {
            throw new RuntimeException("id为" + businessAppUid + "的" + businessType + "业务流程已完成");
        }
        if(result.equals("fail")){
            return null;
        }else {
            return getCurrAuditStage(businessAppUid, businessType);
        }
    }
    /************************************************************************
     *@Description:获取业务预约的各级审核状态
     *@Author:孙虎，吴奇臻
     *@Date:2018/8/20，2019/5/24
     ************************************************************************/
    @Override
    public List<BusinessAuditLevelStatus>   getBusinessLevelStatus(String businessUid, String businessAppUid,String businessType) throws Exception{
        String sql = "SELECT\n" +
                "bas.business_app_id,\n" +
                "bac.audit_level,\n" +
                "balr.result,\n" +
//                "CASE balr.result\n" +
//                "WHEN '"+BUSINESSAPPRESULT_PASS+"' THEN '审核通过'\n" +
//                "WHEN '"+BUSINESSAPPRESULT_FAIL+"' THEN '审核拒绝'\n" +
//                "ELSE '未审核' END AS result,\n" +
                "balr.create_user AS audit_user,\n" +
                "bac.auth_id,\n"+
                "balr.info,\n"+
                "balr.create_time\n"+
                "FROM business_audit_config_relate bacr\n" +
                "INNER JOIN business_audit_config bac ON bac.uid = bacr.audit_config_id and bac.type = bacr.type\n" +
                "INNER JOIN business_audit_status bas ON bas.business_app_id='"+businessAppUid+"' and bas.type = bacr.type\n" +
                "LEFT JOIN business_audit_level_result balr ON balr.status_id = bas.uid AND balr.audit_level = bac.audit_level\n" +
                "WHERE bacr.business_id = '"+businessUid+"'\n" +
                "AND bacr.type='"+businessType+"'\n" +
                "ORDER BY bac.audit_level";
        List<Object[]> list = entityManager.createNativeQuery(sql).getResultList();
        List<BusinessAuditLevelStatus> levelStatuses = new ArrayList<>();
        for (Object[] objects:list) {
            BusinessAuditLevelStatus status = new BusinessAuditLevelStatus();
            status.setBusinessAppId(objects[0].toString());
            status.setLevel(Integer.valueOf(objects[1].toString()));
            if(objects[2]!=null){
                if (objects[2].toString().equals(BUSINESSAPPRESULT_PASS)) {
                    status.setResult("审核通过");
                }else {
                    status.setResult("审核拒绝");
                }
            }else {
                status.setResult("未审核");
            }
            if(objects[3] != null){
                status.setAuditUser(objects[3].toString());
            }
            status.setAuthName(objects[4].toString());
            if(objects[5] != null){
                status.setInfo(objects[5].toString());
            }
            if(objects[6] != null){
                status.setCreateTime(objects[6].toString());
            }
            levelStatuses.add(status);
        }
        return levelStatuses;
    }
    /************************************************************************
     *@Description:获取业务预约审核设置状态
     *@Author:孙虎
     *@return:Map<Integer,String>:key代表级别value值有两种 on:开启 off:关闭
     *@Date:2018/8/21
     ************************************************************************/
    @Override
    public Map<Integer, String> getBusinessAuditConfigs(String businessUid, String businessType) throws Exception{
        String sql = "SELECT\n" +
                "bac.audit_level,\n" +
                "bac.auth_id,\n" +
                "bacr.business_id\n" +
                "FROM\n" +
                "business_audit_config bac\n" +
                "LEFT JOIN business_audit_config_relate bacr ON bacr.audit_config_id = bac.uid AND bacr.business_id = '"+businessUid+"'\n" +
                "WHERE bac.type='"+businessType+"'\n" +
                "ORDER BY bac.audit_level";
        List<Object[]> list = entityManager.createNativeQuery(sql).getResultList();
        Map<Integer, String> map = new HashMap<>();
        for (Object[] o:list) {
            String status = BUSINESSCONFIG_OFF;
            if(o[2] != null){
                status = BUSINESSCONFIG_ON;
            }
            map.put(Integer.valueOf(o[0].toString()), o[1].toString() + ":" + status);
        }
        return map;
    }
    /************************************************************************
     *@Description:保存业务的审核设置
     *@Author:孙虎
     *@param:config:Map<Integer,String>:key代表级别value值有两种 on:开启 off:关闭
     *@Date:2018/8/22
     ************************************************************************/
    @Transactional
    @Override
    public void saveBusinessAuditConfigs(String businessUid, Map<Integer, String> configs, String businessType) throws Exception {
        //删除修改审核层级后所出现的垃圾数据
        String s="DELETE FROM\n" +
                "business_audit_config_relate\n" +
                "where type='" + businessType + "' and business_id='" + businessUid + "'";
        entityManager.createNativeQuery(s).executeUpdate();
        //判断是否在数据库配置业务的审核流程
        isHaveAuditConfigForType(businessType);
        Map<Integer, String> auditConfigs = getBusinessAuditConfigs(businessUid, businessType);
        //判断传入的设置参数是否正确
        if(auditConfigs.size() == configs.size()){
            for (Map.Entry<Integer, String> entry : auditConfigs.entrySet()) {
                //判断要保存的审核级别是否对应
                if(!configs.containsKey(entry.getKey())){
                    throw new RuntimeException("未包含第"+entry.getKey()+"的审核设置数据！！！");
                }else {//保存每一级的审核设置
                    if(configs.get(entry.getKey()).equals(BUSINESSCONFIG_OFF)){//关闭该级审核
                        //删除多对多表数据
                        String sql = "delete from business_audit_config_relate\n" +
                                "WHERE type = '" + businessType + "' AND audit_config_id = (\n" +
                                "SELECT bac.uid FROM business_audit_config bac WHERE bac.audit_level = " + entry.getKey() + " AND bac.type = '" + businessType + "')\n" +
                                "AND business_id = '" + businessUid + "'";
                        entityManager.createNativeQuery(sql).executeUpdate();
                    }else if (configs.get(entry.getKey()).equals(BUSINESSCONFIG_ON)){//开启该级审核
                        BusinessAuditConfig config = businessAuditConfigRepository.getBusByLevelAndType(entry.getKey(),businessType);
                        //判断是否已开启该级审核
                        String sql =  "select * from business_audit_config_relate\n" +
                                "WHERE type = '" + businessType + "' AND audit_config_id =" +config.getUid()+
                                " AND business_id = '" + businessUid + "'";
                        List list = entityManager.createNativeQuery(sql).getResultList();
                        if(list.size() == 0){//未开启该级审核
                            String insertSql = "INSERT INTO business_audit_config_relate (business_id,audit_config_id,type) VALUES('"+businessUid+"'," + "'"+config.getUid()+"'," + "'"+businessType+"')";
                            entityManager.createNativeQuery(insertSql).executeUpdate();
                        }
                    }else {
                        throw new RuntimeException(entry.getValue()+"为非法值！！！");
                    }
                }
            }
        }else {
            throw new RuntimeException("需保存的审核级数与"+businessType+"的业务设置级数不对应！！！");
        }
    }
    /************************************************************************
     *@Description:判断是否配置业务的审核流程(无则抛异常)
     *@Author:孙虎
     *@Date:2018/8/22
     ************************************************************************/
    private void isHaveAuditConfigForType(String businessType)throws Exception{
        Map<Integer, String> configs = getBusinessAuditConfigs("", businessType);
        if(configs.size() == 0){
            throw new RuntimeException("未在business_audit_config表配置type=" + businessType + "的数据");
        }
    }
    /************************************************************************
     *@Description:保存单级审核的结果到审核过程记录表
     *@Author:孙虎
     *@Date:2018/8/17
     ************************************************************************/
    @Transactional
    private void saveSingleBusinessLevelAudit(String statusUid, String result, String info, Integer currStage, String username,String currStageLevelName) {
        BusinessAuditLevelResult levelResult = new BusinessAuditLevelResult();
        levelResult.setStatusId(statusUid);
        levelResult.setAuditLevel(currStage);
        levelResult.setAuditLevelName(currStageLevelName);
        levelResult.setInfo(info);
        levelResult.setResult(result);
        levelResult.setCreateUser(username);
        levelResult.setCreateTime(new Date());
        businessAuditLevelResultRepository.saveAndFlush(levelResult);
    }

    /************************************************************************
     *@Description:获取预约业务的传入级别的下一审核级别 再无下一级return 0
     *@Author:孙虎
     *@Date:2018/8/17
     ************************************************************************/
    private int getNextAuditStage(String businessUid, String businessType, Integer currStage) {
        //最终审核级别
        int finalStage = getFinalAuditStage(businessUid, businessType);
        //是否是最后一级
        if (currStage == finalStage) {
            return 0;
        } else {
            String sql = "SELECT bac.audit_level FROM\n" +
                    "business_audit_config_relate bacr\n" +
                    "INNER JOIN business_audit_config bac ON bac.uid = bacr.audit_config_id AND bac.type = '" + businessType + "' AND bac.audit_level = " + (currStage + 1) + "\n" +
                    "WHERE bacr.business_id = '" + businessUid + "'";
            if (entityManager.createNativeQuery(sql).getResultList().size() == 0) {
                return getNextAuditStage(businessUid, businessType, currStage + 1);
            } else {
                Object result = entityManager.createNativeQuery(sql).getSingleResult();
                //下一级是否存在
                if (result == null) {//不存在再找下一级 递归算法
                    return getNextAuditStage(businessUid, businessType, currStage + 1);
                } else {//存在下一级
                    return (int) result;
                }
            }
        }
    }

    /************************************************************************
     *@Description:该业务的最终审核级别
     *@Author:孙虎
     *@Date:2018/8/17
     ************************************************************************/
    private int getFinalAuditStage(String businessUid, String businessType) {
        String sql = "SELECT MAX(bac.audit_level) FROM business_audit_config_relate bacr\n" +
                "INNER JOIN business_audit_config bac ON bac.uid = bacr.audit_config_id AND bacr.type = '" + businessType + "'" +
                "\nWHERE bacr.business_id = '" + businessUid + "'";
        Object finalStage = entityManager.createNativeQuery(sql).getSingleResult();
        if (finalStage != null){
            return (Integer) finalStage;
        }else {
            return 0;
        }
    }

    /**
     * 删除审核信息
     * @param businessType 业务类型
     * @param businessAppUid 业务id
     * @throws Exception 异常
     * @author 黄保钱 2019-1-8
     */
    @Transactional
    @Override
    public void deleteAuditInfo(String businessType, String businessAppUid) throws Exception{
        //判断是否在数据库配置业务的审核流程
        isHaveAuditConfigForType(businessType);
        //是否已有该预约的状态
        List<BusinessAuditStatus> status = businessAuditStatusRepository.findBypAppUidAndType(businessAppUid, businessType);
        if(status.size() != 1){
            throw new RuntimeException("不存在id为" + businessAppUid + "的" + businessType + "业务预约状态");
        }
        String deleteResultSql = "DELETE FROM business_audit_level_result\n" +
                "WHERE status_id = \n" +
                "(SELECT uid FROM business_audit_status \n" +
                "where business_app_id = '" +
                businessAppUid +
                "'\n and type = '" +
                businessType +
                "')";
        entityManager.createNativeQuery(deleteResultSql).executeUpdate();
        String deleteStatusSql = "DELETE FROM business_audit_status\n" +
                "where business_app_id = '" +
                businessAppUid +
                "'\n and type = '" +
                businessType +
                "'";
        entityManager.createNativeQuery(deleteStatusSql).executeUpdate();
    }

    /**
     * 保存审核记录
     * @param businessAppUid 业务id
     * @param businessUid 业务对象id
     * @param result 结果
     * @param info 备注
     * @param businessType 业务类型
     * @param username 审核用户名
     * @return 下一级审核信息
     * @throws Exception 不存在业务id对应的审核记录或者已经审核过时抛异常
     * @author 黄保钱 2019-3-14
     */
    @Transactional
    @Override
    public Map<Integer, String> saveBusinessLevelAuditForRepeatable(String businessAppUid, String businessUid, String result, String info, String businessType, String username) throws Exception{
        //判断是否在数据库配置业务的审核流程
        isHaveAuditConfigForType(businessType);
        //是否已有该预约的状态
        List<BusinessAuditStatus> status = businessAuditStatusRepository.findBypAppUidAndType(businessAppUid, businessType);
        if(status.size() != 1){
            throw new RuntimeException("不存在id为" + businessAppUid + "的" + businessType + "业务预约状态");
        }
        //当前的所属审核级别
        Map<Integer, String> currAuditStage = getCurrAuditStage(businessAppUid, businessType);
        //当前级别
        Integer currStage = currAuditStage.entrySet().iterator().next().getKey();
        String currStageLevelName=currAuditStage.entrySet().iterator().next().getValue();
        //审核已通过或已拒绝不再保存
        if (currStage != BUSINESSINITSTATUS_PASS && currStage != BUSINESSINITSTATUS_FAIL) {
            //该预约业务对应的审核状态数据
            BusinessAuditStatus businessAuditStatus = businessAuditStatusRepository.findBypAppUidAndType(businessAppUid,businessType).get(0);
            if(result.equals(BUSINESSAPPRESULT_FAIL)){//单级审核拒绝
//                businessAuditStatus.setResult(result);
//                businessAuditStatus.setAuditStage(BUSINESSINITSTATUS_FAIL);
            }else{//单级审核通过
                //最终审核级别
                int finalStage = getFinalAuditStage(businessUid,businessType);
                //是否是最后一级审核
                if(currAuditStage.containsKey(finalStage)){
                    //最后一级审核通过
                    businessAuditStatus.setResult(result);
                    businessAuditStatus.setAuditStage(BUSINESSINITSTATUS_PASS);
                }else {//非最后一级审核通过
                    //获取下一级的审核级别
                    int nextStage = getNextAuditStage(businessUid,businessType,currStage);
                    businessAuditStatus.setAuditStage(nextStage);
                }
            }
            //保存预约业务的审核状态
            businessAuditStatus = businessAuditStatusRepository.saveAndFlush(businessAuditStatus);
            saveSingleBusinessLevelAudit(businessAuditStatus.getUid(),result,info,currStage,username,currStageLevelName);
        }else {
            throw new RuntimeException("id为" + businessAppUid + "的" + businessType + "业务流程已完成");
        }
        Map<Integer, String> map = getCurrAuditStage(businessAppUid, businessType);
        for(Map.Entry<Integer, String> entry: map.entrySet()){
            if("fail".equals(result)){
                map.put(entry.getKey(), "repeat");
            }
        }
        return map;
    }
    /************************************************************************
     *@Description:获取业务预约的各级审核状态（用于审核完成后）
     *@Author:吴奇臻
     *@Date:2019/5/24
     ************************************************************************/
    @Override
    public List<BusinessAuditLevelStatus> getBusinessLevelStatusForPass(String businessAppUid,String businessType)throws Exception{
        String sql = "SELECT\n" +
                "bas.business_app_id,\n" +
                "balr.audit_level,\n" +
                "CASE balr.result\n" +
                "WHEN '"+BUSINESSAPPRESULT_PASS+"' THEN '审核通过'\n" +
                "WHEN '"+BUSINESSAPPRESULT_FAIL+"' THEN '审核拒绝'\n" +
                "ELSE '未审核' END AS result,\n" +
                "balr.create_user AS audit_user,\n" +
                "balr.audit_level_name,\n"+
                "balr.info,\n"+
                "balr.create_time\n"+
                "FROM business_audit_level_result balr\n" +
                "INNER JOIN business_audit_status bas ON balr.status_id = bas.uid\n" +
                "WHERE bas.business_app_id = '"+businessAppUid+"'\n" +
                "AND bas.type='"+businessType+"'\n" +
                "ORDER BY balr.audit_level";
        List<Object[]> list = entityManager.createNativeQuery(sql).getResultList();
        List<BusinessAuditLevelStatus> levelStatuses = new ArrayList<>();
        for (Object[] objects:list) {
            BusinessAuditLevelStatus status = new BusinessAuditLevelStatus();
            status.setBusinessAppId(objects[0].toString());
            status.setLevel(Integer.valueOf(objects[1].toString()));
            status.setResult(objects[2].toString());
            if(objects[3] != null){
                status.setAuditUser(objects[3].toString());
            }
            status.setAuthName(objects[4].toString());
            if(objects[5] != null){
                status.setInfo(objects[5].toString());
            }
            if(objects[6] != null){
                status.setCreateTime(objects[6].toString());
            }
            levelStatuses.add(status);
        }
        return levelStatuses;
    }

    @Override
    public String deleteBusinessLevelAudit(String businessAppUid,String businessType){
        BusinessAuditStatus businessAuditStatus = businessAuditStatusRepository.findBypAppUidAndType(businessAppUid,businessType).get(0);
        //删除审核记录
        List<BusinessAuditLevelResult> businessAuditLevelResult=businessAuditLevelResultRepository.getBusinessAuditLevelResultByStatusId(businessAuditStatus.getUid());
        businessAuditLevelResultRepository.deleteAll(businessAuditLevelResult);
        businessAuditStatusRepository.delete(businessAuditStatus);
        return "success";
    }

    /**
     * @description 获取审核人所有审过数据的uid
     * @param
     * @author  Smark Lee
     * @date  2021/10/20
     * @return
     **/
    @Override
    public List<String> getBusinessUidsByCreateUser(String createUser){
        return businessAuditStatusRepository.getBusinessUidsByCreateUser(createUser);
    }

    /**
     * @description 获取审核数据
     * @param entityType
     * @param entityId
     * @author  Smark Lee
     * @date  2021/11/10
     * @return
     **/
    @Override
    public AuditVO getAudit(@NotNull EntityTypeEnum entityType,@NotNull String entityId){
        AuditEntityVO auditEntityVO = auditEntityService.selectOne(entityType,entityId);
        // 封装auditVo对象
        AuditVO auditVO = new AuditVO();
        auditVO.setAuditEntityId(auditEntityVO.getAuditEntityId());
        auditVO.setIsAuditUnanimous(auditEntityVO.getIsAuditUnanimous());
        auditVO.setAuditConfigVOList(auditConfigService.selectAuditConfig(auditEntityVO.getAuditEntityId()));
        return auditVO;
    }


    /**
     * @description 保存审核数据
     * @param audit 审核对象
     * @author  Smark Lee
     * @date  2021/11/10
     * @return
     **/
    @Override
    public String saveAudit(AuditVO audit){
        // 根据配置保存audit
        AuditEntity auditEntity = auditEntityService.getById(audit.getAuditEntityId());
        // 不一样则修改统一审核设置
        if (!auditEntity.getIsAuditUnanimous().equals(audit.getIsAuditUnanimous())){
            auditEntity.setIsAuditUnanimous(audit.getIsAuditUnanimous());
            auditEntityService.saveOrUpdate(auditEntity);
            //修改配置
            UpdateWrapper updateWrapper = new UpdateWrapper();
            updateWrapper.eq("audit_entity_id",audit.getAuditEntityId());
            updateWrapper.in("audit_type", Arrays.stream(AuditTypeEnum.values()).filter(type -> !Objects.equals(AuditTypeEnum.ACA_INSIDE.name(),type.name())).collect(Collectors.toList()));
            updateWrapper.set("enabled",audit.getIsAuditUnanimous());
            auditConfigService.update(updateWrapper);
        }

        // 保存审核实体关联的审核配置
        if (Objects.nonNull(audit.getAuditConfigVOList())&&!audit.getAuditConfigVOList().isEmpty()){
            audit.getAuditConfigVOList().forEach(
                    config -> {
                        auditConfigService.updateAuditConfig(config);
                    }
            );
        }
        return "success";
    }
}
