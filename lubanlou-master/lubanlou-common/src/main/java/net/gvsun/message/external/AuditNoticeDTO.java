package net.gvsun.message.external;

import lombok.Data;

import java.io.Serializable;

@Data
public class AuditNoticeDTO implements Serializable {
    private String name;
    private String type;
    private String infos;
}

