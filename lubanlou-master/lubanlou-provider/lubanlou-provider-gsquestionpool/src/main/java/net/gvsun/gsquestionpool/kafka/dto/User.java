package net.gvsun.gsquestionpool.kafka.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class User implements Serializable {
    private String username;
    private String password;
    private String cname;
    private Boolean enabled;
    private String gitlabUsername;
    private String gender;
    private String qqOpenId;
    private String wechatOpenId;
    private String phone;
    private String unionid;
    private Boolean firstLogin;
    private Boolean enterprise;
    private String email;
    private String sjtuUserNo;
    private String hduUserNo;
    private String sufeUserNo;
}
