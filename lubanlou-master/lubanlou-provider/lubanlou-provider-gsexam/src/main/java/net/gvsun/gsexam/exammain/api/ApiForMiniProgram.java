package net.gvsun.gsexam.exammain.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.gvsun.gsexam.service.exam.ExamDetailService;
import net.gvsun.gsexam.vo.exam.ExamDetailVo;
import net.gvsun.gsexam.vo.exam.RestResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 小程序接口Controller
 */
@RestController
@RequestMapping("/api/miniProgram")
public class ApiForMiniProgram {
    @Autowired
    private ExamDetailService examDetailService;

    /**
     * 考试模块-开始考试
     * @param examId 考试id
     * @param userName 用户名
     * @param page 当前页
     * @param pageSize 页面大小
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping("/startExam")
    public String startExam(@RequestParam Integer examId, @RequestParam String userName, @RequestParam Integer page, @RequestParam Integer pageSize) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        RestResult result = new RestResult(RestResult.FAIL);

        // 判断是否具有考试资格
        if (examDetailService.getExamIsCanAnswer(examId, userName)) {
            //创建考卷
            Integer examPaperId = examDetailService.createExamPaper(examId, userName);
            examPaperId = examDetailService.createRandomExam(examPaperId, examId, userName);
            ExamDetailVo examDetailVo = examDetailService.getExamDetail(examPaperId, userName, page, pageSize);
            result.setData(examDetailVo);
            result.setStatus(RestResult.SCUESS);
            // 判断是否以及提交过
            if (examDetailVo.getStatus() == 1) {
                result.setStatus(RestResult.FAIL);
                result.setData("不能重复提交");
            }
        } else {
            result.setData("没有更多作答次数");
        }

        return objectMapper.writeValueAsString(result);
    }

    /**
     * @Description 考试模块-提交考试
     * @author 付世亮
     * @date 2019-8-23
     */
//    @RequestMapping("/submitExam")
//    public String submitExam(@RequestParam String userName) throws JsonProcessingException {
//        ObjectMapper objectMapper = new ObjectMapper();
//        RestResult result = new RestResult(RestResult.FAIL);
//
//        HttpServletRequest request = null;
//        Integer page = null;
//        Integer toPage = null;
//        Map<String, Object> map = null;
//        String fromTeach = null;
//        Integer flag = null;
//
//        if (flag == null) {
//            flag = 0;
//        }
//        Object cid1 = request.getSession().getAttribute("cid");
//        Integer cid = Integer.parseInt(cid1.toString());
//        Integer assignmentId = Integer.valueOf(request.getParameter("assignmentId"));
//        Integer currPage = page;
//        Integer submitTime = Integer.valueOf(request.getParameter("submitTime"));
//        Integer simulation = Integer.valueOf(request.getParameter("simulation"));
//        //获取考试成绩
//        Map<String, String[]> answerMap = new HashMap<>();
//        List<Integer> itemIds = examDetailService.findTAssignmentItemIds(assignmentId);
//        for (Integer id : itemIds) {
//            String[] answers = request.getParameterValues("answers" + id);
//            String[] answertexts = request.getParameterValues("answertexts" + id);
//            answerMap.put("answers" + id, answers);
//            answerMap.put("answertexts" + id, answertexts);
//        }
//        Integer grading = examDetailService.insertTAssignmentGrading(assignmentId, submitTime, userVo);
//        BigDecimal totalScore = examDetailService.saveTAssignmentItemMapping(answerMap, assignmentId, submitTime, userVo, grading);
//        Authorization authorization = AuthorizationUtil.getAuthorization(userName);
//        examDetailService.saveExam(totalScore, assignmentId, currPage, submitTime, simulation, cid, userVo, grading, apiGateWayHost, authorization.getJwtToken());
//        //判断用户是提交还是点击的下一页、
//        map.put("simulation", simulation);
//        map.put("examId", assignmentId);
//        map.put("page", toPage);
//        Integer parentExamId = examDetailService.findParentExamByExamId(assignmentId);
//
//        ExamResultVo examResult = examDetailService.getExamResult(parentExamId, userVo);
//        map.put("examResult", examResult);
//        map.put("fromTeach", fromTeach);
//        map.put("flag", flag);
//        map.put("projectTitle", projectTitle);
//
//        return objectMapper.writeValueAsString(result);
//    }
}
