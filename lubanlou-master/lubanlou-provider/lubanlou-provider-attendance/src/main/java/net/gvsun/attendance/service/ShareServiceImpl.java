package net.gvsun.attendance.service;

import com.fasterxml.jackson.core.type.TypeReference;
import net.gvsun.attendance.dto.datasource.AttendanceConfig;
import net.gvsun.datasource.ClientDatabaseContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * Description : 通用方法类
 *
 * @Author : cjl
 * @CreateTime : 2021/12/22 13:55
 **/
@Service
public class ShareServiceImpl implements ShareService{
    private ClientDatabaseContext clientDatabaseContext;
    @Autowired
    public ShareServiceImpl(ClientDatabaseContext clientDatabaseContext) {
        this.clientDatabaseContext = clientDatabaseContext;
    }
    /**
     * Description 获取当前数据源配置文件
     *
     * @author chenjiali
     * @date 2021/12/22
     */
    @Override
    public AttendanceConfig getCurrentDataSourceConfiguration(){
        AttendanceConfig config = new AttendanceConfig();
        try {
            //获取当前系统的，当前学校的配置
            config = clientDatabaseContext.getCurrentConfig(new TypeReference<AttendanceConfig>() {
            });
        }catch (IOException e){
            //当解析JSON配置时可能出现一车（可能是JSON的格式不对，或者缺少某些字段），
            //捕获这些异常，做一些处理吧
            e.printStackTrace();
        }
        return config;
    }
}
