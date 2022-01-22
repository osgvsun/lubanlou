package net.gvsun.service.datasource;

import com.easycache.annotation.Cache;
import com.sun.istack.Nullable;
import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.datasource.dto.GvsunDataSourceDto;
import net.gvsun.datasource.dto.SiteDto;
import net.gvsun.service.redis.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * 多数据源切换查询
 *
 * @author 陈敬
 * @since 1.3.0-SNAPSHOT
 */
@Service
public class DatasourceService {
    public static String FULL_AMOUNT_OF_USER = "platform-oauth2-users";
    private final RedisService redisService;
    private JdbcOperations jdbcOperations;
    private ExecutorService executorService = Executors.newFixedThreadPool(50);

    @Autowired
    public DatasourceService(JdbcOperations jdbcOperations,
                             RedisService redisService) {
        this.jdbcOperations = jdbcOperations;
        this.redisService = redisService;
    }

    public static String getDbNameFromUrl(String url) {
        if (url.contains("?")) {
            url = url.substring(0, url.lastIndexOf("?"));
        }
        int index = url.lastIndexOf("/");
        return url.substring(index + 1);
    }

    private List<GvsunDataSourceDto> getResult(List<Future<GvsunDataSourceDto>> futures) {
        List<GvsunDataSourceDto> list = new ArrayList<>();
        for (Future<GvsunDataSourceDto> future : futures) {
            GvsunDataSourceDto d = null;
            try {
                d = future.get();
            } catch (Exception e) {
                //nothing
            }
            if (d != null)
                list.add(d);
        }
        return list;
    }

