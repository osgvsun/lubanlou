function confirmRejectSampleCheck(uid){
    var reason=$("#reason").val();
    $.ajax({
        url: '../nonschool/confirmRejectSampleCheck?uid='+uid+'&&reason='+reason,
        async: false,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        success:function (res) {
            console.log(res);
            // window.location.href="../nonschool/specimentAppList?currpage=1"
            parent.parent.layer.closeAll();
            window.location.reload();

            // window.location.href="../nonschool/specimentAppList?currpage=1"
            // window.parent.parent.parent.location.reload();
            // var index=parent.layer.getFrameIndex(window.name);
            // parent.layer.close(index);
            // layer.closeAll('iframe');
            // layer.closeAll('page');
            // layer.closeAll();
            // window.parent.parent.location.reload();
            // window.location.href="../nonschool/specimentAppList?currpage=1"
        },
        error:function(){
            alert("后台出了点问题，请重试！");
            return false;
        }
    });
}
function  cancelRejectSampleCheck(uid) {
    var index=parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
    window.parent.location.reload();
}