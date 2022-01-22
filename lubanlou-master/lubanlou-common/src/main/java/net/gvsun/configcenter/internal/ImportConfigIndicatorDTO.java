package net.gvsun.configcenter.internal;
import lombok.Data;


/*************************************************************************************
 * Description:打分需求————导入指标excel
 *
 * @author: 杨新蔚
 * @date: 2021/4/19
 *************************************************************************************/
@Data
public class ImportConfigIndicatorDTO {
   private Integer indicatorNo;
   private String indicatCname;
   private String comment;
   private String standardScore;
   private Integer parentIndicatorNo;
}
