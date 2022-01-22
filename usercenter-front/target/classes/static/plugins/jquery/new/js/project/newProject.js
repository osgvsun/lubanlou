/**
 * Created by Administrator on 2018/7/12.
 */
//获取选中项目的名称
function selectBeforeProject() {
    var beforeProject = $("#beforeProject").find("option:selected").text();
    if(beforeProject != "请选择"){
        $("#projectName").val(beforeProject);
    }else{
        $("#projectName").val("");
    }
}
function selectProjectType(){
    var type=$("#projectType").val();
    if(type =="ProjectMachine"){
        document.getElementById("typeProjectSpecimen").style.display = "none";
        document.getElementById("unitSpecimen").style.display = "none";
        document.getElementById("typeProjectMachine").style.display = "inline";
        document.getElementById("unit").style.display = "inline";
    }else if(type=="ProjectSpecimen"){
        document.getElementById("typeProjectMachine").style.display = "none";
        document.getElementById("unit").style.display = "none";
        document.getElementById("typeProjectSpecimen").style.display = "inline";
        document.getElementById("unitSpecimen").style.display = "inline";
    }
}
//保存项目
function saveProject() {
    var uid = $("#uid").val();
    var beforeProject = $("#beforeProject").selected().val();
    var projectName = $("#projectName").val();
    var projectCharger = $("#projectCharger").val();
    var type=$("#projectType").selected().val();
    var startDate = $("#startDate").val();
    var billingInsideAcademy = $("#billingInsideAcademy").val();
    var billingOutsideAcademy = $("#billingOutsideAcademy").val();
    var billingOutsideSchool1 = $("#billingOutsideSchool1").val();
    var chargeUnit = $("#chargeUnit").selected().val();
    var description = $("#description").val();
    if( projectName == "" || startDate == "" || chargeUnit ==""){
        alert("请填写*号必选项！！！");
        return false;
    }
    //额外收费设置
    var isurCharge = false;
    var surdescription = $("#surdescription").val();
    var surbillingInsideAcademy = $("#surbillingInsideAcademy").val();
    var surbillingOutsideAcademy = $("#surbillingOutsideAcademy").val();
    var surbillingOutsideSchool1 = $("#surbillingOutsideSchool1").val();
    var surchargeUnit = $("#surchargeUnit").selected().val();
    if($("#surcharge").is(':checked')){
        if( surchargeUnit ==""){
            alert("请填写*号必选项！！！");
            return false;
        }else {
            isurCharge = true;
        }
    }
    var isChargeNumberSpeci = false;
    if ($("#isChargeNumberSpeci").is(':checked')) {
        isChargeNumberSpeci = true;
    }
    //项目新建审核层级开启设置
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
    //项目机时预约审核层级开启设置
    var auditLevelConfigForMachine="";
    var array2=new Array();
    if($("#levelFirstAuditForMachine").val()!=-2){
        array2.push($("#levelFirstAuditForMachine").val())
    }
    if($("#levelSecondAuditForMachine").val()!=-2){
        array2.push($("#levelSecondAuditForMachine").val())
    }
    if($("#levelThirdAuditForMachine").val()!=-2){
        array2.push($("#levelThirdAuditForMachine").val())
    }
    if($("#levelFourthAuditForMachine").val()!=-2){
        array2.push($("#levelFourthAuditForMachine").val())
    }
    if($("#levelFifthAuditForMachine").val()!=-2){
        array2.push($("#levelFifthAuditForMachine").val())
    }
    auditLevelConfigForMachine=array2.join(",");
    //项目送样检测审核层级开启设置
    var auditLevelConfigForSpecimen="";
    var array3=new Array();
    if($("#levelFirstAuditForSpecimen").val()!=-2){
        array3.push($("#levelFirstAuditForSpecimen").val())
    }
    if($("#levelSecondAuditForSpecimen").val()!=-2){
        array3.push($("#levelSecondAuditForSpecimen").val())
    }
    if($("#levelThirdAuditForSpecimen").val()!=-2){
        array3.push($("#levelThirdAuditForSpecimen").val())
    }
    if($("#levelFourthAuditForSpecimen").val()!=-2){
        array3.push($("#levelFourthAuditForSpecimen").val())
    }
    if($("#levelFifthAuditForSpecimen").val()!=-2){
        array3.push($("#levelFifthAuditForSpecimen").val())
    }
    auditLevelConfigForSpecimen=array3.join(",");
    var isNeedAudit=2;
    var isNeedAuditApp=2;
    if(auditLevelConfig!=''){
        isNeedAudit=1
    }
    if(auditLevelConfigForMachine!=''||auditLevelConfigForSpecimen!=''){
        isNeedAuditApp=1
    }
    var myData ={
        'beforeProject':beforeProject,
        'projectName':projectName,
        'projectCharger':projectCharger,
        'type':type,
        'startDate':startDate,
        'billingInsideAcademy':billingInsideAcademy,
        'billingOutsideAcademy':billingOutsideAcademy,
        'billingOutsideSchool1':billingOutsideSchool1,
        'chargeUnit':chargeUnit,
        'description':description,
        'isurCharge':isurCharge,
        'surbillingInsideAcademy':surbillingInsideAcademy,
        'surbillingOutsideAcademy':surbillingOutsideAcademy,
        'surbillingOutsideSchool1':surbillingOutsideSchool1,
        'surchargeUnit':surchargeUnit,
        'surdescription':surdescription,
        'isChargeNumberSpeci':isChargeNumberSpeci,
        'uid':uid,
        "auditLevelConfig":auditLevelConfig,
        "auditLevelConfigForMachine":auditLevelConfigForMachine,
        'auditLevelConfigForSpecimen':auditLevelConfigForSpecimen,
        'isNeedAudit':isNeedAudit,
        'isNeedAuditApp':isNeedAuditApp,
    }
    console.log(myData);
    $.ajax({
        url:'../project/saveProject',
        data:myData,
        //dataType:'json',
        success:function () {
            alert("保存成功");
            var currpage = $("#currpage").val();
            var flag = $("#flag").val();
            window.location.href="../project/projectChargingApplication?currpage="+currpage+"&flag="+flag;
        },
        error:function () {
            alert("网络错误，请重试");
        }
    })
}
//保存项目申请—送样检测
function saveProjectSpecimenApp() {
    var uid = $("#uid").val();
    var beforeProject = $("#beforeProject").selected().val();
    var projectName = $("#projectName").val();
    var startDate = $("#startDate").val();
    var billingInsideAcademy = $("#billingInsideAcademy1").val();
    var billingOutsideAcademy = $("#billingOutsideAcademy1").val();
    var billingOutsideSchool1 = $("#billingOutsideSchool2").val();
    var chargeUnit = $("#chargeUnit1").selected().val();
    var description = $("#description").val();
    if( projectName == "" || startDate == "" || chargeUnit ==""){
        alert("请填写所有必选项！！！");
        return false;
    }
    //额外收费设置1
    var isurCharge = false;
    var surdescription = $("#surdescription1").val();
    var surbillingInsideAcademy = $("#surbillingInsideAcademy1").val();
    var surbillingOutsideAcademy = $("#surbillingOutsideAcademy1").val();
    var surbillingOutsideSchool1 = $("#surbillingOutsideSchool2").val();
    var surchargeUnit = $("#surchargeUnit1").selected().val();
    if($("#surcharge1").is(':checked')){
        if( surchargeUnit1 ==""){
            alert("请填写所有必选项！！！");
            return false;
        }else {
            isurCharge = true;
        }
    }
    var isChargeNumberSpeci = false;
    if ($("#isChargeNumberSpeci1").is(':checked')) {
        isChargeNumberSpeci = true;
    }
    //额外收费设置2
    var maxReceive = $("#maxReceive").val();
    var minAheadDay = $("#minAheadDay").val();
    var maxAheadDay  = $("#maxAheadDay").val();
    var receiveReportForm = '1';
    if($("#receiveReportForm2").is(':checked')){ receiveReportForm = '2';}
    var isAllege ='0';
    if($("#isAllege2").is(':checked')){isAllege = '1';}
    var isCancel ='0';
    if($("#isCancel2").is(':checked')){isCancel = '1';}
    if( isAllege=="" || isCancel=="" || receiveReportForm =="" || maxReceive =="" || minAheadDay =="" || maxAheadDay==""){
        alert("请填写所有必选项！！！");
        return false;
    }
    var auditLevelConfigForProjectSpecimen="";
    var array=new Array();
    if($("#levelFirstAuditForProjectSpecimen").val()!=-2){
        array.push($("#levelFirstAuditForProjectSpecimen").val())
    }
    if($("#levelSecondAuditForProjectSpecimen").val()!=-2){
        array.push($("#levelSecondAuditForProjectSpecimen").val())
    }
    if($("#levelThirdAuditForProjectSpecimen").val()!=-2){
        array.push($("#levelThirdAuditForProjectSpecimen").val())
    }
    if($("#levelFourthAuditForProjectSpecimen").val()!=-2){
        array.push($("#levelFourthAuditForProjectSpecimen").val())
    }
    if($("#levelFifthAuditForProjectSpecimen").val()!=-2){
        array.push($("#levelFifthAuditForProjectSpecimen").val())
    }
    auditLevelConfigForProjectSpecimen=array.join(",");
    //项目送样检测审核层级开启设置
    var auditLevelConfigForSpecimen="";
    var array2=new Array();
    if($("#levelFirstAuditForSpecimen").val()!=-2){
        array2.push($("#levelFirstAuditForSpecimen").val())
    }
    if($("#levelSecondAuditForSpecimen").val()!=-2){
        array2.push($("#levelSecondAuditForSpecimen").val())
    }
    if($("#levelThirdAuditForSpecimen").val()!=-2){
        array2.push($("#levelThirdAuditForSpecimen").val())
    }
    if($("#levelFourthAuditForSpecimen").val()!=-2){
        array2.push($("#levelFourthAuditForSpecimen").val())
    }
    if($("#levelFifthAuditForSpecimen").val()!=-2){
        array2.push($("#levelFifthAuditForSpecimen").val())
    }
    auditLevelConfigForSpecimen=array2.join(",");
    var myData ={
        'beforeProject':beforeProject,
        'projectName':projectName,
        'startDate':startDate,
        'billingInsideAcademy':billingInsideAcademy,
        'billingOutsideAcademy':billingOutsideAcademy,
        'billingOutsideSchool1':billingOutsideSchool1,
        'chargeUnit':chargeUnit,
        'description':description,
        'isurCharge':isurCharge,
        'surbillingInsideAcademy':surbillingInsideAcademy,
        'surbillingOutsideAcademy':surbillingOutsideAcademy,
        'surbillingOutsideSchool1':surbillingOutsideSchool1,
        'surchargeUnit':surchargeUnit,
        'surdescription':surdescription,
        'isChargeNumberSpeci':isChargeNumberSpeci,
        'uid':uid,
        'maxReceive':maxReceive,
        'minAheadDay':minAheadDay,
        'maxAheadDay':maxAheadDay,
        'receiveReportForm':receiveReportForm,
        'isAllege':isAllege,
        'isCancel':isCancel,
        'auditLevelConfigForProjectSpecimen':auditLevelConfigForProjectSpecimen,
        'auditLevelConfigForSpecimen':auditLevelConfigForSpecimen
    }
    console.log(myData);
    $.ajax({
        url:'../project/saveProjectSpecimenApp',
        data:myData,
        //dataType:'json',
        success:function (uid) {
            alert("保存成功");
            var currpage = $("#currpage").val();
            var flag = $("#flag").val();
            window.location.href="../project/newProjectCharging?currpage="+currpage+"&pUid="+uid+"&flag="+flag;
        },
        error:function () {
            alert("网络错误，请重试");
        }
    })
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
function CompareDate(d1,d2)
{
    return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
}
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
function addRecord(yearStart,yearEnd,hourStart,hourEnd,weekdays,insUid,openFlag,information){
    var myData={
        "yearStart":yearStart,
        "yearEnd":yearEnd,
        "weekdays":weekdays,
        "hourStart":hourStart,
        "hourEnd":hourEnd,
        "projectUid":$('#uuid').val(),
        "openFlag":openFlag,
        "information":information
    }
    $.ajax({
        url:"../project/saveProjectSpecimenAppAttach2",
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
function addConfigSpecimenExtend(uid){
    var name=$('#name').val();
    var style=$('#style').val();
    var myStyle;
    var choice1=$('#choice1').val();
    var choice2=$('#choice2').val();
    var choice3=$('#choice3').val();
    var choice4=$('#choice4').val();
    var count=$('#count').val();
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
        if(vmultiChoiceMust1 == '必选'){
            vmultiChoiceMust1=must;
        }
        if(vmultiChoiceMust1 == '非必选'){
            vmultiChoiceMust1=notMust;
        }
        if(vmultiChoiceMust2 == '必选'){
            vmultiChoiceMust2=must;
        }
        if(vmultiChoiceMust2 == '非必选'){
            vmultiChoiceMust2=notMust;
        }
        if(vmultiChoiceMust3 == '必选'){
            vmultiChoiceMust3=must;
        }
        if(vmultiChoiceMust3 == '非必选'){
            vmultiChoiceMust3=notMust;
        }
        if(vmultiChoiceMust4 == '必选'){
            vmultiChoiceMust4=must;
        }
        if(vmultiChoiceMust4 == '非必选'){
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
            "projectUid":$('#uuid').val(),
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
            "projectUid":$('#uuid').val(),
            "name":name,
            "style":style,
            "choice1":choice1,
            "choice2":choice2,
            "choice3":choice3,
            "choice4":choice4
        }
    }

    $.ajax({
        url:"../project/saveProjectSpecimenAppAttach",
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
            $("#name").val("");
            $("#choice1").val("");
            $("#choice1").val("");
            $("#choice2").val("");
            $("#choice3").val("");
            $("#choice4").val("");
            count=parseInt(count)+1
            $("#count").val(count);
        }
    });
}
function deleteConfigSpecimenExtend(extendUid) {
    var myData = {
        "extendUid": extendUid
    }
    var count=$('#count').val();
    $.ajax({
        url: "../config/deleteConfigSpecimenExtend",
        type: 'POST',
        async: false,
        data: myData,
        success: function (data) {//AJAX成功
            $('#' + extendUid).hide(1000);
            count=parseInt(count)-1
            $("#count").val(count);
        }
    });
}
function saveAttach(){
    var myData = {
        "count": $("#count").val(),
    }
    if($("#count").val()==0)
    {
        alert("请填写附表信息");
        return false;
    }
    $.ajax({
        url: "../project/saveNewSpecimenAppAttachForProject",
        type: 'POST',
        async: false,
        data:myData,
        success:function (data) {
            alert("保存成功");
            var currpage = $("#currpage").val();
            var flag = $("#flag").val();
            window.location.href="../project/projectChargingApplication?currpage="+currpage+"&flag="+flag;
        },
        error:function () {
            alert("请填写附表信息");
        }
    })
}
function hiddAudit() {
    document.getElementById("isneedAudit").style.display = "none";
}

function showAudit() {
    document.getElementById("isneedAudit").style.display = "";
}
function hiddAuditForMachine() {
    document.getElementById("isneedAuditForMachine").style.display = "none";
}

function showAuditForMachine() {
    document.getElementById("isneedAuditForMachine").style.display = "";
}
function hiddAuditForSpecimen() {
    document.getElementById("isneedAuditForSpecimen").style.display = "none";
}

function showAuditForSpecimen() {
    document.getElementById("isneedAuditForSpecimen").style.display = "";
}
function hiddAuditForProjectSpecimen() {
    document.getElementById("isneedAuditForProjectSpecimen").style.display = "none";
}

function showAuditForProjectSpecimen() {
    document.getElementById("isneedAuditForProjectSpecimen").style.display = "";
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
function showAuditLevelForMachine(){
    var auditLevel=$("#auditLevelForMachine").val();
    for(var i = 0;i<auditLevel;i++){
        $( $("#AuditLevelsForMachine").children().get(i)).css("display","");
    }
    for(var i=auditLevel;i<$("#AuditLevels").children().size();i++){
        $( $("#AuditLevelsForMachine").children().get(i)).css("display","none");
    }
}
function showAuditLevelForProjectSpecimen(){
    var auditLevel=$("#auditLevelForProjectSpecimen").val();
    for(var i = 0;i<auditLevel;i++){
        $( $("#AuditLevelsForProjectSpecimen").children().get(i)).css("display","");
    }
    for(var i=auditLevel;i<$("#AuditLevels").children().size();i++){
        $( $("#AuditLevelsForProjectSpecimen").children().get(i)).css("display","none");
    }
}
function showAuditLevelForSpecimen(){
    var auditLevel=$("#auditLevelForSpecimen").val();
    for(var i = 0;i<auditLevel;i++){
        $( $("#AuditLevelsForSpecimen").children().get(i)).css("display","");
    }
    for(var i=auditLevel;i<$("#AuditLevels").children().size();i++){
        $( $("#AuditLevelsForSpecimen").children().get(i)).css("display","none");
    }
}
function addOptions(array) {
    $.each(array,function (index,val) {
        $("#AuditLevel"+(index+1)).find("select").append("<option value='on'>"+val+"</option>");

    })
}
function addOptionsForMachine(array) {
    $.each(array,function (index,val) {
        $("#AuditLevelForMachine"+(index+1)).find("select").append("<option value='on'>"+val+"</option>");

    })
}
function addOptionsForSpecimen(array) {
    $.each(array,function (index,val) {
        $("#AuditLevelForSpecimen"+(index+1)).find("select").append("<option value='on'>"+val+"</option>");

    })
}
function addOptionsForProjectSpecimen(array) {
    $.each(array,function (index,val) {
        $("#AuditLevelForProjectSpecimen"+(index+1)).find("select").append("<option value='on'>"+val+"</option>");
    })
}