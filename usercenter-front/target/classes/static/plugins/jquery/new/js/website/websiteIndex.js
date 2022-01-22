$(function(){
    var judgeWidth = parseInt($(".roll_tab_in").css("width"));
    var pwidth = $("#rollimg").width();
    if(judgeWidth<pwidth){
        rolling2.innerHTML="";
    }
})
    var initSteps = [{
        title: "1",
        content: "设备预约",
        time:"2017-09-01"
    },{
        title: "2",
        content: "导师审核",
        time:"2017-09-01"
    },{
        title: "3",
        content: "实验室管理员审核",
        time:"2017-09-01"
    },{
        title: "4",
        content: "设备管理员审核",
        time:"2017-09-01"
    }];

    function initYsteps(index,steps,count){
        var stage = count;
        //shezhishijian
        /*for(var i = 0 ; i<stage+1;i++){
            var step = steps[i];
            step['enable'] = true;
        }*/
        $("#ystep1"+index).loadStep({
            size: "large",
            color: "green",
            showContent:false,
            steps: steps
        });
        $("#ystep1"+index).setStep(stage+1);
    }

    // 进度条
    $(function(){

        var stateList=document.getElementsByClassName("ystep1");
        for(var i=0;i<stateList.length;i++){
            var stateId="state"+parseInt(i+1);

            var thisValue= (document.getElementById(stateId)).value;
           //huoqushijian
           var count = parseInt(thisValue)+1;
            initYsteps(i,initSteps,count);
        }
    })
  /*  $(".ystep1").loadStep({
        //ystep的外观大小
        //可选值：small,large
        size: "large",
        //ystep配色方案
        //可选值：green,blue
        color: "blue",
        showContent:false,
        width:100,


        //ystep中包含的步骤
        steps: [{
            title: "1",
            content: "设备预约",
            time:"2017-09-01"
        },{
            title: "2",
            content: "导师审核",
            time:"2017-09-01"
        },{
            title: "3",
            content: "实验室管理员审核",
            time:"2017-09-01"
        },{
            title: "4",
            content: "设备管理员审核",
            time:"2017-09-01"
        }]
    });*/
   /* var stateList=document.getElementsByClassName("ystep1");
    for(var i=0;i<stateList.length;i++){
        var stateId="state"+parseInt(i+1);
        var thisValue= (document.getElementById(stateId)).value;
        if(thisValue==0){
            $("#ystep1"+(i+1)).setStep(1);
        }
        if(thisValue==1){
            $("#ystep1"+(i+1)).setStep(2);
        }
        if(thisValue==2){
            $("#ystep1"+(i+1)).setStep(3);
        }
        if(thisValue==3){
            $("#ystep1"+(i+1)).setStep(4);
        }
    }*/
    $(".ystep1").loadStep({
        //ystep的外观大小
        //可选值：small,large
        size: "small",
        //ystep配色方案
        //可选值：green,blue
        color: "green",
        //ystep中包含的步骤
        steps: [{
            //步骤名称
            title: "发起",
            //步骤内容(鼠标移动到本步骤节点时，会提示该内容)
            content: "实名用户/公益组织发起项目"
        },{
            title: "审核",
            content: "乐捐平台工作人员审核项目"
        },{
            title: "募款",
            content: "乐捐项目上线接受公众募款"
        },{
            title: "执行",
            content: "项目执行者线下开展救护行动"
        },{
            title: "结项",
            content: "项目执行者公示善款使用报告"
        }]
    });

    $(".ystep2").loadStep({
        size: "large",
        color: "blue",
        steps: [{
            title: "发起",
            time:"2017-09-01",
            message:"通过"
        },{
            title: "审核",
            time:"2017-09-01",
            message:"通过"
        },{
            title: "募款",
            time:"2017-09-01",
            message:"通过"
        },{
            title: "执行",
            time:"2017-09-01",
            message:"通过"
        },{
            title: "结项",

        }]
    });

    $(".ystep3").loadStep({
        size: "small",
        color: "blue",
        steps: [{
            title: "发起",
            content: "实名用户/公益组织发起项目"
        },{
            title: "审核",
            content: "乐捐平台工作人员审核项目"
        },{
            title: "募款",
            content: "乐捐项目上线接受公众募款"
        },{
            title: "执行",
            content: "项目执行者线下开展救护行动"
        },{
            title: "结项",
            content: "项目执行者公示善款使用报告"
        }]
    });

    $(".ystep4").loadStep({
        size: "large",
        color: "blue",
        steps: [{
            title: "发起",
            content: "实名用户/公益组织发起项目"
        },{
            title: "审核",
            content: "乐捐平台工作人员审核项目"
        },{
            title: "募款",
            content: "乐捐项目上线接受公众募款"
        },{
            title: "执行",
            content: "项目执行者线下开展救护行动"
        },{
            title: "结项",
            content: "项目执行者公示善款使用报告"
        }]
    });
//检查用户名是否存在
function judgeTUserExtend(username) {
    var str=false;
    $.ajax({
        type: 'post',
        async: false,
        url: '../framework/register/judgeTUserExtend?username=' + username,
        success: function (data) {
            if(data=="true"){
                str=true;
            } else{
                str=false;
            }
        },
        error: function () {
        }
    });
    return str;
}
function register(){
    var username = $("#username").val();
    var pwd = $("#pwd").val();
    // alert(md5(pwd))
    var repwd = $("#repwd").val();
    var cname = $("#cname").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    if(username === null || username === "" ||username.length<6||username.length>14){
        alert("请填写格式正确的用户名！");
        return false;
    }else if(pwd === null || pwd === ""||pwd.length<6||pwd.length>14) {
        alert("请填写格式正确的密码！");
        return false;
    }else if(pwd!=repwd) {
        alert("两次密码不相同！");
        return false;
    }else if(phone === null || phone === "" || !(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(phone))) {
        alert("请填写格式正确的电话号码！");
        return false;
    }else if(email === null || email === "" || !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email))) {
        alert("请填写格式正确的邮箱地址！");
        return false;
    }else if(judgeTUserExtend(username)){
        $.ajax({
            type: 'post',
            async: false,
            url: '../framework/register/register',
            data: $("#registershow").serialize(),
            success: function(data) {
                alert("注册成功！");
            },
            error:function() {
                alert("缺少字段！");
            }
        });
    }else {
        alert("用户已存在！");
    }
}

