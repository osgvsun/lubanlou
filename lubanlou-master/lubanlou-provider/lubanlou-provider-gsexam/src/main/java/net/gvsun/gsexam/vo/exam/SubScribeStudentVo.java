package net.gvsun.gsexam.vo.exam;

import java.io.Serializable;

/**************************************************************************
 * Description:已经预约考试的vo
 *
 * @author:lixueteng
 * @date:2017/10/25 0025
 **************************************************************************/
public class SubScribeStudentVo implements Serializable {
    /**
     * 序号
     */
    private Integer id;
    /**
     * 学号
     */
    private String username;
    /**
     * 姓名
     */
    private String cname;
    /**
     * 班级
     */
    private String classes;
    /**
     * 学院
     */
    private String academy;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getClasses() {
        return classes;
    }

    public void setClasses(String classes) {
        this.classes = classes;
    }

    public String getAcademy() {
        return academy;
    }

    public void setAcademy(String academy) {
        this.academy = academy;
    }
}
