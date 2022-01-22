package net.gvsun.gsexam.service.exam;

import net.gvsun.gsexam.dto.common.TAssignmentGradingDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface TAssignmentGradingService {

    /**************************************************************************
     * Description 查看已提交考试的成绩列表
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
    public List<TAssignmentGradingDto> findExamGradingList(int currpage, int pageSize, HttpServletRequest request) throws Exception;
}
