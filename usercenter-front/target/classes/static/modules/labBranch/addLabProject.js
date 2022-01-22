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

    form.render(null, 'addlabprojectbox');

    //监听提交
    form.on('submit(addlabprojectbtn)', function (data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        let checkStatusData = table.checkStatus("addlabproject").data;
        let arr = [];
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        checkStatusData.forEach(function (obj, index) {
            arr.push(obj.id);
        })
        $.ajax({
            url: timetableHost + "/api/labroom/saveLabRoomOperationItem",
            type: "GET",
            dataType: "JSON",
            data: {roomId: labRoomId, array: arr.toString()},
            contentType: "application/json",
            success:function(res){
                if (res.msg == "success") {
                    parent.layui.table.reload('labProject'); //重载表格
                    parent.layer.close(index); //再执行关闭
                } else {
                    layer.msg("添加实验项目失败", {icon: 2})
                }
            }
        })
    });

    //执行一个表单
    table.render({
        elem: '#addlabproject',
        url: timetableHost + "/api/labroom/getOperationItemsByLabId", //数据接口
        where: {"labId": labRoomId, "type": "add"},
        title: '实验项目',
        cellMinWidth: 100,
        page: true, //开启分页
        parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": 0, //解析接口状态
                "data": res.data, //解析数据列表
                "count": res.count,//解析数据列表
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
                field: 'lpCodeCustom',
                title: '项目编号',
                sort: true
            }, {
                field: 'lpName',
                title: '项目名称',
                sort: true
            }, {
                field: 'termName',
                title: '学期',
                sort: true
            }, {
                field: 'centerName',
                title: '所属实验中心',
                sort: true
            }, {
                field: 'labCenterName',
                title: '中心主任',
                sort: true
            }, {
                field: 'courseName',
                title: '所属课程',
                sort: true
            }, {
                field: 'creatorName',
                title: '创建者',
                sort: true
            }
            ]
        ],
        id: 'addlabproject',
        data: table,
        skin: 'line', //表格风格
        even: false,
    });

    //监听行工具事件
    table.on('tool(addlabproject)', function (obj) {
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
                table.reload('addlabproject', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        labName: searchbox.val()
                    }
                }, 'data');
            }
        };

    $('.search_line .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});