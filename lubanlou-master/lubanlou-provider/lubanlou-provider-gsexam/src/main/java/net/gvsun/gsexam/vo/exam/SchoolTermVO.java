package net.gvsun.gsexam.vo.exam;

import java.io.Serializable;

/**
 * Created by 77947 on 2018/3/6.
 */
public class SchoolTermVO implements Serializable {
    /*
    学期id
     */

    private Integer id;

    /*
        学期名称
     */
    private String termName;

    /*
        开始日期
     */
    private String termStart;

    /*
        结束日期
     */
    private String termEnd;

    private String yearCode;

    private Integer termCode;

    private Integer weekCount;
    /*
        当前学期标志位
    */
    private Integer nowTerm;

    public SchoolTermVO() {
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTermName() {
        return termName;
    }

    public void setTermName(String termName) {
        this.termName = termName;
    }

    public String getTermStart() {
        return termStart;
    }

    public String getTermEnd() {
        return termEnd;
    }


    public void setTermStart(String termStart) {
        this.termStart = termStart;
    }

    public void setTermEnd(String termEnd) {
        this.termEnd = termEnd;
    }

    public String getYearCode() {
        return yearCode;
    }

    public void setYearCode(String yearCode) {
        this.yearCode = yearCode;
    }

    public Integer getTermCode() {
        return termCode;
    }

    public void setTermCode(Integer termCode) {
        this.termCode = termCode;
    }

    public Integer getWeekCount() {
        return weekCount;
    }

    public void setWeekCount(Integer weekCount) {
        this.weekCount = weekCount;
    }

    public Integer getNowTerm() {
        return nowTerm;
    }

    public void setNowTerm(Integer nowTerm) {
        this.nowTerm = nowTerm;
    }
}