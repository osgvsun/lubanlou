package net.gvsun.vo;

import java.util.List;

public class Page {
    private List<Object> list;
    private PageModel pageModel;

    public Page() {
    }

    public Page(List<Object> list, PageModel pageModel) {
        this.list = list;
        this.pageModel = pageModel;
    }

    public List<Object> getList() {
        return list;
    }

    public void setList(List<Object> list) {
        this.list = list;
    }

    public PageModel getPageModel() {
        return pageModel;
    }

    public void setPageModel(PageModel pageModel) {
        this.pageModel = pageModel;
    }
}
