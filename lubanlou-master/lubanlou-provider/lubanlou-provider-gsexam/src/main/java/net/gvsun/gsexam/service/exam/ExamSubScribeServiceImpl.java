package net.gvsun.gsexam.service.exam;

import net.gvsun.gsexam.domain.SubscribeExam;
import net.gvsun.gsexam.domain.SubscribeExamInfo;
import net.gvsun.gsexam.domain.User;
import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.dto.exam.login.SubScribeExamDto;
import net.gvsun.gsexam.jpa.SubscribeExamInfoJPA;
import net.gvsun.gsexam.jpa.SubscribeExamJPA;
import net.gvsun.gsexam.jpa.UserJPA;
import net.gvsun.gsexam.utils.EmptyUtil;
import net.gvsun.gsexam.vo.exam.ExamSubScribeVo;
import net.gvsun.gsexam.vo.exam.SubScribeStudentVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**************************************************************************
 * Description:预约考试的实现
 *
 * @author:lixueteng
 * @date:2017/10/24 0024
 **************************************************************************/
@Service("examSubScribeService")
public class ExamSubScribeServiceImpl implements ExamSubScribeService {

    @Autowired
    private SubscribeExamJPA subscribeExamJPA;
    @Autowired
    private SubscribeExamInfoJPA subscribeExamInfoJPA;
    @Autowired
    private UserJPA userJPA;
    @PersistenceContext
    private EntityManager entityManager;
    /**************************************************************************
     * Description:保存预约考试
     *
     * @author:lixueteng
     * @date:2017/10/24 0024
     * @param subScribeExamDto 要保存的预约考试的dto
     * @return 保存成功返回的预约考试的dto
     **************************************************************************/
    @Override
    public void saveSubScribeExam(SubScribeExamDto subScribeExamDto, UserVo userVo) {
        SubscribeExam subscribeExam=new SubscribeExam();
        subscribeExam.setTitle(subScribeExamDto.getTitle());
        subscribeExam.setDescription(subScribeExamDto.getDescription());
        subscribeExam.setStartTime(subScribeExamDto.getStartDate());
        subscribeExam.setEndTime(subScribeExamDto.getEndDate());
        subscribeExam.setNumber(subScribeExamDto.getNumber());
        subscribeExam.setTeacherName(userVo.getUsername());
        //默认状态 0 可用
        subscribeExam.setStatus(0);
        subscribeExamJPA.save(subscribeExam);
    }
    /**************************************************************************
     * Description:获取预约考试列表
     *
     * @author:lixueteng
     * @date:2017/10/24 0024
     * @param userVo 当前登录人
     * @return 预约考试列表
     **************************************************************************/
    @Override
    public List<ExamSubScribeVo> getSubScribeExamList(UserVo userVo){
        String username=userVo.getUsername();
        List<SubscribeExam> subscribeExamList = subscribeExamJPA.findSubscribeExamInTime(new Date(),0);
        List<ExamSubScribeVo> examSubScribeVoList=new ArrayList<>();
        for(SubscribeExam exam:subscribeExamList){
            ExamSubScribeVo examSubScribeVo=new ExamSubScribeVo();
            examSubScribeVo.setId(exam.getId());
            examSubScribeVo.setTitle(exam.getTitle());
            examSubScribeVo.setStartTime(exam.getStartTime());
            examSubScribeVo.setEndTime(exam.getEndTime());
            examSubScribeVo.setTeacherName(userJPA.findUserByUsername(exam.getTeacherName()).getCname());
            //获取已经预约的人数
            Integer selectedNumber = subscribeExamInfoJPA.getSubscribeExamInfoCountById(exam.getId());
            examSubScribeVo.setSelectedNumber(selectedNumber);
            //获取当前考试的所有人数
            Integer totalNumber=exam.getNumber();
            //获取可选人数
            examSubScribeVo.setChooseableNumber(totalNumber-selectedNumber);
            //-1老师 0 未预约 1 预约成功
            Integer status=-1;
            //判断是否预约过
            List<SubscribeExamInfo> subScribeExamInfo =
                    subscribeExamInfoJPA.getExamStatusByusernameAndId(exam.getId(), username);
            if(subScribeExamInfo.size()<=0){
                //没有这个学生的预约记录
                status=0;
            }else{
                //判断这个学生的预约状态
                status=subScribeExamInfo.get(0).getStatus();
            }
            examSubScribeVo.setStatus(status);
            examSubScribeVoList.add(examSubScribeVo);
        }
        return examSubScribeVoList;
    }

