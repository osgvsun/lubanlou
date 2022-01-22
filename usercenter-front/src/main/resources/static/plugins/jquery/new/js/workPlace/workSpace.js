/**
 * Created by Administrator on 2017/8/22.
 */
var firstAuditNames=$('#firstAuditName');
//信誉积分
function showCredit(){
    $('#external-frame', window.parent.document).height(700);
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '信誉积分',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['1000px', '420px'],
            content: '../tUser/showCredit',
            end: function(){
                //search()
            }
        });
    });
}
//抢培训
function showTrainingList(){
    $('#external-frame', window.parent.document).height(700);
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '最近培训',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['1000px', '420px'],
            content: '../tUser/showTrainingList',
            end: function(){
                //search()
            }
        });
    });
}
//收藏more
function showCollections(){
    $('#external-frame', window.parent.document).height(700);
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '我的收藏',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['1000px', '420px'],
            content: '../tUser/showCollections',
            end: function(){
                //search()
            }
        });
    });
}
function getMessages(viewMessageList){
    var needRefresh=false;
    for(var i=0;i<viewMessageList.length;i++){
        alert(viewMessageList[parseInt(i)].content);
        needRefresh=true;
    }
    return needRefresh;
}
//标题
function createTitle(tableName){
    var titleTr="<tr></tr>";
    var titleTh;
    if(tableName=='item'){
        titleTh="<th>来源</th><th>标题</th><th>发送人</th><th>流程已用时</th><th>承办时间</th><th>查看</th>";
    }
    if(tableName=='flow'){
        titleTh="<th>来源</th><th>标题</th><th>当前步骤</th><th>流程已用时</th><th>创建时间</th><th>操作</th>";
    }
    var $titleTr = $(titleTr);
    $titleTr.append($(titleTh));
    $('#'+tableName).empty();
    $('#'+tableName).append($titleTr);
}
function    createContent(tableName,type,currpage){
    //待办事项
    if(tableName == 'item'){
        if(type == 'todo' || type == 'done'){
            getNonSchoolApp(tableName,type,currpage);
            // getPriceConfirm(tableName,type,currpage);
            getAppList(tableName,type,currpage);
            getTotalPageAndRecords(tableName,type);
        }
    }
    if(tableName == 'flow'){
        // getPriceConfirm(tableName,type,currpage);
        getAppList(tableName,type,currpage);
        if(currpage==1) {
            getAccess(tableName, type, currpage);
        }
        getTotalPageAndRecords(tableName,type);
    }
}
//生成table
/**
 *
 * @param tableName item：待办事项那里的    flow：流程跟踪
 * @param type todo(待办事项) done（已办事项）tracking（流程跟踪） done(办结流程)
 */
