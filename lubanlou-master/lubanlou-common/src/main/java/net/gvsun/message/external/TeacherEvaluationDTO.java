package net.gvsun.message.external;

import lombok.Data;

import java.io.Serializable;

@Data
public class TeacherEvaluationDTO implements Serializable {
    private String name;
    private String content;
}

