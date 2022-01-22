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
    layer.msg('进入物联硬件');

    form.render(null, 'iothardwarebox');
    //获取硬件名称下拉框
    apiCommonSelectBySelect("dictionaryList", "c_agent_type", function (res) {
        apiCommonSelectBySelectCallBackFn(res, "name", "请选择硬件", "没有硬件数据", form);
    });
    //获取服务器下拉框
    apiCommonSelectBySelect("commonServerList", null, function (res) {
        apiCommonSelectBySelectCallBackFn(res, "server", "请选择服务器", "没有服务器数据", form);
    });

    //执行一个表单
    var iothardware = table.render({
        elem: '#iothardware',
        url:  labRoomHost + "/api/labroom/getAgentListByLabRoomId",
        where: {"labRoomId": labRoomId, "username": currentUsername},
        title: '物联硬件',
        toolbar: '#toolbars',
        cellMinWidth: 100,
        page: true, //开启分页
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            curr: 1, //设定初始在第 5 页
            groups: 1, //只显示 1 个连续页码
            first: false, //不显示首页
            last: false //不显示尾页
        },
        parseData: function(res){
          sessionStorage.setItem('yuntai', res.result[0].yuntai);
          sessionStorage.setItem('newServer', res.result[0].newServer);
          sessionStorage.setItem('msg', res.rows.join(','))
            return {
                "code": 0, //解析接口状态
                "msg": res.msg, //解析提示文本
                "count": res.count, //解析数据长度
                "data": res.data //解析数据列表
            };
        },
        cols: [
            [ //表头
                {
                    fixed: 'left',
                    title: '序号',
                    type: 'numbers',
                    width: 40
                },
                {
                    title: '物联类型',
                    templet: function(d){
                        if (d.cdictionary!=null){
                            return d.cdictionary.cname;
                        } else {
                            return '';
                        }
                    },
                    sort: true
                },{
                    field: 'hardwareName',
                    title: '物联设备名称',
                    sort: true
                },
                {
                field: 'hardwareIp',
                title: 'IP',
                sort: true
            }, {
                field: 'manufactor',
                title: '制造商',
                sort: true
            }, {
                field: 'snNo',
                title: 'SN/电表号',
                sort: true
            }, {
                title: '服务器',
                templet: function (d) {
                    return d.commonServer ? d.commonServer.serverName : ""
                }
            }, {
                title: '远程',
                templet: function (d) {
                    let  y = sessionStorage.getItem('yuntai');
                    let  n = sessionStorage.getItem('newServer');
                    let  m = sessionStorage.getItem('msg');
                    console.log(m)
                    if (d.cdictionary != null){
                        if ((d.cdictionary.cnumber == 2) && (n != "false") && (n == 'newest' || n == 'version3')){
                            return `<span onclick="openDoorNew(${d.id},${d.doorIndex})">开门</span>|<span onclick="checkDoorStatus(${d.id},${d.doorIndex})">门锁状态</span>`;
                        } else if ((d.cdictionary.cnumber == 2) && (n != "false")){
                            return `<span onclick="openDoorNew(${d.id})">开门</span>`;
                        }else if ((d.cdictionary.cnumber == 2) && (n == "false")){
                            return `<span onclick="opendoor(${d.id})">开门</span>`;
                        } else if (d.cdictionary.cnumber == 6){
                            return `<span onclick="opendoor_scr(${d.id})">开门</span>`;
                        } else if ((d.cdictionary.cnumber == 3) && (m.indexOf("SUPERADMIN") !== -1  || m.indexOf("LABMANAGER") !== -1 || m.indexOf("PREEXTEACHING") !== -1 || m.indexOf("EXCENTERDIRECTO") !== -1) && y === 'true'){
                            return `<span onclick="openVideo1(${labRoomId}, ${d.id})">开视频</span>|<span onclick="openVideoSet(${labRoomId}, ${d.id})">调视频</span>`;
                        } else if (d.cdictionary.cnumber == 3){
                            return `<span onclick="openVideo1(${labRoomId}, ${d.id})">开视频</span>`;
                        } else if ((d.cdictionary.cnumber == 4) && (n != "false")){
                            return `<span onclick="openAgentNew(1, ${d.id})">开电源</span>|<span onclick="openAgentNew(0, ${d.id})">关电源</span>`;
                        } else if ((d.cdictionary.cnumber == 4) && (m.indexOf("CABINETADMIN") !== -1) && (n == "false")){
                            return `<span onclick="openAgent(1, ${d.id})">开电源</span>|<span onclick="openAgentNew(0, ${d.id})">关电源</span>`;
                        } else if (d.cdictionary.cnumber == 7){
                            return `<sapn onclick="view_ctrl(${labRoomId}, '${d.hardwareIp}')">查看</span>`;
                        } else if ((d.cdictionary.cnumber == 10) && (n == 'newset' || n == 'version3')){
                            return `<sapn onclick="openBoxNew(${d.id})">开门</span>`;
                        } else if ((d.cdictionary.cnumber == 11) && (n == 'newset' || n == 'version3')){
                            return `<sapn onclick="PowerBoxNew(1, ${d.id})">开电源</span>|<sapn onclick="PowerBoxNew(0, ${d.id})">关电源</span>`;
                        } else {
                            return `<span>未定义</span>`;
                        }
                    } else {
                        return '';
                    }
                }
            }, {
                fixed: 'right',
                title: '操作',
                toolbar: '#toolbar',
                width: 150
            }
            ]
        ],
        id: 'iothardware',
        data: table,
        skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20],
        limit: 5,//每页默认显示的数量
    });

    //监听行工具事件
    table.on('tool(iothardware)', function (obj) {
        var data = obj.data;
        if (obj.event == 'edit'){
            var index = layer.open({
                type: 1 //此处以iframe举例
                ,
                title: '修改硬件信息',
                area: ['600px', '600px'],
                shade: 0.5,
                maxmin: true,
                content: $('#editIOtardware'),
                zIndex: layer.zIndex //重点1
                ,
                success: function(layero) {
                    // layer.setTop(layero); //重点2
                    // let body = layer.POSTChildFrame('body', index);
                    // $('#type').val(data.hardwareName);
                    // $('#name').find('option').eq(0).val(data.cdictionary.id).text(data.cdictionary.cname);
                    // $('#ip').val(data.hardwareIp);
                    // $('#manufacturer').find('option').eq(0).val(data.manufactor).text(data.manufactor);
                    // $('#specification').val(data.hareWareModule);
                    // $('#code').val(data.doorIndex);
                    // $('#version').val(data.hardWareVersion);
                    // $('#sn').val(data.snNo);
                    // $('#server').find('option').eq(0).val(data.commonServer.id).text(data.commonServer.serverName);
                    // $("input[name=attendance]").val(data.version);
                    // $('#name').find('option').each(function () {
                    //     if ($(this).val() == data.cdictionary.id){
                    //             console.log($(this).attr('value'));
                    //     }
                    // })
                    form.val('editiothardwarebox',{
                        'type':data.hardwareName,
                        'ip':data.hardwareIp,
                        'manufacturer':$('#manufacturer').find('option').eq(0).val(data.manufactor).text(data.manufactor),
                        'specification':data.hareWareModule,
                        'code':data.doorIndex,
                        'version':data.hardWareVersion,
                        'sn':data.snNo,
                        'server':data.commonServer.id,
                        'name':data.cdictionary.id,
                        'attendance':data.version
                    })
                    form.render(null, 'editiothardwarebox');
                },
                btn: ['确定', '取消'],
                yes: function(index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    let labAgentObj = {
                        id: data.id,
                        hardwareIp: $('#ip').val(),
                        manufactor: $('#manufacturer').val(),
                        hareWareModule: $('#specification').val(),
                        doorIndex: $('#code').val(),
                        hardWareVersion: $('#version').val(),
                        snNo: $('#sn').val(),
                        commonServer: {id: $('#server').val()},
                        cdictionary: {id: $('#name').val()},
                        hardwareName: $('#type').val(),
                        version: $("input[name='attendance']:checked").val()
                    };
                    $.ajax({
                        url: labRoomHost + "/api/labroom/saveLabRoomAgent?roomId=" + labRoomId,
                        type: "POST",
                        data: JSON.stringify(labAgentObj),
                        dataType: "JSON",
                        contentType: "application/json",
                        success: function (res) {
                            if (res.msg == "success") {
                                layui.table.reload('iothardware'); //重载表格
                                layer.close(index); //再执行关闭
                            } else {
                                layer.msg("添加失败", {icon: 2})
                            }
                        }
                    })
                },
            })
        }

        //删除
        if (obj.event === 'del') {
            layer.confirm('是否删除？', {
                title: '提示'
            }, function (index) {
                $.ajax({
                    url: labRoomHost + "/api/labroom/deleteLabRoomAgent", //数据接口
                    data: {aId: data.id, labRoomId: labRoomId},
                    dataType: "JSON",
                    success: function (res) {
                        if (res.msg == "success") {
                            layer.msg("删除成功", {icon: 1})
                            table.reload('iothardware');
                        } else {
                            layer.msg("删除失败", {icon: 2})
                        }
                    }, error: function (e) {

                    }
                })
                layer.close(index);
            });
        }
    });

    //打开添加物联硬件
    var addiothardware = {
        addiothardware: function () {
            //layer.msg('添加物联硬件');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '添加物联硬件',
                area: ['550px', '440px'],
                shade: 0.5,
                maxmin: true,
                content: 'addIOThardware?labRoomId=' + labRoomId,
                zIndex: layer.zIndex //重点1
                ,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['添加', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#addiothardwarebtn");
                    submit.click();
                }
            });
            //layer.full(index);
        }
    };
    $('.addiothardware').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        addiothardware[method] ? addiothardware[method].call(this, othis) : '';
    });

    var $ = layui.$,
        active = {
            reload: function () {
                var searchbox = $('#searchbox');

                //执行重载
                table.reload('iothardware', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        name: searchbox.val()
                    }
                }, 'data');
                authSet();
            }
        };
    $('.search_line .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    window.openDoorNew = function (id, floorIndex) {
        $.ajax({
            url: labRoomHost + '/api/labroom/openDoorNew',
            type: 'POST',
            data: {"agentId": id, "doorIndex": floorIndex, "username": currentUsername},
            success: function (res) {
                layer.msg(decodeURI(res.data))
            }
        })
    };
    window.checkDoorStatus = function (id, floorIndex) {
        $.ajax({
            url: labRoomHost + '/api/labroom/doorStatus',
            type: 'POST',
            data: {"agentId": id, "doorIndex": floorIndex, "username": currentUsername},
            success: function (res) {
                layer.msg(decodeURI(res.data))
            }
        })
    }

    //门禁
    window.opendoor = function (id) {
        $.ajax({
            url: '/limsproduct/labRoom/openDoorPython',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            data: {"agentId": id},
            success: function (data) {
                if(data=="success"){
                    layer.msg("开门成功！");
                } else{
                    layer.msg("开门失败，请检查当前网络连接或者再试一次。");
                }
            },
            error: function () {
                layer.msg('失败');
            }
        })
    }
    //班牌开门
    window.opendoor_scr = function (id) {
        $.ajax({
            url: '/limsproduct/labRoom/appointment/openScrPython',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            data: {"agentId": id},
            success: function (data) {
                if(data.result){
                    layer.msg("开门成功");
                }else{
                    layer.msg("开门失败");
                }
            },
            error: function () {
                layer.msg('失败');
            }
        })
    };
    //打开视频
    window.openVideo1 = function (roomId, id) {
        // window.open(labRoomHost + '/limsproduct/labRoom/appointment/openVideo?agentId=' + id)
        var index = layer.open({
            type: 2 //此处以iframe举例
            ,
            title: '添加物联硬件',
            area: ['550px', '440px'],
            shade: 0.5,
            maxmin: true,
            content: 'videoPlayback?agentId=' + id,
            zIndex: layer.zIndex //重点1
            ,
            success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(index);
    }
    //打开调视频
    window.openVideoSet = function (roomId, id) {
        window.open( '/limsproduct/labRoom/appointment/openVideoSet?agentId=' + id)
    }
    //新版物联-开关电源
    window.openAgentNew = function (flag, id) {
        $.ajax({
            url: labRoomHost + '/api/labroom/openAgentNew',
            type: 'GET',
            data: {"flag": flag, "agentId": id, "username": currentUsername},
            success: function (res) {
                console.log(decodeURI(res))
                if (decodeURI(res) === 'success' && flag === 1) {
                    layer.msg('已开电源')
                } else if (decodeURI(res) === 'success' && flag === 0) {
                    layer.msg('已关电源')
                }
            }
        })
    };

    // window.openAgent = function (flag, uId) {
    //     var myData={
    //         "flag":flag,
    //         "insUid":uId
    //     }
    //     $.ajax({
    //         url: labRoomHost + '/limsproduct/labRoom/openAgent',
    //         type: 'POST',
    //         contentType: 'application/x-www-form-urlencoded;charset=utf-8',
    //         data: {"flag": flag, "agentId": uId},
    //         success: function (data) {
    //             var success="true";
    //             if (flag == 1){
    //                 alert("电源已打开");
    //             }
    //             if (flag == 0){
    //                 alert("电源已关闭");
    //             }
    //             if (flag == 3){
    //                 alert("已下发预约数据");
    //             }
    //             if (flag == 4){
    //                 alert("已回推记录");
    //             }
    //             if (flag == 5){
    //                 alert("门禁已打开");
    //             }
    //         },
    //         error: function () {
    //             layer.msg('失败');
    //         }
    //     })
    // };

    // 查看
    window.view_ctrl = function (roomId, Ip) {
        window.open( '/limsproduct/labRoom/viewProjectors/' + roomId + '/' + Ip)
    }

    //智能开关盒子开门
    window.openBoxNew = function (id) {
        $.ajax({
            url: '/limsproduct/labRoom/openBoxNew',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            data: {"agentId": id},
            success: function (data) {
                if (data=="success"){
                    layer.msg("已开门");
                }else if(data=="noAuth"){
                    layer.msg("抱歉，您无权操作!");
                }else{
                    layer.msg("开门失败，请检查当前网络连接或者再试一次。");
                }
            },
            error: function () {
                layer.msg('失败');
            }
        })
    };
    window.PowerBoxNew = function (flag, id) {
        $.ajax({
            url: '/limsproduct/labRoom/openPowerBoxNew',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            data: {"agentId": id},
            success: function (data) {
                if (data=="success"){
                    flag == "1"?layer.msg("电源已开"):layer.msg("电源已关");
                }else if(data=="noAuth"){
                    layer.msg("抱歉，您无权操作!");
                }else{
                    layer.msg("电源操作失败，请检查当网络连接或者再试一次。");
                }
            },
            error: function () {
                layer.msg('失败');
            }
        })
    }

    function authSet() {
        if ((currentauth !== 'LABMANAGER' && currentauth !== 'EXCENTERDIRECTOR' && currentauth !== 'ACADEMYLEVELM' && currentauth !== 'SUPERADMIN') || statusCenter === 'center' || cookie.get('allstatus') == 1) {
            $('.addiothardware').remove();
            iothardware.config.cols[0][8].hide = true;
        } else {
            $('.addiothardware').css("display", "inline-block");
            iothardware.config.cols[0][8].hide = false;
        }
    }
    //根据当前权限显示界面
    $(function () {
       authSet();
    })
});
