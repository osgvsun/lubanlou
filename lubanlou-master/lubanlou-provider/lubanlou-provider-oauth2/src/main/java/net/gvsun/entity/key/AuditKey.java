package net.gvsun.entity.key;

import java.io.Serializable;
import java.util.Objects;

public class AuditKey implements Serializable {
    private String username;
    private Integer status;
    private String type;

    public AuditKey() {
    }

    public AuditKey(String username, Integer status, String type) {
        this.username = username;
        this.status = status;
        this.type = type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, status, type);
    }

    @Override
    public boolean equals(Object otherObject) {
        if (this == otherObject)
            return true;
        if (otherObject == null)
            return false;
        if (otherObject.getClass() != this.getClass())
            return false;
        AuditKey other = (AuditKey) otherObject;
        return username.equals(other.username) && status.equals(other.status) && type.equals(other.type);
    }
}
