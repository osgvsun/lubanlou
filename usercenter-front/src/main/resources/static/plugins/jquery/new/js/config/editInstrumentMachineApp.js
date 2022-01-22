//新增收费项目
function newInstrumentMachineItem(insUid){
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2, //此处以iframe举例
        title: '新增收费项',
        shade: 0,
        maxmin: true,
        offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ],
        content: '../jsutMachine/newInstrumentMachineItem?insUid='+insUid,
        success: function(layero){
            layer.setTop(layero); //重点2
        },
        end:function () {
            var templetFlag=$("#templetFlag").val();
            if(templetFlag==false){
                window.location.href="../config/editInstrumentMachineApp?insUid="+insUid;
            }
            else{
                window.location.href="../config/editInstrumentMachineApp?insUid="+'testInstrument'+"&machineTempletId="+machineTempletId;
            }
        }
    });
    layer.full(win);
}

function addAppInformationField(uid) {
    var fieldName = $("#fieldName").val();
    var necessary = $("input[name='necessary']:checked").val();
    var note = $("#note").val();
    if(fieldName==null || fieldName == ""){
        alert('字段名不能为空');
        return;
    }
    var myData = {
        "instrumentUid": uid,
        "fieldName": fieldName,
        "necessary": necessary,
        "note": note
    }
    $.ajax({
        url: "../config/appInformationField",
        type: 'POST',
        async: false,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(myData),
        success: function (data) {
            var json = JSON.parse(data);

            var tr = "<tr id='"+json.uid+"'></tr>";

            var yesOrNo = "是";
            if(json.necessary == '0'){
                yesOrNo = '否';
            }
            var td1 = "<td>"+json.fieldName+"</td>";
            var td2 = "<td>"+yesOrNo+"</td>";
            var td3 = "<td>"+json.note+"</td>";
            var td4 = "<td><a class='fa fa-trash-o ml10' onclick='deleteAppInformationField('"+json.uid+"')'></a></td>";

            var td = td1 + td2 +td3 +td4;

            var $tr = $(tr);
            $tr.append($(td));

            $("#appInformationField").append($tr);

            $("#fieldName").val('');
            $("#note").val('');

            alert('添加成功');

        },
        error:function () {
            alert("程序出错");
        }
    });
}
function deleteAppInformationField(uid) {

    $.ajax({
        url: "../config/deleteAppInformationField?uid="+uid,
        type: 'get',
        async: false,
        success: function (data) {
            $('#'+uid).remove();
            alert('删除成功');
        },
        error:function () {
            alert("程序出错");
        }
    });
}

//机时预约最上部分判空判错
function isWritten() {
    //正则
    //正浮点数
    var floatWithoutZero = /^(?!0+(\.0+)?$)\d+(\.\d+)?$/;
    //非负整数
    var numberWithZero = /^\d+$/;
    //非负浮点数
    var floatWithZero = /^\d+(\.\d+)?$/;

    //最小提前预约时间
    var minAheadHour = document.getElementById("minAheadHour").value;
    if (!(numberWithZero.test(minAheadHour)) || minAheadHour == "") {
        alert("请正确输入最少提前预约时间！");
        return false;
    }
    //最大提前预约时间
    var maxAheadHour = document.getElementById("maxAheadHour").value;
    if (!(numberWithZero.test(maxAheadHour)) || maxAheadHour == "") {
        alert("请正确输入最大提前预约时间！");
        return false;
    }
    if (parseInt(maxAheadHour) <= parseInt(minAheadHour)) {
        alert("最大提前预约时间比最少提前预约时间小或相等，请重新输入！");
        return false;
    }
    //预约最小时间段
    var minInterval = document.getElementById("minInterval").value;
    if (!(floatWithZero.test(minInterval)) || minInterval == "") {
        alert("请正确输入预约最小时间段！");
        return false;
    }
    //预约最长时间段
    var maxInterval = document.getElementById("maxInterval").value;
    if (!(floatWithZero.test(maxInterval)) || maxInterval == "") {
        alert("请正确输入预约最长时间段！");
        return false;
    }
    if (parseFloat(maxInterval) < parseFloat(minInterval)) {
        alert("预约最长时间段比预约最小时间段小，请重新输入！");
        return false;
    }
    //导师审核最少提前时间
    var minAheadByTutor = document.getElementById("minAheadByTutor").value;

    if (!(floatWithZero.test(minAheadByTutor)) && minAheadByTutor != "" ) {
        alert("请正确输入导师审核最少提前时间！");
        return false;
    }
    else if(minAheadByTutor == ""){
        minAheadByTutor = 0;
    }
    //预约时间块单位设置
    var timeLineInterval = document.getElementById("timeLineInterval").value;
    if (!(floatWithoutZero.test(timeLineInterval)) || timeLineInterval == "") {
        alert("请正确输入预约时间块单位设置！");
        return false;
    }
    //预热时间的判断
    var isPreheat1 = isPreheatYes.checked;
    var isPreheat2 = isPreheatNo.checked;
    if (!isPreheat1 && !isPreheat2) {
        alert("请选择“是否需要预热时间”！");
        return false;
    }
    if (isPreheat1) {
        //是
        var a = $('#preheatTime').val();
        if (!(floatWithoutZero.test(a)) || a == '') {
            alert('请正确输入预热时间！');
            return false;
        }
        var isTrue=parseFloat(a)%parseFloat(timeLineInterval);
        if(isTrue!=0){
            alert("请输入 “预约时间块单位设置” 时间的整数倍，如 此时 “预约时间块单位设置” 设置的时间为 "+timeLineInterval+"小时，建议设置预热时间为"+timeLineInterval+"小时，"+timeLineInterval*2+"小时等时间");
            return false;
        }
    } else {
        //否
    }
    //关闭电源
    var delayPowerOff = document.getElementById("delayPowerOff").value;
    if (!(numberWithZero.test(delayPowerOff)) || delayPowerOff == "") {
        alert("请正确输入关闭电源设置！");
        return false;
    }
    //告警
    var aheadWarning = document.getElementById("aheadWarning").value;
    if (!(numberWithZero.test(aheadWarning)) || aheadWarning == "") {
        alert("请正确输入告警设置！");
        return false;
    }

        if (!machineNeedauditYes.checked && !machineNeedauditNo.checked) {
            alert("请设置‘是否需要审核’的参数");
            return false;
        } else {
            return true;
        }

    return false;
}
//show和hide（显示和隐藏相应的控件）
function hidd() {
    $("#hidden1").css('display', 'none');
    $("#hidden2").css('display', 'none');
    $("#hidden3").css('display', 'none');
    $("#hidden4").css('display', 'none');
    $("#hidden5").css('display', 'none');
    $("#hidden6").css('display', 'none');
    $("#hidden7").css('display', 'none');
    $("#hidden8").css('display', 'none');
}

