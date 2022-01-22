package net.gvsun.configcenter.internal;
import io.swagger.annotations.ApiModel;
import lombok.Data;


@Data
@ApiModel(value="业务结果对象",description="业务结果对象")
public class ProjectAuditDataDTO {
   private String number;
   private String createUser;
   private String projectName;
   private String responsibleUser;
   private String phone;
   private String date;
   private String projectNumber;
   private String budget;
   private String actualSum;
   private String biddingSum;
   private String currentStep;
}
