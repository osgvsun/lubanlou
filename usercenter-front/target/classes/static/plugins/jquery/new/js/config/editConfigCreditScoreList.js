
$(".editCreditScore").each(function(i,e){
    $(e).on("click",function(){
        $("#editForm").css("display","");
        var uid = $(e).attr('data');
        var insUid = $("#insUid").val();
        $.ajax({
            url:'../config/editConfigCreditScoreInformation?insUid='+insUid+'&uid='+uid,
            type:'POST',
            error:function (request){
                alert('请求错误!');
            },
            success:function(data){

                $("#deductionItem").val(data.deductionItem);
                $("#isLatest").val(data.isLatest);
                $("#score").val(data.score);
                $("#number").val(data.number);
                $("#type").val(data.type);
                if(data.isAllege==1){
                    $("#enableYes").attr("checked","checked")
                }
                else{
                    $("#enableNo").attr("checked","checked")
                }
                $("#uid").val($(e).attr('data'));
            }
        });
    })
})
$(".newConfigCreditScore").click(function(){
    var uid = $(this).attr("data");
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看详情'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../config/newConfigCreditScore?insUid='+uid


        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
        ,end:function () {
            window.location.href="../config/editConfigCreditScoreList?currpage=1&insUid="+uid;
        }
    });
    layer.full(win);
})