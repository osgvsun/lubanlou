package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.SubscribeExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

/**************************************************************************
 * Description:预约考试的jpa
 *
 * @author:lixueteng
 * @date:2017/10/20 0020
 **************************************************************************/
public interface SubscribeExamJPA extends JpaRepository<SubscribeExam,Integer>,
        JpaSpecificationExecutor<SubscribeExam> {

    /**************************************************************************
     * Description:获取预约考试列表(在时间范围内的)
     *
     * @author:lixueteng
     * @date:2017/10/24 0024
     * @param date 当前日期
     * @param status 预约考试的状态
     * @return 预约考试列表
     **************************************************************************/
    @Query("select c from SubscribeExam c where c.startTime < ?1 and c.endTime > ?1 and c.status=?2")
    List<SubscribeExam> findSubscribeExamInTime(Date date, Integer status);
    @Query(value = "select * from subscribe_exam where id =?1",nativeQuery = true)
    SubscribeExam findOne(Integer id);
}
