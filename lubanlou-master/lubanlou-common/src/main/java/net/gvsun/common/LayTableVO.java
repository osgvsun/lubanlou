package net.gvsun.common;

import lombok.Data;
import lombok.EqualsAndHashCode;


/**
 * 适用于layui表格的前端vo，继承公共result类
 *
 * @author FuShiLiang
 * @since 2021-06-01
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class LayTableVO<T> extends Result<T> {

    private long count;

    public static <T> LayTableVO<T> ok(T data, Long count) {
        return layTableVO(data, ApiErrorCode.SUCCESS.getCode(), ApiErrorCode.SUCCESS.getMsg(), count);
    }

    public static <T> LayTableVO<T> failed(String msg) {
        return layTableVO(null, ApiErrorCode.FAILED.getCode(), msg, 0L);
    }

    private static <T> LayTableVO<T> layTableVO(T data, Long code, String msg, Long count) {
        LayTableVO<T> layTableVO = new LayTableVO<>();
        layTableVO.setCode(code);
        layTableVO.setMsg(msg);
        layTableVO.setData(data);
        layTableVO.setCount(count);
        return layTableVO;
    }
}
