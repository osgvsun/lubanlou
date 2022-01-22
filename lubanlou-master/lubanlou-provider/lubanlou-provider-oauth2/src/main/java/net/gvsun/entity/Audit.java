package net.gvsun.entity;

import lombok.Data;
import net.gvsun.entity.key.AuditKey;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@IdClass(AuditKey.class)
@Table(name = "audit")
public class Audit implements Serializable {
    @Id
    @Column(name = "username")
    private String username;

    @Id
    @Column(name = "status")
    private Integer status;

    @Id
    @Column(name = "type")
    private String type;

    @Column(name = "audited")
    private Boolean audited;

    @Column(name = "comment")
    private String comment;

    @Column(name = "created_time")
    private LocalDateTime createdTime;
}
