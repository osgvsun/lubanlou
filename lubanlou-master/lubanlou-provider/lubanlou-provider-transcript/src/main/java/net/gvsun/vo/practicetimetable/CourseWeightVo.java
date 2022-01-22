package net.gvsun.vo.practicetimetable;

import net.gvsun.vo.TWeightSettingVO;

import java.io.Serializable;
import java.util.List;

/**
 * Created by REM on 2019/10/22.
 */
public class CourseWeightVo implements Serializable{
    private Integer code;
    private String msg;
    private Integer count;
    private List<TWeightSettingVO> data;

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

    public List<TWeightSettingVO> getData() {
        return data;
    }

    public void setData(List<TWeightSettingVO> data) {
        this.data = data;
    }
}
