package net.gvsun.gsquestionpool.service.common;

import net.gvsun.gsquestionpool.domain.Authority;
import net.gvsun.gsquestionpool.domain.FanDataSource;
import net.gvsun.gsquestionpool.domain.User;
import net.gvsun.gsquestionpool.dto.AuthorityVo;
import net.gvsun.gsquestionpool.dto.DataResourceVO;
import net.gvsun.gsquestionpool.dto.PageModel;
import net.gvsun.gsquestionpool.dto.UserVo;
import net.gvsun.gsquestionpool.jpa.AuthorityJPA;
import net.gvsun.gsquestionpool.jpa.FanDataSourceJAP;
import net.gvsun.gsquestionpool.jpa.UserJPA;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.File;
import java.util.*;

@Service("shareService")
public class ShareServiceImpl implements ShareService {
    private String showDeviceURL;
    @PersistenceContext
    private EntityManager entityManager;
    /*
     * 将UserJPA引入，并重命名为userJPA;
     */
    @Autowired
    private UserJPA userJPA;
    @Autowired
    private AuthorityJPA authorityJPA;
    @Autowired
    private FanDataSourceJAP fanDataSourceJAP;

    /**************************************************************************
     * Description 通用模块-获取登录用户信息
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
    @Override
    public UserVo getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && (!AnonymousAuthenticationToken.class.isAssignableFrom(auth.getClass()))) {
            UserDetails userDetails = (UserDetails) auth;
            User user = userJPA.findOne(userDetails.getUsername());
            UserVo userVo = new UserVo();
            BeanUtils.copyProperties(userVo,user);
            return userVo;
        } else {
            return null;
        }
    }
    @Override
    public String findStageMangeByType(){
        String sql="select image_url from stage_manage where type=3 order by id desc";
        List<String> list=entityManager.createNativeQuery(sql).getResultList();
        if(list.size()>0){
            return list.get(0);
        }else{
            return null;
        }
    }
    /**************************************************************************
     * Description 通用模块-根据username获取用户信息
     *
     * @author 魏诚
     * @date 2017-08-16
     **************************************************************************/
    @Override
    public UserVo getUserByUsername(String username){
        User user = userJPA.findOne(username);
        UserVo userVo = new UserVo();
        userVo.setCname(user.getCname());
        userVo.setUsername(user.getUsername());
        userVo.setPassword(user.getPassword());
        Set<AuthorityVo> authorityVos = new HashSet<AuthorityVo>();
        for(Authority authority:user.getAuthorities()){
            AuthorityVo authorityVo = new AuthorityVo();
            authorityVo.setAuthorityName(authority.getAuthorityName());
            authorityVo.setCname(authority.getCname());
            authorityVo.setId(authority.getId());
            authorityVos.add(authorityVo);
        }
        userVo.setAuthorities(authorityVos);
        return userVo;
    }

    /**************************************************************************
     * Description 通用模块-根据authorityName获取權限信息
     *
     * @author 魏诚
     * @date 2017-08-16
     **************************************************************************/
    @Override
    public AuthorityVo getAuthorityByName(String authorityName){
        Authority authority = authorityJPA.getAuthorityByAuthorityName(authorityName);
        AuthorityVo authorityVo = new AuthorityVo();
        authorityVo.setCname(authority.getCname());
        authorityVo.setId(authority.getId());
        authorityVo.setAuthorityName(authority.getAuthorityName());
        return authorityVo;
    }

