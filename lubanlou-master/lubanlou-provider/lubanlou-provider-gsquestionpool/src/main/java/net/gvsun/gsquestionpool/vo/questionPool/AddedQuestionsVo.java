package net.gvsun.gsquestionpool.vo.questionPool;

import java.io.Serializable;


public class AddedQuestionsVo implements Serializable {
    /**
     * 试卷的id
     */
    private Integer id;
    /**
     * 试卷的名称
     */
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
