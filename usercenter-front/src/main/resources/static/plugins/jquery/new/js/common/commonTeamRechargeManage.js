//充值
$(".add_btn").click(function () {
    $("#editForm").css("display","");
})
//取消充值
function cancelEdit(){
    document.getElementById("editForm").style.display="none";
}

//输入框绑定的方法—课题组
$("#commonTeam").coolautosuggest({
    url:"../commonteam/coolSuggestCommonTeam?commonTeam=",
    onSelected:function(result){
        $("#commonTeam").val(result.data);
        $("#queryCommonTeam").val(result.uid);
    }
});

//保存充值记录
function submitEditForm() {
    $.ajax({
        url:"../commonteam/saveCommonTeamFunding",
        type:"POST",
        data:$("#commonTeamFunding").serialize(),
        success:function (data) {
                alert("保存成功!");
                window.location.reload();
        }
    })
}

//中心主任审核
$(".rechargeAudit").click(function(){
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
        ,content: '../commonteam/commonTeamRechargeAudit?uid='+uid
        ,success: function(layero){
            layer.setTop(layero); //重点2
        }
    });
    layer.full(win);
})

//提交充值审核意见
function submitRechargeAudit(){
    var auditCheckedresult;
    var remarks;
    if(document.getElementById("auditResult1").checked){
        auditCheckedresult="pass";
    }else{
        auditCheckedresult="fail";
    }
    remarks=$('#remark_1').val();
    if(remarks==null || remarks==""){
        remarks="没有填写审核意见！"
    }
    var myData={
        "auditChecked":auditCheckedresult,
        "remarks":remarks,
    }
    var uid=$('#uid').val();
    $.ajax({
        url:"saveCommonTeamRechargeAudit?uid="+uid,
        type: 'POST',
        async:false,
        data:myData,
        success: function(data) {
            alert("提交成功");
            parent.window.location.reload();
        }
    });
}