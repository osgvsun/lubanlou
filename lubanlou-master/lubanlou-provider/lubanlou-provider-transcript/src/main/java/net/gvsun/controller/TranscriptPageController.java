package net.gvsun.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import net.gvsun.service.ShareService;
import net.gvsun.service.TranscriptService;
import net.gvsun.vo.*;
import net.gvsun.web.util.AuthorizationUtil;
import net.gvsun.web.util.CheckAuthorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;


/**
 * Created by REM on 2019/2/25.
 */
@Controller
@RequestMapping("/page")
@Api(value = "transcript")
public class TranscriptPageController {
    @Autowired
    private TranscriptService transcriptService;
    @Autowired
    private ShareService shareService;
    /**************************************************************************
     * Description 成绩册-查看分项成绩
     *
     * @author 黄浩
     * @date 2019年4月24日
     **************************************************************************/
    @RequestMapping("/gradebookList")
    @ResponseBody
    @ApiOperation(value = "查看分项成绩")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public TranscriptVo gradebookList(@RequestParam(required = true) String module,@RequestParam(required = true) Integer siteId,
                                      @RequestParam(required = true) String type,@RequestParam(required = false) Integer currpage,
                                      @RequestParam(required = false) Integer pageSize,@RequestParam(required = false) String username,
                                      @RequestParam(required = false) String cname,@RequestParam(required = false) String classesNumber) {
        TranscriptVo transcriptVo = null;

        if (currpage!=null){
            currpage = currpage - 1;
            transcriptVo = transcriptService.findTGradeRecordsPage(module, type, siteId, currpage.toString(), pageSize.toString(),cname,username,classesNumber);
        }else {
            transcriptVo = transcriptService.findTGradeRecordsPage(module, type, siteId, "", "",cname,username,classesNumber);
        }
        return transcriptVo;
    }
    /**************************************************************************
     * Description 成绩册-查看分项成绩
     *
     * @author 黄浩
     * @date 2019年4月24日
     **************************************************************************/
    @RequestMapping("/gradebookListPage")
    @ApiOperation(value = "查看分项成绩")
    @ApiImplicitParam(name = "Authorization",paramType = "header",required = true)
    public String gradebookListPage(HttpServletRequest request, Map<String,Object> map,@RequestParam(required = true) String module,@RequestParam(required = true) Integer siteId,
                                    @RequestParam(required = true) String type,@RequestParam(required = false) Integer currpage,
                                    @RequestParam(required = false) Integer pageSize,@RequestParam(required = false) String username,
                                    @RequestParam(required = false) String cname,@RequestParam(required = false) String courseNumber,
                                    @RequestParam(required = false) String classesNumber) {
        TranscriptVo transcriptVo = null;

        if (currpage!=null){
            currpage = currpage - 1;
            transcriptVo = transcriptService.findTGradeRecords(module, type, siteId, currpage.toString(), pageSize.toString(),cname,username,courseNumber,classesNumber);
        }else {
            transcriptVo = transcriptService.findTGradeRecords(module, type, siteId, "", "",cname,username,courseNumber,classesNumber);
        }
        map.put("achievements", transcriptVo);
        return "gradebook";
    }
    /**************************************************************************
     * Description 成绩册-新增成绩数据
     *
     * @author 黄浩
     * @date 2019年4月26日
     **************************************************************************/
    @RequestMapping(value = "/editRecord",method = {RequestMethod.GET})
    @ResponseBody
    @ApiOperation(value = "修改成绩数据")
    public boolean saveRecord(HttpServletRequest request,String student,Integer assignmentId,Double points){
        return transcriptService.editTranscript(student, assignmentId, points);
    }
}
