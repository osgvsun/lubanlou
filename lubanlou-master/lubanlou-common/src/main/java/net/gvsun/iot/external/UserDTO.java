package net.gvsun.iot.external;

/**
 *  Description iot用户表对应DTO
 *
 *  @param
 *  @return
 *  @author 李涵
 *  @date 2020/7/27 10:17
 */

public class UserDTO {
    /**
     * username
     */
    String username;
    /**
     * cname 用户名
     */
    String cname;

    /**
     * 原始卡号
     */
    String cardNumber;

    /**
     * 电控对应卡号
     */
    String cardno;

    /**
     * 门禁对应卡号
     */
    String aclCard;
    /**
     * 对接第三方用户id
     */
    String userNo;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardno() {
        return cardno;
    }

    public void setCardno(String cardno) {
        this.cardno = cardno;
    }

    public String getAclCard() {
        return aclCard;
    }

    public void setAclCard(String aclCard) {
        this.aclCard = aclCard;
    }

    public String getUserNo() {
        return userNo;
    }

    public void setUserNo(String userNo) {
        this.userNo = userNo;
    }

    public UserDTO() {
    }

    public UserDTO(String username, String cname, String cardNumber, String cardno, String aclCard, String userNo) {
        this.username = username;
        this.cname = cname;
        this.cardNumber = cardNumber;
        this.cardno = cardno;
        this.aclCard = aclCard;
        this.userNo = userNo;
    }
}
