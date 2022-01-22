package net.gvsun.timetable.internal.iot;

import lombok.Data;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

/**
*  Description
*
*  @author weicheng
*  @date 2021/2/18 17:09
*/
@Data
public class IotStationDTO implements Serializable {
    private HashMap lab;
    private HashMap device;
    private List<HashMap<String, Object>> manager;
    private List<HashMap> courses;
}
