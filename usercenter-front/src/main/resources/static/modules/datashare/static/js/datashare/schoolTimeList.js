$(document).ready(function () {
    $("#currYear").text(localStorage.getItem("currYear"));
    tableRender();
});

//列表查询方法
function tableRender() {
    layui.use(['table'], function () {
        let search = $('#search').val();
        let table = layui.table;
        table.render({
            elem: '#lay_table_school_time',
            method: 'get',
            url: datashareHost + "getSchoolTimeList",
            where: {
                search: search
            },
            page: true,
            size: 'sm',
            even: true,
            toolbar: '#schoolTime_toolbar', //开启工具栏
            cols: [[
                {type: 'checkbox', fixed: 'left'},
                {
                    title: '序号',
                    type: 'numbers'
                }, {
                    field: 'section',
                    title: '节次',
                    edit: 'text'
                }, {
                    field: 'sectionName',
                    title: '节次名称',
                    edit: 'text'
                }, {
                    field: 'startDate',
                    title: '每节开始时间',
                    edit: 'text'
                }, {
                    field: 'endDate',
                    title: '每节结束时间',
                    edit: 'text'
                }, {
                    field: 'campusNumber',
                    title: '所属校区编号',
                    edit: 'text'
                }, {
                    field: 'termNumber',
                    title: '学期代码',
                    edit: 'text'
                }, {
                    field: 'yearCode',
                    title: '年份',
                    edit: 'text'
                }
            ]]
        });

        //监听头工具栏事件
        table.on('toolbar(lay_table_school_time)', function (obj) {
            var checkStatus = table.checkStatus(obj.config.id)
                , data = checkStatus.data; //获取选中的数据
            switch (obj.event) {
                case 'update':
                    if (data.length === 0) {
                        layer.msg('请选择一行');
                    } else if (data.length > 1) {
                        layer.msg('只能同时编辑一个');
                    } else {
                        var updateData = data[0];
                        layer.confirm('真的要修改吗', function (index) {
                            $.ajax({
                                url: datashareHost + "shared/updateSchoolTime",
                                type: "post",
                                contentType: "application/json",
                                dataType: "json",
                                data: JSON.stringify(updateData),
                                success: function (res) {
                                    layui.layer.alert(res.msg);
                                    table.reload("lay_table_school_time");
                                },
                                error: function () {
                                    layui.layer.alert("请求超时");
                                }
                            })
                        })
                    }
                    break;
                case 'delete':
                    console.log(data);
                    if (data.length === 0) {
                        layui.layer.alert('请选择一行');
                    } else {
                        layer.confirm('真的要删除吗', function (index) {
                            $.ajax({
                                url: datashareHost + "shared/deleteSchoolTime",
                                type: "post",
                                contentType: "application/json",
                                dataType: "json",
                                data: JSON.stringify(data),
                                success: function (res) {
                                    layui.layer.alert(res.msg);
                                    table.reload("lay_table_school_time");
                                },
                                error: function () {
                                    layui.layer.alert("请求超时");
                                }
                            })
                        })
                    }
                    break;
            }
            ;
        });
    });
}

//取消查询
function cancelSearch() {
    $('#search').val("");
    tableRender();
}

layui.use('upload', function () {
    let upload = layui.upload;
    var layer = layui.layer;
    function loading(msg){
        msgindex = layer.msg(msg, {
            icon:16,
            shade:[0.1, '#fff'],
            time:false,  //不自动关闭
            offsetqiuchuy:"100px"
        })
    }
    //执行实例
    upload.render({
        elem: '#importSchoolTime',
        url: datashareHost + 'shared/uploadSchoolTimeByExcel',
        accept: 'file',
        exts: 'xlsx',
        before: function (res) {
            loading("数据导入中,请耐心等待......");
        },
        done: function (res) {
            if (res.code === 0){
                layer.confirm(res.msg, {
                    btn : [ '确定']//按钮
                }, function() {
                    location.reload();
                })
            }else {
                layui.layer.alert(res.msg);
            }
        },
        error: function () {
            layui.layer.alert("请求超时");
        }
    });
});