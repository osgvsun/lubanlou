$(document).ready(function () {
    $("#currYear").text(localStorage.getItem("currYear"));
    tableRender();
});

let array = [];
//列表查询方法
function tableRender() {
    let search = $('#search').val();
    let businessIds = $('#updateTime').val();
    let status = $('#status option:selected').val();
    layui.use(['table'], function () {
        let table = layui.table;
        table.render({
            elem: '#lay_table_git',
            method: 'post',
            url: datashareHost + "getGitData",
            where: {
                dataType: "git_question",
                status: status,
                businessIds: businessIds,
                search: search
            },
            //议题&&创建人&&创建时间&&指派人&&问题进度&&暂缓状态&&未更新天数&&备注&&链接
            //question&&creator&&createTime&&assignor&&progress&&status&&days&&remarks&&link
            page: true,
            size: 'sm',
            even: true,
            cols: [[
                {type: 'checkbox', fixed: 'left'},
                {title: '序号', type: 'numbers'},
                {field: 'gitId', title: '议题编号'},
                {field: 'question', title: '议题'},
                {field: 'creator', title: '创建人'},
                {field: 'createTime', title: '创建时间'},
                {field: 'assignor', title: '指派人'},
                {field: 'progress', title: '问题进度'},
                {field: 'status', title: '状态(为空或0未关闭，1关闭，2暂缓)',width:250},
                {field: 'days', title: '未更新天数'},
                {field: 'remarks', title: '备注'},
                {field: 'link', title: '链接'}
            ]]
        });
        //监听单元格编辑
        table.on('edit(lay_table_git)', function (obj) {
            let index = -1;
            let data = obj.data;
            for (let i = 0; i < array.length; i++) {
                if (data.laboratoryNumber === array[i].laboratoryNumber) {
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

//数据操作
function putData() {
    window.open('luckySheet?lakeNumber=lubanlou_lake&reportNumber=git_question&params='+$("#updateTime").val()+','+$("#status").val(), 'git值班报表')
}

layui.use(['form','upload', 'element', 'layer', 'table', 'laydate'], function () {
    var $ = layui.$;
    var form = layui.form,
        layer = layui.layer
    let table = layui.table;
    let upload = layui.upload;
    let element = layui.element;
    var laydate = layui.laydate;

    //学期开始时间
    laydate.render({
        elem: '#updateTime',
        format: 'yyyy-MM-dd'
    });

});


// //列表查询方法
// function reportExportTxt() {
//     window.open(datashareHost + "report/exportSJ8Txt?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
// }
//
// function reportExportExcel() {
//     window.open(datashareHost + "report/exportSJ8Excel?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
// }

layui.use(['upload', 'element'], function () {
    let upload = layui.upload;
    let element = layui.element;

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
        elem: '#importGit',
        url: datashareHost + 'report/uploadGitByExcel',
        data: {'limsAuth':$.cookie('currentAuthBydatashare'),
            'currYear': localStorage.currYear
        },
        accept: 'file',
        exts: 'xlsx',
        progress: function (n) {
            element.progress('gitBar', n + '%');
        },
        before: function (res) {
            loading("数据导入中,请耐心等待......");
        },
        done: function (res) {
            element.progress('gitBar', 0);
            layer.confirm(res.msg, {
                btn : [ '确定']//按钮
            }, function() {
                location.reload();
            })
        },
        error: function () {
            element.progress('gitBar', 0);
            layui.layer.msg("出错啦");
        }
    });


    window.viewLimsDataForSJ8 = function () {
    }
});


