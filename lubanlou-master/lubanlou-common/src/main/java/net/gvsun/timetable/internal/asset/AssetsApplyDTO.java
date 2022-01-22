package net.gvsun.timetable.internal.asset;
import java.io.Serializable;

/************************************************************
 * Descriptions：申购记录
 *
 * author 吴奇臻
 * date 2019-03-26
 ***************************************setId*********************/
public class AssetsApplyDTO implements Serializable{
    private String id;
    //申购批次编号
    private String batchNumber;
    // 申购日期
    private String date;
    // 物资类别
    private String goodsCategory;
    //  总金额
    private Double price;
    //采购日期开始时间
    private String startDate;
    //采购日期结束时间
    private String endDate;
    //学院
    private String academyNumber;
    //部门
    private String department;
    //申购人
    private String applicantUserName;
    //审核状态
    private String status;
    //采购用途
    private String purpose;
    //当前审核层级
    private String curAuditLevel;
    private String curAuditLevelName;
    //审核标志位（0待审核，1审核）
    private Integer auditFlag;
    //流程人标志位（0审核人，1发起人）
    private Integer appFlag;
    // 课程编号
    private String courseNo;
    // 拒绝原因
    private String rejectReason;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBatchNumber() {
        return batchNumber;
    }

    public void setBatchNumber(String batchNumber) {
        this.batchNumber = batchNumber;
    }

    public String getDate() {
        return date;
    }

    public String getCurAuditLevelName() {
        return curAuditLevelName;
    }

    public void setCurAuditLevelName(String curAuditLevelName) {
        this.curAuditLevelName = curAuditLevelName;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getGoodsCategory() {
        return goodsCategory;
    }

    public void setGoodsCategory(String goodsCategory) {
        this.goodsCategory = goodsCategory;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getAcademyNumber() {
        return academyNumber;
    }

    public void setAcademyNumber(String academyNumber) {
        this.academyNumber = academyNumber;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getApplicantUserName() {
        return applicantUserName;
    }

    public void setApplicantUserName(String applicantUserName) {
        this.applicantUserName = applicantUserName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getCurAuditLevel() {
        return curAuditLevel;
    }

    public void setCurAuditLevel(String curAuditLevel) {
        this.curAuditLevel = curAuditLevel;
    }

    public Integer getAuditFlag() {
        return auditFlag;
    }

    public void setAuditFlag(Integer auditFlag) {
        this.auditFlag = auditFlag;
    }

    public Integer getAppFlag() {
        return appFlag;
    }

    public void setAppFlag(Integer appFlag) {
        this.appFlag = appFlag;
    }

    public String getCourseNo() {
        return courseNo;
    }

    public void setCourseNo(String courseNo) {
        this.courseNo = courseNo;
    }

    public String getRejectReason() {
        return rejectReason;
    }

    public void setRejectReason(String rejectReason) {
        this.rejectReason = rejectReason;
    }
}