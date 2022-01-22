package net.service.sms;

import net.gvsun.common.KafkaDTO;
import net.gvsun.message.external.ApiInputMessageDTO;
import net.gvsun.message.external.TestDTO;

public interface AliYunSmsService {
    public  String sendSmsAboutReviewNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception;
    public  String sendSmsAboutTeacherEvaluation(ApiInputMessageDTO apiInputMessageDTO) throws Exception;
    public  String sendSmsAboutPlatFormNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception;
    public  String sendSmsAboutConfigCenterFill(ApiInputMessageDTO apiInputMessageDTO) throws Exception;
    public  String sendSmsAboutAuditResult(ApiInputMessageDTO apiInputMessageDTO) throws Exception;
    public  String sendSmsAboutAuditNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception;
    public  String sendSmsAboutZjcclims(KafkaDTO kafkaDTO) throws Exception;
    public  String sendSmsAboutAuditCompleteNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception;
    public  String sendSmsAboutHuazhongkeji(TestDTO kafkaDTO) throws Exception;

    public  String sendSmsAboutNewStudentNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception;
    public  String sendSmsAboutDeselectionTutorNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception;
    public  String sendSmsAboutTutorChangeNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception;
    public  String sendSmsAboutStudentChangeNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception;



}
