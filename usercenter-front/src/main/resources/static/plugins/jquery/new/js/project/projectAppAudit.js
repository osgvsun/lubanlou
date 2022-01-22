/**
 * Created by Administrator on 2018/7/17.
 */
function saveProjectAudit() {
    var pAppUid = $("#pAppUid").val();
    var currpage = $("#currpage").val();
    var info = $("#info").val();
    var result = $("input[name='audit_opinion_1']:checked").val();
    var myData = {
        'pAppUid':pAppUid,
        'currpage':currpage,
        'info':info,
        'result':result
    }
    $.ajax({
        url:'../project/saveProjectAudit',
        data:myData,
        dataType:'text',
        success:function (data) {
            alert("保存成功");
            backlist();
        },
        error:function () {
            alert("网络错误，请重试");
        }
    })
}
function backlist() {
    var currpage = $("#currpage").val();
    window.location.href="../project/ProjectAppList?currpage="+currpage;
}