// 人员状态
layui.define(function (e) {
    layui.use(['form', 'table', 'layer'], function () {
        var $ = layui.$,
            form = layui.form,
            layer = layui.layer,
            table = layui.table;
        // 学院信息表格显示
        table.render({
            elem: "#menu",
            url: userCenterHost + '/usercenter/dropDownBoxController/getPersonState',
            method: 'GET',
            title: '人员状态',
            cellMinWidth: 100,
            cols: [
                [{title: '序号', width: 50, type: "numbers"},
                    {field: 'id', title: '序号', width: 100, sort: true, hide: true},
                    {field: 'peopleState', title: '人员状态', width: 500, align: 'center'},
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
            //删除状态
            if (obj.event === 'del') {
                $.ajax({
                    url: userCenterHost + '/usercenter/dict/deleteState/',
                    type: 'post',
                    data: {
                       id : menuId
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
            // 编辑状态
            if (obj.event === 'edit') {
                $("#state_edit").val(obj.data.state);
                layer.open({
                    type: 1
                    , title: '编辑状态'
                    , area: ['50%', '60%']
                    , id: 'layerDemo'//防止重复弹出
                    , content: $('#edit_state')
                    , btn: '提交修改'
                    , btnAlign: 'c' //按钮居中
                    , shade: 0 //不显示遮罩
                    , yes: function () {
                        var editStateList = {
                            state: $("#state_edit").val(),
                            id: obj.data.id,
                        };
                        $.ajax({
                            type: 'POST',
                            url: userCenterHost + '/usercenter/dict/modifyState',
                            async: false,
                            data: editStateList,
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
        }),
        active = {
            addMenu: function () {
                $("#addMenu").slideDown();
            },
            // 增加状态
            add: function () {
                var inputState = {
                    'state': $("#menuName").val(),
                };
                $.ajax({
                    type: 'POST',
                    url: userCenterHost + '/usercenter/dict/addPeopleState',
                    data: inputState,
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
    e("peopleState", {})
})
