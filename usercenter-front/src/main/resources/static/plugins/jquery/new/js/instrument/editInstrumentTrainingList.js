/**
 * Created by Administrator on 2017/8/25.
 */
function showInstrumentTrainingExpect(insUid){
    $('#external-frame', window.parent.document).height(700);
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '期望展示',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['900px', '540px'],
            content:"../instrument/showInstrumentTrainingExpect?insUid="+insUid,
            end: function(){

            }
        });
    });
}

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
//结果录入
function viewInstrumentTrainingPeopleListResult(trainingUid){
    $('#external-frame', window.parent.document).height(700);
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '结果录入/查看',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['900px', '540px'],
            content:"../instrument/viewInstrumentTrainingPeopleList?isResult=1&trainingUid="+trainingUid+"&currpage=1",
            end: function(){

            }
        });
    });
}
//发布信息到门户
function pushInstrumentTraining(trainingUid){
    var myData = {
        "trainingUid":trainingUid
    }
    $.ajax({
        url:"../instrument/pushInstrumentTraining",
        type:"POST",
        //dataType:"json",
        data:myData,
        success:function(data){//AJAX查询成功
            $("#unpush"+trainingUid).removeClass("hide");
            $("#push"+trainingUid).addClass("hide");
        }
    })
}
//新建培训
function newInstrumentTraining(insUid){
    var currpage = $("#currpage").val();
    var insUid = $("#insUid").val();
    $('#external-frame', window.parent.document).height(700)
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '新建培训',
            area: ['500px', '450px'],
            content: '../instrument/newInstrumentTrainingSingle?insUid='+insUid,
            end: function(){
                window.location.href="../instrument/editInstrumentTrainingList?currpage="+currpage+"&insUid="+insUid;
            }
        });
    });
}
//编辑培训
function editInstrumentTraining(uid){
    var currpage = $("#currpage").val();
    var insUid = $("#insUid").val();
    $('#external-frame', window.parent.document).height(700)
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '编辑培训',
            offset: '0px',
            area: ['500px', '450px'],
            content: '../instrument/editInstrumentTraining?uid='+uid,
            end: function(){
                window.location.href="../instrument/editInstrumentTrainingList?currpage="+currpage+"&insUid="+insUid;
            }
        });
    });
}
