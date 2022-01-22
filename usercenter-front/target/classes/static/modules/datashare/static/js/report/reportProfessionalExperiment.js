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
            elem: '#lay_table_report_professional_experiment',
            method: 'get',
            url: datashareHost + "getReportProfessionalExperimentList",
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
                {field: 'majorCode', title: '校内专业（大类）代码',edit: 'text'},
                {field: 'majorName', title: '校内专业（大类）名称',edit: 'text'},
                {field: 'courseNumber', title: '课程号',edit: 'text'},
                {field: 'courseName', title: '课程名称',edit: 'text'},
                {field: 'laboratoryName', title: '所用实验场所名称',edit: 'text'},
                {field: 'laboratoryNumber', title: '实验场所代码',edit: 'text'},
                {field: 'academyNumber', title: '学院编号'}
            ]]
        });
        //监听单元格编辑
        table.on('edit(lay_table_report_professional_experiment)', function (obj) {
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

//导出
function reportExportTxt() {
    window.open(datashareHost + "report/exportReportProfessionalExperimentTxt?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}

function reportExportExcel() {
    window.open(datashareHost + "report/exportReportProfessionalExperimentExcel?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}

//删除
function delCheckData() {
    let checkStatus = layui.table.checkStatus('lay_table_report_professional_experiment')
    let data = checkStatus.data;
    if (data.length > 0) {
        layui.layer.confirm('确定删除选中的' + data.length + '条数据？', {
            btn: ['确定', '取消']
        }, function () {
            $.ajax({
                url: datashareHost + 'delPE',
                method: 'post',
                data: {
                    peJson: JSON.stringify(data)
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
            url: datashareHost + 'updatePE',
            method: 'post',
            data: {
                peJson: JSON.stringify(array)
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
function synchronizeLimsForPE() {
    layui.layer.confirm('获取实验室数据会覆盖当前报表，是否确定？', {
        btn: ['确定', '取消']
    },function () {
        $.ajax({
            url: datashareHost + "synchronizeLimsForPE",
            method: "post",
            data: {
                'currYear': localStorage.currYear,
                'limsAuth': $.cookie('currentAuthBydatashare')
            }, success: function (res) {
                layui.layer.alert(res.msg);
                setTimeout(function(){
                    $.ajax({
                        url: datashareHost + "generatePEReports",
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
