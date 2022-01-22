/**
 * Created by Administrator on 2017/9/6.
 */
$(function () {
    var editValue=$('#edit').val();
    if(editValue=='true'){
        var data=$('#academy').val();
        var arr=data.split(',');
        $('#openAcademy').selectpicker('val', arr);
        $('#openAcademy').selectpicker('render');
        $("#academyId").show();
    }else{
        var configUid =$("#uid").val();
        var openScope = $("#academy").val();
        if(openScope == "2"){
            $.ajax({
                type: "POST",
                url: '../config/getInstrumentAcademyNumber?configUid='+configUid,
                dataType:"json",
                success: function (data) {
                    var arr=data.split(',');
                    $('#openAcademy').selectpicker('val', arr);
                    $('#openAcademy').selectpicker('render');
                }
            });
            $("#academyId").show();
        }
    }

})

function showAcademy() {
    $("#academyId").show();
}
function hideAcademy() {
    $("#academyId").hide();
}
//保存设置
function saveInstrumentAppBasicSet(insUid) {

    //判断是否完整填写
    var resvIsHour1=document.getElementById("resvIsHour1").checked;
    var resvIsHour2=document.getElementById("resvIsHour2").checked;
    var resvIsSpecimen1=document.getElementById("resvIsSpecimen1").checked;
    var resvIsSpecimen2=document.getElementById("resvIsSpecimen2").checked;
    var resvCreditScore=document.getElementById("resvCreditScore").value;
    var openScope1=document.getElementById("openScope1").checked;
    var openScope2=document.getElementById("openScope2").checked;
    var openScope3=document.getElementById("openScope3").checked;
    var openAcademy=document.getElementById("openAcademy").value;
    var canSave=true;
    if(!resvIsHour1&&!resvIsHour2){
        canSave=false;
    }
    if(!resvIsSpecimen1&&!resvIsSpecimen2){
        canSave=false;
    }
    if(resvCreditScore==null || resvCreditScore=="" ){
        canSave=false;
    }
    if(!openScope1&&!openScope2&&!openScope3){
        canSave=false;
    }
    if(openScope2){
        if(openAcademy==null||openAcademy==""){
            canSave=false;
        }
    }
    if(canSave){
        var acalist = $('#openAcademy').val();
        $.ajax({
            type: "POST",
            url: '../config/saveInstrumentAppBasicSet?acalist='+acalist+'&insUid='+insUid,
            data: $("#searchForm").serialize(),//表单数据
            success: function (data) {
                if(data=="success"){
                    alert("保存成功");
                    window.location.reload();
                }
            }
        });
    }else{
        alert("请填完整设置！");
    }




}
function saveTemplateName(type) {
    var edit=$('#edit').val();
    if(edit=='true'){
        var text="";
        if(type == 'basicSet'){
            saveTempletBasicSet(text);
        }
        if(type == 'accessType'){
            saveTempletAccessType(text);
        }
    }else{
        layer.prompt({title: '请输入模板名', formType: 2}, function (text, index) {
            layer.close(index);
            if(type == 'basicSet'){
                saveTempletBasicSet(text);
            }
            if(type == 'accessType'){
                saveTempletAccessType(text);
            }
        });
    }

}
function saveTempletBasicSet(text) {

    //判断是否完整填写
    var resvIsHour1=document.getElementById("resvIsHour1").checked;
    var resvIsHour2=document.getElementById("resvIsHour2").checked;
    var resvIsSpecimen1=document.getElementById("resvIsSpecimen1").checked;
    var resvIsSpecimen2=document.getElementById("resvIsSpecimen2").checked;
    var resvCreditScore=document.getElementById("resvCreditScore").value;
    var openScope1=document.getElementById("openScope1").checked;
    var openScope2=document.getElementById("openScope2").checked;
    var openScope3=document.getElementById("openScope3").checked;
    var openAcademy=document.getElementById("openAcademy").value;
    var canSave=true;
    if(!resvIsHour1&&!resvIsHour2){
        canSave=false;
    }
    if(!resvIsSpecimen1&&!resvIsSpecimen2){
        canSave=false;
    }
    if(resvCreditScore==null || resvCreditScore=="" ){
        canSave=false;
    }
    if(!openScope1&&!openScope2&&!openScope3){
        canSave=false;
    }
    if(openScope2){
        if(openAcademy==null||openAcademy==""){
            canSave=false;
        }
    }
    if(canSave){
        var acalist = $('#openAcademy').val();
        $.ajax({
            type: "POST",
            url: '../config/saveTempletBasicSet?acalist='+acalist+"&name="+text+"&edit="+$('#edit').val(),
            data: $("#searchForm").serialize(),//表单数据
            dataType:"json",
            success: function (data) {
                if(data=='repeat'){
                    alert("模板名称重复，请重新填写！");
                }
                if(data=="success"){
                    alert("保存成功");
                    parent.window.location.reload();
                }
            }
        });
    }else{
        alert("请填完整设置！");
    }
}
function saveTempletAccessType(text) {

    //判断是否完整填写
    var accessIsTrainingYes1=document.getElementById("accessIsTrainingYes").checked;
    var accessIsTrainingNo1=document.getElementById("accessIsTrainingNo").checked;
    var accessIsExamYes1=document.getElementById("accessIsExamYes").checked;
    var accessIsExamNo1=document.getElementById("accessIsExamNo").checked;
    var accessIsSapYes1=document.getElementById("accessIsSapYes").checked;
    var accessIsSapNo1=document.getElementById("accessIsSapNo").checked;
    var canSave=true;
    if(!accessIsTrainingYes1&&!accessIsTrainingNo1){
        canSave=false;
    }
    if(!accessIsExamYes1&&!accessIsExamNo1){
        canSave=false;
    }
    if(!accessIsSapYes1&&!accessIsSapNo1){
        canSave=false;
    }
    if(canSave){
        $.ajax({
            type: "POST",
            url: '../config/saveTempletAccessType?name='+text+"&edit="+$('#edit').val(),
            data: $("#searchForm").serialize(),//表单数据
            dataType:"json",
            success: function (data) {
                if(data=='repeat'){
                    alert("模板名称重复，请重新填写！");
                }
                if(data=="success"){
                    alert("保存成功");
                    parent.window.location.reload();
                }
            }
        });
    }else{
        alert("请填完整设置！");
    }
}

