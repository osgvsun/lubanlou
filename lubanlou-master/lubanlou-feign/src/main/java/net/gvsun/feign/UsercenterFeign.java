package net.gvsun.feign;

import net.gvsun.usercenter.internal.ResultDataDto;
import net.gvsun.usercenter.internal.UserDetailDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Description Feign-用户中心
 *
 * @author weicheng
 * @date 2021/2/2 17:39
 */
@FeignClient(value = "usercenter")
public interface UsercenterFeign {

    /**
     * Description 获取用户基础信息
     *
     * @param usernames
     * @return java.lang.String
     * @author weicheng
     * @date 2021/2/2 17:36
     */
    @GetMapping(value = "/getBasicInfo")
    ResultDataDto<List<UserDetailDto>> getBasicInfo(@RequestParam(value = "usernames") String usernames);

    /**
     * Description 获取用户位置信息
     *
     * @param username,
     * @param page,
     * @param limit
     * @return java.lang.String
     * @author weicheng
     * @date 2021/2/2 17:37
     */
    @PostMapping(value = "/getUserPositionInfo")
    String getUserPositionInfo(@RequestParam(value = "username") String username,
                               @RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
                               @RequestParam(value = "limit", required = false, defaultValue = "2147483647") Integer
                                       limit);

    /**
     * Description 获取企业用户信息
     *
     * @param username,
     * @param page,
     * @param limit
     * @return java.lang.String
     * @author weicheng
     * @date 2021/2/2 17:37
     */
    @PostMapping(value = "/getUserAdministrationInfo")
    String getUserAdministrationInfo(@RequestParam(value = "username") String username,
                                     @RequestParam(value = "page", required = false) Integer page,
                                     @RequestParam(value = "limit", required = false) Integer limit);

    @GetMapping(value = "/gvsuncms/users", consumes = "application/json")
    ResultDataDto<List<Map>> users(@RequestParam("collegeId") String collegeId);

    @PostMapping(value = "/datashare/boundPhoneNumber")
    void boundPhone(@RequestParam("username") String username, @RequestParam("phone") String phone, @RequestParam("email") String email);

    @PostMapping(value = "/enableUser")
    void enableUser(@RequestParam("username") String username);

}
