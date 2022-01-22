package net.gvsun.configcenter.internal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/*************************************************************************************
 * Description:用户dto
 *
 * @author: 杨新蔚
 * @date: 2019/11/8
 *************************************************************************************/
@ApiModel(value = "DTO-UserDTO", description = "用户dto")
public class UserDTO implements Serializable {
    @ApiModelProperty(value="用户编号",name="username")
    private String username;

    @ApiModelProperty(value="用户名",name="cname")
    private String cname;

    @ApiModelProperty(value="用户名",name="identity")
    private String identity;

    @ApiModelProperty(value="班级编号",name="classNumber")
    private String classNumber;

    @ApiModelProperty(value="班级名",name="className")
    private String className;

    @ApiModelProperty(value="学院名",name="academyName")
    private String academyName;

    @ApiModelProperty(value="学时",name="classPeriod")
    private String classPeriod;

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

    public String getIdentity() {
        return identity;
    }

    public void setIdentity(String identity) {
        this.identity = identity;
    }

    public String getClassNumber() {
        return classNumber;
    }

    public void setClassNumber(String classNumber) {
        this.classNumber = classNumber;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getAcademyName() {
        return academyName;
    }

    public void setAcademyName(String academyName) {
        academyName = academyName;
    }

    public String getClassPeriod() {
        return classPeriod;
    }

    public void setClassPeriod(String classPeriod) {
        this.classPeriod = classPeriod;
    }

    @Override
    public boolean equals(Object obj) {
        UserDTO u = (UserDTO) obj;
        return username.equals(u.username);
    }

    @Override
    public int hashCode() {
        String in = username;
        return in.hashCode();
    }
}
