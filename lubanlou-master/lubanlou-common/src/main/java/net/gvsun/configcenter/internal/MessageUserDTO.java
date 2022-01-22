package net.gvsun.configcenter.internal;

import lombok.Data;

import java.io.Serializable;

@Data
public class MessageUserDTO implements Serializable {
    private String username;
    private String cname;
    private String phone;
    private String email;
    private String status;
}
