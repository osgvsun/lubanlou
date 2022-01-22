$(document).ready(function () {
    $("#currYear").text(localStorage.getItem("currYear"));
    timelineRender();
    tableRender();
});
var errorLog;
function timelineRender() {
    const p1 = new Promise((resolve, reject) => {
        $.ajax({
            url: datashareHost + "report/sjData",
            data: {
                sj: "sj4"
            },
            success: function (data) {
                resolve(data)
            }
        })
    })
    const p2 = new Promise((resolve, reject) => {
        $.ajax({
            url: datashareHost + "report/configData",
            success: function (data) {
                resolve(data)
            }
        })
    })
    Promise.all([p1, p2]).then(([sjData, configData]) => {
        localStorage.setItem("datashare_configData",configData)
        // console.log(sjData,configData)
        let dataShareCountList = "";
        for(let i of sjData.dataShareCountList){
            dataShareCountList += `<li class="layui-timeline-item">
                            <i class="layui-icon layui-timeline-axis"></i>
                            <div class="layui-timeline-content layui-text">
                                <div class="layui-timeline-title">
                                    <div class="layui-card-body" style="background:#9966CC; color:#FFF">
                                        <div class="layui-timeline-title">${i.yearCode}</div>
                                        <span>${i.count}</span>条数据
                                        <a class="layui-btn layui-btn-primary layui-btn-xs"
                                           target="_blank"
                                           href="sj4New?yearCode=${i.yearCode}&system=dataShare">
                                            详情
                                        </a>
                                        <a class="layui-btn layui-btn-primary layui-btn-xs"
                                           onclick="cleanData(${i.yearCode})">
                                            清库
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>`
        }
        $("ul.dataShareCountList").append(dataShareCountList)
        if(configData.sj4IsShowLims){
            let limsCountList = "";
            for(let i of sjData.limsCountList){
                limsCountList += `<li class="layui-timeline-item">
                            <i class="layui-icon layui-timeline-axis"></i>
                            <div class="layui-timeline-content layui-text">
                                <div class="layui-timeline-title">
                                    <div class="layui-card-body" style="background:#FF00FF; color:white">
                                        <div class="layui-timeline-title">${i.yearCode}</div>
                                        <span>${i.count}</span>条数据
                                    </div>
                                </div>
                            </div>
                        </li>`
            }
            $("ul.limsCountList").append(limsCountList)
            $(".sj4IsShowLims").show();
        }
    });
}


let array = [];

//表格刷新
function tableRender() {
    let search = $('#search').val();
    layui.use(['table'], function () {
        let table = layui.table;
        table.render({
            elem: '#lay_table_report_experiment',
            method: 'get',
            url: datashareHost + "getReportExperimentList",
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
                {field: 'experimentalNumber', title: '实验编号'},
                {field: 'experimentalName', title: '实验名称', edit: 'text'},
                {field: 'experimentalType', title: '实验类别', edit: 'text'},
                {field: 'experimentalClass', title: '实验类型', edit: 'text'},
                {field: 'experimentalSubject', title: '实验所属学科', edit: 'text'},
                {field: 'experimentalDemand', title: '实验要求', edit: 'text'},
                {field: 'experimenterGender', title: '实验者类别', edit: 'text'},
                {field: 'experimenterNumber', title: '实验者人数', edit: 'text'},
                {field: 'groupNumber', title: '每组人数', edit: 'text'},
                {field: 'experimentalHours', title: '实验学时数', edit: 'text'},
                {field: 'laboratoryNumber', title: '实验室编号', edit: 'text'},
                {field: 'laboratoryName', title: '实验室名称', edit: 'text'},
                {field: 'academyNumber', title: '首开学院编号'},
                {field: 'academyName', title: '首开学院名称'},
                {field: 'openName', title: '首开人名称'},
                {field: 'creator', title: '创建者姓名'},
                {field: 'courseNumber', title: '课程名称（课程编号）'},
                {field: 'lpPurposes', title: '备注'},
            ]]
        });

        //监听单元格编辑
        table.on('edit(lay_table_report_experiment)', function (obj) {
            let index = -1;
            let data = obj.data;
            for (let i = 0; i < array.length; i++) {
                if (data.experimentalNumber === array[i].experimentalNumber) {
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

//生成报表
function openReportExperimentColumnLayer() {
    var dataSources = new Array();
    dataSources[0] = 'lims';
        $.ajax({
            url: datashareHost + "generateSJ4Reports",
            method: "post",
            data: {'limsAuth':$.cookie('currentAuthBydatashare'),
                    'currYear':localStorage.currYear,
                    'dataSources':dataSources},
            dataType: "json",
            traditional: true,
            success: function (res) {
                if (res.code === 0) {
                    window.tableRender();
                }
                window.layui.layer.alert(res.msg);
            },
            error: function () {
                layui.layer.msg("出错啦");
            }
        });
}

//导出报表
function reportExportTxt() {
    window.open(datashareHost + "report/exportReportExperimentTxt?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}

//导出报表
function reportExportExcel() {
    window.open(datashareHost + "report/exportReportExperimentExcel?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}

layui.use(['upload', 'element','layer'], function () {
    let upload = layui.upload;
    let element = layui.element;
    var layer = layui.layer;
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
        elem: '#importReportExperiment',
        url: datashareHost + 'report/uploadReportExperimentByExcel',
        data: {'limsAuth':$.cookie('currentAuthBydatashare'),
                'currYear': localStorage.currYear
        },
        accept: 'file',
        exts: 'xlsx',
        progress: function (n) {
            element.progress('reportExperimentBar', n + '%');
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
                element.progress('reportExperimentBar', 0);
                layer.confirm(res.msg, {
                    btn : [ '确定']//按钮
                }, function() {
                    location.reload();
                })

            }
        },
        error: function () {
            element.progress('reportExperimentBar', 0);
            layui.layer.msg("出错啦");
        }
    });

    window.viewLimsDataForSJ4 = function ()  {
        $.ajax({
            url: datashareHost + "synchronizeLimsForSJ4",
            method: "post",
            data: {
                'currYear': localStorage.currYear,
                'limsAuth': $.cookie('currentAuthBydatashare')
            },
            beforeSend: function (res) {
                loading("数据更新中,请耐心等待......");
            },
            success: function (res) {
                layer.confirm(res.msg, {
                    btn : [ '确定']//按钮
                }, function() {
                    location.reload();
                })
            },
            error: function () {
                layui.layer.msg("出错啦！");
            }
        });
    }
});

//列表查询方法
function delCheckData() {
    let checkStatus = layui.table.checkStatus('lay_table_report_experiment')
    let data = checkStatus.data;
    if (data.length > 0) {
        layui.layer.confirm('确定删除选中的' + data.length + '条数据？', {
            btn: ['确定', '取消']
        }, function () {
            $.ajax({
                url: datashareHost + 'delReportExperiment',
                method: 'post',
                data: {
                    reportExperimentJson: JSON.stringify(data)
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
            url: datashareHost + 'updateReportExperiment',
            method: 'post',
            data: {
                reportExperimentJson: JSON.stringify(array)
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
function cleanData(yearCode) {
    layui.layer.confirm('即将删除全部本年导入数据？', {
        btn: ['确定', '取消']
    }, function () {
        $.ajax({
            url: datashareHost + 'cleanReport',
            method: 'post',
            data: {
                reportNumber : 'reportExperiment',
                currYear: yearCode
            },
            dataType: 'json',
            success: function (res) {
                tableRender();
                location.reload();
                layui.layer.alert(res.msg);
            },
            error: function () {
                layui.layer.msg('出错啦');
            }
        });
    });
}
