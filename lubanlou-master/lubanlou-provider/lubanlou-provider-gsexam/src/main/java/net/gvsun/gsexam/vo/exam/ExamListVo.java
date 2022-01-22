package net.gvsun.gsexam.vo.exam;

import net.gvsun.gsexam.dto.common.SchoolClassesVo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class ExamListVo implements Serializable {
    private Integer id;
    private Date startTime;
    private String startTime1;
    private Date dueTime;
    private String dueTime1;
    private String title;
    private Integer status;
    private String academyNumber;
    private boolean flag;
    private String qrcodeUrl;
    private Integer times;
    private Integer min;
    private Integer limitTime;
    private Integer cid;
    private String createdBy;

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    //班级
    private List<SchoolClassesVo> schoolClass;
    //是否为补考
    private String isMakeUpExam;
    //补考考试ID
    private Integer oldAssignmentId;
    //补考名单
    private List<TAssignmentGradingVO> tAssignmentGrading;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public String getStartTime1() {
        return startTime1;
    }

    public void setStartTime1(String startTime1) {
        this.startTime1 = startTime1;
    }

    public Date getDueTime() {
        return dueTime;
    }

    public void setDueTime(Date dueTime) {
        this.dueTime = dueTime;
    }

    public String getDueTime1() {
        return dueTime1;
    }

    public void setDueTime1(String dueTime1) {
        this.dueTime1 = dueTime1;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAcademyNumber() {
        return academyNumber;
    }

    public void setAcademyNumber(String academyNumber) {
        this.academyNumber = academyNumber;
    }

    public List<SchoolClassesVo> getSchoolClass() {
        return schoolClass;
    }

    public void setSchoolClass(List<SchoolClassesVo> schoolClass) {
        this.schoolClass = schoolClass;
    }

    public Integer getOldAssignmentId() {
        return oldAssignmentId;
    }

    public void setOldAssignmentId(Integer oldAssignmentId) {
        this.oldAssignmentId = oldAssignmentId;
    }

    public String getIsMakeUpExam() {
        return isMakeUpExam;
    }

    public void setIsMakeUpExam(String isMakeUpExam) {
        this.isMakeUpExam = isMakeUpExam;
    }

    public List<TAssignmentGradingVO> gettAssignmentGrading() {
        return tAssignmentGrading;
    }

    public void settAssignmentGrading(List<TAssignmentGradingVO> tAssignmentGrading) {
        this.tAssignmentGrading = tAssignmentGrading;
    }

    public boolean getFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public String getQrcodeUrl() {
        return qrcodeUrl;
    }

    public void setQrcodeUrl(String qrcodeUrl) {
        this.qrcodeUrl = qrcodeUrl;
    }

    public Integer getTimes() {
        return times;
    }

    public void setTimes(Integer times) {
        this.times = times;
    }

    public Integer getMin() {
        return min;
    }

    public void setMin(Integer min) {
        this.min = min;
    }

    public Integer getLimitTime() {
        return limitTime;
    }

    public void setLimitTime(Integer limitTime) {
        this.limitTime = limitTime;
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

}
