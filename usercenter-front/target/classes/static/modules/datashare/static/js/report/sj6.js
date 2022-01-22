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
                sj: "sj6"
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
                                           href="sj6New?yearCode=${i.yearCode}&system=dataShare">
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
        if(configData.sj6IsShowLims){
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
                                           target="_blank" href="sj6New?yearCode=${i.yearCode}&system=lims">
                                            详情
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>`
            }
            $("ul.limsCountList").append(limsCountList)
            $(".sj6IsShowLims").show();
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
            elem: '#lay_table_sj6',
            method: 'get',
            url: datashareHost + "getSJ6List",
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
                {field: 'laboratoryNumber', title: '实验室编号'},
                {field: 'laboratoryName', title: '实验室名称', edit: 'text'},
                {field: 'laboratoryType', title: '实验室类别', edit: 'text'},
                {field: 'buildYear', title: '建立年份', edit: 'text'},
                {field: 'laboratoryArea', title: '实验室面积', edit: 'text'},
                {field: 'laboratoryClass', title: '实验室类型', edit: 'text'},
                {field: 'belongingSubject', title: '所属学科', edit: 'text'},
                {field: 'awardsNational', title: '教师获奖与成果（国家级）', edit: 'text'},
                {field: 'awardsProvincial', title: '教师获奖与成果（省部级）', edit: 'text'},
                {field: 'awardsPatent', title: '教师获奖与成果（发明专利）', edit: 'text'},
                {field: 'studentAwards', title: '学生获奖情况', edit: 'text'},
                {field: 'teachingThreeMajorSearches', title: '教学方面论文和教材情况（三大检索收录）', edit: 'text'},
                {field: 'researchThreeMajorSearches', title: '科研方面论文和教材情况（三大检索收录）', edit: 'text'},
                {field: 'teachingCorePublication', title: '教学方面论文和教材情况（核心刊物）', edit: 'text'},
                {field: 'researchCorePublication', title: '科研方面论文和教材情况（核心刊物）', edit: 'text'},
                {field: 'papersTeachingMaterials', title: '论文和教材情况（实验教材）', edit: 'text'},
                {field: 'researchProjectsProvincial', title: '科研及社会服务情况中科研项目数（省部级以上）', edit: 'text'},
                {field: 'researchProjectsOther', title: '科研及社会服务情况中科研项目数（其它）', edit: 'text'},
                {field: 'socialServiceItems', title: '科研及社会服务情况中社会服务项目数', edit: 'text'},
                {field: 'socialServiceItemsProvincial', title: '科研及社会服务情况中教研项目数（省部级以上）', edit: 'text'},
                {field: 'socialServiceItemsOther', title: '科研及社会服务情况中教研项目数（其它）', edit: 'text'},
                {field: 'graduationProjectSpecialist', title: '毕业设计和论文人数（专科生人数）', edit: 'text'},
                {field: 'graduationProjectUndergraduate', title: '毕业设计和论文人数（本科生人数）', edit: 'text'},
                {field: 'graduationProjectPostgraduate', title: '毕业设计和论文人数（研究生人数）', edit: 'text'},
                {field: 'openExperimentItemsOnCampus', title: '开放实验个数（校内）', edit: 'text'},
                {field: 'openExperimentItemsOffCampus', title: '开放实验个数（校外）', edit: 'text'},
                {field: 'openExperimentPeopleOnCampus', title: '开放实验人数（校内）', edit: 'text'},
                {field: 'openExperimentPeopleOffCampus', title: '开放实验人数（校外）', edit: 'text'},
                {field: 'openExperimentManHoursOnCampus', title: '开放实验人时数（校内）', edit: 'text'},
                {field: 'openExperimentManHoursOffCampus', title: '开放实验人时数（校外）', edit: 'text'},
                {field: 'partTimeStaff', title: '兼任人员数', edit: 'text'},
                {field: 'maintenanceExpenses', title: '实验教学运行经费小计', edit: 'text'},
                {field: 'consumptionFee', title: '其中教学实验年材料消耗费', edit: 'text'},
                {field: 'yearCode', title: '学年', edit: 'text'},
                {field: 'academyNumber', title: '学院编号'}
            ]]
        });

        //监听单元格编辑
        table.on('edit(lay_table_sj6)', function (obj) {
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

//生成报表
function openSj6ColumnLayer() {
    layer.open({
        type: 2,
        title: "生成报表",
        area: ['800px', '600px'],
        content: 'sj6DataSourceList'
    });
}

//取消查询
function cancelSearch() {
    $('#search').val("");
    tableRender();
}

//导出报表
function reportExportTxt() {
    window.open(datashareHost + "report/exportSJ6Txt?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}

function reportExportExcel() {
    window.open(datashareHost + "report/exportSJ6Excel?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
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
        elem: '#importSJ6',
        url: datashareHost + 'report/uploadSJ6ByExcel',
        data: {'limsAuth':$.cookie('currentAuthBydatashare'),
                'currYear': localStorage.currYear
        },
        accept: 'file',
        exts: 'xlsx',
        progress: function (n) {
            element.progress('sj6Bar', n + '%');
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
                element.progress('sj6Bar', 0);
                layer.confirm(res.msg, {
                    btn : [ '确定']//按钮
                }, function() {
                    location.reload();
                })
            }
        },
        error: function () {
            element.progress('sj6Bar', 0);
            layui.layer.msg("出错啦");
        }
    });


    window.viewLimsDataForSJ6 = function () {
        $.ajax({
            url: datashareHost + "synchronizeLimsForSJ6",
            data: {
                'currYear':localStorage.currYear,
                'limsAuth': $.cookie('currentAuthBydatashare')
            },
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
    let checkStatus = layui.table.checkStatus('lay_table_sj6')
    let data = checkStatus.data;
    if (data.length > 0) {
        layui.layer.confirm('确定删除选中的' + data.length + '条数据？', {
            btn: ['确定', '取消']
        }, function () {
            $.ajax({
                url: datashareHost + 'delSJ6',
                method: 'post',
                data: {
                    sj6Json: JSON.stringify(data)
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
            url: datashareHost + 'updateSJ6',
            method: 'post',
            data: {
                sj6Json: JSON.stringify(array)
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
                reportNumber : 'sj6',
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
