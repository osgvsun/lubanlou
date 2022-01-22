package net.gvsun.gswork.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "timetable_group_related")
public class TimetableGroupRelated implements Serializable {
    private static final long serialVersionUID = 1L;
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    Integer id;

    @Column(name="group_id")
    Integer groupId;
    /**
     */
    @Column(name="appointment_id")
    Integer timetableAppointment;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Integer getTimetableAppointment() {
        return timetableAppointment;
    }

    public void setTimetableAppointment(Integer timetableAppointment) {
        this.timetableAppointment = timetableAppointment;
    }
}