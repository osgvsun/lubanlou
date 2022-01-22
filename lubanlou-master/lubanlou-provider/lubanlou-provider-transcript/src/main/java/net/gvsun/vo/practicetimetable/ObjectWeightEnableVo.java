package net.gvsun.vo.practicetimetable;

import java.io.Serializable;

/**
 * Created by REM on 2019/10/29.
 */
public class ObjectWeightEnableVo implements Serializable{
    private String[] data;

    private Integer marked;

    public String[] getData() {
        return data;
    }

    public void setData(String[] data) {
        this.data = data;
    }

    public Integer getMarked() {
        return marked;
    }

    public void setMarked(Integer marked) {
        this.marked = marked;
    }
}
