layui.use(['index', 'form', 'laypage', 'laydate', 'layer', 'table', 'element'], function() {
    var $ = layui.$,
        admin = layui.admin,
        element = layui.element,
        layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        laypage = layui.laypage,
        table = layui.table;

    //向世界问个好
    //layer.msg('');

    //监听提交
    form.on('submit(editattendancebtn)', function(data) {
        var id = data.field.id;
        var title = data.field.title;
        var content = data.field.content;
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        //修改指南
        $.ajax({
            url:iotHost+'/api/content/editContent/',
            type:'post',
            data:{
                id,
                title,
                content
            },
            success: function (res) {
                if (!res.code) {
                    parent.layer.alert("修改成功!")
                }
            },
            error: function () {
                alert("修改接口请求失败！")
            },
        });
        parent.layer.close(index); //再执行关闭
        parent.layui.table.reload('guideatttab'); //重载表格

    });

    form.render(null, 'editattendance');


});