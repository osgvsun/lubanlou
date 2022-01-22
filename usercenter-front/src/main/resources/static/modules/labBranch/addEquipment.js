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

    form.render(null, 'addequipmentbox');

    var serverHostArray = document.location.href.split('/');
    var serverHost = serverHostArray[0] + "//" + serverHostArray[2] + "";
    //监听提交
    form.on('submit(addequipmentbtn)', function (data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        let checkStatusData = table.checkStatus("addequipment").data;
        let deviceNumber = [];
        for (var i = 0; i < checkStatusData.length; i++) {
            deviceNumber.push(checkStatusData[i].deviceNumber);
        }
        $.ajax({
            url: labRoomHost + '/api/labroom/saveLabRoomDevice',
            type: 'GET',
            data: {"roomId": labRoomId, "type": 0, "array": deviceNumber.toString()},
            success: function (data){
                console.log(data)
                if (data.msg == "success"){
                    layer.msg('添加成功');
                    parent.layui.table.reload('equipment'); //重载表格
                    parent.layer.close(index); //再执行关闭
                }
            }
        })

    });

    //执行一个表单
    table.render({
        elem: '#addequipment',
        url: labRoomHost + "/api/labroom/findSchoolDeviceForLabRoom", //数据接口
        where: {"labRoomId": labRoomId},
        title: '仪器设备',
        cellMinWidth: 100,
        method: "POST",
        page: true, //开启分页
        parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": 0, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.count, //解析数据长度
                "data": res.data //解析数据列表
            };
        },
        cols: [
            [ //表头
            {
                fixed: 'left',
                type: 'checkbox',
                width: 30
            }, {
                fixed: 'left',
                title: '序号',
                type: 'numbers',
                width: 40
            }, {
                field: "deviceNumber",
                title: '设备编号',
                sort: true
            }, {
                field: "deviceName",
                title: '设备名称',
                sort: true
            }, {
                field: 'devicePattern',
                title: '设备型号',
                sort: true
            }, {
                title: '保管员',
                templet: function (d) {
                    return d.userByKeepUser ? d.userByKeepUser.cname : "";
                }
            }, {
                field: 'deviceFormat',
                title: '设备规格',
                sort: true
            }, {
                field: 'devicePrice',
                title: '设备价格',
                sort: true
            }, {
                field: 'lab',
                title: '所属实验室',
                sort: true
            }
            ]
        ],
        id: 'addequipment',
        data: table,
        skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });

    //监听行工具事件
    table.on('tool(addequipment)', function (obj) {
        var data = obj.data;

        //删除
        if (obj.event === 'del') {
            layer.confirm('是否删除？', {
                title: '提示'
            }, function (index) {
                obj.del();
                layer.close(index);
            });
        }
    });

    var $ = layui.$,
        active = {
            reload: function () {
                var searchbox = $('#searchbox');

                //执行重载
                table.reload('addequipment', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        name: searchbox.val()
                    }
                }, 'data');
            }
        };

    $('.search_line .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});