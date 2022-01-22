package net.gvsun.timetable.internal.common;

import lombok.Data;
import lombok.ToString;

import java.util.List;

/**
*  Description 分页数据封装类
*
*  @author weicheng
*  @date 2020/7/22 13:52
*/
@Data
@ToString
public class CommonPage<T> {
    private Integer pageNum;
    private Integer pageSize;
    private Integer totalPage;
    private Long total;
    private  String search;
    private List<T> list;

    public CommonPage(Integer pageNum, Integer pageSize, String search){
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.search = search;
    }
}
