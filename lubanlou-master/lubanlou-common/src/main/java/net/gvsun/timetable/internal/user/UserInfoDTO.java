package net.gvsun.timetable.internal.user;


import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
*  Description
*
*  @author 刘艾洋
*  @date 2021/2/18 11:26
*/
@Data
public class UserInfoDTO {
    Integer id;
    String username;
    /**
     * 学号
     */
    String cname;
    /**
     * 姓名
     */
    Integer userSex;
    /**
     * 性别1 男，2 女
     */
    String password;
    /**
     * 密码
     */
    String email;
    /**
     * 邮箱
     */
    String mobile;
    /**
     * 手机
     */
    String department;
    /**
     * 院系
     */
    String academy;
    /**
     * 学院
     */
    Integer enabled;

    /**
     * 0 不在校，1 在校
     */

    public UserInfoDTO(
            Integer id,
            String username,
            String cname,
            Integer userSex,
            String password,
            String email,
            String mobile,
            String department,
            String academy,
            Integer enabled) {
        this.id = id;
        this.username = username;
        this.cname = cname;
        this.userSex = userSex;
        this.password = password;
        this.email = email;
        this.mobile = mobile;
        this.department = department;
        this.academy = academy;
        this.enabled = enabled;
    }

    public static List<UserInfoDTO> getMockData(){
        List<UserInfoDTO> userInfoList = new ArrayList<>();
        userInfoList.add(new UserInfoDTO(1,"10001","用户1",1,"123456","12345@qq.com","1311111111","水能","水利",1));
        userInfoList.add(new UserInfoDTO(2,"10002","用户2",2,"123456","12345@qq.com","1311111111","水能","水利",1));
        userInfoList.add(new UserInfoDTO(3,"10003","用户3",1,"123456","123231","123231","信息","水利",1));
        return userInfoList;
    }
}