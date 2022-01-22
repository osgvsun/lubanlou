package net.gvsun.common;

import java.io.Serializable;
import java.util.List;

/**
 * Description 下拉框的通用dto
 *
 * @author weicheng
 * @since 2020/6/26 22:29
 */
public class SelectDTO implements Serializable {
    //下拉框列表输出，根据service的limit限长结果
    private List results;

    public List getResults() {
        return results;
    }

    public void setResults(List results) {
        this.results = results;
    }
}
