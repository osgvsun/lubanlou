package net.gvsun.controller.resourcecontainer;

import net.gvsun.oauth2.internal.FastDFS;
import net.gvsun.oauth2.internal.ResultDataDto;
import net.gvsun.entity.Department;
import net.gvsun.entity.User;
import net.gvsun.repository.DepartmentRepository;
import net.gvsun.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/resource")
public class Resource {
    private final RedisTemplate<String, FastDFS> redisTemplate;
    private final DepartmentRepository departmentRepository;
    private final JdbcOperations jdbcOperations;
    private final UserRepository userRepository;

    public Resource(RedisTemplate<String, FastDFS> redisTemplate,
                    DepartmentRepository departmentRepository,
                    JdbcOperations jdbcOperations,
                    UserRepository userRepository) {
        this.redisTemplate = redisTemplate;
        this.departmentRepository = departmentRepository;
        this.jdbcOperations = jdbcOperations;
        this.userRepository = userRepository;
    }

    /**
     * @description 获取redis中的资源容器配置
     * @author  未知
     * @updater  Smark Lee 存在安全问题，重新封装dto
     * @date  2021/11/29
     * @return
     **/
    @GetMapping("/getResourceHosts")
    public FastDFS getResourceHosts() {
        return FastDFS.getFastDFS(redisTemplate.opsForValue().get("platform-resource-fastDFS"));
    }

    @GetMapping("/getUserDepartment")
    public List<Department> getUserDepartment(String username) {
        return departmentRepository.findByUsername(username);
    }

    @GetMapping("/getUsernameByDepartmentId")
    public List<String> getUsernameByDepartmentId(Long departmentId) {
        String us = jdbcOperations.queryForObject("SELECT GROUP_CONCAT(users.username) FROM users INNER JOIN user_department as ud on users.username = ud.username where ud.department_id = ?",
                String.class, departmentId);
        List<String> usernames = new ArrayList<>();
        if (!StringUtils.isEmpty(us)) {
            String[] split = us.split(",");
            for (String s : split) {
                if (!StringUtils.isEmpty(s))
                    usernames.add(s);
            }
        }
        return usernames;
    }

    @GetMapping("/getDepartments")
    public List<Department> getDepartmemts() {
        return departmentRepository.findAll();
    }

    /**
     * 分页获取所有用户
     */
    @GetMapping("/users")
    public ResultDataDto<List<User>> users(@RequestParam(value = "page") Integer page,
                                           @RequestParam(value = "limit") Integer limit) {
        ResultDataDto<List<User>> res = new ResultDataDto<>(0, "success");
        if (page < 1)
            page = 1;
        if (limit < 1)
            limit = 1;
        Page<User> users = userRepository.findAll(PageRequest.of(page - 1, limit));
        res.setData(users.getContent());
        res.setCount(users.getTotalElements());
        return res;
    }

    @GetMapping("/search")
    public ResultDataDto<List<User>> search(String cname) {
        List<User> users = userRepository.findByCnameStartsWith(cname);
        ResultDataDto<List<User>> res = new ResultDataDto<>(0, "success");
        res.setData(users);
        res.setCount((long) users.size());
        return res;
    }

    /**
     * 分页获取所有部门用户
     */
    /*@GetMapping("/department/users")
    public ResultDataDto<List<User>> users(@RequestParam Integer departmentId,
                                           @RequestParam(value = "page") Integer page,
                                           @RequestParam(value = "limit") Integer limit) {
        ResultDataDto<List<User>> res = new ResultDataDto<>(0, "success");
        if (page < 1)
            page = 1;
        if (limit < 1)
            limit = 1;
        Page<User> users = userRepository.findUsersByDepartmentId(departmentId, PageRequest.of(page - 1, limit));
        res.setData(users.getContent());
        res.setCount(users.getTotalElements());
        return res;
    }*/
}
