package net.gvsun.timetable.internal.timetable;

import lombok.Data;

import java.io.Serializable;

/**
 * Descriptions：共享库-SchoolCourseDetail的DTO对象
 *
 * @author 魏诚
 * @date  2018-09-04
 */
@Data
public class TimetableEntityDTO implements Serializable {
    private TimetableEntityLabDTO timetableLabRelated;
    private TimetableEntityTeacherDTO timetableTeacherRelated;
    private TimetableEntitySameNumberDTO timetableAppointmentSameNumber;
    private TimetableEntityGroupDTO timetableAppointmentGroup;
    private TimetableEntityGroupStudentDTO timetableGroupStudents;
    private TimetableEntityItemDTO timetableItemRelated;
}
