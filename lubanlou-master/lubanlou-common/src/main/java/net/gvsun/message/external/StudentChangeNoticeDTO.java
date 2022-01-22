package net.gvsun.message.external;

import lombok.Data;

import java.io.Serializable;

@Data
public class StudentChangeNoticeDTO implements Serializable {
    private String type;
    private String studentName;
    private String url;
}

