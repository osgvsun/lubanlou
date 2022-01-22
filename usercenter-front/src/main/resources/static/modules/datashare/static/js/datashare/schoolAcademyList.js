$(document).ready(function () {
    $("#currYear").text(localStorage.getItem("currYear"));
    tableRender();
});

//列表查询方法
function tableRender() {
    let search = $('#search').val();
    layui.use(['table'], function () {
        let table = layui.table;
        table.render({
            elem: '#lay_table_academy',
            method: 'get',
            url: datashareHost + "getSchoolAcademyList",
            where: {
                search: search
            },
            page: true,
            size: 'sm',
            even: true,
            toolbar: '#schoolAcademy_toolbar', //开启工具栏
            cols: [[
                {type: 'checkbox', fixed: 'left'},
                {
                    title: '序号',
                    type: 'numbers',
                }, {
                    field: 'academyNumber',
                    title: '学院/部门代码',
                }, {
                    field: 'academyName',
                    title: '学院/部门名称',
                    edit: 'text'
                }, {
                    field: 'academyType',
                    title: '学院/部门类别',
                }, {
                    field: 'isVaild',
                    title: '是否正在使用（1为正在使用，0为已停用）',
                    edit: 'text'
                }
            ]]
        })

        //监听头工具栏事件
        table.on('toolbar(lay_table_academy)', function (obj) {
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
                                url: datashareHost + "shared/updateAcademy",
                                type: "post",
                                contentType: "application/json",
                                dataType: "json",
                                data: JSON.stringify(updateData),
                                success: function (res) {
                                    layui.layer.alert(res.msg);
                                    table.reload("lay_table_academy");
                                },
                                error: function () {
                                    layui.layer.alert("请求超时");
                                }
                            })
                        })
                    }
                    break;
                case 'delete':
                    if (data.length === 0) {
                        layui.layer.alert('请选择一行');
                    } else {
                        layer.confirm('真的要删除吗', function (index) {
                            $.ajax({
                                url: datashareHost + "shared/deleteAcademy",
                                type: "post",
                                contentType: "application/json",
                                dataType: "json",
                                data: JSON.stringify(data),
                                success: function (res) {
                                    layui.layer.alert(res.msg);
                                    table.reload("lay_table_academy");
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

    upload.render({
        elem: '#importSchoolAcademy',
        url: datashareHost + 'shared/uploadAcademyByExcel',
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
            layui.layer.msg("访问超时");
        }
    });
});

