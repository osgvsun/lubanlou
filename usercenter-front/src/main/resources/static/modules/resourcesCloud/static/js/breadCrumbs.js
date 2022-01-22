//面包屑操作，后续移动到面包屑js中，还有加上参数到url中，保证刷新也是这些数据
window.resourcesCloudBreadCrumb = {
    folderTypeArr: ["我的文件夹", "共享文件夹", "部门文件夹", "企业/学校文库"],
    template: function (folder = {id: 16055, name: "新建文件夹"}) {
        let fileIndex = $(".page_content_catalog").children("label").children("a").length;
        return `<label class="sub_tit_box">
                        <a href="javascript:;" name="fileList" target="i" data-file-id="${folder.id}" data-file-index="${fileIndex}" onclick="resourcesCloudBreadCrumb.click(this)">${folder.name}</a>
                    </label>`;
    },
    add: function (folder) {
        //增加一个
        $(".page_content_catalog").append(this.template(folder));
        //
        this.after();
    },
    //清理点击的右边所有的
    clearRight: function ($this) {
        $this.parent().nextAll().remove();
        this.after();
    },
    click: function (_this, needClose = true) {
        //工具栏关闭
        window.frames['i'].toggleTools(false)
        //是否关闭打开中的预览窗口
        if (needClose) {
            //关闭预览
            window.frames['i'].layer.closeAll("iframe");
        }
        //点击后 1清理右侧的显示 2通过folderId查询这个文件夹下的文件
        let $this = $(_this)
        //判断id是否在folder中
        let id = $this.attr("data-file-id");
        if (this.folderTypeArr.includes(id)) {
            //是一级
            folderHome(null, () => {
                //清理点击栏目的右侧所有的
                this.clearRight($this)
            })
        } else {
            //不是 是二级 部门现阶段特殊判断
            let folderType = sessionStorage.getItem("folderType") || 0;
            let fileIndex = $(".page_content_catalog").children("label").children(`a[data-file-id=${id}]`).attr("data-file-index");
            let cb = () => {
                //清理点击栏目的右侧所有的
                this.clearRight($this)
            }
            // 是部门 && 点击的是第二个（所在部门
            if (folderType == 2 && fileIndex == 1) {
                departmentHome(id, null, cb)
            } else {
                viewDeepFolder(id, cb)
            }
        }
    },
    //设置第一级，还有链接
    setFirstFolder: function (folderIndex) {
        $(".page_content_catalog").html("");
        this.add({
            id: this.folderTypeArr[folderIndex],
            name: this.folderTypeArr[folderIndex]
        });
    },
    after: function () {
        checkCurrentBreadCrumb();
    }
}