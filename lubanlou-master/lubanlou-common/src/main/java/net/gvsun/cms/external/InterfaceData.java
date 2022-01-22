package net.gvsun.cms.external;

import java.util.List;

public class InterfaceData {

    private List<ContentData> contentDataList;
    private long count;

    public List<ContentData> getContentDataList() {
        return contentDataList;
    }

    public void setContentDataList(List<ContentData> contentDataList) {
        this.contentDataList = contentDataList;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
