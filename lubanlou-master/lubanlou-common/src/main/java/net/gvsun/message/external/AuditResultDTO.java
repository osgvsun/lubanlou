package net.gvsun.message.external;

import lombok.Data;

import java.io.Serializable;

@Data
public class AuditResultDTO implements Serializable {
    private String platname;
    private String type;
    private String audit;
}

