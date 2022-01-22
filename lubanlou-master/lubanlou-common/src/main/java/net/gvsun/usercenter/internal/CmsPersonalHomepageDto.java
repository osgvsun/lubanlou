package net.gvsun.usercenter.internal;

import java.io.Serializable;

public class CmsPersonalHomepageDto implements Serializable {
    private Long id;
    private String menuName;
    private String menuContent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getMenuContent() {
        return menuContent;
    }

    public void setMenuContent(String menuContent) {
        this.menuContent = menuContent;
    }
}