    /***********************************************************************************************
     * Description ：通用模塊service層定義-修改登录的角色
     *
     * @作者：魏诚
     * @日期：2016-11-17
     ***********************************************************************************************/
    @Override
    public void changeRole(final String authorityName) {

        final SecurityContext context = SecurityContextHolder.getContext();
        final Object credentials = context.getAuthentication().getCredentials();
        final Object details = context.getAuthentication().getDetails();
        final Object principal = context.getAuthentication().getPrincipal();
        final String name = context.getAuthentication().getName();

        Authentication authentication = new Authentication() {
            private static final long serialVersionUID = 1L;
            @Override
            public String getName() {
                return name;
            }
            @Override
            public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
            }
            @Override
            public boolean isAuthenticated() {
                return true;
            }
            @Override
            public Object getPrincipal() {
                return principal;
            }
            @Override
            public Object getDetails() {
                return details;
            }
            @Override
            public Object getCredentials() {
                return credentials;
            }
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                List<GrantedAuthority> authorities = new LinkedList<GrantedAuthority>();
                authorities.add(new SimpleGrantedAuthority("ROLE_"+authorityName));
                return authorities;
            }
        };
        context.setAuthentication(authentication);
    }

    /**************************************************************************
     * Description 通用模块-分页展示信息
     *
     * @author lixueteng
     * @date 2017-09-21
     **************************************************************************/
    @Override
    public Map<String, Integer> getPage(int currpage, int pageSize, int totalRecords){
        Map<String, Integer> map = new HashMap<String, Integer>();
        PageModel pageModel = new PageModel();
        pageModel.setTotalRecords(totalRecords);
        pageModel.setPageSize(pageSize);
        pageModel.setCurrpage(currpage);
        map.put("totalPage", pageModel.getTotalPage());
        map.put("nextPage", pageModel.getNextPage());
        map.put("previousPage", pageModel.getPreiviousPage());
        map.put("firstPage", pageModel.getFisrtPage());
        map.put("lastPage", pageModel.getLastPage());
        map.put("currpage", pageModel.getCurrpage());
        map.put("totalRecords", totalRecords);
        map.put("pageSize", pageSize);
        return map;
    }
    /**************************************************************************
     * Description 根据用户名获取用户权限信息
     *
     * @author 罗璇
     * @date 2017年10月26日
     **************************************************************************/
    @Override
    public List<AuthorityVo> findAuthByUsername(String username) {
        Set<Authority> authorityList = userJPA.findOne(username).getAuthorities();
        List<AuthorityVo> rs = new ArrayList<>();
        for(Authority authority : authorityList){
            AuthorityVo authorityVo = new AuthorityVo();
            authorityVo.setId(authority.getId());
            authorityVo.setAuthorityName(authority.getAuthorityName());
            authorityVo.setCname(authority.getCname());
            rs.add(authorityVo);
        }
        return rs;
    }
    /**************************************************************************
     * Description 根据权限名获取权限信息
     *
     * @author 罗璇
     * @date 2017年10月26日
     **************************************************************************/
    @Override
    public AuthorityVo findAuthVoByAuthId(Integer authId) {
        Authority authority = authorityJPA.findOne(authId);
        AuthorityVo rs = new AuthorityVo();
        rs.setId(authority.getId());
        rs.setAuthorityName(authority.getAuthorityName());
        rs.setCname(authority.getCname());
        return rs;
    }
    @Override
    public Boolean changeDataResource(String dataSource) {
        Boolean flag = true;
        try {
            FanDataSource fanDataSource = fanDataSourceJAP.findFanDataSourceByName(dataSource);
            System.out.println(fanDataSource.getcName());
        } catch (Exception e) {
            e.printStackTrace();
            flag = false;
        }
        return flag;
    }

    @Override
    public List<DataResourceVO> findAllDataResource() {
        List<FanDataSource> fanDataSources = fanDataSourceJAP.findAll();
        List<DataResourceVO> list = new ArrayList<>();
        for(FanDataSource fanDataSource:fanDataSources){
            DataResourceVO dataResourceVO = new DataResourceVO();
            dataResourceVO.setId(fanDataSource.getId());
            dataResourceVO.setName(fanDataSource.getName());
            dataResourceVO.setCname(fanDataSource.getcName());
            list.add(dataResourceVO);
        }
        return list;
    }

    /**************************************************************************
     * @Description 浙江外国语统一身份认证通过身份证号码查找用户
     * @author 张德冰
     * @date 2019-05-14
     **************************************************************************/
    @Override
    public UserVo getUserByMasterMajor(String username){
        List<User> users = userJPA.findUserByMasterMajor(username);
        UserVo userVo = new UserVo();
        if(users.size() > 0) {
            userVo.setUsername(users.get(0).getUsername());
            userVo.setPassword(users.get(0).getPassword());
        }
        return userVo;
    }
    //快速排序算法
    @Override
    public void quickSort(int[] arr, int low, int high){
        int i,j,temp,t;
        if(low>high){
            return;
        }
        i=low;
        j=high;
        //temp就是基准位
        temp = arr[low];

        while (i<j) {
            //先看右边，依次往左递减
            while (temp<=arr[j]&&i<j) {
                j--;
            }
            //再看左边，依次往右递增
            while (temp>=arr[i]&&i<j) {
                i++;
            }
            //如果满足条件则交换
            if (i<j) {
                t = arr[j];
                arr[j] = arr[i];
                arr[i] = t;
            }

        }
        //最后将基准为与i和j相等位置的数字交换
        arr[low] = arr[i];
        arr[i] = temp;
        //递归调用左半数组
        quickSort(arr, low, j-1);
        //递归调用右半数组
        quickSort(arr, j+1, high);
    }
    /**************************************************************************
     * 删除有文件的目录
     *
     * @author：黄浩
     * @date: 2018年12月13日
     **************************************************************************/
    @Override
    public boolean deleteDir(File dir) {
        if (dir.exists() && dir.isDirectory()) {
            String[] children = dir.list();
            // 递归删除目录中的子目录下
            for (int i = 0; i < children.length; i++) {
                boolean success = deleteDir(new File(dir, children[i]));
                if (!success) {
                    return false;
                }
            }
        }
        // 目录此时为空，可以删除
        return dir.delete();
    }
}