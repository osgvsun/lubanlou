package net.gvsun.gsexam.exammain.exam;

import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.service.common.ShareService;
import net.gvsun.web.util.Authorization;
import net.gvsun.web.util.AuthorizationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/shareApi")
public class ShareApi {
    @Autowired
    ShareService shareService;
    @Value("${serverHost}/gvsunDirectory/directory")
    private String directoryEngineHost;
    @Value("${serverHost}/gvsunResource/fileUpload")
    private String resourceContainerHost;
    @Value("${serverHost}/gvsunVisual/visualization")
    private String visualHost;

    @RequestMapping("/getHosts")
    public Map getHosts() {
        Map<String, String> results = new HashMap<String, String>();
        results.put("directoryEngineHost", directoryEngineHost);
        results.put("resourceContainerHost", resourceContainerHost);
        results.put("visualHost", visualHost);
        return results;
    }

    @RequestMapping("/getAuthorization")
    public String getAuthorization() {
        //获取用户
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String un;
        if (auth.getPrincipal() instanceof UserDetails) {
            un = ((UserDetails) auth.getPrincipal()).getUsername();
        } else {
            un = auth.getPrincipal().toString();
        }
        UserVo userVo = shareService.getUserByUsername(un);
        if (userVo != null) {
            Authorization authorization;
            if (userVo.getUsername() == null) {
                //未登录，则用户名为空字符串
                authorization = AuthorizationUtil.getAuthorization("");
            } else {
                //登录后，则传入用户名
                authorization = AuthorizationUtil.getAuthorization(userVo.getUsername());
            }
            //验证获取认证是否成功
            if (authorization != null && authorization.getRequestState().equals("success")) {
                //成功后返回JWT Token
                return authorization.getJwtToken();
            } else {
                //失败时返回失败代码
                return authorization.getErrorCode();
            }
        } else {
            return "notAllowed";
        }
    }


}
