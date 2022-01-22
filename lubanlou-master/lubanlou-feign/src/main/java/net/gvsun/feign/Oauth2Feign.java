package net.gvsun.feign;

import net.gvsun.common.Result;
import net.gvsun.rbac.entity.Role;
import net.gvsun.tree.JsonNode;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@FeignClient(value = "oauth2", path = "/uaa")
public interface Oauth2Feign {

    @GetMapping(value = "/user/{username}")
    String getUserByUsername(@PathVariable(value = "username") String username);

    @RequestMapping(method = RequestMethod.POST, value = "/security/setPhone?username={username}&phone={phone}")
    void setUserPhone(@RequestParam("username") String username, @RequestParam("phone") String phone);

    @RequestMapping(method = RequestMethod.GET, value = "/security/getAuthorities/{username}")
    List<Map<String, Object>> getUserAuthorities(@PathVariable(value = "username") String username);

    @RequestMapping(method = RequestMethod.POST, value = "/security/addAuthority/{username}/{clientId}/{clientAuthorityId}")
    void addUserAuthority(@PathVariable(value = "username") String username, @PathVariable(value = "clientId") String clientId, @PathVariable(value = "clientAuthorityId") int clientAuthorityId);

    @RequestMapping(method = RequestMethod.DELETE, value = "/security/deleteAuthority/{username}")
    void deleteUserAuthority(@PathVariable(value = "username") String username);

    @PostMapping(value = "/security/forbidden/{username}")
    void disableUser(@PathVariable(value = "username") String username);

    @PostMapping(value = "/security/forbidden/{username}")
    void enableUser(@PathVariable(value = "username") String username, @RequestParam(value = "enabled") boolean enabled);

    @PostMapping(value = "/security/batchForbidden")
    void batchForbidden(@RequestParam("usernames") List<String> usernames, @RequestParam("enabled") Boolean enabled);

    @GetMapping(value = "/enableLoginByPhone")
    boolean enableLoginByPhone();

    @RequestMapping(method = RequestMethod.DELETE, value = "/security/deleteAuthority/{clientId}/{username}")
    void deleteAuthority(@PathVariable(value = "clientId") String clientId, @PathVariable(value = "username") String username);

    @RequestMapping(method = RequestMethod.GET, value = "/roleResources/{roleUid}/{businessType}")
    Result getRoleResourcesByRoleIdAndType(@PathVariable(value = "roleUid") Integer roleUid, @PathVariable(value = "businessType") String businessType);

//
//    /**
//     * 获取角色的所有资源
//     *
//     * @param roleId    角色ID
//     * @param projectId 项目ID（可选），如果给定项目ID则返回角色在该项目下的所有资源，否则返回角色在所有项目下的资源
//     */
//    @GetMapping(value = "/getRoleResources")
//    JsonNode getRoleResources(@RequestParam("roleId") Integer roleId, @RequestParam(required = false,value = "projectId") Integer projectId, @RequestParam(required = false,value = "academyNumber") String academyNumber);
//
//    /**
//     * 获取所有角色
//     */
//    @GetMapping("/getAllRole")
//    List<Role> getAllRole();
}
