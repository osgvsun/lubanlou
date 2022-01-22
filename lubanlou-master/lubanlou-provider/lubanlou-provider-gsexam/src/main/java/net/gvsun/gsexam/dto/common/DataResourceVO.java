package net.gvsun.gsexam.dto.common;

import java.io.Serializable;

/**
 * @Auther:lay
 * @Date: 2019/1/10 15:35
 * @Description:
 */
public class DataResourceVO implements Serializable {
    public Integer id;
    public String name;
    public String cname;

    public DataResourceVO() {
    }

    public DataResourceVO(Integer id , String name, String cname) {
        this.id = id;
        this.name = name;
        this.cname = cname;
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

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cname='" + cname + '\''+'}';
    }
}