function show() {
    $("#hidden1").css('display', 'inline');
    $("#hidden2").css('display', 'inline');
    $("#hidden3").css('display', 'inline');
    $("#hidden4").css('display', 'inline');
    $("#hidden5").css('display', 'inline');
    $("#hidden6").css('display', 'inline');
    $("#hidden7").css('display', 'inline');
    $("#hidden8").css('display', 'inline');
}

function hiddDelay() {
    $("#Delay1").css('display', 'none');
    $("#Delay2").css('display', 'none');
    $("#Delay3").css('display', 'none');
}

//最大允许延长时间的控件
function showDelay() {

//只有先设置预约时间块单位设置才能延时
    var timeLineInterval = document.getElementById("timeLineInterval").value;
    if (timeLineInterval == null || timeLineInterval == '') {
        alert("请先设置\"预约时间块单位设置\"");
    } else {
        $("#Delay1").css('display', 'inline');
        $("#Delay2").css('display', 'inline');
        $("#Delay3").css('display', 'inline');
    }

}

function hiddAudit() {

    $("#isneedAudit").css('display', 'none');
}

function showAudit() {
    $("#isneedAudit").css('display', 'inline');
    console.log($("#isneedAudit"));
}

//操作show还是hide/并且保存计费费率的radio button
function changeSeg(seg) {
    //是否要分段
    var isBillingSeg;
    if (isBillingSegYes.checked) {
        isBillingSeg = 1;
    }
    if (isBillingSegNo.checked) {
        isBillingSeg = 0;
    }
    var insUid1 = $('#insUid').val();
    var myData = {
        "isBillingSeg": isBillingSeg,
        "insUid": insUid1
    }
    $.ajax({
        url: "../config/changeSegConfigMachine",
        type: 'POST',
        async: false,
        data: myData,
        success: function (data) {//AJAX查询成功
            if (data == "success") {
                //alert("成功保存");
            } else {

            }
        }, error: function () {
            alert("请先保存别的数据！")
        }
    })
}

//保存校外 校内其他学校等
function saveSeg() {
    var insUid1 = $('#insUid').val();
    var billingOutsideSchool = document.getElementById("billingOutsideSchool").value;
    var billingOutsideAcademy = document.getElementById("billingOutsideAcademy").value;
    var billingInsideAcademy = document.getElementById("billingInsideAcademy").value;
    var myData = {
        "insUid": insUid1,
        "billingOutsideSchool": billingOutsideSchool,

        "billingOutsideAcademy": billingOutsideAcademy,

        "billingInsideAcademy": billingInsideAcademy
    }
    $.ajax({
        url: "../config/saveSegConfigMachine",
        type: 'POST',
        async: false,
        data: myData,
        success: function (data) {//AJAX查询成功
            if (data == "success") {
                // alert("保存成功！");
            } else {

            }
        }
    })
}


