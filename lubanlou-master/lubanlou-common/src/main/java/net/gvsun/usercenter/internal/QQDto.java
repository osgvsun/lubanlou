package net.gvsun.usercenter.internal;

import java.io.Serializable;

public class QQDto implements Serializable {
    private Long id;
    private String qq;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }
}
