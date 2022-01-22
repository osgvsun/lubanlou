package net.gvsun.gsexam.vo.test;

import net.gvsun.gsexam.vo.exam.ExamItemVo;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * Created by 李雪腾 on 2017/9/13 0013.
 * 考试详情页面dto
 */
public class TestDetailVo implements Serializable{
    private Integer id;
    private String username;
    private Double score;
    private long submitTime;
    private long totalTime;
    private String title;
    private List<ExamItemVo> itemVoList;
    private Integer totalItemNumber;
    private List<List<ExamItemVo>> examItemVoList;
    private Map<String,Integer> pageModel;

    public Map<String, Integer> getPageModel() {
        return pageModel;
    }

    public void setPageModel(Map<String, Integer> pageModel) {
        this.pageModel = pageModel;
    }

    public List<List<ExamItemVo>> getExamItemVoList() {
        return examItemVoList;
    }

    public TestDetailVo setExamItemVoList(List<List<ExamItemVo>> examItemVoList) {
        this.examItemVoList = examItemVoList;
        return this;
    }

    public Integer getId() {
        return id;
    }

    public TestDetailVo setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public TestDetailVo setUsername(String username) {
        this.username = username;
        return this;
    }

    public Double getScore() {
        return score;
    }

    public TestDetailVo setScore(Double score) {
        this.score = score;
        return this;
    }

    public long getSubmitTime() {
        return submitTime;
    }

    public TestDetailVo setSubmitTime(long submitTime) {
        this.submitTime = submitTime;
        return this;
    }

    public long getTotalTime() {
        return totalTime;
    }

    public TestDetailVo setTotalTime(long totalTime) {
        this.totalTime = totalTime;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public TestDetailVo setTitle(String title) {
        this.title = title;
        return this;
    }

    public List<ExamItemVo> getItemVoList() {
        return itemVoList;
    }

    public TestDetailVo setItemVoList(List<ExamItemVo> itemVoList) {
        this.itemVoList = itemVoList;
        return this;
    }

    public Integer getTotalItemNumber() {
        return totalItemNumber;
    }

    public TestDetailVo setTotalItemNumber(Integer totalItemNumber) {
        this.totalItemNumber = totalItemNumber;
        return this;
    }
}
