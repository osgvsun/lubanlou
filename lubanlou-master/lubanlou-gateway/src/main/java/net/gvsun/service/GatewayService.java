package net.gvsun.service;

import  net.gvsun.entity.GatewayApiDefine;
import  net.gvsun.repository.GatewayApiDefineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GatewayService {
    public static final int GLOBAL_WHITE_LIST = 1;      //全局白名单，该服务的所有接口不要令牌即可访问
    public static final int PARTIAL_WHITE_LIST = 2;     //局部白名单，只有在局部白名单中指定的接口不要要令牌访问，其他接口均需令牌
    public static final int PARTIAL_BLACK_LIST = 3;     //局部黑名单，在局部黑名单中指定的接口需要令牌，其他不需要
    private final GatewayApiDefineRepository gatewayRepository;
    private final Map<String, List<GatewayApiDefine>> cache = new ConcurrentHashMap<>(10);

    @Autowired
    public GatewayService(GatewayApiDefineRepository gatewayRepository) {
        this.gatewayRepository = gatewayRepository;
    }

    /**
     * 获取全局白名单
     */
    public List<GatewayApiDefine> getGlobalWhitelist() {
        if (!cache.containsKey("GLOBAL_WHITE_LIST-1")) {
            cache.put("GLOBAL_WHITE_LIST-1", gatewayRepository.findByWhiteLabelAndEnabled(GLOBAL_WHITE_LIST, 1));
        }
        return cache.get("GLOBAL_WHITE_LIST-1");
    }

    /**
     * 获取局部白名单
     */
    public List<GatewayApiDefine> getPartialWhiteList() {
        if (!cache.containsKey("PARTIAL_WHITE_LIST-1")) {
            cache.put("PARTIAL_WHITE_LIST-1", gatewayRepository.findByWhiteLabelAndEnabled(PARTIAL_WHITE_LIST, 1));
        }
        return cache.get("PARTIAL_WHITE_LIST-1");
    }

    /**
     * 获取局部黑名单
     */
    public List<GatewayApiDefine> getPartialBlackList() {
        if (!cache.containsKey("PARTIAL_BLACK_LIST-1")) {
            cache.put("PARTIAL_BLACK_LIST-1", gatewayRepository.findByWhiteLabelAndEnabled(PARTIAL_BLACK_LIST, 1));
        }
        return cache.get("PARTIAL_BLACK_LIST-1");
    }

    /**
     * 获取禁用的服务列表
     */
    public List<GatewayApiDefine> getDisableServiceList() {
        if (!cache.containsKey("DISABLE_SERVICE_LIST")) {
            cache.put("DISABLE_SERVICE_LIST", gatewayRepository.findByEnabled(0));
        }
        return cache.get("DISABLE_SERVICE_LIST");
    }

    public GatewayApiDefine getServiceById(String id) {
        Optional<GatewayApiDefine> optional = gatewayRepository.findById(id);
        return optional.orElse(null);
    }

    public List<GatewayApiDefine> getAllService() {
        return gatewayRepository.findAll();
    }

    public void refreshCache() {
        cache.clear();
    }
}
