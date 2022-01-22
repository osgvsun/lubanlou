package net.service.email;

import net.gvsun.message.external.ApiInputMessageDTO;
import net.gvsun.message.external.TestDTO;

public interface SendEmailService {
    public  void sendEmail(ApiInputMessageDTO apiInputMessageDTO) throws Exception;
    public  void sendTestEmail(TestDTO testDTO) throws Exception;
    public  void sendEmailAboutNewStudentNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception;
    public  void sendEmailAboutDeselectionTutorNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception;
    public  void sendEmailAboutTutorChangeNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception;
    public  void sendEmailAboutStudentChangeNotice(ApiInputMessageDTO apiInputMessageDTO) throws Exception;
}