//添加
//保存机时预约的设置
// 另存为模板—保存模板配置（templateName:模板名）
function saveConfig(templateName) {
    var configMachineUid = $('#configMachineUid').val();
    if (!isWritten()) {
    } else {
        //是否选择计费时长
        if (!isChoosenRes()) {
            alert("请设置计费时长！");
        } else {
            //保存计费时长
            saveConfigBillingTime();

                if (templateName) {
                } else {
                    templateName = "-1";
                }
                var AcrossDay=false;

                //是否可以延时
                var Delay;
                var minDelayAhead=0;
                var maxDelay=0;
                if (document.getElementById("isDelayYes")!=null) {
                    if (isDelayYes.checked) {
                        Delay = true;
                        //几分钟后无预约可以延时
                        minDelayAhead=$("#Delay2").val();
                        maxDelay=$("#Delay4").val();
                    }
                    if (isDelayNo.checked) {
                        Delay = false;
                    }
                }
                var Apo;
                if (isApoYes.checked) {
                    Apo = true;
                }
                if (isApoNo.checked) {
                    Apo = false;
                }
//    if(isApo.value==1){
//        Apo=true;
//    }else{
//        Apo=false;
//	}
                //是否允许申诉
                var Allege;
                // if (isAllegeYes.checked) {
                //     Allege = true;
                // }
                // if (isAllegeNo.checked) {
                //     Allege = false;
                // }
                //是否可以取消预约
                var Cancel;
                if (isCancelYes.checked) {
                    Cancel = true;
                }
                if (isCancelNo.checked) {
                    Cancel = false;
                }
                var needAudit;
                if (machineNeedauditYes.checked) {
                    needAudit = "1";
                }
                if (machineNeedauditNo.checked) {
                    needAudit = "2";
                }
                var isBillingSeg;
                if($("#isBillingSegOrNotStat")==='yes'){
                    if (isBillingSegYes.checked) {
                    isBillingSeg = true;
                    }
                    if (isBillingSegNo.checked) {
                        isBillingSeg = false;
                    }
                }else{
                    isBillingSeg = false;
                }

                //是否需要预热时间
                var isPreheat;
                if(isPreheatYes.checked){
                    isPreheat="1";
                }
                if(isPreheatNo.checked){
                    isPreheat="0";
                }
                var auditLevelConfig="";
                var array=new Array();
                var tempFlag = false;
                // 保存审核状态（-2为默认无选择的状态）
                if (needAudit == 1) {
                    //保存审核开启状态
                    if($("#levelFirstAudit").val()!=-2){
                        array.push($("#levelFirstAudit").val())
                    }
                    if($("#levelSecondAudit").val()!=-2){
                        array.push($("#levelSecondAudit").val())
                    }
                    if($("#levelThirdAudit").val()!=-2){
                        array.push($("#levelThirdAudit").val())
                    }
                    if($("#levelFourthAudit").val()!=-2){
                        array.push($("#levelFourthAudit").val())
                    }
                    if($("#levelFifthAudit").val()!=-2){
                        array.push($("#levelFifthAudit").val())
                    }
                    auditLevelConfig=array.join(",");
                    //由于有可能将状态开启，但所有审核层级都设置成无的情况，故执行如下代码
                    for (var i = 0; i < array.length;i++) {
                        if (array[i] != 'off' ) {
                            tempFlag = true;
                        }
                    }
                    //如果全部都为off则设置不需要审核测层级
                    if (tempFlag == false) {
                        needAudit = "2";
                    }
                } else {
                    //如果设置审核为未开启，则将已设置的审核层级都保存为off
                    var status = "off";
                    if($("#levelFirstAudit").val()!=-2){
                        array.push(status);
                    }
                    if($("#levelSecondAudit").val()!=-2){
                        array.push(status)
                    }
                    if($("#levelThirdAudit").val()!=-2){
                        array.push(status)
                    }
                    if($("#levelFourthAudit").val()!=-2){
                        array.push(status)
                    }
                    if($("#levelFifthAudit").val()!=-2){
                        array.push(status)
                    }
                    auditLevelConfig=array.join(",");
                }
                //若流程层级中未设置设备管理员或老师则将其最少审核时间置0
                var minAheadByTutorFinal=0;
                if (minAheadByTutor.value == "") {
                    minAheadByTutorFinal = 0;
                }
                else {
                    minAheadByTutorFinal = minAheadByTutor.value;
                }
                //保存延时设置
                var myData = {
                    "needAudit": needAudit,
                    "minAheadHour": minAheadHour.value,
                    "maxAheadHour": maxAheadHour.value,
                    //预约最小时间段
                    "minInterval": minInterval.value,
                    //预约最长时间段
                    "maxInterval": maxInterval.value,
                    "AcrossDay": AcrossDay,
                    //导师/课题组负责人审核最少提前时间
                    "minAheadByTutor": minAheadByTutorFinal,
                    //预约时间块单位设置
                    "timeLineInterval": timeLineInterval.value,
                    "delayPowerOff": delayPowerOff.value,
                    "aheadWarning": aheadWarning.value,
                    "Delay": Delay,
                    //几分钟后无预约，可以延时
                    "minDelayAhead": minDelayAhead,
                    "maxDelay":maxDelay,
                    "Apo": Apo,
                    "Allege": Allege,
                    "Cancel": Cancel,
                    //取消预约：需要在预约时间前多少小时
                    "aheadCancel": aheadCancel.value,
                    //取消次数
                    "timesCancel": timesCancel.value,
                    //取消次数的单位：周、月、年
                    "countPerTime": countPerTime.value,
                    //扣除信誉积分
                    "deductCreditScore": deductCreditScore.value,
                    "configMachineUid": configMachineUid,
                    //-1是仪器保存配置；其他是另存为模板
                    "templateName": templateName,
                    // "maxDelay": maxDelay,
                    "isBillingSeg": isBillingSeg,
                    "templetFlag": $('#templetFlag').val(),
                    //是否需要预热
                    "isPreheat":isPreheat,
                    //预热时间
                    "preheatTime":$('#preheatTime').val(),
                    "auditLevelConfig":auditLevelConfig
                }
                $.ajax({
                    url: "../instrument/saveInstrumentMachineConfig",
                    type: 'POST',
                    async: false,
                    data: myData,
                    success: function (data) {//AJAX查询成功
                        if ("nameRepeat" == data) {
                            alert("模板名称重复，请换一个模板名！");
                        } else if ("setBilling" == data) {
                            // alert("请设置计费费率！");
                        } else {
                            if (data == "setOpenTime") {
                                alert("请设置开放时间！");
                            } else {

                                if (data == "success") {
                                    alert("修改成功！");
                                    var isBillingSegYes = document.getElementById("isBillingSegYes");
                                    if (isBillingSegYes.checked) {
                                        changeSeg(1);
                                    }
                                    if (isBillingSegNo.checked) {
                                        changeSeg(0);
                                    }
                                    saveSeg();
                                    window.location.reload();
                                    if ($('#templet').val() == 'true') {
                                        parent.window.location.reload();
                                        var index = parent.layer.getFrameIndex(window.name);
                                        parent.layer.close(index);

                                    }
                                } else {
                                    alert("修改失败！");
                                }
                            }
                        }
                    },
                    error: function () {
                        alert("数据有误，系统异常！");
                    }
                });

        }
    }
}

