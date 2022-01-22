layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
    var layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form

    //向世界问个好
    layer.msg('进入链接列表');

    form.render(null, 'linklistbox');

    window.showTable = function (dateType) {
        var showTable =     table.render({
            elem: '#linklist',
            //url: httpBaseUrl + '/views/examListApi', //数据接口
            url: "../modules/teachResource/knowledgeData.json",
            where:{'id': siteId, 'dateType': dateType, "student": username, "dictionary": '1', "authorityName": $.cookie('currauth')},
            method: 'get',
            title: '链接列表',
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
                    title: '链接名称',
                    sort: true
                }, {
                    field: 'size',
                    title: '链接大小',
                    sort: true
                },
                    {
                        field: 'description',
                        title: '链接描述',
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
            id: 'linklist',
            data: table,
            skin: 'line', //表格风格
            even: false,
            limits: [20, 50, 70, 100],
            limit: 20 //每页默认显示的数量
        });
        return showTable;
    }

    //监听行工具事件
    table.on('tool(linklist)', function(obj) {
        var data = obj.data;
        //复制链接
        if(obj.event === 'detail') {

        };
        //打开编辑页面
        if(obj.event === 'edit') {
            var data = obj.data;
            var index = layer.open({
                type: 2 ,//此处以iframe举例
                title: '编辑考试',
                area: ['500px', '163px'],
                shade: 0.5,
                maxmin: true,
                // content: 'editExam?assignmentId='+data.id,
                zIndex: layer.zIndex //重点1
                ,
                success: function(layero, index) {
                    layer.setTop(layero); //重点2
                },
                btn: ['立即发布','保存草稿', '取消'],
                yes: function(index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#editlinkbtn");
                    submit.click();
                },
                btn2:function(index,layero){
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#savelinkbtn");
                    submit.click();
                },
                cancel: function () {
                    window.showTable();
                }
            });
            layer.full(index);
        };
        //删除
        if(obj.event === 'del') {
            var data = obj.data;
            layer.confirm('是否删除？', {
                title: '提示'
            }, function(index) {
                $.ajax({
                    // url: httpBaseUrl + '/views/deleteExamApi',
                    type: 'GET',
                    data: {"tAssignmentId": data.id},
                    success: function (data) {
                        if (data) {
                            obj.del();
                            layer.close(index);
                            layer.msg("删除成功", {icon: 6});
                            layui.table.reload('linklist');
                        } else {
                            layer.msg("删除失败", {icon: 5});
                        }
                    }
                })
                layer.close(index);
            });
        }
    });

    //打开新增链接
    var newlink = {
        newlink: function() {
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '新增考试',
                area: ['500px', '440px'],
                shade: 0.5,
                maxmin: true,
                content: 'addLink',
                zIndex: layer.zIndex //重点1
                ,
                success: function(layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['提交并发布', '保存草稿', '取消'],
                yes: function(index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#newlinkbtn");
                    submit.click();
                },
                btn2:function(index,layero){
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#savelinkbtn");
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
    $('.newlink').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        newlink[method] ? newlink[method].call(this, othis) : '';
    });
    $(function (){
        showTable();
        form.render();
    });
});