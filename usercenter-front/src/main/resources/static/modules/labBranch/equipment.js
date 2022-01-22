layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form,
        laydate = layui.laydate

    var currentauth = cookie.get('currauth'); //存储当前权限
    var statusCenter = cookie.get('status'); // 判断从哪一个入口来源
    //向世界问个好
    layer.msg('进入仪器设备');
    form.render(null, 'equipmentbox');
    var docHost = document.location.host;
    var serverHostArray = document.location.href.split('/');
    var serverHost = serverHostArray[0] + "//" + serverHostArray[2] + "";
    //执行一个表单
    var equipment = table.render({
        elem: '#equipment',
        url: labRoomHost  + "/api/labroom/findLabRoomDeviceByRoomId", //数据接口
        where: {"labRoomId": labRoomId},
        title: '仪器设备',
        toolbar: '#toolbars',
        cellMinWidth: 100,
        page: true, //开启分页
        parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": 0, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.total, //解析数据长度
                "data": res.data //解析数据列表
            };
        },
        cols: [
            [ //表头
                {
                    fixed: 'id',
                    type: 'checkbox',
                    width: 30
                }, {
                fixed: 'left',
                title: '序号',
                type: 'numbers',
                width: 40
            }, {
                title: '设备名称',
                templet: function (d) {
                    return d.schoolDevice.deviceName
                }
            }, {
                title: '设备编号',
                templet: function (d) {
                    return d.schoolDevice.deviceNumber
                }
            }, {
                fixed: 'right',
                title: '操作',
                toolbar: '#toolbar',
                width: 65
            }
            ]
        ],
        id: 'equipment',
        data: table,
        skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });

    //监听行工具事件
    table.on('tool(equipment)', function (obj) {
        var data = obj.data;
        //删除
        if (obj.event === 'del') {
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '设备迁移',
                area: ['500px', '144px'],
                shade: 0.5,
                maxmin: true,
                content: 'equipmentMigration?ids=' + data.id,
                zIndex: layer.zIndex //重点1
                ,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['添加', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#equipmentmigrationbtn");
                    submit.click();
                }
            });
            layer.full(index);
        }
    });

    //头工具栏事件
    table.on('toolbar(equipment)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data; //获取选中的数据
        switch (obj.event) {
            case 'addadd':
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '添加仪器设备',
                    area: ['500px', '144px'],
                    shade: 0.5,
                    maxmin: true,
                    content: 'addEquipment?labRoomId=' + labRoomId,
                    zIndex: layer.zIndex //重点1
                    ,
                    success: function (layero) {
                        layer.setTop(layero); //重点2
                    },
                    btn: ['添加', '取消'],
                    yes: function (index, layero) {
                        //点击确认触发 iframe 内容中的按钮提交
                        var submit = layero.find('iframe').contents().find("#addequipmentbtn");
                        submit.click();
                    }
                });
                layer.full(index);
                break;
            case 'import':
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '批量导入仪器设备',
                    area: ['500px', '500px'],
                    shade: 0.5,
                    maxmin: true,
                    content: 'importEquipment?labRoomId=' + labRoomId
                });
                break;
            case 'delete':
                if (data.length == 0) {
                    layer.msg('请选择一行');
                } else {
                    //获取到需要删除的id数组
                    var length = data.length;
                    var studentId = [];
                    for (var i = 0; i < length; i++) {
                        studentId.push(data[i].id);
                    }
                    var index = layer.open({
                        type: 2 //此处以iframe举例
                        ,
                        title: '设备迁移',
                        area: ['500px', '144px'],
                        shade: 0.5,
                        maxmin: true,
                        content: 'equipmentMigration?ids=' + studentId.toString(),
                        zIndex: layer.zIndex //重点1
                        ,
                        success: function (layero) {
                            layer.setTop(layero); //重点2
                        },
                        btn: ['添加', '取消'],
                        yes: function (index, layero) {
                            //点击确认触发 iframe 内容中的按钮提交
                            var submit = layero.find('iframe').contents().find("#equipmentmigrationbtn");
                            submit.click();
                        }
                    });
                    layer.full(index);
                }
                break;
        }
        ;
    });

    var $ = layui.$,
        active = {
            reload: function () {
                var searchbox = $('#searchbox');

                //执行重载
                table.reload('equipment', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        name: searchbox.val()
                    }
                }, 'data');
                authSet();
            }
        };

    $('.search_line .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    function authSet() {
        if ((currentauth !== 'LABMANAGER' && currentauth !== 'EXCENTERDIRECTOR' && currentauth !== 'ACADEMYLEVELM' && currentauth !== 'SUPERADMIN') || statusCenter === 'center' || cookie.get('allstatus') == 1) {
            $('.addadd, .import, .delete').remove();
            equipment.config.cols[0][4].hide = true;
        } else {
            $('.addadd, .import, .delete').css("display", "inline-block");
            equipment.config.cols[0][4].hide = false;
        }
    }
    //根据当前权限显示界面
    $(function () {
        authSet();
    })
});