package net.gvsun.configcenter.internal;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class ConfigTypeDTO implements Serializable {
    Integer id;
    String typeName;
    String typeCname;
    String sourceProject;
    String url;
    Date createdTime;
    String createdBy;
    List<ConfigTypeDTO> childList;
}
