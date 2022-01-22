package net.gvsun.gswork.vo.courseInfo;

import java.io.Serializable;

/**************************************************************************
 * Description:排课vo
 *
 * @author:mashuai
 * @date:2018/5/21
 **************************************************************************/
public class ScheduleVo implements Serializable {
    /**
     * id
     */
    private Integer id;
    /**
     * 场区id
     */
    private String area;
    /**
     * 周几
     */
    private Integer weekDay;
    /**
     * 开始节次
     */
    private Integer startClass;
    /**
     * 结束节次
     */
    private Integer endClass;
    /**
     * 开始周次
     */
    private Integer startWeek;
    /**
     * 结束周次
     */
    private Integer endWeek;
    /**
     * 课程名称
     */
    private String course;
    /**
     * 老师名字
     */
    private String teacher;
    /**
     * 容量
     */
    private Integer stuCapacity;
    /**
     * 学期
     */
    private String term;
    /**
     * 教室类型（暂定）
     */
    private String classType;
    /**
     * 学校（暂定）
     */
    private String campus;
    /**
     * 标志位，是否在当前学期
     */
    private Integer isNowTerm;
    /**
     * 课程如数（暂定）
     */
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public Integer getWeekDay() {
        return weekDay;
    }

    public void setWeekDay(Integer weekDay) {
        this.weekDay = weekDay;
    }

    public Integer getStartClass() {
        return startClass;
    }

    public void setStartClass(Integer startClass) {
        this.startClass = startClass;
    }

    public Integer getEndClass() {
        return endClass;
    }

    public void setEndClass(Integer endClass) {
        this.endClass = endClass;
    }

    public Integer getStartWeek() {
        return startWeek;
    }

    public void setStartWeek(Integer startWeek) {
        this.startWeek = startWeek;
    }

    public Integer getEndWeek() {
        return endWeek;
    }

    public void setEndWeek(Integer endWeek) {
        this.endWeek = endWeek;
    }


    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public Integer getStuCapacity() {
        return stuCapacity;
    }

    public void setStuCapacity(Integer stuCapacity) {
        this.stuCapacity = stuCapacity;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public String getClassType() {
        return classType;
    }

    public void setClassType(String classType) {
        this.classType = classType;
    }

    public String getCampus() {
        return campus;
    }

    public void setCampus(String campus) {
        this.campus = campus;
    }

    public Integer getIsNowTerm() {
        return isNowTerm;
    }

    public void setIsNowTerm(Integer isNowTerm) {
        this.isNowTerm = isNowTerm;
    }
}
