package net.gvsun.gsexam.service.exam;

import net.gvsun.gsexam.dto.common.TAssignmentGradingDto;
import net.gvsun.gsexam.dto.common.TAssignmentItemMappingVo;

import java.util.List;

public interface TAssignmentItemMappingService {

    /**************************************************************************
     * Description 查看学生分项答题记录及打分表
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
    public List<TAssignmentItemMappingVo> findTAssignmentItemMappingsByTAssignmentGrading(
            TAssignmentGradingDto tAssignmentGrading) ;
}
