package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.LabRoomDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/****************************************************************************
 * Description 教学系统-字典表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface LabRoomDeviceJPA extends JpaRepository<LabRoomDevice, Integer>,
        JpaSpecificationExecutor<LabRoomDevice> {
}
