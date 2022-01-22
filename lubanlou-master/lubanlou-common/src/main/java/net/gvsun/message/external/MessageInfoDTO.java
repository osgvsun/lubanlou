package net.gvsun.message.external;

import lombok.Data;

import java.io.Serializable;

@Data
public class MessageInfoDTO implements Serializable {
    private String receiverUsername;
    private String title;
    private String startTime;
    private String endTime;
    private Integer page;
    private Integer limit;
    private String createUsername;
    private Integer state;
    private String projectName;
    private Integer readState;




}

