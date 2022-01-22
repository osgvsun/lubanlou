package net.gvsun.repository;

import  net.gvsun.entity.GatewayApiDefine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GatewayApiDefineRepository extends JpaRepository<GatewayApiDefine, String> {
    List<GatewayApiDefine> findByWhiteLabelAndEnabled(Integer WhiteLabel, Integer enabled);

    List<GatewayApiDefine> findByEnabled(Integer enabled);
}
