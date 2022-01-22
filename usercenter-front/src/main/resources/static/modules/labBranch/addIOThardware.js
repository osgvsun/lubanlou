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

    form.render(null, 'addiothardwarebox');

    //获取硬件名称下拉框
    apiCommonSelectBySelect("dictionaryList", "c_agent_type", function (res) {
        apiCommonSelectBySelectCallBackFn(res, "name", "请选择硬件", "没有硬件数据", form);
    });
    //获取服务器下拉框
    apiCommonSelectBySelect("commonServerList", null, function (res) {
        apiCommonSelectBySelectCallBackFn(res, "server", "请选择服务器", "没有服务器数据", form);
    });

    //监听提交
    form.on('submit(addiothardwarebtn)', function (data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        let labAgentObj = {
            hardwareIp: field.ip,
            manufactor: field.manufactor,
            hareWareModule: field.specification,
            doorIndex: field.code,
            hardWareVersion: field.version,
            snNo: field.sn,
            commonServer: {id: field.server},
            cdictionary: {id: field.name},
            hardwareName: field.type,
            version: field.attendance
        };
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        $.ajax({
            url: labRoomHost + "/api/labroom/saveLabRoomAgent?roomId=" + labRoomId,
            type: "POST",
            data: JSON.stringify(labAgentObj),
            dataType: "JSON",
            contentType: "application/json",
            success: function (res) {
                console.log(labAgentObj);
                console.log(res)
                if (res.msg == "success") {
                    parent.layui.table.reload('iothardware'); //重载表格
                    parent.layer.close(index); //再执行关闭
                } else {
                    layer.msg("添加失败", {icon: 2})
                }
            }
        })
    });

    //信息
    form.val('addiothardwarebox', {
        "": "" //备注
    });

});