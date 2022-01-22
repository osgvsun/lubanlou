package net.gvsun.gsexam.dto.exam;

import java.io.Serializable;
import java.util.List;

public class WkChapterDto implements Serializable{
    private Integer id;
    private String name;
    private Integer type;

    //外键-wklesson
    private List<WkLessonDto> wkLessons;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public List<WkLessonDto> getWkLessons() {
        return wkLessons;
    }

    public void setWkLessons(List<WkLessonDto> wkLessons) {
        this.wkLessons = wkLessons;
    }
}
