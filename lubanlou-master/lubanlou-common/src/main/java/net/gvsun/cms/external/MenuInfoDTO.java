package net.gvsun.cms.external;

/**
 * cms菜单DTO
 */
public class MenuInfoDTO {

    //菜单中文名
    private String name;

    //菜单url(http开头)
    private String url;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
