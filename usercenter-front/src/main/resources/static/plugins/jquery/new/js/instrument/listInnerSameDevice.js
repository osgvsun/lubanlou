
//保存设备
function saveInnerSameDevice(){
	var array=new Array();
	if ($("#queryDeviceNumber").val()!=null && $("#queryDeviceNumber").val()!='') {
		array.push($("#queryDeviceNumber").val()); //将选中的值 添加到 array中 
		//将要所有要添加的数据传给后台处理   Access
		window.location.href="../instrument/saveInnerSameDevice?deviceNumber="+$("#deviceNumber").val()+"&array="+array; 
		
	}else{
		alert("请至少选择一条记录");  
	}
}


/*如果选择学生输入，形成关联的选课数据的联动  */
$("#deviceName").coolautosuggest({
      url:"../instrument/coolSuggestDevice?deviceName=",
      onSelected:function(result){
          $("#deviceName").val(result.data);
          $("#queryDeviceNumber").val(result.id);
      }
});

/*仪器预约：输入仪器名称，编号，形成关联的选课数据的联动  */
$("#instrumentName1").coolautosuggest({
    url:"../instrument/coolSuggestDeviceApp?instrumentName1=",
    submitOnSelect:true,
    onSelected:function(result){
        $("#instrumentName1").val(result.data);
        $("#instrumentNumber").val(result.id);
    }
});
/*仪器预约：输入实验室名称*/
$("#labRoom").coolautosuggest({
    url:"../instrument/coolSuggestLabroomApp?labroom=",
    submitOnSelect:true,
    onSelected:function(result){
        $("#labRoom").val(result.data);
    }
});
/*仪器预约：输入中心名称*/
$("#center").coolautosuggest({
    url:"../instrument/coolSuggestCenterApp?center=",
    submitOnSelect:true,
    onSelected:function(result){
        $("#center").val(result.data);
    }
});
/*仪器预约：输入仪器名称，编号，形成关联的选课数据的联动  */
$("#instrumentName2").coolautosuggest({
    url:"../instrument/coolSuggestDeviceApp?instrumentName1=",
    onSelected:function(result){
        $("#instrumentName2").val(result.data);
        $("#instrumentNumber2").val(result.id);
    }
});

/*仪器预约：输入仪器型号，形成关联的选课数据的联动  */
$("#instrumentType").coolautosuggest({
    url:"../instrument/coolSuggestInstrumentType?instrumentType=",
    onSelected:function(result){
        $("#instrumentType").val(result.data);
    }
});

/*仪器预约：输入仪器编号，形成关联的选课数据的联动  */
$("#instrumentNumber").coolautosuggest({
    url:"../instrument/coolSuggestInstrumentNumber?instrumentNumber=",
    onSelected:function(result){
        $("#instrumentNumber").val(result.data);
    }
});

/*机时预约：输入老师关键字，形成关联的数据的联动  */
$("#teacher").coolautosuggest({
    url:"../instrument/coolSuggestInstrumentMachineAppTeacher?teacher=",
    onSelected:function(result){
        $("#teacher").val(result.data);
        $("#teacherUsername").val(result.username);
    }
});
/*输入用户关键字，形成关联的数据的联动 （页面不在instrument下） */
$("#tUser").coolautosuggest({
    url:"../../instrument/coolSuggestTUser?tUser=",
    onSelected:function(result){
        $("#tUser").val(result.data);
        $("#tUserUsername").val(result.username);
    }
});
$("#keepUser").coolautosuggest({
    url:"../instrument/coolSuggestInstrumentMachineAppTeacher?teacher=",
    onSelected:function(result){
        $("#keepUser").val(result.data);
        $("#keepUserUsername").val(result.username);
    }
});
/*房间*/
$("#systemRoom").coolautosuggest({
    url:"../instrument/coolSuggestSystemroomApp?systemroom=",
    submitOnSelect:true,
    onSelected:function(result){
        $("#systemRoom").val(result.data);
    }
});
/*楼房*/
$("#systemBuild").coolautosuggest({
    url:"../instrument/coolSuggestSystembuildApp?systembuild=",
    submitOnSelect:true,
    onSelected:function(result){
        $("#systemBuild").val(result.data);
    }
});
/*机时预约：输入部门关键字，形成关联的数据的联动  */
$("#department").coolautosuggest({
    url:"../instrument/fingDepartmentByKey?department=",
    onSelected:function(result){
        $("#department").val(result.data);
        $("#departmentNumber").val(result.academyNumber);
    }
});
$("#academyMemo").coolautosuggest({
    url:"../instrument/fingAcademyMemoByKey?academyMemo=",
    onSelected:function(result){
        $("#academyMemo").val(result.data);
        $("#academyMemoNumber").val(result.labRoomId);
    }
});
//页面不在instrument下的查询学院
$("#schoolAcademy").coolautosuggest({
    url:"../../instrument/fingDepartmentByKey?department=",
    onSelected:function(result){
        $("#schoolAcademy").val(result.data);
        $("#schoolAcademyNumber").val(result.academyNumber);
    }
});
//设备管理员
$("#equipmentAdmin").coolautosuggest({
    url:"../../instrument/fingEquipmentAdmintByKey?equipmentAdmin=",
    onSelected:function(result){
        $("#instrumentManager").val(result.data);
        $("#instrumentManager").val(result.username);
    }
});

