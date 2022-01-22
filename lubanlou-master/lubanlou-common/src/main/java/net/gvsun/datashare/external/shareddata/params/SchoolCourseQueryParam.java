package net.gvsun.datashare.external.shareddata.params;

import lombok.Data;
import lombok.ToString;

/**
 * 检索schoolCourse的参数对象
 */
@Data
@ToString
public class SchoolCourseQueryParam {
    /**
     * 当前页
     */
    private Integer page;
    /**
     * 每页显示数
     */
    private Integer limit;
    /**
     * 搜索字段course_code、course_no、course_number、teacher、course_name
     */
    private String search;

    private Boolean outputCourseNo = true; // 开启/关闭courseNo
    private Boolean outputCourseCode = true;// 开启/关闭courseCode
    private Boolean outputCourseNumber = true;// 开启/关闭courseNumber
    private Boolean outputTeacher = true;// 开启/关闭teacher
    private Boolean outputCourseName = true;// 开启/关闭courseName
    private Boolean outputTermId = true;// 开启/关闭termId
    private Boolean outputCourseType = true;// 开启/关闭courseType
    private Boolean outputCourseStatus = true;// 开启/关闭courseStatus
    private Boolean outputAcademyNumber = true;// 开启/关闭academyNumber
    private Boolean outputPlanStudentNumber = true;// 开启/关闭planStudentNumber
    private Boolean outputState = true;// 开启/关闭state
    private Boolean outputIsExperimental = true;// 开启/关闭isExperimental
    private Boolean outputCourseRequirements = true;// 开启/关闭courseRequirements
    private Boolean outputClassNumbers = true;// 开启/关闭classNumbers
    private Boolean outputCourseSource = true;// 开启/关闭courseSource
    private Boolean outputTermNumber = true;// 开启/关闭termNumber
}
