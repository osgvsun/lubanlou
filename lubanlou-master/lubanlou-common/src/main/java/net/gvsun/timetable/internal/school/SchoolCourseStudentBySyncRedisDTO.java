package net.gvsun.timetable.internal.school;


import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
*  Description 根据school表的教学计划username的变化更新redis同步DTO
*
*  @author weicheng
*  @date 2020/10/27 10:17
*/
@Data
@ToString
public class SchoolCourseStudentBySyncRedisDTO implements Serializable {
    String key;
    String hkey;
    Integer term;
    String username;
    String insertType;
    String studentType;
    String[] array;
}
