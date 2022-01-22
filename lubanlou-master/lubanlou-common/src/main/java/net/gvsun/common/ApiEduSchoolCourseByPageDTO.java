package net.gvsun.common;

import java.io.Serializable;

/**
 * Description 排课计划的分页信息dto
 *
 * @author weicheng
 * @since 2020/6/5 11:10
 */
public class ApiEduSchoolCourseByPageDTO implements Serializable {
    //数据缓存key值
    private String key;
    //数据缓存hkey值
    private String hkey;
    //分页偏移
    private Integer offset;
    //每页记录
    private Integer limit;
    //学期
    private Integer termId;
    //状态
    private String status;
    //查询关键字
    private String search;
    //排序
    private String sort;
    //升序降序
    private String order;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getHkey() {
        return hkey;
    }

    public void setHkey(String hkey) {
        this.hkey = hkey;
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public Integer getTermId() {
        return termId;
    }

    public void setTermId(Integer termId) {
        this.termId = termId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }
}
