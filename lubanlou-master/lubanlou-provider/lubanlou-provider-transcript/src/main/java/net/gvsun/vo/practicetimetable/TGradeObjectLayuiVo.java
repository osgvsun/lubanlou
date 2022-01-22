package net.gvsun.vo.practicetimetable;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * Created by REM on 2019/10/24.
 */
public class TGradeObjectLayuiVo implements Serializable{
    private Integer code;
    private String msg;
    private Integer count;
    private List<Map<String,Object>> data;

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

    public List<Map<String, Object>> getData() {
        return data;
    }

    public void setData(List<Map<String, Object>> data) {
        this.data = data;
    }
}
