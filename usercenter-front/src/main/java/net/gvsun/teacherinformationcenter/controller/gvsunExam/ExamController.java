package net.gvsun.teacherinformationcenter.controller.gvsunExam;

import net.gvsun.resource.service.ResourceContainerService;
import net.gvsun.teacherinformationcenter.service.ShareService;
import net.gvsun.teacherinformationcenter.vo.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

@Controller
@RequestMapping("/gvsunexam")
public class ExamController {
    private final ResourceContainerService resourceContainerService;
    private final ShareService shareService;

    @Value("${apiGateWayHost}")
    private String apiGateWayHost;

    @Value("${oauth2Host}")
    private String oauth2Host;

    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHost;

    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHostForUpload;

    @Value("${authorization.siteEnName}")
    private String siteEnName;

    @Value("${authorization.siteSecret}")
    private String siteSecret;

    @Value("${gvsunExam}")
    private String gvsunExam;

    public ExamController(ResourceContainerService resourceContainerService, ShareService shareService) {
        this.resourceContainerService = resourceContainerService;
        this.shareService = shareService;
    }

    /**
     * 获取当前登陆人
     * @return
     */
    @ResponseBody
    @GetMapping("/getCurrentUser")
    public net.gvsun.session.dto.User getCurrentUser(HttpServletRequest request) throws IOException {
        return shareService.getCurrentUserFromUnifySession(request);
    }

    /**
     * 考试-首页
     */
    @RequestMapping("/mainindex")
    public String learningResource(HttpServletRequest request, Map<String, Object> map, String cid, String pathType) throws IOException {
        // 获取用户信息
        net.gvsun.session.dto.User user = shareService.getCurrentUserFromUnifySession(request);
        request.getSession().setAttribute("user", user);
        request.getSession().setAttribute("cid", cid);
        map.put("cid", cid);
        map.put("pathType", pathType);
        map.put("apiGateWayHost", apiGateWayHost);
        return "/gvsunExam/mainindex";
    }
    /**
     * 考试- 权限
     */
    @RequestMapping("/switchPermissions")
    public String switchPermissions(HttpServletRequest request, Map<String, Object> map) {
        return "/gvsunExam/switchPermissions";
    }
    /**
     * 考试- 列表
     */
    @RequestMapping("/examList")
    public String examList(HttpServletRequest request, Map<String, Object> map) {
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/gvsunExam/exam/examList";
    }
    /**
     * 考试- 列表- 新增
     */
    @RequestMapping("/newExam")
    public String newExam(HttpServletRequest request, Map<String, Object> map) {
        map.put("gvsunExam", gvsunExam);
        return "/gvsunExam/exam/newExam";
    }
    /**
     * 考试- 列表- 新增- 添加题库
     */
    @RequestMapping("/addExamQuestionBank")
    public String addExamQuestionBank(HttpServletRequest request, Map<String, Object> map,String testScoreTest) {
        map.put("testScoreTest",testScoreTest);
        return "/gvsunExam/exam/addExamQuestionBank";
    }
    /**
     * 考试- 免考名单
     */
    @RequestMapping("/exemption")
    public String exemption(HttpServletRequest request, Map<String, Object> map, String examId) {
        map.put("examId", examId);
        return "/gvsunExam/exam/exemption";
    }
    /**
     * 考试- 补考名单
     */
    @RequestMapping("/makeupExamList")
    public String makeupExamList(HttpServletRequest request, Map<String, Object> map, String assignmentId) {
        map.put("assignmentId", assignmentId);
        return "/gvsunExam/exam/makeupExamList";
    }
    /**
     * 考试- 查看
     */
    @RequestMapping("/examDetail")
    public String examDetail(HttpServletRequest request, Map<String, Object> map, String assignmentId) {
        map.put("assignmentId", assignmentId);
        return "/gvsunExam/exam/examDetail";
    }
    /**
     * 考试- 考试成绩- 查看
     */
    @RequestMapping("/examScoreDetail")
    public String examScoreDetail(HttpServletRequest request, Map<String, Object> map, String assignmentId, String username, Integer gradingId, String cname) {
        map.put("assignmentId", assignmentId);
        map.put("username", username);
        map.put("gradingId", gradingId);
        map.put("cname", cname);
        return "/gvsunExam/exam/examScoreDetail";
    }

