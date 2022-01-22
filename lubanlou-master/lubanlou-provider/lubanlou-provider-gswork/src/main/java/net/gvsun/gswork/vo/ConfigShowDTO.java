package net.gvsun.gswork.vo;

import java.io.Serializable;

/**
 * Created by Remli on 2021/4/27.
 */
public class ConfigShowDTO implements Serializable{
    //显示1，不显示0
    //模板名称
    private String title;
    //以下是字段名
    //所属章节
    private Integer chapter;
    //实验项目
    private Integer experiment;
    //课时小节
    private Integer lesson;
    //成绩册
    private Integer transcript;
    //查重
    private Integer duplicateChecking;
    //小组作业
    private Integer group;
    //在线批阅
    private Integer onlineMarking;
    //重复作业
    private Integer repeatAssignment;
    //附件类型
    private Integer noLimit;
    private Integer pdf;
    private Integer word;
    private Integer excel;
    private Integer pic;
    private Integer txt;

    public Integer getTxt() {
        return txt;
    }

    public void setTxt(Integer txt) {
        this.txt = txt;
    }

    public Integer getNoLimit() {
        return noLimit;
    }

    public void setNoLimit(Integer noLimit) {
        this.noLimit = noLimit;
    }

    public Integer getPdf() {
        return pdf;
    }

    public void setPdf(Integer pdf) {
        this.pdf = pdf;
    }

    public Integer getWord() {
        return word;
    }

    public void setWord(Integer word) {
        this.word = word;
    }

    public Integer getExcel() {
        return excel;
    }

    public void setExcel(Integer excel) {
        this.excel = excel;
    }

    public Integer getPic() {
        return pic;
    }

    public void setPic(Integer pic) {
        this.pic = pic;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getChapter() {
        return chapter;
    }

    public void setChapter(Integer chapter) {
        this.chapter = chapter;
    }

    public Integer getExperiment() {
        return experiment;
    }

    public void setExperiment(Integer experiment) {
        this.experiment = experiment;
    }

    public Integer getLesson() {
        return lesson;
    }

    public void setLesson(Integer lesson) {
        this.lesson = lesson;
    }

    public Integer getTranscript() {
        return transcript;
    }

    public void setTranscript(Integer transcript) {
        this.transcript = transcript;
    }

    public Integer getDuplicateChecking() {
        return duplicateChecking;
    }

    public void setDuplicateChecking(Integer duplicateChecking) {
        this.duplicateChecking = duplicateChecking;
    }

    public Integer getGroup() {
        return group;
    }

    public void setGroup(Integer group) {
        this.group = group;
    }

    public Integer getOnlineMarking() {
        return onlineMarking;
    }

    public void setOnlineMarking(Integer onlineMarking) {
        this.onlineMarking = onlineMarking;
    }

    public Integer getRepeatAssignment() {
        return repeatAssignment;
    }

    public void setRepeatAssignment(Integer repeatAssignment) {
        this.repeatAssignment = repeatAssignment;
    }

    public static ConfigShowDTO configShowDTO(){
        ConfigShowDTO configShowDTO = new ConfigShowDTO();
        configShowDTO.setChapter(1);
        configShowDTO.setExperiment(1);
        configShowDTO.setLesson(1);
        configShowDTO.setDuplicateChecking(1);
        configShowDTO.setTranscript(1);
        configShowDTO.setOnlineMarking(1);
        configShowDTO.setGroup(1);
        configShowDTO.setRepeatAssignment(1);
        return configShowDTO;
    }
}
