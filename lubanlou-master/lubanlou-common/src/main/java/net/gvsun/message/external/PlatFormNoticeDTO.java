package net.gvsun.message.external;

import lombok.Data;

import java.io.Serializable;

@Data
public class PlatFormNoticeDTO implements Serializable {
    private String siteName;
    private String title;
}

