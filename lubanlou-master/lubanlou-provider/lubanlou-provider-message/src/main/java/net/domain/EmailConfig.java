package net.domain;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "email_config")
public class EmailConfig {
    /**
     * 主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /**
     * 项目名称
     */
    private String projectName;
    /**
     * 服务器主机名
     */
    private String host;
    /**
     * 邮箱授权码
     */
    private String password;
    /**
     * 端口
     */
    private Integer port;
    /**
     * 发送者邮箱
     */
    private String username;
}
