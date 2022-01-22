package net.gvsun.controller.datasource;

import net.gvsun.service.datasource.InvalidCacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/invalid")
public class InvalidCacheController {
    private final InvalidCacheService invalidCacheService;

    @Autowired
    public InvalidCacheController(InvalidCacheService invalidCacheService) {
        this.invalidCacheService = invalidCacheService;
    }

    @GetMapping("/getUserDataSourcesByUsernameAndPassword")
    public void getUserDataSourcesByUsernameAndPassword(@RequestParam String username,
                                                        @RequestParam String password) {
        invalidCacheService.getUserDataSourcesByUsernameAndPassword(username, password);
    }

    @GetMapping("/getUserDataSourcesByPhone")
    public void getUserDataSourcesByPhone(@RequestParam String phone) {
        invalidCacheService.getUserDataSourcesByPhone(phone);
    }

    @GetMapping("/getUserDataSourcesByQQ")
    public void getUserDataSourcesByQQ(@RequestParam String qq) {
        invalidCacheService.getUserDataSourcesByQQ(qq);
    }

    @GetMapping("/getUserDataSourcesByWechat")
    public void getUserDataSourcesByWechat(@RequestParam String wechat) {
        invalidCacheService.getUserDataSourcesByWechat(wechat);
    }

    @GetMapping("/getUserDataSourcesByGitlab")
    public void getUserDataSourcesByGitlab(@RequestParam String gitlab) {
        invalidCacheService.getUserDataSourcesByGitlab(gitlab);
    }

    @GetMapping("/getUserDataSourcesByUnionId")
    public void getUserDataSourcesByUnionId(@RequestParam String unionid) {
        invalidCacheService.getUserDataSourcesByUnionId(unionid);
    }

    @GetMapping("/all")
    public String all(HttpServletRequest request) {
        invalidCacheService.all();
        return "所有缓存已清理\n\n注意：清理所有缓存会导致一段时间内登陆缓慢，请不要频繁使用";
    }

    @GetMapping("/userExist")
    public void userExist(@RequestParam String s) {
        invalidCacheService.userExist(s);
    }
}
