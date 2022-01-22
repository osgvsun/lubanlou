/**
 * Created by Administrator on 2017/8/2.
 */
//新建维修
function newInstrumentRepair(instrumentRepairId){
    if(instrumentRepairId){
    }else{
        instrumentRepairId = "-1";
    }
    window.location.href = "../instrument/newInstrumentRepair?instrumentRepairId="+instrumentRepairId;
}

function repairComplete(obj){
    // var createTime = document.getElementById(uid+"crateTime2").text;
    document.getElementById("createTime1").value=$(obj).parent().parent().parent().children(".createTime").text();
    document.getElementById("repairUid").value=$(obj).parent().parent().parent().attr("id");
    // console.log($("#createTime1").val());
    // console.log($("#repairUid").val());

}
function saveRepairReason(){
    var repairTime=document.getElementById("repairTime").value;
    var repairUser=document.getElementById("repairUser").value;
    var repairMoney=document.getElementById("repairMoney").value;
    var reason=document.getElementById("repairInput").value;
    var uid=document.getElementById("repairUid").value;
    var createTime=document.getElementById("createTime1").value;

    var createTimeStamp = createTime.substring(0,10);
    createTimeStamp = createTimeStamp.replace(/-/g,'/');
    createTimeStamp = parseInt(new Date(createTimeStamp).getTime()/1000);
    var repairTimeStamp = parseInt(new Date(repairTime).getTime()/1000);
    if(repairTimeStamp<createTimeStamp) {
        alert("维修时间有误！")
        return false;
    }

    if(repairMoney == '' || repairTime == null || repairTime ==''){
        alert("请填写必选项！！！");
        return false;
    }
    var myData={
        "reason":reason,
        "repairTime":repairTime,
        "repairUser":repairUser,
        "repairMoney":repairMoney,
        "uid":uid
    };
    $.ajax({
        type: 'post',
        async: false,
        data:myData,
        url: "../instrument/saveRepair",
        success: function(data) {
            window.location.reload();
        },
        error:function() {

        }
    })
}
//新建维修
function newRepair(instrumentNumber){
    $('#external-frame', window.parent.document).height(700)
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '新建维修',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['540px', '400px'],
            content: '../instrument/newInstrumentRepair?instrumentNumber='+instrumentNumber,
            end: function(){

                if(instrumentNumber==null){
                    alert("SDgf");
                    window.location.href="../instrument/instrumentRepairList?currpage=1";
                }else{
                    if(instrumentNumber=='null'){
                        window.location.href="../instrument/instrumentRepairList?currpage=1";
                    }else{
                        window.location.href="../instrument/instrumentRepairList?currpage=1&instrumentNumber="+instrumentNumber;
                    }


                }

            }
        });
    });
}

function saveRepair() {
    if(document.getElementById("schoolDevice")!=null){
        var schoolDevice=document.getElementById("schoolDevice").value;
    }
    if(document.getElementById("instrumentName1")!=null){
        var instrumentName1=document.getElementById("instrumentName1").value;
    }
    if(document.getElementById("schoolDevice1")!=null){
        var schoolDevice1=document.getElementById("schoolDevice1").value;
    }

    var repairTime=document.getElementById("repairTime").value;
    var description=document.getElementById("description").value;
    var myData={
        "schoolDevice":schoolDevice,
        "instrumentName1":instrumentName1,
        "schoolDevice1":schoolDevice1,
        "repairTime":repairTime,
        "description":description
    };
    var repairTimeStamp = repairTime.substring(0,10);
    repairTimeStamp = repairTimeStamp.replace(/-/g,'/');
    repairTimeStamp = parseInt(new Date(repairTimeStamp).getTime()/1000);
    var nowTimeStamp = parseInt(new Date().getTime()/1000);
    if(repairTimeStamp<nowTimeStamp){
        $.ajax({
            type: "POST",
            url: '../instrument/saveInstrumentRepairs',
            data: myData,//表单数据
            //dataType:"json",
            success: function (data) {
                if(data=="true"){
                    alert("保存成功")
                }
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);//关闭弹窗
            }
        });
    }else{
        alert("故障发生时间错误！")
    }

}