function initTable(tableName,type,currpage){
    createTitle(tableName);
    createContent(tableName,type,currpage)
    changePageSelect(tableName,currpage);
}
//得到计费的记录
function getPriceConfirm(tableName,type,currpage){
    var myData={
        "tableName":tableName,
        "type":type,
        "currpage":currpage
    };
    $.ajax({
        url:"../workspace/getPriceConfirm",
        type:'POST',
        async:false,
        data:myData,
        dataType: "json",
        success:function(dataList){
            //循环得到的list
            for(var data in dataList){
                var i=parseInt(data);
                //序列化jsonObject
                var obj = JSON.stringify(dataList[i].params);
                //转为js识别的jsonObject
                var jsonObj = JSON.parse(JSON.stringify(dataList[i].params));
                var event;
                if(tableName=='item'){
                    if(type == 'todo'){
                        var confirmType=jsonObj.confirmType;
                        if(confirmType=="student"){
                            event="<a style='cursor: pointer' onclick='alterAppCharge(&apos;"+jsonObj.uid+"&apos;)'>学生有异议</a>";

                        }
                        else if(confirmType=="teacher"){
                            event="<a style='cursor: pointer' onclick='alterAppCharge(&apos;"+jsonObj.uid+"&apos;)'>firstAuditNames+有异议</a>";
                        }else{
                            event="<a style='cursor: pointer' onclick='operation(&apos;"+jsonObj.uid+"&apos;,&apos;priceConfirm&apos;,1,"+obj+",this)'>同意</a>&nbsp;<a onclick='operation(&apos;"+jsonObj.uid+"&apos;,&apos;priceConfirm&apos;,2,"+obj+",this)'>有异议</a>";

                        }
                    }
                    if(type == 'done'){
                        event='<a style="cursor: pointer" onclick="viewAppCharges(&apos;'+jsonObj.appUid+'&apos;)" >查看</a>';
                    }
                }
                if(tableName=='flow'){
                    var stage=jsonObj.stage;
                    if(parseInt(stage)>=2){
                        event='<a style="cursor: pointer" onclick="viewPayment(&apos;'+jsonObj.appUid+'&apos;)" >查看</a>';
                    }else{
                        event='<a style="cursor: pointer" onclick="viewAppCharges(&apos;'+jsonObj.appUid+'&apos;)" >查看</a>';
                    }

                }

                appendTable(tableName,type,dataList[i].tdString1,dataList[i].tdString2,dataList[i].tdString3,dataList[i].tdString4,dataList[i].tdString5,event,jsonObj);
            }
        },error:function(){
            console.log("未知错误，可能原因是该用户学院不存在");
        }
    })
}
//得到计费的记录
function getAppList(tableName,type,currpage){
    var myData={
        "tableName":tableName,
        "type":type,
        "currpage":currpage
    };
    $.ajax({
        url:"../workspace/getAppList",
        type:'POST',
        async:false,
        data:myData,
        dataType: "json",
        success:function(dataList){
            for(var data in dataList){
                var i=parseInt(data);
                var obj = JSON.stringify(dataList[i].params);
                var jsonObj = JSON.parse(JSON.stringify(dataList[i].params));
                var event;
                if(tableName=='item'){
                    if(type == 'todo'){
                        var stage=jsonObj.stage;
                        if(jsonObj.reType=='SpecimenApp'||jsonObj.reType=='ProjectSpecimen'){
                            if(parseInt(stage)<2){
                                event="<a style='cursor: pointer' onclick='operation(&apos;"+jsonObj.uid+"&apos;,&apos;net.app&apos;,&apos;pass&apos;,"+obj+",this)'>同意</a>&nbsp;<a style='cursor: pointer' onclick='operation(&apos;"+jsonObj.uid+"&apos;,&apos;net.app&apos;,&apos;fail&apos;,"+obj+",this)'>拒绝</a>";
                            }else{
                                if(parseInt(stage)==2){
                                    //接样
                                    event='<a style="cursor: pointer" onclick="confirmSpecimen(&apos;'+jsonObj.uid+'&apos;)" >确认接样</a>';
                                }
                                if(parseInt(stage)==3){
                                    //分发
                                    event='<a style="cursor: pointer" onclick="allocateSpecimen(&apos;'+jsonObj.uid+'&apos;)" >分发</a>';
                                }
                                if(parseInt(stage)==4){
                                    //分发
                                    event='<a style="cursor: pointer" onclick="confirmFinishSpecimen(&apos;'+jsonObj.uid+'&apos;)" >确认检测完成</a>';
                                }
                            }
                        }else if(jsonObj.reType=='MachineApp'||jsonObj.reType=='ProjectMachine'){
                            event="<a style='cursor: pointer' onclick='operation(&apos;"+jsonObj.uid+"&apos;,&apos;net.app&apos;,&apos;pass&apos;,"+obj+",this)'>同意</a>&nbsp;<a style='cursor: pointer' onclick='operation(&apos;"+jsonObj.uid+"&apos;,&apos;net.app&apos;,&apos;fail&apos;,"+obj+",this)'>拒绝</a>";
                        }else if(jsonObj.type=='SpecimenApp'){
                            event="<a style='cursor: pointer' onclick='operation(&apos;"+jsonObj.uid+"&apos;,&apos;priceConfirm&apos;,1,"+obj+",this)'>同意</a>&nbsp;<a onclick='operation(&apos;"+jsonObj.uid+"&apos;,&apos;priceConfirm&apos;,2,"+obj+",this)'>有异议</a>";
                        }else if(jsonObj.type=='MachineApp'){
                            event="<a style='cursor: pointer' onclick='operation(&apos;"+jsonObj.uid+"&apos;,&apos;priceConfirm&apos;,1,"+obj+",this)'>同意</a>&nbsp;<a onclick='operation(&apos;"+jsonObj.uid+"&apos;,&apos;priceConfirm&apos;,2,"+obj+",this)'>有异议</a>";
                        }

                    }
                    if(type == 'done'){
                        if(jsonObj.reType == 'MachineApp' || jsonObj.reType == 'ProjectMachine'){
                            event='<a style="cursor: pointer" onclick="viewReservation(&apos;'+jsonObj.uid+'&apos;)" >查看</a>';
                        }else{
                            event='<a style="cursor: pointer" onclick="viewReservationSpecimen(&apos;'+jsonObj.uid+'&apos;)" >查看</a>';
                        }

                    }
                }
                if(tableName=='flow'){
                    if(jsonObj.reType == 'MachineApp'||jsonObj.reType == 'ProjectMachine'){
                        event='<a style="cursor: pointer" onclick="viewReservation(&apos;'+jsonObj.uid+'&apos;)" >查看</a>';
                    }else if(jsonObj.reType == 'SpecimenApp'||jsonObj.reType == 'ProjectSpecimen'){
                        event='<a style="cursor: pointer" onclick="viewReservationSpecimen(&apos;'+jsonObj.uid+'&apos;)" >查看</a>';
                    }
                    else if(jsonObj.type == 'MachineApp'||jsonObj.type == 'SpecimenApp'){
                        event='<a style="cursor: pointer" onclick="viewPayment(&apos;'+jsonObj.appUid+'&apos;)" >查看</a>';
                    }
                }
                appendTable(tableName,type,dataList[i].tdString1,dataList[i].tdString2,dataList[i].tdString3,dataList[i].tdString4,dataList[i].tdString5,event,jsonObj);
            }
        },error:function(){
            console.log("未知错误，可能原因是该用户学院不存在");
        }
    })
}

