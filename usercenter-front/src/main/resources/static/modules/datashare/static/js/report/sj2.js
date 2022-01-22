$(document).ready(function () {
    $("#currYear").text(localStorage.getItem("currYear"));
    tableRender();
});

let array = [];
var errorLog;
//列表查询方法
function tableRender() {
    let search = $('#search').val();
    layui.use(['table'], function () {
        let table = layui.table;
        table.render({
            elem: '#lay_table_sj2',
            method: 'get',
            url: datashareHost + "getSJ2List",
            where: {
                limsAuth: $.cookie('currentAuthBydatashare'),
                currYear: localStorage.currYear,
                search: search
            },
            page: true,
            size: 'sm',
            even: true,
            cols: [[
                {type: 'checkbox', fixed: 'left'},
                {title: '序号', type: 'numbers'},
                {field: 'schoolCode', title: '学校代码'},
                {field: 'deviceCountOnLastYear', title: '上学年末实有数（台件）', edit: 'text'},
                {field: 'deviceMoneyOnLastYear', title: '上学年末实有数（金额）', edit: 'text'},
                {field: 'deviceCountOnLastYearMoreTen', title: '上学年末实有数中10万元（含）以上（台件）', edit: 'text'},
                {field: 'deviceMoneyOnLastYearMoreTen', title: '上学年末实有数中10万元（含）以上（金额）', edit: 'text'},
                {field: 'deviceAddCountOnThisYear', title: '本学年增加数（台件）', edit: 'text'},
                {field: 'deviceAddMoneyOnThisYear', title: '本学年增加数（金额）', edit: 'text'},
                {field: 'deviceCutCountOnThisYear', title: '本学年减少数（台件）', edit: 'text'},
                {field: 'deviceCutMoneyOnThisYear', title: '本学年减少数（金额）', edit: 'text'},
                {field: 'deviceCountOnThisYear', title: '本学年末实有数（台件）', edit: 'text'},
                {field: 'deviceMoneyOnThisYear', title: '本学年末实有数（金额）', edit: 'text'},
                {field: 'deviceCountOnThisYearMoreTen', title: '本学年末实有数中10万元（含）以上（台件）', edit: 'text'},
                {field: 'deviceMoneyOnThisYearMoreTen', title: '本学年末实有数中10万元（含）以上（金额）', edit: 'text'},
                {field: 'academyNumber', title: '学院编号'}
            ]]
        });
        //监听单元格编辑
        table.on('edit(lay_table_sj2)', function (obj) {
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
    window.open(datashareHost + "report/exportSJ2Txt?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}

function reportExportExcel() {
    window.open(datashareHost + "report/exportSJ2Excel?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}

layui.use(['upload', 'element'], function () {
    let upload = layui.upload;
    let element = layui.element;
    var msgindex;
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
        elem: '#importSJ2',
        url: datashareHost + 'report/uploadSJ2ByExcel',
        data: {'limsAuth':$.cookie('currentAuthBydatashare'),
                'currYear': localStorage.currYear
                },
        accept: 'file',
        exts: 'xlsx',
        progress: function (n) {
            element.progress('sj2Bar', n + '%');
        },
        before: function (res) {
            loading("数据导入中,请耐心等待......");
        },
        done: function (res) {
            if (res.code===-1){
                errorLog =  res.msg;
                layer.open({
                    type: 2,
                    title: "导入出错信息",
                    area: ['100%', '100%'],
                    content: 'reportUploadError'
                });
                layer.close(msgindex);
            }else if (res.code===0){
                element.progress('sj2Bar', 0);
                layer.confirm(res.msg, {
                    btn : [ '确定']//按钮
                }, function() {
                    location.reload();
                })
            }
        },
        error: function () {
            element.progress('sj2Bar', 0);
            layui.layer.msg("出错啦");
        }
    });
});

//列表查询方法
function delCheckData() {
    let checkStatus = layui.table.checkStatus('lay_table_sj2')
    let data = checkStatus.data;
    if (data.length > 0) {
        layui.layer.confirm('确定删除选中的' + data.length + '条数据？', {
            btn: ['确定', '取消']
        }, function () {
            $.ajax({
                url: datashareHost + 'delSJ2',
                method: 'post',
                data: {
                    sj2Json: JSON.stringify(data)
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

function modifyData() {
    if (array.length > 0) {
        $.ajax({
            url: datashareHost + 'updateSJ2',
            method: 'post',
            data: {
                sj2Json: JSON.stringify(array)
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

//清库功能
function cleanData() {
    localStorage.currYear
    layui.layer.confirm('即将删除全部本年导入数据？', {
        btn: ['确定', '取消']
    }, function () {
        $.ajax({
            url: datashareHost + 'cleanReport',
            method: 'post',
            data: {
                reportNumber : 'sj2',
                currYear: localStorage.currYear
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
}