package net.gvsun.teacherinformationcenter.controller;

import net.gvsun.resource.dto.ResourceFileDto;
import net.gvsun.resource.service.ResourceContainerService;
import net.gvsun.teacherinformationcenter.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

@RestController
public class FileController {
    private final ResourceContainerService resourceContainerService;
    @Value("${apiGateWayHost}")
    private String apiGateWayHost;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHost;
    @Value("${resourceContainerHostForUpload}")
    private String resourceContainerHostForUpload;

    @Autowired
    public FileController(ResourceContainerService resourceContainerService) {
        this.resourceContainerService = resourceContainerService;
    }

    @GetMapping("getResourceContainerHost")
    public String resourceContainerHost() {
        return resourceContainerHost;
    }

    @PostMapping("/uploadImgToResource")
    @SuppressWarnings("unchecked")
    public Map uploadImgToResource(HttpServletRequest request, MultipartFile img, MultipartFile file) throws IOException {
        net.gvsun.session.dto.User user = (net.gvsun.session.dto.User) request.getSession().getAttribute("user");
        Map<String, String> map = new HashMap<>();
        Map<String, String> param = new HashMap<>();
        Map<String, String> header = new HashMap<>();
        MultipartFile[] upload = new MultipartFile[1];
        if (img != null) {
            upload[0] = img;
        } else if (file != null) {
            upload[0] = file;
            map.put("original", file.getOriginalFilename());
            map.put("state", "SUCCESS");
        } else {
            map.put("url", "文件为空");
            return map;
        }

        if (user != null) {
            resourceContainerService.setUsername(user.getUsername());
            long directory = resourceContainerService.createDirectory("CMS/个人主页");
            String home = System.getProperty("user.home");
            File f = Paths.get(home + file.getOriginalFilename()).toFile();
            file.transferTo(f);
            ResourceFileDto resourceFileDto = resourceContainerService.uploadFileToDirectory(f, directory);
            map.put("url", resourceFileDto.getId().toString());
        } else {
            map.put("url", "获取当前用户名失败");
        }
        return map;
    }
}