//得到计费的记录
function getNonSchoolApp(tableName,type,currpage){
    var myData={
        "tableName":tableName,
        "type":type,
        "currpage":currpage
    };
    $.ajax({
        url:"../workspace/getNonSchoolApp",
        type:'POST',
        async:false,
        data:myData,
        dataType: "json",
        success:function(dataList){
            for(var data in dataList){
                var i=parseInt(data);
                var obj = JSON.stringify(dataList[i].params);
                var jsonObj = JSON.parse(JSON.stringify(dataList[i].params));
                var event;
               if(tableName=='item'){
                    if(type == 'todo'){
                        event="<a style='cursor: pointer' onclick='operation(&apos;"+jsonObj.uid+"&apos;,&apos;NonSchoolApp&apos;,1,"+obj+",this)'>仪器预约</a>";
                    }
                    if(type == 'done'){
                        //event='<a style="cursor: pointer" onclick="viewReservation(&apos;'+jsonObj.uid+'&apos;)" >查看</a>';

                           // event='<a style="cursor: pointer" onclick="viewReservationSpecimen(&apos;'+jsonObj.uid+'&apos;)" >查看</a>';

                    }
                }
                appendTable(tableName,type,dataList[i].tdString1,dataList[i].tdString2,dataList[i].tdString3,dataList[i].tdString4,dataList[i].tdString5,event,jsonObj);
            }

        },error:function(){
            console.log("未知错误，可能原因是该用户学院不存在");
        }
    })
}
//仪器准入
function getAccess(tableName,type){
    var myData={
        "tableName":tableName,
        "type":type
    };
    $.ajax({
        url:"../workspace/getAccess",
        type:'POST',
        async:false,
        data:myData,
        dataType: "json",
        success:function(dataList){
            for(var data in dataList){
                var i=parseInt(data);
                var obj = JSON.stringify(dataList[i].params);
                var jsonObj = JSON.parse(JSON.stringify(dataList[i].params));
                var event="";
                appendTable(tableName,type,dataList[i].tdString1,dataList[i].tdString2,dataList[i].tdString3,dataList[i].tdString4,dataList[i].tdString5,event,jsonObj);
            }
        },error:function(){
            console.log("未知错误，可能原因是该用户学院不存在");
        }
    })
}
//将相应参数append到相应的table中
function appendTable(tableName,type,tdString1,tdString2,tdString3,tdString4,tdString5,tdString6,obj) {
    var params=obj;
    var tr="<tr id='"+params.uid+"'></tr>";
    var td1="<td>"+tdString1+"</td>";
    var td2="<td>"+tdString2+"</td>";
    var td3="<td>"+tdString3+"</td>";
    var td4="<td>"+tdString4+"</td>";
    var td5="<td>"+tdString5+"</td>";
    var td6="<td>"+tdString6+"</td>";
    var $tr = $(tr);
    $tr.append($(td1));
    $tr.append($(td2));
    $tr.append($(td3));
    $tr.append($(td4));
    $tr.append($(td5));
    $tr.append($(td6));
    $('#'+tableName).append($tr);
}
/**
 * Description 同意或拒绝的ajax
 * @param uid 被操作的记录的uid
 * @param operationType 记录类型  priceConfirm：费用确认
 * @param isAgree 1 同意 2 拒绝
 */
