/**
 * Created by Administrator on 2017/8/23.
 */
function addToTrainingList(instrumentTrainingUid){
    var myData = {
        "instrumentTrainingUid":instrumentTrainingUid
    }
    $.ajax({
        url:"../tUser/addToTrainingList",
        type:"POST",
        dataType:"json",
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
                window.location.href = "../tUser/showTrainingList";
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
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['1000px', '420px'],
            content:"../instrument/viewInstrumentTrainingPeopleList?trainingUid="+trainingUid+"&currpage=1",
            end: function(){

            }
        });
    });
}
