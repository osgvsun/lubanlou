package net.gvsun.gsexam.dto.exam.login;

import java.io.Serializable;
import java.util.Date;

/**************************************************************************
 * Description:考试预约的dto
 *
 * @author:lixueteng
 * @date:2017/10/24 0024
 **************************************************************************/
public class SubScribeExamDto implements Serializable{
    /**
     * 预约考试的id
     */
    private Integer id;
    /**
     * 预约考试的标题
     */
    private String title;
    /**
     * 预约考试的描述
     */
    private String description;
    /**
     * 预约考试的开始时间
     */
    private Date startDate;
    /**
     * 预约考试的截止时间
     */
    private Date endDate;
    /**
     * 预约考试的人数限制
     */
    private Integer number;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }
}
