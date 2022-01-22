package net.gvsun.gsexam.vo.questionpool;

import java.io.Serializable;
import java.util.List;

/**************************************************************************
 * Description:试卷库的大项
 *
 * @author:lixueteng
 * @date:2017/12/19 0019
 **************************************************************************/
public class ExamMajorTermVO implements Serializable{
    /**
     * 大项的id
     */
    private Integer id;
    /**
     * 大项的标题
     */
    private String title;
    /**
     * 大项的小题数量
     */
    private int itemcount;
    /**
     * 大项的每道小题的分数
     */
    private double itemscore;
    /**
     * 大项对应的小题
     */
    private List<Integer>  itemids;

    public Integer getId() {
        return id;
    }

    public ExamMajorTermVO setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public ExamMajorTermVO setTitle(String title) {
        this.title = title;
        return this;
    }

    public int getItemcount() {
        return itemcount;
    }

    public ExamMajorTermVO setItemcount(int itemcount) {
        this.itemcount = itemcount;
        return this;
    }

    public double getItemscore() {
        return itemscore;
    }

    public ExamMajorTermVO setItemscore(double itemscore) {
        this.itemscore = itemscore;
        return this;
    }

    public List<Integer> getItemids() {
        return itemids;
    }

    public ExamMajorTermVO setItemids(List<Integer> itemids) {
        this.itemids = itemids;
        return this;
    }
}
