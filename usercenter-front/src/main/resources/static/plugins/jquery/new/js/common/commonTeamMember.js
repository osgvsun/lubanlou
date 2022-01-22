$(".addMember1").click(function(){
    $(".fade").css("display","block");
    $(".addMemberDiv").css("display","block");
    var username = $('#queryUserNumber').val();
    var teamUid = $('#teamUid').val();
    var type = $('#type').val();
    var myData = {
        'teamUid':teamUid,
        'username':username,
        'type':type

    }
    $.ajax({
        url:'../commonteam/saveCommonTeamMember?currpage=1',
        type:'POST',
        data:myData,
        success:function(data){
            if(data=="success"){
                //alert("添加成功！");
                window.location.reload();
            }else{
                alert("该成员已存在！");
                window.location.reload();
            }
            //window.location.href="../common/editCommonTeamDetail?currpage=1&uid="+teamUid;
        }
    });

})
//不通过插件导出
function SaveAsFileNew(){
    $("#searchForm").attr("action","../common/exportListCommonTeam");
    $("#searchForm").submit();
}