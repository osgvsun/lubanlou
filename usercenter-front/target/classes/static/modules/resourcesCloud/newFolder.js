layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form,
        laydate = layui.laydate

    //向世界问个好
    //layer.msg('');

    form.render(null, 'newfolderbox');

    //自定义规则
    form.verify({
        dir: function (value, item) { //value：表单的值、item：表单的DOM对象
            let dirRule = new RegExp("[\\/:*?<>|]")
            if (dirRule.test(value)) {
                return `名称不能包括下列任意字符：\\ / : * ? < > |`
            }
        }
    })

    //监听提交
    form.on('submit(newfolderbtn)', function (data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        let p_dir = parent.document.querySelectorAll(".sub_tit_box>a")
        let p_str = "";
        let i = 1;
        //如果是部门文件夹下就空2位
        if (p_dir[0].innerText === parent.resourcesCloudBreadCrumb.folderTypeArr[2]) {
            i = 2;
        }
        for (; i < p_dir.length; i++) {
            p_str += p_dir[i].innerText + "/"
        }
        top.resourceContainer.createDirectory({
            path: p_str + field.info,//等下加上当前所在目录
            success: function (res) {
                console.log("新建文件夹的id：" + res);
                parent.layer.msg("新建文件夹<b>" + field.info + "</b>成功", {icon: 1})
                parent.layer.close(index); //再执行关闭
                // 全刷新（暂时
                // parent.$(".refresh").click();
                // 只清理当前目录的缓存
                parent.resourcesCloudCaches.removeCurrentData(true)
                // 如果在所在部门下新建文件夹那我的文件夹下没有刷新，是否改成新建时清除所有缓存？还是给缓存分类？给key前加0，1这样的标识？
            },
            fail: function (msg) {
                parent.layer.msg(msg, {icon: 2})
            }
        })
    });

    //信息
    form.val('newfolderbox', {
        "": "" //备用
    });
});