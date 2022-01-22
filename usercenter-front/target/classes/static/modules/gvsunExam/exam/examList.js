layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
    var layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form

    //向世界问个好
    layer.msg('进入考试列表');
    localStorage.removeItem('questions')

    form.render(null, 'examlistbox');
    //执行一个表单
    //执行表单
    // 全部
    // showTable("");
    //未开始考试列表
    // showTable(1);
    //开始考试列表
    // showTable(2);
    //考试结束
    // showTable(3);

    // 切换课程
    setCourseSite('#site', siteId, layui.$)



    //获取当前课程
    let course = findCourseSiteById(siteId).title;
    $.cookie('coursename', course);
    let flag = getIsStudentInSite(siteId, username);
    $.cookie('flag', flag);
    if ($.cookie('currauth') === 'TEACHER'||$.cookie('currauth') === 'SUPERADMIN') {
        $('.newexam').css("display", "inline-block");
    } else {
        $('.newexam').remove();
    }
    window.showTable = function (dateType) {
        var showTable =     table.render({
            elem: '#examlist',
            url: httpBaseUrl + '/views/examListApi', //数据接口
            where:{'id': siteId, 'dateType': dateType, "student": username, "dictionary": '1', "authorityName": $.cookie('currauth')},
            method: 'post',
            title: '考试列表',
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
                    field: 'title',
                    title: '考试名称',
                    sort: true
                }, {
                    field: 'state',
                    title: '考试状态',
                    templet: function (d) {
                        var date = new Date();
                        var start = new Date(d.startTime);
                        var end = new Date(d.dueTime)
                        if (date.getTime()<start.getTime() && d.status==1){
                            return '考试未开始';
                        }else if(date.getTime()>start.getTime()&&date.getTime()<end.getTime() && d.status==1){
                            return '考试进行中'
                        }else if(date.getTime()>end.getTime() && d.status==1){
                            return '考试已结束';
                        }else if (d.status==0){
                            return '考试未发布';
                        }
                    },
                    sort: true
                }, {
                    fixed: 'right',
                    title: '操作',
                    toolbar: '#toolbar',
                    width: 700
                }
                ]
            ],
            id: 'examlist',
            data: table,
            skin: 'line', //表格风格
            even: false,
            limits: [20, 50, 70, 100],
            limit: 20 //每页默认显示的数量
        });
        return showTable;
    }

    //监听行工具事件
    table.on('tool(examlist)', function(obj) {
        var data = obj.data;
        //打开考试成绩页面
        if(obj.event === 'score') {
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '考试成绩',
                area: ['100%', '100%'],
                shade: 0.5,
                maxmin: true,
                content: 'examScore?assignmentId='+data.id + '&title=' + data.title
            });
            layer.full(index);
        };
        //打开补考名单页面
        if(obj.event === 'list') {
            var data = obj.data;
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '补考名单',
                area: ['100%', '100%'],
                shade: 0.5,
                maxmin: true,
                content: 'makeupExamList?assignmentId='+data.oldAssignmentId
            });
            layer.full(index);
        };
        //打开免考名单页面
        if (obj.event === 'exemption'){
            var data = obj.data;
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '添加免考名单',
                area: ['100%', '100%'],
                shade: 0.5,
                offset: 'auto',
                maxmin: true,
                content: 'exemption?examId=' + data.id
            });
            // layer.full(index);
        }
        //打开开始考试须知页面
        if(obj.event === 'startexam') {
            var data = obj.data;
            //先判断当前登录人是否还有考试次数
            var flag = false;
            // $.blockUI({message: '<iframe width="100%" height="100%" scrolling="no" src=../plugin/chrome_rex_game/index.html></iframe>'});
            $.ajax({
                async: false,
                data: {'examId': data.id, "username": username},
                url: httpBaseUrl + "/views/isExamCanAnswer",
                type: "POST",
                success: function (data) {
                    flag = data;
                    $.unblockUI();
                },
                error: function (e) {
                    $.unblockUI();
                }
            });
            if (flag) {
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '考试须知',
                    area: ['500px', '400px'],
                    shade: 0.5,
                    maxmin: true,
                    content: 'startExam?assignmentId='+data.id,
                    zIndex: layer.zIndex //重点1
                    ,
                    success: function(layero) {
                        layer.setTop(layero); //重点2
                    },
                    btn: ['开始考试'],
                    yes: function(index, layero) {
                        //点击确认触发 iframe 内容中的按钮提交
                        var submit = layero.find('iframe').contents().find("#startexambtn");
                        submit.click();
                        var examUrl = '';

                        //考试创建副本获取test_parent_id
                        $.ajax({
                            url: httpBaseUrl + '/views/newExamPaper',
                            type: 'GET',
                            async: false,
                            data: {"examId": data.id, "username": username},
                            success: function (res) {
                                examUrl = 'beginExam?simulation=' + 0 + '&examId='+ res + '&page=1'
                            }
                        })
                        location.href = examUrl;
                    }
                });
                layer.full(index);
            } else {
                alert("没有更多作答次数");
            }
        };
        //打开查看页面
        if(obj.event === 'detail') {
            var data = obj.data;
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '查看考试详情',
                area: ['100%', '100%'],
                shade: 0.5,
                maxmin: true,
                content: 'examDetail?assignmentId='+data.id,
                zIndex: layer.zIndex ,//重点1
                success: function (layero, index) {
                    layer.setTop(layero);
                },
                yes: function (index, layero) {
                    var submit = layero.find('iframe').contents().find("examdetailbox");
                    submit.click();
                },
                end: function () {
                    layui.table.reload('examlist');
                }
            });
            layer.full(index);
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
                content: 'editExam?assignmentId='+data.id,
                zIndex: layer.zIndex //重点1
                ,
                success: function(layero, index) {
                    layer.setTop(layero); //重点2
                },
                btn: ['立即发布','保存草稿', '取消'],
                yes: function(index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#editexambtn");
                    submit.click();
                },
                btn2:function(index,layero){
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#saveexambtn");
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
                    url: httpBaseUrl + '/views/deleteExamApi',
                    type: 'GET',
                    data: {"tAssignmentId": data.id},
                    success: function (data) {
                        if (data) {
                            obj.del();
                            layer.close(index);
                            layer.msg("删除成功", {icon: 6});
                            layui.table.reload('examlist');
                        } else {
                            layer.msg("删除失败", {icon: 5});
                        }
                    }
                })
                layer.close(index);
            });
        }
        //生成二维码
        if(obj.event === 'examQRCode') {
            var data = obj.data;
            $.ajax({
                url: httpBaseUrl + '/views/examQRCode',
                type: 'POST',
                data: {'examId': data.id},
                dataType: 'text',
                error: function (request) {
                    alert('请求错误!');
                },
                success: function (data) {
                        var cid = $('#site').val();
                        //执行重载
                        table.reload('examlist', {
                            page: {
                                curr: 1 //重新从第 1 页开始
                            },
                            where: {
                                id: cid,
                            }
                        }, 'data');
                    }
            });
        }
        //打开二维码
        if(obj.event === 'openQRCode') {
            var data = obj.data;
            resourceContainer.getFileById({
                fileId: data.qrcodeUrl,
                success: function (data) {
                    $("#wx_p").empty();
                    $("#wx_p").append('<img src="' + data.url + '"/>');
                    layer.open({
                        type: 1,
                        title: false,
                        closeBtn: 1,
                        area: ['400px', '400px'],
                        shadeClose: true,
                        content: $("#qRCode")
                    });
                }
            });
        }
        //下载二维码
        if(obj.event === 'downloadQRCode') {
            var data = obj.data;
            resourceContainer.downLoadFile({
                fileId: data.qrcodeUrl, fail: function (res) {
                    alert('下载失败:' + res);
                }
            });
        };
        if (obj.event === 'copy') {
            //layer.msg('切换用户权限');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '选择课程',
                area: ['500px', '240px'],
                shade: 0.5,
                maxmin: true,
                content: 'sameSite?assignmentId='+data.id+'&type=exam',
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
               var url= window.location.origin+ "/teacherInformationCenter/gvsunexam/startExam?assignmentId="+data.id +"&isLink="+true;
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

    //打开新增考试
    var newexam = {
        newexam: function() {
            //layer.msg('新增考试');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '新增考试',
                area: ['500px', '440px'],
                shade: 0.5,
                maxmin: true,
                content: 'newExam',
                zIndex: layer.zIndex //重点1
                ,
                success: function(layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['提交并发布', '保存草稿', '取消'],
                yes: function(index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#newexambtn");
                    submit.click();
                },
                btn2:function(index,layero){
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#saveexambtn");
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
    $('.newexam').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        newexam[method] ? newexam[method].call(this, othis) : '';
    });
    $(function (){
        showTable();
        form.render();
    });
});