//保存机时预约模版的设置
function saveConfigTemplet(uid) {
    var configMachineTempletUid = uid;
    if (!isWritten()) {
    } else {
        //是否选择计费时长
        if (!isChoosenRes()) {
            alert("请设置计费时长！");
        } else {
            //保存计费时长
            saveConfigBillingTime();
            if (!isSegExist()) {
                alert("请设置计费费率！");
            } else {
                //是否允许跨天预约
                var AcrossDay;
                // if (isAcrossDayYes.checked) {
                //     AcrossDay = true;
                // }
                // if (isAcrossDayNo.checked) {
                //     AcrossDay = false;
                // }
                //是否可以延时
                var Delay;
                var minDelayAhead=0;
                if (document.getElementById("isDelayYes")!=null) {
                    if (isDelayYes.checked) {
                        Delay = true;
                        //几分钟后无预约可以延时
                        minDelayAhead=$("#Delay2").val();
                    }
                    if (isDelayNo.checked) {
                        Delay = false;
                    }
                }
                //是否自动断电
                var Apo;
                if (isApoYes.checked) {
                    Apo = true;
                }
                if (isApoNo.checked) {
                    Apo = false;
                }
//    if(isApo.value==1){
//        Apo=true;
//    }else{
//        Apo=false;
//	}
                //是否允许申诉
                var Allege;
                // if (isAllegeYes.checked) {
                //     Allege = true;
                // }
                // if (isAllegeNo.checked) {
                //     Allege = false;
                // }
                //是否可以取消预约
                var Cancel;
                if (isCancelYes.checked) {
                    Cancel = true;
                }
                if (isCancelNo.checked) {
                    Cancel = false;
                }
                //是否需要审核
                var needAudit;
                if (machineNeedauditYes.checked) {
                    needAudit = "1";
                }
                if (machineNeedauditNo.checked) {
                    needAudit = "2";
                }
                var isBillingSeg;
                if (isBillingSegYes.checked) {
                    isBillingSeg = true;
                }
                if (isBillingSegNo.checked) {
                    isBillingSeg = false;
                }
                //是否需要预热时间
                var isPreheat;
                if(isPreheatYes.checked){
                    isPreheat="1";
                }
                if(isPreheatNo.checked){
                    isPreheat="0";
                }
                var auditLevelConfig="";
                var array=new Array();
                var tempFlag = false;
                // 保存审核状态（-2为默认无选择的状态）
                if (needAudit == 1) {
                    //保存审核开启状态
                    if($("#levelFirstAudit").val()!=-2){
                        array.push($("#levelFirstAudit").val())
                    }
                    if($("#levelSecondAudit").val()!=-2){
                        array.push($("#levelSecondAudit").val())
                    }
                    if($("#levelThirdAudit").val()!=-2){
                        array.push($("#levelThirdAudit").val())
                    }
                    if($("#levelFourthAudit").val()!=-2){
                        array.push($("#levelFourthAudit").val())
                    }
                    if($("#levelFifthAudit").val()!=-2){
                        array.push($("#levelFifthAudit").val())
                    }
                    auditLevelConfig=array.join(",");
                    //由于有可能将状态开启，但所有审核层级都设置成无的情况，故执行如下代码
                    for (var i = 0; i < array.length;i++) {
                        if (array[i] != 'off' ) {
                            tempFlag = true;
                        }
                    }
                    //如果全部都为off则设置不需要审核测层级
                    if (tempFlag == false) {
                        needAudit = "2";
                    }
                } else {
                    //如果设置审核为未开启，则将已设置的审核层级都保存为off
                    var status = "off";
                    if($("#levelFirstAudit").val()!=-2){
                        array.push(status);
                    }
                    if($("#levelSecondAudit").val()!=-2){
                        array.push(status)
                    }
                    if($("#levelThirdAudit").val()!=-2){
                        array.push(status)
                    }
                    if($("#levelFourthAudit").val()!=-2){
                        array.push(status)
                    }
                    if($("#levelFifthAudit").val()!=-2){
                        array.push(status)
                    }
                    auditLevelConfig=array.join(",");
                }
                //若流程层级中未设置设备管理员或老师则将其最少审核时间置0
                var minAheadByTutorFinal=0;
                if (minAheadByTutor.value == "") {
                    minAheadByTutorFinal = 0;
                }
                else {
                    minAheadByTutorFinal = minAheadByTutor.value;
                }
                var myData = {
                    "needAudit": needAudit,
                    "minAheadHour": minAheadHour.value,
                    "maxAheadHour": maxAheadHour.value,
                    "minInterval": minInterval.value,
                    "maxInterval": maxInterval.value,
                    "AcrossDay": AcrossDay,
                    "minAheadByTutor": minAheadByTutorFinal,
                    "timeLineInterval": timeLineInterval.value,
                    "delayPowerOff": delayPowerOff.value,
                    "aheadWarning": aheadWarning.value,
                    "Delay": Delay,
                    //几分钟后无预约，可以延时
                    "minDelayAhead": minDelayAhead,
                    "Apo": Apo,
                    "Allege": Allege,
                    "Cancel": Cancel,
                    "aheadCancel": aheadCancel.value,
                    "timesCancel": timesCancel.value,
                    // "pricePerTime": pricePerTime.value,
                    "deductCreditScore": deductCreditScore.value,
                    "configMachineTempletUid": configMachineTempletUid,
                    "isBillingSeg": isBillingSeg,
                    "templetFlag": $('#templetFlag').val(),
                    "isPreheat":isPreheat,
                    "preheatTime":$('#preheatTime').val(),
                    "auditLevelConfig":auditLevelConfig
                }
                $.ajax({
                    url: "../instrument/saveInstrumentMachineConfigTemplet",
                    type: 'POST',
                    async: false,
                    data: myData,
                    success: function (data) {//AJAX查询成功
                        if ("nameRepeat" == data) {
                            alert("模板名称重复，请换一个模板名！");
                        } else if ("setBilling" == data) {
                            // alert("请设置计费费率！");
                        } else {
                            if (data == "setOpenTime") {
                                alert("请设置开放时间！");
                            } else {
                                if (data == "success") {
                                    alert("修改成功！");
                                    var isBillingSegYes = document.getElementById("isBillingSegYes");
                                    if (isBillingSegYes.checked) {
                                        changeSeg(1);
                                    }
                                    if (isBillingSegNo.checked) {
                                        changeSeg(0);
                                    }
                                    saveSeg();
                                    window.location.reload();
                                    if ($('#templet').val() == 'true') {
                                        parent.window.location.reload();
                                        var index = parent.layer.getFrameIndex(window.name);
                                        parent.layer.close(index);

                                    }
                                } else {
                                    alert("修改失败！");
                                }
                            }
                        }
                    },
                    error: function () {
                        alert("数据输入有误，请修改红色框内容！");
                    }
                });
            }
        }
    }
}
//另存为模版
function saveAsTemplate(insUid) {
    layer.prompt({title: '请输入模板名', formType: 2}, function (text, index) {
        layer.close(index);
        //保存机时预约模板设置（text：模板名）
        saveConfig(text);
    });
}

//附加收费
function addAddition() {
    var feeNumber = additonName.value;
    var fee1 = fee.value;
    var info1 = $('#info1').val();
    var f = parseInt(fee1);
    if (feeNumber != "") {
        if (!isNaN(f)) {
            var configMachineUid = $('#configMachineUid').val();
            var myData = {
                "feeNumber": feeNumber,
                "fee": fee1,
                "info": info1,
                "configMachineUid": configMachineUid
            }
            $.ajax({
                url: "../config/addConfigAdditional",
                type: 'POST',
                async: false,
                data: myData,
                success: function (data) {//AJAX查询成功
//                            if(data=="success"){
//                                alert("添加成功！");
//                            }else{
//                                alert("添加失败！");
//                            }
                    //alert(data);
                    var a_tag = '<td><a class="fa fa-trash-o ml10" onclick="deleteConfigAdditonalRecordByUid2(&quot;' + data + '&quot;)"></a></td>';
                    var td =
                        "<td>" + feeNumber + "</td>" +
                        "<td>" + fee1 + "</td>" +
                        "<td>" + info1 + "</td>";
                    var str = '<tr id="' + data + '"></tr>';
                    var $str = $(str);
                    $str.append($(td));
                    $str.append($(a_tag));
                    $("#addition").append($str);

                    $("#additonName").val("");
                    $("#fee").val("");
                    $("#info1").val("");
                }
            });
            // window.location.reload();
        } else {
            alert("输入正确的价格");
        }

    } else {
        alert("输入项目名称!");
    }


}

