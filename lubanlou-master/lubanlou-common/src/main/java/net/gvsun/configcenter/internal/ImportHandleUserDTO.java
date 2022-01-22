package net.gvsun.configcenter.internal;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 * Description:导入用户操作dto
 *
 * @author: 杨新蔚
 * @date: 2021/12/30
 */
@Data
@ToString
public class ImportHandleUserDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    //工号
    String username ;
    //姓名
    String cname ;
    //对应操作，逻辑删除为0
    Integer type;
}
