layui.use(['laypage', 'layer', 'table', 'element', 'form'], function () {
    var layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form

    //向世界问个好
    layer.msg('进入文件列表');

    form.render(null, 'filelistbox');

    window.showTable = function (dateType) {
        var showTable = table.render({
            elem: '#filelist',
            //url: httpBaseUrl + '/views/examListApi', //数据接口
            url: "../modules/teachResource/knowledgeData.json",
            where: {
                'id': siteId,
                'dateType': dateType,
                "student": username,
                "dictionary": '1',
                "authorityName": $.cookie('currauth')
            },
            method: 'get',
            title: '文件列表',
            cellMinWidth: 100,
            page: true, //开启分页
            page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
                //curr: 5, //设定初始在第 5 页
                groups: 1, //只显示 1 个连续页码
                first: false, //不显示首页
                last: false, //不显示尾页
                theme: '#409eff',
            },
            cols: [
                [ //表头
                    {
                        fixed: 'left',
                        title: '序号',
                        type: 'numbers',
                        width: 50
                    }, {
                    field: 'name',
                    title: '文件名称',
                    sort: true
                }, {
                    field: 'size',
                    title: '文件大小',
                    sort: true
                },
                    {
                        field: 'description',
                        title: '文件描述',
                        width: 700,
                        sort: true
                    },
                    {
                        fixed: 'right',
                        title: '操作',
                        toolbar: '#toolbar',
                        width: 300
                    }
                ]
            ],
            id: 'filelist',
            data: table,
            skin: 'line', //表格风格
            even: false,
            limits: [20, 50, 70, 100],
            limit: 20 //每页默认显示的数量
        });
        return showTable;
    }

    //监听行工具事件
    table.on('tool(filelist)', function (obj) {
        var data = obj.data;
        //文件详情
        if (obj.event === 'detail') {
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '考试成绩',
                area: ['100%', '100%'],
                shade: 0.5,
                maxmin: true,
                content: 'examScore?assignmentId=' + data.id + '&title=' + data.title
            });
            layer.full(index);
        }
        ;
        //编辑
        if (obj.event === 'edit') {
            var data = obj.data;
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '补考名单',
                area: ['100%', '100%'],
                shade: 0.5,
                maxmin: true,
                content: 'makeupExamList?assignmentId=' + data.oldAssignmentId
            });
            layer.full(index);
        };

        //删除
        if (obj.event === 'del') {
            var data = obj.data;
            layer.confirm('是否删除？', {
                title: '提示'
            }, function (index) {
                $.ajax({
                    //url: httpBaseUrl + '/views/deleteExamApi',
                    type: 'GET',
                    data: {"tAssignmentId": data.id},
                    success: function (data) {
                        if (data) {
                            obj.del();
                            layer.close(index);
                            layer.msg("删除成功", {icon: 6});
                            layui.table.reload('filelist');
                        } else {
                            layer.msg("删除失败", {icon: 5});
                        }
                    }
                })
                layer.close(index);
            });
        }
    });

    //打开新增文件
    var newfile = {
        newfile: function () {
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '新增文件',
                area: ['500px', '440px'],
                shade: 0.5,
                maxmin: true,
                content: 'addfile',
                zIndex: layer.zIndex //重点1
                ,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['提交并发布', '保存草稿', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#newfilebtn");
                    submit.click();
                },
                btn2: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#savefilebtn");
                    submit.click();
                    return false;
                },
                cancel: function () {
                    window.showTable();
                }
            });
            layer.full(index);
        }
    };
    $('.newfile').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        newfile[method] ? newfile[method].call(this, othis) : '';
    });
    $(function () {
        showTable();
        form.render();
    });
});