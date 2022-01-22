package net.gvsun.message.external;

import lombok.Data;

import java.io.Serializable;

@Data
public class DeselectionTutorNoticeDTO implements Serializable {
    private String type;
    private String username;
    private String url;
}

