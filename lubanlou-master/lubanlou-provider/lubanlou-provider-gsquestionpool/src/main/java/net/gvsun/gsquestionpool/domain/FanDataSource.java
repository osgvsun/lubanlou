package net.gvsun.gsquestionpool.domain;



import javax.persistence.*;
import java.io.Serializable;

/**
 * @description
 * @author: fanxl
 * @date: 2018/9/26 0026 12:15
 */
@Entity
@NamedQuery(name="FanDataSource.findAll", query="SELECT f FROM FanDataSource f")
public class FanDataSource implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String cName;

    private String url;

    private String username;

    private String password;


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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

    public String getcName() {
        return cName;
    }

    public void setcName(String cName) {
        this.cName = cName;
    }
}
