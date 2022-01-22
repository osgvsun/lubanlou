//送样检测另存为模板
function saveAsTemplate(insUid) {
    layer.prompt({title: '请输入模板名', formType: 2}, function(text, index){
        layer.close(index);
        saveConfigSpecimenApp(insUid,text);
    });
}

//应用模板
function applyTemplet(instrumentId) {
    var specimenTempletId = $("#configSpecimenTemplet").val();
    var templetFlag=$('#templetFlag').val();
    window.location.href='../templet/applySpecimenTemplet?instrumentId='+instrumentId+'&specimenTempletId='+specimenTempletId+"&templetFlag="+templetFlag;
}
//联动审核
function showOrHidelevelAudit(flag) {
    // var div1 = document.getElementsByClassName("levelAudit")[0];
    if(flag==1){
        // div1.style.display="block";
        $(".levelAudit").css('display', 'table-cell');
    }else{
        // div1.style.display="none";
        $(".levelAudit").css('display', 'none');
    }
}
//保存送样检测预约设置
//另存为模板
function saveConfigSpecimenApp(insUid,templateName){
    if(templateName){
    }else{
        templateName = "-1";
    }
    // var receivePerTime=$('#receivePerTime').val();
    var receivePerTime=$('#receivePerTime').combobox('getValue');
    var receiveDays=$('#receiveDay').combobox('getValues');
    var receiveDay="";
    for (i=0; i<receiveDays.length; i++) {
        if(receiveDays[i]==0){receiveDays[i]=7}
        receiveDay = receiveDay + receiveDays[i] + ",";
    }
    receiveDay = receiveDay.substring(0, receiveDay.length - 1);
    var maxReceive=$('#maxReceive').val();
    var finishHour=$('#finishHour').val();
    var minAheadDay=$('#minAheadDay').val();
    var maxAheadDay=$('#maxAheadDay').val();
    var sendSpecimenForm;
    if(sendSpecimenForm1.checked){
        sendSpecimenForm=0;
    }
    if(sendSpecimenForm2.checked){
        sendSpecimenForm=1;
    }
    if(sendSpecimenForm3.checked){
        sendSpecimenForm=2;
    }
    var isAllege;
    // if(isAllegeNo.checked){
    //     isAllege=0;
    // }
    // if(isAllegeYes.checked){
    //     isAllege=1;
    // }
    var receiveReportForm;
    if(receiveReportForm1.checked){
        receiveReportForm=0;
    }
    if(receiveReportForm2.checked){
        receiveReportForm=2;
    }
    var isCancel;
    if(isCancelNo.checked){
        isCancel=0;
    }
    if(isCancelYes.checked){
        isCancel=1;
    }
    var needAudit;
    if(specimenNeedauditYes.checked){
        needAudit="1";
    }
    if(specimenNeedauditNo.checked){
        needAudit="2";
    }
    //保存审核开启状态
    var auditLevelConfig="";
    var array=new Array();
    var tempFlag = false;
    if(needAudit == 1) {
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
    //    由于有可能将状态开启，但所有审核层级都设置成无的情况，故执行如下代码
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

    var aheadCancel=$('#aheadCancel').val();
    var timesCancel=$('#timesCancel').val();
    var pricePerTime=$('#pricePerTime').val();
    var deductCreditScore=$('#deductCreditScore').val();
    var myData={
        "needAudit":needAudit,
        "receivePerTime":receivePerTime,
        "receiveDay":receiveDay,
        "maxReceive":maxReceive,
        "finishHour":finishHour,
        "minAheadDay":minAheadDay,
        "maxAheadDay":maxAheadDay,
        "sendSpecimenForm":sendSpecimenForm,
        "isAllege":isAllege,
        "receiveReportForm":receiveReportForm,
        "isCancel":isCancel,
        "aheadCancel":aheadCancel,
        "timesCancel":timesCancel,
        "pricePerTime":pricePerTime,
        "deductCreditScore":deductCreditScore,
        "configSpecimenUid":$('#configSpecimenUid').val(),
        "templateName":templateName,
        "templetFlag":$('#templetFlag').val(),
        "auditLevelConfig":auditLevelConfig
    }
    $.ajax({
        url:"../config/saveConfigSpecimenApp",
        type:'POST',
        async:false,
        data:myData,
        success:function(data){//AJAX查询成功
            // window.location.reload();
            if("nameRepeat" == data) {
                alert("模板名称重复，请换一个模板名！");
            }else{
                if(data=="setOpenTime"){
                    alert("请设置可接样时间！");
                }else{
                    if(data=="success"){
                        alert("修改成功！");
                        window.location.reload();
                        if($('#templet').val() == 'true'){
                            parent.window.location.reload();
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);

                        }
                    }else{
                        alert("修改失败！");
                    }
                }
            }


        },
        error:function(){
            alert("修改失败");
        }
    });
}
//保存送样检测预约模版设置
function saveConfigSpecimenTempletApp(insUid){
    // var receivePerTime=$('#receivePerTime').val();
    var receivePerTime=$('#receivePerTime').combobox('getValue');
    var receiveDays=$('#receiveDay').combobox('getValues');
    var receiveDay="";
    for (i=0; i<receiveDays.length; i++) {
        if(receiveDays[i]==0){receiveDays[i]=7}
        receiveDay = receiveDay + receiveDays[i] + ",";
    }
    receiveDay = receiveDay.substring(0, receiveDay.length - 1);
    var maxReceive=$('#maxReceive').val();
    var finishHour=$('#finishHour').val();
    var minAheadDay=$('#minAheadDay').val();
    var maxAheadDay=$('#maxAheadDay').val();
    var sendSpecimenForm;
    if(sendSpecimenForm1.checked){
        sendSpecimenForm=0;
    }
    if(sendSpecimenForm2.checked){
        sendSpecimenForm=1;
    }
    if(sendSpecimenForm3.checked){
        sendSpecimenForm=2;
    }
    var isAllege;
    // if(isAllegeNo.checked){
    //     isAllege=0;
    // }
    // if(isAllegeYes.checked){
    //     isAllege=1;
    // }
    var receiveReportForm;
    if(receiveReportForm1.checked){
        receiveReportForm=0;
    }
    if(receiveReportForm2.checked){
        receiveReportForm=2;
    }
    var isCancel;
    if(isCancelNo.checked){
        isCancel=0;
    }
    if(isCancelYes.checked){
        isCancel=1;
    }
    var needAudit;
    if(specimenNeedauditYes.checked){
        needAudit="1";
    }
    if(specimenNeedauditNo.checked){
        needAudit="2";
    }
    //保存审核开启状态
    var auditLevelConfig="";
    var array=new Array();
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
    var aheadCancel=$('#aheadCancel').val();
    var timesCancel=$('#timesCancel').val();
    var pricePerTime=$('#pricePerTime').val();
    var deductCreditScore=$('#deductCreditScore').val();
    var myData={
        "needAudit":needAudit,
        "receivePerTime":receivePerTime,
        "receiveDay":receiveDay,
        "maxReceive":maxReceive,
        "finishHour":finishHour,
        "minAheadDay":minAheadDay,
        "maxAheadDay":maxAheadDay,
        "sendSpecimenForm":sendSpecimenForm,
        "isAllege":isAllege,
        "receiveReportForm":receiveReportForm,
        "isCancel":isCancel,
        "aheadCancel":aheadCancel,
        "timesCancel":timesCancel,
        "pricePerTime":pricePerTime,
        "deductCreditScore":deductCreditScore,
        "configSpecimenTempletUid":insUid,
        "templetFlag":$('#templetFlag').val(),
        "auditLevelConfig":auditLevelConfig
    }
    $.ajax({
        url:"../config/saveConfigSpecimenTempletApp",
        type:'POST',
        async:false,
        data:myData,
        success:function(data){//AJAX查询成功
            // window.location.reload();
            if("nameRepeat" == data) {
                alert("模板名称重复，请换一个模板名！");
            }else{
                if(data=="setOpenTime"){
                    alert("请设置可接样时间！");
                }else{
                    if(data=="success"){
                        alert("修改成功！");
                        window.location.reload();
                        if($('#templet').val() == 'true'){
                            parent.window.location.reload();
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);

                        }
                    }else{
                        alert("修改失败！");
                    }
                }
            }
        },
        error:function(){
            alert("修改失败");
        }
    });
}
//openFlag==0 是开放时间 1是禁止时间
function add(openFlag)
{       var insUid=$('#insUid').val();
   if(openFlag==1) {
       var yearStart = $('#timeYearStart').val();
       var yearEnd = $('#timeYearEnd').val();
       // var hourStart = $('#timeHourStart').val();
       // var hourEnd = $('#timeHourEnd').val();
       var hourStart = "00:00:00";//送样检测没有时间段设置，暂时隐去
       var hourEnd = "11:11:11";
       var weekday = $('#SelectWeekDays').val();
       var weekdays = "";
       if (CompareDate(yearStart, yearEnd) == true || CompareHourAndMinutes(hourStart, hourEnd)) {
           alert("开始时间不能大于结束时间！");
       } else {
           if (yearStart == "" || yearEnd == "" || hourStart == "" || hourEnd == "") {
               alert("还有未选择的时间！");
           } else {
               if (weekday) {
                   for (i=0; i<weekday.length; i++) {
                       if(weekday[i]==0){weekday[i]=7}
                       weekdays = weekdays + weekday[i] + ",";
                   }
                   weekdays = weekdays.substring(0, weekdays.length - 1);
                   var information="";
                   addRecord(yearStart, yearEnd, hourStart, hourEnd, weekdays, insUid, openFlag,information);
               } else {
                   alert("没有选每周哪几天！");
               }
           }
       }
   }else {
       var information=info.value;
       var yearStart1 = $('#timeYearStart1').val();
       var yearEnd1 = $('#timeYearEnd1').val();
       // var hourStart1 = $('#timeHourStart1').val();
       // var hourEnd1 = $('#timeHourEnd1').val();
       var hourStart1 = "00:00:00";//送样检测没有时间段设置，暂时隐去
       var hourEnd1 = "11:11:11";
       var weekday1 = $('#SelectWeekDays1').val();
       var weekdays1 = "";
       if(information==""){
           alert("请填写不可预约的原因!");
       }else {
           if (CompareDate(yearStart1, yearEnd1) == true || CompareHourAndMinutes(hourStart1, hourEnd1)) {
               alert("开始时间不能大于结束时间！");
           } else {
               if (yearStart1 == "" || yearEnd1 == "" || hourStart1 == "" || hourEnd1 == "") {
                   alert("还有未选择的时间！");
               } else {
                   if (weekday1) {
                       for (i = 0; i < weekday1.length; i++) {
                           if (weekday1[i] == 0) {
                               weekday1[i] = 7
                           }
                           weekdays1 = weekdays1 + weekday1[i] + ",";
                       }
                       weekdays1 = weekdays1.substring(0, weekdays1.length - 1);
                       addRecord(yearStart1, yearEnd1, hourStart1, hourEnd1, weekdays1, insUid, openFlag,information);
                   } else {
                       alert("没有选每周哪几天！");
                   }
               }
           }
       }
   }
}

