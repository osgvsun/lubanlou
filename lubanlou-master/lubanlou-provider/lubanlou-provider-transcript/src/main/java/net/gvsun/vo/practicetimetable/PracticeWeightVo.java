package net.gvsun.vo.practicetimetable;

import net.gvsun.vo.TWeightSettingVO;

import java.io.Serializable;
import java.util.List;

public class PracticeWeightVo implements Serializable{
    /**
     * 所属课程
     */
    private String courseNumber;
    /**
     * 所属工种（工训的工种编号）
     */
    private String experimentTitle;
    /**
     * 评分项
     */
    private List<TWeightSettingVO> tWeightSettingVOList;

    public String getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber) {
        this.courseNumber = courseNumber;
    }

    public String getExperimentTitle() {
        return experimentTitle;
    }

    public void setExperimentTitle(String experimentTitle) {
        this.experimentTitle = experimentTitle;
    }

    public List<TWeightSettingVO> gettWeightSettingVOList() {
        return tWeightSettingVOList;
    }

    public void settWeightSettingVOList(List<TWeightSettingVO> tWeightSettingVOList) {
        this.tWeightSettingVOList = tWeightSettingVOList;
    }
}
