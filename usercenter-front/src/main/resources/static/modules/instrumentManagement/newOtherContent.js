layui.use('form', function (){
    var $ = layui.jquery,
        form = layui.form;

    form.on('submit(newothercontentbtn)', function (data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        $.ajax({
            url: httpDeviceUrl + 'saveInstrumentAppExtendsInfoField',
            type: 'POST',
            data: field,
            success: function (res) {
                if (res.code === 0) {
                    parent.layui.table.reload('othercontent'); //重载表格
                    parent.layer.close(index); //再执行关闭
                    parent.layer.msg("保存成功");
                } else {
                    parent.layer.msg(res.msg);
                }
            }
        })
    })
})