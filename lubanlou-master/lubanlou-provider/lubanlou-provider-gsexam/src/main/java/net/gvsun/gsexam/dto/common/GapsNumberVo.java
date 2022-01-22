package net.gvsun.gsexam.dto.common;

import java.io.Serializable;

public class GapsNumberVo implements Serializable {
    /*
    填空题空的个数
     */
    private Integer gapsNumber;
    /*
    当前题库指定空个数的填空题个数
     */
    private Integer allgaps;

    public Integer getGapsNumber() {
        return gapsNumber;
    }

    public void setGapsNumber(Integer gapsNumber) {
        this.gapsNumber = gapsNumber;
    }

    public Integer getAllgaps() {
        return allgaps;
    }

    public void setAllgaps(Integer allgaps) {
        this.allgaps = allgaps;
    }
}
