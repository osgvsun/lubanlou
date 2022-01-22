package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.util.Objects;

public class MenuDto implements Serializable {
    private Long id;
    private String name;
    private Integer level;
    private Long parentId;
    private Integer adminSetting;
    private Integer selfSetting;
    private String tableName;
    private String fieldName;
    private String field;
    private String href;
    private Integer sort;
    private Integer admin;
    private String category;
    private Integer edit;

    public MenuDto() {
    }

    public MenuDto(Long id) {
        this.id = id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null)
            return false;
        if (obj.getClass() != this.getClass())
            return false;
        if (super.equals(obj))
            return true;
        return ((MenuDto) obj).getId().equals(this.id);
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Integer getAdminSetting() {
        return adminSetting;
    }

    public void setAdminSetting(Integer adminSetting) {
        this.adminSetting = adminSetting;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Integer getAdmin() {
        return admin;
    }

    public void setAdmin(Integer admin) {
        this.admin = admin;
    }

    public Integer getSelfSetting() {
        return selfSetting;
    }

    public void setSelfSetting(Integer selfSetting) {
        this.selfSetting = selfSetting;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getEdit() {
        return edit;
    }

    public void setEdit(Integer edit) {
        this.edit = edit;
    }
}
