package net.config;

import net.domain.EmailConfig;
import net.repository.EmailConfigJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class EmailDataSource extends JavaMailSenderImpl {
    @Autowired
    private EmailConfigJPA emailRepository;
    @Autowired
    private JavaMailSender mailSender;

//    public String DEFAULT_PROJECT = "gvsun";

    private static EmailDataSource emailDataSource = null;

    private EmailDataSource(){};

    private EmailDataSource getInstance(){
        if (emailDataSource==null) {
            synchronized (EmailDataSource.class){
                if (emailDataSource==null){
                    emailDataSource = new EmailDataSource();
                }
            }
        }
        return emailDataSource;
    }

    /**
     * 首次加载初始化emailDataSource对象
     */
    @PostConstruct
    public void init() {
        emailDataSource = this;
        emailDataSource.mailSender = this.mailSender;
        emailDataSource.emailRepository = this.emailRepository;
    }

    /**
     * @Description: 修改邮件端配置项
     * @Author: 徐明杭
     * @CreateDate: 2019/5/7 12:04
     */
    public void changeDataSource(String project){
        try {
            EmailConfig email = emailRepository.findByProjectName(project);
            emailDataSource.setHost(email.getHost());
            emailDataSource.setPassword(email.getPassword());
            emailDataSource.setUsername(email.getUsername());
            emailDataSource.setPort(email.getPort());
            emailDataSource.setDefaultEncoding("utf8");
            this.mailSender = emailDataSource;
        }catch (NullPointerException e){
            System.out.println("=======邮箱参数错误，发送失败============");
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    public void changeemailDatsource(String host,String password,String username,Integer port){
        try {
            emailDataSource.setHost(host);
            emailDataSource.setPassword(password);
            emailDataSource.setUsername(username);
            emailDataSource.setPort(port);
            emailDataSource.setDefaultEncoding("utf8");
            this.mailSender = emailDataSource;
        }catch (NullPointerException e){
            System.out.println("=======邮箱参数错误，发送失败============");
        }catch (Exception e){
            e.printStackTrace();
        }

    }


}
