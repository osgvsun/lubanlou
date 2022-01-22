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

    form.render(null, 'addsoftwarelistbox');

    //监听提交
    form.on('submit(addsoftwarelistbtn)', function (data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        let checkStatusData = [];
        table.checkStatus("addsoftwarelist").data.forEach(function (obj, index) {
            checkStatusData.push(obj.id);
        })
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        $.ajax({
            url: timetableHost + "/api/labroom/saveLabRoomSoftware", //数据接口
            data: {roomId: labRoomId, array: checkStatusData.toString()},
            dataType: "JSON",
            success: function (res) {
                if (res.msg == "success") {
                    parent.layui.table.reload('softwarelist'); //重载表格
                    parent.layer.close(index); //再执行关闭
                } else {
                    layer.msg("添加软件失败", {icon: 2})
                }
            }
        })
    });

    //执行一个表单
    table.render({
        elem: '#addsoftwarelist',
        url: timetableHost + "/api/labroom/getSoftwareByNameAndEdition", //数据接口
        title: '实验项目',
        where: {"labRoomId": labRoomId},
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
            }
            ]
        ],
        id: 'addsoftwarelist',
        data: table,
        skin: 'line', //表格风格
        even: false,
    });

    var $ = layui.$,
        active = {
            reload: function () {
                var searchbox = $('#searchbox');
                var searchbox2 = $('#searchbox2');

                //执行重载
                table.reload('addsoftwarelist', {
                    where: {
                        name: searchbox.val(),
                        edition: searchbox2.val(),
                    }
                }, 'data');
            },
            reset: function () {
                $('#searchbox').val("")
                $('#searchbox2').val("")
                table.reload('addsoftwarelist', {
                    where: {
                        name: "",
                        edition: ""
                    }
                }, 'data');
            }
        };

    $('.search_line .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});