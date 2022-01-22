package net.gvsun.service.datasource;

import com.easycache.annotation.CacheDelete;
import org.springframework.stereotype.Service;

@Service
public class InvalidCacheService {
    @CacheDelete(keys = "'getUserDataSourcesByUsernameAndPassword'", hkeys = "#args[0] + ',' + #args[1]", beforeInvocation = true)
    public void getUserDataSourcesByUsernameAndPassword(String username, String password) {
    }

    @CacheDelete(keys = "'getUserDataSourcesByPhone'", hkeys = "#args[0]", beforeInvocation = true)
    public void getUserDataSourcesByPhone(String phone) {
    }

    @CacheDelete(keys = "'getUserDataSourcesByQQ'", hkeys = "#args[0]", beforeInvocation = true)
    public void getUserDataSourcesByQQ(String qq) {
    }

    @CacheDelete(keys = "'getUserDataSourcesByWechat'", hkeys = "#args[0]", beforeInvocation = true)
    public void getUserDataSourcesByWechat(String wechat) {
    }

    @CacheDelete(keys = "'getUserDataSourcesByGitlab'", hkeys = "#args[0]", beforeInvocation = true)
    public void getUserDataSourcesByGitlab(String gitlab) {
    }

    @CacheDelete(keys = "'getUserDataSourcesByUnionId'", hkeys = "#args[0]", beforeInvocation = true)
    public void getUserDataSourcesByUnionId(String unionid) {
    }

    @CacheDelete(keys = "'userExist'", hkeys = "'*' + #args[0] + '*'", beforeInvocation = true)
    public void userExist(String s) {
    }

    @CacheDelete(keys = {"'userExist'", "'getUserDataSourcesByUnionId'", "'getUserDataSourcesByGitlab'",
            "'getUserDataSourcesByWechat'", "'getUserDataSourcesByQQ'", "'getUserDataSourcesByPhone'",
            "'getUserDataSourcesByUsernameAndPassword'"}, beforeInvocation = true)
    public void all() {
    }
}
