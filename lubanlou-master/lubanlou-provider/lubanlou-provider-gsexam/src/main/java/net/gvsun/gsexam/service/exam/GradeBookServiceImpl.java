package net.gvsun.gsexam.service.exam;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import net.gvsun.feign.TranscriptFeign;
import net.gvsun.gsexam.domain.TAssignmentControl;
import net.gvsun.gsexam.domain.TAssignmentGrading;
import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.jpa.TAssignmentGradingJPA;
import net.gvsun.gsexam.vo.layui.LayuiDataVo;
import net.gvsun.transcript.external.UserRecordVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service("gradeBookService")
public class GradeBookServiceImpl implements GradeBookService {
    @Autowired
    private TAssignmentGradingJPA tAssignmentGradingJPA;
    @Autowired
    private TranscriptFeign transcriptFeign;

    /**************************************************************************
     * Description 根据测验id查询是否进成绩册，是则加入成绩册
     *
     * @author lixueteng
     * @date 2017-09-19
     **************************************************************************/
    @Override
    public String saveGradebook(Integer cid, int assignmentId, Integer tAssignmentGradeId, UserVo userVo) {
        TAssignmentGrading tAssignmentGrade = tAssignmentGradingJPA.findOne(tAssignmentGradeId);
        //根据id获取测验
        TAssignmentControl tAssignmentControl = tAssignmentGrade.getTAssignment().getTAssignmentControl();
        if ("yes".equals(tAssignmentControl.getToGradebook())) {

            String jsonReturnVo = transcriptFeign.saveExamRecord(tAssignmentGrade.getTAssignment().getId().toString(),tAssignmentGrade.getFinalScore(),userVo.getUsername(),userVo.getCname());
            JSONObject jsonObject = JSON.parseObject(jsonReturnVo);
            System.out.println(jsonReturnVo);
            return jsonObject.getString("result");
        } else {
            return "该考试（测试）不进入成绩册";
        }
    }


    /**************************************************************************
     * Description 打分后更新成绩册
     *
     * @author 黄浩
     * @date 2020年9月25日
     **************************************************************************/
    @Override
    public boolean updateTranscript(Integer tAssignmentGradeId) {
        boolean result = true;
        try {
            TAssignmentGrading tAssignmentGrade = tAssignmentGradingJPA.findOne(tAssignmentGradeId);
            //根据id获取测验
            TAssignmentControl tAssignmentControl = tAssignmentGrade.getTAssignment().getTAssignmentControl();
            if ("yes".equals(tAssignmentControl.getToGradebook())) {
                transcriptFeign.saveExamRecord(tAssignmentGrade.getTAssignment().getId().toString(),tAssignmentGrade.getFinalScore(),tAssignmentGrade.getUserByStudent().getUsername(),tAssignmentGrade.getUserByStudent().getCname());
            } else {
                result = false;
            }
        } catch (Exception e) {
            System.out.println("更新成绩册报错信息为：" + e);
            result = false;
        }
        return result;
    }

    /**************************************************************************
     * Description 提交成绩册
     *
     * @author：黄浩
     * @date ：2021年1月9日
     **************************************************************************/
    @Override
    public void commitGrade(Integer cid, Integer assignmentId, String apiGateWayHost, List<LayuiDataVo> data) {
        //获取学生打分信息
        List<UserRecordVo> userRecordVos = new ArrayList<>();
        for (LayuiDataVo layuiDataVo : data) {
            UserRecordVo userRecordVo = new UserRecordVo();
            userRecordVo.setAssignmentId(assignmentId);
            userRecordVo.setSiteId(cid);
            userRecordVo.setUsername(layuiDataVo.getUsername());
            userRecordVo.setCname(layuiDataVo.getCname());
            userRecordVo.setPoints(layuiDataVo.getScore());
            userRecordVos.add(userRecordVo);
        }
        if(userRecordVos.size()>0){
            transcriptFeign.submitTranscriptApi(userRecordVos);
        }
    }
}
