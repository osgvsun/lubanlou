package net.gvsun.gsexam.dto.common;

import java.io.Serializable;

public class QuestionpoolCategoryVo implements Serializable {
    private Integer id;
    private String title;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
