package net.gvsun.usercenter.internal;

import java.io.Serializable;

public class WeChatDto implements Serializable {
    private Long id;
    private String weChat;
    private String weCharId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWeChat() {
        return weChat;
    }

    public void setWeChat(String weChat) {
        this.weChat = weChat;
    }

    public String getWeCharId() {
        return weCharId;
    }

    public void setWeCharId(String weCharId) {
        this.weCharId = weCharId;
    }
}
