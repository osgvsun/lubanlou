package net.gvsun.gsexam.service.miniProgram;

import com.alibaba.fastjson.JSONObject;
import net.gvsun.gsexam.domain.TAssignment;
import net.gvsun.gsexam.jpa.*;
import net.gvsun.gsexam.service.common.ShareService;
import net.gvsun.gsexam.service.exam.GradeBookService;
import net.gvsun.gsexam.vo.exam.ExamListVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by 李雪腾 on 2017/9/13 0013.
 */
@Service("miniProgramService")
public class MiniProgramServiceImpl implements MiniProgramService {

    @Autowired
    private TAssignmentJPA tAssignmentJPA;
    @Autowired
    private ShareService shareService;
    @Autowired
    private UserJPA userJPA;
    @Autowired
    private TAssignmentSectionJPA tAssignmentSectionJPA;
    @Autowired
    private TAssignmentItemJPA tAssignmentItemJPA;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private TAssignmentItemMappingJPA tAssignmentItemMappingJPA;
    @Autowired
    private TAssignmentGradingJPA tAssignmentGradingJPA;
    @Autowired
    private TAssignmentAnswerJPA tAssignmentAnswerJPA;
    @Autowired
    private GradeBookService gradeBookService;
    @Autowired
    private TCourseSiteJPA tCourseSiteJPA;






    /**************************************************************************
     * Description 获取考试列表
     *
     * @author 洪春莹
     * @date 2019-05-24
     **************************************************************************/
    @Override
    public JSONObject getExamList(Integer tCourseSiteId){
        JSONObject jsonObject =new JSONObject();
        List<TAssignment> tAssignments = tAssignmentJPA.findTAssignmentExamBySiteId(tCourseSiteId,"test");
        List<ExamListVo> examListDtos = new ArrayList<ExamListVo>();
        for (TAssignment tAssignment : tAssignments) {
            ExamListVo examListDto = new ExamListVo();
            //考试id
            examListDto.setId(tAssignment.getId());
            examListDto.setIsMakeUpExam(tAssignment.getIsMakeUpExam());
            examListDto.setOldAssignmentId(tAssignment.getOldAssignmentId());
            examListDto.setStartTime(tAssignment.getTAssignmentControl().getStartdate());
            //将数据库的时间类型转String
            if (tAssignment.getTAssignmentControl().getStartdate()!=null){
                SimpleDateFormat sdf= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String date=sdf.format(tAssignment.getTAssignmentControl().getStartdate());
                examListDto.setStartTime1(date);
            }
            examListDto.setDueTime(tAssignment.getTAssignmentControl().getDuedate());
            //将数据库的时间类型转String
            if (tAssignment.getTAssignmentControl().getDuedate()!=null){
                SimpleDateFormat sdf= new SimpleDateFormat("yyyy-MM-dd HH :mm:ss");
                String date=sdf.format(tAssignment.getTAssignmentControl().getDuedate());
                examListDto.setDueTime1(date);
            }
            examListDto.setTitle(tAssignment.getTitle());
            examListDto.setStatus(tAssignment.getStatus());
            examListDto.setAcademyNumber(tAssignment.getSchoolAcademy());
            examListDtos.add(examListDto);
        }
        jsonObject.put("data",examListDtos);
        return jsonObject;
    }





}
