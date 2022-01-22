package net.gvsun.gsexam.dto.exam;

import java.io.Serializable;
import java.util.Map;

/**
 * Created by REM on 2020/11/25.
 */
public class SubmitItemDTO implements Serializable{
    //站点id
    private Integer cid;
    //考试id
    private Integer assignmentId;
    //第几次考试
    private Integer submitTime ;
    //传0
    private Integer simulation ;
    //提交人
    private String username;
    //提交人姓名
    private String cname;
    //题目与答案集合，两种形式answerMap.put("answers" + id, answers);answerMap.put("answertexts" + id, answertexts);
    // id为itemId题目id，answers为item表下属answer表的关联主键id，answertexts为填空题与简答题答案，填空题可能与多空；
    Map<String,String[]> items;

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public Integer getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Integer assignmentId) {
        this.assignmentId = assignmentId;
    }

    public Integer getSubmitTime() {
        return submitTime;
    }

    public void setSubmitTime(Integer submitTime) {
        this.submitTime = submitTime;
    }

    public Integer getSimulation() {
        return simulation;
    }

    public void setSimulation(Integer simulation) {
        this.simulation = simulation;
    }

    public Map<String, String[]> getItems() {
        return items;
    }

    public void setItems(Map<String, String[]> items) {
        this.items = items;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }
}
