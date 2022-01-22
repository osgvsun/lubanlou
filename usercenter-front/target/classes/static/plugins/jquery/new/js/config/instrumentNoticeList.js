function submitEditForm() {
    document.getElementById("instrumentNotice").submit();
}
$(".editCreditScore").each(function(i,e){
    $(e).on("click",function(){
        $("#editForm").css("display","");
        var uid = $(e).attr('data');
        var insUid = $("#insUid").val();
        $.ajax({
            url:'../instrument/editNotice?insUid='+insUid+'&uid='+uid,
            type:'POST',
            error:function (request){
                alert('请求错误!');
            },
            success:function(data){
                $("#title").val(data.item);
                $("#content").val(data.content);
                //  $("#price").val(data.price);
                $("#uid").val($(e).attr('data'));
            }
        });
    })
})