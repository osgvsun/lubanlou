package net.domain;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "week_config")
public class WeekConfig {
    /**
     * 主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /**
     * 星期几
     */
    private Integer weekday;
    private String weekdayName;

}
