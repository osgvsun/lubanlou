package net.gvsun.gswork.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "timetable_document_related")
public class TimetableDocumentRelated implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    Integer id;

    @Column(name="document_id")
    Integer WkUpload;
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

    public Integer getWkUpload() {
        return WkUpload;
    }

    public void setWkUpload(Integer wkUpload) {
        WkUpload = wkUpload;
    }

    public Integer getTimetableAppointment() {
        return timetableAppointment;
    }

    public void setTimetableAppointment(Integer timetableAppointment) {
        this.timetableAppointment = timetableAppointment;
    }
}

