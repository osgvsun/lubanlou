$(document).ready(function () {
    $("#currYear").text(localStorage.getItem("currYear"));
    tableRender();
});

let array = [];
//列表查询方法
function tableRender() {
    let search = $('#search').val();
    layui.use(['table'], function () {
        let table = layui.table;
        table.render({
            elem: '#lay_table_report_exemplar_center',
            method: 'get',
            url: datashareHost + "getReportExemplarCenterList",
            where: {
                limsAuth: $.cookie('currentAuthBydatashare'),
                search: search,
                currYear: localStorage.currYear
            },
            page: true,
            size: 'sm',
            even: true,
            cols: [[
                {type: 'checkbox', fixed: 'left'},
                {title: '序号', type: 'numbers'},
                {field: 'centerName', title: '中心名称',edit: 'text'},
                {field: 'level', title: '级别',edit: 'text'},
                {field: 'createdDate', title: '设立时间',edit: 'text',edit: 'text'},
                {field: 'studentHoursInsideTheSchool', title: '学年内承担校内教学人时数',edit: 'text'},
                {field: 'experimentalCounts', title: '学年内承担校内外实验项目数',edit: 'text',edit: 'text'},
                {field: 'studentHoursOutsideTheSchool', title: '学年内对外开放人时数',edit: 'text',edit: 'text'},
                {field: 'academyNumber', title: '学院编号'}
            ]]
        });
        //监听单元格编辑
        table.on('edit(lay_table_report_exemplar_center)', function (obj) {
            let index = -1;
            let data = obj.data;
            for (let i = 0; i < array.length; i++) {
                if (data.id === array[i].id) {
                    index = i;
                }
            }
            if (index === -1) {
                array.push(data);
            } else {
                array[index] = data;
            }
        });
    });
}

//取消查询
function cancelSearch() {
    $('#search').val("");
    tableRender();
}

//列表查询方法
function reportExportTxt() {
    window.open(datashareHost + "report/exportReportExemplarCenterTxt?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}

function reportExportExcel() {
    window.open(datashareHost + "report/exportReportExemplarCenterExcel?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}


//删除
function delCheckData() {
    let checkStatus = layui.table.checkStatus('lay_table_report_exemplar_center')
    let data = checkStatus.data;
    if (data.length > 0) {
        layui.layer.confirm('确定删除选中的' + data.length + '条数据？', {
            btn: ['确定', '取消']
        }, function () {
            $.ajax({
                url: datashareHost + 'delEC',
                method: 'post',
                data: {
                    ecJson: JSON.stringify(data)
                },
                dataType: 'json',
                success: function (res) {
                    tableRender();
                    layui.layer.alert(res.msg);
                },
                error: function () {
                    layui.layer.msg('出错啦');
                }
            });
        });
    } else {
        layui.layer.msg('未选中任何数据');
    }
}

//修改
function modifyData() {
    if (array.length > 0) {
        $.ajax({
            url: datashareHost + 'updateEC',
            method: 'post',
            data: {
                ecJson: JSON.stringify(array)
            },
            dataType: 'json',
            success: function (res) {
                tableRender();
                layui.layer.alert(res.msg);
            },
            error: function () {
                layui.layer.msg('出错啦');
            }
        });
    } else {
        layui.layer.msg('未检测到数据');
    }
    array = [];
}

//获取实验室数据
function synchronizeLimsForEC() {
    layui.layer.confirm('获取实验室数据会覆盖当前报表，是否确定？', {
        btn: ['确定', '取消']
    },function () {
        $.ajax({
            url: datashareHost + "synchronizeLimsForEC",
            method: "post",
            data: {
                'currYear': localStorage.currYear,
                'limsAuth': $.cookie('currentAuthBydatashare')
            }, success: function (res) {
                layui.layer.alert(res.msg);
                setTimeout(function(){
                    $.ajax({
                        url: datashareHost + "generateECReports",
                        method: "post",
                        data: {'currYear': localStorage.currYear,'limsAuth': $.cookie('currentAuthBydatashare')},
                        dataType: "json",
                        success: function (res) {
                            if (res.code === 0) {
                                tableRender();
                            }
                        },
                        error: function () {
                            layui.layer.msg("出错啦");
                        }
                    });
                },500);
            },
            error: function () {
                layui.layer.msg("出错啦！");
            }
        });
    });
}

layui.use(['upload', 'element'], function () {
    let upload = layui.upload;
    let element = layui.element;
    //执行实例
});
