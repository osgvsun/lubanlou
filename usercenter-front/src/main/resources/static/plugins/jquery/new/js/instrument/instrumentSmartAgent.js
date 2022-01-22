/**
 * Created by Administrator on 2017/9/15.
 */
//替换仪器的设备管理员
function changeSmartAgent(insUid){
    var smart = $("#smart").selected().val();
        $.ajax({
            url:"../instrument/changeSmartAgent?insUid="+insUid+"&smart="+smart,
            type:'POST',
            dataType:"text",
            success:function(data){
                window.location.href="../instrument/instrumentSmartAgent?insUid="+insUid;
            }
        });
}
function addSmartAgent(insUid){
    var agentNo=document.getElementById("agentNo").value;
    var serialNo=document.getElementById("serialNo").value;
    var remark=document.getElementById("remark").value;
    var currIp=document.getElementById("currIp").value;
    var port=document.getElementById("port").value;
    var dbhost=document.getElementById("dbhost").value;
    var myData={
        "insUid":insUid,
        "agentNo":agentNo,
        "serialNo":serialNo,
        "remark":remark,
        "currIp":currIp,
        "port":port,
        "dbhost":dbhost
    }
    $.ajax({
        url:"../instrument/addSmartAgent",
        type:'POST',
        async:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
          window.location.reload();
        }
    });
}