//比较具体时间
function CompareHourAndMinutes(t1,t2){
    var t11=t1.split(":");
    var t21=t2.split(":");
    if(t11[0]>t21[0]){
        return true;
    }else{
        if(t11[0]==t21[0]){
            if(t11[1]>t21[1])
            {
                return true;
            }else{
                if(t11[1]==t21[1]){
                    if(t11[2]>=t21[1]){
                        return true;
                    }else{
                        return false;
                    }
                }
            }
        }
    }
}
//比较日期大小
function CompareDate(d1,d2)
{
    return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
}

function addRecord(yearStart,yearEnd,hourStart,hourEnd,weekdays,insUid,openFlag,information){
    var myData={
        "yearStart":yearStart,
        "yearEnd":yearEnd,
        "weekdays":weekdays,
        "hourStart":hourStart,
        "hourEnd":hourEnd,
        "configSpecimenUid":$('#configSpecimenUid').val(),
        "openFlag":openFlag,
        "information":information
    }
    $.ajax({
        url:"../config/addInstrumentSpecimenAppRecord",
        type:'POST',
        async:false,
        data:myData,
        success:function(data){//AJAX查询成功
            if(openFlag==1){
                var a_tag = '<td><a class="fa fa-trash-o ml10" onclick="deleteRecordByConfigOpenTimeUid(&quot;'+data+'&quot;)"></a></td>';
                var td =
                    "<td>"+ yearStart + "至" + yearEnd + "</td>" +
                    "<td>周"+weekdays + "</td>";
                var str = '<tr id="'+data+'"></tr>';
                var $str = $(str);
                $str.append($(td));
                $str.append($(a_tag));
                $("#openTime").append($str);
                $("#timeYearStart").val("");
                $("#timeYearEnd").val("");
                $('#SelectWeekDays').selectpicker('val', '');
                $('#SelectWeekDays').selectpicker('render');
            }else{
                var a_tag = '<td><a class="fa fa-trash-o ml10" onclick="deleteRecordByConfigOpenTimeUid(&quot;'+data+'&quot;)"></a></td>';
                var td =
                    "<td>"+ yearStart + "至" + yearEnd + "</td>" +
                    "<td>周"+weekdays + "</td>" +
                    "<td>"+
                    ""+information+"</td>";
                var str = '<tr id="'+data+'"></tr>';
                var $str = $(str);
                $str.append($(td));
                $str.append($(a_tag));
                $("#notOpen").append($str);
                $("#timeYearStart1").val("");
                $("#timeYearEnd1").val("");
                $('#SelectWeekDays1').selectpicker('val', '');
                $('#SelectWeekDays1').selectpicker('render');
                $("#info").val("");

            }
            // if(data=="success"){
            //     alert("添加成功！");
            // }else{
            //     alert("添加失败！");
            // }
           // window.location.reload();
        }
    });

}