//保存计费时长
function saveConfigBillingTime() {
        //保存计费时长
        var RESV_BILLING_HOUR;
        if (RESV_BILLING_HOUR_FOUR.checked) {
            RESV_BILLING_HOUR = "RESV_BILLING_HOUR_FOUR";
        }
        if (RESV_BILLING_HOUR_THREE.checked) {
            RESV_BILLING_HOUR = "RESV_BILLING_HOUR_THREE";
        }
        if (RESV_BILLING_HOUR_TWO.checked) {
            RESV_BILLING_HOUR = "RESV_BILLING_HOUR_TWO";
        }
        if (RESV_BILLING_HOUR_ONE.checked) {
            RESV_BILLING_HOUR = "RESV_BILLING_HOUR_ONE";
        }
        //是否要分段
        var isBillingSeg;
        if($("#isBillingSegOrNotStat")==='yes'){
            if (isBillingSegYes.checked) {
                isBillingSeg = true;
            }
            if (isBillingSegNo.checked) {
                isBillingSeg = false;
            }
        }else{
            isBillingSeg = false;
        }
        var configMachineUid = $('#configMachineUid').val();
        var billingOutsideSchool = $("#billingOutsideSchool").val();
        var billingOutsideAcademy = $("#billingOutsideAcademy").val();
        var billingInsideAcademy = $("#billingInsideAcademy").val();
        var myData = {
            "RESV_BILLING_HOUR": RESV_BILLING_HOUR,
            "isBillingSeg": isBillingSeg,
            "billingOutsideSchool": billingOutsideSchool,
            "billingOutsideAcademy": billingOutsideAcademy,
            "billingInsideAcademy": billingInsideAcademy,
            "configMachineUid": configMachineUid
        }
        $.ajax({
            url: "../config/saveConfigMachineBilling",
            type: 'POST',
            async: false,
            data: myData,
            success: function (data) {//AJAX查询成功
                if (data == "success") {
                } else {
                      alert("计费时长保存失败，请先设置其他设置项！");
                }
            },error:function(){
                alert("程序出错，请先保存其他设置项或刷新此页面！");
            }
        });
}

//开放
//openFlag==0 是开放时间 1是禁止时间
function add(openFlag) {
    var configMachineUid = $('#configMachineUid').val();
    if (openFlag == 0) {
        var yearStart = document.getElementById("timeYearStart");
        var yearEnd = document.getElementById("timeYearEnd");
        var hourStart = document.getElementById("timeHourStart");
        var hourEnd = document.getElementById("timeHourEnd");
        var weekday = document.getElementById("SelectWeekDays");
        var options = $("#SelectWeekDays").find("option");
        var len = options.length;
        var counter;
        var weekdays = "周";
        var minAheadTime=document.getElementById("minAheadDay");
        var maxAheadTime=document.getElementById("maxAheadDay");
        //获取开放等级
        var openRankResult = $("#openRankResult").val();
//				var open="空";
//				if(openRankResult==1){
//				    open="全部";
//				}
//                if(openRankResult==2){
//                    open="B级及以上";
//                }
//                if(openRankResult==3){
//                    open="A级";
//                }
        if (CompareDate(yearStart.value, yearEnd.value) == true || CompareHourAndMinutes(hourStart.value, hourEnd.value)) {
            alert("开始时间不能大于结束时间！");
        } else {
            if (yearStart.value == "" || yearEnd.value == "" || hourStart.value == "" || hourEnd.value == "") {
                alert("还有未选择的时间！");
            } else {
                for (counter in options) {
                    if (options[counter].selected == true) {
                        if (counter == 0) {
                            counter = 7;
                        }
                        weekdays += counter + ",";
                    }
                }
                if (weekdays == "周") {
                    alert("没有选每周哪几天！");
                } else {
                    weekdays = weekdays.substring(0, weekdays.length - 1);
                    var information = "";
                    addRecord(yearStart.value, yearEnd.value, weekdays, hourStart.value, hourEnd.value,minAheadTime.value,maxAheadTime.value, configMachineUid, openFlag, information, openRankResult);
                    //window.location.reload();
                }
            }
        }
    } else {
        var infomation = info.value;
        var yearStart = document.getElementById("timeYearStart1");
        var yearEnd = document.getElementById("timeYearEnd1");
        var hourStart = document.getElementById("timeHourStart1");
        var hourEnd = document.getElementById("timeHourEnd1");
        var weekday = document.getElementById("SelectWeekDays1");
        var options = $("#SelectWeekDays1").find("option");
        var len = options.length;
        var counter;
        var weekdays = "周";
        if (infomation == "") {
            alert("请填写不可预约的原因!");
        } else {

            if (CompareDate(yearStart.value, yearEnd.value) == true || CompareHourAndMinutes(hourStart.value, hourEnd.value)) {
                alert("开始时间不能大于结束时间！");
            } else {
                if (yearStart.value == "" || yearEnd.value == "" || hourStart.value == "" || hourEnd.value == "") {
                    alert("还有未选择的时间！");
                } else {
                    for (var i = 0; i < options.length; i++) {
                    }
                    for (counter in options) {
                        if (options[counter].selected == true) {
                            if (counter == 0) {
                                counter = 7;
                            }
                            weekdays += counter + ",";
                        }
                    }
                    if (weekdays == "周") {
                        alert("没有选每周哪几天！");
                    } else {
                        weekdays = weekdays.substring(0, weekdays.length - 1);
//                                document.getElementById("chooseTime1").innerHTML += "<table><tr><td>" + yearStart.value + "至" + yearEnd.value +
//                                    "</td><td>" + weekdays + "</td><td>" +
//                                    hourStart.value + "-" + hourEnd.value
//                                    + "</td>" +
//                                    "<td>" +
//                                    '<a class="fa fa-trash-o ml10"></a>'
//
//
//                                    + "</td>"
//                                    + "</tr></table>";
                        addRecord3(yearStart.value, yearEnd.value, weekdays, hourStart.value, hourEnd.value, configMachineUid, openFlag, infomation, 1);
                        // window.location.reload();
                    }
                }
            }
        }
    }
}

