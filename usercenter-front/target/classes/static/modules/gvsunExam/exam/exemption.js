layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
    var layer = layui.layer,
        table = layui.table,
        element = layui.element,
        form = layui.form;

    //向世界问个好
    layer.msg('添加免考成员');

    form.render(null, 'exemptionlist');
    table.render({
        elem: '#exemptionlist',
        url: httpBaseUrl + '/views/siteStudentApi', //数据接口
        where: {"examId": examId, "siteId": siteId},
        method: 'get',
        title: '添加免考名单',
        cellMinWidth: 100,
        page: true, //开启分页
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            //curr: 5, //设定初始在第 5 页
            groups: 1, //只显示 1 个连续页码
            first: false, //不显示首页
            last: false //不显示尾页
        },
        cols: [
            [ //表头
                {type: 'checkbox'},
                {
                field: 'cname',
                title: '姓名',
                sort: true
                }, {
                    field: 'username',
                    title: '学号',
                    sort: true
                }]
        ],
        id: 'exemptionlist',
        data: table,
        skin: 'line', //表格风格
        even: false,
        limits: [20, 50, 70, 100],
        limit: 20 //每页默认显示的数量
    });

    //执行重载
    $('#searchName').on('click', function () {
        var search = $('#searchbox').val();
        table.reload('exemptionlist', {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: {
                search: search
            }
        }, 'data');
    });

    $('#addUsername').on('click', function () {
        var checkStatus=table.checkStatus('exemptionlist'),
            data=checkStatus.data;
        console.log(data);
        usernameList = []
        data.forEach(function (n, i) {
            usernameList.push(n.username);
        });
        if (data.length <= 0){
            layer.msg('请选择一条数据');
        } else {
            layer.confirm('确认更改选中用户信息？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    url: httpBaseUrl + '/views/examFreeApi',
                    type: 'GET',
                    data: {"examId": examId, "students": usernameList.toString()},
                    success: function (data) {
                        layer.msg("修改成功");
                        layui.table.reload('exemptionlist');
                    },
                    fail: function () {
                        layer.msg("修改失败");
                    }
                })
            })
        }
    });

})