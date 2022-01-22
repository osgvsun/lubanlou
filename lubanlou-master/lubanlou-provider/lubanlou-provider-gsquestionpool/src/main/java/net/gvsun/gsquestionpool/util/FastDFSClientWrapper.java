package net.gvsun.gsquestionpool.util;

import com.github.tobato.fastdfs.domain.StorePath;
import com.github.tobato.fastdfs.exception.FdfsUnsupportStorePathException;
import com.github.tobato.fastdfs.service.FastFileStorageClient;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.Charset;

/**
 * 描述：
 * Created by wuyz on 2017/3/17.
 */
@Component
public class FastDFSClientWrapper {

    private final Logger logger = LoggerFactory.getLogger(FastDFSClientWrapper.class);

    @Autowired
    private FastFileStorageClient storageClient;

    @Value("${fdfs.storage.server}")
    private String storageServer;

//    @Autowired
//    private AppConfig appConfig;   // 项目参数配置

    /**
     * 上传文件
     * @param file 文件对象
     * @return 文件访问地址
     * @throws IOException
     */
    public String uploadFile(MultipartFile file) throws IOException {
        StorePath storePath = storageClient.uploadFile(file.getInputStream(),file.getSize(), FilenameUtils.getExtension(file.getOriginalFilename()),null);
//        return getResAccessUrl(storePath);
        return storageServer + "/" + storePath.getFullPath();
    }

    /**
     *
     * @param file
     * @return
     * @throws FileNotFoundException
     */
    public String uploadFile(File file) throws FileNotFoundException {
        FileInputStream is = new FileInputStream(file);
        StorePath storePath = storageClient.uploadFile(is, file.length(), FilenameUtils.getExtension(file.getName()), null);
        return storageServer + "/" + storePath.getFullPath();
    }

    /**
     * 将一段字符串生成一个文件上传
     * @param content 文件内容
     * @param fileExtension
     * @return
     */
    public String uploadFile(String content, String fileExtension) {
        byte[] buff = content.getBytes(Charset.forName("UTF-8"));
        ByteArrayInputStream stream = new ByteArrayInputStream(buff);
        StorePath storePath = storageClient.uploadFile(stream,buff.length, fileExtension,null);
//        return getResAccessUrl(storePath);
        return storageServer + "/" + storePath.getFullPath();
    }

//    // 封装图片完整URL地址
//    private String getResAccessUrl(StorePath storePath) {
//        String fileUrl = AppConstants.HTTP_PRODOCOL + appConfig.getResHost()
//                + ":" + appConfig.getFdfsStoragePort() + "/" + storePath.getFullPath();
//        return fileUrl;
//    }

    /**
     * 删除文件
     * @param fileUrl 文件访问地址
     * @return
     */
    public void deleteFile(String fileUrl) {
        if (StringUtils.isEmpty(fileUrl)) {
            return;
        }
        try {
            StorePath storePath = StorePath.praseFromUrl(fileUrl);
            storageClient.deleteFile(storePath.getGroup(), storePath.getPath());
        } catch (FdfsUnsupportStorePathException e) {
            logger.warn(e.getMessage());
        }
    }
}