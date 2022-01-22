package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.CommonDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/****************************************************************************
 * Description 教学系统-日志查看
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface CommonDocumentJPA extends JpaRepository<CommonDocument, Integer>,
        JpaSpecificationExecutor<CommonDocument> {
}
