function hiddAudit() {
    document.getElementById("isneedAudit").style.display = "none";
}
function showAudit() {
    document.getElementById("isneedAudit").style.display = "";
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
//保存审核层级设置
function saveProjectAudit(data){
    var auditLevel=$("#auditLevel").val();
    for(var i=auditLevel;i<$("#AuditLevels").children().size();i++){
        $( $("#AuditLevels").children().get(i)).find("select").val("-2");
    }
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
    var type=data;
    var myData={
        "auditLevelConfig": auditLevelConfig,
        "type":type,
    }
    $.ajax({
        url: "../common/saveAuditLevelConfig",
        type: 'POST',
        async: false,
        data: myData,
        success: function (data) {
            if(data=='success')
            {
                alert("保存设置成功")
            }
        }
    });
}
