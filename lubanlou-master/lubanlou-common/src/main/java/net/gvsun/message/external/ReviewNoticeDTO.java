package net.gvsun.message.external;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ReviewNoticeDTO implements Serializable {
    private String datetime;
    private String type;
}

