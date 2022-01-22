package net.gvsun.gsquestionpool.kafka.dto;

import lombok.Data;
import net.gvsun.oauth2.dto.CustomGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserForDataSource extends User {
    private String schoolName;
    private String collegeId;
    private String college;
    private List<CustomGrantedAuthority> authorities = new ArrayList<>();

}
