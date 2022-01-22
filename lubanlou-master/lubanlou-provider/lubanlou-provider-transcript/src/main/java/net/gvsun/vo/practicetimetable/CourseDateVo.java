package net.gvsun.vo.practicetimetable;


import net.gvsun.transcript.external.TGradeObjectVO;

import java.io.Serializable;
import java.util.List;

/**
 * Created by REM on 2019/10/23.
 */
public class CourseDateVo implements Serializable{
    private Integer id;
    private String courseNumber;
    private String courseName;
    private String termNumber;
    private String termName;
    private boolean enable;
    private boolean marked;

    private List<TGradeObjectVO> work;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber) {
        this.courseNumber = courseNumber;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
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

    public List<TGradeObjectVO> getWork() {
        return work;
    }

    public void setWork(List<TGradeObjectVO> work) {
        this.work = work;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    public boolean isMarked() {
        return marked;
    }

    public void setMarked(boolean marked) {
        this.marked = marked;
    }
}
