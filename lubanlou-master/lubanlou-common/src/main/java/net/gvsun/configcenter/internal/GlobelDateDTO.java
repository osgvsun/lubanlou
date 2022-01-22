package net.gvsun.configcenter.internal;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

/*************************************************************************************
 * Description:起止时间dto
 *
 * @author: 杨新蔚
 * @date: 2020/4/21
 *************************************************************************************/
@NoArgsConstructor
@Data
public class GlobelDateDTO {
    Date startDate;
    Date endDate;
}