function addRecord(yearStart, yearEnd, weekdays, hourStart, hourEnd,minAheadTime,maxAheadTime, configMachineUid, openFlag, information, openRankResult) {
    var myData = {
        "yearStart": yearStart,
        "yearEnd": yearEnd,
        "weekdays": weekdays,
        "hourStart": hourStart,
        "hourEnd": hourEnd,
        "minAheadTime":minAheadTime,
        "maxAheadTime":maxAheadTime,
        "configMachineUid": configMachineUid,
        "openFlag": openFlag,
        "openRankResult": openRankResult,
        "information": information,
    }
    $.ajax({
        url: "../instrument/addInstrumentMachineAppRecord",
        type: 'POST',
        async: false,
        data: myData,
        success: function (data) {//AJAX查询成功
            if (openFlag == 0) {
                var open = "空";
                if (openRankResult == 1) {
                    open = "全部";
                }
                if (openRankResult == 2) {
                    open = "B级及以上";
                }
                if (openRankResult == 3) {
                    open = "A级";
                }
                var a_tag = '<td><a class="fa fa-trash-o ml10" onclick="deleteRecordByConfigOpenTimeUid(&quot;' + data.uid + '&quot;)"></a></td>';
                var td =
                    "<td>" + yearStart + "至" + yearEnd + "</td>" +
                    "<td>" + weekdays + "</td>" +
                    "<td>" + hourStart + "-" + hourEnd + "</td>" +
                    "<td>" + open + "</td>" +
                    "<td>" + minAheadTime + "小时"+"</td>" +
                    "<td>" + maxAheadTime + "小时"+"</td>";
                var str = '<tr id="' + data.uid + '"></tr>';
                var $str = $(str);
                $str.append($(td));
                $str.append($(a_tag));
                $("#chooseTime").append($str);
                //清空选择框的内容
                document.getElementById("timeYearStart").value = "";
                document.getElementById("timeYearEnd").value = "";

                $('#SelectWeekDays').selectpicker('val', '');
                $('#SelectWeekDays').selectpicker('render');
                document.getElementById("timeHourStart").value = "";
                document.getElementById("timeHourEnd").value = "";
                //document.getElementById("openRankResult").value="";
                $('#openRankResult').selectpicker('val', '');
                $('#openRankResult').selectpicker('render');
                document.getElementById("minAheadDay").value = "";
                document.getElementById("maxAheadDay").value = "";
                //test
                // $('#countFeeTime').append("<option value=" + data.startTime+"-"+data.endTime + ">" + data.startTime+"-"+data.endTime + "</option>");
                // $('#countFeeTime').selectpicker('refresh');

            } else {
                var a_tag = '<td><a class="fa fa-trash-o ml10" onclick="deleteRecordByConfigOpenTimeUid(&quot;' + data.uid + '&quot;)"></a></td>';
                var td =
                    "<td>" + yearStart + "至" + yearEnd + "</td>" +
                    "<td>" + weekdays + "</td>" +
                    "<td>" + hourStart + "-" + hourEnd + "</td>" +
                    "<td>" +
                    "" + information + "</td>";
                var str = '<tr id="' + data.uid + '"></tr>';
                var $str = $(str);
                $str.append($(td));
                $str.append($(a_tag));
                $("#chooseTime1").append($str);
                document.getElementById("timeYearStart1").value = "";
                document.getElementById("timeYearEnd1").value = "";
                $('#SelectWeekDays1').selectpicker('val', '');
                $('#SelectWeekDays1').selectpicker('render');
                //document.getElementById("SelectWeekDays1").value="";
                document.getElementById("timeHourStart1").value = "";
                document.getElementById("timeHourEnd1").value = "";
                document.getElementById("info").value = "";
            }

        }
    });

}

function addRecord3(yearStart, yearEnd, weekdays, hourStart, hourEnd, configMachineUid, openFlag, information, openRankResult) {

    var myData = {
        "yearStart": yearStart,
        "yearEnd": yearEnd,
        "weekdays": weekdays,
        "hourStart": hourStart,
        "hourEnd": hourEnd,
        "configMachineUid": configMachineUid,
        "openFlag": openFlag,
        "openRankResult": openRankResult,
        "information": information,
    }
    $.ajax({
        url: "../instrument/addInstrumentMachineAppRecord",
        type: 'POST',
        async: false,
        data: myData,
        success: function (data) {//AJAX查询成功
                var a_tag = '<td><a class="fa fa-trash-o ml10" onclick="deleteRecordByConfigOpenTimeUid(&quot;' + data.uid + '&quot;)"></a></td>';
                var td =
                    "<td>" + yearStart + "至" + yearEnd + "</td>" +
                    "<td>" + weekdays + "</td>" +
                    "<td>" + hourStart + "-" + hourEnd + "</td>" +
                    "<td>" +
                    "" + information + "</td>";
                var str = '<tr id="' + data.uid + '"></tr>';
                var $str = $(str);
                $str.append($(td));
                $str.append($(a_tag));
                $("#chooseTime1").append($str);
                document.getElementById("timeYearStart1").value = "";
                document.getElementById("timeYearEnd1").value = "";
                $('#SelectWeekDays1').selectpicker('val', '');
                $('#SelectWeekDays1').selectpicker('render');
                //document.getElementById("SelectWeekDays1").value="";
                document.getElementById("timeHourStart1").value = "";
                document.getElementById("timeHourEnd1").value = "";
                document.getElementById("info").value = "";
            }

    });

}

