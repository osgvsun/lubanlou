package net.gvsun.dto.api;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * 通用返回对象
 * Created by macro on 2019/3/299.
 */
@ApiModel(value="通用返回结果dto",description="通用返回结果dto")
public class CommonResult<T> {
    @ApiModelProperty(value="结果状态码",name="code")
    private long code;
    @ApiModelProperty(value="结果集条数",name="count")
    private long count;
    @ApiModelProperty(value="总条数（分页查询时总条数）",name="total")
    private long total;
    @ApiModelProperty(value="结果信息",name="msg")
    private String msg;
    @ApiModelProperty(value="结果数据集合",name="data")
    private T data;

    public CommonResult() {
    }

    public CommonResult(long code, String msg, T data,long count,long total) {
        this.code = code;
        this.msg = msg;
        this.data = data;
        this.count = count;
        this.total = total;
    }

    /**
     * 成功返回结果
     *
     * @param data 获取的数据
     */
    public static <T> CommonResult<T> success(T data,long count,long total) {
        return new CommonResult<>(ResultCode.SUCCESS.getCode(),ResultCode.SUCCESS.getMessage(), data,count,total);
    }

    /**
     * 成功返回结果
     *
     * @param data 获取的数据
     * @param  message 提示信息
     */
    public static <T> CommonResult<T> success(T data, String message,long count,long total) {
        return new CommonResult<>(ResultCode.SUCCESS.getCode(), message, data,count,total);
    }

    /**
     * 失败返回结果
     * @param errorCode 错误码
     */
    public static <T> CommonResult<T> failed(IErrorCode errorCode) {
        return new CommonResult<>(errorCode.getCode(), errorCode.getMessage(), null,0,0);
    }

    /**
     * 失败返回结果
     * @param message 提示信息
     */
    public static <T> CommonResult<T> failed(String message) {
        return new CommonResult<>(ResultCode.FAILED.getCode(), message, null,0,0);
    }

    /**
     * 失败返回结果
     */
    public static <T> CommonResult<T> failed() {
        return failed(ResultCode.FAILED);
    }

    /**
     * 参数验证失败返回结果
     */
    public static <T> CommonResult<T> validateFailed() {
        return failed(ResultCode.VALIDATE_FAILED);
    }

    /**
     * 参数验证失败返回结果
     * @param message 提示信息
     */
    public static <T> CommonResult<T> validateFailed(String message) {
        return new CommonResult<>(ResultCode.VALIDATE_FAILED.getCode(), message, null,0,0);
    }

    /**
     * 未登录返回结果
     */
    public static <T> CommonResult<T> unauthorized(T data,long count) {
        return new CommonResult<>(ResultCode.UNAUTHORIZED.getCode(), ResultCode.UNAUTHORIZED.getMessage(), data,count,0);
    }

    /**
     * 未授权返回结果
     */
    public static <T> CommonResult<T> forbidden(T data,long count) {
        return new CommonResult<>(ResultCode.FORBIDDEN.getCode(), ResultCode.FORBIDDEN.getMessage(), data,count,0);
    }

    public long getCode() {
        return code;
    }

    public void setCode(long code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
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
