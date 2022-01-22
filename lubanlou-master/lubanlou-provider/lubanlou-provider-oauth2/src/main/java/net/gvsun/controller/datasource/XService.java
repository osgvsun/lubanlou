package net.gvsun.controller.datasource;

import com.easycache.annotation.Cache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import static net.gvsun.controller.datasource.SQL.*;

@Service
public class XService {
    private final JdbcOperations jdbcOperations;

    @Autowired
    public XService(JdbcOperations jdbcOperations) {
        this.jdbcOperations = jdbcOperations;
    }

    /**
     * 获取所有的客户端信息
     */
    @Cache(key = "'xService:getAllClient'")
    public List<Client> getAllClient() {
        return jdbcOperations.query(SELECT_ALL_CLIENT, new RowMapper<Client>() {
            @Override
            public Client mapRow(ResultSet rs, int rowNum) throws SQLException {
                Client client = new Client();
                client.setId(rs.getString(CLIENT_ID_STR));
                client.setName(rs.getString(CLIENT_NAME_STR));
                client.setSecret(rs.getString(CLIENT_SECRET_STR));
                client.setScope(rs.getString(CLIENT_SCOPE_STR));
                client.setAuthorizedGrantTypes(rs.getString(CLIENT_AUTHORIZED_GRANT_TYPE_STR));
                client.setCode(rs.getString(CLIENT_CODE_STR));
                return client;
            }
        });
    }

    /**
     * 获取用户信息
     *
     * @param username 用户名
     */
    @Cache(key = "'xService:getUser'", hkey = "#args[0]")
    public User getUser(@Nonnull String username) {
        return jdbcOperations.queryForObject(SELECT_USER_BY_USERNAME, new RowMapper<User>() {
            @Override
            public User mapRow(ResultSet rs, int i) throws SQLException {
                User u = new User();
                u.setUsername(rs.getString(USER_USERNAME_STR));
                u.setPassword(rs.getString(USER_PASSWORD_STR));
                u.setCname(rs.getString(USER_CNAME_STR));
                u.setGender(rs.getString(USER_GENDER_STR));
                u.setEnabled(rs.getBoolean(USER_ENABLED_BOOL));
                u.setGitlabUsername(rs.getString(USER_GITLAB_USERNAME_STR));
                u.setQqOpenid(rs.getString(USER_QQ_OPENID_STR));
                u.setWechatOpenid(rs.getString(USER_WECHAR_OPENID_STR));
                u.setPhone(rs.getString(USER_PHONE_STR));
                u.setUnionid(rs.getString(USER_UNIONID_STR));
                u.setFirstLogin(rs.getBoolean(USER_FIRST_LOGIN_BOOL));
                u.setEnterprise(rs.getBoolean(USER_IS_ENTERPRISE_BOOL));
                u.setEmail(rs.getString(USER_EMAIL_STR));
                u.setSJTUUserNo(rs.getString(USER_SJTU_USER_NO_STR));
                u.setHduUserNo(rs.getString(USER_HDU_USER_NO_STR));

                List<Authority> authorities = new ArrayList<>();
                u.setAuthorities(authorities);
                List<Client> clients = getAllClient();
                for (Client c : clients) {
                    List<Authority> as = jdbcOperations.query(SELECT_USER_AUTHORITY_BY_USERNAME_AND_CLIENT_ID, new RowMapper<Authority>() {
                        @Override
                        public Authority mapRow(ResultSet rs, int rowNum) throws SQLException {
                            Authority authority = new Authority();
                            authority.setClientId(rs.getString(CLIENT_ID_STR));
                            authority.setClientAuthorityId(rs.getInt(AUTHORITY_CLIENT_AUTHORITY_ID_STR));
                            authority.setAuthorityEname(rs.getString(AUTHORITY_AUTHORITY_ENAME_STR));
                            authority.setAuthorityCname(rs.getString(AUTHORITY_AUTHORITY_CNAME_STR));
                            return authority;
                        }
                    }, username, c.getId());
                    authorities.addAll(as);
                }
                return u;
            }
        }, username);
    }
}
