$(".editInsMaint").each(function(i,e){
    $(e).on("click",function(){
        $("#editForm").css("display","");
        var uid = $(e).attr('data');
        var insUid = $("#insUid").val();
        $.ajax({
            url:'../instrument/editConfigEvaluation?insUid='+insUid+'&uid='+uid,
            type:'POST',
            error:function (request){
                alert('请求错误!');
            },
            success:function(data){
                $("#uid1").val(data.uid);
                $("#item").val(data.item);
                $("#content").val(data.content);
                if(data.price=='1'){
                    $("#enableYes").attr("checked",true);
                }else{
                    $("#enableNo").attr("checked",true);

                }

              //  $("#price").val(data.price);
                $("#uid").val($(e).attr('data'));
            }
        });
    })
})