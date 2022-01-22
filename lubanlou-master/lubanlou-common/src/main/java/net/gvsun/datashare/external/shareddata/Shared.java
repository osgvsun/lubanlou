package net.gvsun.datashare.external.shareddata;

import java.io.Serializable;

/**
 * 共享数据，所有共享数据DTO继承该类
 *
 * @author 付世亮
 * @since 2020-07-17
 */
public interface Shared extends Serializable {
    /**
     * 来源系统（教学）
     */
    String TEACH = "teach";

    /**
     * 来源系统（共享中心）
     */
    String DATA_SHARE = "data_share";


}
