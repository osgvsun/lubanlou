package net.gvsun.auditserver.external;


import java.io.Serializable;

/**
 * Created by Administrator on 2018/8/14.
 */
public class RestResult implements Serializable{
    private String status;
    private Object data;


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