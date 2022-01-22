package net.gvsun.gswork.vo.group;

import lombok.Data;

import java.io.Serializable;
@Data
public class GroupMemberVO implements Serializable {
    private Integer groupId;
    private String username;
    private String cname;
    private Integer assignmentId;
    private String comments;
    private Double finalScore;
}
