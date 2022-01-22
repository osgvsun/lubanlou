package net.gvsun.gsexam.vo.exam;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;

/**
 * Created by Administrator on 2018/8/14.
 */
public class RestResult implements Serializable {

    @JsonIgnore
    public final static String SCUESS = "scuess";
    @JsonIgnore
    public final static String FAIL = "fail";

    private String status;
    private Object data;

    public RestResult() {
    }

    public RestResult(String status) {
        status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
