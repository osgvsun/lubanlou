package net.gvsun.teacherinformationcenter.controller;

import net.gvsun.teacherinformationcenter.service.ShareService;
import net.gvsun.teacherinformationcenter.vo.ResultDataVO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shareApi")
@CrossOrigin
public class ShareController {
    private final ShareService shareService;

    public ShareController(ShareService shareService) {
        this.shareService = shareService;
    }

//    /**
//     * 获取文件下载地址时需要在请求中加入Authorization头，此头的数据从可以这个接口来获取，也可以从其他站点的接口获取
//     *
//     * @param username   用户名
//     * @param siteEnName 发送请求的站点名（非必填项），如果此参数为空，则使用资源容器的值，不推荐
//     * @param siteSecret 发送请求的站点密钥（非必填项），如果此参数为空，则使用资源容器的值，不推荐
//     * @return 返回resultDataVO
//     * @author 陈敬
//     * @since 2019年7月31日
//     */
//    @GetMapping("/getAuthorization")
//    public ResultDataVO<String> getAuthorization(@RequestParam String username,
//                                                 @RequestParam(value = "siteEnName", defaultValue = "") String siteEnName,
//                                                 @RequestParam(value = "siteSecret", defaultValue = "") String siteSecret) {
//        return shareService.getAuthorization(username, siteEnName, siteSecret);
//    }
}