// 学院维护
layui.define(function (e) {
    layui.use(['form', 'table', 'layer'], function () {
        var $ = layui.$,
            form = layui.form,
            layer = layui.layer,
            table = layui.table;
        // 获取学院的id
        // 目前是部门的数据需要这个id，后面改成学院的可以删除
        var chooseCollegeId = 1;//学院id变量
        form.on('select(chooseCollege)', function (data) {
            console.log(data.value); //得到被选中的值
            chooseCollegeId = data.value;
            table.reload("menu", {
                where: {
                    collegeId: chooseCollegeId
                },
            })
        });
        // 学院信息表格显示
        table.render({
            elem: "#menu",
            url: userCenterHost + '/usercenter/dropDownBoxController/getCollege',
            method: 'GET',
            where: {
                collegeId: chooseCollegeId
            },
            title: '学院名称',
            cellMinWidth: 100,
            cols: [
                [{title: '序号', width: 50, type: "numbers"},
                    {field: 'id', title: '序号', width: 100, sort: true, hide: true},
                    {field: 'college', title: '学院名称', width: 500, align: 'center'},
                    {field: 'sequence', title: '排序', width: 80, sort: true, edit: 'text'},
                    {title: '操作', align: 'center', toolbar: '#edit'}
                ]
            ],
            page: false,
            limit: 10,
            skin: "line"
        });

        //监听行工具操作
        table.on("tool(menuList)", function (obj) {
            var menuId = obj.data.id;
            //删除学院
            if (obj.event === 'del') {
                $.ajax({
                    url: userCenterHost + '/usercenter/dict/deleteCollege/',
                    type: 'post',
                    data: {
                        collegeId: menuId
                    },
                    success: function (res) {
                        //layer.msg("删除成功！");
                        //obj.del();
                        //table.reload("menu")
                        if (!res.code) {
                            parent.layer.alert("删除成功!")
                            obj.del();
                            table.reload('menu');
                        }
                        else
                            parent.layer.alert(res.msg);

                    },
                    error: function () {
                        alert("删除接口请求失败！")
                    }
                })
            }
            // 编辑学院
            if (obj.event === 'edit') {
                $("#department_edit").val(obj.data.college);
                $("#sequence").val(obj.data.sequence);
                layer.open({
                    type: 1
                    , title: '编辑学院信息'
                    , area: ['50%', '60%']
                    , id: 'layerDemo'//防止重复弹出
                    , content: $('#edit_department')
                    , btn: '提交修改'
                    , btnAlign: 'c' //按钮居中
                    , shade: 0 //不显示遮罩
                    , yes: function () {
                        var editDepartmentList = {
                            college: $("#department_edit").val(),
                            sequence: $("#sequence").val(),
                            id: obj.data.id,
                            collegeId: obj.data.id
                        };
                        $.ajax({
                            type: 'POST',
                            url: userCenterHost + '/usercenter/dict/modifyCollege',
                            async: false,
                            data: editDepartmentList,
                            // dataType: 'json',
                            // contentType: 'application/json; charset=UTF-8',
                            success: function () {
                                layer.msg("修改成功！");
                                table.reload("menu");
                                layer.closeAll();
                            },
                            error: function () {
                                alert("修改接口請求失敗！");
                            }
                        })
                    }
                });
            }
            //排序下降
            if (obj.event === 'desc') {
                var thiss = $(this).parent().parent().parent().parent();
                var currOrder = thiss.next().children("td[data-field=sequence]").children("div").text();
                //获取下一个的学院信息
                var nextDepart = thiss.next().children("td[data-field=department]").children("div").text();
                var nextDepartId = thiss.next().children("td[data-field=id]").children("div").text();
                thiss.insertAfter(thiss.next());//下移
                console.log(typeof ($("#sequence").val()));
                console.log(typeof (currOrder));
                var descDepartment = {
                    department: obj.data.department,
                    sequence: currOrder,
                    id: obj.data.id,
                    collegeId: chooseCollegeId
                };
                var nextDescDepartment = {
                    department: nextDepart,
                    sequence: obj.data.sequence,
                    id: nextDepartId,
                    collegeId: chooseCollegeId
                };
                $.ajax({
                    type: 'POST',
                    url: userCenterHost + '/usercenter/dict/modifyDepartment',
                    data: nextDescDepartment,
                    async: 'false',
                    // dataType: 'json',
                    success: function () {
                        layer.msg("修改排序成功！");
                        table.reload("menu")
                    },
                    error: function () {
                        alert("添加接口請求失敗！");
                    }
                })
                $.ajax({
                    type: 'POST',
                    url: userCenterHost + '/usercenter/dict/modifyDepartment',
                    data: descDepartment,
                    async: 'false',
                    // dataType: 'json',
                    success: function () {
                        layer.msg("修改排序成功！");
                        table.reload("menu")
                    },
                    error: function () {
                        alert("添加接口請求失敗！");
                    }
                })
            }
            // 排序上升
            if (obj.event === 'asc') {
                var thiss = $(this).parent().parent().parent().parent();
                var currOrder = thiss.prev().children("td[data-field=sequence]").children("div").text();
                //获取上一个的学院信息
                var prevDepart = thiss.prev().children("td[data-field=department]").children("div").text();
                var prevDepartId = thiss.prev().children("td[data-field=id]").children("div").text();
                thiss.insertBefore(thiss.prev());//下移
                var ascDepartment = {
                    department: obj.data.department,
                    sequence: currOrder,
                    id: obj.data.id,
                    collegeId: chooseCollegeId
                };
                var prevAscDepartment = {
                    department: prevDepart,
                    sequence: obj.data.sequence,
                    id: prevDepartId,
                    collegeId: chooseCollegeId
                };
                $.ajax({
                    type: 'POST',
                    url: userCenterHost + '/usercenter/dict/modifyDepartment',
                    data: ascDepartment,
                    // dataType: 'json',
                    // async:'false',
                    success: function () {
                        layer.msg("修改排序成功！");
                        table.reload("menu")
                    },
                    error: function () {
                        alert("添加接口請求失敗！");
                    }
                })
                $.ajax({
                    type: 'POST',
                    url: userCenterHost + '/usercenter/dict/modifyDepartment',
                    data: prevAscDepartment,
                    // dataType: 'json',
                    // async:'false',
                    success: function () {
                        layer.msg("修改排序成功！");
                        table.reload("menu")
                    },
                    error: function () {
                        alert("添加接口請求失敗！");
                    }
                })
            }

        }),


            //监听单元格编辑
            table.on('edit(menuList)', function (obj) {
                /*  var value = obj.value //得到修改后的值
                      ,field = obj.field; //得到字段*/
                var field = obj.data;//得到修改后的数据集合
                var editDepartment = field;
                editDepartment.collegeId = chooseCollegeId;
                $.ajax({
                    type: 'POST',
                    url: userCenterHost + '/usercenter/dict/modifyDepartment',
                    // async:'false',
                    data: editDepartment,
                    // dataType: 'json',
                    // contentType: 'application/json; charset=UTF-8',
                    success: function () {
                        table.reload("menu");
                        layer.msg("修改排序成功！");
                    },
                    error: function () {
                        alert("修改接口請求失敗！");
                    }
                })


            });
        active = {
            addMenu: function () {
                $("#addMenu").slideDown();
            },
            // 增加学院
            add: function () {
                var inputDepartment = {
                    'college': $("#menuName").val(),
                    'collegeId': chooseCollegeId
                };
                $.ajax({
                    type: 'POST',
                    url: userCenterHost + '/usercenter/dict/addCollege',
                    data: inputDepartment,
                    // dataType: 'json',
                    /*contentType: 'application/json; charset=UTF-8',*/
                    success: function (res) {
                        if (!res.code) {
                           alert(res.msg);
                            $("#addMenu").slideUp();
                            table.reload("menu")
                        }else{
                            alert(res.msg);
                        }
                    },
                    error: function () {
                        alert("添加接口請求失敗！");
                    }
                })
            },
            cancel: function () {
                $("#addMenu").slideUp();
            }
        }
        $('.layui-btn').on('click', function () {
            var othis = $(this), type = othis.data('type');
            active[type] ? active[type].call(this, othis) : '';
        })
    })
    e("collegeMaintenance", {})
})
