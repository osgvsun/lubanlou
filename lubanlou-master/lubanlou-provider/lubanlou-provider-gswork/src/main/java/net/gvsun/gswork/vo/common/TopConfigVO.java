package net.gvsun.gswork.vo.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 作业微服务-顶部栏模块显示vo
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopConfigVO implements Serializable {
    /**
     * 模块名称
     */
    private String name;
    /**
     * 父模块标识
     */
    private String module;
    /**
     * 子模块标识
     */
    private String subModule;
}