//不可预约
function addRecord2(weekdays, hourStart, hourEnd, configMachineUid, price1, schoolAcademy1) {

    var myData = {
        "price1": price1,
        "schoolAcademy1": schoolAcademy1,
        "weekdays": weekdays,
        "hourStart": hourStart,
        "hourEnd": hourEnd,
        "configMachineUid": configMachineUid
    }
    $.ajax({
        url: "../config/addConfigMachineBilling",
        type: 'POST',
        async: false,
        data: myData,
        success: function (data) {//AJAX查询成功
            // if(data=="success"){
            alert("添加成功！");
            var academy = schoolAcademy1.split(",");
            var counter = 1;
            for (var uid in data) {
                var a_tag = '<td><a class="fa fa-trash-o ml10" onclick="deleteRecordByUid2(&quot;' + data[parseInt(uid)] + '&quot;)"></a></td>';
                var td =
                    "<td>" + academy[counter] + "</td>" +
                    "<td>" + weekdays + "</td>" +
                    // "<td>"+hourStart+"-"+hourEnd+"</td>"+
                    "<td>" + hourStart + "</td><td>" + hourEnd + "</td>" +
                    "<td>" + price1 + "</td>";
                var str = '<tr id="' + data[parseInt(uid)] + '"></tr>';
                var $str = $(str);
                $str.append($(td));
                $str.append($(a_tag));
                $("#segno1").append($str);
                counter++;
            }

            $('#SelectschoolAcademy').selectpicker('val', "");
            $('#SelectWeekDays2').selectpicker('val', "");
            $("#price").val("");
            $("#timeHourStart2").val("");
            $("#timeHourEnd2").val("");
            $('#SelectschoolAcademy').selectpicker('val', '');
            $('#SelectschoolAcademy').selectpicker('render');
            $('#SelectWeekDays2').selectpicker('val', '');
            $('#SelectWeekDays2').selectpicker('render');


            // $('#countFeeTime').selectpicker('val', "");
        }
    });

}

function add2() {
    var price1 = price.value;
    var p = parseFloat(price1);
    if (!isNaN(p)) {
        var configMachineUid = $('#configMachineUid').val();
        var schoolAcademy1 = "";
        var schoolAcademy = SelectschoolAcademy;
        var schoolAcademyoptions = schoolAcademy.options;
        var schoolAcademylen = schoolAcademyoptions.length;
        for (var i in schoolAcademyoptions) {
            if (schoolAcademyoptions[i].selected == true) {
                schoolAcademy1 += "," + schoolAcademyoptions[i].value;
            }

        }
        var hourStart = timeHourStart2.value;
        var hourEnd = timeHourEnd2.value;
        //var time=countFeeTime.value;
        //var hourStart=time.split("-")[0];
        // var hourEnd=time.split("-")[1];
        var weekday = SelectWeekDays2;
        var options = weekday.options;
        var len = options.length;
        var counter;
        var weekdays = "周";

        if (CompareHourAndMinutes(hourStart, hourEnd)) {
            alert("开始时间不能大于结束时间！");
        } else {
            if (hourStart.value == "" || hourEnd.value == "") {
                alert("还有未选择的时间！");
            } else {


                for (counter in options) {
                    if (options[counter].selected == true) {
                        if (counter == 0) {
                            counter = 7;
                        }
                        weekdays += counter + ",";
                    }

                }
                if (weekdays == "周") {
                    alert("没有选每周哪几天！");
                } else {
                    addRecord2(weekdays, hourStart, hourEnd, configMachineUid, price1, schoolAcademy1);
                    //   window.location.reload();
                }
            }
        }

    } else {
        alert("费用输入有误！");
    }


}

//删除
function deleteRecordByConfigOpenTimeUid(uid) {
    layer.confirm('确定删除吗？', {icon: 3, title: "提示"}, function (index) {
        var myData = {
            "uid": uid,
        }
        $.ajax({
            url: "../instrument/deleteInstrumentMachineAppRecord",
            type: 'POST',
            async: false,
            data: myData,
            success: function (data) {//AJAX查询成功
                // var myDatas={
                //     "configUid":data
                // };
                //alert("删除成功！");
                //	location.reload();
                $('#' + uid).hide(1000);
                // $.ajax({
                //     url:"../instrument/returnOpenTimeList",
                //     type:'POST',
                //     async:false,
                //     data:myDatas,
                //     success:function(data){//AJAX查询成功
                //         $("#countFeeTime").find("option").remove();
                //        for(var a in data){
                //            $('#countFeeTime').append("<option value=" + data[parseInt(a)].startTime+"-"+data[parseInt(a)].endTime + ">" + data[parseInt(a)].startTime+"-"+data[parseInt(a)].endTime + "</option>");
                //        }
                //         $('#countFeeTime').selectpicker('refresh');
                //     }
                // })
            }
        })
        layer.close(index);
    });
}

//附加收费
function deleteConfigAdditonalRecordByUid2(uid) {
    layer.confirm('确定删除吗？', {icon: 3, title: "提示"}, function (index) {
        var myData = {
            "uid": uid,
        }
        $.ajax({
            url: "../config/deleteConfigAdditionalRecord",
            type: 'POST',
            async: false,
            data: myData,
            success: function (data) {//AJAX查询成功
                if (data == "success") {
                    //alert("删除成功！");
                    //location.reload();
                    $('#' + uid).hide(1000);

                } else {
                    alert("删除失败！");
                }
            }
        })
        layer.close(index);
    });
}

//费率
function deleteRecordByUid2(uid) {
    layer.confirm('确定删除吗？', {icon: 3, title: "提示"}, function (index) {
        var myData = {
            "uid": uid,
        }
        $.ajax({
            url: "../config/deleteConfigMachineBillingRecord",
            type: 'POST',
            async: false,
            data: myData,
            success: function (data) {//AJAX查询成功
                if (data == "success") {
                    $('#' + uid).hide(1000);
                    //alert("删除成功！");
                    //hidelocation.reload();
                } else {
                    alert("删除失败！");
                }
            }
        })
        layer.close(index);
    });
}


//计费时长的某个radiobuttion是否checked
function isChoosenRes() {
    if (RESV_BILLING_HOUR_FOUR.checked) {
        return true;
    }
    if (RESV_BILLING_HOUR_THREE.checked) {
        return true;
    }
    if (RESV_BILLING_HOUR_TWO.checked) {
        return true;
    }
    if (RESV_BILLING_HOUR_ONE.checked) {
        return true;
    }
    return false;
}


