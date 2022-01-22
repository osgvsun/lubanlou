package net.gvsun.usercenter.internal;

import java.io.Serializable;


public class CardDto implements Serializable {
    private Long id;
    private String cardNo;//卡号
    private String cardType;//卡号类型

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }
}
