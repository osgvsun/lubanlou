package net.gvsun.gswork.vo.courseInfo;

import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.Date;

public class TimetableVirtualImageDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value="课程id",name="courseId")
    private String courseId;

    @ApiModelProperty(value="镜像id",name="virtualImage")
    private String virtualImage;

    @ApiModelProperty(value="开始时间",name="startTime")
    private Date startTime;

    @ApiModelProperty(value="结束时间",name="endTime")
    private Date endTime;

    @ApiModelProperty(value="预约id",name="id")
    private Integer id;

    @ApiModelProperty(value="区分镜像(0为华栖云)",name="flag")
    private Integer flag;

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getVirtualImage() {
        return virtualImage;
    }

    public void setVirtualImage(String virtualImage) {
        this.virtualImage = virtualImage;
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getFlag() {
        return flag;
    }

    public void setFlag(Integer flag) {
        this.flag = flag;
    }
}
