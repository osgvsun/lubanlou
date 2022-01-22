layui.use(['element', 'form', 'table'], function(){
    var element = layui.element,
        form = layui.form,
        table = layui.table; //导航的hover效果、二级菜单等功能，需要依赖element模块

    form.render(null, 'equipmentsecurityprotocolbox');
//执行一个表单
    table.render({
        elem: '#traningaccess',
        url: httpAccessUrl + '/getAccessEntityTraining', //数据接口
        where: {"entityId": entityId, "entityType": entityType},
        title: '列表',
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
                {
                    fixed: 'left',
                    title: '序号',
                    type: 'numbers',
                    width: 50,
                    fixed: 'left'
                }, {
                field: 'content',
                title: '培训内容',
                sort: true
                }, {
                    field: 'address',
                    title: '培训地点',
                    sort: true
                }, {
                    field: 'trainingDate',
                    title: '培训时间',
                    sort: true
                }, {
                    field: 'advanceHour',
                    title: '提前预约时间',
                    minWidth: 130,
                    sort: true,
                    templet: function (d) {
                        return d.advanceHour + '小时';
                    }
                }, {
                    field: 'teacher',
                    title: '培训教师',
                    sort: true
                }, {
                    field: 'maxNumber',
                    title: '报名人数/最大人数',
                    minWidth: 165,
                    sort: true
                }, {
                    fixed: 'right',
                    title: '操作',
                    toolbar: '#toolbar',
                    width: 200
                }
            ]
        ],
        id: 'traningaccess',
        data: table,
        skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });

    table.on('tool(traningaccess)', function (obj) {
        let data = obj.data;
        if (obj.event === 'detail') {
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '结果录入',
                area: ['500px', '441px'],
                shade: 0.5,
                maxmin: true,
                content: 'trainingDetailList',
                zIndex: layer.zIndex //重点1
                ,
                success: function(layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['确定', '取消'],
                yes: function(index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#trainingdetaillistbtn");
                    submit.click();
                }
            });
            layer.full(index);
        };
        if (obj.event === 'del') {
            layer.confirm('真的删除培训信息吗？', function (index) {
                $.ajax({
                    url: httpAccessUrl + '/deleteAccessTraining?itemId=' + data.trainingId,
                    type: 'POST',
                    success: function (res) {
                        layer.msg('删除成功');
                        table.reload('traningaccess');
                    }
                })
            })
        }
    })
    //新建培训
    $('.addTraning').on('click', function (res) {
        var index = layer.open({
            type: 2 //此处以iframe举例
            ,
            title: '新建培训',
            area: ['600px', '500px'],
            shade: 0.5,
            maxmin: true,
            content: 'newEquipmentTrainingManage?entityId=' + entityId + '&entityType=' + entityType,
            zIndex: layer.zIndex //重点1
            ,
            success: function(layero) {
                layer.setTop(layero); //重点2
            },
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                //点击确认触发 iframe 内容中的按钮提交
                var submit = layero.find('iframe').contents().find("#newtraningbtn");
                submit.click();
            }
        });
    })
});