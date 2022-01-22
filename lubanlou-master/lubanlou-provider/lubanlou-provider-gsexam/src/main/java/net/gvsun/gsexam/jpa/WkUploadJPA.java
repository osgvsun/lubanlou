package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.WkUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;


/****************************************************************************
 * Description 教学系统-学校权限表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface WkUploadJPA extends JpaRepository<WkUpload, Integer>,
        JpaSpecificationExecutor<WkUpload> {
	@Query(value = "select * from wk_upload where accessmentgrading_id =?1 and type=?2  order by up_time desc limit 0,1",nativeQuery = true)
    WkUpload findByGradingId(Integer gradingId, Integer type);
}
