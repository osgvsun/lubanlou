$(function(){
    var initStepSpecimen = [{
        title: "申请",
        content:"申请"
    },{
        title: "确认样品检测信息",
        content: "确认样品检测信息"
    }
    ,{
            title: "确认收费金额",
            content: "确认收费金额"
        }
        , {
            title: "测试协议打印",
            content: "测试协议打印"
        }, {
        title: "上传缴费凭证",
        content: "上传缴费凭证"
    },

        {
        title: "确认缴费",
        content: "确认缴费"
    },
        {
            title: "寄送测试样品",
            content: "寄送测试样品"
        },{
        title: "确认收样",
        content: "确认收样"
    },{
        title: "检测中",
        content: "检测中"
    },{
        title: "检测完成",
        content: "检测完成"
    }];
    function initYstepsSpecimen(index,steps,stage,style){
        $("#ystepSpecimen"+index).loadStep({
            size: "large",
            color: "blue",
            showContent:false,
            steps: steps
        });
        var countFinal = parseInt(steps.length);
        if(stage == countFinal){
            $("#ystepSpecimen" + index).setStep(stage , 'final');
        }else {
            $("#ystepSpecimen" + index).setStep(stage + 1 , 0);
        }

    }
    var stateList4=document.getElementsByClassName("ystepSpecimen");
    var tr=stateList4.parentElement;
    for(var i=0;i<stateList4.length;i++){

            var statusId = "statusSpecimen" + parseInt(i + 1);
            var thisStatus = (document.getElementById(statusId)).value;
            var step = initStepSpecimen;


            initYstepsSpecimen(i + 1, step, parseInt(thisStatus), 2);
    }
    $(".ystep-progress").css("width","325px");
    $(".ystep-progress-bar").css("width","325px");
})