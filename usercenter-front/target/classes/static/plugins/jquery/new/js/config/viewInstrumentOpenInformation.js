/**
 * Created by Administrator on 2017/9/9.
 */
function showEdit(uid) {
    $("#editForm").css("display","");
    var insUid = $("#insUid").val();
    $.ajax({
        url:'../instrument/editInstrumentNoticeAjax?insUid='+insUid+'&uid='+uid,
        type:'POST',
        error:function (request){
            alert('请求错误!');
        },
        success:function(data){
            $("#title").val(data.tittle);
            $("#content").val(data.content);
            $("#uid").val(uid);
        }
    });
}
function submitEditForm() {
    document.getElementById("instrumentNotice").submit();
}

