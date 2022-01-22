package net.gvsun.usercenter.internal;

import java.io.Serializable;

public class PhoneDto implements Serializable {
    private Long id;
    private String phone;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
