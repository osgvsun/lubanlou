package net.gvsun.vo;

import java.io.Serializable;

/**
 * Created by REM on 2019/7/5.
 */
public class SjtudcTranscriptVo implements Serializable{
    private String pjname;
    private String pjitem;
    private Integer assignmentId;
    private Object[] student;

    public String getPjname() {
        return pjname;
    }

    public void setPjname(String pjname) {
        this.pjname = pjname;
    }

    public String getPjitem() {
        return pjitem;
    }

    public void setPjitem(String pjitem) {
        this.pjitem = pjitem;
    }

    public Integer getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Integer assignmentId) {
        this.assignmentId = assignmentId;
    }

    public Object[] getStudent() {
        return student;
    }

    public void setStudent(Object[] student) {
        this.student = student;
    }
}
