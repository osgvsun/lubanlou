/**
 * Created by Administrator on 2018/7/17.
 */
function saveAuditStat(data) {
    var pUid=$("#pUid").val();
    var myData={
        "pUid":pUid,
        "result":data
    }
    $.ajax({
        url:'../project/saveNewProjectApplicationCheckStatus',
        data:myData,
        success:function () {
            alert("保存成功");
            var currpage = 1;
            var flag = 4;
            window.location.href="../project/projectChargingApplication?currpage="+currpage+"&flag="+flag;
        },
        error:function () {
            alert("网络错误，请重试");
        }
    })
}
