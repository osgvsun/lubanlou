layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form,
        laydate = layui.laydate

    var currentauth = cookie.get('currauth'); //存储当前权限
    var statusCenter = cookie.get('status'); // 判断从哪一个入口来源
    //向世界问个好
    layer.msg('进入实验项目');

    form.render(null, 'labprojectbox');

    //执行一个表单
    var labproject =  table.render({
        elem: '#labproject',
        url: labRoomHost + "/api/labroom/getOperationItemsByLabId", //数据接口
        where: {labId: labRoomId},
        title: '实验项目',
        toolbar: '#toolbars',
        cellMinWidth: 100,
        parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": 0, //解析接口状态
                "data": res.data,
                "count": res.count,//解析数据列表
            };
        },
        page: true, //开启分页
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
                    field: 'lpName',
                    title: '实验项目名称',
                    sort: true
                }, {
                    field: 'courseName',
                    title: '所属课程',
                }, {
                    field: 'lpCategoryApp',
                    title: '实验类型'
                }, {
                    field: 'lpCategoryMain',
                    title: '实验类别'
                }, {
                    field: 'lpMajorFit',
                    title: '面向专业',
                    sort: true
                }, {
                    field: 'lpDepartmentHours',
                    title: '实验学时',
                    sort: true
                }, {
                    field: 'itemAim',
                    title: '实验要求'
                }, {
                    fixed: 'right',
                    title: '操作',
                    toolbar: '#toolbar',
                    width: 65
                }
            ]
        ],
        id: 'labProject',
        data: table,
        skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });

    //监听行工具事件
    table.on('tool(labproject)', function (obj) {
        let data = obj.data;
        //删除
        if (obj.event === 'del') {
            layer.confirm('是否删除？', {
                title: '提示'
            }, function (index) {
                // obj.del();
                $.ajax({
                    url: labRoomHost + "/api/labroom/deleteLabRoomOperationItem", //数据接口
                    data: {id: data.id, "labRoomId": labRoomId },
                    dataType: "JSON",
                    success: function (res) {
                        if (res.msg == "success") {
                            layer.msg("删除成功", {icon: 1})
                            table.reload('labProject');
                        }
                    }
                })
                layer.close(index);
            });
        }
    });

    //头工具栏事件
    table.on('toolbar(labproject)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data; //获取选中的数据
        switch (obj.event) {
            case 'addadd':
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '添加实验项目',
                    area: ['500px', '144px'],
                    shade: 0.5,
                    maxmin: true,
                    content: 'addLabProject?labRoomId=' + labRoomId,
                    zIndex: layer.zIndex //重点1
                    ,
                    success: function (layero) {
                        layer.setTop(layero); //重点2
                    },
                    btn: ['添加', '取消'],
                    yes: function (index, layero) {
                        //点击确认触发 iframe 内容中的按钮提交
                        var submit = layero.find('iframe').contents().find("#addlabprojectbtn");
                        submit.click();
                    }
                });
                layer.full(index);
                break;
            case 'delete':
                if (data.length == 0) {
                    layer.msg('请选择一行');
                } else {
                    //获取到需要删除的id数组
                    var length = data.length;
                    var studentId = [];
                    for (var i = 0; i < length; i++) {
                        studentId.push(data[i].id);
                    }
                    layer.confirm('是否删除？', {
                        title: '提示'
                    }, function (index) {
                        $.ajax({
                            url: labRoomHost + "/api/labroom/batchDeleteLabRoomOperationItem", //数据接口
                            data: {ids: studentId.toString(), "labRoomId": labRoomId},
                            dataType: "JSON",
                            success: function (res) {
                                if (res.msg == "success") {
                                    layer.msg("批量删除成功", {icon: 1});
                                    table.reload("labProject")
                                }
                            }
                        })
                        layer.close(index);
                    });
                }
                break;
        }
        ;
    });
    function duplicateRemoval(dataArr){
        let obj = {};
        let data = dataArr.reduce((cur, next) => {
            obj[next.value] ? "" : obj[next.value] = true && cur.push(next);
            return cur;
        }, []); //设置cur默认类型为数组，并且初始值为空的数组
        return data;
    }
    var courseNumber = xmSelect.render({
        el: '#courseNumber',
        name: 'courseNumber',
        autoRow: true,
        radio: true,
        toolbar: { show: true },
        theme: {color: '#0081ff'},
        style: {width: '15rem'},
        filterable: true,
        remoteSearch: true,
        remoteMethod: function (val, cb, show) {
            if (!val) {
                return cb([]);
            }
            $.ajax({
                url: labRoomHost + '/api/common/select/apiCommonSelectBySelect',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({"type": "schoolCourseInfoList", "search": val}),
                success: function (response) {
                    let res = response.results.map(v => {
                        return {"value": v.id, "name": v.text}
                    });
                    let data = duplicateRemoval(res)
                    cb(data);
                },

                error: function (err) {
                    cb([]);
                }
            })
        }
    })
    var $ = layui.$,
        active = {
            reload: function () {
                var searchbox = $('#searchbox');
                //执行重载
                table.reload('labProject', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        labName: form.val("labprojectbox").projectname,
                        courseNumber: courseNumber.getValue('valueStr')
                    }
                }, 'data');
                authSet();
            }
        };
    $("input[data-type=reset]").on("click", function () {
        form.val("labprojectbox", {
            "projectname": null,
            "lesson": null
        })
        table.reload('labProject', {
            page: {
                curr: 1 //重新从第 1 页开始
            }
        }, 'data');
    })
    $('.search_line .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    function authSet() {
        if ((currentauth !== 'LABMANAGER' && currentauth !== 'EXCENTERDIRECTOR' && currentauth !== 'ACADEMYLEVELM' && currentauth !== 'SUPERADMIN') || statusCenter === 'center' || cookie.get('allstatus') == 1) {
            $('.addadd, .delete').remove();
            labproject.config.cols[0][9].hide = true;
        } else {
            $('.addadd, .delete').css("display", "inline-block");
            labproject.config.cols[0][9].hide = false;
        }
    }
    //根据当前权限显示界面
    $(function () {
        authSet();
    })
});