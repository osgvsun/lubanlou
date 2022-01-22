package net.gvsun.controller;

import net.gvsun.common.Result;
import net.gvsun.rbac.entity.Permission;
import net.gvsun.rbac.entity.Resource;
import net.gvsun.rbac.service.RBACService;
import net.gvsun.rbac.service.RoleService;
import net.gvsun.tree.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/rbac")
public class RbacController {
    private final RBACService rbacService;
    @Autowired
    public RbacController(RBACService rbacService) {
        this.rbacService = rbacService;
    }
    /**
     * 添加新资源
     */
    @PostMapping("/addResource")
    public JsonNode addResource(@RequestBody Resource resource) {
        return rbacService.addResource(resource.getName(), resource.getParentId().toString(), resource.getPermissions(), resource.getDetail());
    }

    /**
     * 删除资源节点
     */
    @DeleteMapping("/deleteResource")
    public JsonNode deleteResource(String id) {
        return rbacService.deleteResource(id);
    }

    /**
     * 给资源添加新的许可
     */
    @PostMapping("/addPermissionToResource")
    public JsonNode addPermissionToResource(@RequestBody Resource2 resource) throws IOException {
        return rbacService.addPermissionToResource(resource.getId().toString(), new HashSet<>(resource.getPermissions()));
    }


    /**
     * 给角色分配资源和许可
     */
    @PostMapping("/allocationResourceToRole")
    public void sd(@RequestBody Role role) throws IOException {
        rbacService.allocationResourceToRole(role.getRoleId(),role.getAcademyNumber(), role.getResources());
    }

    /**
     * 删除角色拥有的资源，子资源也一并删除
     *
     * @param roleId      角色ID
     * @param resourceIds 要删除的资源
     */
    @DeleteMapping("/deleteResourceFromRole")
    public void deleteResourceFromRole(Integer roleId, String[] resourceIds) {
        Set<String> ids = new HashSet<>(Arrays.asList(resourceIds));
        rbacService.deleteResourceFromRole(roleId, ids);
    }

    /**
     * 删除角色所拥有资源的某些许可
     *
     * @param roleId      角色ID
     * @param resourceId  资源ID
     * @param permissions 要删除的许可ID
     */
    @DeleteMapping("/deletePermissionFromRole")
    public void deletePermissionFromRole(Integer roleId, Integer resourceId, Integer[] permissions) {
        Set<Integer> ids = new HashSet<>(Arrays.asList(permissions));
        rbacService.deletePermissionFromRole(roleId, resourceId, ids);
    }


    /**
     * 获取指定角色拥有的资源和许可（这里的许可是指角色对该资源可行使的许可，是资源许可的子集）
     */
    @GetMapping("/getRoleResources")
    public JsonNode getRoleResources(String roleId, @RequestParam(required = false) Integer projectId,@RequestParam(required = false) String academyNumber) throws IOException {
        final JsonNode rootJsonNode = rbacService.getRoleResources(roleId,academyNumber);
        if (StringUtils.isEmpty(projectId))
            return rootJsonNode;
        else {
            if (rootJsonNode != null) {
                for (JsonNode n : rootJsonNode.getChildren()) {
                    if (n.getUid().equals(projectId)) {
                        return n;
                    }
                }
            }
        }
        return new JsonNode();
    }

    /**
     * 获取指定角色拥有的资源和许可（这里的许可是指角色对该资源可行使的许可，是资源许可的子集）
     */
    @ResponseBody
    @GetMapping("/roleResources/{roleUid}/{businessType}")
    public Result getRoleResourcesByUidAndType(@PathVariable(value = "roleUid") Integer roleUid,@PathVariable(value = "businessType") String businessType) throws IOException {
        return Result.ok(rbacService.getRoleResourcesByUidAndType(roleUid,businessType));
    }

    /**
     * 获取资源树
     */
    @GetMapping("getResourceTree")
    public JsonNode getResourceTree(@RequestParam(required = false) String id) {
        if (id == null)
            return rbacService.getResourceTree();
        else
            return rbacService.getResourceTree(id);
    }

    /**
     * 获取所有的许可
     */
    @GetMapping("/getAllPermission")
    public List<Permission> getAllPermission() {
        return rbacService.getAllPermission();
    }

    @PostMapping("/addPermission")
    public Permission addPermission(String name, Boolean inheritable) {
        final Permission permission = new Permission();
        permission.setName(name);
        permission.setInheritable(inheritable);
        return rbacService.addPermission(permission);
    }

    @DeleteMapping("/deletePermission")
    public Permission addPermission(int uid) {
        return rbacService.deletePermission(uid);
    }

    /**
     * 获取所有的角色
     */
    @GetMapping("/getAllRole")
    public List<net.gvsun.rbac.entity.Role> getAllRole() {
        return rbacService.getAllRole();
    }

    @PostMapping("/addRole")
    public net.gvsun.rbac.entity.Role addRole(String name, @RequestParam(required = false) String ename, @RequestParam(required = false) String cname,
                                              @RequestParam(required = false) Integer type) {
        final net.gvsun.rbac.entity.Role role = new net.gvsun.rbac.entity.Role();
        role.setName(name);
        role.setEname(ename);
        role.setType(type);
        role.setCname(cname);
        return rbacService.addRole(role);
    }

    @DeleteMapping("/deleteRole")
    public net.gvsun.rbac.entity.Role deleteRole(int uid) {
        return rbacService.deleteRole(uid);
    }

    public static class Resource {
        private Integer parentId;
        private String name;
        private Map<String, Object> detail;
        private List<Permission> permissions;


        public Map<String, Object> getDetail() {
            return detail;
        }

        public void setDetail(Map<String, Object> detail) {
            this.detail = detail;
        }

        public Integer getParentId() {
            return parentId;
        }

        public void setParentId(Integer parentId) {
            this.parentId = parentId;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public List<Permission> getPermissions() {
            return permissions;
        }

        public void setPermissions(List<Permission> permissions) {
            this.permissions = permissions;
        }
    }

    public static class Resource2 {
        private Integer id;
        private String name;
        private List<Permission> permissions;


        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public List<Permission> getPermissions() {
            return permissions;
        }

        public void setPermissions(List<Permission> permissions) {
            this.permissions = permissions;
        }
    }

    public static class Role {
        private Integer roleId;
        private Set<net.gvsun.rbac.entity.Resource> resources;

        private String academyNumber;

        public Integer getRoleId() {
            return roleId;
        }

        public void setRoleId(Integer roleId) {
            this.roleId = roleId;
        }

        public Set<net.gvsun.rbac.entity.Resource> getResources() {
            return resources;
        }

        public void setResources(Set<net.gvsun.rbac.entity.Resource> resources) {
            this.resources = resources;
        }
        public String getAcademyNumber() {
            return academyNumber;
        }

        public void setAcademyNumber(String academyNumber) {
            this.academyNumber = academyNumber;
        }

    }
}
