package net.gvsun.gswork.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


@Data
@Entity
@Table(name = "system_time")
public class SystemTime implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private Integer id;

    private String combine;

    @Column(name = "created_by")
    private String createdBy;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "end_date")
    private Date endDate;

    private Integer section;

    private String sequence;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "time_name")
    private String timeName;

    @Column(name = "updated_by")
    private String updatedBy;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_date")
    private Date updatedDate;

    @ManyToOne
    @JoinColumn(name = "campus_number")
    private SystemCampus systemCampus;

}