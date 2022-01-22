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
            elem: '#lay_table_sj3',
            method: 'get',
            url: datashareHost + "getSJ3List",
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
                {field: 'deviceNumber', title: '仪器编号'},
                {field: 'deviceType', title: '分类号', edit: 'text'},
                {field: 'deviceName', title: '仪器名称', edit: 'text'},
                {field: 'devicePrice', title: '单价', edit: 'text'},
                {field: 'deviceVersion', title: '型号', edit: 'text'},
                {field: 'deviceSpec', title: '规格', edit: 'text'},
                {field: 'useTimeTeach', title: '使用机时（教学）', edit: 'text'},
                {field: 'useTimeResearch', title: '使用机时（科研）', edit: 'text'},
                {field: 'useTimeSocialService', title: '使用机时（社会服务）', edit: 'text'},
                {field: 'useTimeOpen', title: '使用机时（其中开放使用机时）', edit: 'text'},
                {field: 'specimenCount', title: '测样数', edit: 'text'},
                {field: 'trainingNumberStudent', title: '培训人员数（学生）', edit: 'text'},
                {field: 'trainingNumberTeacher', title: '培训人员数（教师）', edit: 'text'},
                {field: 'trainingNumberOther', title: '培训人员数（其他）', edit: 'text'},
                {field: 'teachProject', title: '教学实验项目数', edit: 'text'},
                {field: 'researchProject', title: '科研项目数', edit: 'text'},
                {field: 'socialServiceProject', title: '社会服务项目数', edit: 'text'},
                {field: 'awardsNational', title: '获奖情况（国家级）', edit: 'text'},
                {field: 'awardsProvincial', title: '获奖情况（省部级）', edit: 'text'},
                {field: 'patentTeacher', title: '发明专利（教师）', edit: 'text'},
                {field: 'patentStudent', title: '发明专利（学生）', edit: 'text'},
                {field: 'papersThreeMajorSearches', title: '论文情况（三大检索）', edit: 'text'},
                {field: 'papersCorePublication', title: '论文情况（核心刊物）', edit: 'text'},
                {field: 'namePersonInCharge', title: '负责人姓名', edit: 'text'},
                {field: 'academyNumber', title: '学院编号'}
            ]]
        });

        //监听单元格编辑
        table.on('edit(lay_table_sj3)', function (obj) {
            let index = -1;
            let data = obj.data;
            for (let i = 0; i < array.length; i++) {
                if (data.deviceNumber === array[i].deviceNumber) {
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
    window.open(datashareHost + "report/exportSJ3Txt?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}

function reportExportExcel() {
    window.open(datashareHost + "report/exportSJ3Excel?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
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
        elem: '#importSJ3',
        url: datashareHost + 'report/uploadSJ3ByExcel',
        data: {'limsAuth':$.cookie('currentAuthBydatashare'),
                'currYear': localStorage.currYear
        },
        accept: 'file',
        exts: 'xlsx',
        progress: function (n) {
            element.progress('sj3Bar', n + '%');
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
                element.progress('sj3Bar', 0);
                layer.confirm(res.msg, {
                    btn : [ '确定']//按钮
                }, function() {
                    location.reload();
                })
            }
        },
        error: function () {
            element.progress('sj3Bar', 0);
            layui.layer.msg("出错啦");
        }
    });
});

//列表查询方法
function delCheckData() {
    let checkStatus = layui.table.checkStatus('lay_table_sj3')
    let data = checkStatus.data;
    if (data.length > 0) {
        layui.layer.confirm('确定删除选中的' + data.length + '条数据？', {
            btn: ['确定', '取消']
        }, function () {
            $.ajax({
                url: datashareHost + 'delSJ3',
                method: 'post',
                data: {
                    sj3Json: JSON.stringify(data)
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

//列表查询方法
function modifyData() {
    if (array.length > 0) {
        $.ajax({
            url: datashareHost + 'updateSJ3',
            method: 'post',
            data: {
                sj3Json: JSON.stringify(array)
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
                reportNumber : 'sj3',
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
