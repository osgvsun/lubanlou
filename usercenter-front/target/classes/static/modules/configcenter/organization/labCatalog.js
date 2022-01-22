layui.config({
    base:'../../'
}).extend({
    index:'lib/index'
}).use(['index','laypage', 'layer', 'table', 'element', 'jquery', 'code', 'form', 'slider'], function () {
// layui.extend({
//     index:'../../lib/index'
// })
// layui.use(['laypage', 'layer', 'table', 'element', 'jquery', 'code', 'form', 'slider'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        code = layui.code,
        form = layui.form,
        slider = layui.slider

    //向世界问个好
    // layer.msg('进入实验分室');
    $(".layui-card-header>span:eq(0)").text(ip);
    let data = ip;
    var load = {
        doorState: function () {
            $.ajax({
                url:iotHost+'/api/agent/checkDoorStatus',
                type:'post',
                data:{
                    ip : data
                },
                success:function (s) {
                    if (s=="1") {
                        parent.layer.alert("当前门禁是关闭状态！")
                        table.reload('iotaccesscontroltab');
                    }
                    else if(s=="0") {
                        parent.layer.alert("当前门禁是打开状态！");
                    }
                    else
                        parent.layer.alert(s);
                },
                error:function () {
                    alert("接口请求失败")
                }
            })
        },
        openDoor: function () {
            $.ajax({
                url:iotHost+'/api/agent/doorOpen',
                type:'post',
                data:{
                    hardwareIp : data
                },
                success:function (s) {
                    if (s=="success") {
                        parent.layer.alert("远程开门成功！")
                        table.reload('iotaccesscontroltab');
                    }
                    else
                        parent.layer.alert("远程开门失败！: "+s);

                },
                error:function () {
                    alert("接口请求失败")
                }
            })
        },
        timeCorrect: function () {
            $.ajax({
                url:iotHost+'/api/agent/timeCorrect',
                type:'get',
                data:{
                    hardwareIp : data
                },
                success:function (s) {
                    parent.layer.alert(s);
                },
                error:function () {
                    alert("接口请求失败")
                }
            })
        },
        logUpload: function () {
            $.ajax({
                url:iotHost+'/api/agent/logUpload',
                type:'get',
                data:{
                    hardwareIp : data
                },
                success:function (s) {
                    parent.layer.alert(s);
                },
                error:function () {
                    alert("接口请求失败")
                }
            })
        },
        dataDistribute: function () {
            $.ajax({
                url:iotHost+'/api/agent/dataDistribute',
                type:'get',
                data:{
                    hardwareIp : data
                },
                success:function (s) {
                    parent.layer.alert(s);
                },
                error:function () {
                    alert("接口请求失败")
                }
            })
        },
        regcard: function () {
            $.ajax({
                url:iotHost+'/api/reservation/regcard',
                type:'post',
                data:{
                    ip : data
                },
                success:function (s) {
                    if (s=="success") {
                        parent.layer.alert("数据下发成功")
                        table.reload('iotaccesscontroltab');
                    }
                    else
                        parent.layer.alert("数据下发失败！: "+s);
                },
                error:function () {
                    alert("接口请求失败")
                }
            })
        },
    };
    $('.card_tag').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        load[method] ? load[method].call(this, othis) : '';
    });
});