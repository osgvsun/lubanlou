$(document).ready(function () {
    $("#currYear").text(localStorage.getItem("currYear"));
    tableRender();
    timelineRender();
});

function timelineRender() {
    const p1 = new Promise((resolve, reject) => {
            $.ajax({
            url: datashareHost + "report/sjData",
            data: {
                sj: "sj8"
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
                                           href="sj8New?yearCode=${i.yearCode}&system=dataShare">
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
    if(configData.undergraduateLaboratoryIsShowLims){
        let limsCountList = "";
        for(let i of sjData.limsCountList){
            limsCountList += `<li class="layui-timeline-item">
                            <i class="layui-icon layui-timeline-axis"></i>
                            <div class="layui-timeline-content layui-text">
                                <div class="layui-timeline-title">
                                    <div class="layui-card-body" style="background:#FF00FF; color:white">
                                        <div class="layui-timeline-title">${i.yearCode}</div>
                                        <span>${i.count}</span>条数据
                                        <a class="layui-btn layui-btn-primary layui-btn-xs"
                                           target="_blank" href="sj8New?yearCode=${i.yearCode}&system=lims">
                                            详情
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>`
        }
        $("ul.limsCountList").append(limsCountList)
        $(".undergraduateLaboratoryIsShowLims").show();
    }
});
}

let array = [];
//列表查询方法
function tableRender() {
    let search = $('#search').val();
    layui.use(['table'], function () {
        let table = layui.table;
        table.render({
            elem: '#lay_table_sj8',
            method: 'get',
            url: datashareHost + "getSJ8List",
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
                {field: 'laboratoryNumber', title: '实验场所代码'},
                {field: 'laboratoryName', title: '实验场所名称', edit: 'text'},
                {field: 'belongingSubjectName', title: '所属单位名称', edit: 'text'},
                {field: 'belongingSubjectNumber', title: '所属单位号', edit: 'text'},
                {field: 'laboratoryClass', title: '性质', edit: 'text'},
                {field: 'laboratoryArea', title: '使用面积（平方米）', edit: 'text'},
                {field: 'academyNumber', title: '学院编号'}
            ]]
        });
        //监听单元格编辑
        table.on('edit(lay_table_sj8)', function (obj) {
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

//生成报表
function openSj8ColumnLayer() {
    layer.open({
        type: 2,
        title: "生成报表",
        area: ['800px', '600px'],
        content: 'sj8DataSourceList'
    });
}

//列表查询方法
function reportExportTxt() {
    window.open(datashareHost + "report/exportSJ8Txt?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}

function reportExportExcel() {
    window.open(datashareHost + "report/exportSJ8Excel?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}

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
        elem: '#importSJ8',
        url: datashareHost + 'report/uploadSJ8ByExcel',
        data: {'limsAuth':$.cookie('currentAuthBydatashare'),
            'currYear': localStorage.currYear
        },
        accept: 'file',
        exts: 'xlsx',
        progress: function (n) {
            element.progress('sj8Bar', n + '%');
        },
        before: function (res) {
            loading("数据导入中,请耐心等待......");
        },
        done: function (res) {
            element.progress('sj8Bar', 0);
            layer.confirm(res.msg, {
                btn : [ '确定']//按钮
            }, function() {
                location.reload();
            })
        },
        error: function () {
            element.progress('sj8Bar', 0);
            layui.layer.msg("出错啦");
        }
    });


    window.viewLimsDataForSJ8 = function () {
        $.ajax({
            url: datashareHost + "synchronizeLimsForSJ8",
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

//列表删除方法
function delCheckData() {
    let checkStatus = layui.table.checkStatus('lay_table_sj8')
    let data = checkStatus.data;
    if (data.length > 0) {
        layui.layer.confirm('确定删除选中的' + data.length + '条数据？', {
            btn: ['确定', '取消']
        }, function () {
            $.ajax({
                url: datashareHost + 'delSJ8',
                method: 'post',
                data: {
                    sj8Json: JSON.stringify(data)
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

//列表编辑方法
function modifyData() {
    if (array.length > 0) {
        $.ajax({
            url: datashareHost + 'updateSJ8',
            method: 'post',
            data: {
                sj8Json: JSON.stringify(array)
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
    localStorage.currYear
    layui.layer.confirm('即将删除全部本年导入数据？', {
        btn: ['确定', '取消']
    }, function () {
        $.ajax({
            url: datashareHost + 'cleanReport',
            method: 'post',
            data: {
                reportNumber : 'ubdUndergraduateLaboratory',
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