    /**************************************************************************
     * Description:获取预约考试列表
     *
     * @author:lixueteng
     * @date:2017/10/25 0024
     * @param userVo 当前登录人
     * @param subScribeExamId 预约考试的id
     * @return 已经预约考试的学生列表
     **************************************************************************/
    @Override
    public List<SubScribeStudentVo> getSubScribeExamStudentList(Integer subScribeExamId, UserVo userVo, Integer page, Integer limit){
        List<SubScribeStudentVo> subScribeStudentVoList=new ArrayList<>();
        //设置分页信息
        Pageable pageable = PageRequest.of(page-1, limit);
        //获取已经预约的学生列表
        Page<SubscribeExamInfo> alreadySubScribeStudentPage =
                subscribeExamInfoJPA.getAlreadySubScribeStudent(subScribeExamId, 1,pageable);
        List<SubscribeExamInfo> alreadySubScribeStudent = alreadySubScribeStudentPage.getContent();
        for(SubscribeExamInfo subscribeExamInfo:alreadySubScribeStudent){
            String username = subscribeExamInfo.getName();
            User user = userJPA.findUserByUsername(username);
            SubScribeStudentVo subScribeStudentVo=new SubScribeStudentVo();
            subScribeStudentVo.setId(subscribeExamInfo.getId());
            subScribeStudentVo.setUsername(username);
            subScribeStudentVo.setCname(user.getCname());
            subScribeStudentVo.setAcademy((EmptyUtil.isEmpty(user.getSchoolAcademy()))?"":user.getSchoolAcademy().getAcademyName());
            subScribeStudentVo.setClasses((EmptyUtil.isEmpty(user.getSchoolClass()))?"":user.getSchoolClass().getClassName());
            subScribeStudentVoList.add(subScribeStudentVo);
        }
        return subScribeStudentVoList;
    }
    /**************************************************************************
     * Description:学生点击开始预约
     *
     * @author:lixueteng
     * @date:2017/10/25 0024
     * @param userVo 当前登录人
     * @param subScribeExamId 预约考试的id
     * ro
     **************************************************************************/
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void startSubScribeExam(Integer subScribeExamId, UserVo userVo){
        //获取当前预约考试
        SubscribeExam subscribeExam = subscribeExamJPA.findOne(subScribeExamId);
        //判断当前登录人是否预约过本次考试的
        List<SubscribeExamInfo> currUserExamInfoList = subscribeExamInfoJPA.getExamStatusByusernameAndId(subScribeExamId, userVo.getUsername());
        if(currUserExamInfoList.size()<=0){
            //当前没有向数据库中插入记录
            SubscribeExamInfo subscribeExamInfo=new SubscribeExamInfo();
            subscribeExamInfo.setName(userVo.getUsername());
            subscribeExamInfo.setStatus(1);
            subscribeExamInfo.setSubscribeExam(subscribeExam);
            subscribeExamInfoJPA.save(subscribeExamInfo);
        }else{
            subscribeExamInfoJPA.updateCurrUserExamStatus(subScribeExamId,userVo.getUsername(),1);
        }

    }
    /**************************************************************************
     * Description:学生点击取消预约
     *
     * @author:lixueteng
     * @date:2017/10/26 0024
     * @param userVo 当前登录人
     * @param subScribeExamId 预约考试的id
     **************************************************************************/
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void cancelSubScribeExam(Integer subScribeExamId, UserVo userVo){
        //取消当前登录人的预约考试信息
        subscribeExamInfoJPA.updateCurrUserExamStatus(subScribeExamId,userVo.getUsername(),0);
    }

