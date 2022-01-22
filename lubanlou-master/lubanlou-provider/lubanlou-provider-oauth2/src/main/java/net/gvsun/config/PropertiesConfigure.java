package net.gvsun.config;

import net.gvsun.datasource.ClientDatabaseContextHolder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class PropertiesConfigure {
    public static String SSOUT_USERNAME = "uqwenfafie1837";
    public String OAUTH2COOKIE = "OAUTH2COOKIE";
    @Value("${server.servlet.context-path:/uaa}")
    private String contextPath;
    @Value("${tokenTimeout}")
    private int tokenTimeout;
    @Value("${refreshTokenTimeout}")
    private int refreshTokenTimeout;
    @Value("${gitlab.enable}")
    private Boolean gitlabEnable;
    @Value("${wechat.enable}")
    private Boolean wechatEnable;
    @Value("${qq.enable}")
    private Boolean qqEnable;
    @Value("${datasource.projectName}")
    private String projectName;
    @Value("${enableTestCaptcha}")
    private Boolean enableTestCaptcha;
    @Value("${apiGateWayHost}")
    private String apiGateWayHost;
    @Value("${enableLoginByPhone}")
    private Boolean enableLoginByPhone;

    @Value("${enableTesterPhone}")
    private Boolean enableTesterPhone;
    @Value("${passwordEncode}")
    private Boolean passwordEncode;
    @Value("${registerAudit.schoolName}")
    private String[] registerAuditSchoolName;
    @Value("${registerAudit.enable}")
    private boolean[] registerAuditEnable;
    @Value("${registerAudit.collegeId}")
    private String[] collegeIds;
    @Value("${outSchool}")
    private Boolean outSchool;
    @Value("${forgetPassword}")
    private int forgetPassword;

    private int securityCodeExpirationTime = 120;   //验证码过期时间（单位s）

    public String[] getCollegeIds() {
        return collegeIds;
    }

    public void setCollegeIds(String[] collegeIds) {
        this.collegeIds = collegeIds;
    }

    public String[] getRegisterAuditSchoolName() {
        return registerAuditSchoolName;
    }

    public void setRegisterAuditSchoolName(String[] registerAuditSchoolName) {
        this.registerAuditSchoolName = registerAuditSchoolName;
    }

    public boolean[] getRegisterAuditEnable() {
        return registerAuditEnable;
    }

    public void setRegisterAuditEnable(boolean[] registerAuditEnable) {
        this.registerAuditEnable = registerAuditEnable;
    }

    public Boolean getWithoutAudit() {
        String schoolName = ClientDatabaseContextHolder.getClientDatabase();
        if (schoolName != null) {
            for (int i = 0; i < registerAuditSchoolName.length; i++) {
                if (schoolName.equals(registerAuditSchoolName[i])) {
                    return !registerAuditEnable[i];
                }
            }
        }
        return false;
    }

    public String getCollegeId() {
        String schoolName = ClientDatabaseContextHolder.getClientDatabase();
        if (schoolName != null) {
            for (int i = 0; i < registerAuditSchoolName.length; i++) {
                if (schoolName.equals(registerAuditSchoolName[i])) {
                    if (collegeIds[i] != null && collegeIds[i].equals("-"))
                        return null;
                    else
                        return collegeIds[i];
                }
            }
        }
        return null;
    }


    public Boolean getPasswordEncode() {
        return passwordEncode;
    }

    public void setPasswordEncode(Boolean passwordEncode) {
        this.passwordEncode = passwordEncode;
    }


    public Boolean getEnableTesterPhone() {
        return enableTesterPhone;
    }

    public void setEnableTesterPhone(Boolean enableTesterPhone) {
        this.enableTesterPhone = enableTesterPhone;
    }

    public int getSecurityCodeExpirationTime() {
        return securityCodeExpirationTime;
    }

    public String getUserInfoTopic(String clientId) {
        return "oauth2_user_info_" + clientId;
    }

    public Boolean getEnableLoginByPhone() {
        return enableLoginByPhone;
    }

    public void setEnableLoginByPhone(Boolean enableLoginByPhone) {
        this.enableLoginByPhone = enableLoginByPhone;
    }

    public String getApiGateWayHost() {
        return apiGateWayHost;
    }

    public void setApiGateWayHost(String apiGateWayHost) {
        this.apiGateWayHost = apiGateWayHost;
    }

    public Boolean getEnableTestCaptcha() {
        return enableTestCaptcha;
    }

    public void setEnableTestCaptcha(Boolean enableTestCaptcha) {
        this.enableTestCaptcha = enableTestCaptcha;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public Boolean getGitlabEnable() {
        return gitlabEnable;
    }

    public void setGitlabEnable(Boolean gitlabEnable) {
        this.gitlabEnable = gitlabEnable;
    }

    public Boolean getWechatEnable() {
        return wechatEnable;
    }

    public void setWechatEnable(Boolean wechatEnable) {
        this.wechatEnable = wechatEnable;
    }

    public Boolean getQqEnable() {
        return qqEnable;
    }

    public void setQqEnable(Boolean qqEnable) {
        this.qqEnable = qqEnable;
    }

    public String getServerHost(HttpServletRequest request) {
        String url = request.getRequestURL().toString();
        System.out.printf("getRequestURL=%s\n", url);
        System.out.printf("getServerPort=%s\n", request.getServerPort());
        return url.substring(0, url.indexOf("/uaa"));
    }

    public String getContextPath() {
        return contextPath;
    }

    public void setContextPath(String contextPath) {
        this.contextPath = contextPath;
    }

    public int getTokenTimeout() {
        return tokenTimeout;
    }

    public void setTokenTimeout(int tokenTimeout) {
        this.tokenTimeout = tokenTimeout;
    }

    public int getRefreshTokenTimeout() {
        return refreshTokenTimeout;
    }

    public void setRefreshTokenTimeout(int refreshTokenTimeout) {
        this.refreshTokenTimeout = refreshTokenTimeout;
    }
}
