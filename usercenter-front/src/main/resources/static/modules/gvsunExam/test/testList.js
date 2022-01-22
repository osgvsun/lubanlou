layui.use(['laypage', 'layer', 'table', 'element', 'form'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form;

    //向世界问个好
    layer.msg('进入测试列表');

    localStorage.removeItem('questions')
    form.render(null, 'testlistbox');
    //获取当前课程
    let course = findCourseSiteById(siteId).title;
    $.cookie('coursename', course);
    let flag = getIsStudentInSite(siteId, username);
    $.cookie('flag', flag);
    if (course === "全校考试") {
        $('.a1, .a2, .a3').remove();
        $('.a4, .a5').show();
    } else {
        $('.a4, .a5').remove();
        $('.a1, .a2, .a3').show();
    }
    // 切换课程
    setCourseSite('#site', siteId, layui.$)

    if ($.cookie('currauth') !== 'STUDENT') {
        $('.newtest').css("display", "inline-block");
    } else {
        $('.newtest').remove();
    }

    window.showTable = function (dateType) {
        //执行一个表单
        var showTable = table.render({
            elem: '#testlist',
            url: httpBaseUrl + '/views/testListApi', //数据接口
            where: {"id": siteId, "dateType": dateType,"curruser": currentUsername},
            method: 'post',
            title: '测试列表',
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
                        minWidth: 50
                    }, {
                    field: 'title',
                    title: '测试名称',
                    sort: true,
                    minWidth: 460
                }, {
                    title: '测试状态',
                    templet: function (d) {
                        var date = new Date();
                        var start = new Date(d.startDate);
                        var end = new Date(d.endTime)
                        if (date.getTime() < start.getTime() && d.status == 1) {
                            return '测试未开始';
                        } else if (date.getTime() > start.getTime() && date.getTime() < end.getTime() && d.status == 1) {
                            return '测试进行中'
                        } else if (date.getTime() > end.getTime() && d.status == 1) {
                            return '测试已结束';
                        } else if (d.status == 0) {
                            return '测试未发布';
                        }
                    },
                    minWidth: 460,
                    sort: true
                }, {
                    fixed: 'right',
                    title: '操作',
                    toolbar: '#toolbar',
                    minWidth: 700,
                }
                ]
            ],
            id: 'testlist',
            data: table,
            skin: 'line', //表格风格
            even: false,
            limits: [20, 50, 70, 100],
            limit: 20 //每页默认显示的数量
        });
        return showTable;
    }

    //监听行工具事件
    table.on('tool(testlist)', function (obj) {
        var data = obj.data;
        //打开编辑页面
        if (obj.event === 'edit') {
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '编辑测试',
                area: ['500px', '163px'],
                shade: 0.5,
                maxmin: true,
                content: 'editTest?assignmentId=' + data.id,
                zIndex: layer.zIndex //重点1
                ,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['立即发布','保存草稿', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#edittestbtn");
                    submit.click();
                },
                btn2:function(index,layero){
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#savetestbtn");
                    submit.click();
                },
                end: function () {
                    var cid = $('#site').val();
                    window.showTable();
                    //执行重载
                    sessionStorage.removeItem("num")
                }
            });
            layer.full(index);

        }
        ;
        //打开测试成绩页面
        if (obj.event === 'score') {
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '测试成绩',
                area: ['100%', '100%'],
                shade: 0.5,
                maxmin: true,
                content: 'testScore?assignmentId=' + data.id
            });
            layer.full(index);
        }
        ;
        //删除
        if (obj.event === 'del') {
            layer.confirm('是否删除？', {
                title: '提示'
            }, function (index) {
                // obj.del();
                $.ajax({
                    url: httpBaseUrl +'/views/deleteExamApi',
                    type: 'GET',
                    data: {"tAssignmentId": data.id},
                    // contentType: 'json',
                    success: function (data) {
                        if (data) {
                            obj.del();
                            layer.close(index);
                            layer.msg("删除成功", {icon: 6});
                            layui.table.reload('testlist');
                        } else {
                            layer.msg("删除失败", {icon: 5});
                        }
                    }
                })
                layer.close(index);
            });
        }
        //开始测试
        if (obj.event === 'starttest') {
            var data = obj.data;
            //先判断当前登录人是否还有考试次数
            var flag = false
            $.ajax({
                async: false,
                data: {'examId': data.id, "username": username},
                url: httpBaseUrl + "/views/test/isTestCanAnswer",
                type: "POST",
                success: function (data) {
                    flag = data;
                }
            });
            if (flag) {
                //测试创建副本获取test_parent_id
                var examUrl = '';
                $.ajax({
                    url: httpBaseUrl + '/views/test/createNewTestApi',
                    type: 'GET',
                    async: false,
                    data: {"testId": data.id, "username": username},
                    success: function (res) {
                        console.log(res)
                        examUrl = 'beginTest?simulation=' + 0 + '&testId='+ res + '&page=1' + '&title=' + data.title + '&score=' + data.score;
                    }
                })
                // var examUrl = 'startTest?simulation=' + 0 + '&testId=' + data.id;
                location.href = examUrl;
            } else {
                alert("没有更多作答次数");
            }
        }
        ;

        if (obj.event === 'copy') {
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '选择课程',
                area: ['500px', '240px'],
                shade: 0.5,
                maxmin: true,
                content: 'sameSite?assignmentId='+data.id+'&type=test',
                zIndex: layer.zIndex //重点1
                ,
                success: function(layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['确定', '取消'],
                yes: function(index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#sitechoosebtn");
                    submit.click();
                }
            });
        };
        if(obj.event === 'copylink'){
            var url= window.location.origin+ "/teacherInformationCenter/gvsunexam/beginTest?tId="+data.id +"&isLink="+true;
            $(".clone-col").attr("data-clipboard-text",url)
            var clipboard = new ClipboardJS(".clone-col")
            clipboard.on('success', function(e) {
                console.info('Action:', e.action);
                console.info('Text:', e.text);
                console.info('Trigger:', e.trigger);
                alert("复制成功")
                clipboard.destroy()
                e.clearSelection();
            })
            clipboard.on('error', function(e) {
                console.error('Action:', e.action);
                console.error('Trigger:', e.trigger);
            });
            window.event.preventDefault();
        }
    });
    //打开新增测试
    var newtest = {
        newtest: function () {
            //layer.msg('新增测试');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '新增测试',
                area: ['500px', '440px'],
                shade: 0.5,
                maxmin: true,
                content: 'newTest',
                zIndex: layer.zIndex //重点1
                ,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['提交并发布', '保存草稿', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#newtestbtn");
                    submit.click();
                },
                btn2:function(index,layero){
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#savetestbtn");
                    submit.click();
                },
                end: function () {
                    window.showTable();
                }
            });
            layer.full(index);
        }
    };
    $('.newtest').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        newtest[method] ? newtest[method].call(this, othis) : '';
    });
    $(function (){
        showTable();
        form.render();
    })
});
$(function () {
    $('.content_box').css("overflow", "visible");
})