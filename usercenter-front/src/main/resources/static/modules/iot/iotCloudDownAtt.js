layui.use(['index', 'form', 'laypage', 'laydate', 'layer', 'table', 'element'], function() {
    var $ = layui.$,
        admin = layui.admin,
        element = layui.element,
        layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        laypage = layui.laypage,
        table = layui.table;

    //向世界问个好
    layer.msg('进入云地通信-考勤机');

    form.render(null, 'iotclouddownatt');

    //打开新增考勤机页面
    var newattendance = {
        newattendance: function() {
            //layer.msg('');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '新增考勤机',
                area: ['710px', '515px'],
                shade: 0.3,
                maxmin: true,
                content: 'iotNewAttendance',
                zIndex: layer.zIndex //重点1
                ,
                success: function(layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['保存', '取消'],
                yes: function(index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#newattendancebtn");
                    submit.click();
                }
            });
            //layer.full(index);
        }
    };
    $('.newattendance').on('click', function() {
        var othis = $(this),
            method = othis.data('method');
        newattendance[method] ? newattendance[method].call(this, othis) : '';
    });

    //执行表单
    table.render({
        elem: '#iotclouddownatttab',
        // url: layui.setter.base + "json/iotAttendanceMachine.json", //数据接口
        url: iotHost + "/api/agent/ListIotAttendance", //数据接口
        title: '表单',
        cellMinWidth: 130,
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            curr: 1, //设定初始在第 5 页
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
                    width: 50,
                    align: 'center'
                }, {
                field: 'roomName',
                title: '实验室名称',
                sort: true
            }, {
                field: 'hardwareIp',
                title: 'IP地址',
                sort: true
            }, {
                field: 'hardwareName',
                title: '设备名称',
                sort: true
            }, {
                field: 'serverIp',
                title: '服务器IP',
                sort: true
            }, {
                fixed: 'right',
                title: '操作',
                width: 120,
                align: 'center',
                toolbar: '#operation'
            }, {
                fixed: 'right',
                title: '云地通信',
                width: 300,
                align: 'center',
                toolbar: '#cloud2ground'
            }
            ]
        ],
        request:{
            pageName:"current",
            limitName:"pageSize"
        },
        data: table,
        skin: 'line', //表格风格
        even: true,
        page: true,
        id: 'iotclouddownatttab',
        limits: [5, 7, 10, 20],
        limit: 10 ,//每页默认显示的数量
        parseData:function(res) {
            var currentData = res.data.records;
            for (var i = 0; i < currentData.length; i++) {
                try {
                    var status = OAuth2.isUserEnabled(currentData[i].username);
                    currentData[i].status = status;
                }
                catch (e) {
                    currentData[i].status = false
                }
            }

            return {
                code: res.code,
                count: res.data.total,
                curr: res.data.current,
                data: currentData
            }
        }
    });

    //监听行工具事件
    table.on('tool(iotclouddownatttab)', function(obj) {
        var data = obj.data.hardwareIp;
        //console.log(obj)
        //打开编辑页面
        if(obj.event === 'edit') {
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '编辑考勤机',
                area: ['710px', '508px'],
                shade: 0.5,
                maxmin: true,
                content: 'iotEditAttendance?sn='+obj.data.sn,
                zIndex: layer.zIndex //重点1
                ,
                success: function(layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['保存', '取消'],
                yes: function(index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#editattendancebtn");
                    submit.click();
                }
            });
            //layer.full(index);
        };
        //删除
        if(obj.event === 'del') {
            if(confirm('确认删除吗?')) {
                $.ajax({
                    url:iotHost+'/api/agent/deleteIotAttendance/',
                    type:'post',
                    data:{
                        hardwareIp : data
                    },
                    success:function (res) {
                        if (!res.code) {
                            parent.layer.alert("删除成功!")
                            obj.del();
                            table.reload('iotclouddownatttab');
                        }
                        else
                            parent.layer.alert(res.msg);

                    },
                    error:function () {
                        alert("删除接口请求失败！")
                    }
                })
            }
        }
    });

    //获取实验室下拉框数据
    $.ajax({
        url:iotHost + "/api/agent/listAttRoom",
        dataType:"JSON",
        success:function(res){
            //回调函数
            let str = `<option value="">请选择实验室</option>`
            if (res.data.length === 0) {
                str = `<option value="">暂无实验室数据</option>`
            } else {
                for (let i = 0; i < res.data.length; i++) {
                    str += `<option value="${res.data[i]['room_name']}">${res.data[i]['room_name']}</option>`
                }
            }
            $(`select[name=room_name]`).html("");
            $(`select[name=room_name]`).append(str);
            form.render('select', "iotclouddownatttab");
        },
    })
    //搜索
    var $ = layui.$,
        active = {
            reload: function() {
                var hardwareIp = $('input[name=hardwareIp]').val();
                var roomName = $('select[name=room_name]').val();

                //执行重载
                table.reload('iotclouddownatttab', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        hardwareIp,
                        roomName
                    }
                }, 'data');
            }
        };

    $('.searchbtn').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});