package net.gvsun.gswork.vo.group;

import lombok.Data;
import net.gvsun.gswork.vo.DistributionDTO;

import java.io.Serializable;
import java.util.List;

@Data
/**
 * 学生提交作业vo
 */
public class WorkSubmitVO implements Serializable {
    /**
     * 学生提交内容
     */
    private String content;
    /**
     * 上传文件url
     */
    private String url;
    /**
     * 小组分工
     */
    private List<DistributionDTO> list;
}
