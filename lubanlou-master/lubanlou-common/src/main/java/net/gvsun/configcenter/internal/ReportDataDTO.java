package net.gvsun.configcenter.internal;


import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ReportDataDTO {
    private Map<String,String> headList;
    private List<Map<String,String>> dataList;
    // 求和集合
    private Map<String,String> sumList;
}
