package net.gvsun.vo.practicetimetable;

import java.io.Serializable;
import java.util.List;

/**
 * Created by REM on 2021/2/3.
 */
public class UserDTO implements Serializable{
    private String student;
    private String cname;
    private List<GradeIndicatorDTO> gradeList;

    public String getStudent() {
        return student;
    }

    public void setStudent(String student) {
        this.student = student;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public List<GradeIndicatorDTO> getGradeList() {
        return gradeList;
    }

    public void setGradeList(List<GradeIndicatorDTO> gradeList) {
        this.gradeList = gradeList;
    }
}