        /**
         * 考试- 编辑
         */
    @RequestMapping("/editExam")
    public String editExam(HttpServletRequest request, Map<String, Object> map, String assignmentId) {
        map.put("assignmentId", assignmentId);
        map.put("gvsunExam", gvsunExam);
        return "/gvsunExam/exam/editExam";
    }
    /**
     * 考试- 课程复制
     */
    @RequestMapping("/sameSite")
    public String sameSite(HttpServletRequest request, Map<String, Object> map, String assignmentId, String type) {
        map.put("assignmentId", assignmentId);
        map.put("type", type);
        return "/gvsunExam/exam/sameSite";
    }
    /**
     * 考试- 考试成绩
     */
    @RequestMapping("/examScore")
    public String examScore(HttpServletRequest request, Map<String, Object> map, String assignmentId, String title) {
        map.put("assignmentId", assignmentId);
        map.put("title", title);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/gvsunExam/exam/examScore";
    }
    /**
     * 考试- 考试成绩 - 未参加考试
     */
    @RequestMapping("/noExamScore")
    public String noExamScore(HttpServletRequest request, Map<String, Object> map, String assignmentId) {
        map.put("assignmentId", assignmentId);
        return "/gvsunExam/exam/noExamScore";
    }
    /**
     * 考试- 开始考试
     */
    @RequestMapping("/startExam")
    public String startExam(HttpServletRequest request, Map<String, Object> map, String assignmentId ,Boolean isLink) {
        map.put("assignmentId", assignmentId);
        map.put("isLink",isLink);
        return "/gvsunExam/exam/startExam";
    }
    /**
     * 考试- 考试答题页面
     */
    @RequestMapping("/beginExam")
    public String beginExam(HttpServletRequest request, Map<String, Object> map, String simulation, String examId) {
        map.put("simulation", simulation);
        map.put("examId", examId);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/gvsunExam/exam/beginExam";
    }
    /**
     * 考试- 教师手动打分
     */
    @RequestMapping("/examGradeDetail")
    public String examGradeDetail(HttpServletRequest request, Map<String, Object> map, String assignmentId, String username, String gradingId, String type) {
        map.put("assignmentId", assignmentId);
        map.put("username", username);
        map.put("gradingId", gradingId);
        map.put("type", type);
        return "/gvsunExam/exam/examGradeDetail";
    }

    /**
     * 测试- 首页
     */
    @RequestMapping("/testList")
    public String testList(HttpServletRequest request, Map<String, Object> map) {
        return "/gvsunExam/test/testList";
    }
    /**
     * 测试- 首页
     */
    @RequestMapping("/testScore")
    public String testScore(HttpServletRequest request, Map<String, Object> map, String assignmentId) {
        map.put("assignmentId", assignmentId);
        return "/gvsunExam/test/testScore";
    }
    /**
     * 测试- 编辑
     */
    @RequestMapping("/editTest")
    public String editTest(HttpServletRequest request, Map<String, Object> map, String assignmentId) {
        map.put("assignmentId", assignmentId);
        return "/gvsunExam/test/editTest";
    }
    /**
     * 测试- 新建
     */
    @RequestMapping("/newTest")
    public String newTest(HttpServletRequest request, Map<String, Object> map) {
        return "/gvsunExam/test/newTest";
    }
    /**
     * 测试- 新建- 题库添加
     */
    @RequestMapping("/testQuestionBankDetail")
    public String testQuestionBankDetail(HttpServletRequest request, Map<String, Object> map, String sectionIds) {
        map.put("itemIds", sectionIds);
        return "/gvsunExam/test/testQuestionBankDetail";
    }
    /**
     * 测试- 新建- 题库- 查看题目
     */
    @RequestMapping("/addTestQuestionBank")
    public String addTestQuestionBank(HttpServletRequest request, Map<String, Object> map) {
        return "/gvsunExam/test/addTestQuestionBank";
    }
    /**
     * 测试- 开始考试
     */
    @RequestMapping("/beginTest")
    public String beginTest(HttpServletRequest request, Map<String, Object> map, Integer simulation, String testId, String page ,String tId,Boolean isLink, String title, String score ) {
        map.put("simulation", simulation);
        map.put("testId", testId);
        map.put("tId", tId);
        map.put("isLink", isLink);
        map.put("page", page);
        map.put("oauth2Host", oauth2Host);
        map.put("title", title);
        map.put("score", score);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/gvsunExam/test/beginTest";
    }
    /**
     * 测试- 测试成绩- 查看
     */
    @RequestMapping("/testScoreDetail")
    public String testScoreDetail(HttpServletRequest request, Map<String, Object> map, String assignmentId, String username, String gradingId, String cname) {
        map.put("assignmentId", assignmentId);
        map.put("username", username);
        map.put("gradingId", gradingId);
        map.put("cname", cname);
        return "/gvsunExam/test/testScoreDetail";
    }

    /**
     * 设置证书- 首页
     */
    @RequestMapping("/setCertificate")
    public String setCertificate(HttpServletRequest request, Map<String, Object> map) {
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/gvsunExam/certificate/setCertificate";
    }
    /**
     * 设置证书- 编辑
     */
    @RequestMapping("/editSetCertificate")
    public String editSetCertificate(HttpServletRequest request, Map<String, Object> map, String projectName) {
        map.put("projectName", projectName);
        map.put("oauth2Host", oauth2Host);
        map.put("resourceContainerHost", resourceContainerHost);
        map.put("resourceContainerHostForUpload", resourceContainerHostForUpload);
        return "/gvsunExam/certificate/editSetCertificate";
    }

    /**
     * 考试准入- 首页
     */
    @RequestMapping("/examAccess")
    public String examAccess(HttpServletRequest request, Map<String, Object> map) {
        return "/gvsunExam/access/examAccess";
    }
}
