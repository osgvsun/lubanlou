package net.gvsun.vo.practicetimetable;


import java.io.Serializable;
import java.util.List;

/**
 * Created by REM on 2019/10/23.
 */
public class CourseGradeObjectVo implements Serializable{
    private Integer code;
    private String msg;
    private Integer count;
    private List<CourseDateVo> data;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public List<CourseDateVo> getData() {
        return data;
    }

    public void setData(List<CourseDateVo> data) {
        this.data = data;
    }
}
