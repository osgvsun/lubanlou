package net.gvsun.gsexam.dto.exam;

import java.io.Serializable;

/**
 * 测试抽题返回数据DTO
 * @author 罗璇
 * @date 2018年5月7日
 */
public class SelectRandomQuestionDTO implements Serializable {
    /**
     * 返回状态码(0-失败;1-成功)
     */
    private Integer resCode;
    /**
     * 返回提示信息
     */
    private String resMsg;
    /**
     * 返回数据
     */
    private String data;

    public Integer getResCode() {
        return resCode;
    }

    public void setResCode(Integer resCode) {
        this.resCode = resCode;
    }

    public String getResMsg() {
        return resMsg;
    }

    public void setResMsg(String resMsg) {
        this.resMsg = resMsg;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