    /**************************************************************************
     * Description:设置当前预约考试状态是否可用 
     *
     * @author:lixueteng
     * @date:2017/10/26 0024
     * @param subScribeExamId 预约考试的id
     * @param status 设置的状态
     **************************************************************************/
    @Override
    public void setSubScribeExamStatus(Integer subScribeExamId,Integer status){
        SubscribeExam subscribeExam = subscribeExamJPA.findOne(subScribeExamId);
        subscribeExam.setStatus(status);
        subscribeExamJPA.save(subscribeExam);
    }

    /**************************************************************************
     * Description:判断是否还有剩余预约的名额
     *
     * @author:lixueteng
     * @date:2017/10/31 0024
     * @param subScribeExamId 预约考试的id
     * @return 是否有名额
     **************************************************************************/
    @Override
    public boolean setSubScribeExamStatus(Integer subScribeExamId){
        //获取当前预约考试
        SubscribeExam subscribeExam = subscribeExamJPA.findOne(subScribeExamId);
        //已经预约的人数
        Integer alreadySubScribeNum = subscribeExamInfoJPA.getSubscribeExamInfoCountById(subScribeExamId);
        //获取当前预约考试的总人数限制
        Integer limit = subscribeExam.getNumber();
        return limit-alreadySubScribeNum>0?true:false;
    }

    /**************************************************************************
     * Description:添加数据判重
     *
     * @author：徐烺
     * @date ：2018年9月10日
     **************************************************************************/
    @Override
    public String checkTitle(String title, Integer id, Integer type, boolean isChapter) {
        StringBuffer sql = new StringBuffer("Select count(id) from wk_folder where name = '"+title+"'" +
                " and type = "+type);
        if(isChapter){
            sql.append(" and chapter_id = "+id);
        }else{
            sql.append(" and lesson_id = "+id);
        }
        Query query = entityManager.createNativeQuery(sql.toString());
        Integer counts = Integer.parseInt(query.getSingleResult().toString());
        if(counts>0){
            return "has";
        }else{
            return  "none";
        }
    }



    /**************************************************************************以下都是无user表的方法（大仪新增）************************************************************************
     * Description:获取预约考试列表
     *
     * @author:lixueteng
     * @date:2017/10/24 0024
     * @param username 当前登录人
     * @return 预约考试列表
     **************************************************************************/
    @Override
    public List<ExamSubScribeVo> getSubScribeExamList(String username){
        List<SubscribeExam> subscribeExamList = subscribeExamJPA.findSubscribeExamInTime(new Date(),0);
        List<ExamSubScribeVo> examSubScribeVoList=new ArrayList<>();
        for(SubscribeExam exam:subscribeExamList){
            ExamSubScribeVo examSubScribeVo=new ExamSubScribeVo();
            examSubScribeVo.setId(exam.getId());
            examSubScribeVo.setTitle(exam.getTitle());
            examSubScribeVo.setStartTime(exam.getStartTime());
            examSubScribeVo.setEndTime(exam.getEndTime());
            examSubScribeVo.setTeacherName(userJPA.findUserByUsername(exam.getTeacherName()).getCname());
            //获取已经预约的人数
            Integer selectedNumber = subscribeExamInfoJPA.getSubscribeExamInfoCountById(exam.getId());
            examSubScribeVo.setSelectedNumber(selectedNumber);
            //获取当前考试的所有人数
            Integer totalNumber=exam.getNumber();
            //获取可选人数
            examSubScribeVo.setChooseableNumber(totalNumber-selectedNumber);
            //-1老师 0 未预约 1 预约成功
            Integer status=-1;
            //判断是否预约过
            List<SubscribeExamInfo> subScribeExamInfo =
                    subscribeExamInfoJPA.getExamStatusByusernameAndId(exam.getId(), username);
            if(subScribeExamInfo.size()<=0){
                //没有这个学生的预约记录
                status=0;
            }else{
                //判断这个学生的预约状态
                status=subScribeExamInfo.get(0).getStatus();
            }
            examSubScribeVo.setStatus(status);
            examSubScribeVoList.add(examSubScribeVo);
        }
        return examSubScribeVoList;
    }
}
