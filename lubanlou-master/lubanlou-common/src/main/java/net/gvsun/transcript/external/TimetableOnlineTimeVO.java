package net.gvsun.transcript.external;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Calendar;

/**
 * Created by Administrator on 2018/3/1.
 */
public class TimetableOnlineTimeVO implements Serializable{
    /**
     * 登陆时间表id
     */
    private Integer id;
    /**
     * 用户
     */
    private UserVo userVo;
    /**
     * sessionId
     */
    private String sessionId;
    /**
     * 登陆时间
     */
    private Calendar loginTime;
    /**
     * 登出时间
     */
    private Calendar logoutTime;
    /**
     * 登陆时间展示
     */
    private String loginTimeStr;
    /**
     * 登出时间展示
     */
    private String logoutTimeStr;
    /**
     * 在线时间(秒)
     */
    private Long onlineTime;
    /**
     *  行为成绩
     */
    private BigDecimal score;
    /**
     *  最终行为成绩
     */
    private BigDecimal finalScore;
    /**
     * 在线时间(小时)
     */
    private BigDecimal onlineTimeHour;
    /**
     * 有效学习次数
     */
    private Integer effectiveStudyCount;
    /**
     * 登录总次数
     */
    private Integer totalStudyCount;
    /**
     * 额外成绩
     */
    private BigDecimal additionActionScore;
    /**
     * 在线时间成绩
     */
    private BigDecimal onlineTimeScore;
    /**
     * 有效学习次数成绩
     */
    private BigDecimal effectiveStudyScore;
    /**
     * 登录总次数成绩
     */
    private BigDecimal totalStudyScore;

    private Integer siteId;
    /**
     * 登录方式
     */
    private String loginMode;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UserVo getUserVo() {
        return userVo;
    }

    public void setUserVo(UserVo userVo) {
        this.userVo = userVo;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public Calendar getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(Calendar loginTime) {
        this.loginTime = loginTime;
    }

    public Calendar getLogoutTime() {
        return logoutTime;
    }

    public void setLogoutTime(Calendar logoutTime) {
        this.logoutTime = logoutTime;
    }

    public Long getOnlineTime() {
        return onlineTime;
    }

    public void setOnlineTime(Long onlineTime) {
        this.onlineTime = onlineTime;
    }

    public String getLoginTimeStr() {
        return loginTimeStr;
    }

    public void setLoginTimeStr(String loginTimeStr) {
        this.loginTimeStr = loginTimeStr;
    }

    public String getLogoutTimeStr() {
        return logoutTimeStr;
    }

    public void setLogoutTimeStr(String logoutTimeStr) {
        this.logoutTimeStr = logoutTimeStr;
    }

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }

    public BigDecimal getFinalScore() {
        return finalScore;
    }

    public void setFinalScore(BigDecimal finalScore) {
        this.finalScore = finalScore;
    }

    public BigDecimal getOnlineTimeHour() {
        return onlineTimeHour;
    }

    public void setOnlineTimeHour(BigDecimal onlineTimeHour) {
        this.onlineTimeHour = onlineTimeHour;
    }

    public Integer getEffectiveStudyCount() {
        return effectiveStudyCount;
    }

    public void setEffectiveStudyCount(Integer effectiveStudyCount) {
        this.effectiveStudyCount = effectiveStudyCount;
    }

    public BigDecimal getAdditionActionScore() {
        return additionActionScore;
    }

    public void setAdditionActionScore(BigDecimal additionActionScore) {
        this.additionActionScore = additionActionScore;
    }

    public Integer getTotalStudyCount() {
        return totalStudyCount;
    }

    public void setTotalStudyCount(Integer totalStudyCount) {
        this.totalStudyCount = totalStudyCount;
    }

    public BigDecimal getOnlineTimeScore() {
        return onlineTimeScore;
    }

    public void setOnlineTimeScore(BigDecimal onlineTimeScore) {
        this.onlineTimeScore = onlineTimeScore;
    }

    public BigDecimal getEffectiveStudyScore() {
        return effectiveStudyScore;
    }

    public void setEffectiveStudyScore(BigDecimal effectiveStudyScore) {
        this.effectiveStudyScore = effectiveStudyScore;
    }

    public BigDecimal getTotalStudyScore() {
        return totalStudyScore;
    }

    public void setTotalStudyScore(BigDecimal totalStudyScore) {
        this.totalStudyScore = totalStudyScore;
    }

    public Integer getSiteId() {
        return siteId;
    }

    public void setSiteId(Integer siteId) {
        this.siteId = siteId;
    }

    public String getLoginMode() {
        return loginMode;
    }

    public void setLoginMode(String loginMode) {
        this.loginMode = loginMode;
    }
}
