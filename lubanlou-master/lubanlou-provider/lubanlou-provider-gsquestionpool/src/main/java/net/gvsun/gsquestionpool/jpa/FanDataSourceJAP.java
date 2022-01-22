package net.gvsun.gsquestionpool.jpa;

import net.gvsun.gsquestionpool.domain.FanDataSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

/**
 * @Auther:lay
 * @Date: 2019/1/9 15:04
 * @Description:
 */
public interface FanDataSourceJAP extends JpaRepository<FanDataSource,Integer>,
        JpaSpecificationExecutor<FanDataSource> {
    //获取当前学期
    @Query("select t from FanDataSource t where t.name=?1")
    FanDataSource findFanDataSourceByName(String dataSourceName);
}
