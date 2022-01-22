package net.gvsun.configcenter.internal;

import lombok.Data;

import java.util.List;

/*************************************************************************************
 * Description:指标listdto
 *
 * @author: 杨新蔚
 * @date： 2021/11/9
 *************************************************************************************/
@Data
public class ConfigIndicatorListDTO {
    //常规指标list
    List<ConfigIndicatorDTO> normalConfigIndicatorDTOS;
    //参数指标list，用于调用api接口
    List<ConfigIndicatorDTO> paramConfigIndicatorDTOS;
}
