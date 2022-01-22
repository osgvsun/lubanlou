layui.use('table', function () {
    var table = layui.table,
        $ = layui.jquery;

    var equipmentmigration = table.render({
        elem: '#equipmentmigration'
        , url: timetableHost + '/api/labroom/getLabRoom'
        , method: 'POST'
        , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        , page: true //开启分页
        , cols: [[
              {type:'radio'}
            , {field: 'labRoomNumber', title: '房间号'}
            , {field: 'labRoomName', title: '实验分室名称', sort: true}
            , {field: 'campusName', title: '校区'}
            , {field: 'buildName', title: '楼宇', width: '30%', minWidth: 100}
        ]],
        id: 'equipmentmigration',
        data: table,
        skin: 'line', //表格风格
        even: false,
        limits: [5, 10, 20, 50],
        limit: 5 //每页默认显示的数量
    });

    $('#equipmentmigrationbtn').on('click', function () {
        let index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        let checkStatus = table.checkStatus(equipmentmigration.config.id)
        let labId = checkStatus.data[0].id;
        $.ajax({
            url: timetableHost + '/api/labroom/transferDevice',
            type: 'GET',
            data: {
                "labId": labId,
                "ids": ids
            },
            success: function (res) {
                layer.msg('迁移成功');
                parent.layui.table.reload('equipment'); //重载表格
                parent.layer.close(index); //再执行关闭
            }
        })
    });
    var $ = layui.$,
        active = {
            reload: function () {
                var searchbox = $('#searchbox');

                //执行重载
                table.reload('equipmentmigration', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        keyword: searchbox.val()
                    }
                }, 'data');
            }
        };

    $('.sureSearch').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
})