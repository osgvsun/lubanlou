package net.gvsun.datashare.external.reportdata;

import lombok.Data;

/**
 * Created by Administrator on 2021/11/3.
 */
@Data
public class GitQuestionDTO {
    String question;
    String creator;
    String createTime;
    String assignor;
    String progress;
    String status;
    String days;
    String remarks;
    String link;
    Integer gitId;
    String isUpdate;
    String updateTime;
}
