package net.gvsun.usercenter.internal.resource;


import java.util.Objects;

public class KmsjsmapDTO {

    private String id;
    private Boolean isroot = false;
    private String parentid;
    private String topic;
    private String direction = "right";
    private Integer badge = 0;
    private Boolean expanded = true;
    private Boolean isLink = false;

    public Boolean getIsroot() {
        return isroot;
    }

    public void setIsroot(Boolean isroot) {
        this.isroot = isroot;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getParentid() {
        return parentid;
    }

    public void setParentid(String parentid) {
        this.parentid = parentid;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public Integer getBadge() {
        return badge;
    }

    public void setBadge(Integer badge) {
        this.badge = badge;
    }

    public Boolean getExpanded() {
        return expanded;
    }

    public void setExpanded(Boolean expanded) {
        this.expanded = expanded;
    }

    public Boolean getLink() {
        return isLink;
    }

    public void setLink(Boolean link) {
        isLink = link;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        KmsjsmapDTO that = (KmsjsmapDTO) o;
        return Objects.equals(topic, that.topic);
    }

    @Override
    public int hashCode() {
        return Objects.hash(topic);
    }
}