    //@Cache(key = "'getUserDataSourcesByUsernameAndPassword'", hkey = "#args[0] + ',' + #args[1]")
    public List<GvsunDataSourceDto> getUserDataSourcesByUsernameAndPassword(String username, String password) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), username, password, LoginType.USERNAME);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }
        return getResult(futures);
    }

    @Cache(key = "'getUserDataSourcesByPhone'", hkey = "#args[0]")
    public List<GvsunDataSourceDto> getUserDataSourcesByPhone(String phone) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), phone, null, LoginType.PHONE);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }

        return getResult(futures);
    }

    @Cache(key = "'getUserDataSourcesByQQ'", hkey = "#args[0]")
    public List<GvsunDataSourceDto> getUserDataSourcesByQQ(String qq) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), qq, null, LoginType.QQ);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }

        return getResult(futures);
    }

    @Cache(key = "'getUserDataSourcesByWechat'", hkey = "#args[0]")
    public List<GvsunDataSourceDto> getUserDataSourcesByWechat(String wechat) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), wechat, null, LoginType.WECHAT);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }

        return getResult(futures);
    }

    @Cache(key = "'getUserDataSourcesBySJTUUserNo'", hkey = "#args[0]")
    public List<GvsunDataSourceDto> getUserDataSourcesBySJTUUserNo(String userNo) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), userNo, null, LoginType.SJTU);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }

        return getResult(futures);
    }

    @Cache(key = "'getUserDataSourcesByHDUUserNo'", hkey = "#args[0]")
    public List<GvsunDataSourceDto> getUserDataSourcesByHDUUserNo(String userNo) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), userNo, null, LoginType.HDU);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }

        return getResult(futures);
    }

    @Cache(key = "'getUserDataSourcesBySUFEUserNo'", hkey = "#args[0]")
    public List<GvsunDataSourceDto> getUserDataSourcesBySUFEUserNo(String userNo) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), userNo, null, LoginType.SUFE);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }

        return getResult(futures);
    }

    @Cache(key = "'getUserDataSourcesByZISUUserNo'", hkey = "#args[0]")
    public List<GvsunDataSourceDto> getUserDataSourcesByZISUUserNo(String userNo) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), userNo, null, LoginType.ZISU);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }

        return getResult(futures);
    }

    @Cache(key = "'getUserDataSourcesByWZUserNo'", hkey = "#args[0]")
    public List<GvsunDataSourceDto> getUserDataSourcesByWZUserNo(String userNo) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), userNo, null, LoginType.WZ);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }

        return getResult(futures);
    }

    @Cache(key = "'getUserDataSourcesBySKDUserNo'", hkey = "#args[0]")
    public List<GvsunDataSourceDto> getUserDataSourcesBySKDUserNo(String userNo) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), userNo, null, LoginType.SKD);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }

        return getResult(futures);
    }

    @Cache(key = "'getUserDataSourcesByCDUserNo'", hkey = "#args[0]")
    public List<GvsunDataSourceDto> getUserDataSourcesByCDUserNo(String userNo) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), userNo, null, LoginType.CD);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }

        return getResult(futures);
    }

    @Cache(key = "'getUserDataSourcesByXAAUUserNo'", hkey = "#args[0]")
    public List<GvsunDataSourceDto> getUserDataSourcesByXAAUUserNo(String userNo) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), userNo, null, LoginType.XAAU);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }

        return getResult(futures);
    }

    @Cache(key = "'getUserDataSourcesByHUSTUserNo'", hkey = "#args[0]")
    public List<GvsunDataSourceDto> getUserDataSourcesByHUSTUserNo(String userNo) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), userNo, null, LoginType.HUST);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }

        return getResult(futures);
    }

    @Cache(key = "'getUserDataSourcesBySWUFEUserNo'", hkey = "#args[0]")
    public List<GvsunDataSourceDto> getUserDataSourcesBySWUFEUserNo(String userNo) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), userNo, null, LoginType.SWUFE);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }

        return getResult(futures);
    }

    @Cache(key = "'getUserDataSourcesByGitlab'", hkey = "#args[0]")
    public List<GvsunDataSourceDto> getUserDataSourcesByGitlab(String gitlab) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), gitlab, null, LoginType.GITLAB);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }

        return getResult(futures);
    }

    @Cache(key = "'getUserDataSourcesByUnionId'", hkey = "#args[0]")
    public List<GvsunDataSourceDto> getUserDataSourcesByUnionId(String unionid) {
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        List<Future<GvsunDataSourceDto>> futures = new ArrayList<>();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            Future<GvsunDataSourceDto> future = executorService.submit(() -> {
                Boolean exist = userExistNew(d.getSchoolName(), unionid, null, LoginType.UNIONID);
                if (exist) {
                    return d;
                } else {
                    return null;
                }
            });
            futures.add(future);
        }

        return getResult(futures);
    }

    /**
     * 查询用户在指定的数据源下是否存在
     *
     * @param dbName    数据源名
     * @param s         查询标识
     * @param password  密码
     * @param loginType 查询类型
     */
    @Cache(key = "'userExist'", hkey = "#args[0] + ',' + #args[1] + ',' + #args[2] + ',' + #args[3]")
    public boolean userExist(String dbName, String s, @Nullable String password, LoginType loginType) {
        boolean res = false;
        /*if (!StringUtils.isEmpty(dbName) && !StringUtils.isEmpty(s)) {
            String FORMAT_QUERY_SQL = "", query = "";
            switch (loginType) {
                case QQ:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from %s.users where qq_openid = '%s') as exist";
                    query = String.format(FORMAT_QUERY_SQL, dbName, s);
                    res = jdbcOperations.queryForObject(query, Boolean.class);
                    break;
                case WECHAT:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from %s.users where wechat_openid = '%s') as exist";
                    query = String.format(FORMAT_QUERY_SQL, dbName, s);
                    res = jdbcOperations.queryForObject(query, Boolean.class);
                    break;
                case GITLAB:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from %s.users where gitlab_username = '%s') as exist";
                    query = String.format(FORMAT_QUERY_SQL, dbName, s);
                    res = jdbcOperations.queryForObject(query, Boolean.class);
                    break;
                case PHONE:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from %s.users where phone = '%s') as exist";
                    query = String.format(FORMAT_QUERY_SQL, dbName, s);
                    res = jdbcOperations.queryForObject(query, Boolean.class);
                    break;
                case UNIONID:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from %s.users where unionid = '%s') as exist";
                    query = String.format(FORMAT_QUERY_SQL, dbName, s);
                    res = jdbcOperations.queryForObject(query, Boolean.class);
                    break;
                case USERNAME:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from %s.users where username = '%s' and password = '%s') as exist";
                    query = String.format(FORMAT_QUERY_SQL, dbName, s, password);
                    res = jdbcOperations.queryForObject(query, Boolean.class);
                    break;
                case SJTU:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from %s.users where sjtu_user_no = '%s') as exist";
                    query = String.format(FORMAT_QUERY_SQL, dbName, s);
                    res = jdbcOperations.queryForObject(query, Boolean.class);
                    break;
                default:
                    res = false;
                    break;
            }
        }*/
        return res;
    }

    /**
     * 查询用户在指定的数据源下是否存在（不依赖所有数据源在同一台MySQL服务器）
     *
     * @param datasource 数据源名
     * @param s          查询标识
     * @param password   密码
     * @param loginType  查询类型
     */
    @Cache(key = "'userExistNew'", hkey = "#args[0] + ',' + #args[1] + ',' + #args[2] + ',' + #args[3]")
    public Boolean userExistNew(String datasource, String s, @Nullable String password, LoginType loginType) {
        Boolean res = false;
        if (!StringUtils.isEmpty(datasource) && !StringUtils.isEmpty(s)) {
            ClientDatabaseContextHolder.set(datasource);
            String FORMAT_QUERY_SQL = "", query = "";
            switch (loginType) {
                case QQ:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where qq_openid = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s);
                    break;
                case WECHAT:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where wechat_openid = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s);
                    break;
                case GITLAB:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where gitlab_username = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s);
                    break;
                case PHONE:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where phone = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s);
                    break;
                case UNIONID:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where unionid = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s);
                    break;
                case USERNAME:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where username = ? and password = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s, password);
                    break;
                case SJTU:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where username = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s);
                    break;
                case HDU:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where username = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s);
                    break;
                case SUFE:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where username = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s);
                    break;
                case ZISU:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where user_no = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s);
                    break;
                case WZ:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where username = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s);
                    break;
                case SKD:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where username = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s);
                    break;
                case CD:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where username = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s);
                    break;
                case XAAU:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where username = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s);
                    break;
                case HUST:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where username = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s);
                    break;
                case SWUFE:
                    FORMAT_QUERY_SQL = "select exists(select 1 as exist from users where username = ?) as exist";
                    res = jdbcOperations.queryForObject(FORMAT_QUERY_SQL, Boolean.class, s);
                    break;
                default:
                    res = false;
                    break;
            }
        }
        return res;
    }

    /**
     * 获取指定的学校下有哪些系统
     *
     * @param schoolName 学校名
     */
    @Cache(key = "'getProjectsFromSchool'", hkey = "#args[0]")
    public List<Map<String, Object>> getProjectsFromSchool(String schoolName) {
        List<Map<String, Object>> projects = new ArrayList<>();
        Map<String, SiteDto> entries = redisService.getAllSiteDto();
        entries.forEach((k, v) -> {
            List<GvsunDataSourceDto> dataSourceDtos = v.getDataSourceDtos();
            for (GvsunDataSourceDto d : dataSourceDtos) {
                if (d.getSchoolName().startsWith(schoolName)) {
                    Map<String, Object> project = new HashMap<>();
                    project.put("projectName", v.getProjectName());
                    project.put("siteUrl", v.getSiteUrl());
                    projects.add(project);
                    break;
                }
            }
        });
        return projects;
    }

    /**
     * 通过学校名获取数据库名
     */
    @Cache(key = "'getDbNameFromSchoolName'", hkey = "#args[0]")
    public String getDbNameFromSchoolName(String schoolName) {
        String dbName = null;
        SiteDto siteDto = redisService.getSiteDtoFromRedis();
        List<GvsunDataSourceDto> dataSourceDtos = siteDto.getDataSourceDtos();
        for (GvsunDataSourceDto d : dataSourceDtos) {
            if (d.getSchoolName().equals(schoolName)) {
                String url = d.getUrl();
                dbName = DatasourceService.getDbNameFromUrl(url);
                break;
            }
        }
        return dbName;
    }

    @Cache(key = "'getDefaultDataSource'")
    public GvsunDataSourceDto getDefaultDataSource() {
        SiteDto sites = redisService.getSiteDtoFromRedis();
        for (GvsunDataSourceDto d : sites.getDataSourceDtos()) {
            if (d.isDefaultDataSource()) {
                return d;
            }
        }
        return null;
    }

    /**
     * 登陆类型
     */
    public enum LoginType {
        QQ("QQ"),
        WECHAT("WECHAT"),
        GITLAB("GITLAB"),
        PHONE("PHONE"),
        UNIONID("APPLET"),
        USERNAME("USERNAME"),
        SJTU("SJTU"),
        HDU("HDU"),
        SUFE("SUFE"),
        ZISU("ZISU"),
        SKD("SKD"),
        CD("CD"),
        WZ("WZ"),
        XAAU("XAAU"),
        HUST("HUST"),
        SWUFE("SWUFE");
        private String desc;

        LoginType(String desc) {
            this.desc = desc;
        }

        @Override
        public String toString() {
            return desc;
        }

    }
}
