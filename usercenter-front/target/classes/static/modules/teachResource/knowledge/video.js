layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
    var layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form

    //向世界问个好
    layer.msg('进入视频列表');

    form.render(null, 'videolistbox');

    window.showTable = function (dateType) {
        var showTable =     table.render({
            elem: '#videolist',
            //url: httpBaseUrl + '/views/examListApi', //数据接口
            url: "../modules/teachResource/knowledgeData.json",
            where:{'id': siteId, 'dateType': dateType, "student": username, "dictionary": '1', "authorityName": $.cookie('currauth')},
            method: 'get',
            title: '视频列表',
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
                    title: '视频名称',
                    sort: true
                }, {
                    field: 'size',
                    title: '视频大小',
                    sort: true
                },
                    {
                        field: 'description',
                        title: '视频描述',
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
            id: 'videolist',
            data: table,
            skin: 'line', //表格风格
            even: false,
            limits: [20, 50, 70, 100],
            limit: 20 //每页默认显示的数量
        });
        return showTable;
    }

    //监听行工具事件
    table.on('tool(videolist)', function(obj) {
        var data = obj.data;
        //打开查看页面
        if(obj.event === 'detail') {
            var data = obj.data;
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '查看视频详情',
                area: ['100%', '100%'],
                shade: 0.5,
                maxmin: true,
               // content: 'examDetail?assignmentId='+data.id,
                zIndex: layer.zIndex ,//重点1
                success: function (layero, index) {
                    layer.setTop(layero);
                },
                yes: function (index, layero) {
                    var submit = layero.find('iframe').contents().find("videodetailbox");
                    submit.click();
                },
                end: function () {
                    layui.table.reload('videolist');
                }
            });
            layer.full(index);
        };
        //打开编辑页面
        if(obj.event === 'edit') {
            var data = obj.data;
            var index = layer.open({
                type: 2 ,//此处以iframe举例
                title: '编辑视频',
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
                    var submit = layero.find('iframe').contents().find("#editvideobtn");
                    submit.click();
                },
                btn2:function(index,layero){
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#savevideobtn");
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
                            layui.table.reload('videolist');
                        } else {
                            layer.msg("删除失败", {icon: 5});
                        }
                    }
                })
                layer.close(index);
            });
        }
    });

    //打开新增视频
    var newvideo = {
        newvideo: function() {
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '新增视频',
                area: ['500px', '440px'],
                shade: 0.5,
                maxmin: true,
                content: 'addVideo',
                zIndex: layer.zIndex //重点1
                ,
                success: function(layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['提交并发布', '保存草稿', '取消'],
                yes: function(index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#newvideobtn");
                    submit.click();
                },
                btn2:function(index,layero){
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#savevideobtn");
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
    $('.newvideo').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        newvideo[method] ? newvideo[method].call(this, othis) : '';
    });
    $(function (){
        showTable();
        form.render();
    });
});