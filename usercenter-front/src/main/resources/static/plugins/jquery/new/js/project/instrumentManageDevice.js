/**
 * Created by Administrator on 2018/7/13.
 */
//添加设备组
function addInstrumentGroup() {
    var groupName = $("#groupName").val();
    var pUid = $("#pUid").val();
    var beforeCurrpage = $("#beforeCurrpage").val();
    var flag = $("#flag").val();
    window.location.href="../project/addInstrumentGroup?groupName="+groupName+"&pUid="+pUid+"&beforeCurrpage="+beforeCurrpage+"&flag="+flag;
}
//删除设备组
$(".deleteInstrumetGroup").click(function () {
    var pUid = $("#pUid").val();
    var beforeCurrpage = $("#beforeCurrpage").val();
    var flag = $("#flag").val();
    var groupId = $(this).attr("data");
    window.location.href="../project/deleteInstrumetGroup?groupId="+groupId+"&pUid="+pUid+"&beforeCurrpage="+beforeCurrpage+"&flag="+flag;
})
//添加设备
$(".addInstrumetToGroup").click(function () {
    var beforeCurrpage = $("#beforeCurrpage").val();
    var pUid = $("#pUid").val();
    var instrumentUid = $(this).parent().siblings(".instrumentUid").selected().val();
    var groupId = $(this).attr("data");
    var flag = $("#flag").val();
    if(instrumentUid != ""){
        $.ajax({
            url:'../project/addInstrumetToGroup',
            data:{'groupId':groupId,'instrumentUid':instrumentUid},
            //dataType:'json',
            success:function () {
                alert("添加成功");
                window.location.href="../project/instrumentManageLists?pUid="+pUid+"&beforeCurrpage="+beforeCurrpage+"&flag="+flag;
            },
            error:function () {

            }
        })
    }
})
//移除设备
$(".deleteInstrumetFromGroup").click(function () {
    var beforeCurrpage = $("#beforeCurrpage").val();
    var pUid = $("#pUid").val();
    var groupId = $(this).attr("data");
    var schoodevice = $(this).siblings("span").text();
    var flag = $("#flag").val();
    $.ajax({
        url:'../project/deleteInstrumetFromGroup',
        data:{'schoodevice':schoodevice,'groupId':groupId},
        //dataType:'json',
        success:function () {
            alert("已删除！");
            window.location.href="../project/instrumentManageLists?pUid="+pUid+"&beforeCurrpage="+beforeCurrpage+"&flag="+flag;
        },
        error:function () {

        }
    })
})
//返回
function backList() {
    var beforeCurrpage = $("#beforeCurrpage").val();
    var flag = $("#flag").val();
    window.location.href="../project/projectChargingApplication?currpage="+beforeCurrpage+"&flag="+flag;

}