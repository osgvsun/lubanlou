package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.SystemLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


/****************************************************************************
 * Description 教学系统-日志查看
 * 
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SystemLogJPA extends JpaRepository<SystemLog, Integer>,
        JpaSpecificationExecutor<SystemLog> {

	 @Query("select u from SystemLog u order by u.id")
	 List<SystemLog> getSystemLogList();
	
	 //根据主键获取数据
	 @Query("select u from SystemLog u where u.id=:id")
     SystemLog getSystemLogById(@Param("id") Integer id);

}
