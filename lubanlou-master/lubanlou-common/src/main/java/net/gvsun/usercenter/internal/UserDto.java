package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.util.List;

public class UserDto implements Serializable {
    private Long id;
    private String username;    //用户名
    private String password;    //密码
    private Boolean enable;     //用户状态，true正常用户，false假删除用户
    private String cardNo;      //用户卡号
    private String cname;       //用户姓名
    private String collegeId;    //学院id

    private UserDetailDto userDetail;
    private List<CardDto> cardList;
    private List<EmailDto> emailList;
    private List<PhoneDto> phoneList;
    private List<QQDto> qqList;
    private List<WeChatDto> weChatList;
    private List<RoleDto> roleList;
    private List<GroupsDto> groupsList;
    private List<SiteDto> siteList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getEnable() {
        return enable;
    }

    public void setEnable(Boolean enable) {
        this.enable = enable;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public String getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(String collegeId) {
        this.collegeId = collegeId;
    }

    public UserDetailDto getUserDetail() {
        return userDetail;
    }

    public void setUserDetail(UserDetailDto userDetail) {
        this.userDetail = userDetail;
    }

    public List<CardDto> getCardList() {
        return cardList;
    }

    public void setCardList(List<CardDto> cardList) {
        this.cardList = cardList;
    }

    public List<EmailDto> getEmailList() {
        return emailList;
    }

    public void setEmailList(List<EmailDto> emailList) {
        this.emailList = emailList;
    }

    public List<PhoneDto> getPhoneList() {
        return phoneList;
    }

    public void setPhoneList(List<PhoneDto> phoneList) {
        this.phoneList = phoneList;
    }

    public List<QQDto> getQqList() {
        return qqList;
    }

    public void setQqList(List<QQDto> qqList) {
        this.qqList = qqList;
    }

    public List<WeChatDto> getWeChatList() {
        return weChatList;
    }

    public void setWeChatList(List<WeChatDto> weChatList) {
        this.weChatList = weChatList;
    }

    public List<RoleDto> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<RoleDto> roleList) {
        this.roleList = roleList;
    }

    public List<GroupsDto> getGroupsList() {
        return groupsList;
    }

    public void setGroupsList(List<GroupsDto> groupsList) {
        this.groupsList = groupsList;
    }

    public List<SiteDto> getSiteList() {
        return siteList;
    }

    public void setSiteList(List<SiteDto> siteList) {
        this.siteList = siteList;
    }
}
