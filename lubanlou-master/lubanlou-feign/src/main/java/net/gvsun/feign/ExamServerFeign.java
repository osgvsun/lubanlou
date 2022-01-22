package net.gvsun.feign;

import io.swagger.annotations.ApiParam;
import net.gvsun.examserver.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * Description
 *
 * @author:lay
 * @date: 2021/1/25 08:22
 */
@FeignClient(name = "examserver")
public interface ExamServerFeign {
    /**
     * @param questionPoolStr(所有题库id，以逗号分割的字符串形式)
     * @return
     * @description 根据题库ids获取所有题库
     * @author SmarkLee
     * @date 2021/5/26
     **/
    @PostMapping(value = "/questionPoolApi/getQuestionPoolWithIds")
    List<QuestionPoolDTO> getQuestionPoolWithIds(@RequestParam("questionPoolStr") String questionPoolStr);

    /**
     * @param questionPoolId 题库ID
     * @param quantity       题库数量
     * @param type           题库类型
     * @return java.lang.String
     * @Description 查看剩余题目数量
     * @author SmarkLee
     * @Date 2021/1/23 20:51
     **/
    @PostMapping(value = "/examApi/checkTestItemCount")
    String checkTestItemCount(@RequestParam("questionPoolId") Integer questionPoolId, @RequestParam("quantity")  Integer quantity, @RequestParam("type") String type);

    /**************************************************************************
     * Description 保存考试基本信息，并返回考试ID
     * @param examDTO 考试基本参数
     * @author 吴奇臻
     * @date 2019-07-17
     **************************************************************************/
    @PostMapping(value = "/examApi/saveTest")
    Integer saveExam(@RequestBody ExamDTO examDTO);

    /**************************************************************************
     * Description 根据试题ID,获取考试基本信息
     *
     * @author 吴奇臻
     * @date 2019-07-26
     **************************************************************************/
    @PostMapping(value = "/examApi/getExamInfo")
    ExamDTO getExamInfo(@RequestParam("assignmentId") Integer assignmentId);

    /**************************************************************************
     * Description 根据试题ID,获取考试组成基本信息
     *
     * @author 吴奇臻
     * @date 2019-07-26
     **************************************************************************/
    @PostMapping(value = "/examApi/getExamTAssignmentComponent")
    List<ExamTAssignmentComponentDTO> getExamTAssignmentComponent(@RequestParam("assignmentId") Integer assignmentId);

    /**************************************************************************
     * Description 发起考试，并获取此次考试ID
     *
     * @author 吴奇臻
     * @date 2019-07-17
     **************************************************************************/
    @GetMapping(value = "/examApi/getExamRealId")
    public Integer getExamRealId(@RequestParam("examId") Integer examId, @RequestParam("username") String username,@RequestParam("status") Integer status);

    /**************************************************************************
     * Description 根据当前考试ID，获取考试内容
     *
     * @author 吴奇臻
     * @date 2019-07-17
     **************************************************************************/
    @GetMapping(value = "/examApi/getExamDetail")
    public ExamDetailDTO getExamDetail(@RequestParam("examId") Integer examId, @RequestParam("username") String username, @RequestParam("pageNumber") Integer pageNumber);

    /**************************************************************************
     * Description 根据当前考试ID，获取考试内容
     *
     * @author 吴奇臻
     * @date 2019-07-18
     **************************************************************************/
    @PostMapping(value = "/examApi/getTAssignmentItemMapping")
    public TAssignmentItemMappingRecordsDTO getTAssignmentItemMapping(@RequestParam("examId") Integer examId, @RequestParam("username") String username);

    /**************************************************************************
     * Description 提交考试内容，保存答题详情，计算得分，并返回考试父级考试ID
     *
     * @author 吴奇臻
     * @date 2019-07-18
     **************************************************************************/
    @PostMapping(value = "/examApi/submitExam")
    public Integer submitExam(@RequestBody ExamSubmitDetailDTO examSubmitDetailDTO);

    /**************************************************************************
     * Description 获取提交考试后的最终准入考试结果
     *
     * @author 吴奇臻
     * @date 2019-07-19
     **************************************************************************/
    @PostMapping(value = "/examApi/getExamResultDetail")
    public ExamResultDTO getExamResultDetail(@RequestParam("examId") Integer examId, @RequestParam("username") String username, @RequestParam("accessScore") String accessScore);

