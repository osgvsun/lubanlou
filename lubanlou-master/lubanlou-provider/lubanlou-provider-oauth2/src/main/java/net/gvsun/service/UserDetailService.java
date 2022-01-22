package net.gvsun.service;

import lombok.extern.slf4j.Slf4j;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.datasource.dto.GvsunDataSourceDto;
import net.gvsun.datasource.dto.SiteDto;
import net.gvsun.entity.User;
import net.gvsun.oauth2.dto.CustomGrantedAuthority;
import net.gvsun.oauth2.dto.OAuth2UserDetails;
import net.gvsun.oauth2.dto.Oauth2Authentication;
import net.gvsun.repository.UserRepository;
import net.gvsun.service.datasource.InvalidCacheService;
import net.gvsun.service.redis.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 获取用户信息
 *
 * @author 陈敬
 * @since 1.0.0-SNAPSHOT
 */
@Slf4j
@Service
public class UserDetailService {
    public static int FROM_USER_CENTER = 1;
    public static int FROM_OAUTH2 = 2;
    private final JdbcOperations jdbcOperations;
    private final UserRepository userRepository;
    private final RedisService redisService;
    private final InvalidCacheService invalidCacheService;
    @Value("${apiGateWayHost}")
    protected String apiGateWayHost;
    private ExecutorService executorService = Executors.newFixedThreadPool(50);


    @Autowired
    public UserDetailService(JdbcOperations jdbcOperations,
                             UserRepository userRepository,
                             RedisService redisService, InvalidCacheService invalidCacheService) {
        this.jdbcOperations = jdbcOperations;
        this.userRepository = userRepository;
        this.redisService = redisService;
        this.invalidCacheService = invalidCacheService;
    }

    /**
     * 获取用户在指定站点下的用户名和权限等信息
     *
     * @param username 用户名
     * @param phone 电话       这里由于多数据源下的username不唯一,所以添加一个phone参数
     * @param clientId 站点ID
     * @param where    1从用户中心获取，2从oauth2获取
     */
    public Oauth2Authentication getUserAuthentication(String username,@Nullable String phone, String clientId, int where) {
        Oauth2Authentication oauth2Authentication = null;
        switch (where) {
            case 1:
                break;
            case 2:
                List<CustomGrantedAuthority> userAuthorities = getUserAuthorities(username, clientId);
                User user = userRepository.findByUsername(username);
                log.info("phone:"+phone);
                if (Objects.isNull(user)&&!StringUtils.isEmpty(phone)){
                    user = userRepository.findByPhone(phone);
                }
                if (user == null) {
                    throw new RuntimeException(String.format("用户不存在%s,%s", username, ClientDatabaseContextHolder.getClientDatabase()));
                }
                OAuth2UserDetails oauth2UserDetails = new OAuth2UserDetails();
                oauth2UserDetails.setAuthorities(userAuthorities);
                oauth2UserDetails.setUsername(user.getUsername());
                oauth2UserDetails.setCname(user.getCname());
                oauth2UserDetails.setGender(user.getGender());
                oauth2UserDetails.setGitlabUsername(user.getGitlabUsername());
                oauth2UserDetails.setEnabled(user.getEnabled());
                oauth2UserDetails.setPhone(user.getPhone());
                oauth2UserDetails.setPassword(user.getPassword());
                oauth2Authentication = new Oauth2Authentication(oauth2UserDetails, oauth2UserDetails.getPassword());
                break;
            default:
                throw new IllegalArgumentException(String.format("输入的where参数:%d不正确", where));
        }

        return oauth2Authentication;
    }

    /**
     * 获取某个站点的用户的权限信息
     *
     * @param username 用户名
     * @param clientId 客户端ID
     */
    public List<CustomGrantedAuthority> getUserAuthorities(@Nonnull String username, @Nullable String clientId) {
        String sql;
        if (!StringUtils.isEmpty(clientId)) {
            sql = "select username, client_id, authority_ename, authority_cname from vw_user_authority where username = ? and client_id = ?";
            return jdbcOperations.query(sql, (rs, num) -> {
                String authority_ename = rs.getString("authority_ename");
                String authority_cname = rs.getString("authority_cname");
                String client_id = rs.getString("client_id");
                return new CustomGrantedAuthority(authority_ename, authority_cname);
            }, username, clientId);
        } else {
            sql = "select username, client_id, authority_ename, authority_cname from vw_user_authority where username = ?";
            return jdbcOperations.query(sql, (rs, num) -> {
                String authority_ename = rs.getString("authority_ename");
                String authority_cname = rs.getString("authority_cname");
                String client_id = rs.getString("client_id");
                return new CustomGrantedAuthority(authority_ename, authority_cname);
            }, username);
        }
    }

