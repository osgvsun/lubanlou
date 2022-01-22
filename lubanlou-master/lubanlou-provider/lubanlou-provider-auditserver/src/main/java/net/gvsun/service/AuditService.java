package net.gvsun.service;

import net.gvsun.auditserver.external.AuditVO;
import net.gvsun.common.EntityTypeEnum;
import net.gvsun.common.Result;
import org.springframework.lang.Nullable;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

/**
 * 1，前提条件：
 *           审核流程四张表：business_audit_config、business_audit_config_relate、business_audit_status、business_audit_level_result
 * 2，新增审核业务(以项目机时预约为例)：
 *               （1）先在business_audit_config表配置一个type为PROJECTMACHINE
 *               （2）定义一个业务类型常量BUSINESSTYPE_PROJECTMACHINE，其值与（1）步骤的type字段一致
 *               （3）按需求使用AuditService接口的方法（具体方法介绍查看方法头注释）
 *                   --saveBusinessAuditConfigs保存（单个项目或设备的）业务预约流程的审核设置
 *                   --getBusinessAuditConfigs获取（单个项目或设备的）业务预约流程的审核设置
 *                   --saveInitBusinessAuditStatus保存业务预约后所处的初始审核状态
 *                   --getCurrAuditStage获取目前业务预约的所处审核状态
 *                   --getBusinessLevelStatus获取业务预约的各级审核状态（无论该级是否已审核）
 * 3，参数说明：（1）businessType 其值从定义的业务类型常量选择，若传其他值，会抛异常
 *            （2）businessUid  业务主体的id(对于设备预约，便是指设备的id,对于项目预约，便指项目的id)
 *            （3）businessAppUid 业务预约记录的id(如一条设备预约记录的id或一条项目预约记录的id)
 */

public interface AuditService {

    //业务类型：项目机时预约
    public  String BUSINESSTYPE_PROJECTMACHINE = "PROJECTMACHINE";

    //业务初始审核状态：不需要审核或者所有审核级都关闭
    public  int BUSINESSINITSTATUS_PASS = -1;
    //业务审核状态：审核拒绝
    public  int BUSINESSINITSTATUS_FAIL = 0;

    //业务预约的审核最终结果：审核通过
    public  String BUSINESSAPPRESULT_PASS = "pass";
    //业务预约的审核最终结果：审核拒绝
    public  String BUSINESSAPPRESULT_FAIL = "fail";
    //业务预约的审核最终结果：审核中
    public  String BUSINESSAPPRESULT_AUDITING = "auditing";

    //业务设置是否开启某级审核：开启
    public  String BUSINESSCONFIG_ON = "on";
    //业务设置是否开启某级审核：关闭
    public  String BUSINESSCONFIG_OFF = "off";

    /************************************************************************
     *@Description:保存业务预约初始的审核级别状态
     *@Author:孙虎
     *@return:业务预约所属初始审核级别：-1代表不需要审核或者所有审核级都关闭
     *@Date:2018/8/16
     ************************************************************************/
    public int saveInitBusinessAuditStatus(String businessUid, String businessType, String businessAppUid)throws Exception;
    /************************************************************************
     *@Description:获取业务目前所处审核级别状态
     *@Author:孙虎
     *@return:map: key:所处审核级别，-1代表审核全部通过 0 代表审核被某级拒绝 预约已失败 value：审核级别名称
     *@Date:2018/8/17
     ************************************************************************/
    public Map<Integer,String> getCurrAuditStage(String businessAppUid, String businessType)throws Exception;
    /************************************************************************
     *@Description:保存业务单级审核结果 并返回审核后结果
     *@Author:孙虎
     *@return:map: key:所处审核级别，-1代表审核全部通过 0 代表审核被某级拒绝 预约已失败 value：审核级别名称
     *@Date:2018/8/17
     ************************************************************************/
    public Map<Integer,String> saveBusinessLevelAudit(String businessAppUid, String businessUid, String result, String info, String businessType, String username)throws Exception;
    /************************************************************************
     *@Description:保存业务单级审核结果 并返回审核后结果(如果有拒绝情况，则清空之前审核记录）
     *@Author:吴奇臻
     *@return:map: key:所处审核级别，-1代表审核全部通过 0 代表审核被某级拒绝 预约已失败 value：审核级别名称
     *@Date:2018/9/21
     ************************************************************************/
    public Map<Integer,String> saveBusinessLevelAuditReject(String businessAppUid, String businessUid, String result, String info, String businessType, String username)throws Exception;
    /************************************************************************
     *@Description:获取业务预约的各级审核状态
     *@Author:孙虎
     *@Date:2018/8/20
     ************************************************************************/
    public List<BusinessAuditLevelStatus> getBusinessLevelStatus(String businessUid, String businessAppUid,String businessType )throws Exception;
    /************************************************************************
     *@Description:获取业务预约审核设置状态
     *@Author:孙虎
     *@return:Map<Integer,String>:key代表级别value值有两种 on:开启 off:关闭
     *@Date:2018/8/21
     ************************************************************************/
    public Map<Integer, String> getBusinessAuditConfigs(String businessUid, String businessType)throws Exception;
    /************************************************************************
     *@Description:保存业务的审核设置
     *@Author:孙虎
     *@param:config:Map<Integer,String>:key代表级别value值有两种 on:开启 off:关闭
     *@Date:2018/8/22
     ************************************************************************/
    public void saveBusinessAuditConfigs(String businessUid, Map<Integer, String> configs, String businessType) throws Exception;

    /**
     * 删除审核信息
     * @param businessType 业务类型
     * @param businessAppUid 业务id
     * @throws Exception 异常
     * @author 黄保钱 2019-1-8
     */
    @Transactional
    void deleteAuditInfo(String businessType, String businessAppUid) throws Exception;

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
    Map<Integer, String> saveBusinessLevelAuditForRepeatable(String businessAppUid, String businessUid, String result, String info, String businessType, String username) throws Exception;
    /************************************************************************
     *@Description:获取业务预约的各级审核状态（用于审核完成后）
     *@Author:吴奇臻
     *@Date:2019/5/24
     ************************************************************************/
    public List<BusinessAuditLevelStatus> getBusinessLevelStatusForPass(String businessAppUid,String businessType)throws Exception;

    String deleteBusinessLevelAudit(String businessAppUid,String businessType);

    /**
     * @description 获取审核人所有审过数据的uid
     * @param
     * @author  Smark Lee
     * @date  2021/10/20
     * @return
     **/
    List<String> getBusinessUidsByCreateUser(String createUser);


    /**
     * @description 获取审核数据
     * @param entityType
     * @param entityId
     * @author  Smark Lee
     * @date  2021/11/10
     * @return
     **/
    AuditVO getAudit(@NotNull EntityTypeEnum entityType,@NotNull String entityId);

    /**
     * @description 获取审核数据
     * @param audit 审核对象
     * @author  Smark Lee
     * @date  2021/11/10
     * @return
     **/
    String saveAudit(AuditVO audit);
}
