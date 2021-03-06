/**
 * Created by REM on 2019/3/11.
 */
package net.gvsun.vo;

import io.swagger.annotations.ApiModelProperty;

/**
 * 返回结果类
 *
 * @param <T> 类型
 */

public class ResultVo<T> {

    @ApiModelProperty("状态码 0失败 1成功 ")
    private Integer code;
    @ApiModelProperty("返回信息")
    private String msg;
    @ApiModelProperty("返回数据")
    private T data;

    public ResultVo(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public ResultVo(Integer code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    /**
     * 请求成功  状态码 1
     *
     * @param msg 返回信息
     * @param <T> 类型
     * @return ResultVO
     */
    public static <T> ResultVo getSuccess(String msg) {
        return new ResultVo(1, msg);
    }

    /**
     * 请求成功  状态码 1
     *
     * @param msg  返回信息
     * @param data 返回对象
     * @param <T>  类型
     * @return ResultVO
     */
    public static <T> ResultVo getSuccess(String msg, T data) {
        return new ResultVo(1, msg, data);
    }

    /**
     * 请求失败   状态码 0
     *
     * @param msg 返回信息
     * @param <T> 类型
     * @return ResultVO
     */
    public static <T> ResultVo getFailed(String msg) {
        return new ResultVo(0, msg);
    }

    /**
     * 请求失败  状态 0
     *
     * @param msg  返回信息
     * @param data 返回数据
     * @param <T>  类型
     * @return ResultVO
     */
    public static <T> ResultVo getFailed(String msg, T data) {
        return new ResultVo(0, msg, data);
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