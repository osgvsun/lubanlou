package net.gvsun.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.List;

/**
 * Created by REM on 2019/2/26.
 */
@ApiModel(value = "总成绩册返回对象",description = "总成绩册返回对象")
public class TotalVo implements Serializable{
    @ApiModelProperty(value = "所属课程",name = "siteName")
    private String siteName;
    @ApiModelProperty(value = "成绩",name = "totalInfoVos")
    private List<TotalGradeBookVO> totalInfoVos;

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public List<TotalGradeBookVO> getTotalInfoVos() {
        return totalInfoVos;
    }

    public void setTotalInfoVos(List<TotalGradeBookVO> totalInfoVos) {
        this.totalInfoVos = totalInfoVos;
    }
}
