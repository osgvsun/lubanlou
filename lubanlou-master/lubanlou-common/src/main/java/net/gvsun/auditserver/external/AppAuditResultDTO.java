package net.gvsun.auditserver.external;

/**
 *
 * @Description 批量审核传递的数据DTO
 * @author SmarkLee
 * @Date 2021/2/5 11:22
 * @return
 **/
public class AppAuditResultDTO {
   String appUid;
   String appType;
   String auditResult;
   String auditInfo;

   public String getAppUid() {
      return appUid;
   }

   public void setAppUid(String appUid) {
      this.appUid = appUid;
   }

   public String getAppType() {
      return appType;
   }

   public void setAppType(String appType) {
      this.appType = appType;
   }

   public String getAuditResult() {
      return auditResult;
   }

   public void setAuditResult(String auditResult) {
      this.auditResult = auditResult;
   }

   public String getAuditInfo() {
      return auditInfo;
   }

   public void setAuditInfo(String auditInfo) {
      this.auditInfo = auditInfo;
   }
}
