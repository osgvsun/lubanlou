package net.gvsun.gsexam.dto.common;

import java.util.Calendar;
import java.util.Set;

/**
 * Created by 李雪腾 on 2017/9/17 0017.
 */
public class TAssignmentSectionDto {

    private Integer id;
    private Integer sequence;
    private Calendar createdTime;
    private String description;
    private Integer status;
    private UserVo user;
    private TAssignmentVo TAssignment;
    private Set<TAssignmentItemDto> TAssignmentItems;

    public Integer getId() {
        return id;
    }

    public Set<TAssignmentItemDto> getTAssignmentItems() {
        return TAssignmentItems;
    }

    public void setTAssignmentItems(Set<TAssignmentItemDto> TAssignmentItems) {
        this.TAssignmentItems = TAssignmentItems;
    }

    public void setId(Integer id) {
        this.id = id;

    }

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public Calendar getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Calendar createdTime) {
        this.createdTime = createdTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public UserVo getUser() {
        return user;
    }

    public void setUser(UserVo user) {
        this.user = user;
    }

    public TAssignmentVo getTAssignment() {
        return TAssignment;
    }

    public void setTAssignment(TAssignmentVo TAssignment) {
        this.TAssignment = TAssignment;
    }


}
