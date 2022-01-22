package net.gvsun.repository;

import net.gvsun.entity.OperationLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperationLogRepository extends JpaRepository<OperationLog, Integer> {

}
