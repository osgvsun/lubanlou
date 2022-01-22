package net.gvsun.configcenter.internal;

import lombok.Data;

/*************************************************************************************
 * Description:业务分组用户导入dto
 *
 * @author: 杨新蔚
 * @date： 2021/12/1
 *************************************************************************************/
@Data
public class ImportGroupInfoDTO {
    private Integer groupId;
    private String username;
    private String cname;
    private Integer userRole;
    private String userInfo;
}
