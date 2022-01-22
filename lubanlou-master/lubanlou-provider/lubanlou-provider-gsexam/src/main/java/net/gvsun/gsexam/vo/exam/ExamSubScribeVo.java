package net.gvsun.gsexam.vo.exam;

import java.io.Serializable;
import java.util.Date;

/**************************************************************************
 * Description:预约考试列表vo
 *
 * @author:lixueteng
 * @date:2017/10/24 0024
 **************************************************************************/
public class ExamSubScribeVo implements Serializable{
    /**
     * 预约考试的序号
     */
    private Integer id;
    /**
     * 预约考试的名称
     */
    private String title;
    /**
     * 预约考试的已选人数
     */
    private Integer selectedNumber;
    /**
     * 预约考试的可选人数
     */
    private Integer chooseableNumber;
    /**
     * 预约考试的开始时间
     */
    private Date startTime;
    /**
     * 预约考试的截止时间
     */
    private Date endTime;

    /**
     * 教师名
     */
    private String teacherName;

    /**
     * 当前登录人的预约状态
     */
    private Integer status;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

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

    public Integer getSelectedNumber() {
        return selectedNumber;
    }

    public void setSelectedNumber(Integer selectedNumber) {
        this.selectedNumber = selectedNumber;
    }

    public Integer getChooseableNumber() {
        return chooseableNumber;
    }

    public void setChooseableNumber(Integer chooseableNumber) {
        this.chooseableNumber = chooseableNumber;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }
}
