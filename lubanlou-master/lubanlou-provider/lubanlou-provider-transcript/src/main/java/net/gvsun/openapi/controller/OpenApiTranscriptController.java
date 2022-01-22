package net.gvsun.openapi.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import net.gvsun.common.Result;
import net.gvsun.dto.ReportWeightDto;
import net.gvsun.openapi.service.OpenApiTranscriptService;
import net.gvsun.service.ShareService;
import net.gvsun.service.TranscriptService;
import net.gvsun.vo.*;
import net.gvsun.vo.practicetimetable.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;


/**
 * Created by REM on 2019/2/25.
 */
@RestController
@Api(value = "transcript")
@RequestMapping("/openApi")
public class OpenApiTranscriptController {
    @Autowired
    private OpenApiTranscriptService openApiTranscriptService;
    @Value("${apiGateWayHost}")
    private String apiGateWayHost;
    /**************************************************************************
     * Description 成绩册-创建成绩册
     *
     * @author 黄浩
     * @date 2019年4月26日
     **************************************************************************/
    @PostMapping("/createGradeBook")
    @ApiOperation(value = "创建成绩册")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public Result createGradeBook(@RequestParam(required = true) Integer siteId, @RequestParam(required = true) String siteName, @RequestParam(required = false) Integer assignmentId,
                                  @RequestParam(required = false) String assignmentTitle, @RequestParam(required = true) String type, @RequestParam(required = true) Double weight,
                                  @RequestParam(required = true) String module, @RequestParam(required = false) Integer experimentId, @RequestParam(required = false) String experimentTitle,
                                  @RequestParam(required = false) String courseNumber, @RequestParam(required = false)String product, @RequestParam(required = false)String termNumber,
                                  @RequestParam(required = false)String termName, @RequestParam(required = false)Integer isOpen, HttpServletRequest request){
        return openApiTranscriptService.createGradeBook(siteId,siteName,assignmentId,assignmentTitle,type,weight,module,experimentId,experimentTitle,courseNumber,product,termNumber,termName,isOpen);
    }
    /**************************************************************************
     * Description 成绩册-批量添加学生
     *
     * @author 黄浩
     * @date 2019年10月21日
     **************************************************************************/
    @PostMapping("/insertStudentsApi")
    @ResponseBody
    @ApiOperation(value = "批量添加学生")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public Result insertStudentsApi(@RequestBody List<UserVo> data){
        return openApiTranscriptService.insertStudents(data);
    }
    /**************************************************************************
     * Description 提交到成绩册（教学）
     *
     * @author 黄浩
     * @date 2020年3月30日
     **************************************************************************/
    @PostMapping("/submitTranscriptApi")
    @ResponseBody
    @ApiOperation(value = "提交到成绩册（教学）")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public Result submitTranscriptApi(@RequestBody List<UserRecordVo> data){
        return openApiTranscriptService.submitTranscript(data);
    }
    /**************************************************************************
     * Description 成绩册-新增成绩数据
     *
     * @author 黄浩
     * @date 2019年4月26日
     **************************************************************************/
    @PostMapping("/saveRecord")
    @ApiOperation(value = "新增成绩数据")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public Result saveRecord(@RequestParam(required = true) Integer siteId,@RequestParam(required = false) Integer assignmentId,@RequestParam(required = true) Double points,
                                   @RequestParam(required = true) String username, @RequestParam(required = true) String cname,@RequestParam(required = false)String module,
                                   @RequestParam(required = false)Integer experimentId,@RequestParam(required = false) String courseNumber,HttpServletRequest request){
        return openApiTranscriptService.saveRecord(siteId,assignmentId,username,cname,points,module,experimentId,courseNumber);
    }
}
