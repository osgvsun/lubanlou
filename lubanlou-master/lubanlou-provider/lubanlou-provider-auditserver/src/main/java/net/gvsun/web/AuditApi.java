package net.gvsun.web;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.api.R;
import com.google.gson.JsonObject;
import net.gvsun.auditserver.external.AuditConfigVO;
import net.gvsun.auditserver.external.AuditLevelEnum;
import net.gvsun.auditserver.external.AuditVO;
import net.gvsun.auditserver.external.AuditEntityVO;
import net.gvsun.common.EntityTypeEnum;
import net.gvsun.common.Result;
import net.gvsun.domain.entity.audit.AuditEntity;
import net.gvsun.service.AuditService;
import net.gvsun.service.IAuditConfigLevelService;
import net.gvsun.service.IAuditConfigService;
import net.gvsun.service.IAuditEntityService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.GET;
import java.util.*;

/**
 * @description 审核服务通用接口（采用restful风格）
 * @author  Smark Lee
 * @date  2021/11/2
 * @return
 **/
@RestController
public class AuditApi {
    @Autowired private AuditService auditService;
    @Autowired private IAuditEntityService auditEntityService;
    @Autowired private IAuditConfigService auditConfigService;
    @Autowired private IAuditConfigLevelService auditConfigLevelService;

    /**
     * @description 修改审核实体(传过来的都是要更新的)
     * @param
     * @author  Smark Lee
     * @date  2021/11/9
     * @return
     **/
    @PostMapping(value = {"/audit"})
    @Transactional
    public Result saveAuditEntity(@RequestBody String audit){
        return Result.ok(auditService.saveAudit(JSON.parseObject(audit,AuditVO.class)));
    }

    /**
     * @description 获取审核对象
     * @param
     * @author  Smark Lee
     * @date  2021/11/9
     * @return
     **/
    @GetMapping(value = "/audit/{entityType}/{entityId}")
    public Result<AuditVO> getAudit(@PathVariable(value = "entityType") EntityTypeEnum entityType,
                                    @PathVariable(value = "entityId")String entityId){
        return Result.ok(auditService.getAudit(entityType,entityId));
    }


    /**
     * @description 获取审核实体列表
     * @param entityType 实体类型
     * @author  Smark Lee
     * @date  2021/11/10
     * @return
     **/
    @GetMapping(value = {"/audit/entity/{entityType}"})
    public Result<List<AuditEntityVO>> getAudit(@PathVariable(value = "entityType") EntityTypeEnum entityType){
        return Result.ok(auditEntityService.selectAuditEntity(entityType));
    }

    /**
     * @description 获取所有审核层级
     * @author  Smark Lee
     * @date  2021/11/9
     * @return
     **/
    @GetMapping(value = {"/audit/config/level"})
    public Result<Map<String,String>> getAuditConfigLevel(){
        Map<String,String> levelMap = new HashMap<>();
        for (AuditLevelEnum value : AuditLevelEnum.values()) {
            levelMap.put(value.name(),value.getName());
        }
        return Result.ok(levelMap);
    }
}