    /**************************************************************************
     * Description 获取考试人剩余考试次数
     *
     * @author 吴奇臻
     * @date 2019-07-19
     **************************************************************************/
    @PostMapping(value = "/examApi/getExamRemainingTime")
    Integer getExamRemainingTime(@RequestParam("examId") Integer examId, @RequestParam("username") String username);

    /**************************************************************************
     * Description 保存多对多关联信息
     *
     * @author 吴奇臻
     * @date 2019-12-02
     **************************************************************************/
    @PostMapping(value = "/examApi/saveBusinessRelatedInfo")
    public String saveBusinessRelatedInfo(@RequestParam("businessId") String businessId, @RequestParam("examId") Integer examId, @RequestParam("businessType") String businessType);

    /**************************************************************************
     * Description 保存题库说明，并返回题库ID
     * @param questionPoolDTO   题库说明所需相关参数
     * @author 吴奇臻
     * @date 2019-07-10
     **************************************************************************/
    @PostMapping(value = "questionPoolApi/saveQuestionPool")
    public Integer saveQuestionPool(@RequestBody QuestionPoolDTO questionPoolDTO);

    /**************************************************************************
     * Description 保存试题并返回状态
     * @param questionSaveDTO   试题相关内容，答案相关内容为逗号分割的String字符串
     * @author 吴奇臻
     * @date 2019-07-11
     **************************************************************************/
    @PostMapping(value = "questionPoolApi/saveQuestion")
    public String saveQuestion(@RequestBody QuestionSaveDTO questionSaveDTO);

    /**************************************************************************
     * Description 获取试题列表
     * @param questionPoolId 题库编号
     * @param currPage  当前页
     * @param pageSize  页面大小
     * @param type  题目类型
     * @param name  题干内容，用于搜索试题
     * @author 吴奇臻
     * @date 2019-07-11
     **************************************************************************/
    @PostMapping(value = "questionPoolApi/getQuestionPoolContent")
    public QuestionPoolDTO getQuestionPoolContent(@RequestParam("questionPoolId") Integer questionPoolId,
                                                  @RequestParam("currPage") Integer currPage,
                                                  @RequestParam("pageSize") Integer pageSize,
                                                  @RequestParam(value = "type",required = false) Integer type,
                                                  @RequestParam(value = "name",required = false) String name);

    /**************************************************************************
     * Description 根据题目ID获取试题内容
     * @param questionId 试题编号
     * @author 吴奇臻
     * @date 2019-07-11
     **************************************************************************/
    @PostMapping(value = "questionPoolApi/getQuestionById")
    public QuestionDTO getQuestionById(@RequestParam("questionId") Integer questionId);

    /**************************************************************************
     * Description 删除题库试题
     * @param questionPoolId 题库编号
     * @param itemId 试题编号
     * @author 吴奇臻
     * @date 2019-07-11
     **************************************************************************/
    @PostMapping(value = "questionPoolApi/deleteTAssignmentItem")
    String deleteTAssignmentItem(@RequestParam("questionPoolId") Integer questionPoolId,
                                 @RequestParam("itemId") Integer itemId);

    /**************************************************************************
     * Description 题库导入接口，返回layui插件状态值(上传文件)
     * @param file  模板格式题库文件
     * @param questionPoolId    题库编号
     * @author 吴奇臻
     * @date 2019年07月16日
     **************************************************************************/
    @PostMapping(value = "questionPoolApi/importQuestionPoolItem")
    Object upload(@RequestParam(value = "file") MultipartFile file, @RequestParam("questionPoolId") Integer questionPoolId);

    /**************************************************************************
     * Description 考试列表-添加试题-根据题库id获取包含的试题类型及数量
     * @param questionPoolId    题库编号
     * @author 陈乐为
     * @date 2019-11-29
     **************************************************************************/
    @PostMapping(value = "questionPoolApi/getQuestionTypeByPoolId")
    Map<Integer, String> getQuestionTypeByPoolId(@ApiParam(value = "题库编号", required = true) @RequestParam("questionPoolId") Integer questionPoolId);
}
