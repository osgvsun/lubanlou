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
//名单查看
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
            area: ['500px', '500px'],
            content:"../instrument/viewInstrumentTrainingPeopleList?trainingUid="+trainingUid+"&currpage=1",
            end: function(){
            }
        });
    });
    /*window.location.href="../instrument/viewInstrumentTrainingPeopleList?trainingUid="+trainingUid+"&currpage=1";*/
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

//删除结果
function deleteInstrumentTrainingPeopleListResult(trainingUid){
    $.ajax(
        {
            url:'../instrument/deleteInstrumentTrainingPeopleList?trainingUid='+trainingUid,
            type:'POST',
            success:function(data){//AJAX查询成功
                if(data==="success"){
                    alert("删除成功！");
                    window.location.reload();
                }else{
                    alert("删除失败！");
                    window.location.reload();
                }
            }
        }
    )


}

//报名
function addToTrainingList(instrumentTrainingUid,insUid){
    var page = $("#currpage").val();
    var myData = {
        "instrumentTrainingUid":instrumentTrainingUid
    }
    $.ajax({
        url:"../tUser/addToTrainingList",
        type:"POST",
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
                window.location.href = "../instrument/instrumentTrainingList?currpage="+page;
            }
        }
    })
}
function newInstrumentTraining(){
    var page = $("#currpage").val();
    $('#external-frame', window.parent.document).height(700)
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '新建培训',
            area: ['500px', '450px'],
            content: '../instrument/newInstrumentTraining',
            end: function(){
                window.location.href="../instrument/instrumentTrainingList?currpage="+page;
            }
        });
    });
}

function editInstrumentTraining(uid){
    var page = $("#currpage").val();
    $('#external-frame', window.parent.document).height(700);
    layer.ready(function(){
        layer.open({
            type:1,
            title: '编辑培训',
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            area: ['540px', '450px'],
            content: '../instrument/editInstrumentTraining?uid='+uid,
            end: function(){
            window.location.href="../instrument/instrumentTrainingList?currpage="+page;
        }
    });
    });
}
/*//新建培训
function newInstrumentTraining(){
    var page = $("#currpage").val();
    $('#external-frame', window.parent.document).height(700);
    layer.ready(function(){
        layer.open({
            type: 1,
            title: '新建培训',
  /!*          fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['800px', '500px'],*!/
            content: '../instrument/newInstrumentTraining',
            end: function(){
                window.location.href="../instrument/instrumentTrainingList?currpage="+page;
            }
        });
    });
}
//编辑培训
function editInstrumentTraining(uid){
    var page = $("#currpage").val();
    $('#external-frame', window.parent.document).height(700);
    layer.ready(function(){
        layer.open({
            type:1,
            title: '编辑培训',
/!*            fix: true,
          /!*  maxmin:true,*!/
            shift:-1,
            closeBtn: 1,
            shadeClose: true,*!/
/!*            move:false,
            maxmin: false,*!/
           /!* area: ['540px', '450px'],*!/
            content: '../instrument/editInstrumentTraining?uid='+uid,
            end: function(){
                window.location.href="../instrument/instrumentTrainingList?currpage="+page;
            }
        });
    });
}*/
//跳出全部人员弹窗
function addinstrumentTrainingPeople(){
    var trainingUid = $("#trainingUid").val();
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '添加人员',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['1000px', '420px'],
            content: '../instrument/showAllUser?currpage=1&trainingUid='+trainingUid,
            end: function(){
                location.reload();
                }
        });
    });
}
//添加选中的人员
function addUser(){
    var trainingUid = $("#trainingUid").val();
    var array=new Array();
    var flag; //判断是否一个未选
    $("input[name='CK_name']:checkbox").each(function() { //遍历所有的name为CK_name的 checkbox
        if ($(this).attr("checked")) { //判断是否选中
            flag = true; //只要有一个被选择 设置为 true
        }
    })

    if (flag) {
        $("input[name='CK_name']:checkbox").each(function() { //遍历所有的name为selectFlag的 checkbox
            if ($(this).attr("checked")) { //判断是否选中
                array.push($(this).val()); //将选中的值 添加到 array中
            }
        })
        //将要所有要添加的数据传给后台处理
        //window.location.href="${pageContext.request.contextPath}/tcoursesite/saveUserAuthority?authorityId="+${authority.id}+"&array="+array;
        $.ajax({
            url:"../instrument/saveUserToTraining?trainingUid="+trainingUid+"&array="+array,
            //dataType:'json',
            type:'GET',
            success:function(){
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);//关闭弹窗
            }
        })
        //window.location.href="../instrument/saveUserToTraining?trainingUid="+trainingUid+"&array="+array;
    } else {
        alert("请至少选择一个学生");
    }
}
function changeResult(trainingUid,username,result) {
    $.ajax({
        url: "../instrument/saveUserTrainingResult?trainingUid=" + trainingUid + "&username=" + username + "&result=" + result,
        dataType: 'json',
        type: 'GET',
        success: function () {
            alert("修改成功!");
            location.reload();
        }
    })
}
//批量设置
function changeResultAll(trainingUid,result) {
    var array=new Array();
    $("input[name='CK_name']:checkbox").each(function() { //遍历所有的name为selectFlag的 checkbox
        if ($(this).attr("checked")) { //判断是否选中
            array.push($(this).val()); //将选中的值 添加到 array中
        }
    })
    $.ajax({
        url: "../instrument/saveUserTrainingResultAll?trainingUid=" + trainingUid + "&array=" + array + "&result=" + result,
        dataType: 'json',
        type: 'GET',
        success: function () {
            location.reload();
        }
    })
}
//保存人员
function saveInnerSameDevice(){
    var array=new Array();
    if ($("#queryUserNumber").val()!=null && $("#queryUserNumber").val()!='') {
        array.push($("#queryUserNumber").val()); //将选中的值 添加到 array中
        //将要所有要添加的数据传给后台处理
        window.location.href="../instrument/saveUserToTraining?trainingUid="+$("#trainingUid").val()+"&array="+array;

    }else{
        alert("请至少选择一条记录");
    }
}

$(function() {
    $("#all").click(function() {
        $('input[name="CK_name"]').attr("checked",this.checked);
    });
    var $subBox = $("input[name='CK_name']");
    $subBox.click(function(){
        $("#all").attr("checked",$subBox.length == $("input[name='CK_name']:checked").length ? true : false);
    });
});