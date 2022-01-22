
function getTarget(flag){

    var sourceType = $('#device_type_1').val();
    console.log(sourceType);
    if(flag==3){
        sourceType = $('#device_type_2').val();
    }
    $.ajax({
        url:'../instrument/getSecond',
        //dataType:"json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        type:"GET",
        data:{sourceType:sourceType,flag:flag},
        complete:function(result){
            var obj = eval(eval(result.responseText));
            if(flag==2){
                var device_type_2="<option value=''>请选择</option>";
                $("#device_type_2").empty();
                for(var i=0;i<obj.length;i++){
                    device_type_2 = device_type_2+ "<option value='"+obj[i].id+"'>"+obj[i].value+"</option>";
                }
                $("#device_type_2").append(device_type_2);
                $("#device_type_2").trigger("liszt:updated");

                device_type_2="";
                $('#deviceClass').val("");
            }else{
                var device_type_3="<option value=''>请选择</option>";
                $("#device_type_3").empty();
                for(var i=0;i<obj.length;i++){
                    device_type_3 = device_type_3+ "<option value='"+obj[i].id+"'>"+obj[i].value+"</option>";
                }
                $("#device_type_3").append(device_type_3);
                $("#device_type_3").trigger("liszt:updated");
                device_type_3="";
                $('#deviceClass').val("");
            }
        }
    });
}
function putIntoClass(){
    var deviceClass = $('#device_type_1').find("option:selected").text()+" "
        +$('#device_type_2').find("option:selected").text()+" "
        +$('#device_type_3').val();
    $('#deviceClass').val(deviceClass);
}
// 数据回显
$(document).ready(function(){
    var result=$("#result").val();
    var result1=$("#result1").val();
    //是否二次开发
    if(result==1){
        document.getElementById("isSecondDevelop1").checked='checked';
    }else{
        document.getElementById("isSecondDevelop2").checked='checked';
    }
    //设备类型
    if(result1==1){
        document.getElementById("instrumentType1").checked='checked';
    }else{
        document.getElementById("instrumentType2").checked='checked';
    }
    //学科领域
    var result2=$("#result2").val()
    if (result2 != null) {
        var deviceSubject = result2.split(',');
        for (var i = 0; i < deviceSubject.length; i++) {
            $('#deviceSubject_' + deviceSubject[i]).attr("checked", true);
        }
    }
    //经费来源
    var result3=$("#result3").val()
    if (result3 != null) {
        var fundSource = result3;
        $('#fundSource' + fundSource).attr("checked", true);
    }
    //研究中心
    var result4 = $("#result4").val();
    if(result4 != null){
        var researchBase = result4;
        var researchBaseArr = researchBase.split(",");
        for(var i=0;i<researchBaseArr.length;i++){
            var index = researchBaseArr[i].substring(0,1);
            var $val = researchBaseArr[i].substring(1);
            $("input[name='deviceSubName"+index+"']").val($val);
            $("#deviceSubType"+index).prop("checked",true);
        }
    }
    //保藏机构
    var result5 = $("#result5").val();
    if(result5 != null){
        var preservationBase = result5;
        var preservationBaseArr = preservationBase.split(",");
        for(var i=0;i<preservationBaseArr.length;i++){
            var index = preservationBaseArr[i].substring(0,1);
            var $val = preservationBaseArr[i].substring(1);
            $("input[name='preservationSubName"+index+"']").val($val);
            $("#preservationSubType"+index).prop("checked",true);
        }
    }
})
//提交数据
function submitEditForm(uid) {
    var auditChecked;
    var instrumentType;
    if(document.getElementById("isSecondDevelop1").checked){
        auditChecked=1;
    }else{
        auditChecked=2;
    }
    if(document.getElementById("instrumentType1").checked){
        instrumentType=1;
    }else{
        instrumentType=2;
    }
    //学科领域
    var arr=document.getElementsByName("deviceSubject");
    var deviceSubject="";
    for(var i=0;i<arr.length;i++) {
        if (arr[i].checked) {
            deviceSubject += arr[i].value+',';
        }
    }
    //经费来源
    var radios = document.getElementsByName("fundSource");
    var fundSource="";
    for(var i=0;i<radios.length;i++) {
        if (radios[i].checked) {
            fundSource += radios[i].value;
        }
    }
    //保藏机构

    var preservationSubName="";
    $("input[name='preservationSubType']:checked").each(function () {
        preservationSubName+=$(this).val()+$(this).parent().siblings("td").find("input").val()+',';
    });
    //研究基地
    var deviceSubName="";
    $("input[name='deviceSubType']:checked").each(function () {
        deviceSubName+=$(this).val()+$(this).parent().siblings("td").find("input").val()+',';
    });

    var myData={
        'instrumentType':instrumentType,
        'isSecondDevelop':auditChecked,
        'researchBase':deviceSubName,
        'preservationBase':preservationSubName,
        'fundSource':fundSource,
        'serviceDirection':$("#serviceDirection").val(),
        'mainSubject':deviceSubject,
        'runFundSource':$("#runFundSource").val(),
        'runFundOutYear':$("#runFundOutYear").val(),
        'serviceIncome':$("#serviceIncome").val(),
        'deviceClass':$("#deviceClass").val(),
        'machineUserCount':$("#machineUserCount").val(),

    }
    $.ajax({
        url:"../instrument/saveInstrumentInfo?insUid="+uid,
        type:'POST',
        asyn:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            if(data=="success"){
                alert("保存成功！");
            }else{
                alert("保存失败！");
            }
        }
    });
}