package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.util.*;
import java.util.function.Consumer;

public class TreeNode implements Serializable {
    private MenuDto menuDto;
    private TreeNode parent;
    private Set<TreeNode> childNodeSet;

    public TreeNode() {
        childNodeSet = new LinkedHashSet<>();
    }

    public MenuDto getMenuDto() {
        return menuDto;
    }

    public void setMenuDto(MenuDto menuDto) {
        this.menuDto = menuDto;
    }

    public TreeNode getParent() {
        return parent;
    }

    public void setParent(TreeNode parent) {
        this.parent = parent;
    }

    public Set<TreeNode> getChildNodeSet() {
        return childNodeSet;
    }

    public void setChildNodeSet(Set<TreeNode> childNodeSet) {
        this.childNodeSet = childNodeSet;
    }

    //广度遍历，取出数据
    public void breadthTraversal(Map<String, Object> result) {
        result.put("config", this.menuDto);
        Set<Map<String, Object>> nextLevelConfigSet = new TreeSet<>(new Comparator<Map<String, Object>>() {
            //TreeSet的排序方法如果返回值为0，则只保留一个结果
            @Override
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                MenuDto menuVO1 = (MenuDto) o1.get("config");
                MenuDto menuVO2 = (MenuDto) o2.get("config");
                if (menuVO1 == null && menuVO2 == null)
                    return 1;
                else if (menuVO1 == null)
                    return -1;
                else if (menuVO2 == null)
                    return 1;
                else {
                    int d = ((menuVO1.getSort() == null ? 0 : menuVO1.getSort()) - (menuVO2.getSort() == null ? 0 : menuVO2.getSort()));
                    if (d == 0)
                        return 1;
                    else
                        return d;
                }
            }
        });
        result.put("nextLevelConfigSet", nextLevelConfigSet);
        if (this.childNodeSet.size() > 0) {
            for (TreeNode node : this.childNodeSet) {
                Map<String, Object> nextLevelMap = new HashMap<>();
                nextLevelMap.put("config", node.getMenuDto());
                nextLevelConfigSet.add(nextLevelMap);
                node.breadthTraversal(nextLevelMap);
            }
        }
    }

    /**
     * 对当前节点及其子孙节点执行客户化操作
     *
     * @param consumer
     */
    public void breadthTraversal(Consumer<MenuDto> consumer) {
        consumer.accept(this.menuDto);
        if (this.childNodeSet.size() > 0) {
            for (TreeNode node : this.childNodeSet) {
                node.breadthTraversal(consumer);
            }
        }
    }

    //从这个节点开始，搜寻子节点，如果没有找到返回null
    public TreeNode findNode(TreeNode node) {
        if (this.equals(node)) {
            return this;
        } else {
            for (TreeNode treeNode : this.childNodeSet) {
                TreeNode result = treeNode.findNode(node);
                if (result != null)
                    return result;
            }
            return null;
        }
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null)
            return false;
        if (super.equals(obj))
            return true;
        return ((TreeNode) obj).getMenuDto().equals(this.menuDto);
    }
}
