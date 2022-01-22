package net.domain;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "week_username")
public class WeekUsername {
    /**
     * 主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /**
     * 星期表id
     */
    private Integer weekId;
    /**
     * 用户名
     */
    private String username;
    /**
     * 用户姓名
     */
    private String cname;
    /**
     * 用户邮箱
     */
    private String email;
    /**
     * 用户电话号码
     */
    private String telephone;
}
