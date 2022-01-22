package net.gvsun.configcenter.internal;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

/**
 * Description:学业导师师生表
 *
 * @author: 杨新蔚
 * @date: 2021/12/7
 */
@Data
@ToString
public class TeacherAndStudentDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    //业务结果id
    Integer timetableResultId ;
    //业务流程id
    Integer timetableProcessId ;
    //业务id
    Integer timetableId ;
    //教师工号
    String teacherUsername ;
    //教师姓名
    String teacherCname ;
    //教师信息（json格式）
    String teacherInfo;
    //学生工号
    String studentUsername ;
    //学生姓名
    String studentCname ;
    //学生信息（json格式）
    String studentInfo;
    //操作类别
    String indicatorEname;
    //是否审核
    Integer enabled;
}
