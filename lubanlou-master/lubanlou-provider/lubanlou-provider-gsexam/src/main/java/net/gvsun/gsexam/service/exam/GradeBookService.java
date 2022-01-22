package net.gvsun.gsexam.service.exam;

import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.vo.layui.LayuiDataVo;

import java.util.List;

/**
 * Created by 李雪腾 on 2017/9/13 0013.
 */
public interface GradeBookService {
    /**************************************************************************
     * Description 根据测验id查询是否进成绩册，是则加入成绩册
     *
     * @author lixueteng
     * @date 2017-09-19
     **************************************************************************/
    public String saveGradebook(Integer cid, int assignmentId, Integer tAssignmentGradeId, UserVo userVo);
    /**************************************************************************
     * Description 打分后更新成绩册
     *
     * @author 黄浩
     * @date 2020年9月25日
     **************************************************************************/
    public boolean updateTranscript(Integer tAssignmentGradeId);
    /**************************************************************************
     * Description 提交成绩册
     *
     * @author：黄浩
     * @date ：2021年1月9日
     **************************************************************************/
    public void commitGrade(Integer cid, Integer assignmentId, String apiGateWayHost, List<LayuiDataVo> data);

}
