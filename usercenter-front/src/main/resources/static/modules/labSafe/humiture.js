layui.define(function (exports) {
    var admin = layui.admin;

    layui.use(['form', 'element', 'table', 'laydate', 'laypage', 'layer'], function () {
        var $ = layui.$,
            admin = layui.admin,
            form = layui.form,
            element = layui.element,
            table = layui.table,
            laydate = layui.laydate,
            laypage = layui.laypage,
            layer = layui.layer;

        //向世界问个好
        //layer.msg('进入实验室温湿度');

        form.render(null, 'humiture');

        $.ajax({
            url: timetableHost + "/api/labroom/getLabRoomWetTemperatureInfo",
            type: "POST",
            data: JSON.stringify({labRoomId: labRoomId}),
            dataType: "JSON",
            contentType: 'application/json; charset=UTF-8',
            success: function (data) {
                let humitureObj = data.data;
                //实验室温湿度信息
                form.val('humiture', {
                    "level": "", //级别
                    "temperature": humitureObj.labTemperature, //温度
                    "humidity": humitureObj.labHumidity, //湿度
                    "pm25": humitureObj.labPm, //PM2.5
                    "state": humitureObj.rectificationStatus, //整改状态
                    "nextinspect": humitureObj.inspectTime //下次检查
                });
            }
        })
    });
    exports("humiture")
});