function deleteRecordByConfigOpenTimeUid(uid){
    layer.confirm('确定删除吗？',{icon:3,title:"提示"},function(index){
        var myData={
            "uid":uid,
        }
        $.ajax({
            url:"../instrument/deleteInstrumentMachineAppRecord",
            type:'POST',
            async:false,
            data:myData,
            success:function(data){//AJAX查询成功
                    $('#'+uid).hide(1000);
                    alert("删除成功！");
            }
        })
        layer.close(index);
    });
}

function checkStyle(value){
    if(value==0){
        $("#choice1").show();
        $("#choice2").show();
        $("#choice3").show();
        $("#choice4").show();
        $("#multiChoiceMust1").hide();
        $("#multiChoiceMust2").hide();
        $("#multiChoiceMust3").hide();
        $("#multiChoiceMust4").hide();
        $("#multiSpan1").hide();
        $("#multiSpan2").hide();
        $("#multiSpan3").hide();
        $("#multiSpan4").hide();
    }
    if(value==1){
        $("#choice1").show();
        $("#choice2").show();
        $("#choice3").show();
        $("#choice4").show();
        $("#multiChoiceMust1").show();
        $("#multiChoiceMust2").show();
        $("#multiChoiceMust3").show();
        $("#multiChoiceMust4").show();
        $("#multiSpan1").show();
        $("#multiSpan2").show();
        $("#multiSpan3").show();
        $("#multiSpan4").show();
    }
    if(value==2){
        $("#choice1").hide();
        $("#choice2").hide();
        $("#choice3").hide();
        $("#choice4").hide();
        $("#multiChoiceMust1").hide();
        $("#multiChoiceMust2").hide();
        $("#multiChoiceMust3").hide();
        $("#multiChoiceMust4").hide();
        $("#multiSpan1").hide();
        $("#multiSpan2").hide();
        $("#multiSpan3").hide();
        $("#multiSpan4").hide();
    }
}
//新建样品扩展属性
function addConfigSpecimenExtend(insUid){
    var name=$('#name').val();
    var style=$('#style').val();
    var myStyle;
    var choice1=$('#choice1').val();
    var choice2=$('#choice2').val();
    var choice3=$('#choice3').val();
    var choice4=$('#choice4').val();
    if(style==2){
        myStyle="输入框";
    }
    if(style==0){
        myStyle="单选框";
    }
    if(style==1){
        myStyle="多选框";
        var vmultiChoiceMust1=$('#multiChoiceMust1').val();
        var vmultiChoiceMust2=$('#multiChoiceMust2').val();
        var vmultiChoiceMust3=$('#multiChoiceMust3').val();
        var vmultiChoiceMust4=$('#multiChoiceMust4').val();
        var must='(必填)';
        var notMust='(选填)';
        if(vmultiChoiceMust1 == '是'){
            vmultiChoiceMust1=must;
        }
        if(vmultiChoiceMust1 == '否'){
            vmultiChoiceMust1=notMust;
        }
        if(vmultiChoiceMust2 == '是'){
            vmultiChoiceMust2=must;
        }
        if(vmultiChoiceMust2 == '否'){
            vmultiChoiceMust2=notMust;
        }
        if(vmultiChoiceMust3 == '是'){
            vmultiChoiceMust3=must;
        }
        if(vmultiChoiceMust3 == '否'){
            vmultiChoiceMust3=notMust;
        }
        if(vmultiChoiceMust4 == '是'){
            vmultiChoiceMust4=must;
        }
        if(vmultiChoiceMust4 == '否'){
            vmultiChoiceMust4=notMust;
        }
        if(choice1 == ''){
            vmultiChoiceMust1="";
        }
        if(choice2 == ''){
            vmultiChoiceMust2="";
        }
        if(choice3 == ''){
            vmultiChoiceMust3="";
        }
        if(choice4 == ''){
            vmultiChoiceMust4="";
        }
    }
    if(style==1){
        var myData={
            "configSpecimenUid":$('#configSpecimenUid').val(),
            "name":name,
            "style":style,
            "choice1":choice1,
            "choice2":choice2,
            "choice3":choice3,
            "choice4":choice4,
            "multiChoiceMust1":vmultiChoiceMust1,
            "multiChoiceMust2":vmultiChoiceMust2,
            "multiChoiceMust3":vmultiChoiceMust3,
            "multiChoiceMust4":vmultiChoiceMust4
        }
    }else{
        var myData={
            "configSpecimenUid":$('#configSpecimenUid').val(),
            "name":name,
            "style":style,
            "choice1":choice1,
            "choice2":choice2,
            "choice3":choice3,
            "choice4":choice4
        }
    }
    $.ajax({
        url:"../config/addConfigSpecimenExtend",
        type:'POST',
        async:false,
        data:myData,
        success:function(configSpecimenExtend){//AJAX新增成功
            var a_tag = '<td><a class="fa fa-trash-o ml10" onclick="deleteConfigSpecimenExtend(&quot;'+configSpecimenExtend.uid+'&quot;)"></a></td>';
            var td =
                "<td>"+ name+ "</td>" +
                "<td>"+myStyle + "</td>" ;
                if(style==1) {
                    td+="<td>"+choice1+vmultiChoiceMust1+"</td>"+
                        "<td>"+choice2+vmultiChoiceMust2+"</td>"+
                        "<td>"+choice3+vmultiChoiceMust3+"</td>"+
                        "<td>"+choice4+vmultiChoiceMust4+"</td>";
                }else{
                    td+="<td>"+choice1+"</td>"+
                    "<td>"+choice2+"</td>"+
                    "<td>"+choice3+"</td>"+
                    "<td>"+choice4+"</td>";
                }
            var str = '<tr id="'+configSpecimenExtend.uid+'"></tr>';
            var $str = $(str);
            $str.append($(td));
            $str.append($(a_tag));
            $("#extends").append($str);
            //window.location.reload();
            $("#name").val("");
            $("#choice1").val("");
            $("#choice1").val("");
            $("#choice2").val("");
            $("#choice3").val("");
            $("#choice4").val("");
        }
    });
}