function operation(uid,operationType,isAgree,params,obj){
    if(operationType == 'priceConfirm'){
        var reTypes=params.type;
        var sequenceLasts=params.sequence;
        var appUids=params.appUid;
        var actualCharges=params.confirmCharge;
        var confirmType;
        if(params.confirmType == "manager") {
            confirmType="resUser";
        }
        if(params.confirmType == "resUser") {
            confirmType="teacher";
        }
        if(params.confirmType == "teacher") {
            confirmType="manager";
        }
        if(isAgree == '1'){
            var myData= {
                "reType":reTypes,
                "appUid":appUids,
                "sequenceLast":sequenceLasts,
                "confirmType":confirmType,
                "actualCharge":actualCharges
            };
            $.ajax({
                url:"../instrument/saveConfirmCharge",
                type:'POST',
                async:false,
                data: myData,
                dataType: "json",
                success:function() {
                    alert("成功确认收费！");
                    $('#'+uid).fadeOut(2000);
                },error:function(){
                    alert("出错啦！");
                }
            });
        }else{
            var myData= {
                "reType":reTypes,
                "appUid":appUids,
                "sequenceLast":sequenceLasts,
                "confirmType":confirmType,
                "actualCharge":actualCharges,
                "reason":"默认"
            };
            $.ajax({
                url:"../instrument/saveObjection",
                type:'POST',
                async:false,
                data: myData,
                dataType: "json",
                success:function() {
                    alert("成功提交异议！");
                    $('#'+uid).fadeOut(2000);
                },error:function(){
                    alert("出错啦！");
                }
            });
        }
    }
    if(operationType == 'app'){
        var auditChecked=isAgree;
        var remarks="默认";
        var currAuditLevel=params.auditLevelName;
        var myData={
            "auditChecked":auditChecked,
            "remarks":remarks,
            "currAuditLevel":currAuditLevel
        };
        var url;
        if(params.reType == 'ProjectMachine' || params.reType == 'MachineApp'){
            url="../instrument/saveProjectMachineAudit?uid="+uid;
        }else{
            url="../instrument/saveProjectSpecimenAudit?uid="+uid;
        }
        $.ajax({
            url:url,
            type: 'POST',
            async:false,
            data:myData,
            success:function() {
                if(isAgree == "pass"){
                    alert("已提交同意请求");
                }else{
                    alert("已提交拒绝请求");
                }
                $('#'+uid).fadeOut(2000);
            },error:function(){
                alert("出错啦！");
            }
        });
    }

    if(operationType == 'NonSchoolApp'){
        //var id = params.instrumentSpecimenNonschoolId;
        var id = params.instrumentId;
        var nonschoolAppUid = params.uid;
        window.location.href = "../instrument/doInstrumentMachineApp?insUid="+id+"&nonschoolAppUid="+nonschoolAppUid;
    }
    $(obj).removeAttr("onclick");
}
//appendTable(tableName,type,tdString1,tdString2,tdString3,tdString4,tdString5,tdString6);
// function getPriceConfirm(){
// var tdString1="";
// var tdString2="";
// var tdString3="";
// var tdString4="";
// var tdString5="";
// var tdString6="";
//     var myData={
//     }
//     $.ajax({
//         url:"../workspace/",
//         type:'POST',
//         async:false,
//         data:myData,
//         dataType: "json",
//         success:function(data){
//         },error:function(){
//             alert("未知错误");
//         }
//     })
// }
//查看页面
function viewAppCharges(uid){
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
        ,content: '../instrument/viewAppCharge?uid='+uid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
};
function viewReservation(uid){
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
        ,content: '../instrument/projectMachineAudit?uid='+uid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
};
function viewReservationSpecimen(uid){
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
        ,content: '../instrument/projectSpecimenAudit?uid='+uid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
};
function confirmSpecimen(uid){
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看详情'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../instrument/confirmSpecimen?uid='+uid
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
};
function allocateSpecimen(uid){
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看详情'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../instrument/allocateSpecimen?uid='+uid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
};
function confirmFinishSpecimen(uid){
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
        ,content: '../instrument/confirmFinishSpecimen?uid='+uid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
};
function alterAppCharge(uid) {
    var myData;
    $.ajax({
        url:"../workspace/getAppUidFromChargeAuditUid?uid="+uid,
        type:'POST',
        async:false,
        data:myData,
        dataType: "json",
        success:function(appUid){
            uid=appUid;
        },error:function(){
            alert("发生未知错误");
        }
    })
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
        ,content: '../instrument/alterAppCharge?uid='+uid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
};
function viewPayment(uid){
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
        ,content: '../instrument/viewPayment?uid='+uid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
};
function nexPage(tableName) {
    //获取当前页码
    var currpage = parseInt($("#"+tableName+"PageController").attr("currpage"));
    //获取最后一页
    var totalPage = parseInt($("#"+tableName+"TotalPage").text());
    //是否是最后一页
    if (currpage!=totalPage){
        $("#"+tableName+"PageController").attr("currpage",currpage+1);
        initTable(tableName,$("#"+tableName+"PageController").attr("type"),currpage+1);
    }
}
function prevPage(tableName) {
    //获取当前页码
    var currpage = parseInt($("#"+tableName+"PageController").attr("currpage"));
    //是否是第一页
    if (currpage!=1){
        $("#"+tableName+"PageController").attr("currpage",currpage-1);
        initTable(tableName,$("#"+tableName+"PageController").attr("type"),currpage-1);
    }
}
function firstPage(tableName) {
    $("#"+tableName+"PageController").attr("currpage","1");
    initTable(tableName,$("#"+tableName+"PageController").attr("type"),"1");
}
function lastPage(tableName) {
    //获取最后一页
    var totalPage = parseInt($("#"+tableName+"TotalPage").text());
    $("#"+tableName+"PageController").attr("currpage",totalPage);
    initTable(tableName,$("#"+tableName+"PageController").attr("type"),totalPage);
}
function changePageSelect(tableName,currpage) {
    //通过tablename获取到select标签
    var theSelect = $("#"+tableName+"Select");
    //清空标签
    theSelect.empty();
    //把当前选择的页码放入
    theSelect.append("<option selected='selected' value='"+currpage+"'>"+currpage+"</option>");
    //获取总页数
    var totalPage = parseInt($("#"+tableName+"TotalPage").text());
    //剩余页码放入select
    for(var i= 0;i<totalPage;i++){
        if(i!=(currpage-1)){
            theSelect.append("<option value='"+(i+1)+"' >"+(i+1)+"</option>");
        }
    }
}
function goPage(tableName) {
    //获取当前选中的值
    var thePage = parseInt($("#"+tableName+"Select").val());
    //设置值
    $("#"+tableName+"PageController").attr("currpage",thePage);
    initTable(tableName,$("#"+tableName+"PageController").attr("type"),thePage);
}
function getTotalPageAndRecords(tableName,type) {
    var myData={
        "tableName":tableName,
        "type":type,
    };
    $.ajax({
        url:"../workspace/getTotalPageAndRecords",
        type:'POST',
        async:false,
        data:myData,
        dataType: "json",
        success:function(dataList){
            if(tableName=="item"){
                if(dataList.totalPage==0){
                    $("#itemTotalPage").text(1);
                }else{
                    $("#itemTotalPage").text(dataList.totalPage);
                }
                $("#itemRecords").text(dataList.records);
                $("#itemPageController").attr("type",type);
            }
            if(tableName=="flow"){
                if(dataList.totalPage==0){
                    $("#flowTotalPage").text(1);
                }else {
                    $("#flowTotalPage").text(dataList.totalPage);
                }
                $("#flowRecords").text(dataList.records);
                $("#flowPageController").attr("type",type);
            }
        }
    });
}
// 消息平台删掉消息，并改变状态为已读
function clearSelf(id) {
    $.ajax({
        url:"../tUser/changeMessageState",
        type:'POST',
        async:false,
        data:{"id":id},
        dataType: "text",
        success:function (e) {
            if(e == 'success'){
                $("#info"+id).remove();
                var records = $("#UnreadInfoRecord").text();
                $("#UnreadInfoRecord").text(records-1);
            }
            else {
                alert('发生错误！');
            }
        },
        error:function (e) {
            alert(e);
        }
    });
}
// 消息平台删掉消息，并改变状态为已读
// function clearSelf(id,uid,messageType) {
//     $.ajax({
//         url:"../tUser/changeMessageState",
//         type:'POST',
//         async:false,
//         data:{"uid":uid},
//         dataType: "text",
//         success:function (e) {
//             if(e == 'success'){
//                 $("#info"+id).remove();
//                 var records = $("#UnreadInfoRecord").text();
//                 $("#UnreadInfoRecord").text(records-1);
//                 switch (messageType) {
//                     case 'message_machineApp':
//                         openMachineAudit(id);
//                         break;
//                     case 'message_specimenApp':
//                         openSpecimenAudit(id);
//                         break;
//                     default:
//                         break;
//                 }
//             }
//             else {
//                 alert('发生错误！');
//             }
//         },
//         error:function (e) {
//             alert(e);
//         }
//     });
// }

function openMachineAudit(uid) {
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
        ,content: '../instrument/projectMachineAudit?uid='+uid
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
}
function openSpecimenAudit(uid) {
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
        ,content: '../instrument/projectSpecimenAudit?uid='+uid
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
}