    /**
     * 查询用户是否被禁用
     *
     * @param username 用户名
     */
    public boolean enabled(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null)
            throw new RuntimeException("用户不存在");
        return user.getEnabled();
    }

    /**
     * 绑定用户的QQ
     *
     * @param username 用户名
     * @param password 密码
     * @param qqOpenId QQ返回的OpenID，代表用户身份的唯一标识
     */
    public void boundUserQQ(String username, String password, String qqOpenId) {
        executorService.submit(new Runnable() {
            @Override
            public void run() {
                try {
                    String query = "update users set qq_openid = ? where username = ? and password = ?";
                    SiteDto siteDto = redisService.getSiteDtoFromRedis();
                    List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
                    for (GvsunDataSourceDto d : dataSourceDtos) {
                        ClientDatabaseContextHolder.set(d.getSchoolName());
                        jdbcOperations.update(query, qqOpenId, username, password);
                        ClientDatabaseContextHolder.clear();
                    }
                } catch (Exception e) {
                    log.error(e.getMessage());
                }
            }
        });
    }

    /**
     * 绑定用户的微信unionid
     *
     * @param s         用户名或手机号
     * @param password  密码
     * @param unionid   微信返回的用户唯一ID标识
     * @param boundType 根据用户名密码绑定还是根据手机号密码绑定
     */
    public void boundUserUnionId(String s, String password, String unionid, BoundType boundType) {
        executorService.submit(new Runnable() {
            @Override
            public void run() {
                try {
                    String query = "";
                    switch (boundType) {
                        case USERNAME:
                            query = "update users set unionid = ? where username = ? and password = ?";
                            break;
                        case PHONE:
                            query = "update users set unionid = ? where phone = ? and password = ?";
                            break;
                    }
                    SiteDto siteDto = redisService.getSiteDtoFromRedis();
                    List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
                    for (GvsunDataSourceDto d : dataSourceDtos) {
                        ClientDatabaseContextHolder.set(d.getSchoolName());
                        jdbcOperations.update(query, unionid, s, password);
                        ClientDatabaseContextHolder.clear();
                    }
                } catch (Exception e) {
                    log.error(e.getMessage());
                } finally {
                    invalidCacheService.getUserDataSourcesByUnionId(unionid);
                }
            }
        });
    }

    /**
     * 绑定用户的微信
     *
     * @param username     用户名
     * @param password     密码
     * @param wechatOpenId 微信返回的OpenID，代表用户身份的唯一标识
     */
    public void boundUserWeChat(String username, String password, String wechatOpenId) {
        executorService.submit(new Runnable() {
            @Override
            public void run() {
                try {
                    String query = "update users set wechat_openid = ? where username = ? and password = ?";
                    SiteDto siteDto = redisService.getSiteDtoFromRedis();
                    List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
                    for (GvsunDataSourceDto d : dataSourceDtos) {
                        ClientDatabaseContextHolder.set(d.getSchoolName());
                        jdbcOperations.update(query, wechatOpenId, username, password);
                        ClientDatabaseContextHolder.clear();
                    }
                } catch (Exception e) {
                    log.error(e.getMessage());
                }
            }
        });
    }

    /**
     * 绑定用户的GitLab
     *
     * @param username       用户名
     * @param password       密码
     * @param gitlabUsername gitlab账号
     */
    public void boundUserGitlab(String username, String password, String gitlabUsername) {
        executorService.submit(new Runnable() {
            @Override
            public void run() {
                try {
                    String query = "update users set gitlab_username = ? where username = ? and password = ?";
                    SiteDto siteDto = redisService.getSiteDtoFromRedis();
                    List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
                    for (GvsunDataSourceDto d : dataSourceDtos) {
                        ClientDatabaseContextHolder.set(d.getSchoolName());
                        jdbcOperations.update(query, gitlabUsername, username, password);
                        ClientDatabaseContextHolder.clear();
                    }
                } catch (Exception e) {
                    log.error(e.getMessage());
                }
            }
        });
    }

    /**
     * 绑定用户的手机号
     *
     * @param username 用户名
     * @param password 密码
     * @param phone    手机号
     */
    public void boundUserPhone(String username, String password, String phone) {
        executorService.submit(new Runnable() {
            @Override
            public void run() {
                try {
                    String query = "update users set phone = ? where username = ? and password = ?";
                    SiteDto siteDto = redisService.getSiteDtoFromRedis();
                    List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
                    for (GvsunDataSourceDto d : dataSourceDtos) {
                        ClientDatabaseContextHolder.set(d.getSchoolName());
                        jdbcOperations.update(query, phone, username, password);
                        ClientDatabaseContextHolder.clear();
                    }
                } catch (Exception e) {
                    log.error(e.getMessage());
                }
            }
        });
    }

    /**
     * 查询手机号是否存在
     */
    public boolean phoneExist(String phone) {
        String query = "select exists(select 1 from users where phone = ?) as exist";
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            ClientDatabaseContextHolder.set(d.getSchoolName());
            Boolean exist = jdbcOperations.queryForObject(query, Boolean.class, phone);
            if (exist)
                return true;
        }
        return false;
    }

    public void setUserAuthority(String username, String clientId, int clientAuthorityId) {
        Boolean exist = jdbcOperations.queryForObject("SELECT EXISTS(select 1 from authorities where client_id = ? and client_authority_id = ?)", Boolean.class, clientId, clientAuthorityId);
        if (exist != null && exist) {
            String sql = "insert into user_client_authority (username, client_id, client_authority_id) values(?,?,?)";
            jdbcOperations.update(sql, username, clientId, clientAuthorityId);
        }
    }

    public void setUserAuthority(String username, String clientId, String authorityCName) {
        Boolean exist = jdbcOperations.queryForObject("SELECT EXISTS(select 1 from authorities where client_id = ? and authority_cname = ?)", Boolean.class, clientId, authorityCName);
        if (exist != null && exist) {
            String sql1 = "select client_authority_id from authorities where client_id = ? and authority_cname = ?";
            Integer clientAuthorityId = jdbcOperations.queryForObject(sql1, Integer.class, clientId, authorityCName);
            if (clientAuthorityId != null) {
                String sql = "insert ignore into user_client_authority (username, client_id, client_authority_id) values(?,?,?)";
                jdbcOperations.update(sql, username, clientId, clientAuthorityId);
            }
        }
    }

    /**
     * 登陆类型
     */
    public enum BoundType {
        USERNAME, PHONE
    }
}
