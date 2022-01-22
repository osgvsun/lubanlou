/**
 * Created by Administrator on 2017/8/30.
 */
$(function () {//页面加载时判断是否显示期望培训功能
    var inAuthList = $("#inAuthList").val();
    var sumMaxNumbers = $("#sumMaxNumbers").val();
    var sumCurrNumbers = $("#sumCurrNumbers").val();
    var authority = $("#authority").val();
    var insUid =$("#insUid").val();
    $.ajax({
        type: "POST",
        url: '../instrument/isTuserInTraining?insUid='+insUid,
        //dataType:"json",
        success: function (data) {
            if((inAuthList == "false")&&(authority == "STUDENT")&&(data == "notInTraining")){
                if(sumCurrNumbers >= sumMaxNumbers){
                    $("#expect").show();
                }
            }
        }
    });
})
//期待培训
function expectTraining(insUid) {
    var trainingTime = $("#trainingTime").val();
    if (trainingTime){
    }else {
        alert("请选择时间！");
    }
    var myData = {
        'insUid':insUid,
        'trainingTime':trainingTime
    }
    $.ajax({
        url:"../instrument/expectTraining",
        type:"POST",
        //dataType:"json",
        data:myData,
        success:function(data){//AJAX查询成功
            if (data = "success"){
                alert("提交成功");
            }
        }
    })
}
//查看名单
function viewInstrumentTrainingPeopleList(trainingUid){
    $('#external-frame', window.parent.document).height(700);
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '名单查看',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['900px', '540px'],
            content:"../instrument/viewInstrumentTrainingPeopleList?trainingUid="+trainingUid+"&currpage=1",
            end: function(){

            }
        });
    });
}
//报名
function addToTrainingList(instrumentTrainingUid,insUid){
    var myData = {
        "instrumentTrainingUid":instrumentTrainingUid
    }
    $.ajax({
        url:"../tUser/addToTrainingList",
        type:"POST",
        //dataType:"json",
        data:myData,
        success:function(data){//AJAX查询成功
            if(data=="isBlack") {
                alert("您已被拉入黑名单，无法参加！");
            }else if(data=="isAuth"){
                alert("您已在授权名单中，不用参加培训可直接预约！");
            }else if(data=="isInList"){
                alert("您已在培训名单中，请不要重复参加！");
            }else if(data=="overSize"){
                alert("抱歉,培训人员已满！");
            }else if(data=="isOverTime"){
                alert("已超过最大提前预约时间！");
            }else if(data=="success"){
                alert("已成功加入到培训中！");
                window.location.href = "../instrument/viewInstrumentTrainingList?currpage=1&insUid="+insUid;
            }
        }
    })
}