function checkExistConfigMachine(insuid) {
    var myData = {
        "insUid": insuid,
        "currpage": 1
    }
    $.ajax({
        url: "../config/checkExistConfigMachine?insUid=" + insuid,
        type: 'GET',
        success: function (data) {
            if (data == "success") {
                window.location.href = '../config/editInstrumentMachineAppBilling?insUid=' + insuid;
            } else if (data == "error") {
                alert("请先进行机时预约基本设置！");
            }
        }
    });
    // th:href="@{/config/editInstrumentMachineAppBilling(insUid=${viewInstrument[12]},currpage=1)}"

}


//通用的js函数

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


function saveConfigNoDelay(insUid) {
    var configMachineUid = $('#configMachineUid').val();
    var templateName = "-1";
    var AcrossDay;
    // if (isAcrossDayYes.checked) {
    //     AcrossDay = true;
    // }
    // if (isAcrossDayNo.checked) {
    //     AcrossDay = false;
    // }
        var Delay;
    if (document.getElementById("isDelayYes")!=null) {
        if (isDelayYes.checked) {
            Delay = true;
        }
        if (isDelayNo.checked) {
            Delay = false;
        }
    }
    var Apo;
    if (isApoYes.checked) {
        Apo = true;
    }
    if (isApoNo.checked) {
        Apo = false;
    }
    var Allege;
    // if (isAllegeYes.checked) {
    //     Allege = true;
    // }
    // if (isAllegeNo.checked) {
    //     Allege = false;
    // }
    var Cancel;
    if (isCancelYes.checked) {
        Cancel = true;
    }
    if (isCancelNo.checked) {
        Cancel = false;
    }
    var needAudit;
    if (machineNeedauditYes.checked) {
        needAudit = "1";
    }
    if (machineNeedauditNo.checked) {
        needAudit = "2";
    }
    if (document.getElementById("isDelayYes")!=null) {
        if (isDelayYes.checked) {
            var maxDelay = document.getElementById("Delay2").value;
        }
    }
    var isBillingSeg;
    if (isBillingSegYes.checked) {
        isBillingSeg = true;
    }
    if (isBillingSegNo.checked) {
        isBillingSeg = false;
    }
    var isPreheatSeg;
    if (isPreheatYes.checked) {
        isPreheatSeg = true;
    }
    if (isPreheatNo.checked) {
        isPreheatSeg = false;
    }
    var preheatTime = $('#preheatTime').val();
    var myData = {
        "needAudit": needAudit,
        "minAheadHour": minAheadHour.value,
        "maxAheadHour": maxAheadHour.value,
        "minInterval": minInterval.value,
        "maxInterval": maxInterval.value,
        "AcrossDay": AcrossDay,
        "minAheadByTutor": minAheadByTutor.value,
        "timeLineInterval": timeLineInterval.value,
        "delayPowerOff": delayPowerOff.value,
        "aheadWarning": aheadWarning.value,
        "Delay": Delay,
        "Apo": Apo,
        "Allege": Allege,
        "Cancel": Cancel,
        "aheadCancel": aheadCancel.value,
        "timesCancel": timesCancel.value,
        // "pricePerTime": pricePerTime.value,
        "deductCreditScore": deductCreditScore.value,
        "configMachineUid": configMachineUid,
        "templateName": templateName,
        "maxDelay": maxDelay,
        "isBillingSeg": isBillingSeg,
        "isPreheatSeg": isPreheatSeg,
        "preheatTime": preheatTime
    }
    $.ajax({
        url: "../instrument/saveInstrumentMachineConfigNoDelay",
        type: 'POST',
        async: false,
        data: myData,
        success: function (data) {
        }
    });
}

//检查这个设备是否有实验室管理员，若有则返回true，否则 false
function checkLabRoomAdminExist() {
    var tem = $('#templet').val();
    if (tem == 'true') {
        //noadmin  没有admin不准修改为实验室管理员
        $("#levelSeondAudit").find("option[value='-1']").prop("selected", true);
        $("#levelSeondAudit").find("option[value='-1']").siblings().prop("selected", false);
        $("#levelSeondAudit").val("-1");
        $('#levelSeondAudit').selectpicker('refresh');
        alert("设置模板不允许设置实验室管理员");
    } else {
        var value = $('#levelSeondAudit').val();
        if (value == 5 || value == '5') {
            var schoolDevice = document.getElementById("insNumber").innerHTML;
            var myData = {
                "schoolDevice": schoolDevice
            };
            $.ajax({
                url: "../instrument/checkLabRoomAdminExist",
                type: 'POST',
                async: false,
                data: myData,
                success: function (data) {
                    if (data == 'noAdmin') {
                        //noadmin  没有admin不准修改为实验室管理员
                        $("#levelSeondAudit").find("option[value='-1']").prop("selected", true);
                        $("#levelSeondAudit").find("option[value='-1']").siblings().prop("selected", false);
                        $("#levelSeondAudit").val("-1");
                        $('#levelSeondAudit').selectpicker('refresh');
                        alert("没有实验室管理员");

                    }
                }
            });
        }
    }
}

//应用模板
function applyTemplet(instrumentId) {
    var machineTempletId = $("#configMachineTemplet").val();
    var templetFlag = $('#templetFlag').val();
    window.location.href = '../templet/applyMachineTemplet?instrumentId=' + instrumentId + '&machineTempletId=' + machineTempletId + "&templetFlag=" + templetFlag;
}

function showAuditLevel(){
    var auditLevel=$("#auditLevel").val();
    for(var i = 0;i<auditLevel;i++){
        $( $("#AuditLevels").children().get(i)).css("display","");
    }
    for(var i=auditLevel;i<$("#AuditLevels").children().size();i++){
        $( $("#AuditLevels").children().get(i)).css("display","none");
    }
}

function addOptions(array) {
    $.each(array,function (index,val) {
        $("#AuditLevel"+(index+1)).find("select").append("<option value='on'>"+val+"</option>").selectpicker("refresh");
    })
}
//审核层级有导师/课题组负责人
function hideTeamLeader(){
var teamHeaderStatus=$("#needTeamHeaderStatus").val();
if(teamHeaderStatus=='false'){
    $("#teamLeaderAudit").css("display","none");
    $("#teamLeaderAudit1").css("display","none");
}else if (teamHeaderStatus=='true'){
    $("#teamLeaderAudit").css("display","");
    $("#teamLeaderAudit1").css("display","");
}
}



