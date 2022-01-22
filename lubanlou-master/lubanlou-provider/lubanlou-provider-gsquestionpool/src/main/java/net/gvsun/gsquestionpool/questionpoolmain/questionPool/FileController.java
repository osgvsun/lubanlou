package net.gvsun.gsquestionpool.questionpoolmain.questionPool;

import net.gvsun.gsquestionpool.util.FastDFSClientWrapper;
import net.gvsun.gsquestionpool.vo.common.WangeditorUploadVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Created by Administrator on 2017/12/16.
 */
@Controller
@RequestMapping("/file")
public class FileController {
    @Autowired
    private FastDFSClientWrapper fastDFSClientWrapper;

    @RequestMapping("/editorPicUpload")
    public @ResponseBody
    WangeditorUploadVo editorPicUpload(@RequestParam("editorPic")MultipartFile file){
        if(!file.isEmpty()){
            try {
                String fileUrl = fastDFSClientWrapper.uploadFile(file);
                WangeditorUploadVo wangeditorUploadVo = new WangeditorUploadVo();
                wangeditorUploadVo.setErrno(0);
                wangeditorUploadVo.setData(new String[]{fileUrl});
                return wangeditorUploadVo;
            } catch (IOException e) {
                return null;
            }
        } else {
            return null;
        }
    }
}
