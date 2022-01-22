package net.gvsun.controller.wechatapplet;

import net.gvsun.common.Result;
import net.gvsun.datashare.external.shareddata.UserDTO;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.datasource.dto.GvsunDataSourceDto;
import net.gvsun.oauth2.internal.ResultDataDto;
import net.gvsun.entity.User;
import net.gvsun.repository.UserRepository;
import net.gvsun.service.LoginStatisticService;
import net.gvsun.service.UserDetailService;
import net.gvsun.service.datasource.DatasourceService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * 微信小程序登陆接口
 *
 * @author 陈敬
 * @since 1.2.0-SNAPSHOT
 */
@RequestMapping("/apiForMiniProgram")
@RestController
public class AppletLoginController {
    private final UserDetailService userDetailService;
    private final DatasourceService datasourceService;
    private final UserRepository userRepository;
    private final LoginStatisticService loginStatisticService;


    @Autowired
    public AppletLoginController(DatasourceService datasourceService,
                                 UserDetailService userDetailService,
                                 UserRepository userRepository,
                                 LoginStatisticService loginStatisticService) {
        this.datasourceService = datasourceService;
        this.userDetailService = userDetailService;
        this.userRepository = userRepository;
        this.loginStatisticService = loginStatisticService;
    }

    /**
     * 通过用户名/密码登陆，更新unionid
     *
     * @param username 用户名
     * @param password 密码
     * @param unionid  微信unionid
     * @return 返回用户所属的数据源
     */
    @GetMapping("/loginByUsernameAndPassword")
    public ResultDataDto<Map<String, Object>> loginByUsernameAndPassword(@RequestParam String username,
                                                                         @RequestParam String password,
                                                                         @RequestParam(defaultValue = "") String unionid) {
        ResultDataDto<Map<String, Object>> dataDto = new ResultDataDto<>(200, "success");
        List<GvsunDataSourceDto> dataSources = datasourceService.getUserDataSourcesByUsernameAndPassword(username, password);
        if (dataSources.size() == 0) {
            dataDto.setCode(404);
            dataDto.setMsg("账号或密码错误");
            dataDto.setData(null);
            return dataDto;
        }

        User user = null;
        if (!StringUtils.isEmpty(unionid)) {
            userDetailService.boundUserUnionId(username, password, unionid, UserDetailService.BoundType.USERNAME);
        }
        List<Map<String, Object>> schoolList = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSources) {
            Map<String, Object> map = new HashMap<>();
            map.put("schoolName", d.getSchoolName());
            map.put("schoolCname", d.getSchoolCname());
            //获取该数据源下有哪些系统
            List<Map<String, Object>> projects = datasourceService.getProjectsFromSchool(d.getSchoolName());
            map.put("projects", projects);
            schoolList.add(map);

            if (user == null) {
                ClientDatabaseContextHolder.set(d.getSchoolName());
                user = userRepository.findByUsernameAndPassword(username, password);
                ClientDatabaseContextHolder.clear();
            }
        }
        Map<String, Object> result = new HashMap<>();
        result.put("user", user);
        result.put("schoolList", schoolList);
        dataDto.setData(result);
        loginStatisticService.stat(DatasourceService.LoginType.UNIONID, username);
        return dataDto;
    }

    /**
     * 通过unionid登陆
     */
    @GetMapping("/loginByUnionId")
    public ResultDataDto<Map<String, Object>> loginByUnionId(@RequestParam(defaultValue = "") String unionid) {
        ResultDataDto<Map<String, Object>> dataDto = new ResultDataDto<>(200, "success");
        List<GvsunDataSourceDto> dataSources = null;
        if (!StringUtils.isEmpty(unionid)) {
            dataSources = datasourceService.getUserDataSourcesByUnionId(unionid);
        }
        if (dataSources == null || dataSources.size() == 0) {
            dataDto.setCode(404);
            dataDto.setMsg("账号或密码错误");
            dataDto.setData(null);
            return dataDto;
        }

        User user = null;
        List<Map<String, Object>> schoolList = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSources) {
            Map<String, Object> map = new HashMap<>();
            map.put("schoolName", d.getSchoolName());
            map.put("schoolCname", d.getSchoolCname());
            //获取该数据源下有哪些系统
            List<Map<String, Object>> projects = datasourceService.getProjectsFromSchool(d.getSchoolName());
            map.put("projects", projects);
            schoolList.add(map);

            if (user == null) {
                ClientDatabaseContextHolder.set(d.getSchoolName());
                user = userRepository.findByUnionid(unionid);
                ClientDatabaseContextHolder.clear();
            }
        }
        Map<String, Object> result = new HashMap<>();
        result.put("user", user);
        result.put("schoolList", schoolList);
        dataDto.setData(result);
        loginStatisticService.stat(DatasourceService.LoginType.UNIONID, unionid);
        return dataDto;
    }

    /**
     * 通过手机号和密码登陆
     *
     * @param phone    手机号
     * @param password 密码
     * @param unionid  微信的unionid
     */
    @GetMapping("/loginByPhone")
    public ResultDataDto<Map<String, Object>> loginByPhone(@RequestParam String phone,
                                                           @RequestParam String password,
                                                           @RequestParam(defaultValue = "") String unionid) {
        ResultDataDto<Map<String, Object>> dataDto = new ResultDataDto<>(200, "success");
        List<GvsunDataSourceDto> dataSources = datasourceService.getUserDataSourcesByPhone(phone);
        if (dataSources.size() == 0) {
            dataDto.setCode(404);
            dataDto.setMsg("账号或密码错误");
            dataDto.setData(null);
            return dataDto;
        }

        User user = null;
        List<Map<String, Object>> schoolList = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSources) {
            Map<String, Object> map = new HashMap<>();
            map.put("schoolName", d.getSchoolName());
            map.put("schoolCname", d.getSchoolCname());
            //获取该数据源下有哪些系统
            List<Map<String, Object>> projects = datasourceService.getProjectsFromSchool(d.getSchoolName());
            map.put("projects", projects);
            schoolList.add(map);

            if (user == null) {
                ClientDatabaseContextHolder.set(d.getSchoolName());
                user = userRepository.findByPhoneAndPassword(phone, password);
            }
        }

        if (user != null) {
            Map<String, Object> result = new HashMap<>();
            result.put("user", user);
            result.put("schoolList", schoolList);
            dataDto.setData(result);
            loginStatisticService.stat(DatasourceService.LoginType.UNIONID, phone);
            if(StringUtils.isEmpty(user.getUnionid())) {
                if (!StringUtils.isEmpty(unionid)) {
                    userDetailService.boundUserUnionId(phone, password, unionid, UserDetailService.BoundType.PHONE);
                }
            }
        } else {
            dataDto.setCode(404);
            dataDto.setMsg("账号或密码错误");
            dataDto.setData(null);
        }
        return dataDto;
    }

    @GetMapping("/logout")
    public ResultDataDto<String> logout(@RequestParam String username) {
        return new ResultDataDto<String>(200, "success");
    }

    /**
     * @description 通过手机号获取
     * @param phone 手机号
     * @param password 密码
     * @param unionid unionid
     * @author  Smark Lee
     * @date  2021/12/1
     * @return
     **/
    @GetMapping("/getUserInfo")
    public Result<UserDTO> getUserInfo(String phone, String password, String unionid){
        UserDTO dto = new UserDTO();
        User user = StringUtils.isEmpty(unionid)?userRepository.findByPhoneAndPassword(phone, password):userRepository.findByUnionid(unionid);
        if (Objects.isNull(user)){
            return Result.failed("用户不存在！");
        }
        dto.setUsername(user.getUsername());
        dto.setCname(user.getCname());
        return Result.ok(dto);
    }
}
