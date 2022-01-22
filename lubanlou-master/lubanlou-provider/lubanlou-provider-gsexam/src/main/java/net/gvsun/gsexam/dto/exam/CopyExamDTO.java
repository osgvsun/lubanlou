package net.gvsun.gsexam.dto.exam;

import java.io.Serializable;
import java.util.List;

/**
 * Created by REM on 2020/10/22.
 */
public class CopyExamDTO implements Serializable{
    private Integer id;
    private String title;
    private Integer examQuestionpoolId;
    private List<Integer> copyQuestionPoolId;
    private List<CopyItemComponentDTO> copyItemComponentDTOList;

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

    public Integer getExamQuestionpoolId() {
        return examQuestionpoolId;
    }

    public void setExamQuestionpoolId(Integer examQuestionpoolId) {
        this.examQuestionpoolId = examQuestionpoolId;
    }

    public List<Integer> getCopyQuestionPoolId() {
        return copyQuestionPoolId;
    }

    public void setCopyQuestionPoolId(List<Integer> copyQuestionPoolId) {
        this.copyQuestionPoolId = copyQuestionPoolId;
    }

    public List<CopyItemComponentDTO> getCopyItemComponentDTOList() {
        return copyItemComponentDTOList;
    }

    public void setCopyItemComponentDTOList(List<CopyItemComponentDTO> copyItemComponentDTOList) {
        this.copyItemComponentDTOList = copyItemComponentDTOList;
    }

}
