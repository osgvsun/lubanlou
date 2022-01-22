package net.gvsun.configcenter.internal;

import lombok.Data;

import java.io.Serializable;

/*************************************************************************************
 * Description:评审dto
 *
 * @author: 杨新蔚
 * @date: 2021/5/24
 *************************************************************************************/
@Data
public class MessageAssessDTO implements Serializable {
    //评审时间
    private String datetime;
    //项目名称
    private String type;
}
