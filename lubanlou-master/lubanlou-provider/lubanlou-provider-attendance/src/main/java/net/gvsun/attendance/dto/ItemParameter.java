package net.gvsun.attendance.dto;

import lombok.Data;

/**
 * Description :
 *
 * @Author : cjl
 * @CreateTime : 2021/8/19 12:07
 **/
@Data
public class ItemParameter {
    String courseName;
    String teachers;
    Integer page;
    Integer size;
}
