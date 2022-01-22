package net.gvsun.timetable.internal.common;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
*  Description 通用权限配置的dto
*
*  @author weicheng
*  @date 2021/3/19 11:33
*/
@Data
public class AuthorizationDTO implements Serializable {

    /**
     * 微服务名称
     */
    private String serverName;
    /**
     * 权限模板名称
     */
    private String template;
    /**
     * 当前微服务下，当前模板下的授权模式
     */
    private List<AuthorizationDetailDTO> authors;
}
