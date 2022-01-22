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
            elem: '#lay_table_reportInfo',
            method: 'get',
            url: datashareHost + "getReportInfoList",
            where: {
                search: search,
                lakeNumber:lakeNumber
            },
            page: true,
            size: 'sm',
            even: true,
            toolbar: '#reportInfo_toolbar', //开启工具栏
            parseData: function(res){ //res 即为原始返回的数据
                console.log(res);
                var pdata = {
                    "code": 0, //解析接口状态
                    "msg": "", //解析提示文本
                    "count": res.data.length, //解析数据长度
                    "data": [] //解析数据列表
                };
                $.each(res.data,function(key, value){
                    let recourd = new Object();
                    let title = '';
                    let field = '';
                    recourd['reportNumber'] = value.reportNumber;
                    recourd['reportName'] = value.reportName;
                    recourd['lakeNumber'] = value.lakeNumber;
                    $.each(value.reportTableField,function (key, value) {
                        title =  title + value.title + '&&';
                        field =  field + value.field + '&&';
                    })
                    title = title.substring(0,title.length-2);
                    field = field.substring(0,field.length-2);
                    recourd['title'] = title;
                    recourd['field'] = field;
                    pdata.data.push(recourd);
                })

                return pdata;
            },
            cols: [[
                {type: 'checkbox', fixed: 'left'},
                {
                    title: '序号',
                    type: 'numbers',
                }, {
                    field: 'reportNumber',
                    title: '报表编号'
                }, {
                    field: 'reportName',
                    title: '报表名称',
                    edit: 'text'
                }, {
                    field: 'lakeNumber',
                    title: '所属报表池'
                }, {
                    field: 'title',
                    title: '报表表头',
                    edit: 'text'
                }, {
                    field: 'field',
                    title: '报表字段',
                    edit: 'text'
                }, {
                    align: 'center',
                    toolbar: '#term-option'
                }
            ]],
        });

        table.on('tool(lay_table_reportInfo)', function (obj) {
            let data = obj.data;
            switch (obj.event) {

                //data.lakeNumber;
                //data.lakeType;
                //data.reportNumber;
                case 'luckysheet':
                    window.open('luckySheet?lakeNumber=' + data.lakeNumber + '&reportNumber=' + data.reportNumber, '在线报表')
            }
        });

        //监听头工具栏事件
        table.on('toolbar(lay_table_reportInfo)', function (obj) {
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

                        let reportFiledDTOList = [];
                        let reportTitle = updateData.title.split('&&');
                        let reportField = updateData.field.split('&&');
                        for (var i=0;i<reportTitle.length;i++){
                            let reportFieldDTO = {
                                title: reportTitle[i],
                                field: reportField[i],
                            }
                            reportFiledDTOList.push(reportFieldDTO);
                        }
                        updateData['reportTableField'] = reportFiledDTOList;
                        layer.confirm('真的要修改吗', function (index) {
                            $.ajax({
                                url: datashareHost + "updateReportInfo",
                                type: "post",
                                contentType: "application/json",
                                dataType: "json",
                                data: JSON.stringify(updateData),
                                success: function (res) {
                                    layui.layer.alert(res.msg);
                                    table.reload("lay_table_reportInfo");
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
                                url: datashareHost + "delReportInfo",
                                type: "post",
                                contentType: "application/json",
                                dataType: "json",
                                data: JSON.stringify(data),
                                success: function (res) {
                                    layui.layer.alert(res.msg);
                                    table.reload("lay_table_reportInfo");
                                },
                                error: function () {
                                    layui.layer.alert("请求超时");
                                }
                            })
                        })
                    }
                    break;
                case 'insert':
                    layer.open({
                        type: 2,
                        title: "新增报表信息",
                        area: ['100%', '100%'],
                        content: 'newReportInfo?lakeNumber='+lakeNumber
                    });
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
        elem: '#importSchoolTerm',
        url: datashareHost + 'shared/uploadSchoolTermByExcel',
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