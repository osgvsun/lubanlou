package net.gvsun.examserver;

import java.io.Serializable;
import java.util.Map;


public class TAssignmentItemMappingRecordsDTO implements Serializable {

    private Map<Integer, Object> recordMap;
    private Map<Integer, String> itemTextMap;

    public Map<Integer, Object> getRecordMap() {
        return recordMap;
    }

    public void setRecordMap(Map<Integer, Object> recordMap) {
        this.recordMap = recordMap;
    }

    public Map<Integer, String> getItemTextMap() {
        return itemTextMap;
    }

    public void setItemTextMap(Map<Integer, String> itemTextMap) {
        this.itemTextMap = itemTextMap;
    }
}
