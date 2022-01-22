// $(document).ready(function () {
//
// });

let array = [];
let coll = [];

let msgindex;
let index = 0;
layui.use(['form','upload', 'element', 'layer', 'table'], function () {
    var $ = layui.$;
    var form = layui.form,
        layer = layui.layer
    let table = layui.table;
    let upload = layui.upload;
    let element = layui.element;
    $("#currYear").text(localStorage.getItem("currYear"));

    function loading(msg){
        msgindex = layer.msg(msg, {
            icon:16,
            shade:[0.1, '#fff'],
            time:false,  //不自动关闭
            offsetqiuchuy:"100px"
        })
    }
    var a = $("#termSelect").value;
    loading("数据加载中,请耐心等待......");
    //执行实例
    //检查项目添加到下拉框中
    $.ajax({
        url: datashareHost+'openapi/getSchoolTermList',
        dataType: 'json',
        type: 'get',
        success: function (data) {
            $.each(data.data, function (index, item) {
                $('#termSelect').append(new Option(item.termName, item.termNumber));// 下拉菜单里添加元素
                if(item.termNumber === localStorage.getItem("currTerm")){
                    $('#termSelect').val(item.termNumber);
                }
            });
            layui.form.render("select");
        }
    })
    $.ajax({
        url: datashareHost+'getSchoolAcademyList',
        dataType: 'json',
        type: 'get',
        data: {'page':1,'limit': 9999,'search':'ac'},
        success: function (data) {
            $.each(data.data, function (index, item) {
                $('#academySelect').append(new Option(item.academyName, item.academyNumber));// 下拉菜单里添加元素
                if(item.academyNumber === localStorage.getItem("currAcademy")){
                    $('#academySelect').val(item.academyNumber);
                }
            });
            layui.form.render("select");
        }
    })
//列表查询方法
    function tableHead(search,termNumber,academyNumber) {
        coll = [];
        $.ajax({
            url: datashareHost + "getReportLabRoomUsageList",
            data: {
                'limsAuth': $.cookie('currentAuthBydatashare'),
                'search': search,
                'yearCode': localStorage.currYear,
                'page': 1,
                'limit': 1,
                'termNumber':termNumber,
                'academyNumber':academyNumber
            },
            async: false,
            type: 'get',
            success: function (res) {

                coll.push(
                    {title: '序号', type: 'numbers'},
                    {field: 'buildName', title: '楼宇'},
                    {field: 'floorNo', title: '楼层'},
                    {field: 'labRoomName', title: '实验室名称'},
                    {field: 'labRoomUsage', title: '实验室利用率（学期）',event: 'toLims',templet: function (d){
                        let str = '';
                        if(Number(d[`labRoomUsage`])<=0.25){
                            str+=`<span style='color: red'>${d[`labRoomUsage`]}</span>`
                        }else if(Number(d[`labRoomUsage`])>0.25 &&Number(d[`labRoomUsage`])<=0.5){
                            str+=`<span style='color: orange'>${d[`labRoomUsage`]}</span>`
                        }else if(Number(d[`labRoomUsage`])>0.5){
                            str+=`<span style='color: limegreen'>${d[`labRoomUsage`]}</span>`
                        }
                        return str;
                    }},
                );
                var resJson = JSON.parse(res)
                if(resJson.data.length>0){
                    if(resJson.data[0].labRoomWeekUsageDTOList!=null){
                        var infoIndex = 1;
                        $.each(resJson.data[0].labRoomWeekUsageDTOList,function (i,d) {
                            coll.push({field: 'header'+infoIndex, title:'第'+d.week+'周',event: 'setSign'+infoIndex,
                                templet: function (d) {
                                    // console.log(d);
                                    let str = ''
                                    let count = d.labRoomWeekUsageDTOList.length;
                                    if(index+1 > count)
                                        index = 0;
                                    if(Number(d[`header${index+1}`])<=0.25){
                                        str+=`<span style='color: red'>${d[`header${index+1}`]}</span>`
                                    }else if(Number(d[`header${index+1}`])>0.25 &&Number(d[`header${index+1}`])<=0.5){
                                        str+=`<span style='color: orange'>${d[`header${index+1}`]}</span>`
                                    }else if(Number(d[`header${index+1}`])>0.5){
                                        str+=`<span style='color: limegreen'>${d[`header${index+1}`]}</span>`
                                    }
                                    index ++;
                                    return str;
                                }
                            })
                            infoIndex++;
                        })

                    }
                }else if(res.code == 500){
                    layer.msg("无数据");
                }
                coll.push({field: 'labCenter', title: '所属中心'},
                    {field: 'academyName', title: '所属学院'});

            }
        });
    }
    window.tableRender = function() {
        index = 0;
        let search = $('#search').val();
        let termNumber = $("#termSelect").val();
        let academyNumber = $("#academySelect").val();
        tableHead(search,termNumber,academyNumber);

            let table = layui.table;
            table.render({
                elem: '#lay_table_report_lab_room_usage',
                method: 'get',
                url: datashareHost + "getReportLabRoomUsageList",
                where: {
                    limsAuth: $.cookie('currentAuthBydatashare'),
                    search: search,
                    yearCode: localStorage.currYear,
                    termNumber:termNumber,
                    academyNumber:academyNumber
                },
                page: true,
                size: 'sm',
                even: true,
                parseData: function(res){ //res 即为原始返回的数据
                    var pdata = {
                        "code": 0, //解析接口状态
                        "msg": "", //解析提示文本
                        "count": res.count, //解析数据长度
                        "data": res.data //解析数据列表
                    };
                    let data = [];
                    $.each(res.data,function (key, value) {
                        let d = value;
                        var infoIndex = 1;
                        $.each(d.labRoomWeekUsageDTOList,function (key, value) {
                            d['header'+infoIndex] = value.usage;
                            infoIndex++;
                        })
                        data.push(d);
                    })
                    pdata.data = data;
                    return pdata;
                },
                cols: [coll],
                done:function (res) {
                    layer.close(msgindex);
                }
            });
            //监听单元格编辑
            table.on('edit(lay_table_report_lab_room_usage)', function (obj) {
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

            table.on('tool(lay_table_report_lab_room_usage)',function (obj) {
                var data = obj.data;
                if (obj.event.indexOf('setSign')!=-1){
                    console.log(obj.event.replace(/[^0-9]/ig, ""));
                    let week  = parseInt(obj.event.replace(/[^0-9]/ig, ""));
                    let termNumber = data.termNumber;
                    let roomId = data.roomId;
                    layer.open({
                        type: 2,
                        title: "课表日历",
                        area: ['100%', '100%'],
                        content: limsproductHost+'/redirectWithURL?url=schedule/allScheduleInfo?termNumber*'+termNumber+':labIds*'+roomId+':week*'+week
                    });
                }
                if (obj.event==='toLims'){
                    let termNumber = data.termNumber;
                    let roomId = data.roomId;
                    layer.open({
                        type: 2,
                        title: "课表日历",
                        area: ['100%', '100%'],
                        content: limsproductHost+'/redirectWithURL?url=schedule/allScheduleInfo?termNumber*'+termNumber+':labIds*'+roomId
                    });
                }

            })
    }
    tableRender();

    //取消查询
    window.cancelSearch = function () {
        location.reload();
    }

    //获取报表数据
    window.getTimetableData = function () {
        let termNumber = $("#termSelect").val();
        $.ajax({
            url: datashareHost + "putTimetableData",
            data: {'termNumber': termNumber},
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
function reportExportTxt() {
    window.open(datashareHost + "report/exportReportLabRoomUsageTxt?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}

function reportExportExcel() {
    window.open(datashareHost + "report/exportReportLabRoomUsageExcel?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}

//删除
function delCheckData() {
    let checkStatus = layui.table.checkStatus('lay_table_report_lab_room_usage')
    let data = checkStatus.data;
    if (data.length > 0) {
        layui.layer.confirm('确定删除选中的' + data.length + '条数据？', {
            btn: ['确定', '取消']
        }, function () {
            $.ajax({
                url: datashareHost + 'delVE',
                method: 'post',
                data: {
                    veJson: JSON.stringify(data)
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
            url: datashareHost + 'updateVE',
            method: 'post',
            data: {
                veJson: JSON.stringify(array)
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





