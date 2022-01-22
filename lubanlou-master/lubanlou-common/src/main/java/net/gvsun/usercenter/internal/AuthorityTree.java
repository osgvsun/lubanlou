package net.gvsun.usercenter.internal;

import java.util.List;

public class AuthorityTree {
    private String id;
    private String title;
    private String field;
    private boolean checked;
    private boolean spread;
    private List<AuthorityTree> children;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public boolean isSpread() {
        return spread;
    }

    public void setSpread(boolean spread) {
        this.spread = spread;
    }

    public List<AuthorityTree> getChildren() {
        return children;
    }

    public void setChildren(List<AuthorityTree> children) {
        this.children = children;
    }
}
