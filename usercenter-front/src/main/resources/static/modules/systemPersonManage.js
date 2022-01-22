/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */
;
layui.define(function (e) {
    layui.use(["table", 'laydate', 'form', 'upload', 'tree'], function () {
        var e = (layui.$, layui.table);
        var $ = layui.jquery,
            admin = layui.admin
        form = layui.form,
            tree = layui.tree,
            upload = layui.upload,
            layer = layui.layer,
            laydate = layui.laydate; //Tab的切换功能，切换事件监听等，需要依赖element模块
        var role_name = GetQueryString("currentShowRole");
        //获取人员状态下拉框信息
        $.ajax({
            url: userCenterHost + '/dropDownBoxController/getPersonState',
            type: 'GET',
            async: false,
            success: function (res) {
                if (!res.code) {
                    var data = res.data;
                    for (var i = 0; i < data.length; i++) {
                        var option = '<option value="' + data[i].peopleState + '">' + data[i].peopleState + '</option>';
                        $("#peopleState").append(option);
                        $("#states").append(option)
                    }
                    $("#peopleState").append('<option value="全部">全部</option>');
                } else {
                    alert(res.msg);
                }
            }
        });
        $('#importUser').click(function () {
            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                shadeClose: true,
                skin: 'yourclass'
                , area: ['500px', '400px']
                , content: $("#importStu")
                , btn: ['确认', '取消']
                , btnAlign: 'c' //按钮居中
                , shade: 0.3 //不显示遮罩
                , yes: function () {
                    var submit = $('#upload');
                    submit.click();
                }, btn2: function (){
                    layer.closeAll();
                }
            });
        });
        $('#details').click(function () {
            layer.open({
                type: 1,
                title: "学院编号样例",
                closeBtn: 0,
                shadeClose: true,
                skin: 'yourclass'
                , area: ['500px', '400px']
                , content: $("#schoolNumber")
                , btn: '取消'
                , btnAlign: 'c' //按钮居中
                , shade: 0.3 //不显示遮罩
                , yes: function () {
                    layer.closeAll();
                }
            });
        });
        //导入用户
        form.on('submit(upload)', function (data) {
            //加载中样式...
            var loading = layer.msg('提交中', {icon: 16, shade: 0.3, time: 0});
            var formData = new FormData();
            var fileUpload = $("#file")[0].files[0];
            var siteName = data.field.siteName;
            var college = data.field.college;
            formData.append("file", fileUpload);
            formData.append("collegeId", college); // 存储collegeId
            formData.append("siteId", siteName);
            $.ajax({
                url: userCenterHost + '/importUserNew',
                data: formData,
                type: 'post',
                contentType: false,//必须false才会自动加上正确的Content-Type
                processData: false,//必须false才会避开jQuery对 formdata 的默认处理，XMLHttpRequest会对 formdata 进行正确的处理
                success: function (res) {
                    layer.close(loading);
                    if (!res.code) {
                        alert("导入成功！");
                        layer.closeAll();
                        e.reload('personManage');
                    } else {
                        alert(res.msg);
                    }
                },
                error: function () {
                    setTimeout(() => {
                        layer.close(loading);
                    }, 1000)
                    alert("导入失败")
                },
                fail: function () {
                    alert("导入接口请求错误！")

                }
            });
        })
        //导出模板
        $("#downloadButton").click(function () {
            window.location.href = userCenterHost + '/reportExport/exportUserTemplate';
        });

        e.render({
            elem: "#personManage"
            , url: userCenterHost + '/statisticAllTeacherBasicInfo'
            , where: {'role': role_name},
            method: 'GET'
            , title: '人员管理',
            cellMinWidth: 100
            , toolbar: '#toolbarDemo', //开启头部工具栏，并为其绑定左侧模板
            defaultToolbar: [{ //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                title: '更改用户状态'
                , layEvent: 'LAYTABLE_TIPS'
                , icon: 'layui-icon-tips'
            }],
            cols: [
                [{type: 'checkbox', fixed: 'left'},
                    {title: '序号', width: 100, type: "numbers"},
                    {field: 'employeeNo', title: '工号', width: 100, sort: true},
                    {field: 'cname', title: '姓名', align: 'center'}
                    , {field: 'college', title: '所属学院', align: 'center', width: 180}
                    , {field: 'school', title: '所属学校', align: 'center'}
                    , {field: 'state', title: '人员状态', align: 'center', event: 'modifyStatus'}
                    , {
                    field: 'roleList', title: '用户角色', align: 'center', templet: function (d) {
                        for (var i = 0; i < d.roleList.length; i++) {
                            if ((d.roleList.length != 0) && (d.roleList[i].roleName == role_name)) {
                                return d.roleList[i].roleCname;
                            }
                        }
                    }
                }
                    , {
                    fixed: 'right',
                    title: '操作',
                    align: 'center',
                    toolbar: '#passWord',
                    width: 350,
                    templet: function (d) {
                        try {
                            var status = OAuth2.isUserEnabled(d.username);
                            d.status = status;
                        } catch (e) {
                            d.status = 'false'
                        }
                    }
                }
                ]
            ],
            page: true,
            skin: "line",
            limits: [10, 20, 30, 40, 50, 60, 70, 80, 90, 200],
            parseData: function (res) {
                var currentData = res.data;
                for (var i = 0; i < currentData.length; i++) {
                    try {
                        var status = OAuth2.isUserEnabled(currentData[i].username);
                        currentData[i].status = status;
                    } catch (e) {
                        currentData[i].status = false
                    }
                }

                return {
                    code: res.code,
                    count: res.count,
                    data: currentData
                }
            }
        });

        //头工具栏事件
        e.on('toolbar(personManage)', function (obj) {
            var checkStatus = e.checkStatus(obj.config.id);
            let data = checkStatus.data;
            if (obj.event == 'LAYTABLE_TIPS') {
                layer.open({
                    type: 1,
                    title: false,
                    closeBtn: 0,
                    shadeClose: true,
                    skin: 'yourclass'
                    , content: $("#cc")
                    , btn: ['确认', '取消']
                    , btnAlign: 'c' //按钮居中
                    , shade: 0.3 //不显示遮罩
                    , yes: function (index) {
                        let states = $('#states').val();
                        let usernames = [];
                        data.forEach(function (n, i) {
                            usernames.push(n.username);
                        })
                        if (data.length <= 0) {
                            layer.msg('请选择一条数据');
                        } else {
                            layer.confirm('确认更改选中用户状态？', {icon: 3, title: '提示信息'}, function (index) {
                                $.ajax({
                                    url: userCenterHost + '/usercenter/batchModifyUserState',
                                    type: 'POST',
                                    headers: {"x-datasource": "limsproduct"},
                                    data: {
                                        "usernames": usernames.toString(),
                                        "state": states
                                    },
                                    success: function (data) {
                                        layer.msg("修改成功");
                                        layer.closeAll();
                                        layui.table.reload('personManage');
                                    },
                                    fail: function () {
                                        layer.msg("修改失败");
                                    }
                                })
                            })
                        }
                    }, btn2: function () {
                        layer.closeAll();
                    }
                });
            }
        });
        //操作时间插件
        laydate.render({
            elem: '#operationTime'
            , type: 'datetime'
        });
        var $ = layui.$,
            active = {
                reload: function () {
                    /*url: layui.setter.base + "json/management/educateInfo.js",*/
                    var employeeNo = $("#employeeNo").val();
                    var cname = $("#cname").val();
                    var state = $("#peopleState").val();
                    //执行重载
                    e.reload('personManage', {
                        page: {
                            curr: 1 //重新从第 1 页开始
                        },
                        where: {
                            employeeNo: employeeNo,
                            cname: cname,
                            state: state
                        }
                    })
                },
            };
        //监听表格操作
        var time = 0;
        e.on('tool(personManage)', function (obj) {
            var data = obj.data;
            if (obj.event === 'editPassWord') {
                layer.alert('确认重置密码吗', {
                    closeBtn: 1    // 是否显示关闭按钮
                    , btn: ['确定', '取消'] //按钮
                    , yes: function (index) {
                        $.ajax({
                            url: userCenterHost + '/resetPassword',//实际使用请改成服务端真实接口
                            data: {
                                username: data.username
                            },
                            // dataType: 'text',
                            type: 'POST'
                            , success: function (res) {
                                if (!res.code) {
                                    parent.layer.alert("重置成功!");
                                    e.reload('academicInfo');
                                } else
                                    parent.layer.alert("重置失败！")
                            }
                        })
                        layer.close(index);
                    }
                })
                return false;
            } else if (obj.event === 'editUserName') {//修改用户名
                layer.prompt({
                    title: "修改用户名"
                }, function (value, index) {
                    if (!checkUserName(value, data.username)) {//
                        return;
                    }
                    var outindex = index;
                    layer.confirm('确定修改工号为' + value + "吗？", function (index) {//yes
                        layer.closeAll();
                        var loadindex = layer.load(1);
                        $.ajax({
                            url: userCenterHost + '/modifyUsername',//实际使用请改成服务端真实接口
                            data: {
                                oldUserName: oldUserName,
                                newUserName: newUserName
                            },
                            dataType: 'text',
                            type: 'POST'
                            , success: function (res) {
                                layer.close(loadindex);
                                if (res === 'success') {
                                    layer.msg("修改成功!");
                                    e.reload();//重新渲染表格
                                } else {
                                    layer.alert(res);
                                }
                            }
                        })
                    });
                });
            } else if (obj.event === "editUserRoles") {
                $.ajax({
                    url: userCenterHost + '/authority/getAuthorityTree',
                    dataType: "json",
                    data: {
                        username: data.username
                    },
                    success: function (jsonData) {
                        var elementId = "#edit_userRoles";
                        var treeId = "userRolesRenderId";
                        tree.render({
                            elem: elementId,
                            id: treeId,
                            accordion: true,
                            showLine: false,
                            showCheckbox: true,
                            data: jsonData
                        });
                        var oldTreesDataStr = JSON.stringify(tree.getChecked(treeId));
                        layer.open({
                            type: 1,
                            title: "修改权限",
                            content: $(elementId),
                            area: ['500px', '300px'],
                            btn: ['确认', '取消'],
                            yes: function (index) {//step3,点击提交后判断权限数据是否被修改过，若修改过则将treeDatas转为rolesData向后端发起权限修改请求
                                var newTreesData = tree.getChecked(treeId);
                                if (oldTreesDataStr === JSON.stringify(newTreesData)) {
                                    layer.msg("权限未修改");
                                    layer.close(index);
                                    return;
                                }
                                var newRolesDataWithUserName = {};//用户username及用户被修改后的权限信息
                                var roleIdList = new Array();
                                for (var i = 0; i < newTreesData.length; i++) {
                                    var chooseRoleId = newTreesData[i].children
                                    for (var j = 0; j < chooseRoleId.length; j++) {
                                        roleIdList.push(chooseRoleId[j].id);
                                    }
                                }
                                newRolesDataWithUserName.ids = roleIdList.join(',');
                                newRolesDataWithUserName.username = data.username;
                                $.ajax({
                                    url: userCenterHost + '/authority/editAuthorityTree',
                                    data: newRolesDataWithUserName,
                                    type: 'post',
                                    // contentType: "json;charset=UTF-8",
                                    success: function (res) {
                                        parent.layer.msg("修改成功！");
                                        layer.closeAll();
                                    }
                                })
                            }
                        });

                    }
                });
            } else if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    /*obj.del();*/
                    $.ajax({
                        url: userCenterHost + '/deleteUser',
                        data: {
                            username: data.username
                        },
                        type: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!")
                                e.reload('personManage');
                            } else {
                                parent.layer.alert("删除失败！")
                            }
                        }
                    })
                    layer.close(index);
                });
            } else if (obj.event === 'outload') {
                outload(data.username);
            } else if (obj.event === 'modifyStatus') {
                layer.open({
                    type: 1
                    , title: '修改 姓名为 [' + data.cname + '] 的状态'
                    , content: ' <div class="layui-col-lg4">' +
                        '                <label class="layui-form-label">人员状态:<span>' + data.state + '</span>' +
                        '                 </label>' +
                        '                <div class="layui-input-block">' +
                        '                    <select id="editstate" class="layui-form-label" lay-search>' +
                        '                    </select>' +
                        '                </div>' +
                        '            </div>'
                    , id: '1' //防止重复弹出
                    , btn: '确认'
                    , btnAlign: 'c' //按钮居中
                    , shade: 0 //不显示遮罩
                    , yes: function () {
                        layer.closeAll();
                        var newState = $("#editstate").val();
                        admin.req({
                            url: userCenterHost + '/modifyUserState',
                            data: {
                                username: data.username,
                                state: newState
                            },
                            dataType: 'json',
                            method: 'POST',
                            success: function (res) {
                                if (!res.code) {
                                    parent.layer.alert("修改成功!");
                                    location.reload();
                                } else {
                                    parent.layer.alert("修改失败！")
                                }
                            },
                            fail: function () {
                                parent.layer.alert("接口访问出错！")
                            }
                        });
                    },
                });
                $.ajax({
                    url: userCenterHost + '/dropDownBoxController/getPersonState',
                    type: 'GET',
                    async: false,
                    success: function (res) {
                        if (!res.code) {
                            var data1 = res.data;
                            $("#editstate").append('<option value="请选择">请选择</option>');
                            for (var i = 0; i < data1.length; i++) {
                                var option = '<option id="' + data1[i].id + '" value="' + data1[i].peopleState + '">' + data1[i].peopleState + '</option>';
                                $("#editstate").append(option);
                            }
                            form.render();
                        } else {
                            alert(res.msg);
                        }
                    }
                });
            } else if (obj.event === 'forbiddenUser') {
                layer.confirm('禁用后用户将无法登录系统，确定禁用吗？', function (index) {
                    admin.req({
                        url: userCenterHost + '/forbiddenUser',
                        data: {
                            username: data.username,
                        },
                        dataType: 'json',
                        method: 'POST',
                        success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("操作成功!");
                                location.reload();
                            } else {
                                parent.layer.alert("操作失败！")
                            }
                        },
                        fail: function () {
                            parent.layer.alert("接口访问出错！")
                        }
                    });
                    layer.close(index);
                })
            } else if (obj.event === 'permitUser') {
                layer.confirm('确定启用吗？', function (index) {
                    $.ajax({
                        url: oauth2Host + '/security/forbidden/' + data.username + '?enabled=true',
                        type: "post",
                        success: function () {
                            parent.layer.alert("请求成功!");
                            location.reload();
                        }, fail: function () {
                            alert("接口请求错误！")
                        }
                    })
                    layer.close(index);
                })
            }

        });
        //监听密码修改提交
        form.on('submit(editPassword)', function (data) {
            layer.alert('确认修改吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    admin.req({
                        url: userCenterHost + '/resetPassword',//实际使用请改成服务端真实接口
                        data: data.field,
                        dataType: 'text',
                        method: 'POST'
                        , success: function (res) {
                            if (res === 'success') {
                                parent.layer.alert("修改成功!");
                                e.reload('academicInfo');
                            } else
                                parent.layer.alert("修改失败！")
                        }
                    })
                }
            })
            return false;
        });

        //下拉框显示
        //学院下拉框
        $.ajax({
            url: userCenterHost + '/dropDownBoxController/getCollege',
            type: 'GET',
            success: function (res) {
                if (!res.code) {
                    var data = res.data;
                    for (var i = 0; i < data.length; i++) {
                        var option = '<option value="' + data[i].id + '">' + data[i].college + '</option>';
                        $("#college").append(option);

                        let str = `<tr><td>${data[i].college}</td><td>${data[i].id}</td></tr>`;
                        $('.schoolNumber').append(str);
                    }
                    form.render();
                } else {
                    alert(res.msg);
                }
            }
        });
        //站点下拉框
        $.ajax({
            url: userCenterHost + '/dropDownBoxController/getSite',
            type: 'GET',
            success: function (res) {
                if (!res.code) {
                    var data = res.data;
                    for (var i = 0; i < data.length; i++) {
                        var option = '<option value="' + data[i].id + '">' + data[i].site + '</option>';
                        $("#siteName").append(option);
                    }
                    form.render();
                } else {
                    alert(res.msg);
                }
            }
        });

        $('.personManageInput .layui-btn').on('click', function () {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

    }), e("systemPersonManage", {})
});

//导出个人基本情况
function outload(objectUsername) {
    window.location.href = userCenterHost + '/reportExport/comprehensiveSituation?username=' + objectUsername;
}

