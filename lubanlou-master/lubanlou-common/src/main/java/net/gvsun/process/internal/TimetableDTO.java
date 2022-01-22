package net.gvsun.process.internal;

import java.io.Serializable;
import java.util.Date;

public class TimetableDTO implements Serializable {

    Integer id;
    Integer templateId;
    String sourceProject;
    String extendedBusiness;
    Integer isClosed;
    Date createdTime;
    String createdBy;

    String processKey;

    Integer currentStep;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Integer templateId) {
        this.templateId = templateId;
    }

    public String getSourceProject() {
        return sourceProject;
    }

    public void setSourceProject(String sourceProject) {
        this.sourceProject = sourceProject;
    }

    public String getExtendedBusiness() {
        return extendedBusiness;
    }

    public void setExtendedBusiness(String extendedBusiness) {
        this.extendedBusiness = extendedBusiness;
    }

    public Integer getIsClosed() {
        return isClosed;
    }

    public void setIsClosed(Integer isClosed) {
        this.isClosed = isClosed;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getProcessKey() {
        return processKey;
    }

    public void setProcessKey(String processKey) {
        this.processKey = processKey;
    }

    public Integer getCurrentStep() {
        return currentStep;
    }

    public void setCurrentStep(Integer currentStep) {
        this.currentStep = currentStep;
    }
}
