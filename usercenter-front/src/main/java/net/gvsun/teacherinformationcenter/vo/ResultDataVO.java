package net.gvsun.teacherinformationcenter.vo;

import java.io.Serializable;

/**
 * 返回给前端的VO
 *
 * @author 陈敬
 * @since 2019年7月11日
 */
public class ResultDataVO<T> implements Serializable {
    private Integer code;   //状态位：0成功，1失败
    private String msg;     //状态描述
    private T data;         //数据

    public ResultDataVO() {
    }

    public ResultDataVO(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

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

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}