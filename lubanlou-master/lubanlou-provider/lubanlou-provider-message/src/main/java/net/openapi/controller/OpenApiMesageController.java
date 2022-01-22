package net.openapi.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.domain.Message;
import net.domain.MessageTopic;
import net.domain.Project;
import net.gvsun.common.Result;
import net.openapi.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/openApi/message")
@Api(value = "api-message", description = "消息服务接口")
public class OpenApiMesageController {
    @Autowired
    private OpenApiMessageService openApiMessageService;
    @Autowired
    private OpenApiMessageTopicService openApiMessageTopicService;
    @Autowired
    private OpenApiProjectService openApiProjectService;
    @Autowired
    private OpenApiSmsTemplateService openApiSmsTemplateService;
    @Autowired
    private OpenApiSmsSignatureService openApiSmsSignatureService;
    /*************************************************************************************
     * Description:查询消息
     *
     * @author: 曹焕
     * @date: 2021/02/02
     *************************************************************************************/
    @PostMapping("/GetMessageInfo")
    @ApiOperation("查询消息信息")
    public Result findMessage(Integer page, Integer limit,String search) throws Exception{

            Page<Message> messagePage = new Page<>(page, limit);
            QueryWrapper<Message> buildQueryWrapper = new QueryWrapper<>();
            if (Objects.nonNull(search) && !search.trim().isEmpty()) {
                buildQueryWrapper.like("message_content", search);
            }

          messagePage = openApiMessageService.page(messagePage, buildQueryWrapper);
            return  Result.ok(messagePage);
    }
    /*************************************************************************************
     * Description:查询消息所涉及到的主题
     *
     * @author: 曹焕
     * @date: 2021/02/02
     *************************************************************************************/
    @PostMapping("/GetMessageTopic")
    @ApiOperation("查询消息所涉及到的主题")
    public Result findMessageTopic(Integer page, Integer limit) throws Exception{
        Page<MessageTopic> messagePage = new Page<>(page, limit);
        QueryWrapper<MessageTopic> buildQueryWrapper = new QueryWrapper<>();
        messagePage = openApiMessageTopicService.page(messagePage, buildQueryWrapper);
        return  Result.ok(messagePage);
    }
    /*************************************************************************************
     * Description:查询消息所涉及到的项目
     *
     * @author: 曹焕
     * @date: 2021/02/02
     *************************************************************************************/
    @PostMapping("/GetMessageProject")
    @ApiOperation("查询消息所涉及到的项目")
    public Result findMessageProject(Integer page, Integer limit) throws Exception{
        Page<Project> messagePage = new Page<>(page, limit);
        QueryWrapper<Project> buildQueryWrapper = new QueryWrapper<>();
        messagePage = openApiProjectService.page(messagePage, buildQueryWrapper);
        return  Result.ok(messagePage);
    }
    /*************************************************************************************
     * Description:查询消息所涉及到的项目
     *
     * @author: 曹焕
     * @date: 2021/02/02
     *************************************************************************************/
    @GetMapping("/GetSmsTemplate")
    @ApiOperation("查询消息所涉及到的项目")
    public Result GetSmsTemplate() {
       return Result.ok(openApiSmsTemplateService.list());
    }
    /*************************************************************************************
     * Description:查询消息所涉及到的项目
     *
     * @author: 曹焕
     * @date: 2021/02/02
     *************************************************************************************/
    @GetMapping("/GetSmsSignature")
    @ApiOperation("查询消息所涉及到的项目")
    public Result GetSmsSignature() {
        return Result.ok(openApiSmsSignatureService.list());
    }


}
