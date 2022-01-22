package net.gvsun.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "gateway_api_define")
public class GatewayApiDefine {
    private String id;
    private String path;
    private String serviceId;
    private String url;
    private Integer retryable;
    private Integer enabled;
    private Integer stripPrefix;
    private String apiName;
    private Integer whiteLabel;
    private String description;
    private String partWhiteLabel;

    @Id
    @Column(name = "id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Basic
    @Column(name = "path")
    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Basic
    @Column(name = "service_id")
    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    @Basic
    @Column(name = "url")
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Basic
    @Column(name = "retryable")
    public Integer getRetryable() {
        return retryable;
    }

    public void setRetryable(Integer retryable) {
        this.retryable = retryable;
    }

    @Basic
    @Column(name = "enabled")
    public Integer getEnabled() {
        return enabled;
    }

    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
    }

    @Basic
    @Column(name = "strip_prefix")
    public Integer getStripPrefix() {
        return stripPrefix;
    }

    public void setStripPrefix(Integer stripPrefix) {
        this.stripPrefix = stripPrefix;
    }

    @Basic
    @Column(name = "api_name")
    public String getApiName() {
        return apiName;
    }

    public void setApiName(String apiName) {
        this.apiName = apiName;
    }

    @Basic
    @Column(name = "white_label")
    public Integer getWhiteLabel() {
        return whiteLabel;
    }

    public void setWhiteLabel(Integer whiteLabel) {
        this.whiteLabel = whiteLabel;
    }

    @Basic
    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GatewayApiDefine that = (GatewayApiDefine) o;
        return enabled.equals(that.enabled) &&
                whiteLabel.equals(that.whiteLabel) &&
                Objects.equals(id, that.id) &&
                Objects.equals(path, that.path) &&
                Objects.equals(serviceId, that.serviceId) &&
                Objects.equals(url, that.url) &&
                Objects.equals(retryable, that.retryable) &&
                Objects.equals(stripPrefix, that.stripPrefix) &&
                Objects.equals(apiName, that.apiName) &&
                Objects.equals(description, that.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, path, serviceId, url, retryable, enabled, stripPrefix, apiName, whiteLabel, description);
    }

    @Basic
    @Column(name = "part_white_label")
    public String getPartWhiteLabel() {
        return partWhiteLabel;
    }

    public void setPartWhiteLabel(String partWhiteLabel) {
        this.partWhiteLabel = partWhiteLabel;
    }
}
