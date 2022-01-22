package net.gvsun.message.external;

import lombok.Data;

import java.io.Serializable;

@Data
public class NewStudentNoticeDTO implements Serializable {
    private String cname;
    private String studentName;
    private String url;
}

