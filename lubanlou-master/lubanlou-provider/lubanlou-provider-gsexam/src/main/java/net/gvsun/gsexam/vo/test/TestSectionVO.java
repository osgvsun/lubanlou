package net.gvsun.gsexam.vo.test;

import lombok.Data;
import net.gvsun.gsexam.vo.exam.ExamDetailsVO;
import net.gvsun.gsexam.vo.exam.ExamItemVo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public class TestSectionVO implements Serializable {

    /**
     * 大项的序号
     */
    private Integer sectionIndex;
    /**
     * 大项的标题
     */
    private String sectionTitle;
    /**
     * 大项对应的每个小题的分数
     */
    private double itemScore;
    /**
     * 大项对应的所有试题的id
     */
    private List<Integer> itemIds = new ArrayList<>();
    /**
     * 大项所属测试
     */
    private Integer assignmentId;
    /**
     * 创建人
     */
    private String createdBy;
    private List<ExamItemVo> itemVoList;
    private List<ExamDetailsVO> items;
    private int correctCount;
    private Long examItemVoCount;
}
