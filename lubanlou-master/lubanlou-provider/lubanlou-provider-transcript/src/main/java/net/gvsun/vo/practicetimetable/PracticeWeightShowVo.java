package net.gvsun.vo.practicetimetable;



import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * Created by REM on 2020/8/14.
 */
public class PracticeWeightShowVo<T> implements Serializable{
    /**
     *  权重id
     */
    private Integer id;

    /**
     *  权重类型
     */
    private String type;

    /**
     *  权重大小
     */
    private String weight;
    /**
     *  名称
     */
    private String name;
    /**
     *  课程名称
     */
    private String lesson;
    /**
     *  学期名称
     */
    private String term;
    /**
     *  字段名
     */
    private String field;
    /**
     *  对应工种名称
     */
    private String workName;
    /**
     *  评分项等级
     */
    private Integer level;
    /**
     * 工训评分项id
     */
    private Integer practiceId;
    /**
     * 所属上一级评分项id
     */
    private Integer parentId;
    /**
     * 得分
     */
    private String score;

    private List<T> data;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLesson() {
        return lesson;
    }

    public void setLesson(String lesson) {
        this.lesson = lesson;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getWorkName() {
        return workName;
    }

    public void setWorkName(String workName) {
        this.workName = workName;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getPracticeId() {
        return practiceId;
    }

    public void setPracticeId(Integer practiceId) {
        this.practiceId = practiceId;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }
}
