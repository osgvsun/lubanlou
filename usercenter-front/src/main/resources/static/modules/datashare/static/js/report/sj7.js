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
                sj: "sj7"
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
    if($.cookie('currentAuthBydatashare')==='SUPERADMIN'){
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
                                           href="sj7New?yearCode=${i.yearCode}">
                                            详情
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>`
        }
        $("ul.dataShareCountList").append(dataShareCountList)
        $(".sj7IsShow").show();
    }
});
}

//生成报表
function openSj7ColumnLayer() {
    layer.open({
        type: 2,
        title: "生成报表",
        area: ['800px', '600px'],
        content: 'sj7DataSourceList'
    });
}

let array = [];
//列表查询方法
function tableRender() {
    let search = $('#search').val();
    layui.use(['table'], function () {
        let table = layui.table;
        table.render({
            elem: '#lay_table_sj7',
            method: 'get',
            url: datashareHost + "getSJ7List",
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
                {field: 'laboratoriesCount', title: '实验室个数', edit: 'text'},
                {field: 'laboratoriesTotalArea', title: '实验室房屋使用面积', edit: 'text'},
                {field: 'totalFee', title: '经费投入总计', edit: 'text'},
                {field: 'deviceFee', title: '经费投入中仪器设备购置经费小计', edit: 'text'},
                {field: 'teachDeviceFee', title: '经费投入中仪器设备购置经费(其中教学仪器购置经费)', edit: 'text'},
                {field: 'deviceMaintainFee', title: '经费投入中仪器设备维护经费小计', edit: 'text'},
                {field: 'teachDeviceMaintainFee', title: '经费投入中仪器设备维护经费(其中教学仪器维护经费)', edit: 'text'},
                {field: 'experimentalTeachingFee', title: '经费投入中实验教学运行经费小计', edit: 'text'},
                {field: 'materialConsumptionFee', title: '经费投入中实验教学运行经费(其中年材料消耗经费)', edit: 'text'},
                {field: 'laboratoryConstructionFee', title: '经费投入中实验室建设经费', edit: 'text'},
                {field: 'teachingResearchAndReformFee', title: '经费投入中实验教学研究与改革经费', edit: 'text'},
                {field: 'otherFee', title: '经费投入中其它', edit: 'text'},
                {field: 'academyNumber', title: '学院编号'}
            ]]
        });

        //监听单元格编辑
        table.on('edit(lay_table_sj7)', function (obj) {
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
    window.open(datashareHost + "report/exportSJ7Txt?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}

function reportExportExcel() {
    window.open(datashareHost + "report/exportSJ7Excel?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
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
        elem: '#importSJ7',
        url: datashareHost + 'report/uploadSJ7ByExcel',
        data: {'limsAuth':$.cookie('currentAuthBydatashare'),
                'currYear': localStorage.currYear
        },
        accept: 'file',
        exts: 'xlsx',
        progress: function (n) {
            element.progress('sj7Bar', n + '%');
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
                element.progress('sj7Bar', 0);
                layer.confirm(res.msg, {
                    btn : [ '确定']//按钮
                }, function() {
                    location.reload();
                })
            }
        },
        error: function () {
            element.progress('sj7Bar', 0);
            layui.layer.msg("出错啦");
        }
    });

    window.viewCollectDataForSJ7 = function () {
        $.ajax({
            url: datashareHost + "collectDataForSJ7",
            method: "post",
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
    let checkStatus = layui.table.checkStatus('lay_table_sj7')
    let data = checkStatus.data;
    if (data.length > 0) {
        layui.layer.confirm('确定删除选中的' + data.length + '条数据？', {
            btn: ['确定', '取消']
        }, function () {
            $.ajax({
                url: datashareHost + 'delSJ7',
                method: 'post',
                data: {
                    sj7Json: JSON.stringify(data)
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
            url: datashareHost + 'updateSJ7',
            method: 'post',
            data: {
                sj7Json: JSON.stringify(array)
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
                reportNumber : 'sj7',
                currYear: localStorage.currYear
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
