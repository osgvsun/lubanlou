layui.define(function (e) {
    layui.use(['form', 'layer', 'element', 'table'], function () {
        var $ = layui.$,
            layer = layui.layer,
            form = layui.form,
            admin = layui.admin,
            element = layui.element,
            table = layui.table;
        var serverHostArray = document.location.href.split('/');
        var serverHostFilter = serverHostArray[0] + "//" + serverHostArray[2] + "/" + serverHostArray[3] + "/";
        var tableObj = table.render({
            elem: '#register'
            , url: oauth2Host + '/audit/register/unaudited'
            , method: 'GET'
            , where: {
                userType: 1
            }
            , cols: [//标题栏
                [
                    {title: '序号', type: 'numbers', align: 'center'},
                    {field: 'username', title: '用户名', align: 'center'},
                    {field: 'cname', title: '单位名称', align: 'center'},
                    {field: 'phone', title: '联系方式', align: 'center'},
                    {field: 'fileId', title: '文件id', align: 'center', hide: 'true'},
                    // {field:'enabled',title:'审核状态',align:'center'},
                    {field: 'qqOpenId', title: 'QQ', align: 'center'},

                    {fixed: 'right', title: '操作', align: 'center', toolbar: '#edit', width: 200}
                ]
            ],
            parseData: function (res) {
                for (var i = 0; i < res.length; i++) {
                    if (res[i]['enterpriseName'] != null)
                        res[i].Name = res[i]['enterpriseName']
                    else res[i].Name = res[i]['gsiName']
                }
                return {
                    "code": '0', //解析接口状态
                    "msg": '', //解析提示文本
                    "count": '', //解析数据长度
                    "data": res//解析数据列表
                };
            }
            //,skin: 'line' //表格风格
            , even: true
            , page: false//是否显示分页
            //,limits: [5, 7, 10]
            //,limit: 5 //每页默认显示的数量
        });
        var tableObj_N = table.render({
            elem: '#register_normal',
            url: oauth2Host + '/audit/register/unaudited',
            method: 'GET',
            cols: [//标题栏
                [
                    {title: '序号', type: 'numbers', align: 'center'},
                    {field: 'username', title: '用户名', align: 'center', width: 150},
                    {field: 'cname', title: '姓名', align: 'center', width: 150},
                    {field: 'gender', title: '性别', align: 'center', width: 70},
                    {field: 'phone', title: '手机号', align: 'center', width: 250},
                    {field: 'qqOpenId', title: 'QQ', align: 'center', width: 200},
                    {fixed: 'right', title: '操作1', align: 'center', toolbar: '#edit_N', width: 100}
                ]
            ],
            where: {
                userType: 0
            },
            parseData: function (res) {
                return {
                    "code": '0', //解析接口状态
                    "msg": '', //解析提示文本
                    "count": '', //解析数据长度
                    "data": res//解析数据列表
                };
            }
            , even: true
            , page: false//是否显示分页

        });

        // 事件触发
        element.on('tab(docDemoTabBrief)', function(elem){
            console.log(elem); //得到当前点击的DOM对象
            let index = elem.index;
            if (index == 0) {
                tableObj.reload()
            } else {
                tableObj_N.reload();
            }
            $('#enterprisenameCheck, #usernameCheck').val('')
        });
        table.on('tool(register)', function (obj) {
            $("#userId").val(obj.data.userId);
            $("#fileId").val(obj.data.fileId);
            if (obj.event == "audit") {
                layer.open({
                    type: 1,
                    id: 5,
                    title: '请审核用户' + obj.data.username,
                    content: $('#reason'),
                    area: ['60%', '50%']
                    , btn: ['通过', '不通过']
                    , yes: function (index, layero) {
                        $.ajax({
                            url: oauth2Host + '/audit/register/audit?username=' + obj.data.username + '&' + 'pass=true&comment=' + $('#comment_audit').val(),
                            type: 'POST',
                            data: {
                                roleId: 1,
                                userId: obj.data.userId,
                                state: 1
                            },
                            async: false,
                            success: function (res) {

                                layer.confirm('审核已通过！')

                                tableObj.reload({
                                    where: {}, page: {curr: 1}
                                })
                                layer.close(index);
                            }
                        });
                    }
                    , btn2: function (index, layero) {
                        //按钮【按钮二】的回调
                        if ($('#comment').val() == '') {
                            layer.confirm('请填写审核备注！')
                            return false
                        } else {
                            $.ajax({
                                url: oauth2Host + '/audit/register/audit?username=' + obj.data.username + '&' + 'pass=false&comment=' + $('#comment').val(),
                                type: 'POST',
                                data: {
                                    roleId: 1,
                                    userId: obj.data.userId,
                                    state: 0
                                },
                                async: false,
                                success: function (res) {
                                    layer.confirm('审核已拒绝！')
                                    tableObj.reload({
                                        where: {}, page: {curr: 1}
                                    })
                                    layer.close(index);
                                }
                            });
                            return true
                        }
                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                    , cancel: function (index) {
                        //右上角关闭回调
                        layer.close(index);
                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                });
                // 查看企业详情
                $('#btn_see').click(function () {
                    $.ajax({
                        url: userCenterHost + '/getInfoByUsername',
                        data: {
                            username: obj.data.username
                        },
                        type: 'GET',
                        success: function (res) {
                            if (res.data) {
                                if (res.data[0].gsiData){
                                    layer.open({
                                        type: 2,
                                        id: "weq", //防止重复  必须和企业单位弹出曾相同
                                        title: '事业单位查看',
                                        area: ['600px', '500px'],
                                        content: serverHostFilter + 'manager/EAG_details',
                                        shade: 0.5,
                                        maxmin: true,
                                        zIndex: layer.zIndex //重点1
                                        ,
                                        success: function(layero, index) {
                                            var body=layer.getChildFrame('body',index);//少了这个是不能从父页面向子页面传值的
                                            // layer.setTop(layero); //重点2
                                            body.contents().find('#username').val(obj.data.username);
                                            body.contents().find('#gsiName').val(res.data[0].gsiName);
                                            body.contents().find('#gsiAddress').val(res.data[0].gsiAddress);
                                            body.contents().find('#chargeName').val(res.data[0].chargeName);
                                            body.contents().find('#idNumber').val(res.data[0].idNumber);
                                            body.contents().find('#address').val(res.data[0].address);
                                            body.contents().find('#email').val(res.data[0].email);
                                            body.contents().find('#opPhone').val(res.data[0].opPhone);
                                            body.contents().find('#phone').val(res.data[0].phone);
                                            body.contents().find('.idcard').text('身份证号码：');
                                            body.contents().find('.cname').text('单位名称：');
                                            body.contents().find('.business').text('负责人证件照：');
                                            body.contents().find('.evidentiary').text('事业单位证明材料：');
                                            body.contents().find('.enTypeClass').css('display', 'none');
                                            body.contents().find('.legalIdClass').css('display', 'none');
                                            if (res.data[0].idPhoto){
                                                resourceContainer.getFileById({
                                                    success:function(result){
                                                        body.contents().find('#img_business').attr("src", result.url);
                                                    },
                                                    fail:function(){
                                                        alert('图像获取失败！');

                                                    },
                                                    fileId:res.data[0].idPhoto,
                                                    needToken:true
                                                });
                                                body.contents().find('#img_business').click(function () {
                                                    resourceContainer.downLoadFile({
                                                        fileId:res.data[0].idPhoto,
                                                        fail: function (reason) {
                                                            alert('下载失败:' + reason);
                                                        }
                                                    })
                                                });
                                            }else {
                                                body.contents().find('#img_business').attr("src",'/teacherInformationCenter/images/img_download.png');
                                            }
                                            if (res.data[0].gsiData){
                                                resourceContainer.getFileById({
                                                    success:function(result){
                                                        body.contents().find('#legalRepresentativeAnnex').val(result.fileName);
                                                    },
                                                    fail:function(){

                                                    },
                                                    fileId:res.data[0].gsiData,
                                                    needToken:true
                                                });
                                                body.contents().find('#down').click(function () {
                                                    resourceContainer.downLoadFile({
                                                        fileId:res.data[0].gsiData,
                                                        fail: function (reason) {
                                                            alert('下载失败:' + reason);
                                                        }
                                                    })
                                                });
                                            } else {
                                                body.contents().find('#legalRepresentativeAnnex').val('用户暂未上传材料证明');
                                            }
                                        }
                                    })
                                } else {
                                    layer.open({
                                        type: 2,
                                        id: "weq", //防止重复  必须和事业单位弹出曾相同
                                        title: '企业单位查看',
                                        area: ['600px', '500px'],
                                        content: serverHostFilter + 'manager/EAG_details',
                                        shade: 0.5,
                                        maxmin: true,
                                        zIndex: layer.zIndex //重点1
                                        ,
                                        success: function(layero, index) {
                                            var body=layer.getChildFrame('body',index);//少了这个是不能从父页面向子页面传值的
                                            // layer.setTop(layero); //重点2
                                            body.contents().find('#username').val(obj.data.username);
                                            body.contents().find('#gsiName').val(res.data[0].enterpriseName);
                                            body.contents().find('.cname').text('企业用户：');
                                            body.contents().find('#gsiAddress').val(res.data[0].enAddress);
                                            body.contents().find('#chargeName').val(res.data[0].legalName);
                                            body.contents().find('#idNumber').val(res.data[0].idNumber);
                                            body.contents().find('#enType').val(res.data[0].enType);
                                            body.contents().find('#legalId').val(res.data[0].legalId);
                                            body.contents().find('#address').val(res.data[0].address);
                                            body.contents().find('#email').val(res.data[0].email);
                                            body.contents().find('#opPhone').val(res.data[0].opPhone);
                                            body.contents().find('#phone').val(res.data[0].phone);
                                            body.contents().find('.idcard').text('法人身份证：');
                                            body.contents().find('.business').text('营业执照：');
                                            body.contents().find('.evidentiary').text('法定代表人附件：')
                                            body.contents().find('.enTypeClass').css('display', 'block');
                                            body.contents().find('.legalIdClass').css('display', 'block');
                                            if (res.data[0].businessLicenseAnnex){
                                                resourceContainer.getFileById({
                                                    success:function(result){
                                                        body.contents().find('#img_business').attr("src", result.url);
                                                    },
                                                    fail:function(){
                                                        alert('图像获取失败！');

                                                    },
                                                    fileId:res.data[0].businessLicenseAnnex,
                                                    needToken:true
                                                });
                                                body.contents().find('#img_business').click(function () {
                                                    resourceContainer.downLoadFile({
                                                        fileId:res.data[0].businessLicenseAnnex,
                                                        fail: function (reason) {
                                                            alert('下载失败:' + reason);
                                                        }
                                                    })
                                                });
                                            }else {
                                                body.contents().find('#img_business').attr("src",'/teacherInformationCenter/images/img_download.png');
                                            }
                                            if (res.data[0].legalRepresentativeAnnex){
                                                resourceContainer.getFileById({
                                                    success:function(result){
                                                        body.contents().find('#legalRepresentativeAnnex').val(result.fileName);
                                                    },
                                                    fail:function(){

                                                    },
                                                    fileId:res.data[0].legalRepresentativeAnnex,
                                                    needToken:true
                                                });
                                                body.contents().find('#down').click(function () {
                                                    resourceContainer.downLoadFile({
                                                        fileId:res.data[0].legalRepresentativeAnnex,
                                                        fail: function (reason) {
                                                            alert('下载失败:' + reason);
                                                        }
                                                    })
                                                });
                                            } else {
                                                body.contents().find('#legalRepresentativeAnnex').val('用户暂未上传材料证明');
                                            }
                                        }
                                    })
                                }
                            }


                        }
                    })

                })
            }
        });
        table.on('tool(register_normal)', function (obj) {
            if (obj.event == "audit_N") {
                var index = layer.open({
                    type: 1,
                    id: 4,
                    title: '请审核用户' + obj.data.username,
                    content: $('#reason_audit'),
                    area: ['50%', '50%']
                    , btn: ['通过', '不通过']
                    , yes: function (index, layero) {
                        $.ajax({
                            url: oauth2Host + '/audit/register/audit?username=' + obj.data.username + '&' + 'pass=true&comment=' + $('#comment_audit').val() + "&collegeId=" + $("select[name=college]+div").find(".layui-this").attr("lay-value"),
                            type: 'POST',
                            data: {},
                            async: false,
                            success: function (res) {
                                layer.confirm('审核已通过！')
                                tableObj_N.reload({
                                    where: {}, page: {curr: 1}
                                })
                                layer.close(index);
                            }
                        });
                    }
                    , btn2: function (index, layero) {
                        //按钮【按钮二】的回调
                        if ($('#comment_audit').val() == '') {
                            layer.confirm('请填写审核备注！')
                            return false
                        } else {
                            $.ajax({
                                url: oauth2Host + '/audit/register/audit?username=' + obj.data.username + '&' + 'pass=false&comment=' + $('#comment_audit').val() + "&collegeId=" + $("select[name=college]+div").find(".layui-this").attr("lay-value"),
                                type: 'POST',
                                data: {},
                                async: false,
                                success: function (res) {
                                    layer.confirm('审核已拒绝！')
                                    tableObj_N.reload({
                                        where: {}, page: {curr: 1}
                                    })
                                    layer.close(index);
                                }
                            });
                            return true
                        }
                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                    , cancel: function () {
                        //右上角关闭回调
                        layer.close(index);
                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                });
            }
        });

        form.on("radio(auditState)", function (obj) {
            // 已审核的
            if (obj.value == "audited") {
                table.render({
                    elem: '#register'
                    , url: oauth2Host + '/audit/register/audited'
                    , method: 'GET'
                    , where: {
                        userType: 1
                    }
                    , cols: [//标题栏
                        [
                            {title: '序号', type: 'numbers', align: 'center'},
                            {field: 'username', title: '用户名', align: 'center'},
                            {field: 'cname', title: '单位名称', align: 'center'},
                            {field: 'phone', title: '联系方式', align: 'center'},
                            {field: 'qqOpenId', title: 'QQ', align: 'center'},
                            {field: 'comment', title: '审核备注', align: 'center'},
                        ]
                    ],
                    parseData: function (res) {
                        for (var i = 0; i < res.length; i++) {
                            if (res[i]['enterpriseName'] != null)
                                res[i].Name = res[i]['enterpriseName']
                            else res[i].Name = res[i]['gsiName']
                        }
                        return {
                            "code": '0', //解析接口状态
                            "msg": '', //解析提示文本
                            "count": '', //解析数据长度
                            "data": res//解析数据列表
                        };
                    }
                    //,skin: 'line' //表格风格
                    , even: true
                    , page: false//是否显示分页
                    //,limits: [5, 7, 10]
                    //,limit: 5 //每页默认显示的数量
                });
            } else {
                tableObj.reload()
            }
        })
        form.on("radio(audit_N_State)", function (obj) {
            // 已审核的
            if (obj.value == "audited") {
                table.render({
                    elem: '#register_normal',
                    url: oauth2Host + '/audit/register/audited',
                    method: 'GET',
                    cols: [//标题栏
                        [
                            {title: '序号', type: 'numbers', align: 'center'},
                            {field: 'username', title: '用户名', align: 'center', width: 150},
                            {field: 'cname', title: '姓名', align: 'center', width: 150},
                            {field: 'gender', title: '性别', align: 'center', width: 70},
                            {field: 'phone', title: '手机号', align: 'center', width: 250},
                            {field: 'qqOpenId', title: 'QQ', align: 'center', width: 200},
                            {field: 'comment', title: '审核备注', align: 'center', width: 200},
                        ]
                    ],
                    where: {
                        userType: 0
                    },
                    parseData: function (res) {
                        return {
                            "code": '0', //解析接口状态
                            "msg": '', //解析提示文本
                            "count": '', //解析数据长度
                            "data": res//解析数据列表
                        };
                    }
                    , even: true
                    , page: false//是否显示分页

                });
            } else {
                tableObj_N.reload()
            }
        })

        //审核下拉框
        $.ajax({
            url: userCenterHost + '/dropDownBoxController/getCollege',
            type: 'GET',
            success: function (res) {
                let str = `<option value="">请选择所属学院</option>`;
                for (let i = 0; i < res.data.length; i++) {
                    str += `<option value="${res.data[i]['id']}">${res.data[i]['college']}</option>`
                }
                $("select[name=college]").html(str);
                form.render("select", "reasonForm")
            }
        });

        // 单位用户搜索
        $('.enterprise_sure').on('click', function () {
            let status = $("input[name=auditState]:checked").val();
            // 审核
            var url_audit = '';
            if (status == 'audited') {
                url_audit = '/audit/register/audited'
            } else {
                // 未审核
                url_audit = '/audit/register/unaudited'
            }

            $.ajax({
                url: oauth2Host + url_audit,
                type: 'GET',
                data: {
                    userType: 1,
                    search: $('#enterprisenameCheck').val()
                },
                success: function (res) {
                    setRegister(res, status)
                }
            })
        })
        $('.ordinary_sure').on('click', function () {
            let status = $("input[name=audit_N_State]:checked").val();
            // 审核
            var url_audit = '';
            if (status == 'audited') {
                url_audit = '/audit/register/audited'
            } else {
                // 未审核
                url_audit = '/audit/register/unaudited'
            }

            $.ajax({
                url: oauth2Host + url_audit,
                type: 'GET',
                data: {
                    userType: 0,
                    search: $('#usernameCheck').val()
                },
                success: function (res) {
                    setRegister_normal(res)
                }
            })
        })

        function setRegister(data, stutas) {
            let cols = [//标题栏
                [
                    {title: '序号', type: 'numbers', align: 'center'},
                    {field: 'username', title: '用户名', align: 'center'},
                    {field: 'cname', title: '单位名称', align: 'center'},
                    {field: 'phone', title: '联系方式', align: 'center'},
                    {field: 'qqOpenId', title: 'QQ', align: 'center'},
                    {field: 'comment', title: '审核备注', align: 'center'},
                ]
            ];

            let colss =  [//标题栏
                    [
                        {title: '序号', type: 'numbers', align: 'center'},
                        {field: 'username', title: '用户名', align: 'center'},
                        {field: 'cname', title: '单位名称', align: 'center'},
                        {field: 'phone', title: '联系方式', align: 'center'},
                        {field: 'fileId', title: '文件id', align: 'center', hide: 'true'},
                        // {field:'enabled',title:'审核状态',align:'center'},
                        {field: 'qqOpenId', title: 'QQ', align: 'center'},

                        {fixed: 'right', title: '操作', align: 'center', toolbar: '#edit', width: 200}
                    ]
                ]
            let arr = [];
            if (stutas == 'audited') {
                arr = cols;
            } else {
                arr = colss;
            }
            table.render({
                elem: '#register',
                data: data
                , cols: arr,
                page: false
                , even: true
            })
        }
        function setRegister_normal(data) {
            let status = $("input[name=audit_N_State]:checked").val();
            let cols = [//标题栏
                    [
                        {title: '序号', type: 'numbers', align: 'center'},
                        {field: 'username', title: '用户名', align: 'center', width: 150},
                        {field: 'cname', title: '姓名', align: 'center', width: 150},
                        {field: 'gender', title: '性别', align: 'center', width: 70},
                        {field: 'phone', title: '手机号', align: 'center', width: 250},
                        {field: 'qqOpenId', title: 'QQ', align: 'center', width: 200},
                        {field: 'comment', title: '审核备注', align: 'center', width: 200},
                    ]
                ]
            let colss = [//标题栏
                    [
                        {title: '序号', type: 'numbers', align: 'center'},
                        {field: 'username', title: '用户名', align: 'center', width: 150},
                        {field: 'cname', title: '姓名', align: 'center', width: 150},
                        {field: 'gender', title: '性别', align: 'center', width: 70},
                        {field: 'phone', title: '手机号', align: 'center', width: 250},
                        {field: 'qqOpenId', title: 'QQ', align: 'center', width: 200},
                        {fixed: 'right', title: '操作1', align: 'center', toolbar: '#edit_N', width: 100}
                    ]
                ]
            let arr = [];
            if (status == 'audited') {
                arr = cols;
            } else {
                arr = colss;
            }
            table.render({
                elem: '#register_normal',
                data: data,
                cols: arr,
                page: false
                , even: true
            })
        }

    });
    e("register/EAG_audit", {})
})