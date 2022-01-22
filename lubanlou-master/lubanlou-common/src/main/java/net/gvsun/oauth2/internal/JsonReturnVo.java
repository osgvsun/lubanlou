package net.gvsun.oauth2.internal;

import java.io.Serializable;

public class JsonReturnVo implements Serializable {
    private String state;
    private String errorCode;
    private Object result;

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }
}