//AJAX预约前验证
function Access(id){
    targetDeviceId = id;
    var pUid = "";
    pUid = $("#pAppUid").val();
    $.ajax({
        url:"../common/securityAccess",
        type:"GET",
        dataType:"TEXT",
        success:function(data) {//AJAX查询成功
            if (data == "unAccessTest") {
                alert("尚未通过统一准入考试，无法预约");
                return false;
            } else if (data == "unAccessTestWithTestOverdueTime") {
                alert('您还未通过考试且考试时间已截至，请联系相关老师解决!')
                return false;
            } else if (data == "success") {
                $.ajax({
                    url: "../instrument/securityAccess?id=" + id,
                    type: "GET",
                    dataType: "TEXT",
                    success: function (data) {//AJAX查询成功
                        if (data == "noMachineConfig") {
                            alert("没有设置机时预约相关参数，请联系管理员设置后再预约！");
                        } else {
                            if (data == "success" || data == "isRead" || data == "isManager" || data == "") {
                                //项目预约的机时预约
                                if (pUid != "" && typeof(pUid) != "undefined") {
                                    window.location.href = '../instrument/doInstrumentMachineApp?insUid=' + id + '&pUid=' + pUid;
                                } else {//普通机时预约
                                    window.location.href = "../instrument/doInstrumentMachineApp?insUid=" + id;
                                }
                            } else if (data == "error") {
                                layer.msg('您还未通过培训,请先预约培训!', {
                                    time: 0 //不自动关闭
                                    , btn: ['去预约培训', '先不预约了']
                                    , yes: function (index) {
                                        layer.close(index);
                                        window.location.href = "../config/viewInstrumentTrainingForApp?currpage=1&insUid=" + id;
                                    }
                                    , btn2: function () {
                                        return;
                                    }
                                });
                            } else if (data == "noManager") {
                                alert("该设备还未添加设备管理员，暂不能预约，请联系相关人员进行添加！");
                            } else if (data == "isBlack") {
                                alert("您已被加入黑名单，暂不能预约，请联系相关人员！");
                            } else if (data == "inTraining") {
                                alert("您已在培训中，通过培训后方可预约！");
                            } else if (data == "lowScore") {
                                alert("您的信誉积分不足，无法预约！");
                            } else if (data == "notAcademy") {
                                alert("该设备未对您所在的学院开放预约，请联系相关人员！");
                            } else if (data == "unAccessTest") {
                                layer.msg('您还未通过考试,请先通过考试!', {
                                    time: 0 //不自动关闭
                                    , btn: ['去参加', '先不预约了']
                                    , yes: function (index) {
                                        layer.close(index);
                                        window.location.href = "../config/viewInstrumentTest?insUid=" + id;
                                    }
                                    , btn2: function () {
                                        return;
                                    }
                                });
                            }
                            else {
                                layer.msg(data, {
                                    time: 0 //不自动关闭
                                    , btn: ['我已阅读，去预约', '先不预约了']
                                    , yes: function (index) {
                                        layer.close(index);
                                        window.location.href = "../instrument/doInstrumentMachineApp?insUid=" + id;
                                    }
                                    , btn2: function () {
                                        return;
                                    }
                                });
                            }
                        }
                    }
                })
            }
        }
    })
}
//AJAX预约前验证
function AccessSpeci(id){
    targetDeviceId = id;
    var flag=false;
    var pUid = "";
    pUid = $("#pAppUid").val();
    $.ajax({
        url:"../instrument/isSpecimenExist?id="+id,
        type:"GET",
        dataType:"TEXT",
        success:function(data) {//AJAX查询成功
            if (data == "noSpecimenConfig") {
                alert("没有设置送样检测相关参数，请联系管理员设置后再预约！");
                flag = false;
            } else if (data == "success") {
                if (pUid != "" && typeof(pUid) != "undefined") {
                    window.location.href = '../instrument/doInstrumentSpecimenApp?insUid=' + id + '&pUid=' + pUid;
                } else {//普通送样检测
                    window.location.href = "../instrument/doInstrumentSpecimenApp?insUid=" + id;
                }
                flag = true;
            } else if (data == "exam") {//需要通过考试
                $.ajax({
                    url: "../instrument/isPassExam?insUid=" + id,
                    type: "GET",
                    dataType: "TEXT",
                    success: function (result) {//AJAX查询成功
                        if (result == "unAccessTest") {
                            layer.msg('您还未通过考试,请先通过考试!', {
                                time: 0 //不自动关闭
                                , btn: ['去参加', '先不预约了']
                                , yes: function (index) {
                                    layer.close(index);
                                    window.location.href = "../config/viewInstrumentTest?insUid=" + id;
                                }
                                , btn2: function () {
                                    return;
                                }
                            });
                        } else if (result == "unifyunAccessTestWithTestOverdueTime") {
                            alert('您还未通过考试且考试时间已截至，请联系相关老师解决!');
                            return false;
                        }else if(result=="unifyunAccessTest"){
                            alert("尚未通过统一准入考试，无法预约");
                            return false;
                        }
                        else if(result == "success"){
                            if (pUid != "" && typeof(pUid) != "undefined") {
                                window.location.href = '../instrument/doInstrumentSpecimenApp?insUid=' + id + '&pUid=' + pUid;
                            } else {//普通送样检测
                                window.location.href = "../instrument/doInstrumentSpecimenApp?insUid=" + id;
                            }
                            flag = true;
                        }
                    }
                })
            }
        }
    })
    return flag;
}
//AJAX预约前验证
function AccessSpeciForSharing(id){
    targetDeviceId = id;
    $.ajax({
        url:"../website/isLogin",
        type:"GET",
        dataType:"TEXT",
        success:function(data){//AJAX查询成功
            if(data=="success"){
                $.ajax({
                    url:"../instrument/isSpecimenExist?id="+id,
                    type:"GET",
                    dataType:"TEXT",
                    success:function(data){//AJAX查询成功
                        if(data=="noSpecimenConfig"){
                            alert("没有设置送样检测相关参数，请联系管理员设置后再预约！");
                        }else{
                            // window.location.href= "../website/doInstrumentSpecimenApp?insUid="+id;
                            window.location.href="../instrument/doInstrumentSpecimenApp?insUid="+id;
                        }
                    }
                })
            }else{
                alert("没有登陆,请先进行登陆！");
            }
        }

    })
}
//AJAX预约前验证
function AccessForSharing(id){
    targetDeviceId = id;
    $.ajax({
        url:"../common/securityAccess",
        type:"GET",
        dataType:"TEXT",
        success:function(data){//AJAX查询成功
            if (data == "unAccessTest") {
                alert("尚未通过统一准入考试，无法预约");
                return false;
            } else if(data == "unAccessTestWithTestOverdueTime"){
                alert('您还未通过考试且考试时间已截至，请联系相关老师解决!')
                return false;
            }else if(data=="success"){

                $.ajax({
                    url:"../instrument/securityAccess?id="+id,
                    type:"GET",
                    dataType:"TEXT",
                    success:function(data){//AJAX查询成功
                        if(data=="noMachineConfig"){
                            alert("没有设置机时预约相关参数，请联系管理员设置后再预约！");
                        }else{
                            if(data=="success"){
                                window.location.href= "../website/doInstrumentMachineApp?insUid="+id;
                                // window.location.href="../instrument/doInstrumentMachineApp?insUid="+id;
                            }else if(data=="error"){
                                layer.msg('您还未通过培训,请先预约培训!', {
                                    time: 0 //不自动关闭
                                    ,btn: ['去预约培训', '先不预约了']
                                    ,yes: function(index){
                                        layer.close(index);
                                        window.location.href= "../website/viewInstrumentTrainingForApp?currpage=1&insUid="+id;
                                    }
                                });
                            }else if(data=="noManager"){
                                alert("该设备还未添加设备管理员，暂不能预约，请联系相关人员进行添加！");
                            }else if(data=="isBlack"){
                                alert("您已被加入黑名单，暂不能预约，请联系相关人员！");
                            }else if(data=="isRead" || data=="isManager"|| data==""){
                                // window.location.href= "../website/doInstrumentMachineApp?insUid="+id;
                                window.location.href="../instrument/doInstrumentMachineApp?insUid="+id;
                            }else if(data=="inTraining"){
                                alert("您已在培训中，通过培训后方可预约！");
                            }else if(data=="lowScore"){
                                alert("您的信誉积分不足，无法预约！");
                            }else if(data=="notAcademy"){
                                alert("该设备未对您所在的学院开放预约，请联系相关人员！");
                            } else if (data == "unAccessTest") {
                                layer.msg('您还未通过考试,请先通过考试!', {
                                    time: 0 //不自动关闭
                                    , btn: ['去参加', '先不预约了']
                                    , yes: function (index) {
                                        layer.close(index);
                                        window.location.href = "../config/viewInstrumentTest?insUid=" + id;
                                    }
                                    , btn2: function () {
                                        return;
                                    }
                                });
                            }else{
                                layer.msg(data, {
                                    time: 0 //不自动关闭
                                    ,btn: ['我已阅读，去预约', '先不预约了']
                                    ,yes: function(index){
                                        layer.close(index);
                                        window.location.href= "../website/doInstrumentMachineApp?insUid="+id;
                                        // window.location.href="../instrument/doInstrumentMachineApp?insUid="+id;
                                    }
                                });
                            }
                        }

                    }
                })
            }else{
                alert("没有登陆,请先进行登陆！");
            }
        }
    })
}

var authorityId = $("#authorityId").val();
//权限管理模块—添加人员
$("#tUserByAuthority").coolautosuggest({
    url:"../../common/coolSuggestTUserByAuthority?authorityId="+authorityId+"&tUser=",
    onSelected:function(result){
        $("#tUserByAuthority").val(result.data);
        $("#tUserUsername").val(result.username);
    }
});

