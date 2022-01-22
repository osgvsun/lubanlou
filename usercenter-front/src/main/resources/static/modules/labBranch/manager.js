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
    layer.msg('进入实验室管理员');

    form.render(null, 'labmanagerbox');
    // var docHost = document.location.host;
    var serverHostArray = document.location.href.split('/');
    var serverHost = serverHostArray[0] + "//" + serverHostArray[2] + "";
    //执行一个表单
    var manager = table.render({
        elem: '#manager',
        url: timetableHost + "/api/labroom/findLabRoomAdminByRoomId", //数据接口
        where: {"labRoomId": labRoomId, "type": 1},
        title: '实验室管理员',
        toolbar: '#toolbars',
        cellMinWidth: 100,
        page: true, //开启分页
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            groups: 1, //只显示 1 个连续页码
            first: false, //不显示首页
            last: false //不显示尾页
        },
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
                    fixed: 'left',
                    type: 'checkbox',
                    width: 30
                }, {
                fixed: 'left',
                title: '序号',
                type: 'numbers',
                width: 40
            }, {
                title: '姓名',
                templet: function (d) {
                    return d.user ? d.user.cname : ""
                }
            }, {
                title: '工号',
                templet: function (d) {
                    return d.user ? d.user.username : ""
                }
            }, {
                fixed: 'right',
                title: '操作',
                toolbar: '#toolbar',
                width: 65
            }
            ]
        ],
        id: 'manager',
        data: table,
        skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20],
        limit: 10 //每页默认显示的数量
    });

    //监听行工具事件
    table.on('tool(manager)', function (obj) {
        var data = obj.data;
        //删除
        if (obj.event === 'del') {
            layer.confirm('是否删除？', {
                title: '提示'
            }, function (index) {
                $.ajax({
                    url: timetableHost + "/api/labroom/deleteLabRoomAdminById", //数据接口
                    data: {"id": data.id, "username": currentUsername},
                    dataType: "JSON",
                    success: function (res) {
                        layer.msg("删除成功", {icon: 1})
                        table.reload('manager');
                    }, error: function (e) {
                        layer.msg("删除失败", {icon: 2})
                    }
                })
                layer.close(index);
            });
        }
    });

    //头工具栏事件
    table.on('toolbar(manager)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data; //获取选中的数据
        switch (obj.event) {
            case 'addadd':
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '添加实验室管理员',
                    area: ['500px', '144px'],
                    shade: 0.5,
                    maxmin: true,
                    content: 'addManager?labRoomId=' + labRoomId,
                    zIndex: layer.zIndex //重点1
                    ,
                    success: function (layero) {
                        layer.setTop(layero); //重点2
                    },
                    btn: ['添加', '取消'],
                    yes: function (index, layero) {
                        //点击确认触发 iframe 内容中的按钮提交
                        var submit = layero.find('iframe').contents().find("#addmanagerbtn");
                        submit.click();
                    }
                });
                layer.full(index);
                break;
            case 'import':
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '批量导入实验室管理员',
                    area: ['500px', '500px'],
                    shade: 0.5,
                    maxmin: true,
                    content: 'importManager?labRoomId=' + labRoomId
                });
                //layer.full(index);
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
                            url: timetableHost + "/api/labroom/batchDeleteLabRoomAdmins", //数据接口
                            data: {"array": studentId.toString(), "roomId": labRoomId, "username": currentUsername},
                            dataType: "JSON",
                            success: function (res) {
                                layer.msg("批量删除成功", {icon: 1});
                                table.reload("manager")
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
                //执行重载
                table.reload('manager', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        search: searchbox.val()
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
            manager.config.cols[0][4].hide = true;
        } else {
            $('.addadd, .import, .delete').css("display", "inline-block");
            manager.config.cols[0][4].hide = false;
        }
    }
    //根据当前权限显示界面
    $(function () {
        authSet();
    })
});