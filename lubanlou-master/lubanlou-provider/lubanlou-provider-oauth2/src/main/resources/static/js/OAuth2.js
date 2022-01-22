//OAuth2.initOAuth2                 初始化OAuth2
//OAuth2.getJwtToken                从本地缓存中获取访问令牌
//OAuth2.getJwtTokenFromRemote      从远程获取访问令牌
//OAuth2.checkJwtToken              检查令牌是否过期
//OAuth2.checkJwtTokenFromRemote    从远程检查令牌是否过期
//OAuth2.isUserEnabled              查询用户是否没有被禁用

let OAuth2 = {};
OAuth2.VERSION = '1.0.0';

/**
 * 初始化OAuth2
 * @param data.oauth2Host       OAuth2服务器地址
 * @param data.clientDetail     客户端详细信息{clientId: 客户端ID, clientSecret: 客户端密钥}
 * @param data.username         用户名（可选，取决于被调用方是否需要）
 * @param data.interceptRequest 是否拦截请求，默认为true
 * @param data.needToken        一个函数，返回true时拦截Ajax请求并添加Authorization，否则不添加，函数
 *                              的第一个参数为你发起Ajax请求的url地址
 */
OAuth2.initOAuth2 = function (data) {
    if (!data.oauth2Host || !data.clientDetail || !data.clientDetail.clientId || !data.clientDetail.clientSecret) {
        throw new Error('初始化OAuth2失败，请传入正确的初始化参数');
    }
    OAuth2.oauth2Host = data.oauth2Host;
    OAuth2.clientDetail = data.clientDetail;
    OAuth2.localTokenName = data.clientDetail.clientId + "_token";
    OAuth2.interceptRequest = data.interceptRequest !== false;
    OAuth2.username = data.username;

    if (OAuth2.interceptRequest) {
        $(document).ajaxSend(function (event, xhr, options) {
            let url = options.url;
            if (typeof data.needToken === 'function' && data.needToken(url) && url.indexOf("/oauth") === -1) {
                let access_token = OAuth2.getJwtToken();
                xhr.setRequestHeader("Authorization", "Bearer " + access_token);
            }
        });
    }
    console.log("OAuth2初始化成功:");
    console.log(OAuth2);
};

/**
 * 获取访问令牌（优先从本地缓存中获取）
 *
 * @return 返回访问令牌
 */
OAuth2.getJwtToken = function () {
    let payload = {};
    if (OAuth2.username) {
        payload.username = OAuth2.username;
    }
    let access_token;
    if (localStorage[OAuth2.localTokenName] && OAuth2.checkJwtToken(localStorage[OAuth2.localTokenName])) {
        let token = JSON.parse(localStorage[OAuth2.localTokenName]);
        access_token = token["access_token"];
    } else {
        access_token = OAuth2.getJwtTokenFromRemote(payload);
    }
    return access_token;
};

/**
 * 获取访问令牌
 *
 * @param payload
 * @return 返回访问令牌
 */
OAuth2.getJwtTokenFromRemote = function (payload) {
    let access_token;
    payload.grant_type = "client_credentials";
    $.ajax({
        type: "POST",
        async: false,
        url: OAuth2.oauth2Host + "/oauth/token",
        dataType: "json",
        beforeSend: function (request, parameters) {
            var encodeClientId = encodeURIComponent(OAuth2.clientDetail.clientId);
            var encodeClientSecret = encodeURIComponent(OAuth2.clientDetail.clientSecret);
            request.setRequestHeader("Authorization", "Basic " + window.btoa(encodeClientId + ":" + encodeClientSecret));
        },
        data: payload,
        success: function (data) {
            //访问令牌和自访问令牌被发放后的有效时间，单位秒
            let token = {};
            token["access_token"] = data.access_token;
            token["expires_in"] = data.expires_in;
            //令牌过期的时间点
            token["expiration_time"] = Math.floor(new Date().getTime() / 1000) + Number(data.expires_in);
            localStorage[OAuth2.localTokenName] = JSON.stringify(token);
            access_token = data.access_token;
        }
    });
    return access_token;
};

/**
 * 检查访问令牌是否过期
 *
 * @param s_token 访问令牌和有效时间
 * @return boolean
 */
OAuth2.checkJwtToken = function (s_token) {
    let token = JSON.parse(s_token);
    return Math.floor(new Date().getTime() / 1000) + 2000 < Number(token["expiration_time"]);
};

/**
 * 从远程检查令牌是否过期
 * @param s_token 访问令牌
 * @return boolean
 */
OAuth2.checkJwtTokenFromRemote = function (s_token) {
    let token = JSON.parse(s_token);
    $.ajax({
        type: "GET",
        async: false,
        url: OAuth2.oauth2Host + "/oauth/checkToken",
        dataType: "json",
        data: {
            access_token: token["access_token"]
        },
        success: function (data) {
            return data.code !== 1;
        }
    });
};

/**
 * 查询用户是否没被禁用
 * @param username 用户名
 * @return boolean
 */
OAuth2.isUserEnabled = function (username) {
    let status = false;
    if (!username) {
        throw new Error("用户名不能为空");
    }
    $.ajax({
        type: "GET",
        async: false,
        url: OAuth2.oauth2Host + "/enabled/" + username,
        success: function (data) {
            if (data.code === 0) {
                status = data.data;
            } else {
                throw new Error("查询用户状态失败:" + (data.code === 1) ? data.msg : data);
            }
        }
    });
    return status;
};