package net.gvsun.gsquestionpool.vo.common;

import java.io.Serializable;
import java.util.List;

/**************************************************************************
 * Description:使用layui 上传之后成功返回码的vo
 *
 * @author:lixueteng
 * @date:2017/12/7 0007
 **************************************************************************/
public class LayuiUpLoadResponseVo implements Serializable {
    private Integer code;
    private String msg;
    private List<info> data;


    public Integer getCode() {
        return code;
    }

    public LayuiUpLoadResponseVo setCode(Integer code) {
        this.code = code;
        return this;
    }

    public String getMsg() {
        return msg;
    }

    public LayuiUpLoadResponseVo setMsg(String msg) {
        this.msg = msg;
        return this;
    }

    public List<info> getData() {
        return data;
    }

    public LayuiUpLoadResponseVo setData(List<info> data) {
        this.data = data;
        return this;
    }

    class info{
        private String src;

        public String getSrc() {
            return src;
        }

        public info setSrc(String src) {
            this.src = src;
            return this;
        }
    }
}
