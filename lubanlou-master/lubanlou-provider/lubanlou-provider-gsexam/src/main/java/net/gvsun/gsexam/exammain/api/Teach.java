package net.gvsun.gsexam.exammain.api;


import net.gvsun.gsexam.service.exam.ExamDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 教学平台接口
 */
@RestController
@RequestMapping("/api/teach")
public class Teach {

    @Autowired
    private ExamDetailService examDetailService;

    /**
     * 同步答题详情
     * @param gradingId 成绩id
     * @return
     */
    @RequestMapping("/synchronizeAnswerDetails")
    public String synchronizeAnswerDetails(@RequestParam Integer gradingId) {
        return examDetailService.synchronizeAnswerDetails(gradingId);
    }


}
