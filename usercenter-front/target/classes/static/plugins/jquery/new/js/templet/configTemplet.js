//新增院级模板—机时预约
$(".addTemplete").click(function(){
    var academyNumber = $(this).attr("data");
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看详情'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../config/editInstrumentMachineApp?insUid='+'testInstrument&academyNumber='+academyNumber
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})
//新增送样检测模板
$(".addTempleteSpecimen").click(function(){
    var academyNumber = $(this).attr("data");
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看详情'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../config/editInstrumentSpecimenApp?insUid='+'testInstrument&academyNumber='+academyNumber
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})
//查看模板
$(".viewTemplete").click(function(){
    var dataString= $(this).attr("data");
    var dataArray=dataString.split("$");
    var machineTempletId=dataArray[0];
    var academyNumber=dataArray[1];
    // var instrumentId=dataArray[2];
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看详情'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../templet/applyMachineTemplet?machineTempletId='+machineTempletId+"&academy="+academyNumber+"&instrumentId=testInstrument"
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})
//查看送样检测模板
$(".viewTempleteSpecimen").click(function(){
    var dataString= $(this).attr("data");
    var dataArray=dataString.split("$");
    var specimenTempletId=dataArray[0];
    var academyNumber=dataArray[1];
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看详情'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../templet/applySpecimenTemplet?specimenTempletId='+specimenTempletId+'&instrumentId=testInstrument'+"&academy="+academyNumber
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})
//下发校级模板页面
$(".downTemplete").click(function(){
    var academyNumber= $(this).attr("data");
    var page=$("#currPage").val();
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看详情'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../templet/showCanDownTemplet?academyNumber='+academyNumber
        ,success: function(layero){
            layer.setTop(layero); //重点2
        },
        end: function(){
            window.location.href="../common/configTempletManageAcademy?currpage="+page;
        }
    });
    layer.full(win);
})
//下发校级模板页面
$(".downTempleteSpecimen").click(function(){
    var academyNumber= $(this).attr("data");
    var page=$("#currPage").val();
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看详情'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../templet/showCanDownTempletSpecimen?academyNumber='+academyNumber
        ,success: function(layero){
            layer.setTop(layero); //重点2
        },
        end: function(){
            window.location.href="../common/configTempletManageAcademySpecimen?currpage="+page;
        }
    });
    layer.full(win);
})
function deleteTemplet(templetUid){
    var myData={
        "templetUid":templetUid
    };
$.ajax({
    url:"../templet/deleteTemplet",
    type:'POST',
    async:false,
    data:myData,
    dataType: "json",
    success:function(data){//AJAX查询成功
        window.location.reload();
    },error:function(){
        alert("error");
    }
})
}
function deleteConfigTemplet(templetUid,templetType){
    var myData={
        "templetUid":templetUid,
        "templetType":templetType
    };
    $.ajax({
        url:"../templet/deleteConfigTemplet",
        type:'POST',
        async:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            window.location.reload();
        },error:function(){
            alert("error");
        }
    })
}
function deleteTempletSpecimen(templetUid){
    var myData={
        "templetUid":templetUid
    };
    $.ajax({
        url:"../templet/deleteTempletSpecimen",
        type:'POST',
        async:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            window.location.reload();
        },error:function(){
            alert("error");
        }
    })
}
//下发模板到院级
function downTemplet(configMachineTempletUid){
    var academyNumber=$("#academyNumber").val();
    var myData={
        "templetUid":configMachineTempletUid,
        "academyNumber":academyNumber
    };

    $.ajax({
        url:"../templet/downTemplet",
        type:'POST',
        async:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            if(data == "success"){
                alert("下发成功！");
            }
            if(data == "repeat"){
                alert("重复下发！");
            }
            window.location.reload();
        },error:function(){
            alert("error");
        }
    })
}
//批量推送弹窗显示
function instrumentListBasicSet(templetUid){
    var myData={
        "templetUid":templetUid,
    };
    $('#external-frame', window.parent.document).height(700);
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '批量推送设备',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['900px', '540px'],
            content:"../commonDevice/instrumentListBasicSet?templetUid="+templetUid+"&amp;currpage=1",
            end: function(){

            }
        });
    });
}
function instrumentListAccessType(templetUid){
    var myData={
        "templetUid":templetUid,
        };
    $('#external-frame', window.parent.document).height(700);
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '批量推送设备',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            data:myData,
            move:false,
            maxmin: false,
            area: ['900px', '540px'],
            content:"../commonDevice/instrumentListAccessType?templetUid="+templetUid+"&amp;currpage=1",
            end: function(){

            }
        });
    });
}
function instrumentListInAcademy(templetUid,type){
    var myData={
        "templetUid":templetUid,
        "type":type,

    };
    $('#external-frame', window.parent.document).height(700);
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '批量推送设备',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            data:myData,
            move:false,
            maxmin: false,
            area: ['900px', '540px'],
            content:"../commonDevice/instrumentListInAcademy?configMachineTemplet="+templetUid+"&amp;currpage=1&amp;type=specimen",
            end: function(){

            }
        });
    });
}
//下发模板到院级
function downTempletSpecimen(configSpecimenTempletUid){
    var academyNumber=$("#academyNumber").val();
    var myData={
        "templetUid":configSpecimenTempletUid,
        "academyNumber":academyNumber
    };

    $.ajax({
        url:"../templet/downTempletSpecimen",
        type:'POST',
        async:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            if(data == "success"){
                alert("下发成功！");
            }
            if(data == "repeat"){
                alert("重复下发！");
            }
            window.location.reload();
        },error:function(){
            alert("error");
        }
    })
}
$(".addTempleteBasicSet").click(function(){
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看详情'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../config/templetInstrumentBasicSet'
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})
$(".addTempleteAccessType").click(function(){
    var academyNumber = $(this).attr("data");
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看详情'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../config/templetInstrumentAccessType'
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})
$(".viewConfigTempleteBasicSet").click(function(){
    var data= $(this).attr("data");
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看详情'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../config/templetInstrumentBasicSet?templetUid='+data
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})
$(".viewConfigTempleteAccessType").click(function(){
    var data= $(this).attr("data");
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看详情'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../config/templetInstrumentAccessType?templetUid='+data
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})
function addConfigTempletOpenTime(rank){
    var startDates;
    var startTimes;
    var endDates;
    var endTimes;
    var weeks;
    var types;
        if(rank=='A'){
            startDates=document.getElementById("yearStart").value;
            startTimes=document.getElementById("timeStart").value;
            endDates=document.getElementById("yearEnd").value;
            endTimes=document.getElementById("timeEnd").value;
            weeks='weekday';
            types=document.getElementById("type").value;
        }
        if(rank=='B'){
            startDates=document.getElementById("yearStart1").value;
            startTimes=document.getElementById("timeStart1").value;
            endDates=document.getElementById("yearEnd1").value;
            endTimes=document.getElementById("timeEnd1").value;
            weeks='weekday1';
            types=document.getElementById("type1").value;
        }
    var options = $("#"+weeks).find("option");
    var len = options.length;
    var weekday="";
    var counter;
    for (counter in options) {
        if (options[counter].selected == true) {
            if (counter == 0) {
                counter = 7;
            }
            weekday += counter + ",";
        }

    }
    if(checkFilled(startDates,startTimes,endDates,endTimes,weekday)){
        if(CompareDate(startDates,endDates) || CompareHourAndMinutes(startTimes,endTimes)){
            alert("开始时间不能大于结束时间！");
        }else {

            var myData = {
                "startDate": startDates,
                "startTime": startTimes,
                "endDate": endDates,
                "endTime": endTimes,
                "weeks": weekday,
                "type": types,
                "rank": rank
            };
            $.ajax({
                url: "../common/addConfigTempletOpenTime",
                type: 'POST',
                async: false,
                data: myData,
                dataType: "json",
                success: function (data) {//AJAX查询成功
                    window.location.reload();
                }, error: function () {
                    alert("error");
                }
            })
        }
    }else{
        alert("请填写完整或输入有误！");
    }

}
function checkFilled(startDates,startTimes,endDates,endTimes,weekday){
    if(startDates=='' || startTimes=='' || endDates=='' || endTimes=='' || weekday==''){
        return false;
    }
    return true;
}
function deleteConfigTempletOpenTime(uid){
    var myData={
      "uid":uid
    };
    $.ajax({
        url:"../common/deleteConfigTempletOpenTime",
        type:'POST',
        async:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            window.location.reload();
        },error:function(){
            alert("error");
        }
    })
}
//比较日期大小
function CompareDate(d1, d2) {
    return ((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
}

//比较具体时间
function CompareHourAndMinutes(t1, t2) {
    if (!t1 || !t2) {
        alert("输入空");
    } else {
        var t11 = t1.split(":");
        var t21 = t2.split(":");
        if (t11[0] > t21[0]) {
            return true;
        } else {
            if (t11[0] == t21[0]) {
                if (t11[1] > t21[1]) {
                    return true;
                } else {
                    if (t11[1] == t21[1]) {
                        if (t11[2] >= t21[1]) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        }
    }
}