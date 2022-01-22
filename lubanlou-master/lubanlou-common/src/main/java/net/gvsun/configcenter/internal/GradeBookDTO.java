package net.gvsun.configcenter.internal;

/*************************************************************************************
 * Description:创建成绩册dto
 *
 * @author: 杨新蔚
 * @date： 2019/11/4
 *************************************************************************************/
public class GradeBookDTO {
    //站点id
    public Integer siteId;

    //课程名称
    public String siteName;

    //工种的编号
    public String experimentTitle;

    //工种名称
    public String assignmentTitle;

    //项目名
    public String type;

    //权重
    public Double weight;

    //项目名
    public String module;

    //课程编号
    public String courseNumber;

    //项目名
    public String product;

    //学期名称
    public String termNumber;

    //学期名称
    public String termName;

    public Integer getSiteId() {
        return siteId;
    }

    public void setSiteId(Integer siteId) {
        this.siteId = siteId;
    }

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public String getExperimentTitle() {
        return experimentTitle;
    }

    public void setExperimentTitle(String experimentTitle) {
        this.experimentTitle = experimentTitle;
    }

    public String getAssignmentTitle() {
        return assignmentTitle;
    }

    public void setAssignmentTitle(String assignmentTitle) {
        this.assignmentTitle = assignmentTitle;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public String getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber) {
        this.courseNumber = courseNumber;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getTermNumber() {
        return termNumber;
    }

    public void setTermNumber(String termNumber) {
        this.termNumber = termNumber;
    }

    public String getTermName() {
        return termName;
    }

    public void setTermName(String termName) {
        this.termName = termName;
    }
}
