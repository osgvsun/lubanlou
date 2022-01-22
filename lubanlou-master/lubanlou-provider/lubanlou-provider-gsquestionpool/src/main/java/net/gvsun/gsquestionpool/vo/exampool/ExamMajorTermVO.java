package net.gvsun.gsquestionpool.vo.exampool;

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

    /**
     * 大项对应的题库
     */
    private String itemQuestionPoolName;

    /**
     * 大项对应的题库
     */
    private String itemQuestionPoolType;
    /**
     * 大项对应的题库
     */
    private Integer itemQuestionPoolId;
    /**
     * 小题类型
     */
    private Integer itemType;


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

    public String getItemQuestionPoolName() {
        return itemQuestionPoolName;
    }

    public void setItemQuestionPoolName(String itemQuestionPoolName) {
        this.itemQuestionPoolName = itemQuestionPoolName;
    }

    public String getItemQuestionPoolType() {
        return itemQuestionPoolType;
    }

    public void setItemQuestionPoolType(String itemQuestionPoolType) {
        this.itemQuestionPoolType = itemQuestionPoolType;
    }

    public Integer getItemQuestionPoolId() {
        return itemQuestionPoolId;
    }

    public void setItemQuestionPoolId(Integer itemQuestionPoolId) {
        this.itemQuestionPoolId = itemQuestionPoolId;
    }

    public Integer getItemType() {
        return itemType;
    }

    public void setItemType(Integer itemType) {
        this.itemType = itemType;
    }
}
