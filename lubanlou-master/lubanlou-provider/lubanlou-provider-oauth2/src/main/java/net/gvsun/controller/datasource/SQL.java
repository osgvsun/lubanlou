package net.gvsun.controller.datasource;

public class SQL {
    public static String USER = "users";
    public static String USER_USERNAME_STR = "username";
    public static String USER_PASSWORD_STR = "password";
    public static String USER_CNAME_STR = "cname";
    public static String USER_GENDER_STR = "gender";
    public static String USER_ENABLED_BOOL = "enabled";
    public static String USER_GITLAB_USERNAME_STR = "gitlab_username";
    public static String USER_QQ_OPENID_STR = "qq_openid";
    public static String USER_WECHAR_OPENID_STR = "wechat_openid";
    public static String USER_PHONE_STR = "phone";
    public static String USER_UNIONID_STR = "unionid";
    public static String USER_FIRST_LOGIN_BOOL = "first_login";
    public static String USER_IS_ENTERPRISE_BOOL = "is_enterprise";
    public static String USER_EMAIL_STR = "email";
    public static String USER_SJTU_USER_NO_STR = "SJTU_user_no";
    public static String USER_HDU_USER_NO_STR = "hdu_user_no";

    public static String AUTHORITY = "authorities";
    public static String AUTHORITY_CLIENT_AUTHORITY_ID_STR = "client_authority_id";
    public static String AUTHORITY_AUTHORITY_ENAME_STR = "authority_ename";
    public static String AUTHORITY_AUTHORITY_CNAME_STR = "authority_cname";

    public static String CLIENT = "oauth_client_details";
    public static String CLIENT_ID_STR = "client_id";
    public static String CLIENT_SECRET_STR = "client_secret";
    public static String CLIENT_NAME_STR = "client_name";
    public static String CLIENT_SCOPE_STR = "scope";
    public static String CLIENT_AUTHORIZED_GRANT_TYPE_STR = "authorized_grant_types";
    public static String CLIENT_CODE_STR = "code";

    public static String SELECT_USER_BY_USERNAME = String.format("select %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s from %s where %s = ?",
            USER_USERNAME_STR, USER_PASSWORD_STR, USER_CNAME_STR, USER_GENDER_STR, USER_ENABLED_BOOL, USER_GITLAB_USERNAME_STR,
            USER_QQ_OPENID_STR, USER_WECHAR_OPENID_STR, USER_PHONE_STR, USER_UNIONID_STR, USER_FIRST_LOGIN_BOOL, USER_IS_ENTERPRISE_BOOL,
            USER_EMAIL_STR, USER_SJTU_USER_NO_STR, USER_HDU_USER_NO_STR, USER, USER_USERNAME_STR);

    public static String SELECT_USER_AUTHORITY_BY_USERNAME_AND_CLIENT_ID = String.format("SELECT %s,%s,%s,%s FROM vw_user_authority WHERE %s = ? AND %s = ?",
            CLIENT_ID_STR, AUTHORITY_CLIENT_AUTHORITY_ID_STR, AUTHORITY_AUTHORITY_ENAME_STR, AUTHORITY_AUTHORITY_CNAME_STR, USER_USERNAME_STR, CLIENT_ID_STR);

    public static String SELECT_ALL_CLIENT = String.format("SELECT %s,%s,%s,%s,%s,%s FROM %s",
            CLIENT_ID_STR, CLIENT_SECRET_STR, CLIENT_NAME_STR, CLIENT_SCOPE_STR, CLIENT_AUTHORIZED_GRANT_TYPE_STR, CLIENT_CODE_STR, CLIENT);
}
