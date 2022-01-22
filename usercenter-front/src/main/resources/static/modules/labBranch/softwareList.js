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
    layer.msg('进入软件列表');
    form.render(null, 'softwarelistbox');
    //执行一个表单
    var softwarelist = table.render({
        elem: '#softwarelist',
        url: timetableHost + "/api/labroom/getSoftwareByLabRoom", //数据接口
        where: {labRoom: labRoomId},
        title: '软件列表',
        toolbar: '#toolbars',
        cellMinWidth: 100,
        page: false, //开启分页
        parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": 0, //解析接口状态
                "data": res //解析数据列表
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
                field: 'id',
                title: '软件序号',
                sort: true
            }, {
                field: 'name',
                title: '软件名称',
                sort: true
            }, {
                field: 'edition',
                title: '软件版本',
                sort: true
            }, {
                field: 'price',
                title: '价格',
                sort: true
            }, {
                title: '有无加密狗',
                templet: function (d) {
                    return d.dongle == 1 ? "有" : "无"
                }
            }, {
                fixed: 'right',
                title: '操作',
                toolbar: '#toolbar',
                width: 65
            }
            ]
        ],
        id: 'softwarelist',
        data: table,
        skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });

    //监听行工具事件
    table.on('tool(softwarelist)', function (obj) {
        var data = obj.data;

        //删除
        if (obj.event === 'del') {
            layer.confirm('是否删除？', {
                title: '提示'
            }, function (index) {
                $.ajax({
                    url: timetableHost + "/api/labroom/deleteLabRoomSoftware", //数据接口
                    data: {sId: data.id, labRoomId: labRoomId},
                    dataType: "JSON",
                    success: function (res) {
                        layer.msg("删除成功", {icon: 1});
                        table.reload('softwarelist');
                    }, error: function (e) {
                        layer.msg("删除失败", {icon: 2});
                    }
                })
                layer.close(index);
            });
        }
    });

    //头工具栏事件
    table.on('toolbar(softwarelist)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data; //获取选中的数据
        switch (obj.event) {
            case 'addadd':
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '添加软件列表',
                    area: ['500px', '144px'],
                    shade: 0.5,
                    maxmin: true,
                    content: 'addSoftwareList?labRoomId=' + labRoomId,
                    zIndex: layer.zIndex //重点1
                    ,
                    success: function (layero) {
                        layer.setTop(layero); //重点2
                    },
                    btn: ['添加', '取消'],
                    yes: function (index, layero) {
                        //点击确认触发 iframe 内容中的按钮提交
                        var submit = layero.find('iframe').contents().find("#addsoftwarelistbtn");
                        submit.click();
                    }
                });
                layer.full(index);
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
                    layer.confirm('是否删除？', {
                        title: '提示'
                    }, function (index) {
                        $.ajax({
                            url: timetableHost + "/api/labroom/batchDeleteLabRoomSoftWare", //数据接口
                            data: {sIds: studentId.toString(), labRoomId: labRoomId},
                            dataType: "JSON",
                            success: function (res) {
                                layer.msg("批量删除成功", {icon: 1});
                                table.reload("softwarelist")
                            }
                        })
                        layer.close(index);
                    });
                }
                break;
        }
        ;
    });

    var $ = layui.$,
        active = {
            reload: function () {
                var searchbox = $('#searchbox');
                var searchbox2 = $('#searchbox2');

                //执行重载
                table.reload('softwarelist', {
                    where: {
                        name: searchbox.val(),
                        edition: searchbox2.val(),
                    }
                }, 'data');
                authSet();
            },
            reset: function () {
                $('#searchbox').val("")
                $('#searchbox2').val("")
                table.reload('softwarelist', {
                    where: {
                        name: "",
                        edition: ""
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
            $('.addadd, .delete').remove();
            softwarelist.config.cols[0][7].hide = true;
        } else {
            $('.addadd, .delete').css("display", "inline-block");
            softwarelist.config.cols[0][7].hide = false;
        }
    }
    //根据当前权限显示界面
    $(function () {
        authSet();
    })
});