//删除送样检测收费项
function deleteConfigSpecimenExtend(extendUid){
    var myData={
        "extendUid":extendUid
    }
    $.ajax({
        url:"../config/deleteConfigSpecimenExtend",
        type:'POST',
        async:false,
        data:myData,
        success:function(data){//AJAX成功
            $('#'+extendUid).hide(1000);
           // window.location.reload();
        }
    });
}

function checkExistConfigSpecimen(insuid){
    var myData={
        "insUid":insUid
    }
    $.ajax({
        url:"../config/checkExistConfigSpecimen?insUid="+insuid,
        type:'GET',
        success:function(data){
            if(data=="success"){
                window.location.href='../config/editInstrumentSpecimenAppBilling?insUid='+insuid;
            }else if(data=="error"){
                alert("请先进行送样检测基本设置！");
            }
        }
    });
    // th:href="@{/config/editInstrumentSpecimenAppBilling(insUid=${viewInstrument[12]})}"

}


//及时保存送样检测预约设置
function saveConfigSpecimenAppNoDelay(insUid){
    console.log("happy");
    var templateName = "-1";
    var receivePerTime=$('#receivePerTime').combobox('getValue');
    var receiveDays=$('#receiveDay').combobox('getValues');
    var receiveDay="";
    for (i=0; i<receiveDays.length; i++) {
        if(receiveDays[i]==0){receiveDays[i]=7}
        receiveDay = receiveDay + receiveDays[i] + ",";
    }
    receiveDay = receiveDay.substring(0, receiveDay.length - 1);
    var maxReceive=$('#maxReceive').val();
    var finishHour=$('#finishHour').val();
    var minAheadDay=$('#minAheadDay').val();
    var maxAheadDay=$('#maxAheadDay').val();
    var sendSpecimenForm;
    if(sendSpecimenForm1.checked){
        sendSpecimenForm=0;
    }
    if(sendSpecimenForm2.checked){
        sendSpecimenForm=1;
    }
    if(sendSpecimenForm3.checked){
        sendSpecimenForm=2;
    }
    var isAllege;
    // if(isAllegeNo.checked){
    //     isAllege=0;
    // }
    // if(isAllegeYes.checked){
    //     isAllege=1;
    // }
    var receiveReportForm;
    if(receiveReportForm1.checked){
        receiveReportForm=0;
    }
    if(receiveReportForm2.checked){
        receiveReportForm=2;
    }
    var isCancel;
    if(isCancelNo.checked){
        isCancel=0;
    }
    if(isCancelYes.checked){
        isCancel=1;
    }
    var needAudit;
    if(specimenNeedauditYes.checked){
        needAudit="1";
    }
    if(specimenNeedauditNo.checked){
        needAudit="2";
    }
    var aheadCancel=$('#aheadCancel').val();
    var timesCancel=$('#timesCancel').val();
    var pricePerTime=$('#pricePerTime').val();
    var deductCreditScore=$('#deductCreditScore').val();
    var myData={
        "needAudit":needAudit,
        "receivePerTime":receivePerTime,
        "receiveDay":receiveDay,
        "maxReceive":maxReceive,
        "finishHour":finishHour,
        "minAheadDay":minAheadDay,
        "maxAheadDay":maxAheadDay,
        "sendSpecimenForm":sendSpecimenForm,
        "isAllege":isAllege,
        "receiveReportForm":receiveReportForm,
        "isCancel":isCancel,
        "aheadCancel":aheadCancel,
        "timesCancel":timesCancel,
        "pricePerTime":pricePerTime,
        "deductCreditScore":deductCreditScore,
        "configSpecimenUid":$('#configSpecimenUid').val(),
        "templateName":templateName
    }
    $.ajax({
        url:"../config/saveConfigSpecimenAppNoDelay",
        type:'POST',
        async:false,
        data:myData,
        success:function(data){//AJAX查询成功
        }
    });
}
//保存附加收费
function saveAdditional(){
    var feeNumber=$('#additionName').val();
    var fee=$('#fee').val();
    var info1=$('#info1').val();
    var f=parseInt(fee);
    if(feeNumber!="") {
        if (!isNaN(f)) {
            var myData={
                "feeNumber":feeNumber,
                "fee":fee,
                "info":info1,
                "configSpecimenUid":$('#configSpecimenUid').val()
            }
            $.ajax({
                url:"../config/addConfigAdditionalSpecimen",
                type:'POST',
                async:false,
                data:myData,
                success:function(data){//AJAX查询成功
//                            if(data=="success"){
//                                alert("添加成功！");
//                            }else{
//                                alert("添加失败！");
//                            }
                    //alert(data);
                    var a_tag = '<td><a class="fa fa-trash-o ml10" onclick="deleteConfigAdditonalRecordByUid(&quot;'+data+'&quot;)"></a></td>';
                    var td =
                        "<td>"+ feeNumber+ "</td>" +
                        "<td>"+fee + "</td>" +
                        "<td>"+info1 + "</td>";
                    var str = '<tr id="'+data+'"></tr>';
                    var $str = $(str);
                    $str.append($(td));
                    $str.append($(a_tag));
                    $("#addition").append($str);
                    $("#additionName").val("");
                    $("#fee").val("");
                    $("#info1").val("");
                }
            });
            // window.location.reload();
        } else {
            alert("输入正确的价格");
        }

    } else{
        alert("输入项目名称!");
    }
}
//附加收费
function deleteConfigAdditonalRecordByUid(uid){
    layer.confirm('确定删除吗？',{icon:3,title:"提示"},function(index){
        var myData={
            "uid":uid,
        }
        $.ajax({
            url:"../config/deleteConfigAdditionalRecord",
            type:'POST',
            async:false,
            data:myData,
            success:function(data){//AJAX查询成功
                if(data=="success"){
                    //alert("删除成功！");
                    //location.reload();
                    $('#'+uid).hide(1000);

                }else{
                    alert("删除失败！");
                }
            }
        })
        layer.close(index);
    });
}
function hiddAudit() {
    $("#isneedAudit").css('display', 'none');
}

function showAudit() {
    $("#isneedAudit").css('display', 'inline');
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