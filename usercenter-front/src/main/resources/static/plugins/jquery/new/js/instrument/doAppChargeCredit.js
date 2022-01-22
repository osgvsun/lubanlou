/**
 * Created by Administrator on 2017/8/22.
 */
//联动查分
function showCreditScores(){
    var uid = $("#configCreditScores").selected().val();
    console.log(uid);
    $.ajax({
        type: "GET",
        url: "../instrument/showCreditScores?uid="+uid,
        //dataType:"json",
        success: function (data) {
           $("#creditSscore").val(data.scores);
            $("#content").val(data.content);
        }
    });
}
//添加
function addinstrumentCreditScore(){
    var uid = $("#configCreditScores").selected().val();
    if(uid){
    }else{
        alert("请选择打分项");
        return false;
    }
    var content = $("#content").val();
    var creditSscore = $("#creditSscore").val();
    var appUid = $("#instrumentAppUid").val();
    var configUid = $("#configUid").val();
    var type = $("#type").val();
    $.get(
        "../instrument/addinstrumentCreditScore?uid="+uid+"&content="+content+"&creditSscore="+creditSscore+"&appUid="+appUid+"&configUid="+configUid+"&type="+type,
        function (e) {
            window.location.reload();
        });
}
//删除
function deleteCreditScore(icsUid) {
    var appUid = $("#instrumentAppUid").val();
    var type = $("#type").val();
    $.get(
        "../instrument/deleteCreditScore?icsUid="+icsUid+"&appUid="+appUid+"&type="+type,
        function (e) {
            window.location.reload();
        });
}
