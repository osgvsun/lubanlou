package net.gvsun.gsquestionpool.vo.exampool;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * Created by 李雪腾 on 2017/9/13 0013.
 * 考试详情页面dto
 */
public class ExamDetailVo implements Serializable{
    private Integer id;
    private String username;
    private Double score;
    private long submitTime;
    private long totalTime;
    private String title;
    private Map<String,Integer> pageModel;
    private List<ExamItemVo> examItemVoList;
    private Integer status;
    private List<Integer> itemIds;


    public List<Integer> getItemIds() {
        return itemIds;
    }

    public ExamDetailVo setItemIds(List<Integer> itemIds) {
        this.itemIds = itemIds;
        return this;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public long getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(long totalTime) {
        this.totalTime = totalTime;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Map<String, Integer> getPageModel() {
        return pageModel;
    }

    public void setPageModel(Map<String, Integer> pageModel) {
        this.pageModel = pageModel;
    }

    public long getSubmitTime() {
        return submitTime;
    }

    public void setSubmitTime(long submitTime) {
        this.submitTime = submitTime;
    }

    public String getUsername() {

        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public List<ExamItemVo> getExamItemVoList() {
        return examItemVoList;
    }

    public void setExamItemVoList(List<ExamItemVo> examItemVoList) {
        this.examItemVoList = examItemVoList;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
