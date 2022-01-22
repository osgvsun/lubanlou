package net.gvsun.configcenter.internal.api;

/**
 * 封装API的错误码
 * Created by macro on 2019/3/299.
 */
public interface IErrorCode {
    long getCode();

    String getMessage();
}
