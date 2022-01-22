package net.gvsun.configcenter.internal;

import java.io.Serializable;

public class JsonReturnVo implements Serializable {

    private static final long serialVersionUID = 1L;

    private long code;
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

    public long getCode() {
        return code;
    }

    public void setCode(long code) {
        this.code = code;
    }

    public void setResult(Object result) {
        this.result = result;
    }

    public static JsonReturnVo errorJson(String errorCode){
        JsonReturnVo jsonReturnVo = new JsonReturnVo();
        jsonReturnVo.setErrorCode(errorCode);
        jsonReturnVo.setState("error");
        jsonReturnVo.setResult(errorCode);
        return jsonReturnVo;
    }

    public static JsonReturnVo successJson(Object result){
        JsonReturnVo jsonReturnVo = new JsonReturnVo();
        jsonReturnVo.setResult(result);
        jsonReturnVo.setState("success");
        jsonReturnVo.setCode(200);
        return jsonReturnVo;
    }
}
