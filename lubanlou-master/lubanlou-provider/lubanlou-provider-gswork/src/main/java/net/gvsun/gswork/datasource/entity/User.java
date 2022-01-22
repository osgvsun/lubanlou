package net.gvsun.gswork.datasource.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
*  Description 用户user表单对象
*
*  @author weicheng
*  @date 2020/8/9 21:24
*/
@Data
@TableName("user")
@ToString
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

    @TableId(value = "id")
	private String username;
	private String attendanceTime;
	private String bachelorMajor;
	private String cardno;
	private String cname;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime createdAt;
	private String doctorMajor;
	private String duties;
	private String email;
	private Byte enabled;
	private Integer enrollmentStatus;
	private String grade;
	private String ifEnrollment;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime lastLogin;

	private String majorDirection;
	private String majorNumber;
	private String masterMajor;
	private String password;
	private String photoUrl;
	private String qq;
	private Integer teacherNumber;
	private String telephone;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime updatedAt;

	private String userRole;
	private String userSexy;
	private String userStatus;
	private Integer userType;
	private Integer isBlackList;
}