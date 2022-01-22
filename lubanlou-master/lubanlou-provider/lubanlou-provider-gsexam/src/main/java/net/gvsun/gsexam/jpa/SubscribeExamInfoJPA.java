package net.gvsun.gsexam.jpa;

import net.gvsun.gsexam.domain.SubscribeExamInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


/**************************************************************************
 * Description:预约考试信息的jpa
 *
 * @author:lixueteng
 * @date:2017/10/20 0020
 **************************************************************************/
public interface SubscribeExamInfoJPA extends JpaRepository<SubscribeExamInfo,Integer>,
        JpaSpecificationExecutor<SubscribeExamInfo> {

    /**************************************************************************
     * Description:获取当前预约考试的人数
     *
     * @author:lixueteng
     * @date:2017/10/20 0020
     * @param id 当前预约考试的id
     * @return 当前预约考试的人数
     **************************************************************************/
    @Query("select count(c) from SubscribeExamInfo c where c.subscribeExam.id=?1 and c.status=1")
    Integer getSubscribeExamInfoCountById(Integer id);
    /**************************************************************************
     * Description:获取当前登录人的考试预约状况
     *
     * @author:lixueteng
     * @date:2017/10/20 0020
     * @param id 当前预约考试的id
     * @return 当前登录人的预约列表
     **************************************************************************/
    @Query("select c from SubscribeExamInfo c where c.subscribeExam.id=?1 and c.name=?2")
    List<SubscribeExamInfo> getExamStatusByusernameAndId(Integer id, String username);
    /**************************************************************************
     * Description:获取当前预约考试的预约学生列表信息
     *
     * @author:lixueteng
     * @date:2017/10/25 0020
     * @param id 当前预约考试的id
     * @param  status 1 已经预约状态 0 未预约状态
     * @param pageable 分页信息
     * @return 当前预约考试的学生列表
     **************************************************************************/
    @Query("select c from SubscribeExamInfo c where c.subscribeExam.id=?1 and c.status=?2")
    Page<SubscribeExamInfo> getAlreadySubScribeStudent(Integer id, Integer status, Pageable pageable);
    /**************************************************************************
     * Description:更新当前登录人的预约考试信息
     *
     * @author:lixueteng
     * @date:2017/10/26 0020
     * @param id 当前预约考试的id
     * @param  username 当前登录人的姓名
     * @param status 设置状态
     **************************************************************************/
    @Modifying
    @Query("update SubscribeExamInfo c set c.status=?3 where c.subscribeExam.id=?1 and c.name=?2")
    void updateCurrUserExamStatus(Integer id, String username, Integer status);
}
